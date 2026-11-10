// Quita el fondo de la foto de David (se ejecuta una vez, en local).
// Uso: npm i --no-save @imgly/background-removal-node && node scripts/quitar-fondo.mjs
import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const entrada = await readFile('marca-origen/foto-david-original.jpg');
const blob = new Blob([entrada], { type: 'image/jpeg' });
const salida = await removeBackground(blob, { model: 'medium', output: { format: 'image/png' } });
const png = Buffer.from(await salida.arrayBuffer());
// Recorte: de la cabeza a la cintura, 3:4
await sharp(png).extract({ left: 120, top: 220, width: 1320, height: 1760 }).resize(900).png().toFile('src/assets/david.png');
console.log('OK src/assets/david.png');
