# Pokrom Eco Bar & Pokhills Eco Garden

An Astro 6 public hospitality website at [pokhillsecogarden.com](https://pokhillsecogarden.com). Pokrom Eco Bar is the main launch focus. Pokhills Eco Garden is a separate accommodation business, currently coming soon.

Built with Astro, Tailwind CSS 4, selected React islands, self-hosted Cormorant Garamond/DM Sans and the existing Vercel static adapter.

## Local development

Requires Node >=22.12 and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm exec astro check
pnpm build
pnpm test
pnpm preview
```

Tests inspect the generated site, so build before running them. There is no separate lint configuration; Astro checks cover Astro/TypeScript diagnostics.

## Content and opening status

- [Business configuration](./src/data/businesses.ts): independent `coming_soon`, `open`, or `temporarily_closed` statuses, confirmed hours, property contacts and business-specific enquiry links. Both businesses default to `coming_soon`. Rebuild after changes; no automatic opening dates.
- [Pokrom public menu](./src/data/pokrom-menu.ts): approved products and categories, independent of unfinished POS systems. Empty until management confirms the menu.
- [Launch handover](./LAUNCH.md): route changes, reused/missing assets, confirmation checklist and verification notes.

## Optional environment variables

Copy [.env.example](./.env.example) to `.env.local` when needed.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_API_MODE` | Default demo/local fixtures; `live` enables the existing Laravel API adapter. |
| `PUBLIC_API_URL` | Laravel base URL for live room/gallery/content reads and enquiry submissions. |
| `PUBLIC_WHATSAPP` | Override existing property WhatsApp number; empty suppresses WhatsApp links and uses email. |

Contact forms are rendered only when live mode and an API URL are configured. Without that backend, direct email and WhatsApp links remain available. Demo form submissions reject rather than pretending to save enquiries. No accommodation booking or payment flow is enabled.

## Deployment

The current [Astro configuration](./astro.config.mjs) and [Vercel configuration](./vercel.json) retain static output and the existing domain. Vercel redirects old room detail URLs to the Pokhills Stays page. All existing top-level public routes remain available. Metadata, sitemap and sharing previews are built with the site.

No deployment is performed by the development scripts. A production push may trigger the repository's existing Vercel Git integration, so publish only after launch approval. Vercel Analytics is served by Vercel; its platform script is unavailable in a plain local preview.
