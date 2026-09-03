/**
 * src/lib/api.mock.ts — local JSON fixtures for demo mode.
 * Do not import this file directly — use src/lib/api.ts.
 */

import type { Room, MenuResponse, SiteContent, WaitlistEntry, ContactMessage } from './types';

import contentData from '../data/content.json';

const delay = () => new Promise<void>(r => setTimeout(r, 50));

export async function getRooms(): Promise<Room[]> {
  await delay();
  return [];
}

export async function getRoom(slug: string): Promise<Room | null> {
  await delay();
  return null;
}

export async function getMenu(): Promise<MenuResponse> {
  await delay();
  return {};
}

export async function getSiteContent(): Promise<SiteContent> {
  await delay();
  return contentData as SiteContent;
}

export async function getGallery(category?: string): Promise<GalleryImage[]> {
  await delay();
  return [];
}

export async function submitWaitlist(_entry: WaitlistEntry): Promise<{ success: boolean }> {
  await delay();
  return { success: true };
}

export async function submitContact(_msg: ContactMessage): Promise<{ success: boolean }> {
  await delay();
  return { success: true };
}
