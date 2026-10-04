// As âncoras funcionam sem JavaScript; com ele, também direcionam o foco.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById(link.hash.slice(1))?.focus({ preventScroll: true });
  });
});

// Efeitos de ponteiro: apenas decorativos, desligados quando há preferência por movimento reduzido.
const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
if (fine.matches) {
  document.querySelectorAll('.path').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - box.left}px`);
      card.style.setProperty('--my', `${event.clientY - box.top}px`);
    });
  });
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  if (hero && art) {
    hero.addEventListener('pointermove', event => {
      if (calm.matches) return;
      const box = hero.getBoundingClientRect();
      art.style.setProperty('--tx', `${((event.clientX - box.left) / box.width - .5) * 14}deg`);
      art.style.setProperty('--ty', `${((event.clientY - box.top) / box.height - .5) * -14}deg`);
    });
    hero.addEventListener('pointerleave', () => { art.style.setProperty('--tx', '0deg'); art.style.setProperty('--ty', '0deg'); });
  }
}
