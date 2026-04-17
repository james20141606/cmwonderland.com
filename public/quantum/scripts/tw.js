// Tweaks panel — toolbar-toggle + persist
(function() {
  const panel = document.getElementById('tweaksPanel');
  const T = window.TWEAKS;

  function bind(id, key, fmt) {
    const el = document.getElementById(id);
    const valEl = document.getElementById(id + 'Val');
    if (!el) return;
    el.value = T[key];
    if (valEl) valEl.textContent = fmt ? fmt(T[key]) : T[key];
    el.addEventListener('input', () => {
      const v = el.type === 'checkbox' ? el.checked : parseFloat(el.value);
      T[key] = v;
      if (valEl) valEl.textContent = fmt ? fmt(v) : v;
      applyAll();
      persist({ [key]: v });
    });
  }

  function persist(edits) {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    } catch (e) {}
  }

  function applyAll() {
    window.__applyHues(T);
    window.__applyLang(T);
    window.__applyMotion(T);
    if (window.__reseedHero) window.__reseedHero();
  }

  function open() { panel.hidden = false; }
  function close() { panel.hidden = true; }

  window.addEventListener('message', (e) => {
    if (!e.data) return;
    if (e.data.type === '__activate_edit_mode') open();
    if (e.data.type === '__deactivate_edit_mode') close();
  });

  // announce availability AFTER listener is in
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

  document.getElementById('tweaksClose').addEventListener('click', () => {
    close();
    try { window.parent.postMessage({ type: '__deactivate_edit_mode_request' }, '*'); } catch (e) {}
  });

  bind('twHueA', 'hueA');
  bind('twHueB', 'hueB');
  bind('twHueC', 'hueC');
  bind('twCount', 'particleCount');
  bind('twShowZh', 'showZh');
  bind('twShowEn', 'showEn');
  bind('twReduceMotion', 'reduceMotion');

  // also add keyboard T shortcut
  window.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
      if (!e.target || (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA')) {
        panel.hidden = !panel.hidden;
      }
    }
  });

  applyAll();
})();
