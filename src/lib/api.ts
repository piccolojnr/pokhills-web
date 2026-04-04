/**
 * src/lib/api.ts — single import point for all data access.
 *
 * Pages and components ALWAYS import from here.
 * Never import from api.mock.ts or api.live.ts directly.
 *
 * PUBLIC_API_MODE=live  → Laravel API (api.live.ts)
 * anything else         → local JSON fixtures (api.mock.ts)
 */

import type { Room, MenuItem, MenuResponse, GalleryImage, SiteContent, WaitlistEntry, ContactMessage } from './types';

export type { Room, MenuItem, MenuResponse, GalleryImage, SiteContent, WaitlistEntry, ContactMessage };

const mod = import.meta.env.PUBLIC_API_MODE === 'live'
  ? await import('./api.live')
  : await import('./api.mock');

export const getRooms       = mod.getRooms       as () => Promise<Room[]>;
export const getRoom        = mod.getRoom        as (slug: string) => Promise<Room | null>;
export const getMenu        = mod.getMenu        as () => Promise<MenuResponse>;
export const getSiteContent = mod.getSiteContent as () => Promise<SiteContent>;
export const getGallery     = mod.getGallery     as (category?: string) => Promise<GalleryImage[]>;
export const submitWaitlist = mod.submitWaitlist as (entry: WaitlistEntry) => Promise<{ success: boolean }>;
export const submitContact  = mod.submitContact  as (msg: ContactMessage) => Promise<{ success: boolean }>;
