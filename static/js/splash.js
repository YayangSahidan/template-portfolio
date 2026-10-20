const splash = document.querySelector('#site-splash');

if (splash && typeof splash.showModal === 'function') {
  const image = splash.querySelector('.splash__image');
  const skip = splash.querySelector('.splash__skip');

  const configuredDuration = Number(splash.dataset.duration);
  const duration = Number.isFinite(configuredDuration)
    ? Math.min(Math.max(configuredDuration, 500), 5000)
    : 1800;

  let timer;
  let fadeTimer;

  function closeSplash() {
    clearTimeout(timer);

    if (!splash.open || splash.classList.contains('is-closing')) {
      return;
    }

    splash.classList.add('is-closing');

    fadeTimer = setTimeout(() => {
      if (splash.open) {
        splash.close();
      }
    }, 250);
  }

  skip?.addEventListener('click', closeSplash);

  // Jika gambar gagal dimuat, halaman tetap bisa diakses.
  image?.addEventListener('error', closeSplash, { once: true });

  splash.addEventListener('close', () => {
    clearTimeout(timer);
    clearTimeout(fadeTimer);
  });

  // Jangan tampilkan splash jika gambar sudah diketahui gagal dimuat.
  if (image && (!image.complete || image.naturalWidth > 0)) {
    splash.showModal();
    timer = setTimeout(closeSplash, duration);
  }
}