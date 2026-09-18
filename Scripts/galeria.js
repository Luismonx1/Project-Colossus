(() => {
    const selector = document.querySelector('.colossus-selector');
    const choices = [...selector.querySelectorAll('.colossus-thumb')];
    const image = document.getElementById('featured-image');
    const name = document.getElementById('featured-name');
    const quote = document.getElementById('featured-quote');
    const link = document.getElementById('featured-link');
    const status = document.getElementById('gallery-status');
    let current = 0;

    function select(index, announce = true) {
        current = (index + choices.length) % choices.length;
        const choice = choices[current];
        const number = String(current + 1).padStart(2, '0');
        image.src = choice.dataset.image;
        image.alt = `${choice.dataset.name}, colosso ${current + 1}`;
        name.textContent = choice.dataset.name;
        quote.textContent = choice.dataset.description.split('\\n')[0].trim();
        link.href = choice.href;
        document.getElementById('featured-number').textContent = `Colosso ${number}`;
        document.getElementById('art-number').textContent = number;
        document.getElementById('gallery-position').textContent = `${number} / ${choices.length}`;
        choices.forEach((item, i) => item.setAttribute('aria-pressed', String(i === current)));
        if (announce) {
            status.textContent = `${choice.dataset.name}, colosso ${current + 1} de ${choices.length}`;
            // Scroll only the miniature strip; keep the page and keyboard focus stable.
            selector.scrollTo({ left: choice.offsetLeft - (selector.clientWidth - choice.offsetWidth) / 2,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }
    }

    choices.forEach((choice, index) => {
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
    select(0, false);
})();
