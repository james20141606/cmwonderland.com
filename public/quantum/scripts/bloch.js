// Bloch sphere — interactive drag to change theta/phi
(function() {
  window.__initBloch = function() {
    const canvas = document.getElementById('blochCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, DPR, R;

    // Quantum state parameters
    let theta = Math.PI / 3;   // polar
    let phi = Math.PI / 4;     // azimuth

    // View rotation (user drags to orbit)
    let viewYaw = -0.6, viewPitch = 0.3;
    let dragging = false;
    let lastX, lastY;
    let dragMode = 'view'; // 'view' or 'state'

    function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      R = Math.min(W, H) * 0.38;
    }

    function project(x, y, z) {
      // rotate around Y (yaw) then X (pitch)
      const cy = Math.cos(viewYaw), sy = Math.sin(viewYaw);
      let x1 = cy * x + sy * z;
      let z1 = -sy * x + cy * z;
      const cp = Math.cos(viewPitch), sp = Math.sin(viewPitch);
      let y2 = cp * y - sp * z1;
      let z2 = sp * y + cp * z1;
      return { x: W / 2 + x1 * R, y: H / 2 - y2 * R, z: z2 };
    }

    function arc(u1, v1, u2, v2, steps, axis, sign) {
      // draw an arc on unit sphere from (u1,v1) to (u2,v2) in spherical coords
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        let th, ph;
        if (axis === 'equator') {
          th = Math.PI / 2; ph = u1 + (u2 - u1) * t;
        } else if (axis === 'meridian') {
          th = v1 + (v2 - v1) * t; ph = u1;
        }
        const x = Math.sin(th) * Math.cos(ph);
        const y = Math.cos(th);
        const z = Math.sin(th) * Math.sin(ph);
        const p = project(x, y, z);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const hueC = css('--hue-c') || 45;

      // sphere fill (subtle)
      const cx = W / 2, cy = H / 2;
      const grad = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, R * 0.1, cx, cy, R);
      grad.addColorStop(0, 'rgba(255,255,255,0.05)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // outline circle
      ctx.strokeStyle = 'rgba(232,230,240,0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      // equator + meridian wireframe
      ctx.strokeStyle = 'rgba(232,230,240,0.1)';
      const N = 64;
      // equator
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * Math.PI * 2;
        const p = project(Math.cos(a), 0, Math.sin(a));
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      // meridian
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * Math.PI * 2;
        const p = project(0, Math.cos(a), Math.sin(a));
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      // 2nd meridian
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * Math.PI * 2;
        const p = project(Math.sin(a), Math.cos(a), 0);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // axes
      const axes = [
        { a: [1, 0, 0], b: [-1, 0, 0], lbl: ['x', ''], c: 'rgba(232,230,240,0.5)' },
        { a: [0, 1, 0], b: [0, -1, 0], lbl: ['|0⟩', '|1⟩'], c: 'rgba(232,230,240,0.7)' },
        { a: [0, 0, 1], b: [0, 0, -1], lbl: ['y', ''], c: 'rgba(232,230,240,0.5)' },
      ];
      ctx.lineWidth = 1;
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      axes.forEach(ax => {
        const p1 = project(...ax.a);
        const p2 = project(...ax.b);
        ctx.strokeStyle = ax.c;
        ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(232,230,240,0.7)';
        if (ax.lbl[0]) ctx.fillText(ax.lbl[0], p1.x, p1.y - 6);
        if (ax.lbl[1]) ctx.fillText(ax.lbl[1], p2.x, p2.y + 14);
      });

      // state vector
      // |ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩
      // bloch coords: x = sin θ cos φ, z = sin θ sin φ, y = cos θ
      const sx = Math.sin(theta) * Math.cos(phi);
      const sy = Math.cos(theta);
      const sz = Math.sin(theta) * Math.sin(phi);
      const p0 = project(0, 0, 0);
      const ps = project(sx, sy, sz);

      // shadow on equator
      const pEq = project(sx, 0, sz);
      ctx.strokeStyle = 'rgba(247,201,120,0.25)';
      ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(pEq.x, pEq.y); ctx.lineTo(ps.x, ps.y); ctx.stroke();
      ctx.setLineDash([]);

      // phi arc on equator
      ctx.strokeStyle = `hsla(${hueC}, 80%, 70%, 0.6)`;
      arc(0, 0, phi, 0, 30, 'equator');

      // theta arc along meridian at phi
      ctx.strokeStyle = `hsla(${hueC}, 80%, 70%, 0.9)`;
      arc(phi, 0, phi, theta, 30, 'meridian');

      // vector
      const vgrad = ctx.createLinearGradient(p0.x, p0.y, ps.x, ps.y);
      vgrad.addColorStop(0, `hsla(${hueC}, 90%, 70%, 0.4)`);
      vgrad.addColorStop(1, `hsla(${hueC}, 95%, 80%, 1)`);
      ctx.strokeStyle = vgrad;
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(ps.x, ps.y); ctx.stroke();

      // tip glow
      const tg = ctx.createRadialGradient(ps.x, ps.y, 0, ps.x, ps.y, 22);
      tg.addColorStop(0, `hsla(${hueC}, 95%, 85%, 0.9)`);
      tg.addColorStop(1, `hsla(${hueC}, 95%, 75%, 0)`);
      ctx.fillStyle = tg;
      ctx.beginPath(); ctx.arc(ps.x, ps.y, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `hsla(${hueC}, 95%, 92%, 1)`;
      ctx.beginPath(); ctx.arc(ps.x, ps.y, 4, 0, Math.PI * 2); ctx.fill();

      // label θ φ near arcs
      ctx.fillStyle = 'rgba(232,230,240,0.7)';
      ctx.font = 'italic 13px "Instrument Serif", serif';
      const pArc = project(Math.sin(theta/2) * Math.cos(phi), Math.cos(theta/2), Math.sin(theta/2) * Math.sin(phi));
      ctx.fillText('θ', pArc.x + 10, pArc.y);
      const pPhi = project(Math.cos(phi/2) * 0.6, 0, Math.sin(phi/2) * 0.6);
      ctx.fillText('φ', pPhi.x + 4, pPhi.y + 12);
    }

    function update() {
      const th = theta, ph = phi;
      const c = Math.cos(th / 2), s = Math.sin(th / 2);
      const re = Math.cos(ph), im = Math.sin(ph);
      setVal('theta', (th * 180 / Math.PI).toFixed(1) + '°');
      setVal('phi', (ph * 180 / Math.PI).toFixed(1) + '°');
      setVal('alpha', c.toFixed(3));
      setVal('beta', `${(s*re).toFixed(3)}${s*im>=0?'+':''}${(s*im).toFixed(3)}i`);
      setVal('p0', (c * c * 100).toFixed(1) + '%');
      setVal('p1', (s * s * 100).toFixed(1) + '%');
      draw();
    }

    function setVal(id, v) {
      const el = document.getElementById('bloch-' + id);
      if (el) el.textContent = v;
    }

    // Drag handling
    canvas.addEventListener('pointerdown', (e) => {
      dragging = true;
      dragMode = e.shiftKey ? 'view' : 'state';
      lastX = e.clientX; lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      if (dragMode === 'state') {
        theta = Math.max(0, Math.min(Math.PI, theta - dy * 0.01));
        phi = (phi + dx * 0.01) % (Math.PI * 2);
        if (phi < 0) phi += Math.PI * 2;
      } else {
        viewYaw += dx * 0.01;
        viewPitch = Math.max(-1.2, Math.min(1.2, viewPitch + dy * 0.01));
      }
      update();
    });
    canvas.addEventListener('pointerup', () => { dragging = false; });
    canvas.addEventListener('pointercancel', () => { dragging = false; });

    // Presets
    document.querySelectorAll('[data-bloch-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.getAttribute('data-bloch-preset');
        if (k === '0') { theta = 0; phi = 0; }
        if (k === '1') { theta = Math.PI; phi = 0; }
        if (k === '+') { theta = Math.PI/2; phi = 0; }
        if (k === '-') { theta = Math.PI/2; phi = Math.PI; }
        if (k === '+i') { theta = Math.PI/2; phi = Math.PI/2; }
        if (k === '-i') { theta = Math.PI/2; phi = 3*Math.PI/2; }
        update();
      });
    });

    resize(); update();
    window.addEventListener('resize', () => { resize(); update(); });

    // slow ambient rotation
    let ambient = 0;
    function loop() {
      if (!dragging && !document.body.classList.contains('reduce-motion')) {
        viewYaw += 0.0008;
        draw();
      }
      requestAnimationFrame(loop);
    }
    loop();
  };
})();
