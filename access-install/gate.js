/**
 * Secret Avistra Access install gate. 3-strike lockout.
 * Unlock via Worker POST /unlock-access when configured, else SHA-256 check.
 * Zip is a GitHub Release asset, not hosted on Pages.
 */
(() => {
  const LOCK_KEY = "avestra-site-lock";
  const FAIL_KEY = "avestra-gate-fails";
  const UNLOCK_KEY = "avestra-gate-ok";
  const MAX_FAILS = 3;
  const LOCK_MS = 24 * 60 * 60 * 1000;
  const DEFAULT_ZIP =
    "https://github.com/Alinahmatov/avestra-cloud-site/releases/latest/download/AvistraAccess.zip";
  const DEFAULT_SHA256 =
    "6a7ae366aa7a9fa65603d1b3e4543cf71a692645436f5a94c50af7490a1390b3";

  const t = (key, fallback) => {
    const fn = window.AvistraI18n && window.AvistraI18n.t;
    const value = fn ? fn(key) : "";
    return value && value !== key ? value : fallback || "";
  };

  const readStore = (key) => {
    for (const bag of [window.localStorage, window.sessionStorage]) {
      try {
        const raw = bag.getItem(key);
        if (raw) return JSON.parse(raw);
      } catch (_) {}
    }
    return null;
  };

  const writeStore = (key, value) => {
    const raw = JSON.stringify(value);
    try {
      localStorage.setItem(key, raw);
    } catch (_) {}
    try {
      sessionStorage.setItem(key, raw);
    } catch (_) {}
  };

  const dropStore = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (_) {}
    try {
      sessionStorage.removeItem(key);
    } catch (_) {}
  };

  const lockRecord = () => {
    const row = readStore(LOCK_KEY);
    if (!row || !row.until) return null;
    if (Date.now() >= Number(row.until)) {
      dropStore(LOCK_KEY);
      dropStore(FAIL_KEY);
      return null;
    }
    return row;
  };

  const isLocked = () => !!lockRecord();

  const ensureOverlay = () => {
    let el = document.querySelector("[data-site-lock]");
    if (el) return el;
    el = document.createElement("div");
    el.className = "site-lock";
    el.setAttribute("data-site-lock", "");
    el.setAttribute("role", "alertdialog");
    el.setAttribute("aria-modal", "true");
    el.hidden = true;
    el.innerHTML =
      '<div class="site-lock-card">' +
      '<img data-brand-icon src="../assets/avistra-icon.png" width="48" height="48" alt="">' +
      '<h1 data-lock-title></h1>' +
      '<p data-lock-body></p>' +
      '<p class="site-lock-hint" data-lock-hint></p>' +
      "</div>";
    const icon = el.querySelector("[data-brand-icon]");
    if (icon) {
      const pageIcon = document.querySelector('link[rel="apple-touch-icon"], link[rel="icon"]');
      const src = pageIcon && pageIcon.getAttribute("href");
      if (src) icon.setAttribute("src", src);
    }
    document.body.appendChild(el);
    return el;
  };

  const fillLock = () => {
    const el = ensureOverlay();
    const title = el.querySelector("[data-lock-title]");
    const body = el.querySelector("[data-lock-body]");
    const hint = el.querySelector("[data-lock-hint]");
    if (title) title.textContent = t("lock.title", "You’ve been kicked.");
    if (body) body.textContent = t("lock.body", "Too many wrong attempts. This site is locked on this browser for 24 hours.");
    if (hint) hint.textContent = t("lock.hint", "Avistra Cloud is unavailable until the lock expires.");
  };

  const applyLock = () => {
    if (!isLocked()) return false;
    document.documentElement.classList.add("is-kicked");
    const el = ensureOverlay();
    fillLock();
    el.hidden = false;
    document.body.setAttribute("aria-hidden", "true");
    el.removeAttribute("aria-hidden");
    return true;
  };

  const kick = (reason) => {
    writeStore(LOCK_KEY, { until: Date.now() + LOCK_MS, reason: reason || "gate" });
    dropStore(UNLOCK_KEY);
    try {
      sessionStorage.removeItem(UNLOCK_KEY);
    } catch (_) {}
    applyLock();
  };

  if (!window.AvistraSiteLock) {
    window.AvistraSiteLock = { kick, isLocked, apply: applyLock };
  }

  const start = () => {
    applyLock();
    window.addEventListener("avestra-lang", () => {
      if (isLocked()) fillLock();
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  const form = document.querySelector("[data-gate-form]");
  if (!form || isLocked()) return;

  const status = form.querySelector("[data-gate-status]");
  const panel = document.querySelector("[data-gate-download]");
  const link = document.querySelector("[data-gate-link]");
  const field = form.querySelector("[name=password], [data-gate-password]");
  const cfg = () => window.AVESTRA_LICENSE || {};

  const failState = () => {
    const row = readStore(FAIL_KEY) || {};
    const resetAt = Number(row.resetAt) || 0;
    if (resetAt && Date.now() > resetAt) return { n: 0, resetAt: Date.now() + LOCK_MS };
    return { n: Number(row.n) || 0, resetAt: resetAt || Date.now() + LOCK_MS };
  };

  const hexEqual = (a, b) => {
    const left = String(a || "").toLowerCase();
    const right = String(b || "").toLowerCase();
    if (left.length !== right.length || !left.length) return false;
    let diff = 0;
    for (let i = 0; i < left.length; i++) diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
    return diff === 0;
  };

  const sha256Hex = async (text) => {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
  };

  const origins = () => {
    const list = [];
    const worker = String(cfg().workerUrl || "").trim().replace(/\/+$/, "");
    const access = String(cfg().accessUrl || "").trim().replace(/\/+$/, "");
    if (worker) list.push(worker);
    if (access && access !== worker) list.push(access);
    return list;
  };

  const postUnlock = async (origin, password) => {
    const resp = await fetch(origin + "/unlock-access", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", Accept: "application/json" },
      body: JSON.stringify({ password }),
    });
    let data = {};
    try {
      data = await resp.json();
    } catch (_) {
      data = {};
    }
    return { status: resp.status, data };
  };

  const verify = async (password) => {
    const zip = String(cfg().accessInstallUrl || "").trim() || DEFAULT_ZIP;
    const list = origins();
    for (const origin of list) {
      try {
        const { status, data } = await postUnlock(origin, password);
        if (data && data.ok) {
          return { ok: true, download: String(data.download || zip) };
        }
        if (status === 401 || status === 403) return { ok: false };
        if (data && data.ok === false && status !== 503 && status !== 404) return { ok: false };
      } catch (_) {}
    }
    const expected = String(cfg().accessInstallSha256 || DEFAULT_SHA256).trim().toLowerCase();
    if (!expected) return { ok: false };
    const digest = await sha256Hex(password);
    if (hexEqual(digest, expected)) return { ok: true, download: zip };
    return { ok: false };
  };

  const showDownload = (url) => {
    form.hidden = true;
    if (panel) panel.hidden = false;
    if (link) {
      link.href = url;
      link.setAttribute("download", "AvistraAccess.zip");
    }
  };

  const note = (text) => {
    if (status) status.textContent = text;
  };

  const unlocked = (() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY);
    } catch (_) {
      return "";
    }
  })();
  if (unlocked) showDownload(unlocked);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isLocked()) {
      applyLock();
      return;
    }
    const password = String((field && field.value) || "");
    const btn = form.querySelector("[type=submit]");
    if (btn) btn.disabled = true;
    note(t("gate.checking", "Checking…"));
    let ok = false;
    let url = DEFAULT_ZIP;
    try {
      const result = await verify(password);
      ok = !!result.ok;
      url = result.download || url;
    } catch (_) {
      ok = false;
    }
    if (ok) {
      dropStore(FAIL_KEY);
      try {
        sessionStorage.setItem(UNLOCK_KEY, url);
      } catch (_) {}
      note(t("gate.ready", "Password accepted."));
      showDownload(url);
      window.open(url, "_self");
      if (btn) btn.disabled = false;
      return;
    }
    const next = failState();
    next.n += 1;
    writeStore(FAIL_KEY, next);
    if (next.n >= MAX_FAILS) {
      kick("gate");
      return;
    }
    const left = MAX_FAILS - next.n;
    const remain =
      left === 1
        ? t("gate.last", "Last try.")
        : t("gate.left", "{n} tries left.").replace("{n}", String(left));
    note(t("gate.wrong", "Wrong password.") + " " + remain);
    if (btn) btn.disabled = false;
    if (field) {
      field.value = "";
      field.focus();
    }
  });
})();
