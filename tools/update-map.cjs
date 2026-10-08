const projectRoot = require('path').resolve(__dirname, '..');
process.chdir(projectRoot);
const fs=require('fs');const p='tools/build-map-preview.cjs';let s=fs.readFileSync(p,'utf8');s=s.replace(/const points=\[[\s\S]*?\n\];/,`const points=[
[1,'Valus','F5',444,440],[2,'Quadratus','F3',448,297],[3,'Gaius','E2',357,203],[4,'Phaedra','G5',538,442],
[5,'Avion','H4',605,359],[6,'Barba','D6',290,541],[7,'Hydrus','D1',277,105],[8,'Kuromori','G6',511,530],
[9,'Basaran','D3',276,278],[10,'Dirge','B4',109,358],[11,'Celosia','F1',448,115],[12,'Pelagia','G2',539,215],
[13,'Phalanx','E6',376,537],[14,'Cenobia','C2',198,188],[15,'Argus','G1',551,105],[16,'Malus','F8',448,694]
];`);
s=s.replaceAll('MapaTemplate.webp','MapaExplorado.jpg').replace('com quadrantes de A a K e de 1 a 8.','explorado, sem a névoa das arenas, com quadrantes de A a J e de 0 a 8.').replace('width="860" height="484"','width="800" height="800"').replaceAll('x/860','x/800').replaceAll('y/484','y/800');
s=s.replace('<span>${String(id).padStart(2,\'0\')}</span></button>','<svg viewBox="0 0 24 32" aria-hidden="true" focusable="false"><path d="M12 30S2 18 2 12a10 10 0 0 1 20 0c0 6-10 18-10 18Z"/><circle cx="12" cy="12" r="3.5"/></svg></button>');
s=s.replace('Selecione um número para revelar o nome.','Selecione um pin para revelar o nome.').replace('Marcadores em posições aproximadas.','Posições aproximadas · <a href="https://nomads-sotc-blog.blogspot.com/2013/09/maps-symbols-icons-secrets.html" target="_blank" rel="noopener noreferrer">Mapa: Nomad’s blog ↗</a>');fs.writeFileSync(p,s);
