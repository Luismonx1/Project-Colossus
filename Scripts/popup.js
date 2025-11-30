// Selecionar elementos do popup
const modalBg = document.getElementById("modal-bg");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeModalBtn = document.getElementById("close-modal");

// Som do popup
const popupSound = document.getElementById("popupSound");

// Função para abrir o popup
function openModal(title, desc, link) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalLink.href = link;

    modalBg.style.display = "flex";

    // Tocar som ao abrir
    if (popupSound) {
        popupSound.currentTime = 0; // Reinicia o som
        popupSound.play().catch(() => { /* Ignora erros de autoplay */ });
    }
}

// Função para fechar
function closeModal() {
    modalBg.style.display = "none";
}

// Quando clicar no botão "Fechar"
closeModalBtn.addEventListener("click", closeModal);

// Quando clicar fora da caixa do pop-up, também fecha
modalBg.addEventListener("click", (e) => {
    if (e.target === modalBg) closeModal();
});

// Ativar todos os textos clicáveis
document.querySelectorAll(".open-modal").forEach(item => {
    item.addEventListener("click", () => {
        const title = item.dataset.title;
        const desc = item.dataset.desc;
        const link = item.dataset.link;

        openModal(title, desc, link);
    });
});
