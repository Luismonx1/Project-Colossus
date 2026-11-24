import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const colossi = ['Valus', 'Quadratus', 'Gaius', 'Phaedra', 'Avion', 'Barba', 'Hydrus', 'Kuromori', 'Basaran', 'Dirge', 'Celosia', 'Pelagia', 'Phalanx', 'Cenobia', 'Argus', 'Malus'];

await sharp(path.join(root, 'Images/Outros/terras-proibidas-wander-agro.png'))
  .resize({ width: 1536, withoutEnlargement: true })
  .webp({ quality: 84, effort: 6 })
  .toFile(path.join(root, 'Images/Outros/terras-proibidas-wander-agro.webp'));

await sharp(path.join(root, 'Images/Colossos/Valus/ValusCinematic.png'))
  .webp({ quality: 88, effort: 6 })
  .toFile(path.join(root, 'Images/Colossos/Valus/ValusCinematic.webp'));

const thumbnailDirectory = path.join(root, 'Images/Colossos/Thumbnails');
await fs.mkdir(thumbnailDirectory, { recursive: true });

for (const name of colossi) {
  const extension = name === 'Valus' ? 'webp' : 'webp';
  const source = path.join(root, `Images/Colossos/${name}/${name}Cinematic.${extension}`);
  await sharp(source)
    .resize(320, 320, { fit: 'cover', position: 'attention' })
    .webp({ quality: 76, effort: 5 })
    .toFile(path.join(thumbnailDirectory, `${name}.webp`));
}

console.log('Imagens WebP e 16 miniaturas geradas.');
