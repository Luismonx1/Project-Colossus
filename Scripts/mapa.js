const map = document.querySelector('#map');
const popup = document.querySelector('#map-popup');
const title = document.querySelector('#popup-link');
const number = document.querySelector('#popup-number');
const closeButton = popup.querySelector('.close-popup');
const markers = [...map.querySelectorAll('.marker')];
const scroller = document.querySelector('.map-scroll');
let selected = null;

function positionPopup() {
  if (!selected) return;
  const x = selected.offsetLeft;
  const y = selected.offsetTop;
  const mapBounds = map.getBoundingClientRect();
  const scrollBounds = scroller.getBoundingClientRect();
  const minLeft = Math.max(0, scrollBounds.left - mapBounds.left) + 8;
  const maxLeft = Math.min(map.clientWidth, scrollBounds.left + scroller.clientWidth - mapBounds.left) - popup.offsetWidth - 8;
  const left = Math.max(minLeft, Math.min(x - popup.offsetWidth / 2, maxLeft));
  const above = y - popup.offsetHeight - 24;
  popup.style.left = `${left}px`;
  popup.style.top = `${above >= 8 ? above : y + 24}px`;
}

function closePopup(restoreFocus = false) {
  const previous = selected;
  if (previous) previous.setAttribute('aria-expanded', 'false');
  selected = null;
  popup.hidden = true;
  if (restoreFocus && previous) previous.focus({ preventScroll: true });
}

markers.forEach(marker => marker.addEventListener('click', () => {
  if (selected === marker) { closePopup(true); return; }
  closePopup();
  selected = marker;
  title.textContent = marker.dataset.name;
  title.href = `Colosso${Number(marker.dataset.number)}.html`;
  number.textContent = `Colosso ${marker.dataset.number}`;
  marker.setAttribute('aria-expanded', 'true');
  popup.hidden = false;
  positionPopup();
  closeButton.focus({ preventScroll: true });
}));
closeButton.addEventListener('click', () => closePopup(true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && selected) { event.preventDefault(); closePopup(true); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.marker, .map-popup')) closePopup();
});
window.addEventListener('resize', positionPopup);
scroller.addEventListener('scroll', positionPopup, { passive: true });
