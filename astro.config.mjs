// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El sitio va en la raíz del dominio: no hay `base`.
export default defineConfig({
  site: 'https://granadinia.es',
  trailingSlash: 'never',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/sistema-diseno') })],
  // Páginas como /aviso-legal.html → se sirven en /aviso-legal (sin barra final)
  build: { format: 'file', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
