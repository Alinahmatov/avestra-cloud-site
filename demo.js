(() => {
  const root = document.querySelector("[data-demo]");
  if (!root) return;

  const canvas = root.querySelector("[data-demo-canvas]");
  const ctx = canvas.getContext("2d", { alpha: false });
  const playBtn = root.querySelector("[data-demo-play]");
  const scrub = root.querySelector("[data-demo-scrub]");
  const scrubFill = root.querySelector("[data-demo-scrub] span");
  const timeEl = root.querySelector("[data-demo-time]");
  const ticker = root.querySelector("[data-demo-ticker]");
  const journal = root.querySelector("[data-demo-journal]");
  const occEl = root.querySelector("[data-demo-occ]");
  const recEl = root.querySelector("[data-demo-rec]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LOOP = 12000;
  const STATIC_AT = 8800;

  let playing = !reduce;
  let elapsed = reduce ? STATIC_AT : 0;
  let last = 0;
  let width = 0;
  let height = 0;
  let raf = 0;
  let lastJournal = "";
  let lastTicker = "";
  let lastOcc = -1;

  const load = (src) => {
    const img = new Image();
    img.decoding = "async";
    img.addEventListener("error", () => {
      if (src.endsWith(".jpg") && !img.dataset.triedPng) {
        img.dataset.triedPng = "1";
        img.src = src.replace(/\.jpg$/i, ".png");
      }
    });
    img.src = src;
    return img;
  };
  const room = load("assets/demo-room.jpg");
  const alex = load("assets/demo-alex.jpg");
  const enter = load("assets/demo-enter.jpg");
  const both = load("assets/demo-both.jpg");

  const t = (key, fallback) => {
    const i18n = window.AvistraI18n;
    const value = i18n && i18n.t ? i18n.t(key) : "";
    return value && value !== key ? value : fallback;
  };

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const lerp = (a, b, u) => a + (b - a) * u;
  const ease = (u) => 1 - Math.pow(1 - clamp(u, 0, 1), 3);

  const cover = (img, w, h, sway) => {
    if (!img || !img.complete || !img.naturalWidth) return null;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const rw = img.naturalWidth * scale;
    const rh = img.naturalHeight * scale;
    const x = (w - rw) / 2 + sway;
    const y = (h - rh) / 2;
    ctx.drawImage(img, x, y, rw, rh);
    return { x, y, w: rw, h: rh };
  };

  const fromNorm = (frame, nx, ny, nw, nh) => {
    if (!frame) return null;
    return {
      x: frame.x + nx * frame.w,
      y: frame.y + ny * frame.h,
      w: nw * frame.w,
      h: nh * frame.h,
    };
  };

  const boxes = {
    laptop: [0.478, 0.552, 0.082, 0.04],
    chair: [0.338, 0.5, 0.128, 0.43],
    alexBody: [0.072, 0.175, 0.275, 0.69],
    alexFace: [0.148, 0.15, 0.095, 0.175],
    p2EnterBody: [0.618, 0.175, 0.155, 0.63],
    p2EnterFace: [0.652, 0.15, 0.072, 0.135],
    p2BothBody: [0.548, 0.15, 0.215, 0.73],
    p2BothFace: [0.585, 0.125, 0.088, 0.155],
  };

  const stateAt = (ms) => {
    const u = ((ms % LOOP) + LOOP) % LOOP;
    let frame = "room";
    let mix = 0;
    let occupancy = 0;
    let hunt = null;
    let lockAlex = 0;
    let lockP2 = 0;
    let objects = 0;
    let tickerKey = "demo.hunt";
    const lines = [];

    if (u < 1600) {
      const p = u / 1600;
      hunt = [0.08 + p * 0.55, 0.18 + Math.sin(p * 6.2) * 0.12, 0.22, 0.28];
      tickerKey = "demo.hunt";
    } else if (u < 2800) {
      const p = ease((u - 1600) / 1200);
      frame = "alex";
      mix = p;
      occupancy = p > 0.35 ? 1 : 0;
      hunt = [
        lerp(0.42, boxes.alexBody[0], p),
        lerp(0.22, boxes.alexBody[1], p),
        lerp(0.2, boxes.alexBody[2], p),
        lerp(0.26, boxes.alexBody[3], p),
      ];
      tickerKey = "demo.lock";
      if (occupancy) lines.push("demo.j1");
    } else if (u < 5200) {
      frame = "alex";
      mix = 1;
      occupancy = 1;
      lockAlex = ease((u - 2800) / 500);
      objects = ease((u - 3400) / 700);
      tickerKey = "demo.named";
      lines.push("demo.j1", "demo.j2");
      if (objects > 0.4) lines.push("demo.j3");
    } else if (u < 7200) {
      const p = ease((u - 5200) / 1400);
      frame = "enter";
      mix = p;
      occupancy = 1;
      lockAlex = 1;
      objects = 1;
      hunt = [
        lerp(0.72, boxes.p2EnterBody[0], p),
        lerp(0.2, boxes.p2EnterBody[1], p),
        lerp(0.16, boxes.p2EnterBody[2], p),
        lerp(0.28, boxes.p2EnterBody[3], p),
      ];
      tickerKey = "demo.motion";
      lines.push("demo.j1", "demo.j2", "demo.j3");
    } else {
      const p = ease((u - 7200) / 700);
      frame = "both";
      mix = p;
      occupancy = 2;
      lockAlex = 1;
      lockP2 = ease((u - 7600) / 500);
      objects = 1;
      tickerKey = "demo.two";
      lines.push("demo.j1", "demo.j2", "demo.j3", "demo.j4");
    }

    return { u, frame, mix, occupancy, hunt, lockAlex, lockP2, objects, tickerKey, lines };
  };

  const dashBox = (box, label, color, conf, pulse) => {
    if (!box) return;
    const { x, y, w, h } = box;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);
    const text = conf != null ? `${label}  ${conf}` : label;
    ctx.font = "600 11px Manrope, system-ui, sans-serif";
    const pad = 5;
    const tw = ctx.measureText(text).width;
    const bx = x;
    const by = Math.max(2, y - 18);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.92;
    ctx.fillRect(bx, by, tw + pad * 2, 16);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#081018";
    ctx.fillText(text, bx + pad, by + 12);
    if (pulse) {
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.28;
      ctx.strokeRect(x - 4, y - 4, w + 8, h + 8);
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  };

  const fmt = (ms) => {
    const s = Math.floor(ms / 1000);
    return `0:${String(s).padStart(2, "0")} / 0:12`;
  };

  const drawScan = (w, h, tms) => {
    const y = ((tms / 18) % (h + 40)) - 20;
    const g = ctx.createLinearGradient(0, y - 18, 0, y + 18);
    g.addColorStop(0, "rgba(90, 170, 255, 0)");
    g.addColorStop(0.5, "rgba(90, 170, 255, 0.12)");
    g.addColorStop(1, "rgba(90, 170, 255, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 18, w, 36);
  };

  const paint = (tms) => {
    const w = width;
    const h = height;
    if (w < 8 || h < 8) return;
    const state = stateAt(tms);
    const sway = reduce ? 0 : Math.sin(tms / 1800) * 2.2;

    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, w, h);

    let frame = cover(room, w, h, sway);
    const mix = state.mix;
    if (state.frame === "alex") {
      if (alex.complete && mix > 0.01) {
        ctx.globalAlpha = mix;
        frame = cover(alex, w, h, sway) || frame;
        ctx.globalAlpha = 1;
      }
    } else if (state.frame === "enter") {
      if (alex.complete) frame = cover(alex, w, h, sway) || frame;
      if (enter.complete && mix > 0.01) {
        ctx.globalAlpha = mix;
        frame = cover(enter, w, h, sway) || frame;
        ctx.globalAlpha = 1;
      }
    } else if (state.frame === "both") {
      if (enter.complete) frame = cover(enter, w, h, sway) || frame;
      else if (alex.complete) frame = cover(alex, w, h, sway) || frame;
      if (both.complete && mix > 0.01) {
        ctx.globalAlpha = mix;
        frame = cover(both, w, h, sway) || frame;
        ctx.globalAlpha = 1;
      }
    }

    drawScan(w, h, tms);

    if (state.hunt && state.lockAlex < 0.8) {
      const hb = fromNorm(frame, state.hunt[0], state.hunt[1], state.hunt[2], state.hunt[3]);
      dashBox(hb, t("demo.hunting", "hunting…"), "#8ec8ff", null, true);
    }
    if (state.lockAlex > 0.05) {
      ctx.globalAlpha = state.lockAlex;
      dashBox(
        fromNorm(frame, ...boxes.alexBody),
        "Person 1 · Alex",
        "#3ee0b4",
        "0.94",
        state.lockAlex < 1
      );
      dashBox(fromNorm(frame, ...boxes.alexFace), t("demo.face", "face"), "#3ee0b4", "0.96");
      ctx.globalAlpha = 1;
    }
    if (state.objects > 0.05) {
      ctx.globalAlpha = state.objects;
      dashBox(fromNorm(frame, ...boxes.laptop), "laptop", "#c9d4e8", "0.91");
      dashBox(fromNorm(frame, ...boxes.chair), "chair", "#c9d4e8", "0.88");
      ctx.globalAlpha = 1;
    }
    if (state.frame === "enter" && state.lockP2 < 0.4 && state.mix > 0.35) {
      dashBox(fromNorm(frame, ...boxes.p2EnterBody), "Person 2", "#f0c14b", null, true);
    }
    if (state.lockP2 > 0.05) {
      ctx.globalAlpha = state.lockP2;
      const body = state.mix > 0.6 ? boxes.p2BothBody : boxes.p2EnterBody;
      const face = state.mix > 0.6 ? boxes.p2BothFace : boxes.p2EnterFace;
      dashBox(fromNorm(frame, ...body), "Person 2", "#f0c14b", "0.87", state.lockP2 < 1);
      dashBox(fromNorm(frame, ...face), t("demo.face", "face"), "#f0c14b", "0.90");
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = "rgba(8, 12, 18, 0.45)";
    ctx.fillRect(8, 8, 168, 34);
    ctx.fillStyle = "#d7e4f5";
    ctx.font = "600 11px Manrope, system-ui, sans-serif";
    ctx.fillText("CAM 0  ·  this PC", 16, 22);
    ctx.fillStyle = "#8aa0bc";
    ctx.font = "500 10px Manrope, system-ui, sans-serif";
    ctx.fillText("illustrated feed · local", 16, 36);

    if (occEl && state.occupancy !== lastOcc) {
      occEl.textContent = String(state.occupancy);
      lastOcc = state.occupancy;
    }
    const tickerText = t(state.tickerKey, state.tickerKey);
    if (ticker && tickerText !== lastTicker) {
      ticker.textContent = tickerText;
      lastTicker = tickerText;
    }
    const journalKey = state.lines.join("|");
    if (journal && journalKey !== lastJournal) {
      journal.innerHTML = state.lines
        .map((key) => `<li>${t(key, key)}</li>`)
        .join("");
      lastJournal = journalKey;
    }
    if (timeEl) timeEl.textContent = fmt(state.u);
    if (scrubFill) scrubFill.style.width = `${(state.u / LOOP) * 100}%`;
    if (recEl) recEl.dataset.on = playing ? "1" : "0";
  };

  const setPlaying = (next) => {
    playing = next;
    if (playBtn) {
      playBtn.dataset.playing = playing ? "1" : "0";
      playBtn.setAttribute("aria-label", t(playing ? "demo.pause" : "demo.play", playing ? "Pause demo" : "Play demo"));
    }
    if (playing) {
      last = 0;
      loop(performance.now());
    }
  };

  const loop = (now) => {
    if (!playing) {
      paint(elapsed);
      return;
    }
    if (!last) last = now;
    elapsed = (elapsed + (now - last)) % LOOP;
    last = now;
    paint(elapsed);
    raf = requestAnimationFrame(loop);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(8, Math.round(rect.width));
    const h = Math.max(8, Math.round(rect.height || w * 0.625));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    width = w;
    height = h;
    paint(elapsed);
  };

  if (playBtn) {
    playBtn.addEventListener("click", () => setPlaying(!playing));
  }
  if (scrub) {
    const seek = (event) => {
      const rect = scrub.getBoundingClientRect();
      const p = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      elapsed = p * LOOP;
      last = 0;
      paint(elapsed);
    };
    scrub.addEventListener("click", seek);
    scrub.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      seek(event);
      const move = (ev) => seek(ev);
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  }

  window.addEventListener("avestra-lang", () => {
    lastJournal = "";
    lastTicker = "";
    if (playBtn) {
      playBtn.setAttribute("aria-label", t(playing ? "demo.pause" : "demo.play", playing ? "Pause demo" : "Play demo"));
    }
    paint(elapsed);
  });

  [room, alex, enter, both].forEach((img) => {
    img.addEventListener("load", () => paint(elapsed));
  });

  resize();
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }
  setPlaying(playing);
})();
