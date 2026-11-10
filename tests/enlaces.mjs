// Comprueba enlaces internos (páginas y anclas) y recursos de todas las páginas compiladas en dist/.
// Uso: node tests/enlaces.mjs
import { readdir, readFile, access } from 'node:fs/promises';

const paginas = (await readdir('dist')).filter((f) => f.endsWith('.html'));
const ids = {};
for (const p of paginas) {
  const h = await readFile(`dist/${p}`, 'utf8');
  ids[p] = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
}
const existe = async (f) => access(`dist/${f}`).then(() => true, () => false);
let fallos = 0, total = 0;
const externos = new Set();
for (const p of paginas) {
  const h = await readFile(`dist/${p}`, 'utf8');
  for (const [, url] of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    total++;
    if (/^(https?:|mailto:|tel:)/.test(url)) {
      if (url.startsWith('http')) externos.add(url.split('?')[0]);
      continue;
    }
    const [ruta, ancla] = url.split('#');
    let destino = p;
    if (ruta) {
      const r = ruta.replace(/^\//, '').replace(/\/$/, '');
      destino = r === '' ? 'index.html' : (await existe(r)) ? r : `${r}.html`;
      if (!(await existe(destino))) {
        console.log(`✘ ${p}: ${url} no existe`);
        fallos++;
        continue;
      }
    }
    if (ancla && destino.endsWith('.html') && !ids[destino]?.has(ancla)) {
      console.log(`✘ ${p}: ancla #${ancla} no existe en ${destino}`);
      fallos++;
    }
  }
}
console.log(`${total} enlaces revisados en ${paginas.length} páginas · ${fallos} rotos`);
console.log('Enlaces externos:', [...externos].join(', '));
process.exit(fallos ? 1 : 0);
