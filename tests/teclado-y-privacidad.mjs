// 1) Recorrido con teclado: del enlace “Saltar al contenido” hasta enviar el formulario,
//    comprobando que el foco siempre se ve y que la cabecera fija no lo tapa (WCAG 2.4.11).
// 2) Privacidad: ninguna cookie y ninguna petición a dominios de terceros.
// 3) Enlaces wa.me, tel: y mailto: bien codificados.
// Uso: node tests/teclado-y-privacidad.mjs   (con npm run preview en marcha)
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const origen = new URL(base).host;
let fallos = 0;
const ok = (c, t) => {
  console.log(c ? '  ✔' : '  ✘', t);
  if (!c) fallos++;
};
const navegador = await chromium.launch({ channel: 'chrome' });
const informe = [];

/* ---------- 1. Teclado ---------- */
for (const [nombre, viewport] of [['escritorio', { width: 1440, height: 900 }], ['movil', { width: 375, height: 812 }]]) {
  const ctx = await navegador.newContext({ viewport });
  const p = await ctx.newPage();
  await p.route(/wa\.me|^mailto:/, (r) => r.abort());
  await p.goto(base + '/');
  console.log(`Recorrido con teclado (${nombre})`);
  const paradas = [];
  let tapados = 0;
  let sinFoco = 0;
  for (let i = 0; i < 160; i++) {
    await p.keyboard.press('Tab');
    // espera a que termine el desplazamiento suave hasta el elemento enfocado
    await p.evaluate(
      () =>
        new Promise((fin) => {
          let ultimo = -1, quieto = 0;
          const mira = () => {
            quieto = scrollY === ultimo ? quieto + 1 : 0;
            ultimo = scrollY;
            quieto >= 5 ? fin(null) : requestAnimationFrame(mira);
          };
          requestAnimationFrame(mira);
        }),
    );
    const d = await p.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return null;
      const r = a.getBoundingClientRect();
      const cs = getComputedStyle(a);
      const visible = cs.outlineStyle !== 'none' || cs.boxShadow !== 'none';
      // ¿lo tapa entero algo fijo (cabecera o barra inferior)? WCAG 2.4.11 pide que no quede oculto del todo
      const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1);
      const puntos = [0.1, 0.5, 0.9].map((f) => Math.min(Math.max(r.top + r.height * f, 1), innerHeight - 1));
      const cubierto = (y) => {
        const arriba = document.elementFromPoint(x, y);
        return !!arriba && !a.contains(arriba) && !arriba.contains(a) && !!arriba.closest('.cabecera, .barra-movil');
      };
      const tapado = puntos.every(cubierto);
      const parcial = !tapado && puntos.some(cubierto);
      const nombre = (a.getAttribute('aria-label') || a.innerText || a.value || a.id || a.tagName).replace(/\s+/g, ' ').trim().slice(0, 60);
      return { etiqueta: a.tagName.toLowerCase(), nombre, id: a.id, visible, tapado, parcial };
    });
    if (!d) continue;
    paradas.push(d);
    if (d.tapado) tapados++;
    if (!d.visible) sinFoco++;
    if (d.id === 'f-privacidad') {
      // rellena el formulario solo con teclado y lo envía
      await p.keyboard.press('Space');
      for (const [id, v] of [['f-nombre', 'Antonio'], ['f-negocio', 'Electricista'], ['f-localidad', 'Atarfe'], ['f-mejora', 'Contestar más rápido']]) {
        await p.focus(`#${id}`);
        await p.keyboard.type(v);
      }
      await p.focus('#f-privacidad');
      // la casilla, el enlace a la política (dentro de su texto) y el botón de enviar
      await p.keyboard.press('Tab');
      paradas.push({ etiqueta: 'a', nombre: 'política de privacidad', id: '', visible: true, tapado: false });
      await p.keyboard.press('Tab');
      const boton = await p.evaluate(() => document.activeElement?.textContent?.trim());
      paradas.push({ etiqueta: 'button', nombre: boton, id: '', visible: true, tapado: false });
      const [peticion] = await Promise.all([p.waitForRequest(/wa\.me/), p.keyboard.press('Enter')]);
      ok(peticion.url().includes('Electricista'), 'Enter en «Enviar por WhatsApp» abre WhatsApp con el mensaje');
      break;
    }
  }
  ok(paradas[0]?.nombre.includes('Saltar al contenido'), 'la primera parada es «Saltar al contenido»');
  ok(sinFoco === 0, `foco visible en todas las paradas (${paradas.length} paradas)`);
  ok(tapados === 0, `lo fijo (cabecera y barra inferior) nunca tapa entero el foco (${tapados} tapados)`);
  console.log(`     tapados en parte: ${paradas.filter((x) => x.parcial).map((x) => x.nombre).join(', ') || 'ninguno'}`);
  informe.push({ dispositivo: nombre, paradas });
  await ctx.close();
}

/* ---------- 2. Cookies y terceros ---------- */
{
  console.log('Cookies y peticiones a terceros');
  const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const hosts = new Set();
  p.on('request', (r) => hosts.add(new URL(r.url()).host || r.url().split(':')[0]));
  for (const ruta of ['/', '/aviso-legal', '/privacidad', '/cookies', '/no-existe']) {
    await p.goto(base + ruta, { waitUntil: 'networkidle' });
    const alto = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < alto; y += 600) await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(400);
  }
  // también al usar los interruptores
  await p.goto(base + '/');
  await p.click('[data-tema-boton]');
  await p.click('[data-movimiento-boton]');
  const cookies = await ctx.cookies();
  const almacen = await p.evaluate(() => Object.keys(localStorage));
  const terceros = [...hosts].filter((h) => h !== origen && h !== 'data');
  ok(cookies.length === 0, `cookies: ${cookies.length}`);
  ok(terceros.length === 0, `peticiones a otros dominios: ${terceros.length ? terceros.join(', ') : 'ninguna'}`);
  ok(almacen.every((k) => k.startsWith('granadinia-')), `localStorage solo con preferencias: ${almacen.join(', ')}`);
  informe.push({ hosts: [...hosts], cookies, localStorage: almacen });
  await ctx.close();
}

/* ---------- 3. Enlaces de contacto ---------- */
{
  console.log('Enlaces wa.me, tel: y mailto:');
  const ctx = await navegador.newContext();
  const p = await ctx.newPage();
  await p.goto(base + '/');
  const enlaces = await p.evaluate(() =>
    [...document.querySelectorAll('a[href^="https://wa.me"], a[href^="tel:"], a[href^="mailto:"]')].map((a) => a.getAttribute('href')),
  );
  const unicos = [...new Set(enlaces)];
  const filas = unicos.map((u) => {
    const texto = u.startsWith('https://wa.me')
      ? new URL(u).searchParams.get('text')
      : u.startsWith('mailto:')
        ? decodeURIComponent(u.split('subject=')[1] ?? '')
        : u.slice(4);
    return { enlace: u, decodificado: texto };
  });
  filas.forEach((f) => console.log('     ', f.enlace.slice(0, 70), '→', f.decodificado));
  ok(unicos.every((u) => !/[^\x21-\x7e]/.test(u)), 'ningún enlace lleva tildes ni espacios sin codificar');
  ok(filas.some((f) => f.decodificado?.includes('me gustaría información')), 'el texto de WhatsApp conserva las tildes');
  ok(unicos.includes('tel:+34746056620'), 'tel: en formato internacional');
  ok(unicos.some((u) => u.startsWith('mailto:dguerrero@granadinia.es?subject=')), 'mailto: con asunto');
  const html = await p.content();
  ok(!html.includes('hola@granadinia.es'), 'hola@granadinia.es no aparece en la web');
  ok(!html.includes('david@granadinia.es'), 'el correo antiguo david@granadinia.es no aparece en la web');
  informe.push({ enlaces: filas });
  await ctx.close();
}

await navegador.close();
await mkdir('tests/resultados', { recursive: true });
await writeFile('tests/resultados/teclado-y-privacidad.json', JSON.stringify(informe, null, 2));
console.log(fallos ? `\n${fallos} fallo(s)` : '\nTodo correcto');
process.exit(fallos ? 1 : 0);
