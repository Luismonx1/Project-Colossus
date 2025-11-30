// Selecionar elementos do popup
const modalBg = document.getElementById("modal-bg");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeModalBtn = document.getElementById("close-modal");

// Som do popup
const popupSound = document.getElementById("popupSound");

// Função para abrir o popup
function typeWriter(element, text, speed = 35) {
    element.innerHTML = ""; // Limpa antes de digitar

    // Divide o texto em partes, preservando <br>
    const parts = text.split(/(<br>)/g);
    let partIndex = 0;

    function typePart() {
        if (partIndex >= parts.length) return;

        const part = parts[partIndex];

        if (part === "<br>") {
            element.innerHTML += "<br>";
            partIndex++;
            typePart(); // passa direto para o próximo
        } else {
            let i = 0;

            function typing() {
                if (i < part.length) {
                    element.innerHTML += part.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                } else {
                    partIndex++;
                    typePart();
                }
            }
            typing();
        }
    }

    typePart();
}


function openModal(title, desc, link) {
    modalTitle.textContent = title;
    modalLink.href = link;

    // Converter \n para <br>
    const formattedDesc = desc.replace(/\\n/g, "<br>");

    modalBg.style.display = "flex";

    // Toca o som do popup
    if (popupSound) {
        popupSound.currentTime = 0;
        popupSound.play().catch(() => {});
    }

    // Efeito digitado
    typeWriter(modalDesc, formattedDesc, 30); // 30ms por letra
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
