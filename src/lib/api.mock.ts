/**
 * src/lib/api.mock.ts — local JSON fixtures for demo mode.
 * Do not import this file directly — use src/lib/api.ts.
 */

import type { Room, MenuResponse, GalleryImage, SiteContent } from './types';

import roomsData      from '../data/rooms.json';
import menuData       from '../data/menu.json';
import galleryData    from '../data/gallery.json';
import siteContent    from '../data/site-content.json';

export async function getRooms(): Promise<Room[]> {
  return roomsData as Room[];
}

export async function getRoom(slug: string): Promise<Room> {
  const room = (roomsData as Room[]).find(r => r.slug === slug);
  if (!room) throw new Error(`Room not found: ${slug}`);
  return room;
}

export async function getMenu(): Promise<MenuResponse> {
  return menuData as MenuResponse;
}

export async function getSiteContent(): Promise<SiteContent> {
  return siteContent as SiteContent;
}

export async function getGallery(): Promise<GalleryImage[]> {
  return galleryData as GalleryImage[];
}
