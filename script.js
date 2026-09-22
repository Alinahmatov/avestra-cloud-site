(() => {
  const pickFirst = (urls, onHit) => {
    let i = 0;
    const next = () => {
      if (i >= urls.length) return;
      const src = urls[i++];
      const img = new Image();
      img.onload = () => onHit(src);
      img.onerror = next;
      img.src = src;
    };
    next();
  };
  const applySrc = (nodes, src, show) => {
    nodes.forEach((el) => {
      if (el.tagName === "LINK") el.href = src;
      else {
        el.src = src;
        if (show) {
          el.hidden = false;
          el.classList.add("is-on");
        }
      }
    });
  };
  pickFirst(
    ["assets/avistra-icon.png", "assets/avistra-icon.svg", "assets/icon.png", "assets/avestra-icon.png"],
    (src) => {
      applySrc([...document.querySelectorAll("[data-brand-icon]")], src, false);
      const og = document.querySelector('meta[property="og:image"]');
      if (og && src.indexOf("http") !== 0) {
        try {
          og.setAttribute("content", new URL(src, location.href).href);
        } catch (_) {}
      }
    }
  );
  pickFirst(
    ["assets/avistra-logo.png", "assets/avistra-logo.svg", "assets/logo.png", "assets/avestra-logo.png"],
    (src) => applySrc([...document.querySelectorAll("[data-brand-logo]")], src, false)
  );
})();

(() => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  const i18n = window.AvistraI18n;

  if (menu && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", String(open));
      if (i18n) {
        menu.setAttribute("aria-label", i18n.t(open ? "nav.menuClose" : "nav.menu"));
      }
    };
    menu.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    nav.querySelectorAll(".links a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const themeBtn = document.querySelector("[data-theme-toggle]");
  const setTheme = (theme) => {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("avestra-theme", next);
    } catch (_) {}
    if (themeBtn && i18n) {
      themeBtn.setAttribute("aria-label", i18n.t(next === "dark" ? "nav.themeDark" : "nav.themeLight"));
    }
  };
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
    setTheme(document.documentElement.dataset.theme);
  }

  const langRoot = document.querySelector("[data-lang-switch]");
  if (langRoot) {
    const toggle = langRoot.querySelector("[data-lang-toggle]");
    const flag = langRoot.querySelector("[data-lang-flag]");
    const code = langRoot.querySelector("[data-lang-code]");
    const setOpen = (open) => {
      langRoot.classList.toggle("open", open);
      if (toggle) toggle.setAttribute("aria-expanded", String(open));
    };
    const syncFlag = () => {
      const lang = (i18n && i18n.lang) || document.documentElement.dataset.lang || "en";
      if (flag) flag.dataset.flag = lang;
      if (code) code.textContent = String(lang).toUpperCase();
    };
    syncFlag();
    if (toggle) {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(!langRoot.classList.contains("open"));
      });
    }
    langRoot.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const next = btn.getAttribute("data-set-lang");
        if (i18n && i18n.setLang) i18n.setLang(next);
        else {
          document.documentElement.lang = next;
          document.documentElement.dataset.lang = next;
          try {
            localStorage.setItem("avestra-lang", next);
          } catch (_) {}
        }
        syncFlag();
        setOpen(false);
        if (themeBtn) setTheme(document.documentElement.dataset.theme);
      });
    });
    document.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    window.addEventListener("avestra-lang", syncFlag);
  }

  const donate = window.AVESTRA_DONATE || {};
  const paypalDonateUrl = () => {
    const hosted = String(donate.paypalHostedButtonId || "").trim();
    if (hosted) return `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(hosted)}`;
    const email = String(donate.paypalBusinessEmail || "").trim();
    if (email) {
      const params = new URLSearchParams({
        business: email,
        no_recurring: "0",
        item_name: donate.itemName || "Avistra Cloud",
        currency_code: donate.currency || "USD",
      });
      return `https://www.paypal.com/donate/?${params.toString()}`;
    }
    return String(donate.paypalMeUrl || "").trim();
  };
  const stripeLink = String(donate.stripePaymentLink || "").trim();
  const paypalLink = paypalDonateUrl();
  const cardLink = stripeLink || paypalLink;
  const paypalBtn = document.querySelector("[data-donate-paypal]");
  if (paypalBtn && paypalLink) paypalBtn.href = paypalLink;
  const cardBtn = document.querySelector("[data-donate-card]");
  const cardNote = document.querySelector("[data-donate-card-note]");
  if (cardBtn && cardLink) cardBtn.href = cardLink;
  const setCardNote = () => {
    if (!cardNote || !i18n) return;
    cardNote.textContent = i18n.t(stripeLink ? "donate.cardStripe" : "donate.cardP");
  };
  setCardNote();
  window.addEventListener("avestra-lang", setCardNote);

  const toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = () => {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("in"));
  };
  if (reduceMotion) {
    reveal();
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((node) => io.observe(node));
  } else {
    reveal();
  }
  reveal();
})();

(() => {
  const form = document.querySelector("[data-license-form]");
  if (!form) return;
  const status = form.querySelector("[data-license-status]");
  const cfg = window.AVESTRA_LICENSE || {};
  const i18n = () => window.AvistraI18n;
  const t = (key, fallback) => {
    const fn = i18n() && i18n().t;
    const value = fn ? fn(key) : "";
    return value || fallback;
  };
  const setStatus = (kind, text) => {
    if (!status) return;
    status.textContent = text || "";
    status.classList.remove("is-ok", "is-error", "is-err");
    if (kind === "ok") status.classList.add("is-ok");
    if (kind === "error") status.classList.add("is-error");
  };
  const requestEndpoint = (origin) => {
    let raw = String(origin || "").trim().replace(/\/+$/, "");
    if (!raw) return "";
    if (/\/v1\/license-request$/i.test(raw) || /\/license-request$/i.test(raw)) return raw;
    const path = String(cfg.requestPath || "/license-request").trim() || "/license-request";
    return raw + (path.startsWith("/") ? path : `/${path}`);
  };
  const targets = () => {
    const url = requestEndpoint(cfg.workerUrl || "https://avestra-access.alinahmatov.workers.dev");
    return url ? [url] : [];
  };
  const payload = () => {
    const note = String(
      (form.querySelector("[name=note]") || form.querySelector("[name=reason]") || {}).value || ""
    ).trim();
    const queuedNote = note || "License request from www.avestra.online";
    return {
      name: (form.querySelector("[name=name]") || {}).value || "",
      email: (form.querySelector("[name=email]") || {}).value || "",
      contact: (form.querySelector("[name=contact]") || {}).value || "",
      reason: queuedNote,
      note: queuedNote,
      message: queuedNote,
      timestamp: new Date().toISOString(),
      origin: location.origin,
      _honey: (form.querySelector("[name=_honey]") || {}).value || "",
    };
  };
  const postJson = async (url, body) => {
    const resp = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json; charset=utf-8", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    let data = {};
    try {
      data = await resp.json();
    } catch (_) {
      data = {};
    }
    if (!resp.ok || data.ok === false) {
      throw new Error(data.error || "request failed");
    }
    return data;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const hitsKey = "avestra-license-posts";
    const windowMs = 10 * 60 * 1000;
    const limit = 5;
    const loadHits = () => {
      try {
        const raw = JSON.parse(localStorage.getItem(hitsKey) || "[]");
        return Array.isArray(raw) ? raw.map(Number).filter((n) => Date.now() - n < windowMs) : [];
      } catch (_) {
        return [];
      }
    };
    const hits = loadHits();
    if (hits.length >= limit) {
      setStatus("error", t("get.formLimit", "Too many license requests. Try again in 10 minutes."));
      return;
    }
    const urls = targets();
    if (!urls.length) {
      setStatus("error", t("get.formMissing", "The license queue is not configured yet."));
      return;
    }
    const btn = form.querySelector("[type=submit]");
    if (btn) btn.disabled = true;
    setStatus("", t("get.formSending", "Sending…"));
    const body = payload();
    let queued = false;
    let lastErr = "";
    for (const url of urls) {
      try {
        await postJson(url, body);
        queued = true;
        break;
      } catch (err) {
        lastErr = err && err.message ? err.message : "request failed";
      }
    }
    if (queued) {
      hits.push(Date.now());
      try {
        localStorage.setItem(hitsKey, JSON.stringify(hits.slice(-limit)));
      } catch (_) {}
      form.reset();
      setStatus(
        "ok",
        t(
          "get.formSuccess",
          "Request received. Stay on this page — Access has the row under License requests. A license is emailed only after approval."
        )
      );
    } else {
      setStatus(
        "error",
        t("get.formError", "Could not reach the license queue.") +
          (lastErr ? " " + lastErr : "")
      );
    }
    if (btn) btn.disabled = false;
  });

  const focusLicenseForm = () => {
    if (location.hash !== "#form") return;
    const name = form.querySelector("[name=name]");
    if (name) {
      window.setTimeout(() => {
        try {
          name.focus({ preventScroll: true });
        } catch (_) {
          name.focus();
        }
      }, 80);
    }
  };
  window.addEventListener("hashchange", focusLicenseForm);
  if (location.hash === "#form") focusLicenseForm();
})();
