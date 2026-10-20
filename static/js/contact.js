const form = document.querySelector('[data-contact-form]');

if (form) {
  const button = form.querySelector('[data-contact-submit]');
  const status = form.querySelector('[data-contact-status]');
  const phone = form.dataset.whatsapp?.trim() ?? '';

  if (button && status) {
    if (/^62\d{8,13}$/.test(phone)) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fields = new FormData(form);
        const name = String(fields.get('name') ?? '').trim();
        const email = String(fields.get('email') ?? '').trim();
        const message = String(fields.get('message') ?? '').trim();

        const text = [
          'Halo Sahid, saya ingin berdiskusi mengenai website.',
          '',
          `Nama: ${name}`,
          `Email: ${email}`,
          '',
          message,
        ].join('\n');

        status.textContent =
          'Silakan lanjutkan pengiriman di WhatsApp.';

        window.location.href =
          `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      });

      button.disabled = false;
    } else {
      status.textContent =
        'Nomor WhatsApp tujuan belum diatur dengan benar.';
    }
  }
}