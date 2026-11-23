(() => {
    const match = location.pathname.match(/Colosso(\d+)\.html$/i);
    if (!match) return;

    const number = Number(match[1]);
    const names = ['Valus', 'Quadratus', 'Gaius', 'Phaedra', 'Avion', 'Barba', 'Hydrus', 'Kuromori',
        'Basaran', 'Dirge', 'Celosia', 'Pelagia', 'Phalanx', 'Cenobia', 'Argus', 'Malus'];
    const progressKey = 'colossus-atlas-progress-v1';
    const spoilerKey = 'colossus-spoiler-mode-v1';
    const pageEnd = document.querySelector('.page-end');
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
    const originalTitle = document.title;

    function applySpoilerMode() {
        const locked = spoilerMode && !completed.has(number);
        document.body.classList.toggle('spoiler-mode', spoilerMode);
        document.body.classList.toggle('spoiler-locked', locked);
        spoilerToggle.innerHTML = `<span class="spoiler-toggle__icon" aria-hidden="true">${spoilerMode ? '◉' : '◎'}</span><span class="spoiler-toggle__label">Sem spoilers<small>${spoilerMode ? 'Ativado' : 'Desativado'}</small></span>`;
        spoilerToggle.setAttribute('aria-pressed', String(spoilerMode));
        spoilerToggle.setAttribute('aria-label', spoilerMode ? 'Desativar modo sem spoilers' : 'Ativar modo sem spoilers');
        document.title = locked ? `Colosso ${String(number).padStart(2, '0')} | Project Colossus` : originalTitle;
    }

    function setSpoilerMode(enabled) {
        spoilerMode = enabled;
        try { localStorage.setItem(spoilerKey, enabled ? 'on' : 'off'); } catch { /* Keep it for this visit. */ }
        applySpoilerMode();
    }

    spoilerToggle.addEventListener('click', () => setSpoilerMode(!spoilerMode));
    lockMessage.querySelector('button').addEventListener('click', () => setSpoilerMode(false));
    applySpoilerMode();

    const portrait = document.querySelector('.portrait img');
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
