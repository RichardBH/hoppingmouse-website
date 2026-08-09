import type { APIRoute } from 'astro';
import { SITE_MODE, absUrl } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const body =
    SITE_MODE === 'production'
      ? `User-agent: *\nAllow: /\n\nSitemap: ${absUrl('/sitemap-index.xml', site)}\n`
      : // preview: pages carry noindex meta; no Disallow (it would block the
        // deindex signal), no sitemap invitation.
        `User-agent: *\nAllow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
