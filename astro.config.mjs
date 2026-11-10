// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El sitio va en la raíz del dominio: no hay `base`.
export default defineConfig({
  site: 'https://granadinia.es',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/sistema-diseno') })],
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
