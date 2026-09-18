const modalBg = document.getElementById('modal-bg');
const modal = modalBg.querySelector('.modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const closeModalBtn = document.getElementById('close-modal');
const popupSound = document.getElementById('popupSound');
const backgroundRegions = document.querySelectorAll('.site-header, main, footer, .skip-link');
let previousFocus;
let typingTimer;

function openModal(trigger) {
    clearTimeout(typingTimer);
    previousFocus = trigger;
    modalTitle.textContent = trigger.dataset.title;
    modalLink.href = trigger.dataset.link;
    const description = trigger.dataset.desc.replace(/\\n/g, '\n');
    modalDesc.textContent = description;
    modalBg.hidden = false;
    document.body.classList.add('modal-open');
    backgroundRegions.forEach(region => { region.inert = true; });
    modal.focus();
    if (popupSound) {
        popupSound.currentTime = 0;
        popupSound.play().catch(() => {});
    }
    modalDesc.setAttribute('aria-label', description);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let index = 0;
        modalDesc.textContent = '';
        const typeNext = () => {
            modalDesc.textContent = description.slice(0, ++index);
            if (index < description.length) typingTimer = setTimeout(typeNext, 20);
        };
        typeNext();
    }
}
function closeModal() {
    clearTimeout(typingTimer);
    modalBg.hidden = true;
    document.body.classList.remove('modal-open');
    backgroundRegions.forEach(region => { region.inert = false; });
    if (popupSound) { popupSound.pause(); popupSound.currentTime = 0; }
    previousFocus?.focus();
}
closeModalBtn.addEventListener('click', closeModal);
modalBg.addEventListener('click', event => { if (event.target === modalBg) closeModal(); });
document.addEventListener('keydown', event => {
    if (modalBg.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeModal(); }
    if (event.key === 'Tab') {
        if (event.shiftKey && (document.activeElement === modalLink || document.activeElement === modal)) {
            event.preventDefault(); closeModalBtn.focus();
        } else if (!event.shiftKey && document.activeElement === closeModalBtn) {
            event.preventDefault(); modalLink.focus();
        }
    }
});
document.querySelectorAll('.open-modal').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
});
