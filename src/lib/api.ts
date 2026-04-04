/**
 * src/lib/api.ts — auto-selects mock or live implementation.
 *
 * Pages and components ALWAYS import from here.
 * Never import from api.mock.ts or api.live.ts directly.
 *
 * PUBLIC_API_MODE=demo  → uses local JSON fixtures (api.mock.ts)
 * PUBLIC_API_MODE=live  → uses Laravel API (api.live.ts)
 */

import type { Room, MenuResponse, GalleryImage, SiteContent } from './types';

const mode = import.meta.env.PUBLIC_API_MODE ?? 'demo';

const impl = mode === 'live'
  ? await import('./api.live')
  : await import('./api.mock');

export const getRooms     = impl.getRooms     as () => Promise<Room[]>;
export const getRoom      = impl.getRoom      as (slug: string) => Promise<Room>;
export const getMenu      = impl.getMenu      as () => Promise<MenuResponse>;
export const getSiteContent = impl.getSiteContent as () => Promise<SiteContent>;
export const getGallery   = impl.getGallery   as () => Promise<GalleryImage[]>;
