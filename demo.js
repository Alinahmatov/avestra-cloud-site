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

  const assetUrl = (file) => {
    try {
      return new URL(`assets/${file}`, document.baseURI).href;
    } catch (_) {
      return `assets/${file}`;
    }
  };
  const load = (file) => {
    const img = new Image();
    img.decoding = "async";
    const jpg = assetUrl(file);
    img.addEventListener("error", () => {
      if (!img.dataset.triedPng) {
        img.dataset.triedPng = "1";
        img.src = jpg.replace(/\.jpg(\?.*)?$/i, ".png");
      }
    });
    img.src = `${jpg}${jpg.includes("?") ? "&" : "?"}v=restrict1`;
    return img;
  };
  const room = load("demo-room.jpg");
  const alex = load("demo-alex.jpg");
  const enter = load("demo-enter.jpg");
  const both = load("demo-both.jpg");

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
    laptop: [0.493, 0.616, 0.108, 0.048],
    chair: [0.382, 0.498, 0.128, 0.42],
    alexBody: [0.068, 0.16, 0.30, 0.68],
    alexFace: [0.155, 0.175, 0.10, 0.175],
    alexClothes: [0.112, 0.325, 0.22, 0.30],
    p2EnterBody: [0.668, 0.152, 0.188, 0.64],
    p2EnterFace: [0.732, 0.152, 0.078, 0.138],
    p2EnterClothes: [0.688, 0.255, 0.15, 0.265],
    p2BothBody: [0.62, 0.13, 0.195, 0.66],
    p2BothFace: [0.668, 0.13, 0.075, 0.15],
    p2BothClothes: [0.632, 0.26, 0.14, 0.26],
    restrict: [0.648, 0.86, 0.708, 0.48],
  };
  const COL = {
    known: "rgb(120, 214, 86)",
    unknown: "rgb(248, 168, 46)",
    clothes: "rgb(255, 70, 210)",
    laptop: "rgb(255, 190, 90)",
    chair: "rgb(255, 196, 64)",
    hunt: "rgb(180, 224, 255)",
    restrict: "rgb(255, 90, 40)",
    restrictHot: "rgb(255, 36, 36)",
    pillBg: "rgb(24, 18, 16)",
    pillFg: "rgb(248, 246, 245)",
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
    let restrictionHot = 0;
    let tickerKey = "demo.hunt";
    const lines = [];

    if (u < 1800) {
      const p = u / 1800;
      objects = ease((u - 250) / 650);
      if (objects < 0.55) {
        hunt = [0.08 + p * 0.55, 0.18 + Math.sin(p * 6.2) * 0.12, 0.22, 0.28];
      }
      tickerKey = "demo.hunt";
      if (objects > 0.4) lines.push("demo.j3");
    } else if (u < 3400) {
      const p = ease((u - 1800) / 1200);
      frame = "alex";
      mix = p;
      occupancy = p > 0.35 ? 1 : 0;
      objects = 1;
      hunt = [
        lerp(0.42, boxes.alexBody[0], p),
        lerp(0.22, boxes.alexBody[1], p),
        lerp(0.2, boxes.alexBody[2], p),
        lerp(0.26, boxes.alexBody[3], p),
      ];
      tickerKey = "demo.lock";
      lines.push("demo.j3");
      if (occupancy) lines.push("demo.j1");
    } else if (u < 5200) {
      frame = "alex";
      mix = 1;
      occupancy = 1;
      lockAlex = ease((u - 3400) / 500);
      objects = 1;
      tickerKey = "demo.named";
      lines.push("demo.j3", "demo.j1", "demo.j2");
    } else if (u < 7200) {
      const p = ease((u - 5200) / 1400);
      frame = "enter";
      mix = p;
      occupancy = p > 0.28 ? 2 : 1;
      lockAlex = 1;
      objects = 1;
      hunt = [
        lerp(0.78, boxes.p2EnterBody[0], p),
        lerp(0.18, boxes.p2EnterBody[1], p),
        lerp(0.16, boxes.p2EnterBody[2], p),
        lerp(0.28, boxes.p2EnterBody[3], p),
      ];
      tickerKey = "demo.motion";
      lines.push("demo.j3", "demo.j1", "demo.j2");
      if (p > 0.4) lines.push("demo.j4");
    } else {
      const p = ease((u - 7200) / 700);
      frame = "both";
      mix = p;
      occupancy = 2;
      lockAlex = 1;
      lockP2 = ease((u - 7400) / 450);
      objects = 1;
      restrictionHot = ease((u - 7350) / 380);
      tickerKey = restrictionHot > 0.45 ? "demo.trespass" : "demo.two";
      lines.push("demo.j3", "demo.j1", "demo.j2", "demo.j4");
      if (restrictionHot > 0.45) lines.push("demo.j5");
    }

    return { u, frame, mix, occupancy, hunt, lockAlex, lockP2, objects, restrictionHot, tickerKey, lines };
  };

  const roundRect = (x, y, w, h, r) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  const cornerTicks = (x, y, w, h, color) => {
    const len = Math.max(10, Math.min(18, w * 0.22, h * 0.22));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "square";
    const ticks = [
      [x, y, x + len, y, x, y + len],
      [x + w, y, x + w - len, y, x + w, y + len],
      [x, y + h, x + len, y + h, x, y + h - len],
      [x + w, y + h, x + w - len, y + h, x + w, y + h - len],
    ];
    ticks.forEach(([ax, ay, bx, by, cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(ax, ay);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    });
  };

  const drawRestriction = (frame, hot) => {
    if (!frame) return;
    const [x1, y1, x2, y2] = boxes.restrict;
    const a = { x: frame.x + x1 * frame.w, y: frame.y + y1 * frame.h };
    const b = { x: frame.x + x2 * frame.w, y: frame.y + y2 * frame.h };
    const occupied = hot > 0.45;
    const color = occupied ? COL.restrictHot : COL.restrict;
    const thick = occupied ? 4.2 : 2.2;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (occupied) {
      ctx.strokeStyle = "rgba(255, 36, 36, 0.2)";
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgb(8, 10, 12)";
    ctx.lineWidth = thick + 3;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = thick;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.fillStyle = color;
    [a, b].forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, occupied ? 6 : 5, 0, Math.PI * 2);
      ctx.fill();
    });
    const label = "Restriction area 1";
    ctx.font = "600 12px Manrope, system-ui, sans-serif";
    const tw = ctx.measureText(label).width;
    const pillW = tw + 16;
    const pillH = 18;
    let px = (a.x + b.x) / 2 + 8;
    let py = (a.y + b.y) / 2 - 22;
    if (px + pillW > width - 4) px = Math.max(4, width - pillW - 4);
    if (py < 4) py = 4;
    roundRect(px, py, pillW, pillH, 6);
    ctx.fillStyle = COL.pillBg;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(px, py + 3, 3, pillH - 6);
    ctx.fillStyle = COL.pillFg;
    ctx.fillText(label, px + 8, py + 13);
    ctx.restore();
  };

  const labeledBox = (box, label, color, opts = {}) => {
    if (!box) return;
    const { x, y, w, h } = box;
    const dashed = !!opts.dashed;
    const conf = opts.confidence;
    const corners = !!opts.corners;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    if (dashed) ctx.setLineDash([10, 6]);
    roundRect(x, y, w, h, Math.min(8, w / 8, h / 8));
    ctx.stroke();
    ctx.setLineDash([]);
    if (corners) cornerTicks(x, y, w, h, color);
    const text = conf != null ? `${label}  ${Math.round(Number(conf) * 100)}%` : label;
    ctx.font = "600 12px Manrope, system-ui, sans-serif";
    const tw = ctx.measureText(text).width;
    const pillW = tw + 16;
    const pillH = 18;
    let px = x;
    let py = y - pillH - 4;
    if (py < 2) py = y + 6;
    if (px + pillW > width - 2) px = Math.max(2, width - pillW - 2);
    roundRect(px, py, pillW, pillH, 6);
    ctx.fillStyle = COL.pillBg;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(px, py + 3, 3, pillH - 6);
    ctx.fillStyle = COL.pillFg;
    ctx.fillText(text, px + 8, py + 13);
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
    drawRestriction(frame, state.restrictionHot || 0);

    if (state.hunt && state.lockAlex < 0.8 && state.lockP2 < 0.4) {
      labeledBox(fromNorm(frame, state.hunt[0], state.hunt[1], state.hunt[2], state.hunt[3]), t("demo.hunting", "hunting…"), COL.hunt, { dashed: true });
    }
    if (state.lockAlex > 0.05) {
      ctx.globalAlpha = state.lockAlex;
      labeledBox(fromNorm(frame, ...boxes.alexClothes), "dark hoodie", COL.clothes, { dashed: true });
      labeledBox(fromNorm(frame, ...boxes.alexFace), "Person 1 · Alex", COL.known, { corners: true, confidence: 0.94 });
      ctx.globalAlpha = 1;
    }
    if (state.objects > 0.05) {
      ctx.globalAlpha = state.objects;
      labeledBox(fromNorm(frame, ...boxes.laptop), "laptop", COL.laptop, { dashed: true, confidence: 0.91 });
      labeledBox(fromNorm(frame, ...boxes.chair), "chair", COL.chair, { dashed: true, confidence: 0.88 });
      ctx.globalAlpha = 1;
    }
    if (state.frame === "enter" && state.lockP2 < 0.4 && state.mix > 0.35) {
      labeledBox(fromNorm(frame, ...boxes.p2EnterFace), "Person 2", COL.unknown, { dashed: true });
    }
    if (state.lockP2 > 0.05) {
      ctx.globalAlpha = state.lockP2;
      const clothes = state.mix > 0.6 ? boxes.p2BothClothes : boxes.p2EnterClothes;
      const face = state.mix > 0.6 ? boxes.p2BothFace : boxes.p2EnterFace;
      labeledBox(fromNorm(frame, ...clothes), "olive jacket", COL.clothes, { dashed: true });
      labeledBox(fromNorm(frame, ...face), "Person 2", COL.unknown, { corners: true, confidence: 0.87 });
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
