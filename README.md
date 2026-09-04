# Pokhills Eco Garden — Website

Astro 6 static site for [Pokhills Eco Garden](https://pokhillsecogarden.com) — a boutique eco-retreat and garden bar in Pokrom, Ghana.

---

## Stack

| Layer     | Technology                                     |
| --------- | ---------------------------------------------- |
| Framework | Astro 6 (static output)                        |
| Styling   | Tailwind CSS v4 (via `@tailwindcss/vite`)      |
| Islands   | React 19 (`client:load`)                       |
| Hosting   | Vercel (static adapter)                        |
| Fonts     | Cormorant Garamond + DM Sans (self-hosted TTF) |

---

## Getting started

```bash
# 1. Clone
git clone <repo-url>
cd pokhills-web

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.example .env.local

# 4. Start dev server
pnpm dev
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
# "mock" uses local JSON fixtures (default for development)
# "live" fetches from the Laravel API
PUBLIC_API_MODE=mock

# Base URL for the Laravel API (only needed when PUBLIC_API_MODE=live)
PUBLIC_API_BASE=https://api.pokhillsecogarden.com

# WhatsApp number for CTA links (include country code, no spaces)
PUBLIC_WHATSAPP=233202400666

# Google Maps Embed API key (optional — falls back to a styled placeholder)
PUBLIC_GOOGLE_MAPS_KEY=

# Site URL (used for canonical URLs and OG images)
PUBLIC_SITE_URL=https://pokhillsecogarden.com
```

---

## API modes

The site uses a switcher in `src/lib/api.ts` to toggle between two implementations:

| Mode   | Source                                    | When to use                      |
| ------ | ----------------------------------------- | -------------------------------- |
| `mock` | `src/data/*.json` + `src/lib/api.mock.ts` | Local development, design review |
| `live` | Laravel REST API + `src/lib/api.live.ts`  | Staging and production           |

Switch by setting `PUBLIC_API_MODE=live` in your environment.

---

## Required assets checklist

The following files must be placed manually before deploying to production:

### `/public/fonts/`

All fonts are self-hosted. Required TTF files:

- `CormorantGaramond-Regular.ttf`
- `CormorantGaramond-Italic.ttf`
- `CormorantGaramond-Medium.ttf`
- `CormorantGaramond-MediumItalic.ttf`
- `CormorantGaramond-SemiBold.ttf`
- `CormorantGaramond-SemiBoldItalic.ttf`
- `DMSans-Light.ttf`
- `DMSans-Regular.ttf`
- `DMSans-Medium.ttf`

### `/public/og-default.jpg`

Default Open Graph image shown when sharing any page on social media.

- **Size:** 1200 × 630px
- **Content:** Deep green (`#2D4A2D`) background, Pokhills Eco Garden logotype centred
- **Format:** JPEG, optimised (~150–200KB)

### `/public/brand/`

Web-ready logo and favicon assets generated from the supplied Pokhills Eco Garden artwork.

---

## Scripts

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Production build → ./dist/
pnpm preview      # Preview production build locally
pnpm astro check  # TypeScript + Astro type check
```

---

## Deploy to Vercel

### First deploy

1. Push the repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Set the framework preset to **Astro**
4. Add all environment variables from `.env.example`
5. Deploy

Every push to `main` triggers an automatic rebuild via Vercel's Git integration.

### Vercel deploy hook (for Laravel CMS auto-rebuild)

To rebuild the site whenever content is saved in the Laravel admin:

1. In Vercel → Project → Settings → Git → **Deploy Hooks**
2. Create a hook named `laravel-content-update` targeting the `main` branch
3. Copy the generated webhook URL
4. In your Laravel `.env`:
   ```env
   VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
   ```
5. In the Laravel observer/event that fires on content save:
   ```php
   Http::post(config('services.vercel.deploy_hook'));
   ```

The site rebuilds with fresh content within ~30 seconds of a save.

---

## Project structure

```
src/
├── components/
│   ├── forms/          # ContactForm, WaitlistForm (React islands)
│   ├── gallery/        # GalleryLightbox (React island)
│   ├── home/           # Hero, StatStrip, ExperiencePanel, RoomTeaser, ...
│   ├── layout/         # Base, Nav, Footer
│   ├── menu/           # MenuCategory, MenuItem
│   ├── rooms/          # RoomCard, RoomGallery, AmenityBadge
│   └── shared/         # SectionLabel, SmartImage, PlaceholderImage, ...
├── data/               # JSON fixtures (mock mode)
├── lib/
│   ├── api.ts          # Switcher — picks mock or live at build time
│   ├── api.mock.ts     # Mock implementation (reads JSON fixtures)
│   ├── api.live.ts     # Live implementation (Laravel REST API)
│   ├── types.ts        # Shared TypeScript interfaces
│   └── utils.ts        # formatGHS, getContent, slugify, ...
├── pages/              # One file per route + API endpoints
└── styles/
    ├── global.css      # @theme tokens + Tailwind import
    └── fonts.css       # @font-face declarations
```
