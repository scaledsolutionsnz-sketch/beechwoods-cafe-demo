/* Beechwoods Cafe — shared interactions */
(function () {
  // Intro overlay
  var intro = document.querySelector('.intro');
  if (intro) {
    window.addEventListener('load', function () {
      setTimeout(function () { intro.classList.add('gone'); }, 900);
    });
    // safety: never trap the page
    setTimeout(function () { intro.classList.add('gone'); }, 2600);
  }

  // Sticky nav state
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Hero rolling images
  var hero = document.querySelector('[data-hero]');
  if (hero && !reduce) {
    var slides = hero.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 6000);
    }
  }
})();
