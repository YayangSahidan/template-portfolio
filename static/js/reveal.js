// Tanpa IntersectionObserver atau jika gerakan dikurangi, konten tetap terlihat.
const elements = document.querySelectorAll('.reveal');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  elements.forEach((element) => { element.classList.add('is-ready'); observer.observe(element); });
  const showAll = () => {
    elements.forEach((element) => element.classList.add('is-visible'));
    observer.disconnect();
  };
  reduced.addEventListener('change', showAll);
  window.addEventListener('beforeprint', showAll);
}
