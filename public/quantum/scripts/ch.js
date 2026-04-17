// Chapter content — rendered as plain HTML, then interactive modules init
(function() {
  function chapters() {
    return `
    <!-- Chapter 0: Hero -->
    <section class="chapter" id="ch-0" data-idx="0">
      <div class="hero-wrap">
        <canvas id="heroCanvas" class="hero-canvas"></canvas>
        <div class="hero-overlay"></div>
        <div class="hero-copy">
          <div>
            <div class="hero-tag"><span class="dot"></span><span>A PRELUDE · 序章</span></div>
            <h1 class="title-hero"><em>幽灵</em>般的<br>超距作用</h1>
            <div class="en-line" style="font-family: var(--f-serif); font-style: italic; color: var(--ink-faint); font-size: 14px; margin-top: 18px; opacity: 0.7;">Spooky action at a distance</div>
          </div>
          <div class="hero-blurb">
            <p class="zh-line">两颗粒子，隔着整个宇宙，<br>依然心意相通。</p>
            <p class="en-line">"Two particles, across the universe, still in conversation." — Einstein called it <em>spukhafte Fernwirkung</em>.</p>
          </div>
        </div>
        <div class="scroll-hint">
          <span>SCROLL</span>
          <div class="bar"></div>
        </div>
      </div>
    </section>

    <!-- Chapter 1: Superposition + Bloch -->
    <section class="chapter" id="ch-1" data-idx="1">
      <div class="chapter-inner">
        <div class="chapter-num"><span>01 ——</span> SUPERPOSITION · 叠加</div>
        <h2 class="title-ch">测量之前，<br>它<em>同时是</em>一切可能。</h2>
        <div class="en-line" style="font-family: var(--f-serif); font-style: italic; color: var(--ink-faint); font-size: 14px; margin-top: 12px; opacity: 0.7;">Before we measure, it is both.</div>

        <div class="two-col mt-40">
          <div class="bilingual" data-reveal>
            <p class="zh-line">一个量子比特不像开关——它不是 0 或 1。在被测量之前，它同时是 0、是 1、以及两者之间所有可能的叠加。</p>
            <p class="en-line">A qubit is not a switch. Until you measure it, it lives as a weighted sum of |0⟩ and |1⟩ — and every possibility in between.</p>
          </div>
          <div data-reveal>
            <div class="math-block">
              |ψ⟩ = α<span class="ket">|0⟩</span> + β<span class="ket">|1⟩</span><br>
              <span style="font-size: 0.7em; opacity: 0.8;">|α|² + |β|² = 1</span>
              <span class="note">α, β are complex amplitudes. |α|² is the probability of measuring 0.</span>
            </div>
          </div>
        </div>

        <div class="lab" data-reveal>
          <div class="lab-head">
            <span class="title">Bloch Sphere · 布洛赫球</span>
            <span>DRAG TO ROTATE STATE · SHIFT-DRAG TO ORBIT VIEW</span>
          </div>
          <div class="lab-body">
            <div class="bloch-lab">
              <div class="bloch-stage">
                <canvas id="blochCanvas"></canvas>
              </div>
              <div>
                <div class="bilingual" style="margin-bottom: 20px;">
                  <p class="zh-line">每一个纯态都是球面上的一个点。拖动来旋转它。</p>
                  <p class="en-line">Every pure qubit state is a point on this sphere. Drag to spin it.</p>
                </div>
                <div class="bloch-readout">
                  <div class="row"><span>θ (polar)</span><span class="val" id="bloch-theta">—</span></div>
                  <div class="row"><span>φ (azimuth)</span><span class="val" id="bloch-phi">—</span></div>
                  <div class="row"><span>α = cos(θ/2)</span><span class="val" id="bloch-alpha">—</span></div>
                  <div class="row"><span>β = e^{iφ}·sin(θ/2)</span><span class="val" id="bloch-beta">—</span></div>
                  <div class="row"><span>P(measure 0)</span><span class="val" id="bloch-p0">—</span></div>
                  <div class="row"><span>P(measure 1)</span><span class="val" id="bloch-p1">—</span></div>
                </div>
                <div class="bloch-preset">
                  <button data-bloch-preset="0">|0⟩</button>
                  <button data-bloch-preset="1">|1⟩</button>
                  <button data-bloch-preset="+">|+⟩</button>
                  <button data-bloch-preset="-">|−⟩</button>
                  <button data-bloch-preset="+i">|+i⟩</button>
                  <button data-bloch-preset="-i">|−i⟩</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 2: Bell state + measurement correlation -->
    <section class="chapter" id="ch-2" data-idx="2">
      <div class="chapter-inner">
        <div class="chapter-num"><span>02 ——</span> BELL STATE · 贝尔态</div>
        <h2 class="title-ch">两个比特，<br><em>同一个命运。</em></h2>
        <div class="en-line" style="font-family: var(--f-serif); font-style: italic; color: var(--ink-faint); font-size: 14px; margin-top: 12px; opacity: 0.7;">Two qubits, one fate.</div>

        <div class="two-col mt-40">
          <div class="bilingual" data-reveal>
            <p class="zh-line">把两个量子比特揉在一起，我们可以制备出一个无法拆开描述的状态——其中一个最简单的例子，叫做贝尔态。测量一方，就瞬间决定了另一方。</p>
            <p class="en-line">Bring two qubits together and prepare a Bell state. Now they cannot be described separately. Measure one — the other answers instantly, no matter how far apart.</p>
          </div>
          <div data-reveal>
            <div class="math-block">
              |Φ⁺⟩ = <span style="font-size:0.8em">1/√2</span> ( <span class="ket">|00⟩</span> + <span class="ket">|11⟩</span> )
              <span class="note">either both 0, or both 1 — never mixed. And 50/50 before you look.</span>
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: var(--ink-faint); max-width: none;">
              <span class="zh-line">对于角度为 a 与 b 的两个探测器：<br></span>
              <span class="en-line">For detectors at angles a and b:</span>
            </p>
            <div style="font-family: var(--f-serif); font-style: italic; font-size: 20px; color: var(--ink); margin-top: 10px;">
              P(same) = cos²((a − b)/2)
            </div>
          </div>
        </div>

        <div class="lab" data-reveal>
          <div class="lab-head">
            <span class="title">Bell Measurement · 贝尔测量</span>
            <span>MEASURE BOTH, SEE THE CORRELATION</span>
          </div>
          <div class="lab-body">
            <div class="bell-lab">
              <div class="bell-stage"><canvas id="bellCanvas"></canvas></div>
              <div class="bell-controls">
                <div class="bilingual" style="margin-bottom: 8px;">
                  <p class="zh-line" style="font-size: 15px;">调整两个探测器的角度，然后测量。观察关联如何随角度差变化。</p>
                  <p class="en-line" style="font-size: 13px;">Rotate the detectors, measure, and watch the correlation depend only on the angle difference.</p>
                </div>
                <div class="axis-row">
                  <label>Detector A</label>
                  <input type="range" id="bell-a" min="0" max="180" value="0" step="1" />
                  <span class="val" id="bell-a-val">0°</span>
                </div>
                <div class="axis-row">
                  <label>Detector B</label>
                  <input type="range" id="bell-b" min="0" max="180" value="45" step="1" />
                  <span class="val" id="bell-b-val">45°</span>
                </div>
                <div class="axis-row">
                  <label>a − b</label>
                  <span style="font-family: var(--f-mono); color: var(--ink-dim); font-size: 11px;">predicted same: <span id="bell-pred" style="color: var(--ink);">—</span></span>
                  <span class="val" id="bell-diff-val">—</span>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                  <button class="bell-measure-btn" id="bell-measure">Measure ×1</button>
                  <button class="bell-measure-btn" id="bell-measure100">×100</button>
                  <button class="bell-measure-btn secondary" id="bell-reset">Reset</button>
                </div>

                <div class="bell-stats">
                  <div class="stat"><span class="stat-val" id="bell-total">0</span><span class="stat-lbl">Trials</span></div>
                  <div class="stat"><span class="stat-val" id="bell-same">—</span><span class="stat-lbl">Same</span></div>
                  <div class="stat"><span class="stat-val" id="bell-diff">—</span><span class="stat-lbl">Diff</span></div>
                  <div class="stat"><span class="stat-val" id="bell-e">—</span><span class="stat-lbl">E(a,b)</span></div>
                </div>

                <div class="bell-log" id="bell-log"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 3: CHSH -->
    <section class="chapter" id="ch-3" data-idx="3">
      <div class="chapter-inner">
        <div class="chapter-num"><span>03 ——</span> CHSH INEQUALITY · 贝尔不等式</div>
        <h2 class="title-ch">我们怎么知道<br>它没有<em>作弊？</em></h2>
        <div class="en-line" style="font-family: var(--f-serif); font-style: italic; color: var(--ink-faint); font-size: 14px; margin-top: 12px; opacity: 0.7;">How do we know it's not cheating?</div>

        <div class="two-col mt-40">
          <div class="bilingual" data-reveal>
            <p class="zh-line">如果这一切只是"粒子出厂前就约定好了答案"，那么关联必须满足一个经典的上限：CHSH 不等式要求 |S| ≤ 2。量子力学却可以给出 2√2 ≈ 2.828。</p>
            <p class="en-line">If the particles had just agreed in advance, their correlations could never exceed |S| ≤ 2. Quantum mechanics reaches 2√2 ≈ 2.828. Experiments agree with quantum mechanics. Locality + realism cannot both survive.</p>
          </div>
          <div data-reveal>
            <div class="math-block" style="font-size: clamp(18px, 1.9vw, 24px);">
              S = E(a,b) − E(a,b′) + E(a′,b) + E(a′,b′)
              <span class="note">|S| ≤ 2 → classical world · |S| ≤ 2√2 → quantum ceiling (Tsirelson)</span>
            </div>
          </div>
        </div>

        <div class="lab" data-reveal>
          <div class="lab-head">
            <span class="title">CHSH Playground · CHSH 实验台</span>
            <span>TRY TO BEAT |S| = 2</span>
          </div>
          <div class="lab-body">
            <div class="chsh-lab">
              <div class="chsh-stage"><svg id="chshSvg"></svg></div>
              <div class="chsh-display">
                <div class="eyebrow">S VALUE</div>
                <div class="chsh-number" id="chsh-S">—</div>
                <div class="chsh-bar">
                  <div class="fill" id="chsh-fill"></div>
                  <div class="mark" style="left: 70.7%;" data-label="|S|=2"></div>
                  <div class="mark" style="left: 100%;" data-label="2√2"></div>
                </div>
                <div class="chsh-verdict" id="chsh-verdict">—</div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
                  <div class="axis-row" style="grid-template-columns: 40px 1fr 44px;">
                    <label>a</label><input type="range" id="chsh-a" min="-180" max="180" value="0" step="1" /><span class="val" id="chsh-a-val">0°</span>
                  </div>
                  <div class="axis-row" style="grid-template-columns: 40px 1fr 44px;">
                    <label>a'</label><input type="range" id="chsh-ap" min="-180" max="180" value="45" step="1" /><span class="val" id="chsh-ap-val">45°</span>
                  </div>
                  <div class="axis-row" style="grid-template-columns: 40px 1fr 44px;">
                    <label>b</label><input type="range" id="chsh-b" min="-180" max="180" value="22" step="1" /><span class="val" id="chsh-b-val">22°</span>
                  </div>
                  <div class="axis-row" style="grid-template-columns: 40px 1fr 44px;">
                    <label>b'</label><input type="range" id="chsh-bp" min="-180" max="180" value="67" step="1" /><span class="val" id="chsh-bp-val">67°</span>
                  </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 12px;">
                  <button class="bell-measure-btn" id="chsh-optimal">Tsirelson optimal</button>
                  <button class="bell-measure-btn secondary" id="chsh-classical">Classical aligned</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-3 mt-60" data-reveal>
          <div class="tile">
            <span class="eyebrow">1964</span>
            <h4>Bell's theorem</h4>
            <p class="zh-only">John Bell 证明：任何经典局域隐变量理论，关联都不能超过 |S|=2。</p>
            <p class="en-only">John Bell: no local hidden-variable theory can exceed |S| = 2.</p>
          </div>
          <div class="tile">
            <span class="eyebrow">1982</span>
            <h4>Aspect experiment</h4>
            <p class="zh-only">Alain Aspect 用纠缠光子实验，强烈违反 CHSH 不等式。</p>
            <p class="en-only">Alain Aspect violates Bell's inequality with entangled photons.</p>
          </div>
          <div class="tile">
            <span class="eyebrow">2022</span>
            <h4>Nobel Prize</h4>
            <p class="zh-only">Clauser、Aspect、Zeilinger 因此分享诺贝尔物理学奖。</p>
            <p class="en-only">Clauser, Aspect, Zeilinger share the Nobel Prize in Physics.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 4: Double Slit -->
    <section class="chapter" id="ch-4" data-idx="4">
      <div class="chapter-inner">
        <div class="chapter-num"><span>04 ——</span> DOUBLE SLIT · 双缝干涉</div>
        <h2 class="title-ch">你一<em>看</em>，<br>波就消失了。</h2>
        <div class="en-line" style="font-family: var(--f-serif); font-style: italic; color: var(--ink-faint); font-size: 14px; margin-top: 12px; opacity: 0.7;">The moment you look, the wave disappears.</div>

        <div class="two-col mt-40">
          <div class="bilingual" data-reveal>
            <p class="zh-line">单个粒子一次次穿过双缝，像波一样与自己干涉，在屏幕上叠出条纹。一旦我们在缝口偷看，它知道被看了——波性消失，条纹崩塌成两堆。</p>
            <p class="en-line">Fire one particle at a time. Somehow it interferes with itself, building a striped pattern. Peek at which slit it took — the stripes vanish. Observation is not passive.</p>
          </div>
          <div data-reveal>
            <div class="math-block" style="font-size: clamp(16px, 1.6vw, 20px);">
              I(y) ∝ |ψ₁ + ψ₂|²
              <span class="note">when paths are indistinguishable — amplitudes add, then we square.</span>
            </div>
            <div class="math-block" style="font-size: clamp(16px, 1.6vw, 20px);">
              I(y) ∝ |ψ₁|² + |ψ₂|²
              <span class="note">when we know the path — probabilities add. No interference.</span>
            </div>
          </div>
        </div>

        <div class="lab ds-lab" data-reveal>
          <div class="lab-head">
            <span class="title">Double Slit · 双缝实验</span>
            <span>TOGGLE THE OBSERVER AND WATCH THE PATTERN</span>
          </div>
          <div class="lab-body">
            <div class="ds-stage"><canvas id="dsCanvas"></canvas></div>
            <div class="ds-controls">
              <button class="ds-toggle" id="ds-observe"><span class="lbl">Not observed · 未观察</span></button>
              <div class="group">
                <span>Rate</span>
                <input type="range" id="ds-rate" min="1" max="20" value="4" step="1" />
              </div>
              <div class="group">
                <span>Slit sep</span>
                <input type="range" id="ds-sep" min="0.06" max="0.24" value="0.14" step="0.01" />
              </div>
              <button class="bell-measure-btn secondary" id="ds-reset">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 5: Coda -->
    <section class="chapter" id="ch-5" data-idx="5">
      <div class="coda">
        <div class="eyebrow" data-reveal>05 —— CODA · 尾声</div>
        <div class="divider"></div>
        <div class="big" data-reveal>宇宙以我们<br>才刚刚开始<em>听见</em>的方式，<br>被缝合在一起。</div>
        <div class="en-line" style="font-family: var(--f-serif); font-style: italic; color: var(--ink-faint); font-size: 13px; margin: 10px auto 28px; opacity: 0.6;">The universe is stitched together in ways we are only beginning to hear.</div>
        <p class="en-quote" data-reveal>
          <span class="zh-only">纠缠不传递信号，却重塑了"定域"与"实在"的边界。它是量子计算、量子通信、量子密钥分发的根基——也是宇宙给我们最大的一个问号。</span>
          <span class="en-only">Entanglement sends no signal, yet it redraws the boundary between locality and reality. It is the foundation of quantum computing, quantum key distribution, and the quantum internet — and the universe's largest standing question.</span>
        </p>
        <div class="attr" data-reveal>
          Made with curiosity · 用好奇心制作 &nbsp;·&nbsp; Press <kbd style="font-family: var(--f-mono); border: 1px solid var(--line-2); padding: 2px 6px; border-radius: 3px;">T</kbd> for tweaks
        </div>
      </div>
    </section>
    `;
  }

  function init() {
    const main = document.getElementById('main');
    main.innerHTML = chapters();
    window.__initHero();
    window.__initBloch();
    window.__initBell();
    window.__initCHSH();
    window.__initDoubleSlit();
    window.__attachReveal();
    window.__attachChapterObs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
