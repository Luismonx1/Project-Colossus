const projectRoot = require('path').resolve(__dirname, '..');
process.chdir(projectRoot);
const fs = require('fs');
const p = 'Pages/Colosso15.html';
let h = fs.readFileSync(p, 'utf8');
if (!h.includes('../Assets/argus-hero/argus-hero.css')) h = h.replace('</head>', '    <link rel="stylesheet" href="../Assets/argus-hero/argus-hero.css">\n</head>');
if (!h.includes('../Assets/argus-hero/argus-hero.js')) h = h.replace('</head>', '    <script defer src="../Assets/argus-hero/argus-hero.js"></script>\n</head>');
if (!h.includes('id="argus-immersive"')) h = h.replace('    <main id="conteudo">', '    <div id="argus-immersive"><p style="text-align:center;padding:24px"><a href="#conteudo">Conheça Argus ↓</a></p></div>\n    <main id="conteudo">');
fs.writeFileSync(p, h);
