(() => {
  'use strict';

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header on scroll
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', () => header.classList.remove('menu-open'));
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Counters
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur = 1800;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('ru-RU');
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('ru-RU');
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

  // Form
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      if (!name || !phone) {
        alert('Пожалуйста, укажите имя и контакт для связи.');
        return;
      }
      ok.classList.add('show');
      form.reset();
      setTimeout(() => ok.classList.remove('show'), 6000);
    });
  }

  // Smooth anchor offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Subtle parallax for hero cards
  const cards = document.querySelectorAll('.hero__card');
  if (cards.length && window.matchMedia('(min-width: 821px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      cards.forEach((c, i) => {
        const f = (i + 1) * 0.6;
        c.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    });
  }
})();
