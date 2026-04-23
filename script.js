'use strict';

/* Dark / Light Mode */
const html    = document.documentElement;
const togBtn  = document.getElementById('tog');
const icoMoon = document.getElementById('ico-moon');
const icoSun  = document.getElementById('ico-sun');

let theme = localStorage.getItem('theme') || 'dark';
applyTheme(theme);

togBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  icoMoon.style.display = t === 'dark' ? '' : 'none';
  icoSun.style.display  = t === 'dark' ? 'none' : '';
}

/* Navbar scroll effect */
const navbar = document.getElementById('nav');
const nls    = document.querySelectorAll('.nl');
const secs   = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('on', window.scrollY > 55);
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 230) cur = s.id; });
  nls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
}, { passive: true });

/* Hamburger menu */
const hbg    = document.getElementById('hbg');
const nlinks = document.getElementById('nlinks');

hbg.addEventListener('click', () => {
  const isOpen = nlinks.classList.toggle('open');
  hbg.classList.toggle('open');
  hbg.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

nls.forEach(l => l.addEventListener('click', () => {
  nlinks.classList.remove('open');
  hbg.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

/* Close menu on escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nlinks.classList.contains('open')) {
    nlinks.classList.remove('open');
    hbg.classList.remove('open');
    hbg.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* Typing effect */
const phrases = ['Web Developer','UI/UX Designer','Just Curious on Everything','Problem Solver'];
const typedEl = document.getElementById('typed');
let pi=0, ci=0, del=false;

(function type() {
  const p = phrases[pi];
  typedEl.textContent = del ? p.slice(0, ci-1) : p.slice(0, ci+1);
  del ? ci-- : ci++;
  if (!del && ci === p.length) { setTimeout(()=>{ del=true; type(); }, 1900); return; }
  if (del && ci === 0)         { del=false; pi=(pi+1)%phrases.length; setTimeout(type,380); return; }
  setTimeout(type, del ? 48 : 88);
})();

/* Skill bars animation */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.bfill').forEach(b => barObs.observe(b));

/* Scroll reveal */
const rvObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const all = [...document.querySelectorAll('.rv')];
      const idx = all.indexOf(e.target);
      e.target.style.animationDelay = ((idx % 6) * 0.07) + 's';
      e.target.classList.add('in');
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* Hobbies filter */
const filterBtns = document.querySelectorAll('.hf');
const hobItems   = document.querySelectorAll('.hob-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    hobItems.forEach(item => {
      if (item.dataset.cat === cat) {
        item.classList.remove('hidden');
        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = 'revUp .5s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');

hobItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  });
});

function closeLb() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLb);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* Contact form */
document.getElementById('cform').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }
  const btn = document.getElementById('sbtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled = true;
  setTimeout(() => {
    const ok = document.getElementById('fok');
    ok.style.display = 'block';
    this.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    setTimeout(() => ok.style.display = 'none', 5000);
  }, 1300);
});

/* Footer year */
document.getElementById('yr').textContent = new Date().getFullYear();filter

/* Show only drawing by default on load */
window.addEventListener('DOMContentLoaded', () => {
  hobItems.forEach(item => {
    if (item.dataset.cat !== 'drawing') {
      item.classList.add('hidden');
    }
  });
});