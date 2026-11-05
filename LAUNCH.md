# Pokrom launch handover

The existing Astro 6 site and domain are retained. Pokrom Eco Bar now leads the homepage, navigation, food and drinks, gallery and contact pages. Pokhills Eco Garden retains its official logo and a dedicated accommodation page. Both are independent businesses sharing a property.

## Management settings

Edit [businesses.ts](./src/data/businesses.ts) and rebuild the static website. Each business has its own `status`: `coming_soon`, `open`, or `temporarily_closed`. Both default to `coming_soon`. There is no date-based opening switch. Opening must be confirmed by management. Status badges, contact messaging, homepage opening copy and navigation indicators derive from this configuration. Enquiry links include the correct business name. Opening does not enable online bookings or payments.

Set `hours` only after operating hours are confirmed. `null` displays an announcement-pending message. The existing property address, email and WhatsApp number are reused. `PUBLIC_WHATSAPP` can override the existing number; an empty value suppresses WhatsApp and uses email for enquiries. Existing Instagram and Facebook accounts are explicitly labelled as Pokhills accounts.

## Menu and future systems

[pokrom-menu.ts](./src/data/pokrom-menu.ts) owns the public menu. Products have stable IDs, explicit `businessId`, category IDs, confirmation/availability flags, currency and nullable prices. Only confirmed, available Pokrom products are published. An empty catalogue shows Menu Coming Soon with planned categories. Prices are optional and must be verified before adding. Public menu content deliberately does not depend on unfinished POS APIs. No POS, checkout, inventory or reservation backend was built.

The existing API facade, live contact form and gallery lightbox are retained. The contact form is displayed only with `PUBLIC_API_MODE=live` and `PUBLIC_API_URL` configured. Demo submissions reject instead of falsely reporting success. Without a live backend the site offers direct email and WhatsApp enquiries. No notification list is advertised without persistence.

Separate business IDs, paths and content sources allow future domain routing without combining operations. No second domain is configured or purchased.

## Assets and content still required

- **Brand reference received:** the supplied Pokrom moodboard now guides the leafy wreath, olive/cream palette, timber and rattan photography. A transparent logo adaptation makes ECO BAR larger than POKROM, as requested; an official vector master remains welcome. See [ASSETS.md](./ASSETS.md) for the generation prompt and saved assets.
- **Missing:** verified property/bar/food/drinks photography. Licensed stock photographs now provide atmosphere on Pokrom pages, visibly labelled as inspiration with source credits. They are not presented as the property or confirmed menu. Pokhills still uses a labelled illustration placeholder.
- **Reused:** official Pokhills transparent logo, existing icons, self-hosted Cormorant Garamond and DM Sans. These fonts provide the requested serif/sans direction without another dependency.
- **Created:** adapted Pokrom PNG/WebP logo and a matching social-sharing card, with ECO BAR as the larger line. No opening-date claim is made.
- **Business confirmation needed:** actual opening status/date, operating hours, final menu and prices, current contact routing, approved Pokrom branding and photography.

## Routes, SEO and deployment

All existing top-level routes remain. `/restaurant` is the Pokrom destination; `/rooms` is Pokhills Stays. `/reserve` and `/book-a-table` now explain that online reservations are unavailable and offer enquiries. Dynamic room pages no longer publish room rates or reservation/payment prompts. The Vercel configuration permanently redirects `/rooms/:slug` to `/rooms`, preserving access to previously indexed room URLs even when the catalogue is empty; this platform redirect takes effect on deployment. Live API room slugs still build safe informational pages locally.

Page titles, descriptions, canonical URLs, Open Graph/Twitter previews and sitemap priorities are updated. Structured data uses a separate BarOrPub and Pokhills organization with the existing address, without hours, prices, offers or bookable accommodation. The social image is a local PNG.

No deployment was performed. Keep the current static Astro/Vercel deployment setup. Rebuild after content/configuration changes.

## Verification

Run `pnpm exec astro check`, `pnpm exec astro build`, then `pnpm test` (tests read the built output). There was no pre-existing lint or test script; `check` and focused Node tests are now available. Tests cover opening-state independence, unavailable accommodation transactions, retained routes, SEO/structured data, local asset/link integrity and launch fallback states. Browser verification covers desktop/mobile layout, mobile menu and the main visitor routes. See the implementation report for actual results and any environment limitations.

### Results from this implementation

- `pnpm exec astro check`: zero errors and zero warnings; one existing SmartImage inline-handler hint remains.
- `pnpm exec astro build`: successful static build, 11 pages plus sitemap/robots output.
- `pnpm test`: all three regression groups passed, covering status transitions and rendered launch content, SEO, assets and retained links.
- Production-preview browser checks: all nine visitor routes returned HTTP 200. Active primary navigation matched the six destinations. No transaction or demo enquiry forms rendered.
- Responsive checks: no horizontal overflow on the homepage, stays, contact, menu or gallery at actual CSS widths 320, 390, 1152 and 2160. Browser zoom affected the requested larger device widths. Desktop/mobile screenshots were inspected.
- Mobile menu handlers: browser-dispatched click opened the menu; Escape closed it and returned focus. The integrated browser pointer automation timed out after device emulation, so physical pointer/touch interactions still merit a manual smoke check.
- Local asset integrity checks passed; no broken property images were introduced. CSS illustrations are explicitly labelled placeholders. Email, WhatsApp and Maps destinations were inspected without sending messages.
- Plain local preview requests for `/_vercel/insights/script.js` return 404, as expected for the existing Vercel Analytics integration outside Vercel. No live enquiry backend, platform redirects or production deployment was exercised.

### Branding-reference follow-up

The supplied moodboard has now been applied with the requested reversed hierarchy: ECO BAR is larger than POKROM in the generated logo, header/footer text lockups, homepage heading and social card. Four licensed Unsplash inspiration images replace Pokrom placeholders; local responsive WebP sources, photographer credits and visible disclosures are included. Full prompt, paths and source pages are in [ASSETS.md](./ASSETS.md).

After this follow-up, the production build and all three regression groups pass; Astro checks report zero errors and warnings with the same pre-existing SmartImage hint. Desktop/mobile browser inspection confirmed the larger ECO BAR text, loaded hero image, no horizontal overflow, and no broken images on the bar/gallery pages. Opening status and menu restrictions remain unchanged. No production deployment was performed.
