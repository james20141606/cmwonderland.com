/* Shared interactive widget helpers for Fun Papers */
(function(){
  // ---------- SLIDER WIDGET ----------
  // <div class="widget" data-widget="slider" data-min data-max data-value data-step data-label data-unit data-target></div>
  function initSliders(root){
    root.querySelectorAll('[data-widget="slider"]').forEach(el=>{
      if(el._init) return; el._init = true;
      const min = parseFloat(el.dataset.min||0);
      const max = parseFloat(el.dataset.max||1);
      const step = parseFloat(el.dataset.step||0.01);
      const label = el.dataset.label||'';
      const unit = el.dataset.unit||'';
      const init = parseFloat(el.dataset.value||(min+max)/2);
      el.innerHTML = `
        <div class="w-head">
          <span class="w-label">${label}</span>
          <span class="w-val"><span class="v">${init}</span><span class="u">${unit}</span></span>
        </div>
        <input type="range" min="${min}" max="${max}" step="${step}" value="${init}" />
      `;
      const input = el.querySelector('input');
      const vEl = el.querySelector('.v');
      const fire = ()=>{
        const v = parseFloat(input.value);
        vEl.textContent = (step>=1)? v.toFixed(0) : v.toFixed(2);
        el.dispatchEvent(new CustomEvent('change', {detail:{value:v}}));
      };
      input.addEventListener('input', fire);
      // initial dispatch
      requestAnimationFrame(fire);
    });
  }
  // ---------- BIND helper: set up a slider → target function wiring ----------
  function bindSlider(id, fn){
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('change', e=>fn(e.detail.value));
  }
  // ---------- Reveal-on-scroll for figures ----------
  function initReveals(){
    if(!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:0.15});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }
  window.FP = { initSliders, bindSlider, initReveals };
  document.addEventListener('DOMContentLoaded', ()=>{
    initSliders(document);
    initReveals();
  });
})();
