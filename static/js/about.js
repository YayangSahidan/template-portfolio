// Animasi deskripsi About, berjalan sekali saat terlihat.
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

document.querySelectorAll('[data-about-typing]').forEach((paragraph) => {
  const reserve = paragraph.querySelector('.about__bio-reserve');
  const typed = paragraph.querySelector('.about__bio-typed');

  if (!reserve || !typed) return;

  const letters = Array.from(reserve.textContent.trim());
  let timer;
  let observer;
  let started = false;

  const finish = () => {
    window.clearTimeout(timer);
    observer?.disconnect();
    paragraph.classList.remove('is-typing');
    typed.hidden = true;
  };

  const start = () => {
    if (started || reducedMotion.matches || !letters.length) return;

    started = true;
    typed.textContent = '';
    typed.hidden = false;
    paragraph.classList.add('is-typing');

    let index = 0;

    const typeNext = () => {
      index += 1;
      typed.textContent = letters.slice(0, index).join('');

      if (index < letters.length) {
        // Jeda per huruf. Angka lebih besar berarti lebih lambat.
        timer = window.setTimeout(typeNext, 30);
      } else {
        finish();
      }
    };

    typeNext();
  };

  if (!reducedMotion.matches) {
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          start();
        }
      }, { threshold: 0.15 });

      observer.observe(paragraph);
    } else {
      start();
    }
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) finish();
  });

  window.addEventListener('beforeprint', finish);
});