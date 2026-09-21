(() => {
  const root = document.querySelector("[data-demo]");
  if (!root) return;

  const canvas = root.querySelector("[data-demo-canvas]");
  const ctx = canvas.getContext("2d", { alpha: false });
  const playBtn = root.querySelector("[data-demo-play]");
  const scrubFill = root.querySelector("[data-demo-scrub] span");
  const scrub = root.querySelector("[data-demo-scrub]");
  const timeEl = root.querySelector("[data-demo-time]");
  const ticker = root.querySelector("[data-demo-ticker]");
  const journal = root.querySelector("[data-demo-journal]");
  const occEl = root.querySelector("[data-demo-occ]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LOOP = 12000;
  const STATIC_AT = 7000;

  let playing = !reduce;
  let elapsed = reduce ? STATIC_AT : 0;
  let last = performance.now();
  let width = 0;
  let height = 0;

  const room = new Image();
  room.src = "assets/room.jpg";

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => {
    const x = clamp(t, 0, 1);
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  };
  const appear = (t, start, dur) => ease((t - start) / dur);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    width = w;
    height = h;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawSilhouette = (x, y, scale, dim, sway) => {
    ctx.save();
    ctx.translate(x, y + sway);
    ctx.scale(scale, scale);
    const fill = dim ? "rgba(22, 30, 40, 0.92)" : "rgba(32, 42, 54, 0.94)";
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-24, 22);
    ctx.quadraticCurveTo(-28, 28, -26, 44);
    ctx.lineTo(-22, 108);
    ctx.quadraticCurveTo(-18, 118, -8, 118);
    ctx.lineTo(8, 118);
    ctx.quadraticCurveTo(18, 118, 22, 108);
    ctx.lineTo(26, 44);
    ctx.quadraticCurveTo(28, 28, 24, 22);
    ctx.quadraticCurveTo(0, 32, -24, 22);
    ctx.fill();
    ctx.restore();
  };

  const cornerBox = (x, y, w, h, color, alpha, pulse) => {
    const pad = 7 + pulse;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y + pad);
    ctx.lineTo(x, y);
    ctx.lineTo(x + pad, y);
    ctx.moveTo(x + w - pad, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + pad);
    ctx.moveTo(x + w, y + h - pad);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w - pad, y + h);
    ctx.moveTo(x + pad, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + h - pad);
    ctx.stroke();
    ctx.restore();
  };

  const tag = (x, y, text, known) => {
    ctx.font = "600 11px Instrument Sans, Segoe UI, sans-serif";
    const tw = ctx.measureText(text).width;
    const w = tw + 16;
    const h = 18;
    ctx.fillStyle = known ? "rgba(62, 224, 180, 0.16)" : "rgba(28, 36, 48, 0.92)";
    ctx.beginPath();
    const r = 9;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.fill();
    ctx.fillStyle = known ? "#3ee0b4" : "#8d9aab";
    ctx.fillText(text, x + 8, y + 13);
  };

  const dashBox = (x, y, w, h, label, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = "rgba(139, 155, 180, 0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);
    ctx.font = "500 10px Instrument Sans, Segoe UI, sans-serif";
    ctx.fillStyle = "#8d9aab";
    ctx.fillText(label, x, y - 5);
    ctx.restore();
  };

  const stateAt = (t) => {
    const alexA = appear(t, 700, 900);
    const conf = lerp(0.41, 0.94, appear(t, 900, 1400));
    const unknownA = appear(t, 4200, 1100);
    const unknownX = lerp(width * 0.98, width * 0.72, appear(t, 4200, 1400));
    const laptopA = appear(t, 2100, 500);
    const chairA = appear(t, 2700, 500);
    const pulse = (Math.sin(t / 420) + 1) * 0.5;
    let occupancy = 0;
    if (alexA > 0.55) occupancy = 1;
    if (unknownA > 0.45) occupancy = 2;
    let line = "Searching scene · occupancy 0";
    if (alexA > 0.7 && unknownA < 0.3) line = `Alex present · ${conf.toFixed(2)} · occupancy 1`;
    if (laptopA > 0.8 && unknownA < 0.3) line = `Alex present · laptop in view · occupancy 1`;
    if (unknownA > 0.35) line = "Unknown walked through · occupancy 2";
    if (unknownA > 0.85) line = `Unknown walked through · laptop in view · occupancy ${occupancy}`;
    const rows = [];
    if (alexA > 0.75) rows.push({ text: "Alex present · named", warn: false });
    if (laptopA > 0.9) rows.push({ text: "Laptop in view", warn: false });
    if (unknownA > 0.7) rows.push({ text: "Unknown entered · capture", warn: true });
    return { alexA, conf, unknownA, unknownX, laptopA, chairA, pulse, occupancy, line, rows };
  };

  const drawFeed = (t) => {
    const w = width;
    const h = height;
    if (w < 8 || h < 8) return stateAt(0);
    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, w, h);

    const sway = reduce ? 0 : Math.sin(t / 1800) * 3;
    if (room.complete && room.naturalWidth) {
      const scale = Math.max(w / room.naturalWidth, h / room.naturalHeight) * 1.04;
      const rw = room.naturalWidth * scale;
      const rh = room.naturalHeight * scale;
      ctx.drawImage(room, (w - rw) / 2 + sway * 0.4, (h - rh) / 2, rw, rh);
    }

    ctx.fillStyle = "rgba(4, 8, 12, 0.22)";
    ctx.fillRect(0, 0, w, h);

    const s = stateAt(t);
    const alexX = w * 0.22;
    const alexY = h * 0.42;
    const alexScale = h / 520;

    if (s.alexA > 0.02) {
      ctx.globalAlpha = s.alexA;
      drawSilhouette(alexX, alexY, alexScale, false, Math.sin(t / 640) * 1.2);
      ctx.globalAlpha = 1;
      const bw = 92 * alexScale * 1.15;
      const bh = 168 * alexScale * 1.05;
      const bx = alexX - bw / 2;
      const by = alexY - 22 * alexScale;
      cornerBox(bx, by, bw, bh, "#3ee0b4", s.alexA, s.pulse * 1.4);
      if (s.alexA > 0.45) tag(bx, by - 24, `Alex · ${s.conf.toFixed(2)}`, true);
    }

    if (s.unknownA > 0.02) {
      ctx.globalAlpha = s.unknownA;
      drawSilhouette(s.unknownX, h * 0.4, alexScale * 0.92, true, 0);
      ctx.globalAlpha = 1;
      const bw = 78 * alexScale * 1.15;
      const bh = 150 * alexScale * 1.05;
      const bx = s.unknownX - bw / 2;
      const by = h * 0.4 - 20 * alexScale;
      cornerBox(bx, by, bw, bh, "#7d8b9c", s.unknownA, 0);
      if (s.unknownA > 0.4) tag(bx, by - 24, "Unknown", false);
    }

    dashBox(w * 0.455, h * 0.545, w * 0.07, h * 0.045, "laptop", s.laptopA);
    dashBox(w * 0.33, h * 0.48, w * 0.1, h * 0.22, "chair", s.chairA);

    if (!reduce) {
      const scanY = ((t / 18) % (h + 80)) - 40;
      const g = ctx.createLinearGradient(0, scanY, 0, scanY + h * 0.28);
      g.addColorStop(0, "rgba(62,224,180,0)");
      g.addColorStop(0.5, "rgba(62,224,180,0.07)");
      g.addColorStop(1, "rgba(62,224,180,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, scanY, w, h * 0.28);
    }

    const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.78);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.38)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(8, 12, 16, 0.72)";
    ctx.fillRect(10, h - 34, w - 20, 24);
    ctx.strokeStyle = "rgba(230,237,243,0.08)";
    ctx.strokeRect(10.5, h - 33.5, w - 21, 23);
    ctx.font = "500 11px Instrument Sans, Segoe UI, sans-serif";
    ctx.fillStyle = "#8d9aab";
    ctx.fillText(s.line, 18, h - 18);

    return s;
  };

  const renderJournal = (rows) => {
    if (!journal) return;
    if (!rows.length) {
      journal.innerHTML = "<li>Waiting for the room…</li>";
      return;
    }
    journal.innerHTML = rows
      .map(
        (row) =>
          `<li><span class="dot${row.warn ? " warn" : ""}"></span>${row.text}</li>`
      )
      .join("");
  };

  const setChrome = (t, s) => {
    if (ticker && ticker.textContent !== s.line) ticker.textContent = s.line;
    if (occEl) occEl.textContent = String(s.occupancy);
    renderJournal(s.rows);
    if (scrubFill) scrubFill.style.width = `${((t % LOOP) / LOOP) * 100}%`;
    if (timeEl) {
      const sec = Math.floor((t % LOOP) / 1000);
      timeEl.textContent = `0:${String(sec).padStart(2, "0")}`;
    }
    if (playBtn) {
      playBtn.setAttribute("aria-label", playing ? "Pause demo" : "Play demo");
      playBtn.dataset.playing = playing ? "1" : "0";
    }
  };

  const frame = (now) => {
    if (playing) {
      elapsed = (elapsed + (now - last)) % LOOP;
    }
    last = now;
    const s = drawFeed(elapsed);
    setChrome(elapsed, s);
    window.requestAnimationFrame(frame);
  };

  resize();
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }
  if (playBtn && !reduce) {
    playBtn.addEventListener("click", () => {
      playing = !playing;
      last = performance.now();
    });
  } else if (playBtn) {
    playBtn.hidden = true;
  }
  if (scrub && !reduce) {
    scrub.addEventListener("click", (event) => {
      const rect = scrub.getBoundingClientRect();
      elapsed = clamp((event.clientX - rect.left) / rect.width, 0, 1) * LOOP;
    });
  }

  room.addEventListener("load", () => drawFeed(elapsed), { once: true });
  window.requestAnimationFrame((now) => {
    last = now;
    frame(now);
  });
})();
