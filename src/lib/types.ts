// ─── Room ────────────────────────────────────────────────────────────────────

export interface Room {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price_per_night: number;
  currency: string;
  capacity: number;
  size_sqm: number;
  amenities: string[];
  images: RoomImage[];
  is_available: boolean;
  sort_order: number;
}

export interface RoomImage {
  url: string;
  alt: string;
  is_primary: boolean;
}

// ─── Menu ────────────────────────────────────────────────────────────────────

export interface MenuCategory {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  tags: string[];          // e.g. ['vegan', 'gluten-free', 'signature']
  is_available: boolean;
  sort_order: number;
}

export interface MenuResponse {
  categories: MenuCategory[];
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  caption: string | null;
  category: 'rooms' | 'restaurant' | 'garden' | 'events' | 'general';
  sort_order: number;
}

// ─── Site Content ─────────────────────────────────────────────────────────────

export type SiteContent = Record<string, string>;
