// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * SITE_URL and BASE_PATH let the same code deploy to the custom domain
 * (https://redoxtronics.com) or to a GitHub Pages project URL
 * (e.g. https://<user>.github.io/<repo>). The GitHub Actions workflow sets
 * both automatically; locally the defaults below are used.
 */
// Always advertise HTTPS (GitHub reports http:// until "Enforce HTTPS" is ticked).
const site = (process.env.SITE_URL || 'https://redoxtronics.com').replace(
  /^http:\/\/(?!localhost|127\.0\.0\.1)/,
  'https://',
);
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  scopedStyleStrategy: 'class',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
