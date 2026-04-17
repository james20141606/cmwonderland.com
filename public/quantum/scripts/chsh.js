// CHSH inequality: S = E(a,b) - E(a,b') + E(a',b) + E(a',b')
// Classical bound |S| ≤ 2, quantum max 2√2 ≈ 2.828
(function() {
  window.__initCHSH = function() {
    const svg = document.getElementById('chshSvg');
    if (!svg) return;

    let a = 0, ap = Math.PI/4, b = Math.PI/8, bp = 3*Math.PI/8;

    function E(x, y) { return Math.cos(2 * (x - y)); }
    function computeS() {
      return E(a, b) - E(a, bp) + E(ap, b) + E(ap, bp);
    }

    function drawArrow(cx, cy, r, angle, color, label) {
      const x2 = cx + Math.cos(angle) * r;
      const y2 = cy - Math.sin(angle) * r;
      const x1 = cx - Math.cos(angle) * r;
      const y1 = cy + Math.sin(angle) * r;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.innerHTML = `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" />
        <circle cx="${x2}" cy="${y2}" r="4" fill="${color}" />
        <text x="${x2 + Math.cos(angle)*14}" y="${y2 - Math.sin(angle)*14}" fill="${color}" font-family="JetBrains Mono" font-size="11" text-anchor="middle" alignment-baseline="middle">${label}</text>
      `;
      return g;
    }

    function draw() {
      const size = 360;
      const cx = size/2, cy = size/2, r = size * 0.38;
      svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
      svg.innerHTML = `
        <defs>
          <radialGradient id="chshBg">
            <stop offset="0%" stop-color="rgba(255,255,255,0.04)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </radialGradient>
        </defs>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#chshBg)" stroke="rgba(232,230,240,0.15)" />
        <line x1="${cx-r}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="rgba(232,230,240,0.1)" stroke-dasharray="2 3" />
        <line x1="${cx}" y1="${cy-r}" x2="${cx}" y2="${cy+r}" stroke="rgba(232,230,240,0.1)" stroke-dasharray="2 3" />
      `;
      const hueA = getComputedStyle(document.documentElement).getPropertyValue('--hue-a').trim() || 230;
      const hueB = getComputedStyle(document.documentElement).getPropertyValue('--hue-b').trim() || 290;
      svg.appendChild(drawArrow(cx, cy, r, a, `hsl(${hueA} 80% 75%)`, 'a'));
      svg.appendChild(drawArrow(cx, cy, r, ap, `hsl(${hueA} 60% 60%)`, "a'"));
      svg.appendChild(drawArrow(cx, cy, r, b, `hsl(${hueB} 80% 75%)`, 'b'));
      svg.appendChild(drawArrow(cx, cy, r, bp, `hsl(${hueB} 60% 60%)`, "b'"));

      const S = computeS();
      const absS = Math.abs(S);
      const disp = document.getElementById('chsh-S');
      disp.textContent = S.toFixed(3);
      disp.classList.toggle('violated', absS > 2);

      const verdict = document.getElementById('chsh-verdict');
      const pct = Math.min(1, absS / (2 * Math.sqrt(2)));
      document.getElementById('chsh-fill').style.width = (pct * 100) + '%';
      if (absS > 2) {
        verdict.classList.add('violated');
        verdict.innerHTML = `<span class="zh-line">违反经典极限 · 纠缠！</span><span class="en-line"> Bell inequality violated — entangled.</span>`;
      } else {
        verdict.classList.remove('violated');
        verdict.innerHTML = `<span class="zh-line">未违反 · 经典相关可解释</span><span class="en-line"> Within classical bound.</span>`;
      }
    }

    ['a','ap','b','bp'].forEach(k => {
      const input = document.getElementById('chsh-' + k);
      input.addEventListener('input', () => {
        const v = parseFloat(input.value) * Math.PI / 180;
        if (k==='a') a = v; if (k==='ap') ap = v; if (k==='b') b = v; if (k==='bp') bp = v;
        document.getElementById('chsh-'+k+'-val').textContent = input.value + '°';
        draw();
      });
    });

    document.getElementById('chsh-optimal').addEventListener('click', () => {
      a = 0; ap = Math.PI/4; b = Math.PI/8; bp = 3*Math.PI/8;
      setAll();
    });
    document.getElementById('chsh-classical').addEventListener('click', () => {
      a = 0; ap = Math.PI/4; b = 0; bp = Math.PI/4;
      setAll();
    });

    function setAll() {
      const map = { a: a, ap: ap, b: b, bp: bp };
      Object.entries(map).forEach(([k, v]) => {
        const deg = Math.round(v * 180 / Math.PI);
        const input = document.getElementById('chsh-' + k);
        input.value = deg;
        document.getElementById('chsh-'+k+'-val').textContent = deg + '°';
      });
      draw();
    }

    draw();
  };
})();
