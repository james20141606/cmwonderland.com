// Hero particle field with a highlighted entangled pair
(function() {
  window.__initHero = function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, DPR;
    let particles = [];
    let t0 = performance.now();
    let mouse = { x: 0.5, y: 0.5, active: false };

    function css(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function seed() {
      const count = window.TWEAKS.particleCount || 180;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.2 + 0.4,
          phase: Math.random() * Math.PI * 2,
          hue: 210 + Math.random() * 100,
        });
      }
    }

    function draw() {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // Background soft grid
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#2a2a45';
      ctx.lineWidth = 1;
      const step = 120;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();

      // Sea of particles
      for (let p of particles) {
        p.x += p.vx + Math.sin(t * 0.3 + p.phase) * 0.05;
        p.y += p.vy + Math.cos(t * 0.25 + p.phase) * 0.05;
        if (p.x < 0) p.x += W; if (p.x > W) p.x -= W;
        if (p.y < 0) p.y += H; if (p.y > H) p.y -= H;

        const flick = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.3 + p.phase));
        ctx.fillStyle = `hsla(${p.hue}, 40%, 75%, ${0.18 * flick})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Entangled pair
      const cx = W / 2, cy = H / 2;
      const sep = Math.min(W, H) * 0.28 + Math.sin(t * 0.5) * 12;
      const ax = cx - sep, ay = cy + Math.sin(t * 0.7) * 8;
      const bx = cx + sep, by = cy + Math.sin(t * 0.7 + Math.PI) * 8;

      // wave line between
      const hueA = css('--hue-a') || 230;
      const hueB = css('--hue-b') || 290;
      const hueC = css('--hue-c') || 45;
      const grad = ctx.createLinearGradient(ax, ay, bx, by);
      grad.addColorStop(0, `hsla(${hueA}, 70%, 70%, 0.8)`);
      grad.addColorStop(0.5, `hsla(${hueC}, 90%, 78%, 0.95)`);
      grad.addColorStop(1, `hsla(${hueB}, 70%, 70%, 0.8)`);

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = grad;
      ctx.beginPath();
      const N = 80;
      for (let i = 0; i <= N; i++) {
        const u = i / N;
        const x = ax + (bx - ax) * u;
        const amp = 14 * Math.sin(u * Math.PI);
        const y = ay + (by - ay) * u + amp * Math.sin(u * 10 - t * 2.2);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // ghost echo
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const u = i / N;
        const x = ax + (bx - ax) * u;
        const amp = 10 * Math.sin(u * Math.PI);
        const y = ay + (by - ay) * u - amp * Math.sin(u * 8 - t * 2.2 + 0.4);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // draw A and B halos
      drawParticle(ax, ay, hueA, 'A');
      drawParticle(bx, by, hueB, 'B');
    }

    function drawParticle(x, y, hue, label) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 60);
      g.addColorStop(0, `hsla(${hue}, 90%, 80%, 0.9)`);
      g.addColorStop(0.4, `hsla(${hue}, 80%, 65%, 0.25)`);
      g.addColorStop(1, `hsla(${hue}, 70%, 50%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, 60, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = `hsla(${hue}, 95%, 92%, 1)`;
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();

      // label
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y - 22);
    }

    function loop() { draw(); raf = requestAnimationFrame(loop); }
    let raf;

    resize(); seed(); loop();
    window.addEventListener('resize', () => { resize(); seed(); });

    window.__reseedHero = seed;
  };
})();
