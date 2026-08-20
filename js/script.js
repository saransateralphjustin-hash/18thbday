// ============================================================
// FALLING ROSE PETALS
// ============================================================
const petalsContainer = document.getElementById('petals');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (petalsContainer && !prefersReducedMotion) {
  // Two simple petal silhouettes (not emoji) — a rounded rose petal
  // and a slightly narrower one, for gentle visual variety.
  const petalShapes = [
    '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C9 6 4 12 4 19c0 6.6 5.4 11 12 11s12-4.4 12-11c0-7-5-13-12-17z"/></svg>',
    '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C11 8 6 13 7 20c1 6 6.5 9.5 9 9.5s8-3.5 9-9.5c1-7-4-12-9-17z"/></svg>'
  ];
  const petalColors = ['var(--dusty-rose)', 'var(--deep-rose)', 'var(--gold)', 'var(--champagne)'];

  const MAX_PETALS = 16;

  function spawnPetal() {
    if (petalsContainer.childElementCount >= MAX_PETALS) return;

    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerHTML = petalShapes[Math.floor(Math.random() * petalShapes.length)];

    const size = 12 + Math.random() * 14;            // 12–26px
    const startX = Math.random() * window.innerWidth;
    const duration = 10 + Math.random() * 8;          // 10–18s
    const drift = 30 + Math.random() * 60;             // px sway right
    const drift2 = -(20 + Math.random() * 70);         // px sway left
    const rotMid = 90 + Math.random() * 180;
    const rotEnd = 250 + Math.random() * 260;
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];

    petal.style.setProperty('--petal-size', size + 'px');
    petal.style.setProperty('--petal-x', startX + 'px');
    petal.style.setProperty('--petal-duration', duration + 's');
    petal.style.setProperty('--petal-drift', drift + 'px');
    petal.style.setProperty('--petal-drift2', drift2 + 'px');
    petal.style.setProperty('--petal-rot-mid', rotMid + 'deg');
    petal.style.setProperty('--petal-rot-end', rotEnd + 'deg');
    petal.style.setProperty('--petal-color', color);

    petalsContainer.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }

  // Seed a few immediately so it doesn't feel empty on load, then
  // keep a steady light drift of new petals.
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnPetal, i * 500);
  }
  setInterval(spawnPetal, 1400);
}

// ============================================================
// NAVIGATION — scroll state + mobile toggle
// ============================================================
const siteNav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  siteNav.classList.toggle('scrolled', window.scrollY > 40);

  if (scrollProgress) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// COUNTDOWN TIMER
// ============================================================
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  // dataset.date includes an explicit +08:00 (Philippine Time) offset,
  // so this target instant is correct no matter what timezone the
  // visitor's browser is in — Date.now() is always true UTC.
  const targetDate = new Date(countdownEl.dataset.date).getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  const timer = setInterval(tick, 1000);
}

// ============================================================
// GALLERY LIGHTBOX
// ============================================================
const galleryItems = Array.from(document.querySelectorAll('#galleryGrid .g-item'));
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCounter = document.getElementById('lbCounter');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;

// Pull each gallery photo's real image src (and alt text for captioning).
const galleryData = galleryItems.map(item => ({
  src: item.getAttribute('src'),
  alt: item.getAttribute('alt') || ''
}));

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const data = galleryData[currentIndex];
  lbImage.src = data.src;
  lbImage.alt = data.alt;
  lbCounter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryData.length;
  renderLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
  renderLightbox();
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', showNext);
lbPrev.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

// ============================================================
// RSVP — handled by an embedded Google Form (see index.html /
// README for how to swap in the real form URL). No JS needed here.
// ============================================================
