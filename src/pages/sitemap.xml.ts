import type { APIRoute } from 'astro';
import { GET as getSitemap0 } from './sitemap-0.xml';

export const GET: APIRoute = (context) => {
  return getSitemap0(context);
};
