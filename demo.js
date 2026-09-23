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
  const endEl = root.querySelector("[data-demo-end]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // One loop of the illustrated clip. Everything below is keyed off this timeline.
  const LOOP = 16000;
  const FPS = 15; // CCTV-style frame rate: the image and overlays step, they do not glide.
  const STEP = 1000 / FPS;
  const STATIC_AT = 7000; // frame shown when the viewer prefers reduced motion

  const T = {
    fadeIn: [0, 300],
    couch: 450,
    chair: 650,
    laptop: 900,
    alexBody: 1500,
    alexFaceScan: [2300, 3000],
    enter: [4600, 4870], // Person 2 appears in the doorway side of the room
    p2Body: 4870,
    p2Face: [5350, 5800],
    walk: [6000, 6420], // steps toward the table, over Restriction area 1
    hot: 6330,
    capture: 6500,
    emailed: 7300,
    leave: [8800, 9120],
    end: [10500, 15500], // end card: what the app is and how to get it
    fadeOut: [15600, 16000],
  };

  let playing = !reduce;
  let elapsed = reduce ? STATIC_AT : 0;
  let last = 0;
  let width = 0;
  let height = 0;
  let lastFrameIdx = -1;
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
    img.src = `${assetUrl(file)}?v=cam2`;
    return img;
  };
  // Three frames from the same fixed camera. They are pixel-identical except where
  // Person 2 is, so switching between them never makes Alex or the room flicker.
  const frames = {
    empty: load("demo-cam-empty.jpg"),
    enter: load("demo-cam-enter.jpg"),
    cross: load("demo-cam-cross.jpg"),
  };

  const t = (key, fallback) => {
    const i18n = window.AvistraI18n;
    const value = i18n && i18n.t ? i18n.t(key) : "";
    return value && value !== key ? value : fallback;
  };

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const lerp = (a, b, u) => a + (b - a) * u;
  const ease = (u) => {
    const x = clamp(u, 0, 1);
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };
  const span = (ms, [a, b]) => clamp((ms - a) / (b - a), 0, 1);
  const lerpBox = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));
  // Deterministic per-frame noise so a paused or scrubbed frame looks the same every time.
  const hash = (n) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };

  // Normalised to the 1280×720 camera frame: [x, y, w, h].
  const B = {
    couch: [0.012, 0.375, 0.41, 0.43],
    chair: [0.364, 0.565, 0.162, 0.39],
    laptop: [0.49, 0.61, 0.1, 0.07],
    alexBody: [0.166, 0.252, 0.212, 0.553],
    alexFace: [0.197, 0.268, 0.052, 0.09],
    alexClothes: [0.172, 0.35, 0.142, 0.205],
    p2EnterBody: [0.71, 0.12, 0.138, 0.64],
    p2EnterFace: [0.766, 0.145, 0.042, 0.082],
    p2EnterClothes: [0.712, 0.232, 0.134, 0.235],
    p2CrossBody: [0.646, 0.11, 0.157, 0.728],
    p2CrossFace: [0.684, 0.132, 0.05, 0.092],
    p2CrossClothes: [0.657, 0.232, 0.117, 0.3],
  };
  // Restriction line painted on the floor, parallel to the back wall: she is behind it
  // in the first pose and stepping over it in the second.
  const RESTRICT = [
    [0.676, 0.766],
    [1.0, 0.882],
  ];
  const COL = {
    known: "rgb(120, 214, 86)",
    unknown: "rgb(248, 168, 46)",
    track: "rgba(170, 214, 255, 0.55)",
    clothes: "rgb(255, 70, 210)",
    object: "rgb(255, 196, 64)",
    hunt: "rgb(180, 224, 255)",
    restrict: "rgb(255, 120, 40)",
    restrictHot: "rgb(255, 44, 44)",
    pillBg: "rgba(14, 12, 12, 0.86)",
    pillFg: "rgb(248, 246, 245)",
  };

  // ---- timeline -------------------------------------------------------------

  const EVENTS = [
    { at: T.laptop, key: "demo.j3", fb: "laptop in view" },
    { at: T.alexBody + 200, key: "demo.j1", fb: "Person 1 entered · dark hoodie" },
    { at: T.alexFaceScan[1], key: "demo.j2", fb: "Person 1 · Alex present · named" },
    { at: T.p2Body + 400, key: "demo.j4", fb: "Person 2 entered · olive jacket" },
    { at: T.capture, key: "demo.j5", fb: "crossed Restriction area 1", alert: true },
    { at: T.emailed, key: "demo.j6", fb: "Alert emailed · still + clip" },
    { at: T.leave[1] + 200, key: "demo.j7", fb: "Person 2 left" },
  ];

  const stateAt = (ms) => {
    const u = ((ms % LOOP) + LOOP) % LOOP;
    const s = {
      u,
      base: "empty",
      over: null,
      overMix: 0,
      dark: 0,
      couch: clamp((u - T.couch) / 250, 0, 1),
      chair: clamp((u - T.chair) / 250, 0, 1),
      laptop: clamp((u - T.laptop) / 250, 0, 1),
      hunt: null,
      alexBody: u >= T.alexBody ? 1 : 0,
      alexScan: span(u, T.alexFaceScan),
      alexNamed: u >= T.alexFaceScan[1],
      p2: 0,
      p2Walk: 0,
      p2Face: 0,
      hot: 0,
      flash: 0,
      evidence: 0,
      occupancy: 0,
      tickerKey: "demo.hunt",
      tickerFb: "hunting…",
    };

    s.dark = Math.max(1 - span(u, T.fadeIn), span(u, T.fadeOut));
    s.end = u >= T.end[0] && u < T.end[1] + 400;
    s.endDim = u >= T.end[0] ? Math.min(1, (u - T.end[0]) / 500) : 0;

    // Which camera frame is on screen (with a short stepped dissolve while someone moves).
    if (u < T.enter[0]) {
      s.base = "empty";
    } else if (u < T.walk[0]) {
      s.base = "empty";
      s.over = "enter";
      s.overMix = span(u, T.enter);
    } else if (u < T.leave[0]) {
      s.base = "enter";
      s.over = "cross";
      s.overMix = span(u, T.walk);
    } else {
      s.base = "cross";
      s.over = "empty";
      s.overMix = span(u, T.leave);
    }

    const present = u >= T.p2Body && u < T.leave[0] + 120;
    s.p2 = present ? 1 : 0;
    s.p2Walk = ease(span(u, T.walk));
    s.p2Face = present ? span(u, T.p2Face) : 0;

    if (u >= T.hot && u < T.leave[0] + 60) s.hot = 1;
    const sinceCap = u - T.capture;
    if (sinceCap >= 0 && sinceCap < 180) s.flash = 1 - sinceCap / 180;
    if (sinceCap >= 0 && sinceCap < 2400) s.evidence = 1;

    if (u < T.alexBody) {
      const p = u / T.alexBody;
      s.hunt = [0.06 + p * 0.5, 0.2 + Math.sin(p * 5.4) * 0.1, 0.2, 0.3];
    }

    s.occupancy = 0;
    if (u >= T.alexBody) s.occupancy = 1;
    if (present) s.occupancy = 2;

    if (u < T.alexBody) {
      s.tickerKey = "demo.hunt";
      s.tickerFb = "hunting…";
    } else if (!s.alexNamed) {
      s.tickerKey = "demo.lock";
      s.tickerFb = "lock Person 1";
    } else if (u < T.p2Body) {
      s.tickerKey = "demo.named";
      s.tickerFb = "Person 1 · Alex";
    } else if (!s.hot) {
      s.tickerKey = u < T.leave[0] ? "demo.motion" : "demo.named";
      s.tickerFb = u < T.leave[0] ? "motion · Person 2" : "Person 1 · Alex";
    } else {
      s.tickerKey = "demo.trespass";
      s.tickerFb = "Restriction area 1 · occupied";
    }
    s.events = EVENTS.filter((e) => u >= e.at);
    return s;
  };

  // ---- drawing helpers ------------------------------------------------------

  const noiseTiles = [];
  const makeNoise = () => {
    for (let k = 0; k < 4; k += 1) {
      const c = document.createElement("canvas");
      c.width = 160;
      c.height = 160;
      const g = c.getContext("2d");
      const d = g.createImageData(160, 160);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = 128 + (Math.random() - 0.5) * 120;
        d.data[i] = v;
        d.data[i + 1] = v;
        d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      g.putImageData(d, 0, 0);
      noiseTiles.push(c);
    }
  };
  makeNoise();

  const cover = (img, w, h) => {
    if (!img || !img.complete || !img.naturalWidth) return null;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const rw = img.naturalWidth * scale;
    const rh = img.naturalHeight * scale;
    const x = (w - rw) / 2;
    const y = (h - rh) / 2;
    ctx.drawImage(img, x, y, rw, rh);
    return { x, y, w: rw, h: rh };
  };

  const toPx = (frame, b, jitter = 0, seed = 0) => {
    if (!frame) return null;
    const j = (n) => (hash(seed * 13.7 + n) - 0.5) * 2 * jitter;
    return {
      x: frame.x + (b[0] + j(1)) * frame.w,
      y: frame.y + (b[1] + j(2)) * frame.h,
      w: (b[2] + j(3)) * frame.w,
      h: (b[3] + j(4)) * frame.h,
    };
  };

  const roundRect = (x, y, w, h, r) => {
    const rr = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  const fontPx = () => clamp(Math.round(width / 70), 10, 13);

  const pill = (text, x, y, color, opts = {}) => {
    const fs = opts.size || fontPx();
    ctx.font = `600 ${fs}px Manrope, system-ui, sans-serif`;
    const tw = ctx.measureText(text).width;
    const pw = tw + fs + 4;
    const ph = fs + 7;
    let px = x;
    let py = opts.below ? y + 4 : y - ph - 4;
    if (py < 2) py = y + 4;
    if (py + ph > height - 2) py = height - ph - 2;
    if (px + pw > width - 2) px = Math.max(2, width - pw - 2);
    if (px < 2) px = 2;
    roundRect(px, py, pw, ph, 5);
    ctx.fillStyle = opts.bg || COL.pillBg;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 3, 3, ph - 6);
    ctx.fillStyle = opts.fg || COL.pillFg;
    ctx.fillText(text, px + fs * 0.55 + 4, py + ph - (ph - fs) / 2 - 2);
    return { x: px, y: py, w: pw, h: ph };
  };

  const cornerTicks = (b, color, lw = 2.2) => {
    const { x, y, w, h } = b;
    const len = Math.max(6, Math.min(16, w * 0.28, h * 0.28));
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = "square";
    [
      [x, y + len, x, y, x + len, y],
      [x + w - len, y, x + w, y, x + w, y + len],
      [x, y + h - len, x, y + h, x + len, y + h],
      [x + w - len, y + h, x + w, y + h, x + w, y + h - len],
    ].forEach(([ax, ay, bx, by, cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    });
  };

  const boxOutline = (b, color, { dashed = false, lw = 1.6, alpha = 1 } = {}) => {
    if (!b) return;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    if (dashed) ctx.setLineDash([7, 5]);
    roundRect(b.x, b.y, b.w, b.h, 4);
    ctx.stroke();
    ctx.restore();
  };

  const conf = (base, seed) => Math.round((base + (hash(seed) - 0.5) * 0.02) * 100);

  const drawRestriction = (frame, hot, fi) => {
    if (!frame) return;
    const a = { x: frame.x + RESTRICT[0][0] * frame.w, y: frame.y + RESTRICT[0][1] * frame.h };
    const b = { x: frame.x + RESTRICT[1][0] * frame.w, y: frame.y + RESTRICT[1][1] * frame.h };
    const color = hot ? COL.restrictHot : COL.restrict;
    ctx.save();
    ctx.lineCap = "round";
    if (hot) {
      const pulse = 0.18 + 0.12 * (fi % 8 < 4 ? 1 : 0);
      ctx.strokeStyle = `rgba(255, 40, 40, ${pulse})`;
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(6, 8, 10, 0.8)";
    ctx.lineWidth = (hot ? 4 : 2.4) + 2.5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = hot ? 4 : 2.4;
    if (!hot) ctx.setLineDash([12, 7]);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(a.x, a.y, hot ? 5 : 4, 0, Math.PI * 2);
    ctx.fill();
    // Label sits under the far end of the line, away from people.
    const lx = lerp(a.x, b.x, 0.62);
    const ly = lerp(a.y, b.y, 0.62);
    pill("Restriction area 1", lx, ly + 6, color, { below: true });
    ctx.restore();
  };

  const drawOsd = (u) => {
    const fs = fontPx();
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const secs = 14 * 60 + 2 + Math.floor(u / 1000);
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const time = `21:${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`;
    ctx.save();
    ctx.font = `600 ${fs}px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    const shadow = (text, x, y, color) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillText(text, x + 1, y + 1);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    };
    shadow("CAM 0 · LIVING ROOM", 12, 10, "#e9eef6");
    const stamp = `${date}  ${time}`;
    const sw = ctx.measureText(stamp).width;
    shadow(stamp, width - sw - 12, 10, "#e9eef6");
    ctx.font = `500 ${Math.max(9, fs - 2)}px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;
    shadow("1280×720  15fps  local · demo", 12, 10 + fs + 5, "rgba(200, 212, 228, 0.7)");
    ctx.restore();
  };

  const drawAlert = (s, fi) => {
    if (!s.hot) return;
    const fs = fontPx() + 1;
    const text = `${t("demo.alert", "ALERT")} · Restriction area 1 · Person 2`;
    ctx.save();
    ctx.font = `700 ${fs}px Manrope, system-ui, sans-serif`;
    const tw = ctx.measureText(text).width;
    const pw = tw + 34;
    const ph = fs + 12;
    const x = (width - pw) / 2;
    const y = height - ph - 14;
    roundRect(x, y, pw, ph, ph / 2);
    ctx.fillStyle = "rgba(170, 18, 18, 0.88)";
    ctx.fill();
    const blink = s.u - T.hot < 1600 ? fi % 6 < 3 : true;
    ctx.fillStyle = blink ? "#fff" : "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.arc(x + 14, y + ph / 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + 24, y + ph / 2 + 1);
    ctx.restore();
  };

  const drawEvidence = (s) => {
    if (!s.evidence) return;
    const fs = fontPx();
    const text = t("demo.evidence", "Evidence saved · still + clip");
    ctx.save();
    ctx.font = `600 ${fs}px Manrope, system-ui, sans-serif`;
    const tw = ctx.measureText(text).width;
    const pw = tw + 30;
    const ph = fs + 12;
    const x = 12;
    const y = fs * 2 + 26;
    roundRect(x, y, pw, ph, 6);
    ctx.fillStyle = "rgba(10, 14, 20, 0.82)";
    ctx.fill();
    ctx.strokeStyle = "rgba(62, 224, 180, 0.7)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#3ee0b4";
    ctx.fillRect(x + 10, y + ph / 2 - 3, 6, 6);
    ctx.fillStyle = "#e8eefc";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + 22, y + ph / 2 + 1);
    ctx.restore();
  };

  const fmt = (ms) => {
    const s = Math.floor(ms / 1000);
    return `0:${String(s).padStart(2, "0")} / 0:${String(Math.round(LOOP / 1000)).padStart(2, "0")}`;
  };

  const clockFor = (at) => {
    const secs = 14 * 60 + 2 + Math.floor(at / 1000);
    return `21:${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  };

  // ---- frame ---------------------------------------------------------------

  const paint = (tms) => {
    const w = width;
    const h = height;
    if (w < 8 || h < 8) return;
    // Snap to the camera's frame rate.
    const fi = Math.floor(tms / STEP);
    const ms = fi * STEP;
    const s = stateAt(ms);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, w, h);

    let frame = cover(frames[s.base], w, h) || cover(frames.empty, w, h);
    if (s.over && s.overMix > 0) {
      ctx.globalAlpha = s.overMix;
      frame = cover(frames[s.over], w, h) || frame;
      ctx.globalAlpha = 1;
    }
    if (!frame) frame = { x: 0, y: 0, w, h };

    // Sensor grain + a touch of exposure breathing, like a real low-light camera.
    {
      const tile = noiseTiles[fi % noiseTiles.length];
      const ox = Math.floor(hash(fi) * 160);
      const oy = Math.floor(hash(fi + 7) * 160);
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.16;
      ctx.translate(-ox, -oy);
      ctx.fillStyle = ctx.createPattern(tile, "repeat");
      ctx.fillRect(0, 0, w + 160, h + 160);
      ctx.restore();
    }
    const breathe = (hash(Math.floor(fi / 3)) - 0.5) * 0.035;
    if (breathe > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${breathe})`;
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = `rgba(0, 0, 0, ${-breathe})`;
      ctx.fillRect(0, 0, w, h);
    }
    const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.42)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);

    // ---- overlays (what Avistra draws on top of the feed) ----
    drawRestriction(frame, s.hot, fi);

    const J = 0.0016; // tracker wobble, in frame units

    // Objects (COCO)
    if (s.chair > 0) {
      ctx.globalAlpha = s.chair;
      const b = toPx(frame, B.chair, J * 0.5, fi + 2);
      boxOutline(b, COL.object, { dashed: true });
      pill(`chair ${conf(0.88, fi + 2)}%`, b.x, b.y, COL.object);
      ctx.globalAlpha = 1;
    }
    if (s.laptop > 0) {
      ctx.globalAlpha = s.laptop;
      const b = toPx(frame, B.laptop, J * 0.4, fi + 3);
      boxOutline(b, COL.object, { dashed: true });
      pill(`laptop ${conf(0.91, fi + 3)}%`, b.x + b.w * 0.2, b.y, COL.object);
      ctx.globalAlpha = 1;
    }

    // Detector sweep before anyone is locked.
    if (s.hunt) {
      boxOutline(toPx(frame, s.hunt), COL.hunt, { dashed: true, lw: 1.4, alpha: 0.8 });
    }

    // Person 1 — enrolled, gets named.
    if (s.alexBody) {
      const body = toPx(frame, B.alexBody, J, fi + 10);
      boxOutline(body, COL.track, { lw: 1.2 });
      const clothes = toPx(frame, B.alexClothes, J, fi + 11);
      boxOutline(clothes, COL.clothes, { dashed: true, lw: 1.4 });
      pill("dark hoodie", clothes.x, clothes.y + clothes.h, COL.clothes, { below: true });
      const face = toPx(frame, B.alexFace, J * 0.6, fi + 12);
      if (!s.alexNamed) {
        // brackets close in on the face while it is being matched
        const k = 1 - ease(s.alexScan);
        const grow = 0.9 * k;
        const g = {
          x: face.x - face.w * grow,
          y: face.y - face.h * grow,
          w: face.w * (1 + 2 * grow),
          h: face.h * (1 + 2 * grow),
        };
        if (s.alexScan > 0) cornerTicks(g, COL.hunt, 1.8);
        pill(`Person 1 · ${t("demo.face", "face")}…`, body.x, body.y, COL.hunt);
      } else {
        cornerTicks(face, COL.known);
        pill(`Person 1 · Alex  ${conf(0.94, fi + 13)}%`, face.x - face.w * 0.4, face.y, COL.known);
      }
    }

    // Person 2 — not enrolled, stays "Person 2".
    if (s.p2) {
      const wu = s.p2Walk;
      const body = toPx(frame, lerpBox(B.p2EnterBody, B.p2CrossBody, wu), J, fi + 20);
      const face = toPx(frame, lerpBox(B.p2EnterFace, B.p2CrossFace, wu), J * 0.6, fi + 21);
      const clothes = toPx(frame, lerpBox(B.p2EnterClothes, B.p2CrossClothes, wu), J, fi + 22);
      boxOutline(body, s.hot ? COL.restrictHot : COL.track, { lw: s.hot ? 2 : 1.2 });
      if (s.p2Face > 0) {
        ctx.globalAlpha = Math.min(1, s.p2Face * 2);
        boxOutline(clothes, COL.clothes, { dashed: true, lw: 1.4 });
        pill("olive jacket", clothes.x, clothes.y + clothes.h, COL.clothes, { below: true });
        cornerTicks(face, COL.unknown);
        ctx.globalAlpha = 1;
        pill(`Person 2  ${conf(0.87, fi + 23)}%`, face.x - face.w * 0.6, face.y, COL.unknown);
      } else {
        pill("Person 2", body.x, body.y, COL.unknown);
      }
    }

    drawAlert(s, fi);
    drawEvidence(s);
    drawOsd(s.u);

    if (s.flash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.35 * s.flash})`;
      ctx.fillRect(0, 0, w, h);
    }
    if (s.endDim > 0) {
      ctx.fillStyle = `rgba(6, 10, 18, ${0.74 * s.endDim})`;
      ctx.fillRect(0, 0, w, h);
    }
    if (s.dark > 0) {
      ctx.fillStyle = `rgba(4, 6, 9, ${s.dark})`;
      ctx.fillRect(0, 0, w, h);
    }
    if (endEl) {
      const on = !!s.end && !reduce;
      if (endEl.classList.contains("on") !== on) {
        endEl.classList.toggle("on", on);
        endEl.setAttribute("aria-hidden", on ? "false" : "true");
        if (on) endEl.removeAttribute("inert");
        else endEl.setAttribute("inert", "");
      }
    }

    // ---- side panel ----
    if (occEl && s.occupancy !== lastOcc) {
      occEl.textContent = String(s.occupancy);
      lastOcc = s.occupancy;
    }
    const tickerText = t(s.tickerKey, s.tickerFb);
    if (ticker && tickerText !== lastTicker) {
      ticker.textContent = tickerText;
      ticker.classList.toggle("is-alert", !!s.hot);
      lastTicker = tickerText;
    }
    const journalKey = s.events.map((e) => e.key).join("|");
    if (journal && journalKey !== lastJournal) {
      journal.innerHTML = s.events
        .slice(-6)
        .reverse()
        .map(
          (e) =>
            `<li${e.alert ? ' class="is-alert"' : ""}><time>${clockFor(e.at)}</time> ${t(e.key, e.fb)}</li>`,
        )
        .join("");
      lastJournal = journalKey;
    }
    if (timeEl) timeEl.textContent = fmt(s.u);
    if (scrubFill) scrubFill.style.width = `${(s.u / LOOP) * 100}%`;
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
      requestAnimationFrame(loop);
    } else {
      paint(elapsed);
    }
  };

  const loop = (now) => {
    if (!playing) return;
    if (!last) last = now;
    elapsed = (elapsed + (now - last)) % LOOP;
    last = now;
    const fi = Math.floor(elapsed / STEP);
    if (fi !== lastFrameIdx) {
      lastFrameIdx = fi;
      paint(elapsed);
    }
    requestAnimationFrame(loop);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(8, Math.round(rect.width));
    const h = Math.max(8, Math.round(rect.height || w * 0.5625));
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
      lastFrameIdx = -1;
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

  Object.values(frames).forEach((img) => {
    img.addEventListener("load", () => paint(elapsed));
  });

  // Don't burn CPU while the player is off screen.
  if (window.IntersectionObserver) {
    let wasPlaying = playing;
    new IntersectionObserver((entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (!visible && playing) {
        wasPlaying = true;
        playing = false;
      } else if (visible && wasPlaying && !playing && playBtn && playBtn.dataset.playing === "1") {
        playing = true;
        last = 0;
        requestAnimationFrame(loop);
      }
    }).observe(root);
  }

  resize();
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }
  setPlaying(playing);
})();
