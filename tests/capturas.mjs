// Capturas de pantalla con Playwright (usa el Chrome instalado).
// Uso: node tests/capturas.mjs [ruta=/] [nombre=inicio] [--completa]
// Requiere la previsualización en marcha: npm run preview
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const ruta = process.argv[2] ?? '/';
const nombre = process.argv[3] ?? 'inicio';
const completa = process.argv.includes('--completa');
const base = process.env.BASE_URL ?? 'http://localhost:4321';
const anchos = [
  { ancho: 360, alto: 780 },
  { ancho: 768, alto: 1024 },
  { ancho: 1440, alto: 900 },
];

await mkdir('tests/capturas', { recursive: true });
const navegador = await chromium.launch({ channel: 'chrome' });
for (const tema of ['light', 'dark']) {
  for (const { ancho, alto } of anchos) {
    const pagina = await navegador.newPage({
      viewport: { width: ancho, height: alto },
      deviceScaleFactor: 2,
      colorScheme: tema,
    });
    await pagina.goto(base + ruta, { waitUntil: 'networkidle' });
    await pagina.waitForTimeout(3200); // deja terminar la animación del hero
    if (completa) {
      // recorre la página para que se revelen las secciones animadas
      const alto = await pagina.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < alto; y += 400) {
        await pagina.evaluate((y) => window.scrollTo(0, y), y);
        await pagina.waitForTimeout(60);
      }
      await pagina.waitForTimeout(800);
      await pagina.evaluate(() => window.scrollTo(0, 0));
      await pagina.waitForTimeout(300);
    }
    const sufijo = `${ancho}-${tema === 'light' ? 'claro' : 'oscuro'}`;
    if (completa) {
      // Una captura por sección (Chrome no admite capturas de más de 16 384 px de alto)
      // Oculta lo fijo (cabecera, barra inferior) para que no se repita en cada recorte
      await pagina.addStyleTag({ content: '.cabecera,.barra-movil,.saltar{visibility:hidden!important}' });
      const bloques = await pagina.$$('main > section, body > footer');
      for (const [i, bloque] of bloques.entries()) {
        const id = (await bloque.getAttribute('id')) ?? (i === 0 ? 'hero' : `bloque-${i}`);
        const archivo = `tests/capturas/${nombre}-${String(i).padStart(2, '0')}-${id}-${sufijo}.png`;
        await bloque.scrollIntoViewIfNeeded();
        await pagina.waitForTimeout(250);
        await bloque.screenshot({ path: archivo });
      }
      console.log('✔', nombre, sufijo, bloques.length, 'secciones');
    } else {
      const archivo = `tests/capturas/${nombre}-${sufijo}.png`;
      await pagina.screenshot({ path: archivo });
      console.log('✔', archivo);
    }
    await pagina.close();
  }
}
await navegador.close();
