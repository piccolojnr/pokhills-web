import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site
    ? new URL('/sitemap.xml', site).href
    : 'https://pokhillsecogarden.com/sitemap.xml';

  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
