(() => {
    const selector = document.querySelector('.colossus-selector');
    const choices = [...selector.querySelectorAll('.colossus-thumb')];
    const image = document.getElementById('featured-image');
    const name = document.getElementById('featured-name');
    const quote = document.getElementById('featured-quote');
    const link = document.getElementById('featured-link');
    const status = document.getElementById('gallery-status');
    let current = 0;
    const progressKey = 'colossus-atlas-progress-v1';
    const spoilerKey = 'colossus-spoiler-mode-v1';
    const deathScreens = ['01-valus.jpg', '02-quadratus.jpg', '03-gaius.jpg', '04-phaedra.jpg',
        '05-avion.jpg', '06-barba.jpg', '07-hydrus.jpg', '08-kuromori.jpg', '09-basaran.jpg', '10-dirge.jpg',
        '11-celosia.jpg', '12-pelagia.jpg', '13-phalanx.jpg', '14-cenobia.jpg', '15-argus.jpg', '16-malus.jpg']
        .map(file => `../Images/Colossos/DeathScreens/${file}`);
    let completed = new Set();
    let spoilerMode = false;
    try {
        const saved = JSON.parse(localStorage.getItem(progressKey) || '[]');
        if (Array.isArray(saved)) completed = new Set(saved.filter(Number.isInteger));
        spoilerMode = localStorage.getItem(spoilerKey) === 'on';
    } catch { /* The gallery remains usable without browser storage. */ }

    const spoilerToggle = document.createElement('button');
    spoilerToggle.type = 'button';
    spoilerToggle.className = 'spoiler-toggle';
    document.querySelector('.navbar').append(spoilerToggle);
    const sound = document.getElementById('gallery-sound');
    const soundToggle = document.getElementById('sound-toggle');
    const soundPreferenceKey = 'colossus-gallery-sound';
    let soundEnabled = true;
    try { soundEnabled = localStorage.getItem(soundPreferenceKey) !== 'off'; } catch { /* Storage may be unavailable. */ }
    sound.volume = 0.18;

    function updateSoundToggle() {
        soundToggle.textContent = `Som: ${soundEnabled ? 'ligado' : 'desligado'}`;
        soundToggle.setAttribute('aria-pressed', String(soundEnabled));
    }

    soundToggle.hidden = false;
    updateSoundToggle();
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        sound.pause();
        sound.currentTime = 0;
        updateSoundToggle();
        try { localStorage.setItem(soundPreferenceKey, soundEnabled ? 'on' : 'off'); } catch { /* Keep the setting for this visit. */ }
    });

    function playSelectionSound() {
        // Reuse one player so rapid selections never overlap.
        sound.pause();
        sound.currentTime = 0;
        if (soundEnabled) sound.play().catch(() => { /* Navigation still works if playback is blocked. */ });
    }

    function select(index, announce = true) {
        const next = (index + choices.length) % choices.length;
        const changed = next !== current;
        current = next;
        const choice = choices[current];
        const number = String(current + 1).padStart(2, '0');
        const locked = spoilerMode && !completed.has(current + 1);
        document.querySelector('.colossus-feature').classList.toggle('is-spoiler-locked', locked);
        image.src = locked ? deathScreens[current] : choice.dataset.image;
        image.alt = locked ? `Colosso ${current + 1} ainda desconhecido` : `${choice.dataset.name}, colosso ${current + 1}`;
        name.textContent = locked ? 'Colosso desconhecido' : choice.dataset.name;
        quote.textContent = locked ? 'Derrote este colosso para revelar sua identidade e história.' : choice.dataset.description.split('\\n')[0].trim();
        link.href = choice.href;
        document.getElementById('featured-number').textContent = `Colosso ${number}`;
        document.getElementById('art-number').textContent = number;
        document.getElementById('gallery-position').textContent = `${number} / ${choices.length}`;
        choices.forEach((item, i) => item.setAttribute('aria-pressed', String(i === current)));
        if (announce) {
            if (changed) playSelectionSound();
            status.textContent = locked ? `Colosso desconhecido, ${current + 1} de ${choices.length}` : `${choice.dataset.name}, colosso ${current + 1} de ${choices.length}`;
            // Scroll only the miniature strip; keep the page and keyboard focus stable.
            selector.scrollTo({ left: choice.offsetLeft - (selector.clientWidth - choice.offsetWidth) / 2,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }
    }

    choices.forEach((choice, index) => {
        choice.querySelector('img').dataset.originalSrc = choice.querySelector('img').getAttribute('src');
        // Without JavaScript these remain usable links to the colossus pages.
        choice.setAttribute('role', 'button');
        choice.setAttribute('aria-controls', 'featured-name featured-image featured-quote featured-link');
        choice.addEventListener('click', event => { event.preventDefault(); select(index); });
        choice.addEventListener('keydown', event => {
            const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: choices.length - 1 };
            if (event.key === ' ') { event.preventDefault(); select(index); }
            else if (Object.hasOwn(keys, event.key)) {
                event.preventDefault();
                select(keys[event.key]);
                choices[current].focus({ preventScroll: true });
            }
        });
    });
    document.getElementById('previous-colossus').addEventListener('click', () => select(current - 1));
    document.getElementById('next-colossus').addEventListener('click', () => select(current + 1));
    document.querySelector('.gallery-navigation').hidden = false;
    function applySpoilerMode() {
        choices.forEach((choice, index) => {
            const locked = spoilerMode && !completed.has(index + 1);
            choice.classList.toggle('is-spoiler-locked', locked);
            const thumb = choice.querySelector('img');
            thumb.src = locked ? deathScreens[index] : thumb.dataset.originalSrc;
            choice.setAttribute('aria-label', locked ? `Selecionar colosso desconhecido ${index + 1}` : `Selecionar ${choice.dataset.name}, colosso ${index + 1}`);
        });
        spoilerToggle.innerHTML = `<span class="spoiler-toggle__icon" aria-hidden="true">${spoilerMode ? '◉' : '◎'}</span><span class="spoiler-toggle__label">Sem spoilers<small>${spoilerMode ? 'Ativado' : 'Desativado'}</small></span>`;
        spoilerToggle.setAttribute('aria-pressed', String(spoilerMode));
        spoilerToggle.setAttribute('aria-label', spoilerMode ? 'Desativar modo sem spoilers' : 'Ativar modo sem spoilers');
        select(current, false);
    }
    spoilerToggle.addEventListener('click', () => {
        spoilerMode = !spoilerMode;
        try { localStorage.setItem(spoilerKey, spoilerMode ? 'on' : 'off'); } catch { /* Keep it for this visit. */ }
        applySpoilerMode();
    });
    select(0, false);
    applySpoilerMode();
})();
