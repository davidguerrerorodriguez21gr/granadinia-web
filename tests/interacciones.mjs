// Pruebas de las interacciones principales. Uso: node tests/interacciones.mjs
// Requiere la previsualización en marcha (npm run preview).
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
let fallos = 0;
const ok = (cond, texto) => {
  console.log(cond ? '  ✔' : '  ✘', texto);
  if (!cond) fallos++;
};
const foco = (p) => p.evaluate(() => document.activeElement?.id || document.activeElement?.textContent?.trim().slice(0, 40));

const navegador = await chromium.launch({ channel: 'chrome' });

/* ---------- Escritorio ---------- */
{
  const p = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
  const navegaciones = [];
  await p.route(/wa\.me|^mailto:/, (r) => r.abort());
  p.on('request', (r) => navegaciones.push(r.url()));
  await p.goto(base + '/');
  console.log('Tarjetas “¿Te suena?”');
  const b = p.locator('[data-problema-boton]').first();
  ok((await b.getAttribute('aria-expanded')) === 'false', 'empiezan cerradas con JS');
  await b.focus();
  await p.keyboard.press('Enter');
  ok((await b.getAttribute('aria-expanded')) === 'true', 'Enter abre la tarjeta');
  ok(await p.locator('#solucion-0').isVisible(), 'el panel se ve');

  console.log('Pestañas de la solución');
  const pest = p.locator('[role="tab"]');
  ok((await pest.count()) === 5, '5 pestañas');
  await pest.first().focus();
  await p.keyboard.press('ArrowDown');
  ok((await pest.nth(1).getAttribute('aria-selected')) === 'true', 'Flecha abajo selecciona la siguiente');
  ok(await p.locator('#pieza-whatsapp').isVisible(), 'su panel se muestra');
  ok(!(await p.locator('#pieza-google').isVisible()), 'el anterior se oculta');
  await p.keyboard.press('End');
  ok((await pest.nth(4).getAttribute('aria-selected')) === 'true', 'Fin va a la última');
  await p.keyboard.press('ArrowDown');
  ok((await pest.nth(0).getAttribute('aria-selected')) === 'true', 'da la vuelta al principio');

  console.log('Calculadora');
  await p.fill('#calc-perdidas', '4');
  await p.fill('#calc-decada10', '3');
  await p.fill('#calc-valor', '150');
  await p.waitForTimeout(600);
  const res = await p.locator('[data-calc-resultado]').innerText();
  // 4 × 52 × 0,3 × 150 = 9 360 €/año → 780 €/mes
  ok(/780/.test(res) && /9\.?360/.test(res), `cuenta correcta (${res.replace(/\s+/g, ' ')})`);
  ok((await p.locator('[data-calc-resultado]').getAttribute('aria-live')) === 'polite', 'resultado en región aria-live');

  console.log('Formulario de contacto');
  await p.click('form[data-formulario] button[value="whatsapp"]');
  ok((await foco(p)) === 'f-nombre', 'sin datos, el foco va al primer error');
  ok((await p.getAttribute('#f-nombre', 'aria-invalid')) === 'true', 'aria-invalid en el campo');
  ok(await p.locator('#f-nombre-error').isVisible(), 'mensaje de error en texto');
  await p.fill('#f-nombre', 'María José');
  await p.fill('#f-negocio', 'Fontanería');
  await p.fill('#f-localidad', 'Peligros');
  await p.fill('#f-mejora', 'Pierdo llamadas y quiero más reseñas, ¿cómo lo hago?');
  await p.click('form[data-formulario] button[value="whatsapp"]');
  ok((await foco(p)) === 'f-privacidad', 'sin aceptar la privacidad no se envía');
  await p.check('#f-privacidad');
  await p.click('form[data-formulario] button[value="whatsapp"]');
  await p.waitForTimeout(500);
  const wa = navegaciones.find((u) => u.includes('wa.me'));
  ok(!!wa, 'abre wa.me');
  if (wa) {
    const texto = decodeURIComponent(new URL(wa).searchParams.get('text') ?? '');
    ok(texto.includes('Nombre: María José') && texto.includes('reseñas, ¿cómo'), 'texto con tildes y eñes bien codificado');
    console.log('     →', wa.slice(0, 110) + '…');
  }

  console.log('Interruptor “Reducir animaciones”');
  await p.goto(base + '/'); // el intento de abrir WhatsApp deja la pestaña en otra página
  const sw = p.locator('[data-movimiento-boton]');
  await sw.click();
  ok((await sw.getAttribute('aria-checked')) === 'true', 'se activa');
  ok(!(await p.evaluate(() => document.documentElement.classList.contains('anima'))), 'quita las animaciones');
  ok((await p.evaluate(() => localStorage.getItem('granadinia-movimiento'))) === 'reducido', 'se recuerda');
  await sw.click();
  ok((await p.evaluate(() => localStorage.getItem('granadinia-movimiento'))) === null, 'se puede desactivar');
  ok((await p.context().cookies()).length === 0, 'ninguna cookie');
  await p.close();
}

/* ---------- Móvil 320 px y sin JS ---------- */
for (const js of [true, false]) {
  const ctx = await navegador.newContext({ viewport: { width: 320, height: 640 }, javaScriptEnabled: js });
  const p = await ctx.newPage();
  await p.goto(base + '/');
  console.log(`Móvil 320 px ${js ? 'con' : 'sin'} JS`);
  ok(!(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)), 'sin scroll horizontal');
  const ocultos = await p.evaluate(() =>
    [...document.querySelectorAll('main h2, main h3, main p:not(.escribiendo)')].filter((e) => getComputedStyle(e).opacity === '0').length,
  );
  ok(ocultos === 0 || js, `ningún texto empieza invisible sin JS (${ocultos})`);
  if (!js) {
    ok(await p.locator('#solucion-0').isVisible(), 'las soluciones se leen sin JS');
    ok(await p.locator('#pieza-formacion').isVisible(), 'todas las piezas se leen sin JS');
  }
  await ctx.close();
}

/* ---------- Reducir movimiento del sistema ---------- */
{
  const ctx = await navegador.newContext({ reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + '/');
  console.log('prefers-reduced-motion: reduce');
  ok(!(await p.evaluate(() => document.documentElement.classList.contains('anima'))), 'sin clase de animación');
  ok(await p.locator('.burbuja--sale').isVisible(), 'el hero se ve completo y quieto');
  await ctx.close();
}

/* ---------- Menú móvil a pantalla completa ---------- */
{
  const ctx = await navegador.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base + '/');
  console.log('Menú móvil');
  for (const [cuando, y] of [['arriba del todo', 0], ['tras bajar', 1500]]) {
    await p.evaluate((y) => scrollTo(0, y), y);
    await p.waitForTimeout(200);
    await p.click('[data-menu-boton]');
    await p.waitForTimeout(300);
    const r = await p.evaluate(() => {
      const n = document.querySelector('.cabecera__nav').getBoundingClientRect();
      return { bajo: n.bottom, alto: innerHeight };
    });
    ok(r.bajo >= r.alto - 1, `${cuando}: el menú llega hasta abajo de la pantalla (${Math.round(r.bajo)} de ${r.alto} px)`);
    ok(await p.locator('.menu__solo-movil .boton').isVisible(), `${cuando}: se ve el botón de WhatsApp del menú`);
    await p.keyboard.press('Escape');
  }
  await ctx.close();
}

await navegador.close();
console.log(fallos ? `\n${fallos} fallo(s)` : '\nTodo correcto');
process.exit(fallos ? 1 : 0);
