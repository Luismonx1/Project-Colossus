const markers = document.querySelectorAll(".marker");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const btnClose = document.getElementById("close-popup");

markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    const colosso = marker.dataset.name;
    popupTitle.textContent = "Colosso: " + colosso;
    popup.style.display = "block";
  });
});

btnClose.addEventListener("click", () => {
  popup.style.display = "none";
});
