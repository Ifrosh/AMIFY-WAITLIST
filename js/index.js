const ENDPOINT = 'https://formsubmit.co/ajax/iadesanya539@gmail.com';

  const form = document.getElementById('form');
  const msg = document.getElementById('msg');
  const btn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'msg'; msg.textContent = '';
    const data = Object.fromEntries(new FormData(form));
    data.name = data.name.trim(); data.email = data.email.trim().toLowerCase();

    if (!data.name) return fail('Enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return fail('Enter a valid email address.');

    btn.disabled = true; btn.textContent = 'Joining...';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'New AMIFY waitlist signup: ' + data.name + ' (' + data.role + ')',
          _template: 'table',
          _captcha: 'false'
        })
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.success === 'false') throw new Error(out.message || 'Could not save your spot. Check your connection and try again.');
      window.location.href = 'thanks.html';
      return;
    } catch (err) {
      fail(err.message || 'Could not save your spot. Check your connection and try again.');
    }
    btn.disabled = false; btn.textContent = 'Join the waitlist';
  });

function fail(text) { msg.className = 'msg err'; msg.textContent = text; }