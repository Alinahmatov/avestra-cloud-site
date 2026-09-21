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
  const LOOP = 16000;
  const STATIC_AT = 9000;

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

  const drawSilhouette = (x, y, scale, dim, sway, walk) => {
    ctx.save();
    ctx.translate(x, y + sway);
    ctx.scale(scale, scale);
    const fill = dim ? "rgba(18, 26, 36, 0.93)" : "rgba(28, 38, 50, 0.95)";
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-24, 22);
    ctx.quadraticCurveTo(-28, 28, -26, 44);
    ctx.lineTo(-20 + walk, 108);
    ctx.quadraticCurveTo(-16, 118, -8, 118);
    ctx.lineTo(8, 118);
    ctx.quadraticCurveTo(16, 118, 20 - walk, 108);
    ctx.lineTo(26, 44);
    ctx.quadraticCurveTo(28, 28, 24, 22);
    ctx.quadraticCurveTo(0, 32, -24, 22);
    ctx.fill();
    ctx.restore();
  };

  const drawCrosshair = (x, y, size, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "rgba(62, 224, 180, 0.75)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - size - 8, y);
    ctx.lineTo(x - size + 4, y);
    ctx.moveTo(x + size - 4, y);
    ctx.lineTo(x + size + 8, y);
    ctx.moveTo(x, y - size - 8);
    ctx.lineTo(x, y - size + 4);
    ctx.moveTo(x, y + size - 4);
    ctx.lineTo(x, y + size + 8);
    ctx.stroke();
    ctx.restore();
  };

  const drawBloom = (x, y, r, alpha) => {
    const g = ctx.createRadialGradient(x, y, 2, x, y, r);
    g.addColorStop(0, `rgba(62, 224, 180, ${0.28 * alpha})`);
    g.addColorStop(1, "rgba(62, 224, 180, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
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
    const hunt = appear(t, 180, 700);
    const alexA = appear(t, 850, 700);
    const lock = appear(t, 1100, 280);
    const conf = lerp(0.41, 0.94, appear(t, 1100, 1600));
    const unknownA = appear(t, 5200, 900);
    const unknownX = lerp(width * 1.02, width * 0.7, appear(t, 5000, 1800));
    const laptopA = appear(t, 2600, 420);
    const chairA = appear(t, 3200, 420);
    const pulse = (Math.sin(t / 380) + 1) * 0.5;
    let occupancy = 0;
    if (alexA > 0.6) occupancy = 1;
    if (unknownA > 0.4) occupancy = 2;
    let line = "Searching scene · occupancy 0";
    if (hunt > 0.4 && alexA < 0.5) line = "Face lock… occupancy 0";
    if (alexA > 0.65 && unknownA < 0.25) line = `Person 1 · Alex · ${conf.toFixed(2)} · occupancy 1`;
    if (laptopA > 0.85 && unknownA < 0.25) line = "Person 1 · Alex, dark hoodie · laptop in view · occupancy 1";
    if (unknownA > 0.3) line = "Person 2 walked through · occupancy 2";
    if (unknownA > 0.85) line = `Person 2 walked through · laptop in view · occupancy ${occupancy}`;
    const rows = [];
    if (alexA > 0.8) rows.push({ text: "Person 1 · Alex, dark hoodie", warn: false });
    if (laptopA > 0.9) rows.push({ text: "laptop in view", warn: false });
    if (unknownA > 0.65) rows.push({ text: "Person 2 entered · capture", warn: true });
    return { hunt, alexA, lock, conf, unknownA, unknownX, laptopA, chairA, pulse, occupancy, line, rows };
  };

  const drawFeed = (t) => {
    const w = width;
    const h = height;
    if (w < 8 || h < 8) return stateAt(0);
    ctx.fillStyle = "#07090c";
    ctx.fillRect(0, 0, w, h);

    const sway = reduce ? 0 : Math.sin(t / 1800) * 3;
    let frame = null;
    if (room.complete && room.naturalWidth) {
      const scale = Math.max(w / room.naturalWidth, h / room.naturalHeight) * 1.04;
      const rw = room.naturalWidth * scale;
      const rh = room.naturalHeight * scale;
      frame = {
        x: (w - rw) / 2 + sway * 0.4,
        y: (h - rh) / 2,
        rw,
        rh,
      };
      ctx.drawImage(room, frame.x, frame.y, rw, rh);
    }

    ctx.fillStyle = "rgba(4, 8, 12, 0.22)";
    ctx.fillRect(0, 0, w, h);

    const s = stateAt(t);
    const alexX = w * 0.22;
    const alexY = h * 0.42;
    const alexScale = h / 520;

    if (!reduce && s.hunt > 0.05 && s.alexA < 0.85) {
      const hx = lerp(w * 0.72, alexX, s.hunt);
      const hy = lerp(h * 0.28, alexY, s.hunt);
      drawCrosshair(hx, hy, 16 + (1 - s.hunt) * 22, 0.85 - s.alexA * 0.5);
    }

    if (s.alexA > 0.02) {
      if (s.lock > 0.2) drawBloom(alexX, alexY, 54 * alexScale, s.lock * (0.55 + s.pulse * 0.45));
      ctx.globalAlpha = s.alexA;
      drawSilhouette(alexX, alexY, alexScale, false, Math.sin(t / 640) * 1.2, Math.sin(t / 280) * 3);
      ctx.globalAlpha = 1;
      const bw = 92 * alexScale * 1.15;
      const bh = 168 * alexScale * 1.05;
      const bx = alexX - bw / 2;
      const by = alexY - 22 * alexScale;
      cornerBox(bx, by, bw, bh, "#3ee0b4", s.alexA, s.pulse * 1.8 * s.lock);
      if (s.alexA > 0.4) tag(bx, by - 24, `Person 1 · Alex · ${s.conf.toFixed(2)}`, true);
    }

    if (s.unknownA > 0.02) {
      const walk = Math.sin(t / 160) * 6;
      ctx.globalAlpha = s.unknownA;
      drawSilhouette(s.unknownX, h * 0.4, alexScale * 0.92, true, 0, walk);
      ctx.globalAlpha = 1;
      const bw = 78 * alexScale * 1.15;
      const bh = 150 * alexScale * 1.05;
      const bx = s.unknownX - bw / 2;
      const by = h * 0.4 - 20 * alexScale;
      cornerBox(bx, by, bw, bh, "#7d8b9c", s.unknownA, 0);
      if (s.unknownA > 0.35) tag(bx, by - 24, "Person 2", false);
    }

    if (frame) {
      // Pixel boxes on room.jpg (1280×720), then mapped through the same cover draw.
      const fromPhoto = (px, py, pw, ph) => ({
        x: frame.x + (px / 1280) * frame.rw,
        y: frame.y + (py / 720) * frame.rh,
        w: (pw / 1280) * frame.rw,
        h: (ph / 720) * frame.rh,
      });
      const laptop = fromPhoto(656, 480, 88, 32);
      const chair = fromPhoto(390, 326, 150, 250);
      dashBox(laptop.x, laptop.y, laptop.w, laptop.h, "laptop", s.laptopA);
      dashBox(chair.x, chair.y, chair.w, chair.h, "chair", s.chairA);
    }

    ctx.font = "500 10px IBM Plex Mono, Cascadia Mono, ui-monospace, monospace";
    ctx.fillStyle = "rgba(62, 224, 180, 0.72)";
    ctx.fillText("CAM 0 · LOCAL", 12, 16);
    ctx.fillStyle = "rgba(141, 154, 171, 0.8)";
    ctx.fillText("FACES + COCO", Math.max(12, w - 92), 16);

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

    if (!reduce && t > LOOP - 520) {
      ctx.fillStyle = `rgba(5, 6, 8, ${(t - (LOOP - 520)) / 520})`;
      ctx.fillRect(0, 0, w, h);
    }

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

  let lastOcc = -1;
  const setChrome = (t, s) => {
    if (ticker && ticker.textContent !== s.line) ticker.textContent = s.line;
    if (occEl) {
      occEl.textContent = String(s.occupancy);
      if (s.occupancy !== lastOcc) {
        lastOcc = s.occupancy;
        occEl.classList.remove("is-tick");
        void occEl.offsetWidth;
        occEl.classList.add("is-tick");
      }
    }
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
