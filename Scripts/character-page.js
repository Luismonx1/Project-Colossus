(() => {
    const pageName = location.pathname.split('/').pop()?.replace('.html', '');
    const characters = [
        { file: 'Wander', name: 'Wander', role: 'O protagonista' },
        { file: 'Mono', name: 'Mono', role: 'O motivo da jornada' },
        { file: 'Dormin', name: 'Dormin', role: 'A voz do santuário' },
        { file: 'Emon', name: 'Lorde Emon', role: 'O guardião do ritual' }
    ];
    const current = characters.findIndex(character => character.file === pageName);
    if (current < 0) return;

    const spoilerKey = 'colossus-spoiler-mode-v1';
    let spoilerMode = false;
    try { spoilerMode = localStorage.getItem(spoilerKey) === 'on'; } catch { /* Keep the default. */ }

    const protectedSections = {
        Wander: ['#aparencia-amaldicoada'],
        Mono: ['#despertar'],
        Dormin: ['#fragmentos', '#manifestacao', '#aparencia', '#desfecho'],
        Emon: ['.emon-scene', '#ritual']
    }[pageName].map(selector => document.querySelector(selector)).filter(Boolean);
    const revealedSections = new WeakSet();

    const spoilerToggle = document.createElement('button');
    spoilerToggle.type = 'button';
    spoilerToggle.className = 'spoiler-toggle';
    document.querySelector('.navbar').append(spoilerToggle);

    protectedSections.forEach(section => {
        section.classList.add('character-spoiler-section');
        const lock = document.createElement('div');
        lock.className = 'character-spoiler-lock';
        lock.innerHTML = '<p class="eyebrow">Conteúdo protegido</p><h3>Revelação importante da história</h3><p>Esta parte permanece oculta enquanto o modo sem spoilers estiver ativo.</p><button type="button">Revelar somente esta seção</button>';
        section.append(lock);
        lock.querySelector('button').addEventListener('click', () => {
            revealedSections.add(section);
            applySpoilerMode();
        });
    });

    function applySpoilerMode() {
        document.body.classList.toggle('character-spoiler-mode', spoilerMode);
        spoilerToggle.innerHTML = `<span class="spoiler-toggle__icon" aria-hidden="true">${spoilerMode ? '◉' : '◎'}</span><span class="spoiler-toggle__label">Sem spoilers<small>${spoilerMode ? 'Ativado' : 'Desativado'}</small></span>`;
        spoilerToggle.setAttribute('aria-pressed', String(spoilerMode));
        spoilerToggle.setAttribute('aria-label', spoilerMode ? 'Desativar modo sem spoilers' : 'Ativar modo sem spoilers');
        protectedSections.forEach(section => {
            const hidden = spoilerMode && !revealedSections.has(section);
            if (hidden && section.contains(document.activeElement)) spoilerToggle.focus({ preventScroll: true });
            section.classList.toggle('is-character-spoiler-hidden', hidden);
            [...section.children].forEach(child => {
                if (child.classList.contains('character-spoiler-lock')) return;
                child.inert = hidden;
                child.toggleAttribute('aria-hidden', hidden);
            });
        });
        document.querySelectorAll('[data-character-name]').forEach(element => {
            element.textContent = spoilerMode ? 'Personagem protegido' : element.dataset.characterName;
        });
        document.querySelectorAll('[data-character-role]').forEach(element => {
            element.textContent = spoilerMode ? 'Conteúdo protegido' : element.dataset.characterRole;
        });
    }

    spoilerToggle.addEventListener('click', () => {
        spoilerMode = !spoilerMode;
        try { localStorage.setItem(spoilerKey, spoilerMode ? 'on' : 'off'); } catch { /* Keep it for this visit. */ }
        applySpoilerMode();
    });
    applySpoilerMode();

    const route = document.createElement('nav');
    route.className = 'character-route-nav';
    route.setAttribute('aria-label', 'Navegação entre personagens');
    const previous = current > 0
        ? `<a href="${characters[current - 1].file}.html"><small>Personagem anterior</small><strong data-character-name="${characters[current - 1].name}">${characters[current - 1].name}</strong></a>`
        : '<span class="character-route-disabled"><small>Personagem anterior</small><strong>Início da galeria</strong></span>';
    const next = current < characters.length - 1
        ? `<a href="${characters[current + 1].file}.html"><small>Próximo personagem</small><strong data-character-name="${characters[current + 1].name}">${characters[current + 1].name}</strong></a>`
        : '<span class="character-route-disabled"><small>Próximo personagem</small><strong>Fim da galeria</strong></span>';
    route.innerHTML = `${previous}<a class="character-route-all" href="HomePage.html#personagens"><small>Elenco</small><strong>Todos os personagens</strong></a>${next}`;
    document.querySelector('.page-end').before(route);

    const relations = document.createElement('section');
    relations.className = 'character-relations';
    relations.setAttribute('aria-labelledby', 'character-relations-title');
    relations.innerHTML = `<p class="eyebrow">Histórias conectadas</p><h2 id="character-relations-title">Outras perspectivas da jornada.</h2><div>${characters.filter((_, index) => index !== current).map(character => `<a href="${character.file}.html"><small data-character-role="${character.role}">${character.role}</small><strong data-character-name="${character.name}">${character.name}</strong></a>`).join('')}</div>`;
    document.querySelector('.sources').before(relations);
    applySpoilerMode();

    const sources = document.querySelector('.sources');
    const centralCredits = document.createElement('p');
    centralCredits.className = 'central-credits-link';
    centralCredits.innerHTML = '<a href="Creditos.html">Ver todos os créditos e fontes do projeto</a>';
    sources.append(centralCredits);

    document.querySelectorAll('img').forEach(image => {
        image.decoding = 'async';
        if (image.src.endsWith('/terras-proibidas-wander-agro.png')) image.src = '../Images/Outros/terras-proibidas-wander-agro.webp';
    });

    const galleryItems = [...document.querySelectorAll('main img')].map(image => ({
        element: image,
        src: image.currentSrc || image.src,
        alt: image.alt,
        caption: image.closest('figure')?.querySelector('figcaption')?.textContent.trim() || characters[current].name
    })).filter((item, index, list) => list.findIndex(other => other.src === item.src) === index);
    if (!galleryItems.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox character-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', `Galeria de ${characters[current].name}`);
    lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Fechar galeria">×</button><button class="lightbox-previous" type="button" aria-label="Imagem anterior">←</button><figure><img alt=""><figcaption></figcaption></figure><button class="lightbox-next" type="button" aria-label="Próxima imagem">→</button><p class="lightbox-position" aria-live="polite"></p>';
    document.body.append(lightbox);
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('figcaption');
    const lightboxPosition = lightbox.querySelector('.lightbox-position');
    const background = [...document.body.children].filter(element => element !== lightbox);
    let galleryIndex = 0;
    let previousFocus = null;

    function showItem(index) {
        galleryIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[galleryIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightboxPosition.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
    }
    function openGallery(index, trigger) {
        if (trigger.closest('.is-character-spoiler-hidden')) return;
        previousFocus = trigger;
        showItem(index);
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        background.forEach(element => { element.inert = true; });
        lightbox.querySelector('.lightbox-close').focus();
    }
    function closeGallery() {
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        background.forEach(element => { element.inert = false; });
        applySpoilerMode();
        previousFocus?.focus();
    }
    galleryItems.forEach((item, index) => {
        const trigger = item.element.closest('a') || item.element;
        item.element.classList.add('is-zoomable');
        trigger.setAttribute('role', 'button');
        if (trigger === item.element) trigger.tabIndex = 0;
        trigger.setAttribute('aria-label', `Ampliar imagem ${index + 1} de ${characters[current].name}`);
        trigger.addEventListener('click', event => { event.preventDefault(); openGallery(index, trigger); });
        trigger.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openGallery(index, trigger);
            }
        });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeGallery);
    lightbox.querySelector('.lightbox-previous').addEventListener('click', () => showItem(galleryIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showItem(galleryIndex + 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });
    document.addEventListener('keydown', event => {
        if (lightbox.hidden) return;
        if (event.key === 'Escape') closeGallery();
        else if (event.key === 'ArrowLeft') showItem(galleryIndex - 1);
        else if (event.key === 'ArrowRight') showItem(galleryIndex + 1);
        else if (event.key === 'Tab') {
            const controls = [...lightbox.querySelectorAll('button:not([disabled])')];
            const first = controls[0];
            const last = controls.at(-1);
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });
})();
