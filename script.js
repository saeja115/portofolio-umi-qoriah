/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
const dot   = document.querySelector('.cursor-dot');
const ring  = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', e => {
  dot.style.transform  = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
});

const hoverables = document.querySelectorAll('a, button, .writing-card, .design-item, .about-tag, .btn-gold, .btn-ghost');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
  el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
});

/* ═══════════════════════════════════════
   NAV — scroll shadow
═══════════════════════════════════════ */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ═══════════════════════════════════════
   ACTIVE NAV LINK on scroll
═══════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const onScroll  = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
};
window.addEventListener('scroll', onScroll);

/* ═══════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════ */
const revealAll = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealIO  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1 });
revealAll.forEach(el => revealIO.observe(el));

/* ═══════════════════════════════════════
   STAGGER CARDS
═══════════════════════════════════════ */
document.querySelectorAll('.writing-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
});
document.querySelectorAll('.design-item').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.value-item').forEach((el, i) => {
  el.dataset.delay = i * 120;
});

/* ═══════════════════════════════════════
   TYPEWRITER — hero tagline (subtle)
═══════════════════════════════════════ */
const typeEl = document.getElementById('hero-type');
if (typeEl) {
  const texts = [
    'Santri. Penulis. Desainer.',
    'Pencerita melalui kata & warna.',
    'Menemukan makna di setiap karya.',
  ];
  let ti = 0, ci = 0, deleting = false;
  const type = () => {
    const txt = texts[ti];
    typeEl.textContent = txt.slice(0, ci);
    if (!deleting) {
      ci++;
      if (ci > txt.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      ci--;
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  };
  type();
}

/* ═══════════════════════════════════════
   PARALLAX — hero background letter
═══════════════════════════════════════ */
const bgLetter = document.querySelector('.hero-bg-letter');
if (bgLetter) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bgLetter.style.transform = `translateY(calc(-50% + ${y * 0.15}px))`;
  }, { passive: true });
}

/* ═══════════════════════════════════════
   INK RIPPLE on click
═══════════════════════════════════════ */
document.addEventListener('click', e => {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    width:12px; height:12px; margin:-6px 0 0 -6px;
    border-radius:50%; border:1.5px solid var(--gold);
    pointer-events:none; z-index:9999;
    animation:inkRipple .6s ease-out forwards;
  `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
});

/* Inject ripple keyframe */
const style = document.createElement('style');
style.textContent = `
  @keyframes inkRipple {
    0%   { transform:scale(0);   opacity:.8; }
    100% { transform:scale(5);   opacity:0;  }
  }
`;
document.head.appendChild(style);

/* ═══════════════════════════════════════
   CANVAS — ornate background pattern
   (subtle geometric, drawn on canvas)
═══════════════════════════════════════ */
(function drawCanvasPattern() {
  const canvas = document.getElementById('ornament-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const size = 72;
    ctx.strokeStyle = 'rgba(184,144,42,0.055)';
    ctx.lineWidth = 0.8;

    for (let x = 0; x < canvas.width + size; x += size) {
      for (let y = 0; y < canvas.height + size; y += size) {
        // Subtle diamond
        ctx.beginPath();
        ctx.moveTo(x, y - size * 0.3);
        ctx.lineTo(x + size * 0.3, y);
        ctx.lineTo(x, y + size * 0.3);
        ctx.lineTo(x - size * 0.3, y);
        ctx.closePath();
        ctx.stroke();
      }
    }
    // Diagonal lines
    ctx.strokeStyle = 'rgba(184,144,42,0.022)';
    ctx.lineWidth = 0.5;
    for (let i = -canvas.height; i < canvas.width + canvas.height; i += 90) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }
  }

  window.addEventListener('resize', resize);
  resize();
})();