// Genera public/og-image.png (1200×630) con la tipografía y el dibujo de la marca.
// Uso: node scripts/generar-og.mjs
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const t = JSON.parse(await readFile('src/assets/marca/alhambra-paths.json', 'utf8'));
const fuente = (await readFile('public/fonts/nunito-latin-wght-normal.woff2')).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:N;src:url(data:font/woff2;base64,${fuente}) format('woff2');font-weight:200 1000}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;font-family:N;background:#FDF5E5;color:#52301D;display:flex;align-items:center;gap:56px;padding:0 80px;position:relative;overflow:hidden}
body:before{content:'';position:absolute;right:-120px;top:-160px;width:620px;height:620px;border-radius:50%;border:2px dashed #B88255;opacity:.35}
.arco{flex:none;width:400px;height:470px;border-radius:200px 200px 24px 24px;border:3px solid #B88255;background:radial-gradient(circle at 50% 30%,rgba(217,162,115,.35),transparent 60%),linear-gradient(#FFFBF3,#F6EAD3);display:flex;align-items:center;justify-content:center;box-shadow:0 30px 60px -20px rgba(46,26,16,.35)}
svg{width:340px}
h1{font-size:96px;font-weight:800;letter-spacing:-2px;line-height:1}
h1 span{color:#9E683E}
p{font-size:36px;font-weight:650;margin-top:22px;line-height:1.25}
small{display:block;margin-top:30px;font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#7A4A22}
</style></head><body>
<div class="arco"><svg viewBox="${t.viewBox}"><path fill="#52301D" d="${t.oscuro}"/><path fill="#B88255" d="${t.cobre}"/></svg></div>
<div><h1>Granadin<span>IA</span></h1><p>Que ningún cliente se te escape mientras trabajas</p><small>Marketing e IA · Granada</small></div>
</body></html>`;

const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
await pagina.setContent(html);
await pagina.evaluate(() => document.fonts.ready);
await pagina.screenshot({ path: 'public/og-image.png' });
await navegador.close();
console.log('OK public/og-image.png');
