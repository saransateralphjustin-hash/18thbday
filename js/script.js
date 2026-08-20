// ============================================================
// NAVIGATION — scroll state + mobile toggle
// ============================================================
const siteNav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  siteNav.classList.toggle('scrolled', window.scrollY > 40);
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
  const noteEl = document.getElementById('countdownNote');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      if (noteEl) noteEl.textContent = "It's celebration day!";
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

  if (noteEl) noteEl.textContent = ' ';
  tick();
  const timer = setInterval(tick, 1000);
}

// ============================================================
// GALLERY LIGHTBOX
// ============================================================
const galleryItems = Array.from(document.querySelectorAll('.g-item'));
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCounter = document.getElementById('lbCounter');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;

// Pull each gallery tile's background so the lightbox mirrors it,
// and its number label for the placeholder caption.
const galleryData = galleryItems.map(item => ({
  background: getComputedStyle(item).backgroundImage,
  label: item.querySelector('span') ? item.querySelector('span').textContent : ''
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
  lbImage.style.background = data.background;
  lbImage.textContent = `Photo ${data.label}`;
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
