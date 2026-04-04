/**
 * src/lib/api.mock.ts — local JSON fixtures for demo mode.
 * Do not import this file directly — use src/lib/api.ts.
 */

import type { Room, MenuResponse, GalleryImage, SiteContent, WaitlistEntry, ContactMessage } from './types';

import roomsData   from '../data/rooms.json';
import menuData    from '../data/menu.json';
import galleryData from '../data/gallery.json';
import contentData from '../data/content.json';

const delay = () => new Promise<void>(r => setTimeout(r, 50));

export async function getRooms(): Promise<Room[]> {
  await delay();
  return roomsData as Room[];
}

export async function getRoom(slug: string): Promise<Room | null> {
  await delay();
  return (roomsData as Room[]).find(r => r.slug === slug) ?? null;
}

export async function getMenu(): Promise<MenuResponse> {
  await delay();
  return menuData as MenuResponse;
}

export async function getSiteContent(): Promise<SiteContent> {
  await delay();
  return contentData as SiteContent;
}

export async function getGallery(category?: string): Promise<GalleryImage[]> {
  await delay();
  const images = galleryData as GalleryImage[];
  if (!category) return images;
  return images.filter(img => img.category === category);
}

export async function submitWaitlist(_entry: WaitlistEntry): Promise<{ success: boolean }> {
  await delay();
  return { success: true };
}

export async function submitContact(_msg: ContactMessage): Promise<{ success: boolean }> {
  await delay();
  return { success: true };
}
