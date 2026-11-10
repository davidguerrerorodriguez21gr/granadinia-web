// Accesibilidad automática con axe-core (WCAG 2.0/2.1/2.2 A y AA) en todas las páginas,
// móvil y escritorio, tema claro y oscuro, con y sin “reducir movimiento”.
// Uso: node tests/accesibilidad.mjs   (con npm run preview en marcha)
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { writeFile, mkdir } from 'node:fs/promises';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const paginas = ['/', '/aviso-legal', '/privacidad', '/cookies', '/no-existe'];
const dispositivos = { movil: { width: 375, height: 812 }, escritorio: { width: 1440, height: 900 } };
const resultados = [];

const navegador = await chromium.launch({ channel: 'chrome' });
for (const ruta of paginas) {
  for (const [disp, viewport] of Object.entries(dispositivos)) {
    for (const movimiento of ['no-preference', 'reduce']) {
      for (const tema of ['light', 'dark']) {
        const ctx = await navegador.newContext({ viewport, reducedMotion: movimiento, colorScheme: tema });
        const p = await ctx.newPage();
        await p.goto(base + ruta, { waitUntil: 'networkidle' });
        // recorre la página para que todo lo animado quede visible
        const alto = await p.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < alto; y += 500) await p.evaluate((y) => scrollTo(0, y), y);
        await p.waitForTimeout(900);
        await p.evaluate(() => scrollTo(0, 0));
        await p.waitForTimeout(300);
        const r = await new AxeBuilder({ page: p })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
          .analyze();
        const v = r.violations.map((x) => ({ id: x.id, impacto: x.impact, nodos: x.nodes.length, ejemplo: x.nodes[0]?.target.join(' ') }));
        resultados.push({ ruta, disp, movimiento, tema, violaciones: v });
        const graves = v.filter((x) => x.impacto === 'serious' || x.impacto === 'critical');
        console.log(`${graves.length ? '✘' : '✔'} ${ruta} ${disp} ${movimiento} ${tema}: ${v.length} avisos (${graves.length} graves/críticos)`);
        v.forEach((x) => console.log(`    - [${x.impacto}] ${x.id} ×${x.nodos} → ${x.ejemplo}`));
        await ctx.close();
      }
    }
  }
}
await navegador.close();
await mkdir('tests/resultados', { recursive: true });
await writeFile('tests/resultados/axe.json', JSON.stringify(resultados, null, 2));
const graves = resultados.flatMap((r) => r.violaciones).filter((x) => ['serious', 'critical'].includes(x.impacto)).length;
console.log(`\n${resultados.length} combinaciones · ${graves} violaciones graves o críticas`);
process.exit(graves ? 1 : 0);
