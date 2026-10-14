(() => {
  const { cards, places } = window.colossusAtlas;
  const get = id => document.getElementById(id);
  const markers = [...document.querySelectorAll('.marker')];
  const placeMarkers = [...document.querySelectorAll('.place-marker')];
  const entries = [...document.querySelectorAll('[data-encounter]')];
  const key = 'colossus-atlas-progress-v1';
  let completed = new Set(), current = 1;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(saved)) completed = new Set(saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 16));
  } catch { get('save-status').textContent = 'O progresso está disponível nesta visita; o armazenamento do navegador não pôde ser lido.'; }
  document.querySelector('.atlas-filters').hidden = false;
  document.querySelector('.journey-progress').hidden = false;
  function refresh() {
    const pending = get('only-pending').checked;
    let visible = 0;
    markers.forEach((marker, i) => {
      const done = completed.has(i + 1);
      marker.hidden = !get('show-colossi').checked || (pending && done);
      marker.classList.toggle('is-complete', done);
      marker.setAttribute('aria-label', cards[i].name + ', quadrante ' + cards[i].coord + (done ? ', derrotado' : ', pendente'));
      if (!marker.hidden) visible++;
    });
    placeMarkers.forEach(marker => { marker.hidden = !get('show-places').checked; });
    entries.forEach((entry, i) => {
      entry.hidden = pending && completed.has(i + 1);
      entry.classList.toggle('is-complete', completed.has(i + 1));
      entry.setAttribute('aria-label', cards[i].name + (completed.has(i + 1) ? ', derrotado, abrir ficha' : ', pendente, abrir ficha'));
    });
    get('empty-filter').hidden = !(pending && completed.size === 16);
    get('progress-label').textContent = completed.size + ' de 16 colossos derrotados';
    get('journey-progress').value = completed.size;
    document.querySelector('.map-count').textContent = visible + ' colossos visíveis';
  }
  function select(number, announce = true) {
    current = number;
    const card = cards[number - 1];
    get('detail-number').textContent = 'Colosso ' + String(number).padStart(2, '0') + ' · ' + card.coord;
    get('detail-name').textContent = card.name;
    get('detail-description').textContent = card.desc;
    get('detail-image').src = card.img;
    get('detail-image').alt = 'Interpretação artística de ' + card.name;
    get('detail-image').hidden = false;
    get('detail-credit').hidden = false;
    get('detail-link').href = 'Colosso' + number + '.html';
    get('detail-link').textContent = 'Abrir ficha ↗';
    get('completion-control').hidden = false;
    get('mark-complete').checked = completed.has(number);
    [...markers, ...placeMarkers].forEach(m => m.setAttribute('aria-pressed', String(m === markers[number - 1])));
    if (announce) get('selection-status').textContent = card.name + ' selecionado. Ficha atualizada.';
  }
  markers.forEach((marker, i) => marker.addEventListener('click', () => select(i + 1)));
  placeMarkers.forEach((marker, i) => marker.addEventListener('click', () => {
    const place = places[i];
    current = null;
    get('detail-number').textContent = 'Ponto de interesse · ' + place[1];
    get('detail-name').textContent = place[0];
    get('detail-description').textContent = place[4];
    get('detail-image').hidden = true;
    get('detail-credit').hidden = true;
    get('completion-control').hidden = true;
    get('detail-link').href = place[5];
    get('detail-link').textContent = 'Conhecer a história ↗';
    [...markers, ...placeMarkers].forEach(m => m.setAttribute('aria-pressed', String(m === marker)));
    get('selection-status').textContent = place[0] + ' selecionado.';
  }));
  get('mark-complete').addEventListener('change', () => {
    if (current === null) return;
    if (get('mark-complete').checked) completed.add(current); else completed.delete(current);
    try { localStorage.setItem(key, JSON.stringify([...completed])); }
    catch { get('save-status').textContent = 'Não foi possível salvar neste navegador. O progresso será mantido apenas durante esta visita.'; }
    refresh();
  });
  ['show-colossi', 'show-places', 'only-pending'].forEach(id => get(id).addEventListener('change', refresh));
  select(1, false);
  refresh();
})();
