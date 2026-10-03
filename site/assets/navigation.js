const button = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');

if (button && navigation) {
  const mobile = window.matchMedia('(max-width: 800px)');
  let open = false;

  function render() {
    navigation.hidden = mobile.matches && !open;
    button.setAttribute('aria-expanded', String(open && mobile.matches));
  }

  button.addEventListener('click', () => {
    open = !open;
    render();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open && mobile.matches) {
      open = false;
      render();
      button.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const destination = document.getElementById(link.hash.slice(1));
      open = false;
      render();
      destination?.focus({ preventScroll: true });
    });
  });

  mobile.addEventListener('change', () => {
    const focused = document.activeElement;
    open = false;
    render();
    if (mobile.matches && navigation.contains(focused)) button.focus();
    else if (!mobile.matches && focused === button) navigation.querySelector('a')?.focus();
  });

  render();
  document.documentElement.dataset.menuReady = 'true';
}
