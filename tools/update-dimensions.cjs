const projectRoot = require('path').resolve(__dirname, '..');
const fs = require('fs');
const path = require('path');
const repo = 'C:/Users/luisg/OneDrive/Área de Trabalho/Projeto Colossus/Project-Colossus';
const dimensions = [
  [2, 'Quadratus', '29,9', '42,7'],
  [4, 'Phaedra', '27,1', '30,5'],
  [8, 'Kuromori', '4,9', '17,1'],
  [9, 'Basaran', '22,9', '48,8'],
  [11, 'Celosia', '3,7', '5,5'],
  [12, 'Pelagia', '27,1', '30,5'],
  [14, 'Cenobia', '3,4', '5,5'],
];
for (const [n, name, height, length] of dimensions) {
  const file = `Pages/Colosso${n}.html`;
  let html = fs.readFileSync(path.join(repo, file), 'utf8');
  const original = /<div><dt>Altura aproximada<\/dt><dd>[^<]+ <span>metros\*<\/span><\/dd><\/div>/;
  if (!original.test(html)) throw Error(`Ficha inesperada: ${name}`);
  html = html.replace(original, `<div class="dimensions"><dt>Altura aproximada</dt><dd>${height} <span>metros*</span></dd><dt>Comprimento aproximado</dt><dd>${length} <span>metros*</span></dd></div>`);
  const source = n === 8 ? 'https://gaming.stackexchange.com/a/10800' : `https://colossipedia.blogspot.com/2017/08/${name.toLowerCase()}.html`;
  const label = n === 8 ? 'Arqade — estimativas de altura e comprimento (16 e 56 pés, convertidos para metros)' : 'Colossipédia — estimativas de altura e comprimento';
  const note = n === 8 ? 'Altura e comprimento seguem as estimativas reunidas no Arqade, convertidas de pés para metros e arredondadas.' : 'Altura e comprimento seguem as estimativas da Colossipédia, citada nas fontes.';
  html = html.replace(/<p class="note">\*A medida indicada[^<]+<\/p>/, `<p class="note">*${note} Os valores variam entre fontes e escalas; são referências aproximadas, não medidas oficiais confirmadas.</p>`);
  html = html.replace('</ul></section>', `<li><a href="${source}">${label}</a></li></ul></section>`);
  fs.writeFileSync(path.join(projectRoot, file), html);
  console.log(`${name}: altura ${height} m; comprimento ${length} m`);
}
const css = fs.readFileSync(path.join(repo, 'Styles/Colossos.css'), 'utf8');
fs.writeFileSync(path.join(projectRoot, 'Styles/Colossos.css'), css + '\n/* Duas dimensões no mesmo bloco da ficha, com rótulos independentes. */\n.facts .dimensions dt:not(:first-child) { margin-top: 18px; }\n');
