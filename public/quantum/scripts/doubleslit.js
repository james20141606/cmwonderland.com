// Double slit — with observer toggle showing interference pattern collapse
(function() {
  window.__initDoubleSlit = function() {
    const canvas = document.getElementById('dsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, DPR;
    let observed = false;
    let emitRate = 4;
    let slitSep = 0.14; // fraction of height
    let wavelength = 24;
    let particles = [];
    let hits = new Float32Array(400); // histogram bins
    let lastEmit = 0;

    function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function slits() {
      const s = H * slitSep;
      return [H/2 - s, H/2 + s];
    }

    function emit() {
      particles.push({
        x: W * 0.08, y: H/2 + (Math.random()-0.5) * 12,
        vx: 1.6 + Math.random() * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        passedSlit: null,
        phase: Math.random() * Math.PI * 2,
        alive: true,
      });
    }

    function step() {
      const xSlit = W * 0.4;
      const xScreen = W * 0.92;
      const [y1, y2] = slits();
      const slitH = 12;

      for (const p of particles) {
        if (!p.alive) continue;
        p.x += p.vx;
        p.y += p.vy;

        // at slit plane
        if (p.passedSlit === null && p.x >= xSlit) {
          const hit1 = Math.abs(p.y - y1) < slitH;
          const hit2 = Math.abs(p.y - y2) < slitH;
          if (!hit1 && !hit2) { p.alive = false; continue; }
          if (observed) {
            // collapse: picks which slit
            p.passedSlit = hit1 && hit2 ? (Math.random() < 0.5 ? 0 : 1) : (hit1 ? 0 : 1);
            p.y = p.passedSlit === 0 ? y1 : y2;
            // small spread
            p.vy = (Math.random() - 0.5) * 0.6;
          } else {
            p.passedSlit = -1; // both
            // wave-like spread — we'll sample from interference PDF
            const y = sampleInterferencePDF(y1, y2, xScreen - xSlit);
            p.targetY = y;
          }
        }

        // at screen
        if (p.x >= xScreen) {
          p.alive = false;
          let finalY;
          if (observed) {
            finalY = p.y;
          } else {
            finalY = p.targetY;
          }
          const bin = Math.floor((finalY / H) * hits.length);
          if (bin >= 0 && bin < hits.length) hits[bin] += 1;
        }

        // drift toward targetY after slit (wave path)
        if (!observed && p.passedSlit === -1 && p.targetY !== undefined) {
          p.y += (p.targetY - p.y) * 0.04;
        }
      }
      particles = particles.filter(p => p.alive);
    }

    function sampleInterferencePDF(y1, y2, L) {
      // interference pattern intensity I(y) ∝ cos²(π d y / (λ L))
      // sample via rejection
      const d = y2 - y1;
      for (let i = 0; i < 60; i++) {
        const y = Math.random() * H;
        const theta = (y - H/2);
        const envelope = Math.exp(-(theta*theta) / (H*H*0.12));
        const arg = Math.PI * d * theta / (wavelength * L * 0.5);
        const I = Math.cos(arg) ** 2 * envelope;
        if (Math.random() < I) return y;
      }
      return H/2;
    }

    function draw() {
      const hueA = css('--hue-a') || 230;
      const hueB = css('--hue-b') || 290;
      const hueC = css('--hue-c') || 45;

      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, 0, W, H);

      const xSrc = W * 0.08;
      const xSlit = W * 0.4;
      const xScreen = W * 0.92;
      const [y1, y2] = slits();

      // guide rails
      ctx.strokeStyle = 'rgba(232,230,240,0.06)';
      ctx.beginPath(); ctx.moveTo(xSrc, 0); ctx.lineTo(xSrc, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(xScreen, 0); ctx.lineTo(xScreen, H); ctx.stroke();

      // barrier with slits
      ctx.fillStyle = 'rgba(232,230,240,0.15)';
      ctx.fillRect(xSlit - 3, 0, 6, y1 - 12);
      ctx.fillRect(xSlit - 3, y1 + 12, 6, (y2 - 12) - (y1 + 12));
      ctx.fillRect(xSlit - 3, y2 + 12, 6, H - (y2 + 12));

      // source
      const sg = ctx.createRadialGradient(xSrc, H/2, 0, xSrc, H/2, 20);
      sg.addColorStop(0, `hsla(${hueC}, 95%, 80%, 0.8)`);
      sg.addColorStop(1, `hsla(${hueC}, 95%, 70%, 0)`);
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(xSrc, H/2, 20, 0, Math.PI * 2); ctx.fill();

      // observer indicator
      if (observed) {
        ctx.fillStyle = `hsla(${hueA}, 90%, 75%, 0.8)`;
        ctx.beginPath(); ctx.arc(xSlit + 14, y1, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(xSlit + 14, y2, 3, 0, Math.PI * 2); ctx.fill();
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(232,230,240,0.5)';
        ctx.fillText('👁', xSlit + 22, y1);
        ctx.fillText('👁', xSlit + 22, y2);
      }

      // particles
      for (const p of particles) {
        if (!p.alive) continue;
        if (!observed && p.passedSlit === -1 && p.x > xSlit) {
          // draw as wave interference near slits
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = `hsla(${hueC}, 90%, 80%, 0.8)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `hsla(${hueC}, 95%, 85%, 0.9)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // wave ripples from slits if not observed
      if (!observed) {
        const t = performance.now() / 1000;
        ctx.strokeStyle = `hsla(${hueC}, 80%, 70%, 0.12)`;
        ctx.lineWidth = 1;
        for (let r = 0; r < 300; r += 24) {
          const rr = (r + (t * 50) % 24);
          ctx.beginPath(); ctx.arc(xSlit, y1, rr, -Math.PI/2.2, Math.PI/2.2); ctx.stroke();
          ctx.beginPath(); ctx.arc(xSlit, y2, rr, -Math.PI/2.2, Math.PI/2.2); ctx.stroke();
        }
      }

      // histogram
      const maxH = Math.max(1, ...hits);
      ctx.fillStyle = `hsla(${hueC}, 95%, 80%, 0.9)`;
      const barW = W * 0.06;
      const binH = H / hits.length;
      for (let i = 0; i < hits.length; i++) {
        const v = hits[i] / maxH;
        if (v <= 0) continue;
        ctx.globalAlpha = Math.min(1, 0.3 + v * 0.7);
        ctx.fillRect(xScreen + 4, i * binH, v * barW, binH + 1);
      }
      ctx.globalAlpha = 1;

      // labels
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(232,230,240,0.45)';
      ctx.textAlign = 'center';
      ctx.fillText('SOURCE', xSrc, H - 12);
      ctx.fillText('SLITS', xSlit, H - 12);
      ctx.fillText('SCREEN', xScreen, H - 12);
    }

    function loop(now) {
      step();
      if (now - lastEmit > (1000 / emitRate)) {
        for (let i = 0; i < 2; i++) emit();
        lastEmit = now;
      }
      draw();
      requestAnimationFrame(loop);
    }

    // Controls
    const obsBtn = document.getElementById('ds-observe');
    obsBtn.addEventListener('click', () => {
      observed = !observed;
      obsBtn.classList.toggle('on', observed);
      obsBtn.querySelector('.lbl').textContent = observed ? 'Observing · 观察中' : 'Not observed · 未观察';
      // reset histogram on toggle
      hits = new Float32Array(hits.length);
    });

    const rate = document.getElementById('ds-rate');
    rate.addEventListener('input', () => { emitRate = parseFloat(rate.value); });

    const sep = document.getElementById('ds-sep');
    sep.addEventListener('input', () => {
      slitSep = parseFloat(sep.value);
      hits = new Float32Array(hits.length);
    });

    document.getElementById('ds-reset').addEventListener('click', () => {
      hits = new Float32Array(hits.length);
      particles = [];
    });

    resize(); loop();
    window.addEventListener('resize', resize);
  };
})();
