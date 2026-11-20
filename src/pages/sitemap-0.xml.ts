import type { APIRoute } from 'astro';

const languages = ['', 'zh', 'de', 'fr', 'nl'];

const subpaths = [
  '',
  'battery-passport',
  'pilot-program',
  'about',
  'contact',
  'pricing',
  'privacy',
  'terms',
  'security',
  'legal-notice',
  'impressum',
  'solutions/ev-battery-passport',
  'solutions/lmt-battery-passport',
  'solutions/storage-battery-passport',
  'solutions/software-license',
  'solutions/managed-data-hosting',
  'platform/carbon-footprint-engine',
  'platform/gs1-qr-serialization',
  'compliance/eu-battery-regulation-2023-1542',
  'compliance/eu-dpp-registry-guide',
  'compliance/data-requirements',
  'compliance/en-standards-guide',
  'portal-simulator',
  'downloads',
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];
  const urls: string[] = [];

  for (const lang of languages) {
    for (const sub of subpaths) {
      const parts = [lang, sub].filter(Boolean);
      const path = parts.length > 0 ? `/${parts.join('/')}/` : '/';
      const loc = `https://eudppprovider.com${path}`;
      const priority = path === '/' ? '1.0' : sub === 'battery-passport' || sub === 'pilot-program' ? '0.9' : '0.8';

      urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
