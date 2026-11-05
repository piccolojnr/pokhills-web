# Brand assets and photography

## Pokrom branding

The user supplied a Pokrom moodboard on 5 November 2026 and requested that **ECO BAR be larger than POKROM**, reversing the reference hierarchy. The botanical wreath was adapted using the built-in image-generation tool, with a transparent background. This is an AI-assisted adaptation of the supplied artwork, not an imported official vector master.

Saved assets:

- [Transparent full-resolution logo](./public/brand/pokrom-eco-bar-logo.png)
- [Optimized web logo](./public/brand/pokrom-eco-bar-logo.webp)
- [Social-sharing card](./public/brand/pokrom-social.png), composed from the [SVG background](./public/brand/pokrom-social.svg) and logo.

The header/footer use the adapted mark with a responsive text lockup that also makes ECO BAR the larger line. The homepage heading follows the same hierarchy. Pokhills branding remains separate.

### Image-generation prompt

Use case: logo-brand precise-object-edit. Reference input is a brand moodboard. Create ONE standalone refined logo adapted from the wreath logo in the TOP LEFT panel. Preserve its elegant roughly circular organic wreath of thin earth-brown branches with small olive green leaves, with open breathing room within. The user explicitly requests REVERSE TEXT HIERARCHY: centered top line 'POKROM' must be noticeably SMALLER, roughly 45% the height of the second line. Centered second line 'ECO BAR' must be the LARGE dominant line, elegantly spaced uppercase editorial serif, wide but fully inside the wreath. Spell exactly POKROM and ECO BAR. Forest green #1B3B24, earth brown #6B4423, olive green #7B8F3A only. Clean sharp professional logo artwork, flat colors, no shadows no photographed paper, no mockup, no texture. Genuine transparent background outside and inside wreath. Do not include tagline, other text, panels, restaurant photos or additional designs. Composition centered square, entire wreath visible with generous outer safety margin. This is the final web logo adaptation of the supplied reference.

## Stock photography

These are inspiration photographs, not photographs of Pokrom or its menu. Gallery and secondary images have visible disclosures and photographer/source links. At the user's request, the hero is a clean image without a caption or text overlay; its source remains credited in the gallery and this document. Confirmed property photographs from the existing gallery API remain separate; the inspiration gallery appears only when that gallery is empty.

All four source pages identify their photographs as free to use under the [Unsplash License](https://unsplash.com/license), checked on 5 November 2026. Images were downloaded, inspected and optimized into local responsive WebP files at 640, 960 and up to 1440 pixels. No third-party image host is required while viewing the site.

| Subject | Photographer and original page | Local file prefix |
| --- | --- | --- |
| Rattan, greenery and lounge seating | [Seongjin Park](https://unsplash.com/photos/a-tropical-restaurant-dining-area-with-lush-greenery-2iaHSGGvMNQ) | `public/images/inspiration/tropical-lounge` |
| Palm foliage | [Luise and Nic](https://unsplash.com/photos/green-palm-fronds-in-sunlight-YGoNP5ptM64) | `public/images/inspiration/foliage` |
| Citrus cocktail | [Hybrid Storytellers](https://unsplash.com/photos/a-glass-of-red-liquid-with-limes-and-a-slice-of-lime-hahQhtPnMMs) | `public/images/inspiration/cocktail` |
| Outdoor evening lighting | [Hanna Lazar](https://unsplash.com/photos/outdoor-dining-area-with-string-lights-at-dusk-WgJtfk9aKKI) | `public/images/inspiration/evening-lounge` |

[Image metadata](./src/data/inspiration.ts) keeps the source, photographer, alt text and local paths together. [InspirationPhoto](./src/components/shared/InspirationPhoto.astro) handles responsive sources, eager hero loading, lazy secondary images, captions and credits.

The moodboard's suggested dishes and Friday-Sunday hours are visual reference content, not confirmation of products or operations. No menu item, price, opening date or operating hours were added from that image.
