import type { APIRoute } from 'astro';
import { getRooms } from '@/lib/api';

export const GET: APIRoute = async ({ site }) => {
  const base = site ? site.href.replace(/\/$/, '') : 'https://pokhillsecogarden.com';

  const rooms = await getRooms();

  const staticPages = [
    { path: '/',           priority: '1.0', changefreq: 'daily'   },
    { path: '/rooms',      priority: '0.9', changefreq: 'weekly'  },
    { path: '/restaurant', priority: '0.6', changefreq: 'monthly' },
    { path: '/menu',       priority: '0.6', changefreq: 'weekly'  },
    { path: '/gallery',    priority: '0.6', changefreq: 'monthly' },
    { path: '/about',      priority: '0.6', changefreq: 'monthly' },
    { path: '/contact',    priority: '0.6', changefreq: 'monthly' },
  ];

  const roomPages = rooms.map(room => ({
    path: `/rooms/${room.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...roomPages];

  const today = new Date().toISOString().split('T')[0];

  const urls = allPages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${base}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
