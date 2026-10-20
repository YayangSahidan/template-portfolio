// Animasi hero terpisah dari navbar, form, dan animasi scroll.
const hero = document.querySelector('#cover');
if (hero) {
  const photo = hero.querySelector('[data-profile-photo]');
  const fallback = hero.querySelector('[data-photo-fallback]');
  const note = hero.querySelector('[data-photo-note]');
  if (photo) {
    const showFallback = () => {
      photo.hidden = true;
      if (fallback) fallback.hidden = false;
      if (note) note.hidden = false;
    };
    photo.addEventListener('error', showFallback);
    if (photo.complete && !photo.naturalWidth) showFallback();
  }
  const typed = hero.querySelector('[data-typewriter]');
  if (typed) {
    const fullText = typed.dataset.typewriter;
    const letters = Array.from(fullText);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let index = 0;
    const finish = () => {
      window.clearTimeout(timer);
      typed.textContent = fullText;
      typed.classList.remove('is-typing');
    };
    const typeNext = () => {
      if (reduced.matches) { finish(); return; }
      index += 1;
      typed.textContent = letters.slice(0, index).join('');
      // Ubah 150 untuk kecepatan mengetik dalam milidetik.
      timer = window.setTimeout(index < letters.length ? typeNext : finish, index < letters.length ? 150 : 700);
    };
    if (!reduced.matches && letters.length) {
      typed.textContent = '';
      typed.classList.add('is-typing');
      timer = window.setTimeout(typeNext, 400);
    }
    reduced.addEventListener('change', finish);
    window.addEventListener('beforeprint', finish);
  }
}
