// Hanya mengelola menu dan fallback logo. Tautan jangkar tetap bekerja secara native.
const header = document.querySelector('[data-navbar]');
if (header) {
  const menu = header.querySelector('#navMenu');
  const toggle = header.querySelector('.nav__toggle');
  const mobile = window.matchMedia('(max-width: 760px)');
  let open = false;
  const render = () => {
    toggle.hidden = !mobile.matches;
    menu.hidden = mobile.matches && !open;
    toggle.setAttribute('aria-expanded', String(!menu.hidden));
    toggle.textContent = open ? 'Tutup' : 'Menu';
  };
  if (menu && toggle) {
    toggle.addEventListener('click', () => { open = !open; render(); });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) { open = false; render(); }
    });
    header.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && open) { open = false; render(); toggle.focus(); }
    });
    mobile.addEventListener('change', () => { open = false; render(); });
    render();
  }
  const logo = header.querySelector('.nav__logo-image');
  const fallback = header.querySelector('.nav__brand-text');
  if (logo && fallback) {
    const showFallback = () => { logo.hidden = true; fallback.hidden = false; };
    logo.addEventListener('error', showFallback);
    if (logo.complete && !logo.naturalWidth) showFallback();
  }
}
