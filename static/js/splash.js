const splash = document.querySelector('#site-splash');
const video = splash?.querySelector('.splash__video');
const skip = splash?.querySelector('.splash__skip');

if (splash && video && typeof splash.showModal === 'function') {
  const configuredTimeout = Number(splash.dataset.timeout);
  const timeout = Number.isFinite(configuredTimeout)
    ? Math.min(Math.max(configuredTimeout, 1000), 30000)
    : 15000;

  let safetyTimer;
  let fadeTimer;

  function closeSplash() {
    if (!splash.open || splash.classList.contains('is-closing')) {
      return;
    }

    clearTimeout(safetyTimer);
    video.pause();
    splash.classList.add('is-closing');

    fadeTimer = setTimeout(() => {
      if (splash.open) {
        splash.close();
      }
    }, 250);
  }

  // Tutup setelah video selesai, dilewati, atau gagal dimuat.
  video.addEventListener('ended', closeSplash);
  video.addEventListener('error', closeSplash);
  skip?.addEventListener('click', closeSplash);

  // Bersihkan pemutaran dan timer, termasuk ketika menekan Escape.
  splash.addEventListener('close', () => {
    clearTimeout(safetyTimer);
    clearTimeout(fadeTimer);
    video.pause();
  });

  splash.showModal();

  // Batas tunggu agar splash tidak menghalangi halaman terlalu lama.
  safetyTimer = setTimeout(closeSplash, timeout);

  video.muted = true;

  if (video.error) {
    closeSplash();
  } else {
    // Jika autoplay ditolak, langsung buka halaman utama.
    video.play().catch(closeSplash);
  }
}