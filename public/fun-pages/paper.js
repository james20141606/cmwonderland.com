/* Shared interactive widget helpers for Fun Papers
   ---------------------------------------------------
   Widgets available via data-widget:
   - slider       : labeled range input that dispatches 'change' events
   - toggle       : labeled on/off pill toggle
   - stepper      : discrete step picker (prev/next)

   Also exports:
   - FP.bindSlider(id, fn)     : wire slider value -> fn
   - FP.bindToggle(id, fn)     : wire toggle on/off -> fn
   - FP.initReveals()          : IntersectionObserver reveal-on-scroll
   - FP.animatePath(el,ms)     : stroke-dash animate a single path once
*/
(function(){
  // ---------- SLIDER ----------
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
      requestAnimationFrame(fire);
    });
  }
  function bindSlider(id, fn){
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('change', e=>fn(e.detail.value));
  }

  // ---------- TOGGLE ----------
  function initToggles(root){
    root.querySelectorAll('[data-widget="toggle"]').forEach(el=>{
      if(el._init) return; el._init = true;
      const onLabel = el.dataset.on || 'ON';
      const offLabel = el.dataset.off || 'OFF';
      const label = el.dataset.label || '';
      const init = el.dataset.value === 'true';
      el.innerHTML = `
        <div class="w-head">
          <span class="w-label">${label}</span>
          <button class="w-toggle ${init?'on':''}" type="button">
            <span class="dot"></span>
            <span class="state">${init?onLabel:offLabel}</span>
          </button>
        </div>
      `;
      const btn = el.querySelector('button');
      let state = init;
      btn.addEventListener('click', ()=>{
        state = !state;
        btn.classList.toggle('on', state);
        btn.querySelector('.state').textContent = state ? onLabel : offLabel;
        el.dispatchEvent(new CustomEvent('change', {detail:{value:state}}));
      });
      // initial
      requestAnimationFrame(()=> el.dispatchEvent(new CustomEvent('change', {detail:{value:state}})));
    });
  }
  function bindToggle(id, fn){
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('change', e=>fn(e.detail.value));
  }

  // ---------- STEPPER ----------
  function initSteppers(root){
    root.querySelectorAll('[data-widget="stepper"]').forEach(el=>{
      if(el._init) return; el._init = true;
      const steps = (el.dataset.steps||'').split('|').filter(Boolean);
      const label = el.dataset.label || '';
      let idx = parseInt(el.dataset.index||'0', 10);
      el.innerHTML = `
        <div class="w-head">
          <span class="w-label">${label}</span>
          <span class="w-val"><span class="v"></span></span>
        </div>
        <div class="w-stepper">
          <button class="prev" type="button">◀</button>
          <div class="track"></div>
          <button class="next" type="button">▶</button>
        </div>
      `;
      const vEl = el.querySelector('.v');
      const track = el.querySelector('.track');
      track.innerHTML = steps.map((_,i)=>`<span class="seg ${i<=idx?'on':''}"></span>`).join('');
      const fire = ()=>{
        vEl.textContent = steps[idx] || '';
        track.querySelectorAll('.seg').forEach((s,i)=>s.classList.toggle('on', i<=idx));
        el.dispatchEvent(new CustomEvent('change', {detail:{index:idx, value:steps[idx]}}));
      };
      el.querySelector('.prev').addEventListener('click',()=>{ idx=Math.max(0,idx-1); fire(); });
      el.querySelector('.next').addEventListener('click',()=>{ idx=Math.min(steps.length-1,idx+1); fire(); });
      requestAnimationFrame(fire);
    });
  }
  function bindStepper(id, fn){
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('change', e=>fn(e.detail.index, e.detail.value));
  }

  // ---------- Reveal on scroll ----------
  function initReveals(){
    if(!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:0.14});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  // ---------- Animate an SVG path once via stroke-dashoffset ----------
  function animatePath(el, ms){
    if(!el) return;
    const len = el.getTotalLength ? el.getTotalLength() : 1200;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.getBoundingClientRect();
    el.style.transition = `stroke-dashoffset ${ms||2200}ms cubic-bezier(.3,.7,.3,1)`;
    el.style.strokeDashoffset = 0;
  }

  window.FP = { initSliders, initToggles, initSteppers, bindSlider, bindToggle, bindStepper, initReveals, animatePath };
  document.addEventListener('DOMContentLoaded', ()=>{
    initSliders(document);
    initToggles(document);
    initSteppers(document);
    initReveals();
  });
})();
