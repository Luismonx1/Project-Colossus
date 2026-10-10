const projectRoot = require('path').resolve(__dirname, '..');
process.chdir(projectRoot);
const fs = require('fs');
const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const alternateHeroImages = {
  Valus: '../Images/Colossos/Valus/ValusScrollHero.webp',
  Quadratus: '../Images/Colossos/Quadratus/QuadratusScrollHero.webp',
  Gaius: '../Images/Colossos/Gaius/GaiusScrollHero.webp',
  Phaedra: '../Images/Colossos/Phaedra/PhaedraScrollHero.webp',
  Avion: '../Images/Colossos/Avion/AvionScrollHero.webp',
  Barba: '../Images/Colossos/Barba/BarbaScrollHero.webp',
  Hydrus: '../Images/Colossos/Hydrus/HydrusScrollHero.webp',
  Kuromori: '../Images/Colossos/Kuromori/KuromoriScrollHero.webp',
  Basaran: '../Images/Colossos/Basaran/BasaranScrollHero.webp',
};

for (let number = 1; number <= 16; number++) {
  const p = `Pages/Colosso${number}.html`;
  let h = fs.readFileSync(p, 'utf8');
  const title = h.match(/<h1 id="nome">([^<]+)<\/h1>/)?.[1];
  const date = h.match(/<p class="eyebrow">([^<]+)<\/p>/)?.[1];
  const subtitle = h.match(/<p class="subtitle">([^<]+)<\/p>/)?.[1];
  const image = h.match(/<figure class="portrait"><img src="([^"]+)"/)?.[1];
  if (!title || !date || !subtitle || !image) throw new Error(`Dados incompletos em ${p}`);

  h = h
    .replace(/\s*<link rel="stylesheet" href="\.\.\/Assets\/(?:argus|colossus)-hero\/(?:argus|colossus)-hero\.css">/g, '')
    .replace(/\s*<script defer src="\.\.\/Assets\/(?:argus|colossus)-hero\/(?:argus|colossus)-hero\.js"><\/script>/g, '')
    .replace(/\s*<div id="argus-immersive">[\s\S]*?<\/div>\s*(?=<main id="conteudo">)/g, '\n    ')
    .replace(/\s*<div class="colossus-immersive"[\s\S]*?<\/div>\s*(?=<main id="conteudo">)/g, '\n    ')
    .replace('</head>', '    <link rel="stylesheet" href="../Assets/colossus-hero/colossus-hero.css">\n    <script defer src="../Assets/colossus-hero/colossus-hero.js"></script>\n</head>');

  const heroImage = alternateHeroImages[title] || image;
  const hero = `    <div class="colossus-immersive" data-image="${escapeAttribute(heroImage)}" data-title="${escapeAttribute(title)}" data-date="${escapeAttribute(date)}" data-caption="${escapeAttribute(`${title} · ${subtitle}`)}"><p class="immersive-fallback"><a href="#conteudo">Conheça ${title} ↓</a></p></div>\n`;
  h = h.replace('    <main id="conteudo">', `${hero}    <main id="conteudo">`);
  fs.writeFileSync(p, h);
}
