// App shell: scroll progress, rail active, reveal observer, reduce motion
(function() {
  const progress = document.getElementById('progressBar');
  const rail = document.querySelectorAll('.rail-dot');

  function onScroll() {
    const h = document.documentElement;
    const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (progress) progress.style.width = (pct * 100) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Rail click → scroll to chapter
  rail.forEach((d) => {
    d.addEventListener('click', () => {
      const ch = d.getAttribute('data-ch');
      const t = document.getElementById('ch-' + ch);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Active section observer
  window.__activateChapter = function(idx) {
    rail.forEach((d) => {
      d.classList.toggle('active', d.getAttribute('data-ch') === String(idx));
    });
  };

  // Reveal observer
  window.__attachReveal = function(root) {
    const els = (root || document).querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  };

  // Chapter observer (after chapters render)
  window.__attachChapterObs = function() {
    const chs = document.querySelectorAll('section.chapter');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.35) {
          const id = e.target.id.replace('ch-', '');
          window.__activateChapter(id);
        }
      });
    }, { threshold: [0.35, 0.5, 0.75] });
    chs.forEach(c => io.observe(c));
  };

  // apply hues
  window.__applyHues = function(T) {
    const r = document.documentElement;
    r.style.setProperty('--hue-a', T.hueA);
    r.style.setProperty('--hue-b', T.hueB);
    r.style.setProperty('--hue-c', T.hueC);
  };
  window.__applyLang = function(T) {
    document.body.classList.toggle('hide-zh', !T.showZh);
    document.body.classList.toggle('hide-en', !T.showEn);
  };
  window.__applyMotion = function(T) {
    document.body.classList.toggle('reduce-motion', !!T.reduceMotion);
  };
})();
