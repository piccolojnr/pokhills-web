/**
 * src/lib/api.live.ts — Laravel API calls for production.
 * Do not import this file directly — use src/lib/api.ts.
 *
 * Maps API snake_case fields → TypeScript camelCase interfaces.
 */

import type { Room, MenuResponse, MenuItem, GalleryImage, SiteContent, WaitlistEntry, ContactMessage } from './types';

const BASE = import.meta.env.PUBLIC_API_URL;

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText}: GET ${path}`);
  }
  return res.json() as Promise<T>;
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText}: POST ${path}`);
  }
  return res.json() as Promise<T>;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

function mapRoom(r: Record<string, unknown>): Room {
  return {
    id: String(r['id']),
    slug: r['slug'] as string,
    name: r['name'] as string,
    tagline: r['tagline'] as string,
    description: r['description'] as string,
    type: r['type'] as Room['type'],
    amenities: (r['amenities'] as string[]) ?? [],
    images: (r['images'] as string[]) ?? [],
    publicRate: Number(r['public_rate'] ?? r['publicRate']),
    featured: Boolean(r['featured']),
  };
}

function mapMenuItem(item: Record<string, unknown>): MenuItem {
  return {
    id: String(item['id']),
    name: item['name'] as string,
    description: (item['description'] as string | null) ?? null,
    price: Number(item['price']),
    category: item['category'] as string,
    featured: Boolean(item['featured']),
    image: (item['image'] as string | null) ?? null,
    available: item['available'] !== false,
  };
}

function mapGalleryImage(img: Record<string, unknown>): GalleryImage {
  return {
    id: String(img['id']),
    url: img['url'] as string,
    caption: (img['caption'] as string | null) ?? null,
    category: img['category'] as GalleryImage['category'],
    sortOrder: Number(img['sort_order'] ?? img['sortOrder'] ?? 0),
  };
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export async function getRooms(): Promise<Room[]> {
  const data = await apiFetch<Record<string, unknown>[]>('/api/public/rooms');
  return data.map(mapRoom);
}

export async function getRoom(slug: string): Promise<Room | null> {
  try {
    const data = await apiFetch<Record<string, unknown>>(`/api/public/rooms/${slug}`);
    return mapRoom(data);
  } catch (err) {
    if (err instanceof Error && err.message.includes('404')) return null;
    throw err;
  }
}

export async function getMenu(): Promise<MenuResponse> {
  const data = await apiFetch<Record<string, Record<string, unknown>[]>>('/api/public/menu');
  const result: MenuResponse = {};
  for (const [category, items] of Object.entries(data)) {
    result[category] = items.map(mapMenuItem);
  }
  return result;
}

export async function getSiteContent(): Promise<SiteContent> {
  return apiFetch<SiteContent>('/api/public/content');
}

export async function getGallery(category?: string): Promise<GalleryImage[]> {
  const path = category
    ? `/api/public/gallery?category=${encodeURIComponent(category)}`
    : '/api/public/gallery';
  const data = await apiFetch<Record<string, unknown>[]>(path);
  return data.map(mapGalleryImage);
}

export async function submitWaitlist(entry: WaitlistEntry): Promise<{ success: boolean }> {
  return apiPost<{ success: boolean }>('/api/public/waitlist', {
    contact: entry.contact,
    contact_type: entry.contactType,
    interest: entry.interest,
  });
}

export async function submitContact(msg: ContactMessage): Promise<{ success: boolean }> {
  return apiPost<{ success: boolean }>('/api/public/contact', msg);
}
