const projectRoot = require('path').resolve(__dirname, '..');
const fs = require('fs');
const path = require('path');
const file = path.join(projectRoot, 'Pages/HomePage.html');
let html = fs.readFileSync(file, 'utf8');
html = html.replace('lang="en"', 'lang="pt-BR"').replace('<title>Home Page</title>', '<title>Project Colossus | Terras Proibidas</title>');
html = html.replaceAll('src="/', 'src="../').replaceAll('href="/Styles/', 'href="../Styles/');
html = html.replace(/<nav class="navbar">[\s\S]*?<\/nav>/, `<a class="skip-link" href="#colossos">Pular para os colossos</a>
    <header class="site-header" id="inicio">
        <nav class="navbar" aria-label="Navegação principal">
            <a class="logo" href="HomePage.html">Project Colossus</a>
            <ul class="nav-links">
                <li><a href="#inicio" aria-current="page">Início</a></li>
                <li><a href="#colossos">Colossos</a></li>
                <li><a href="mapa.html">Mapa</a></li>
                <li><a href="#sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="hero" aria-labelledby="hero-title">
            <div class="hero-content">
                <p class="eyebrow">Shadow of the Colossus</p>
                <h1 id="hero-title">Uma jornada pelas<br>Terras Proibidas</h1>
                <p class="hero-description">Conheça os gigantes que habitam este mundo esquecido.</p>
                <a class="explore-link" href="#colossos">Explorar os colossos <span aria-hidden="true">→</span></a>
                <p class="hero-note">Em terras esquecidas,<br>a grandeza ainda ecoa.</p>
            </div>
        </section>`);
html = html.replace('<h2>Colossus</h2>', '<div class="section-heading"><h2>Os colossos</h2><p>16 gigantes · Uma jornada</p></div>');
let number = 0;
html = html.replace(/<div class="card" style="width: 18rem;">\s*(<img[^>]+>)\s*<div class="card-body">\s*<p class="open-modal" data-title="[^"]*"\s*data-desc="([^"]*)"\s*data-link="([^"]*)">\s*([^<]+?)\s*<\/p>\s*<\/div>\s*<\/div>/g, (_, img, desc, link, name) => {
    number++;
    name = name.trim();
    img = img.replace(/alt="[^"]*"/, 'alt="" loading="lazy" width="480" height="360"');
    return `<button type="button" class="card open-modal" data-title="${name}" data-desc="${desc}" data-link="${link}" aria-haspopup="dialog" aria-label="Conhecer ${name}">${img}<span class="card-body"><span class="card-number">${String(number).padStart(2, '0')}</span><span class="card-name">${name}</span><span class="card-arrow" aria-hidden="true">→</span></span></button>`;
});
if (number !== 16) throw new Error(`Expected 16 cards, got ${number}`);
html = html.replace('<div id="modal-bg" class="modal-bg">', '</main>\n    <div id="modal-bg" class="modal-bg" hidden>');
html = html.replace('<div class="modal">', '<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc" tabindex="-1">\n            <p class="eyebrow">A voz de Dormin</p>');
html = html.replace('class="open-link" target="_blank"', 'class="open-link"');
html = html.replace('<div class="close-btn" id="close-modal">Fechar</div>\n        </div>', '<button type="button" class="close-btn" id="close-modal">Fechar</button>\n        </section>');
// Accept the source checkout's Windows line endings as well.
html = html.replace('<div class="close-btn" id="close-modal">Fechar</div>\r\n        </div>', '<button type="button" class="close-btn" id="close-modal">Fechar</button>\n        </section>');
html = html.replace(/<footer>[\s\S]*?<\/footer>/, '<footer id="sobre"><a class="logo" href="#inicio">Project Colossus</a><p>Um projeto de fã dedicado ao universo de Shadow of the Colossus.</p><a class="back-top" href="#inicio">Voltar ao início ↑</a></footer>');
fs.writeFileSync(file, html);
fs.copyFileSync(path.join(projectRoot, 'tools/templates/home-v2.css'), path.join(projectRoot, 'Styles/HomePage.css'));
fs.copyFileSync(path.join(projectRoot, 'tools/templates/popup-v2.js'), path.join(projectRoot, 'Scripts/popup.js'));
console.log(`HomePage updated: ${number} accessible cards.`);

