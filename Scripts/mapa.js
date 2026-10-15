(() => {
  const { cards, places } = window.colossusAtlas;
  const get = id => document.getElementById(id);
  const markers = [...document.querySelectorAll('.marker')];
  const placeMarkers = [...document.querySelectorAll('.place-marker')];
  const entries = [...document.querySelectorAll('[data-encounter]')];
  const collectibles = window.colossusCollectibles || [];
  const collectibleMarkers = [];
  const labels = { coins: 'Moedas', fruits: 'Frutas', lizards: 'Lagartos de cauda branca', shrines: 'Mini templo' };
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
    let regions = 0;
    collectibleMarkers.forEach((marker, i) => {
      marker.hidden = !get('show-' + collectibles[i].type).checked;
      if (!marker.hidden) regions++;
    });
    entries.forEach((entry, i) => {
      entry.hidden = pending && completed.has(i + 1);
      entry.classList.toggle('is-complete', completed.has(i + 1));
      entry.setAttribute('aria-label', cards[i].name + (completed.has(i + 1) ? ', derrotado, abrir ficha' : ', pendente, abrir ficha'));
    });
    get('empty-filter').hidden = !(pending && completed.size === 16);
    get('progress-label').textContent = completed.size + ' de 16 colossos derrotados';
    get('journey-progress').value = completed.size;
    document.querySelector('.map-count').textContent = visible + ' colossos · ' + regions + ' pontos visíveis';
  }
  function select(number, announce = true) {
    get('collectible-links').hidden = true;
    collectibleMarkers.forEach(m => m.setAttribute('aria-pressed', 'false'));
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
    get('detail-link').hidden = false;
    get('detail-link').textContent = 'Abrir ficha ↗';
    get('completion-control').hidden = false;
    get('mark-complete').checked = completed.has(number);
    [...markers, ...placeMarkers].forEach(m => m.setAttribute('aria-pressed', String(m === markers[number - 1])));
    if (announce) get('selection-status').textContent = card.name + ' selecionado. Ficha atualizada.';
  }
  markers.forEach((marker, i) => marker.addEventListener('click', () => select(i + 1)));
  placeMarkers.forEach((marker, i) => marker.addEventListener('click', () => {
    get('collectible-links').hidden = true;
    collectibleMarkers.forEach(m => m.setAttribute('aria-pressed', 'false'));
    const place = places[i];
    current = null;
    get('detail-number').textContent = 'Ponto de interesse · ' + place[1];
    get('detail-name').textContent = place[0];
    get('detail-description').textContent = place[4];
    get('detail-image').src = place[5];
    get('detail-image').alt = place[0] + ' em Shadow of the Colossus';
    get('detail-image').hidden = false;
    get('detail-credit').hidden = true;
    get('completion-control').hidden = true;
    get('detail-link').hidden = true;
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
  collectibles.forEach(group => {
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'collectible-marker collectible-' + group.type;
    marker.style.setProperty('--x', group.x + '%');
    marker.style.setProperty('--y', group.y + '%');
    marker.textContent = { coins: '◉', fruits: '♣', lizards: '∿', shrines: '⌂' }[group.type];
    marker.title = labels[group.type] + ' ' + group.id + ' · ' + group.coord;
    marker.setAttribute('aria-label', labels[group.type] + ' ' + group.id + ', quadrante ' + group.coord);
    marker.setAttribute('aria-controls', 'atlas-detail');
    marker.setAttribute('aria-describedby', 'collectibles-help');
    marker.setAttribute('aria-pressed', 'false');
    marker.hidden = true;
    marker.addEventListener('click', () => {
      current = null;
      [...markers, ...placeMarkers, ...collectibleMarkers].forEach(m => m.setAttribute('aria-pressed', String(m === marker)));
      get('detail-number').textContent = 'Ponto ' + String(group.id).padStart(2, '0') + ' · ' + group.coord;
      get('detail-name').textContent = labels[group.type];
      get('detail-image').hidden = true;
      get('detail-credit').hidden = true;
      get('completion-control').hidden = true;
      const descriptions = {
        coins: 'Moeda dourada do remake de PS4. O ponto corresponde ao marcador do mapa de referência; a altura e o caminho de acesso devem ser conferidos no guia.',
        fruits: 'Ponto de árvore frutífera indicado no mapa de referência. Uma árvore pode conter várias frutas.',
        lizards: 'Ponto de lagarto de cauda branca indicado no mapa de referência. Procure nas pedras e estruturas próximas; o animal pode se mover.',
        shrines: 'Mini templo de oração indicado no mapa de referência. O Santuário da Adoração aparece separadamente no filtro Locais.'
      };
      get('detail-description').textContent = descriptions[group.type];
      get('detail-link').href = 'https://www.portale7.com.br/2018/02/localizacao-dos-santuarios-lagartos.html';
      get('detail-link').hidden = false;
      get('detail-link').textContent = 'Consultar mapa de referência ↗';
      get('collectible-links').replaceChildren();
      get('collectible-links').hidden = true;
      get('selection-status').textContent = labels[group.type] + ' em ' + group.coord + '. Guia atualizado.';
    });
    collectibleMarkers.push(marker);
    get('map').append(marker);
  });
  ['show-colossi', 'show-places', 'only-pending', 'show-coins', 'show-fruits', 'show-lizards', 'show-shrines'].forEach(id => get(id).addEventListener('change', refresh));
  let zoom = 1;
  const viewport = get('map').parentElement;
  let drag = null, suppressClick = false;
  viewport.addEventListener('pointerdown', event => {
    // Touch uses native scrolling, including pinch gestures and page navigation.
    if (event.pointerType === 'touch' || event.button !== 0 || !event.isPrimary) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY,
      left: viewport.scrollLeft, top: viewport.scrollTop, moved: false };
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    drag.moved = true;
    suppressClick = true;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
    viewport.scrollLeft = drag.left - dx;
    viewport.scrollTop = drag.top - dy;
    event.preventDefault();
  });
  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    viewport.classList.remove('is-dragging');
    drag = null;
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  viewport.addEventListener('click', event => {
    if (suppressClick && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
    }
    suppressClick = false;
  }, true);
  function setZoom(value) {
    zoom = Math.max(1, Math.min(3, value));
    const baseWidth = Math.max(825, get('map').parentElement.clientWidth);
    get('map').style.width = (baseWidth * zoom) + 'px';
    get('zoom-level').textContent = Math.round(zoom * 100) + '%';
    get('zoom-out').disabled = zoom === 1;
    get('zoom-in').disabled = zoom === 3;
  }
  get('zoom-in').addEventListener('click', () => setZoom(zoom + 0.5));
  get('zoom-out').addEventListener('click', () => setZoom(zoom - 0.5));
  get('zoom-reset').addEventListener('click', () => setZoom(1));
  window.addEventListener('resize', () => setZoom(zoom));
  setZoom(1);
  select(1, false);
  refresh();
})();
