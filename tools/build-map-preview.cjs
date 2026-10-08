const projectRoot = require('path').resolve(__dirname, '..');
const fs=require('fs');
const path=require('path');
const points=[
[1,'Valus','F5',444,440],[2,'Quadratus','F3',448,297],[3,'Gaius','E2',357,203],[4,'Phaedra','G5',538,442],
[5,'Avion','H4',605,359],[6,'Barba','D6',290,541],[7,'Hydrus','D1',277,105],[8,'Kuromori','G6',511,530],
[9,'Basaran','D3',276,278],[10,'Dirge','B4',109,358],[11,'Celosia','F1',448,115],[12,'Pelagia','G2',539,215],
[13,'Phalanx','E6',376,537],[14,'Cenobia','C2',198,188],[15,'Argus','G1',551,105],[16,'Malus','F8',448,694]
];
fs.writeFileSync(path.join(projectRoot,'Pages/mapa.html'),`<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Explore as Terras Proibidas e descubra a localização dos 16 colossos no mapa."><title>Mapa das Terras Proibidas | Project Colossus</title><link rel="stylesheet" href="../Styles/mapa.css"><script defer src="../Scripts/mapa.js"></script></head>
<body>
<a class="skip-link" href="#mapa-colossos">Pular para o mapa</a>
<header><nav class="navbar" aria-label="Navegação principal"><a class="logo" href="HomePage.html">Project Colossus</a><div class="nav-links"><a href="HomePage.html">Início</a><a href="HomePage.html#colossos">Colossos</a><a href="mapa.html" aria-current="page">Mapa</a></div></nav></header>
<main id="mapa-colossos">
<a class="back-link" href="HomePage.html">← Voltar ao início</a>
<div class="map-heading"><div><p class="eyebrow">Atlas · Shadow of the Colossus</p><h1>Terras Proibidas</h1></div><p class="intro">Dezesseis encontros espalhados pelo silêncio.<br>Toque em um marcador para descobrir quem habita ali.</p></div>
<section class="map-panel" aria-label="Mapa interativo dos colossos">
<div class="map-toolbar"><span><i aria-hidden="true"></i> Localização dos colossos</span><span class="map-count">16 encontros</span></div>
<div class="map-scroll" tabindex="0" role="region" aria-label="Mapa com rolagem horizontal em telas pequenas" aria-describedby="map-help">
<div class="map-canvas" id="map">
<img class="map-image" src="../Images/Outros/MapaExplorado.jpg" alt="Mapa do jogo Shadow of the Colossus, explorado, sem a névoa das arenas, com quadrantes de A a J e de 0 a 8." width="800" height="800" fetchpriority="high" draggable="false">
${points.map(([id,name,coord,x,y])=>`<button class="marker" style="--x:${(x/800*100).toFixed(3)}%;--y:${(y/800*100).toFixed(3)}%" data-name="${name}" data-number="${String(id).padStart(2,'0')}" aria-label="${String(id).padStart(2,'0')} · ${name}, quadrante ${coord}" aria-expanded="false" aria-controls="map-popup"><svg viewBox="0 0 24 32" aria-hidden="true" focusable="false"><path d="M12 30S2 18 2 12a10 10 0 0 1 20 0c0 6-10 18-10 18Z"/><circle cx="12" cy="12" r="3.5"/></svg></button>`).join('\n')}
<div class="map-popup" id="map-popup" role="dialog" aria-labelledby="popup-title" hidden><button class="close-popup" type="button" aria-label="Fechar nome do colosso">×</button><p class="popup-number" id="popup-number"></p><h2 id="popup-title"><a id="popup-link"></a></h2></div>
</div></div>
<div class="map-caption"><p id="map-help">Selecione um pin para revelar o nome.<span class="mobile-help"> Deslize o mapa para explorar os lados.</span></p><p>Posições aproximadas · <a href="https://nomads-sotc-blog.blogspot.com/2013/09/maps-symbols-icons-secrets.html" target="_blank" rel="noopener noreferrer">Mapa: Nomad’s blog ↗</a></p></div>
</section>
<div class="map-bottom"><span class="eyebrow">Cada caminho leva a um gigante.</span><a href="HomePage.html#colossos">Conhecer os colossos <span aria-hidden="true">↗</span></a></div>
</main>
<footer><a class="logo" href="HomePage.html">Project Colossus</a><p>Um projeto de fã dedicado a Shadow of the Colossus.</p></footer>
</body></html>`);
