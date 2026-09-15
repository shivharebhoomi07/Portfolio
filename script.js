// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK TRACKING =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== TYPING EFFECT — Only "Software Developer" =====
const roles = [
  'Software Developer',
  'Open-Source Contributor'
];

const heroRole = document.getElementById('heroRole');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    heroRole.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    heroRole.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 400;
  }

  setTimeout(typeRole, typeSpeed);
}

typeRole();

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);

      if (target >= 1000000) {
        counter.textContent = (current / 1000000).toFixed(0) + 'M+';
      } else if (target >= 1000) {
        counter.textContent = (current / 1000).toFixed(0) + 'K+';
      } else {
        counter.textContent = current + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER TRIGGER =====
const heroStats = document.querySelector('.hero-stats');
let counterAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterAnimated) {
      counterAnimated = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

if (heroStats) {
  counterObserver.observe(heroStats);
}

// ===== SMOOTH SCROLL — only for # anchors =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== PARALLAX ON HERO ART =====
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  heroVisual.style.transition = 'transform 0.1s ease-out';
  heroVisual.style.transformStyle = 'preserve-3d';
}

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', function () {
    this.style.transform = 'translate(0, 0)';
  });
});

// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    this.style.setProperty('--mouse-x', `${x * 100}%`);
    this.style.setProperty('--mouse-y', `${y * 100}%`);
  });
});

// ===== CONSOLE EASTER EGG =====
console.log(
  '%c 🚀 Built by Bhoomi Shivhare ',
  'background: linear-gradient(135deg, #8B5CF6, #06B6D4); color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: bold;'
);
