// Alinha o fim do degradê à seção, inclusive após imagens e fontes carregarem.
(() => {
  const section = document.getElementById('aparencia-amaldicoada');
  if (!section) return;
  const alignGradient = () => {
    const depth = Math.round(section.getBoundingClientRect().top + window.scrollY);
    document.body.style.setProperty('--corruption-depth', Math.max(1, depth) + 'px');
  };
  alignGradient();
  window.addEventListener('resize', alignGradient, { passive: true });
  window.addEventListener('load', alignGradient, { once: true });
  if ('ResizeObserver' in window) {
    new ResizeObserver(alignGradient).observe(document.querySelector('main'));
  }
})();
