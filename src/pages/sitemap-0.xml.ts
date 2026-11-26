import type { APIRoute } from 'astro';

/**
 * Date of the last meaningful content change to the site.
 * Bump this manually when page copy, structure, or data actually change.
 * Do NOT derive lastmod from the build timestamp: reporting a fresh lastmod on
 * every deploy (even when nothing changed) is a known signal-quality problem and
 * makes crawlers discount the field entirely.
 */
const CONTENT_UPDATED = '2026-11-26';

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
  'insights',
  'insights/eu-battery-carbon-footprint-classes-a-e',
  'insights/en-18220-en-18219-gs1-digital-link-standards',
  'insights/sovereign-data-vault-zkp-privacy-guide',
];

// Pages that already existed before the latest content release keep an earlier
// date so the sitemap does not claim that the entire site changed at once.
const PREVIOUS_RELEASE = '2026-11-20';

// Per-subpath content dates. Only list sections whose copy actually changed.
const SECTIONS_UPDATED = new Set([
  '',
  'battery-passport',
  'pilot-program',
  'about',
  'contact',
  'pricing',
  'privacy',
  'security',
  'impressum',
  'portal-simulator',
  'insights',
  'insights/eu-battery-carbon-footprint-classes-a-e',
  'insights/en-18220-en-18219-gs1-digital-link-standards',
  'insights/sovereign-data-vault-zkp-privacy-guide',
  'compliance/eu-dpp-registry-guide',
  'compliance/eu-battery-regulation-2023-1542',
  'compliance/en-standards-guide',
  'compliance/data-requirements',
  'platform/carbon-footprint-engine',
  'platform/gs1-qr-serialization',
  'solutions/ev-battery-passport',
  'solutions/managed-data-hosting',
  'solutions/software-license',
  'solutions/storage-battery-passport',
]);

// Sections released on the previous content cycle.
const SECTIONS_PREVIOUS = new Set([
  'downloads',
  'legal-notice',
]);

const lastmodFor = (sub: string) =>
  SECTIONS_UPDATED.has(sub) ? CONTENT_UPDATED : SECTIONS_PREVIOUS.has(sub) ? '2026-11-25' : PREVIOUS_RELEASE;

export const GET: APIRoute = () => {
  const urls: string[] = [];
  const seen = new Set<string>();

  for (const lang of languages) {
    for (const sub of subpaths) {
      const parts = [lang, sub].filter(Boolean);
      const path = parts.length > 0 ? `/${parts.join('/')}/` : '/';
      if (seen.has(path)) continue;
      seen.add(path);

      const loc = `https://eudppprovider.com${path}`;
      const priority = path === '/' ? '1.0' : sub === 'battery-passport' || sub === 'pilot-program' ? '0.9' : '0.8';
      const lastmod = lastmodFor(sub);

      urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
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
