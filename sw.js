// Theme handling
function setTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

setTheme();

const toggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
toggles.forEach(t => {
  if (t) t.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
    setTheme();
  });
});

// Mobile menu
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('open');
  });
}

// Header scroll style
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const st = window.scrollY;
  if (st > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  lastScroll = st;
});

// Back to top
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 700) btt.classList.add('show');
  else btt.classList.remove('show');
});

btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Fake form submission + basic validation
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();

  if (name.length < 2 || !email.includes('@') || msg.length < 10) {
    alert('Please fill all fields correctly.');
    return;
  }

  alert('Thank you! Your message has been sent (demo).');
  form.reset();
});

// Simple intersection observer fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.destination-card, .journal-entry, .about-section').forEach(el => {
  observer.observe(el);
});

// Minimal PWA service worker (cache shell)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
