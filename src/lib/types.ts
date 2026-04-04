// ─── Room ────────────────────────────────────────────────────────────────────

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  type: 'suite' | 'standard' | 'cabin' | 'deluxe';
  amenities: string[];
  images: string[];
  publicRate: number;
  featured: boolean;
}

// ─── Menu ────────────────────────────────────────────────────────────────────

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  featured: boolean;
  image: string | null;
  available: boolean;
}

export type MenuResponse = {
  [category: string]: MenuItem[];
};

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: 'rooms' | 'food' | 'bar' | 'ambience' | 'events';
  sortOrder: number;
}

// ─── Site Content ─────────────────────────────────────────────────────────────

export type SiteContent = {
  [key: string]: string;
};

// ─── Forms ───────────────────────────────────────────────────────────────────

export interface WaitlistEntry {
  contact: string;
  contactType: 'email' | 'whatsapp';
  interest: 'rooms' | 'restaurant' | 'both';
}

export interface ContactMessage {
  name: string;
  contact: string;
  subject: string;
  message: string;
}
