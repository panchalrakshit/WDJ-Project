(function contactFormHandler(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameEl = form.querySelector('#name');
  const emailEl = form.querySelector('#email');
  const msgEl = form.querySelector('#message');
  const statusEl = document.getElementById('formStatus');

  // small helper validators
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
  function setError(el, msg){
    const err = el.parentElement.querySelector('.error');
    if (err) err.textContent = msg || '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // reset messages
    setError(nameEl, '');
    setError(emailEl, '');
    setError(msgEl, '');
    statusEl.textContent = '';

    let valid = true;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg = msgEl.value.trim();

    if (!name) { setError(nameEl, 'Please enter your name'); valid = false; }
    if (!email || !isEmail(email)) { setError(emailEl, 'Please enter a valid email'); valid = false; }
    if (!msg || msg.length < 6) { setError(msgEl, 'Message must be at least 6 characters'); valid = false; }

    if (!valid) return;

    // simulate send (no backend) — show sending UI
    statusEl.style.color = '#cbe7ff';
    statusEl.textContent = 'Sending…';

    // disable submit button briefly
    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';

    // simulate network delay then show success
    setTimeout(() => {
      statusEl.style.color = '#b7f5d6';
      statusEl.textContent = 'Thanks! Your message has been received. I will reply soon.';

      // clear form
      form.reset();

      // re-enable button
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';

      // small toast-like fade out after 6s
      setTimeout(() => {
        statusEl.textContent = '';
      }, 6000);
    }, 900);
  });

  // set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
