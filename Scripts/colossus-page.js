(() => {
    const match = location.pathname.match(/Colosso(\d+)\.html$/i);
    if (!match) return;

    const number = Number(match[1]);
    const names = ['Valus', 'Quadratus', 'Gaius', 'Phaedra', 'Avion', 'Barba', 'Hydrus', 'Kuromori',
        'Basaran', 'Dirge', 'Celosia', 'Pelagia', 'Phalanx', 'Cenobia', 'Argus', 'Malus'];
    const progressKey = 'colossus-atlas-progress-v1';
    const spoilerKey = 'colossus-spoiler-mode-v1';
    const deathScreenFiles = ['01-valus-remake.webp', '02-quadratus-remake.webp', '03-gaius-remake.webp', '04-phaedra-remake.webp',
        '05-avion-remake.webp', '06-barba-remake.webp', '07-hydrus-remake.webp', '08-kuromori-remake.webp', '09-basaran-remake.webp', '10-dirge-remake.webp',
        '11-celosia-remake.webp', '12-pelagia-remake.webp', '13-phalanx-remake.webp', '14-cenobia-remake.webp', '15-argus-remake.webp', '16-malus-remake.webp'];
    const pageEnd = document.querySelector('.page-end');
    const facts = document.querySelector('.facts');
    const locationLink = document.querySelector('.location a[href="mapa.html"]');

    const route = document.createElement('nav');
    route.className = 'colossus-route-nav';
    route.setAttribute('aria-label', 'Navegação entre os colossos');
    const previous = number > 1
        ? `<a href="Colosso${number - 1}.html"><span>← Anterior</span><strong>${String(number - 1).padStart(2, '0')} · ${names[number - 2]}</strong></a>`
        : '<span class="route-disabled" aria-disabled="true"><span>← Anterior</span><strong>Início da jornada</strong></span>';
    const next = number < 16
        ? `<a href="Colosso${number + 1}.html"><span>Próximo →</span><strong>${String(number + 1).padStart(2, '0')} · ${names[number]}</strong></a>`
        : '<span class="route-disabled" aria-disabled="true"><span>Próximo →</span><strong>Fim da jornada</strong></span>';
    route.innerHTML = `${previous}<a class="route-map" href="mapa.html?colosso=${number}"><span>Ver localização</span><strong>Abrir no mapa ↗</strong></a>${next}`;
    pageEnd.before(route);
    route.querySelectorAll('a:not(.route-map)').forEach(link => {
        const target = Number(link.getAttribute('href').match(/\d+/)?.[0]);
        const label = link.querySelector('strong');
        if (target && label) label.dataset.revealedLabel = label.textContent;
    });
    if (locationLink) locationLink.href = `mapa.html?colosso=${number}`;

    let completed = new Set();
    let spoilerMode = false;
    try {
        const saved = JSON.parse(localStorage.getItem(progressKey) || '[]');
        if (Array.isArray(saved)) completed = new Set(saved.filter(value => Number.isInteger(value)));
        spoilerMode = localStorage.getItem(spoilerKey) === 'on';
    } catch { /* The page remains usable without browser storage. */ }

    const spoilerToggle = document.createElement('button');
    spoilerToggle.type = 'button';
    spoilerToggle.className = 'spoiler-toggle';
    document.querySelector('.navbar').append(spoilerToggle);

    const lockMessage = document.createElement('div');
    lockMessage.className = 'spoiler-lock-message';
    lockMessage.innerHTML = '<p class="eyebrow">Conteúdo protegido</p><h1>Colosso desconhecido</h1><p>Derrote este colosso ou desative o modo sem spoilers para revelar sua ficha.</p><button type="button" class="outline-link">Revelar ficha</button>';
    document.querySelector('.intro-copy').append(lockMessage);
    const portrait = document.querySelector('.portrait img');
    const deathScreen = document.createElement('section');
    deathScreen.className = 'spoiler-death-screen';
    deathScreen.hidden = true;
    deathScreen.setAttribute('role', 'dialog');
    deathScreen.setAttribute('aria-modal', 'true');
    deathScreen.setAttribute('aria-labelledby', 'death-screen-title');
    deathScreen.style.setProperty('--death-screen-image', `url("../Images/Colossos/DeathScreens/${deathScreenFiles[number - 1]}")`);
    deathScreen.innerHTML = `
        <div class="death-screen-content">
            <p class="death-screen-order">Acesso protegido · Colosso ${String(number).padStart(2, '0')}</p>
            <h1 id="death-screen-title">Colosso não derrotado</h1>
            <p>Esta tela permanecerá oculta até que a vitória seja registrada no mapa.</p>
            <div class="death-screen-actions">
                <a href="HomePage.html#colossos">Voltar à galeria</a>
                <button type="button" data-action="complete">Registrar vitória</button>
                <button type="button" data-action="reveal">Desativar modo sem spoilers</button>
            </div>
        </div>`;
    document.body.append(deathScreen);
    const deathScreenBackground = [...document.body.children].filter(element => element !== deathScreen);
    const originalTitle = document.title;

    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('[href="Creditos.html"]')) {
        const credits = document.createElement('a');
        credits.href = 'Creditos.html';
        credits.textContent = 'Créditos e fontes';
        footer.append(credits);
    }

    function applySpoilerMode() {
        const locked = spoilerMode && !completed.has(number);
        document.body.classList.toggle('spoiler-mode', spoilerMode);
        document.body.classList.toggle('spoiler-locked', locked);
        deathScreen.hidden = !locked;
        deathScreenBackground.forEach(element => {
            element.inert = locked;
            element.toggleAttribute('aria-hidden', locked);
        });
        spoilerToggle.innerHTML = `<span class="spoiler-toggle__icon" aria-hidden="true">${spoilerMode ? '◉' : '◎'}</span><span class="spoiler-toggle__label">Sem spoilers<small>${spoilerMode ? 'Ativado' : 'Desativado'}</small></span>`;
        spoilerToggle.setAttribute('aria-pressed', String(spoilerMode));
        spoilerToggle.setAttribute('aria-label', spoilerMode ? 'Desativar modo sem spoilers' : 'Ativar modo sem spoilers');
        route.querySelectorAll('[data-revealed-label]').forEach(label => {
            const target = Number(label.closest('a').getAttribute('href').match(/\d+/)?.[0]);
            label.textContent = spoilerMode && !completed.has(target)
                ? `${String(target).padStart(2, '0')} · Não revelado`
                : label.dataset.revealedLabel;
        });
        document.title = locked ? `Colosso ${String(number).padStart(2, '0')} | Project Colossus` : originalTitle;
        if (locked) deathScreen.querySelector('a').focus({ preventScroll: true });
    }

    function setSpoilerMode(enabled) {
        spoilerMode = enabled;
        try { localStorage.setItem(spoilerKey, enabled ? 'on' : 'off'); } catch { /* Keep it for this visit. */ }
        applySpoilerMode();
    }

    const progressControl = document.createElement('section');
    progressControl.className = 'colossus-progress-control';
    progressControl.setAttribute('aria-label', 'Progresso deste encontro');
    progressControl.innerHTML = '<div><span class="progress-status-dot" aria-hidden="true"></span><p><small>Diário de jornada</small><strong></strong></p></div><button type="button"></button>';
    facts.after(progressControl);
    const progressStatus = progressControl.querySelector('strong');
    const progressButton = progressControl.querySelector('button');

    function saveProgress() {
        try { localStorage.setItem(progressKey, JSON.stringify([...completed].sort((a, b) => a - b))); } catch { /* Keep it for this visit. */ }
    }

    function renderProgress() {
        const isComplete = completed.has(number);
        progressControl.classList.toggle('is-complete', isComplete);
        progressStatus.textContent = isComplete ? 'Colosso derrotado' : 'Encontro pendente';
        progressButton.textContent = isComplete ? 'Marcar como pendente' : 'Marcar como derrotado';
        progressButton.setAttribute('aria-pressed', String(isComplete));
    }

    function setCompleted(isComplete) {
        if (isComplete) completed.add(number); else completed.delete(number);
        saveProgress();
        renderProgress();
        applySpoilerMode();
    }

    progressButton.addEventListener('click', () => setCompleted(!completed.has(number)));

    spoilerToggle.addEventListener('click', () => setSpoilerMode(!spoilerMode));
    lockMessage.querySelector('button').addEventListener('click', () => setSpoilerMode(false));
    deathScreen.querySelector('[data-action="complete"]').addEventListener('click', () => setCompleted(true));
    deathScreen.querySelector('[data-action="reveal"]').addEventListener('click', () => setSpoilerMode(false));
    renderProgress();
    applySpoilerMode();

    const portraitCaption = document.querySelector('.portrait figcaption')?.textContent.trim() || '';
    const immersive = document.querySelector('.colossus-immersive');
    const galleryItems = [
        { src: portrait.currentSrc || portrait.src, alt: portrait.alt, caption: portraitCaption },
        { src: immersive.dataset.image, alt: `Imagem panorâmica de ${names[number - 1]}`, caption: immersive.dataset.caption || names[number - 1] }
    ];
    let galleryIndex = 0;
    let previousFocus = null;

    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', `Galeria de ${names[number - 1]}`);
    lightbox.innerHTML = `
        <button class="lightbox-close" type="button" aria-label="Fechar galeria">×</button>
        <button class="lightbox-previous" type="button" aria-label="Imagem anterior">←</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button class="lightbox-next" type="button" aria-label="Próxima imagem">→</button>
        <p class="lightbox-position" aria-live="polite"></p>`;
    document.body.append(lightbox);
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('figcaption');
    const lightboxPosition = lightbox.querySelector('.lightbox-position');
    const background = [...document.body.children].filter(element => element !== lightbox);

    function showGalleryItem(index) {
        galleryIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[galleryIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightboxPosition.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
    }

    function openGallery(index = 0) {
        if (document.body.classList.contains('spoiler-locked')) return;
        previousFocus = document.activeElement;
        showGalleryItem(index);
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        background.forEach(element => { element.inert = true; });
        lightbox.querySelector('.lightbox-close').focus();
    }

    function closeGallery() {
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        background.forEach(element => { element.inert = false; });
        previousFocus?.focus();
    }

    portrait.classList.add('is-zoomable');
    portrait.tabIndex = 0;
    portrait.setAttribute('role', 'button');
    portrait.setAttribute('aria-label', `Ampliar galeria de ${names[number - 1]}`);
    portrait.addEventListener('click', () => openGallery(0));
    portrait.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openGallery(0);
        }
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeGallery);
    lightbox.querySelector('.lightbox-previous').addEventListener('click', () => showGalleryItem(galleryIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showGalleryItem(galleryIndex + 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });
    document.addEventListener('keydown', event => {
        if (!deathScreen.hidden && event.key === 'Tab') {
            const controls = [...deathScreen.querySelectorAll('a, button')];
            const first = controls[0];
            const last = controls.at(-1);
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            return;
        }
        if (lightbox.hidden) return;
        if (event.key === 'Escape') closeGallery();
        else if (event.key === 'ArrowLeft') showGalleryItem(galleryIndex - 1);
        else if (event.key === 'ArrowRight') showGalleryItem(galleryIndex + 1);
        else if (event.key === 'Tab') {
            const controls = [...lightbox.querySelectorAll('button')];
            const first = controls[0], last = controls.at(-1);
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });
})();
