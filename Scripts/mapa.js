(() => {
  const { cards, places } = window.colossusAtlas;
  const get = id => document.getElementById(id);
  const markers = [...document.querySelectorAll('.marker')];
  const placeMarkers = [...document.querySelectorAll('.place-marker')];
  const entries = [...document.querySelectorAll('[data-encounter]')];
  const collectibles = window.colossusCollectibles || [];
  const coinGuide = window.colossusCoinGuide || [];
  const collectibleMarkers = [];
  const labels = { coins: 'Moedas', fruits: 'Frutas', lizards: 'Lagartos de cauda branca', shrines: 'Mini templo' };
  const key = 'colossus-atlas-progress-v1';
  const collectibleKey = 'colossus-atlas-collectibles-v1';
  const spoilerKey = 'colossus-spoiler-mode-v1';
  const collectibleId = item => item.type + ':' + item.id;
  const isTrackable = item => item.type !== 'shrines';
  let completed = new Set(), collected = new Set(), current = 1, currentCollectible = null, spoilerMode = false;
  entries.forEach(entry => { entry.dataset.revealedHtml = entry.innerHTML; });
  const isLocked = number => spoilerMode && !completed.has(number);
  const displayName = number => isLocked(number) ? 'Colosso não revelado' : cards[number - 1].name;
  const coinCoordinateCorrections = { 1: 'F0', 8: 'G1', 31: 'C4' };
  collectibles.filter(item => item.type === 'coins').forEach(item => {
    if (coinCoordinateCorrections[item.id]) item.coord = coinCoordinateCorrections[item.id];
  });
  const groupByCoord = items => items.reduce((groups, item) => {
    (groups[item.coord] ||= []).push(item);
    return groups;
  }, {});
  const coinsByCoord = groupByCoord(collectibles.filter(item => item.type === 'coins'));
  const guideByCoord = groupByCoord(coinGuide);
  Object.keys(guideByCoord).forEach(coord => {
    const points = (coinsByCoord[coord] || []).sort((a, b) => a.y - b.y || a.x - b.x);
    const guide = guideByCoord[coord].sort((a, b) => a.number - b.number);
    if (points.length !== guide.length) console.warn('Quantidade de moedas divergente em ' + coord);
    points.forEach(point => {
      point.videoOptions = guide;
      if (guide.length === 1) Object.assign(point, { number: guide[0].number, time: guide[0].time });
    });
  });
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(saved)) completed = new Set(saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 16));
    const savedCollectibles = JSON.parse(localStorage.getItem(collectibleKey) || '[]');
    if (Array.isArray(savedCollectibles)) collected = new Set(savedCollectibles.filter(id => typeof id === 'string'));
    spoilerMode = localStorage.getItem(spoilerKey) === 'on';
  } catch { get('save-status').textContent = 'O progresso está disponível nesta visita; o armazenamento do navegador não pôde ser lido.'; }
  document.querySelector('.atlas-filters').hidden = false;
  document.querySelector('.journey-progress').hidden = false;
  const spoilerToggle = document.createElement('button');
  spoilerToggle.type = 'button';
  spoilerToggle.className = 'spoiler-toggle map-spoiler-toggle';
  document.querySelector('.navbar').append(spoilerToggle);
  function renderSpoilerToggle() {
    spoilerToggle.innerHTML = `<span class="spoiler-toggle__icon" aria-hidden="true">${spoilerMode ? '◉' : '◎'}</span><span class="spoiler-toggle__label">Sem spoilers<small>${spoilerMode ? 'Ativado' : 'Desativado'}</small></span>`;
    spoilerToggle.setAttribute('aria-pressed', String(spoilerMode));
    spoilerToggle.setAttribute('aria-label', spoilerMode ? 'Desativar modo sem spoilers' : 'Ativar modo sem spoilers');
  }
  function refresh() {
    const pending = get('only-pending').checked;
    let visible = 0;
    markers.forEach((marker, i) => {
      const done = completed.has(i + 1);
      marker.hidden = !get('show-colossi').checked || (pending && done);
      marker.classList.toggle('is-complete', done);
      marker.setAttribute('aria-label', displayName(i + 1) + ', quadrante ' + cards[i].coord + (done ? ', derrotado' : ', pendente'));
      if (!marker.hidden) visible++;
    });
    placeMarkers.forEach(marker => { marker.hidden = !get('show-places').checked; });
    let regions = 0;
    collectibleMarkers.forEach((marker, i) => {
      const item = collectibles[i];
      const found = collected.has(collectibleId(item));
      marker.hidden = !get('show-' + item.type).checked || (get('hide-completed-collectibles').checked && found);
      marker.classList.toggle('is-collected', found);
      marker.setAttribute('aria-label', marker.title + (found ? ', encontrado' : ', não encontrado'));
      if (!marker.hidden) regions++;
    });
    entries.forEach((entry, i) => {
      entry.hidden = pending && completed.has(i + 1);
      entry.classList.toggle('is-complete', completed.has(i + 1));
      entry.innerHTML = isLocked(i + 1) ? `<span>${String(i + 1).padStart(2, '0')}</span> Não revelado <small>${cards[i].coord}</small>` : entry.dataset.revealedHtml;
      entry.setAttribute('aria-label', displayName(i + 1) + (completed.has(i + 1) ? ', derrotado, abrir ficha' : ', pendente, abrir ficha'));
    });
    get('empty-filter').hidden = !(pending && completed.size === 16);
    get('progress-label').textContent = completed.size + ' de 16 colossos derrotados';
    get('journey-progress').value = completed.size;
    const foundCount = collectibles.filter(item => isTrackable(item) && collected.has(collectibleId(item))).length;
    get('collectible-progress-label').textContent = foundCount + ' de 176 colecionáveis encontrados';
    get('collectible-progress').value = foundCount;
    document.querySelector('.map-count').textContent = visible + ' colossos · ' + regions + ' pontos visíveis';
  }
  function select(number, announce = true) {
    get('quadrant-highlight').hidden = true;
    get('collectible-links').hidden = true;
    collectibleMarkers.forEach(m => m.setAttribute('aria-pressed', 'false'));
    current = number;
    currentCollectible = null;
    const card = cards[number - 1];
    const locked = isLocked(number);
    get('detail-number').textContent = 'Colosso ' + String(number).padStart(2, '0') + ' · ' + card.coord;
    get('detail-name').textContent = displayName(number);
    get('detail-description').textContent = locked ? 'Derrote este colosso ou desative o modo sem spoilers para revelar sua ficha.' : card.desc;
    if (!locked) get('detail-image').src = card.img;
    get('detail-image').alt = locked ? '' : 'Interpretação artística de ' + card.name;
    get('detail-image').hidden = locked;
    get('detail-credit').hidden = locked;
    get('detail-link').href = 'Colosso' + number + '.html';
    get('detail-link').hidden = false;
    get('detail-link').textContent = 'Abrir ficha ↗';
    get('completion-control').hidden = false;
    get('collectible-completion-control').hidden = true;
    get('mark-complete').checked = completed.has(number);
    [...markers, ...placeMarkers].forEach(m => m.setAttribute('aria-pressed', String(m === markers[number - 1])));
    if (announce) get('selection-status').textContent = displayName(number) + ' selecionado. Ficha atualizada.';
  }
  markers.forEach((marker, i) => marker.addEventListener('click', () => select(i + 1)));
  placeMarkers.forEach((marker, i) => marker.addEventListener('click', () => {
    get('quadrant-highlight').hidden = true;
    get('collectible-links').hidden = true;
    collectibleMarkers.forEach(m => m.setAttribute('aria-pressed', 'false'));
    const place = places[i];
    current = null;
    currentCollectible = null;
    get('detail-number').textContent = 'Ponto de interesse · ' + place[1];
    get('detail-name').textContent = place[0];
    get('detail-description').textContent = place[4];
    get('detail-image').src = place[5];
    get('detail-image').alt = place[0] + ' em Shadow of the Colossus';
    get('detail-image').hidden = false;
    get('detail-credit').hidden = true;
    get('completion-control').hidden = true;
    get('collectible-completion-control').hidden = true;
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
    select(current, false);
  });
  spoilerToggle.addEventListener('click', () => {
    spoilerMode = !spoilerMode;
    try { localStorage.setItem(spoilerKey, spoilerMode ? 'on' : 'off'); } catch { /* Keep it for this visit. */ }
    renderSpoilerToggle();
    renderSearchOptions();
    refresh();
    if (current) select(current, false);
  });
  get('mark-collectible').addEventListener('change', () => {
    if (!currentCollectible || !isTrackable(currentCollectible)) return;
    const id = collectibleId(currentCollectible);
    if (get('mark-collectible').checked) collected.add(id); else collected.delete(id);
    try { localStorage.setItem(collectibleKey, JSON.stringify([...collected])); }
    catch { get('save-status').textContent = 'Não foi possível salvar neste navegador. O progresso será mantido apenas durante esta visita.'; }
    get('selection-status').textContent = labels[currentCollectible.type] + (get('mark-collectible').checked ? ' marcado como encontrado.' : ' marcado como não encontrado.');
    refresh();
  });
  collectibles.forEach(group => {
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'collectible-marker collectible-' + group.type;
    marker.style.setProperty('--x', group.x + '%');
    marker.style.setProperty('--y', group.y + '%');
    marker.textContent = { coins: '◉', fruits: '♣', lizards: '∿', shrines: '⌂' }[group.type];
    marker.title = group.type === 'coins' ? 'Moeda · ' + group.coord : labels[group.type] + ' ' + group.id + ' · ' + group.coord;
    marker.setAttribute('aria-label', group.type === 'coins' ? 'Moeda, quadrante ' + group.coord : labels[group.type] + ' ' + group.id + ', quadrante ' + group.coord);
    marker.setAttribute('aria-controls', 'atlas-detail');
    marker.setAttribute('aria-describedby', 'collectibles-help');
    marker.setAttribute('aria-pressed', 'false');
    marker.hidden = true;
    marker.addEventListener('click', () => {
      get('quadrant-highlight').hidden = true;
      current = null;
      currentCollectible = group;
      [...markers, ...placeMarkers, ...collectibleMarkers].forEach(m => m.setAttribute('aria-pressed', String(m === marker)));
      get('detail-number').textContent = group.type === 'coins' ? 'Moeda · ' + group.coord : 'Ponto ' + String(group.id).padStart(2, '0') + ' · ' + group.coord;
      get('detail-name').textContent = labels[group.type];
      get('detail-image').hidden = true;
      get('detail-credit').hidden = true;
      get('completion-control').hidden = true;
      get('collectible-completion-control').hidden = !isTrackable(group);
      get('mark-collectible').checked = collected.has(collectibleId(group));
      get('collectible-completion-label').textContent = group.type === 'coins' ? 'Moeda encontrada' : group.type === 'fruits' ? 'Árvore encontrada' : 'Lagarto encontrado';
      const descriptions = {
        coins: (group.videoOptions?.length || 1) === 1
          ? 'Moeda dourada do remake de PS4. O vídeo abaixo abre diretamente no momento desta coleta.'
          : 'Este quadrante possui ' + group.videoOptions.length + ' moedas. Como o mapa de referência não numera os pontos dentro do quadrante, os momentos corretos de todas elas aparecem abaixo.',
        fruits: 'Ponto de árvore frutífera indicado no mapa de referência. Uma árvore pode conter várias frutas.',
        lizards: 'Ponto de lagarto de cauda branca indicado no mapa de referência. Procure nas pedras e estruturas próximas; o animal pode se mover.',
        shrines: 'Mini templo de oração indicado no mapa de referência. O Santuário da Adoração aparece separadamente no filtro Locais.'
      };
      get('detail-description').textContent = descriptions[group.type];
      get('detail-link').href = 'https://www.portale7.com.br/2018/02/localizacao-dos-santuarios-lagartos.html';
      get('detail-link').hidden = false;
      get('detail-link').textContent = 'Consultar mapa de referência ↗';
      get('collectible-links').replaceChildren();
      (group.videoOptions || []).forEach(info => {
        const video = document.createElement('a');
        const minutes = Math.floor(info.time / 60);
        const seconds = String(info.time % 60).padStart(2, '0');
        video.href = 'https://youtu.be/awFlJLIUCgw?t=' + info.time;
        video.target = '_blank';
        video.rel = 'noopener noreferrer';
        video.textContent = 'Moeda ' + String(info.number).padStart(2, '0') + ' · ' + minutes + ':' + seconds + ' ↗';
        get('collectible-links').append(video);
      });
      get('collectible-links').hidden = group.type !== 'coins';
      get('selection-status').textContent = labels[group.type] + ' em ' + group.coord + '. Guia atualizado.';
    });
    collectibleMarkers.push(marker);
    get('map').append(marker);
  });
  ['show-colossi', 'show-places', 'only-pending', 'show-coins', 'show-fruits', 'show-lizards', 'show-shrines', 'hide-completed-collectibles'].forEach(id => get(id).addEventListener('change', refresh));
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
  function setZoom(value, anchor = null) {
    const nextZoom = Math.max(1, Math.min(3, value));
    const oldWidth = get('map').offsetWidth || Math.max(825, viewport.clientWidth) * zoom;
    const oldHeight = get('map').offsetHeight || oldWidth * 940 / 1673;
    const anchorX = anchor?.x ?? viewport.clientWidth / 2;
    const anchorY = anchor?.y ?? viewport.clientHeight / 2;
    const ratioX = (viewport.scrollLeft + anchorX) / oldWidth;
    const ratioY = (viewport.scrollTop + anchorY) / oldHeight;
    zoom = nextZoom;
    const baseWidth = Math.max(825, viewport.clientWidth);
    get('map').style.width = (baseWidth * zoom) + 'px';
    const newWidth = get('map').offsetWidth;
    const newHeight = get('map').offsetHeight;
    viewport.scrollLeft = ratioX * newWidth - anchorX;
    viewport.scrollTop = ratioY * newHeight - anchorY;
    get('zoom-level').textContent = Math.round(zoom * 100) + '%';
    get('zoom-out').disabled = zoom === 1;
    get('zoom-in').disabled = zoom === 3;
  }
  get('zoom-in').addEventListener('click', () => setZoom(zoom + 0.5));
  get('zoom-out').addEventListener('click', () => setZoom(zoom - 0.5));
  get('zoom-reset').addEventListener('click', () => {
    setZoom(1);
    viewport.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    get('quadrant-highlight').hidden = true;
  });
  viewport.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) < 1) return;
    event.preventDefault();
    const bounds = viewport.getBoundingClientRect();
    setZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25), {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });
  }, { passive: false });

  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  const focusPoint = (x, y, target = null) => {
    setZoom(Math.max(zoom, 1.75));
    if (target) {
      document.querySelectorAll('.search-highlight').forEach(item => item.classList.remove('search-highlight'));
      target.classList.add('search-highlight');
      window.setTimeout(() => target.classList.remove('search-highlight'), 2400);
    }
    requestAnimationFrame(() => viewport.scrollTo({
      left: get('map').scrollWidth * x / 100 - viewport.clientWidth / 2,
      top: get('map').scrollHeight * y / 100 - viewport.clientHeight / 2,
      behavior: 'smooth'
    }));
  };
  const markerPosition = marker => ({
    x: parseFloat(marker.style.getPropertyValue('--x')),
    y: parseFloat(marker.style.getPropertyValue('--y'))
  });
  const quadrantPosition = coord => {
    const column = coord.charCodeAt(0) - 65;
    const row = Number(coord.slice(1));
    return { x: 19.125 + column * 6.75, y: row === 0 ? 2.8 : .3 + row * 11.1 };
  };
  const searchOptions = get('map-search-options');
  function renderSearchOptions() {
    searchOptions.replaceChildren();
    [...cards.map((card, i) => displayName(i + 1) + ' · Colosso ' + String(i + 1).padStart(2, '0')),
      ...places.map(place => place[0]),
      ...new Set([...cards.map(card => card.coord), ...places.map(place => place[1]), ...collectibles.map(item => item.coord)])
    ].forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      searchOptions.append(option);
    });
  }
  renderSearchOptions();
  function searchMap() {
    const raw = get('map-search').value;
    const query = normalize(raw.split(' · ')[0]);
    if (!query) {
      get('map-search-status').textContent = 'Digite o nome de um colosso, local ou quadrante.';
      return;
    }
    const colossusIndex = cards.findIndex((card, index) => {
      const name = normalize(card.name);
      return name === query || name.startsWith(query) || query === 'colosso ' + (index + 1) || query === String(index + 1).padStart(2, '0');
    });
    if (colossusIndex >= 0) {
      get('show-colossi').checked = true;
      refresh();
      select(colossusIndex + 1);
      const position = markerPosition(markers[colossusIndex]);
      focusPoint(position.x, position.y, markers[colossusIndex]);
      get('map-search-status').textContent = displayName(colossusIndex + 1) + ' localizado em ' + cards[colossusIndex].coord + '.';
      return;
    }
    const placeIndex = places.findIndex(place => normalize(place[0]) === query || normalize(place[0]).startsWith(query));
    if (placeIndex >= 0) {
      get('show-places').checked = true;
      refresh();
      placeMarkers[placeIndex].click();
      const position = markerPosition(placeMarkers[placeIndex]);
      focusPoint(position.x, position.y, placeMarkers[placeIndex]);
      get('map-search-status').textContent = places[placeIndex][0] + ' localizado em ' + places[placeIndex][1] + '.';
      return;
    }
    const coord = raw.trim().toUpperCase().replace(/\s+/g, '');
    if (/^[A-K][0-8]$/.test(coord)) {
      const position = quadrantPosition(coord);
      const highlight = get('quadrant-highlight');
      highlight.style.setProperty('--x', position.x + '%');
      highlight.style.setProperty('--y', position.y + '%');
      highlight.hidden = false;
      focusPoint(position.x, position.y, highlight);
      get('map-search-status').textContent = 'Quadrante ' + coord + ' centralizado.';
      return;
    }
    get('map-search-status').textContent = 'Nenhum resultado para “' + raw.trim() + '”.';
  }
  get('map-search-button').addEventListener('click', searchMap);
  get('map-search').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchMap();
    }
  });

  const mapPanel = document.querySelector('.map-panel');
  const fullscreenButton = get('map-fullscreen');
  function setExpanded(expanded) {
    mapPanel.classList.toggle('is-expanded', expanded);
    document.body.classList.toggle('map-is-expanded', expanded);
    fullscreenButton.textContent = expanded ? 'Sair da tela cheia' : 'Tela cheia';
    fullscreenButton.setAttribute('aria-pressed', String(expanded));
    setZoom(zoom);
  }
  fullscreenButton.addEventListener('click', () => setExpanded(!mapPanel.classList.contains('is-expanded')));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mapPanel.classList.contains('is-expanded')) setExpanded(false);
  });
  window.addEventListener('resize', () => setZoom(zoom));
  setZoom(1);
  renderSpoilerToggle();
  select(1, false);
  refresh();
  const requestedColossus = Number(new URLSearchParams(location.search).get('colosso'));
  if (Number.isInteger(requestedColossus) && requestedColossus >= 1 && requestedColossus <= cards.length) {
    get('map-search').value = cards[requestedColossus - 1].name;
    searchMap();
  }
})();
