/**
 * src/lib/api.live.ts — Laravel API calls for production.
 * Do not import this file directly — use src/lib/api.ts.
 */

import type { Room, MenuResponse, GalleryImage, SiteContent } from './types';

const BASE = import.meta.env.PUBLIC_API_URL;

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function getRooms(): Promise<Room[]> {
  return apiFetch<Room[]>('/api/public/rooms');
}

export async function getRoom(slug: string): Promise<Room> {
  return apiFetch<Room>(`/api/public/rooms/${slug}`);
}

export async function getMenu(): Promise<MenuResponse> {
  return apiFetch<MenuResponse>('/api/public/menu');
}

export async function getSiteContent(): Promise<SiteContent> {
  return apiFetch<SiteContent>('/api/public/content');
}

export async function getGallery(): Promise<GalleryImage[]> {
  return apiFetch<GalleryImage[]>('/api/public/gallery');
}
