const projectRoot = require('path').resolve(__dirname, '..');
const fs = require('fs');
const path = require('path');
const source = 'C:/Users/luisg/OneDrive/Área de Trabalho/Projeto Colossus/Project-Colossus';
let html = fs.readFileSync(path.join(source, 'Pages/HomePage.html'), 'utf8');
const cards = [...html.matchAll(/<button type="button" class="card open-modal" data-title="([^"]+)" data-desc="([^"]+)" data-link="([^"]+)"[^>]*><img src="([^"]+)"/g)];
if (cards.length !== 16) throw new Error('Expected all 16 colossi');
const thumbs = cards.map(([,name,desc,link,img], i) => `<a class="colossus-thumb" href="${link}" data-name="${name}" data-description="${desc.replace(/\s+/g, ' ')}" data-image="${img}" aria-label="Selecionar ${name}, colosso ${i+1}"><img src="${img}" alt="" width="120" height="90" loading="lazy"><span><small>${String(i+1).padStart(2,'0')}</small> ${name}</span></a>`).join('\n                ');
const section = `<section id="colossos" aria-labelledby="colossos-title">
        <div class="section-heading"><h2 id="colossos-title">Os colossos</h2><p>16 gigantes · Uma jornada</p></div>
        <div class="colossus-gallery">
            <article class="colossus-feature" aria-labelledby="featured-name">
                <div class="featured-art"><span class="art-number" aria-hidden="true" id="art-number">01</span><img id="featured-image" src="${cards[0][4]}" alt="Valus, o primeiro colosso" width="640" height="480"></div>
                <div class="featured-info">
                    <p class="eyebrow">Terras Proibidas <span aria-hidden="true">/</span> <span id="featured-number">Colosso 01</span></p>
                    <h3 id="featured-name">Valus</h3>
                    <p class="quote-label">A voz de Dormin</p>
                    <blockquote><p id="featured-quote">${cards[0][2].split('\\n')[0].trim()}</p><cite>— Dormin</cite></blockquote>
                    <a id="featured-link" class="explore-link" href="Colosso1.html">Conhecer o colosso <span aria-hidden="true">↗</span></a>
                    <div class="gallery-navigation" hidden>
                        <button id="previous-colossus" type="button" aria-label="Colosso anterior">←</button>
                        <span id="gallery-position">01 / 16</span>
                        <button id="next-colossus" type="button" aria-label="Próximo colosso">→</button>
                    </div>
                </div>
            </article>
            <div class="selector-heading"><p>Escolha seu próximo encontro</p><span>01 — 16</span></div>
            <div class="colossus-selector" aria-label="Escolher colosso">
                ${thumbs}
            </div>
            <p class="gallery-hint">Deslize as miniaturas para explorar os 16 colossos.</p>
            <p id="gallery-status" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></p>
        </div>
    </section>`;
html = html.replace(/<section id="colossos">[\s\S]*?<\/section>/,section);
html = html.replace('../Scripts/popup.js','../Scripts/galeria.js');
html = html.replace(/    <div id="modal-bg"[\s\S]*?<audio[^>]+><\/audio>/,'');
fs.writeFileSync(path.join(projectRoot,'Pages/HomePage.html'), html);
let css = fs.readFileSync(path.join(source,'Styles/HomePage.css'),'utf8');
css = css.replace(/\.cards-container \{[\s\S]*?(?=footer \{)/,'');
css = css.split('\n').filter(line => !/\.cards-container|\.card-body|\.card-name|\.card-number|\.card-arrow|\.modal |body\.modal-open/.test(line)).join('\n');
css = css.trim() + '\n\n' + fs.readFileSync(path.join(projectRoot,'tools/templates/gallery.css'),'utf8').trim() + '\n';
fs.writeFileSync(path.join(projectRoot,'Styles/HomePage.css'),css);
console.log('Gallery generated with 16 entries and unchanged source quotes.');
