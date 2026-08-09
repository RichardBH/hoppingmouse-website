// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Two build modes (see PLAN.md, eng review):
//  preview    — github.io project page: base path, noindex everywhere, no sitemap
//  production — custom domain: no base, indexable, sitemap on
const MODE = process.env.SITE_MODE === 'production' ? 'production' : 'preview';
const PRODUCTION_SITE = process.env.PRODUCTION_SITE || 'https://hoppingmouse.com.au';

export default defineConfig({
  site: MODE === 'production' ? PRODUCTION_SITE : 'https://richardbh.github.io',
  base: MODE === 'production' ? '/' : '/hoppingmouse-website',
  trailingSlash: 'ignore',
  integrations: MODE === 'production' ? [sitemap()] : [],
});
