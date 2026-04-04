/**
 * src/lib/content.ts — helper to look up site_content values by key.
 *
 * Usage:
 *   const content = await getSiteContent();
 *   const title = get(content, 'hero_headline', 'Default title');
 */

import type { SiteContent } from './types';

export function get(
  content: SiteContent,
  key: string,
  fallback = ''
): string {
  return content[key] ?? fallback;
}
