// Genera el icono vectorial de la Alhambra y las imágenes de marca
// a partir de marca-origen/. Se ejecuta a mano: node scripts/generar-marca.mjs
import sharp from 'sharp';
import potrace from 'potrace';
import { writeFile, mkdir } from 'node:fs/promises';
import { promisify } from 'node:util';

const trace = promisify(potrace.trace);
const ORIGEN = 'marca-origen/avatar-instagram.png';
const CROP = { left: 228, top: 318, width: 800, height: 580 };

const { data, info } = await sharp(ORIGEN)
  .extract(CROP)
  .resize(CROP.width * 2, CROP.height * 2, { kernel: 'lanczos3' })
  .raw()
  .toBuffer({ resolveWithObject: true });

function mascara(esCapa) {
  const out = Buffer.alloc(info.width * info.height);
  for (let i = 0; i < info.width * info.height; i++) {
    // descarta lo que queda fuera del círculo interior del avatar (restos del aro)
    const ox = CROP.left + (i % info.width) / 2, oy = CROP.top + Math.floor(i / info.width) / 2;
    if ((ox - 627) ** 2 + (oy - 627) ** 2 > 440 ** 2) { out[i] = 255; continue; }
    const r = data[i * info.channels], g = data[i * info.channels + 1], b = data[i * info.channels + 2];
    out[i] = esCapa(r, g, b) ? 0 : 255;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();
}

const oscuro = (r, g) => r < 135 && g < 95;
const cobre = (r, g, b) => !oscuro(r, g, b) && r > 130 && r < 225 && g < 170 && b < 125 && r - b > 60;

const extraerD = (svg) =>
  [...svg.matchAll(/ d="([^"]+)"/g)]
    .map((m) => m[1])
    .join(' ')
    .replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))))
    .replace(/\s+/g, ' ')
    // quita motas sueltas (restos del aro o ruido del escaneado)
    .split(/(?=M )/)
    .filter((sub) => {
      const n = sub.match(/-?\d+/g).map(Number);
      const xs = n.filter((_, j) => j % 2 === 0), ys = n.filter((_, j) => j % 2 === 1);
      const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
      return Math.max(w, h) >= 40 && Math.min(...ys) < 1100;
    })
    .join('')
    .trim();
const opciones = { turdSize: 30, optTolerance: 0.4, threshold: 128 };
const dOscuro = extraerD(await trace(await mascara(oscuro), opciones));
const dCobre = extraerD(await trace(await mascara(cobre), opciones));

const W = info.width, H = info.height;
await mkdir('src/assets/marca', { recursive: true });
await writeFile(
  'src/assets/marca/alhambra-paths.json',
  JSON.stringify({ viewBox: `0 0 ${W} ${H}`, oscuro: dOscuro, cobre: dCobre }),
);

// icon.svg: la Alhambra dentro de un círculo crema con borde marrón
const pad = 140, size = W + pad * 2;
const cy = (size - H) / 2;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 34}" fill="#FDF5E5" stroke="#52301D" stroke-width="56"/>
<g transform="translate(${pad} ${cy})"><path fill="#52301D" d="${dOscuro}"/><path fill="#9E683E" d="${dCobre}"/></g>
</svg>`;
await writeFile('public/icon.svg', icon);

// PNGs desde el SVG
const svgBuf = Buffer.from(icon);
const png = (s) => sharp(svgBuf, { density: 300 }).resize(s, s).png().toBuffer();
await writeFile('public/apple-touch-icon.png',
  await sharp({ create: { width: 180, height: 180, channels: 4, background: '#FDF5E5' } })
    .composite([{ input: await png(164), top: 8, left: 8 }]).png().toBuffer());
for (const s of [192, 512]) await writeFile(`public/icon-${s}.png`, await png(s));

// favicon.ico con PNG incrustados (16, 32, 48)
const tamaños = [16, 32, 48];
const imgs = await Promise.all(tamaños.map(png));
const cab = Buffer.alloc(6 + 16 * imgs.length);
cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(imgs.length, 4);
let off = cab.length;
imgs.forEach((img, i) => {
  const e = 6 + 16 * i, s = tamaños[i];
  cab.writeUInt8(s, e); cab.writeUInt8(s, e + 1); cab.writeUInt8(0, e + 2); cab.writeUInt8(0, e + 3);
  cab.writeUInt16LE(1, e + 4); cab.writeUInt16LE(32, e + 6);
  cab.writeUInt32LE(img.length, e + 8); cab.writeUInt32LE(off, e + 12);
  off += img.length;
});
await writeFile('public/favicon.ico', Buffer.concat([cab, ...imgs]));
console.log('OK', { W, H, oscuro: dOscuro.length, cobre: dCobre.length, ico: off });
