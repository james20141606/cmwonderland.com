// Bell state measurement simulator
// State |Φ+⟩ = (|00⟩ + |11⟩)/√2
// Measuring A along angle a, B along angle b: P(same) = cos²((a-b)/2)
(function() {
  window.__initBell = function() {
    const canvas = document.getElementById('bellCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, DPR;

    let a = 0;   // A angle in radians
    let b = Math.PI / 4; // B angle

    let stats = { total: 0, same: 0, diff: 0, up_up: 0, up_dn: 0, dn_up: 0, dn_dn: 0 };
    let log = [];
    let flying = []; // animated particles when measuring

    function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function drawDetector(cx, cy, angle, label, hue, reading) {
      // Housing
      ctx.save();
      ctx.translate(cx, cy);

      // connector line back to source
      ctx.strokeStyle = 'rgba(232,230,240,0.15)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(label === 'A' ? W/2 - cx : W/2 - cx, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      // polarizer frame
      ctx.rotate(angle);
      const size = 38;
      ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.8)`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.stroke();
      // stripes
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.5)`;
      ctx.lineWidth = 1;
      for (let i = -size; i <= size; i += 6) {
        ctx.beginPath(); ctx.moveTo(i, -size); ctx.lineTo(i, size); ctx.stroke();
      }
      // axis indicator
      ctx.strokeStyle = `hsla(${hue}, 95%, 80%, 1)`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -size - 6); ctx.lineTo(0, -size - 18); ctx.stroke();
      ctx.restore();

      // label
      ctx.fillStyle = 'rgba(232,230,240,0.85)';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, cx, cy + 60);
      ctx.fillStyle = 'rgba(232,230,240,0.5)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`${(angle * 180 / Math.PI).toFixed(0)}°`, cx, cy + 74);

      // reading light
      if (reading !== null) {
        const col = reading === 1 ? `hsla(${hue}, 95%, 75%, 1)` : 'rgba(120,120,150,0.9)';
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(cx, cy - 58, 6, 0, Math.PI * 2); ctx.fill();
        ctx.font = 'italic 14px "Instrument Serif", serif';
        ctx.fillStyle = col;
        ctx.fillText(reading === 1 ? '↑' : '↓', cx, cy - 54);
      }
    }

    let currentReadingA = null, currentReadingB = null;

    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      const cxS = W / 2, cyS = H / 2;
      const hueA = css('--hue-a') || 230;
      const hueB = css('--hue-b') || 290;
      const hueC = css('--hue-c') || 45;

      // Source at center
      const sg = ctx.createRadialGradient(cxS, cyS, 0, cxS, cyS, 30);
      sg.addColorStop(0, `hsla(${hueC}, 95%, 85%, 0.8)`);
      sg.addColorStop(1, `hsla(${hueC}, 95%, 70%, 0)`);
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(cxS, cyS, 30, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `hsla(${hueC}, 95%, 90%, 1)`;
      ctx.beginPath(); ctx.arc(cxS, cyS, 4, 0, Math.PI * 2); ctx.fill();
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(232,230,240,0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('SOURCE', cxS, cyS + 24);
      ctx.fillText('|Φ⁺⟩', cxS, cyS + 38);

      // detectors
      const side = Math.min(W, H) * 0.32;
      drawDetector(cxS - side, cyS, a, 'A', hueA, currentReadingA);
      drawDetector(cxS + side, cyS, b, 'B', hueB, currentReadingB);

      // flying particles
      flying = flying.filter(f => t - f.start < 1200);
      for (let f of flying) {
        const prog = (t - f.start) / 1200;
        if (prog < 0) continue;
        const e = Math.min(1, prog);
        // particle A going left
        const xa = cxS + (cxS - side - cxS) * e;
        const xb = cxS + (cxS + side - cxS) * e;
        const y = cyS;
        ctx.fillStyle = `hsla(${hueA}, 95%, 85%, ${1 - e*0.3})`;
        ctx.beginPath(); ctx.arc(xa, y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${hueB}, 95%, 85%, ${1 - e*0.3})`;
        ctx.beginPath(); ctx.arc(xb, y, 3, 0, Math.PI * 2); ctx.fill();
      }
    }

    function probSame() {
      const d = a - b;
      return Math.cos(d / 2) ** 2;
    }

    function measureOnce() {
      const pSame = probSame();
      const same = Math.random() < pSame;
      // Symmetric: P(↑↑)=P(↓↓)= 0.5 * cos²(d/2)
      //            P(↑↓)=P(↓↑)= 0.5 * sin²(d/2)
      const resA = Math.random() < 0.5 ? 1 : 0;
      const resB = same ? resA : 1 - resA;

      stats.total++;
      if (same) stats.same++; else stats.diff++;
      const key = (resA === 1 ? 'up' : 'dn') + '_' + (resB === 1 ? 'up' : 'dn');
      stats[key]++;

      currentReadingA = resA;
      currentReadingB = resB;

      flying.push({ start: performance.now() });

      log.unshift({ n: stats.total, a: a, b: b, A: resA, B: resB });
      if (log.length > 50) log.pop();

      updateUI();
    }

    function updateUI() {
      document.getElementById('bell-a-val').textContent = (a * 180/Math.PI).toFixed(0) + '°';
      document.getElementById('bell-b-val').textContent = (b * 180/Math.PI).toFixed(0) + '°';
      document.getElementById('bell-diff-val').textContent = ((a - b) * 180/Math.PI).toFixed(0) + '°';
      document.getElementById('bell-pred').textContent = (probSame() * 100).toFixed(1) + '%';

      document.getElementById('bell-total').textContent = stats.total;
      document.getElementById('bell-same').textContent = stats.total ? ((stats.same / stats.total) * 100).toFixed(1) + '%' : '—';
      document.getElementById('bell-diff').textContent = stats.total ? ((stats.diff / stats.total) * 100).toFixed(1) + '%' : '—';
      // correlation E = P(same) - P(diff) = cos(a-b)
      const E = stats.total ? (stats.same - stats.diff) / stats.total : 0;
      document.getElementById('bell-e').textContent = stats.total ? E.toFixed(3) : '—';

      // log
      const lg = document.getElementById('bell-log');
      lg.innerHTML = '<div class="logrow"><span>#</span><span>θa, θb</span><span>A</span><span>B</span></div>' +
        log.slice(0, 16).map(r =>
          `<div class="logrow"><span>${r.n}</span><span>${(r.a*180/Math.PI).toFixed(0)}°, ${(r.b*180/Math.PI).toFixed(0)}°</span><span class="${r.A?'up':'down'}">${r.A?'↑':'↓'}</span><span class="${r.B?'up':'down'}">${r.B?'↑':'↓'}</span></div>`
        ).join('');
    }

    function reset() {
      stats = { total: 0, same: 0, diff: 0, up_up: 0, up_dn: 0, dn_up: 0, dn_dn: 0 };
      log = [];
      currentReadingA = currentReadingB = null;
      updateUI();
    }

    // Bind controls
    const aIn = document.getElementById('bell-a');
    const bIn = document.getElementById('bell-b');
    aIn.addEventListener('input', () => { a = parseFloat(aIn.value) * Math.PI / 180; updateUI(); });
    bIn.addEventListener('input', () => { b = parseFloat(bIn.value) * Math.PI / 180; updateUI(); });

    document.getElementById('bell-measure').addEventListener('click', measureOnce);
    document.getElementById('bell-measure100').addEventListener('click', () => {
      for (let i = 0; i < 100; i++) measureOnce();
    });
    document.getElementById('bell-reset').addEventListener('click', reset);

    function loop() { draw(performance.now()); requestAnimationFrame(loop); }

    resize(); updateUI(); loop();
    window.addEventListener('resize', resize);
  };
})();
