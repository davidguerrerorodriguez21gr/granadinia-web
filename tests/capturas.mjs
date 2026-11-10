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
    const archivo = `tests/capturas/${nombre}-${ancho}-${tema === 'light' ? 'claro' : 'oscuro'}.png`;
    await pagina.screenshot({ path: archivo, fullPage: completa });
    console.log('✔', archivo);
    await pagina.close();
  }
}
await navegador.close();
