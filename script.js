(() => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  const i18n = window.AvestraI18n;

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
  if (langRoot && i18n) {
    const toggle = langRoot.querySelector("[data-lang-toggle]");
    const flag = langRoot.querySelector("[data-lang-flag]");
    const setOpen = (open) => {
      langRoot.classList.toggle("open", open);
      if (toggle) toggle.setAttribute("aria-expanded", String(open));
    };
    const syncFlag = () => {
      if (flag) flag.dataset.flag = i18n.lang;
    };
    syncFlag();
    if (toggle) {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(!langRoot.classList.contains("open"));
      });
    }
    langRoot.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        i18n.setLang(btn.getAttribute("data-set-lang"));
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
        item_name: donate.itemName || "Avestra Cloud",
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

(() => {
  const form = document.querySelector("[data-license-form]");
  if (!form) return;
  const status = form.querySelector("[data-license-status]");
  const cfg = window.AVESTRA_LICENSE || {};
  const i18n = () => window.AvestraI18n;
  const t = (key, fallback) => {
    const fn = i18n() && i18n().t;
    const value = fn ? fn(key) : "";
    return value || fallback;
  };
  const origins = () => {
    const list = [];
    const worker = String(cfg.workerUrl || "").trim().replace(/\/+$/, "");
    const access = String(cfg.accessUrl || "").trim().replace(/\/+$/, "");
    if (worker) list.push(worker);
    if (access && access !== worker) list.push(access);
    return list;
  };
  const payload = () => ({
    name: (form.querySelector("[name=name]") || {}).value || "",
    email: (form.querySelector("[name=email]") || {}).value || "",
    contact: (form.querySelector("[name=contact]") || {}).value || "",
    reason: (form.querySelector("[name=reason]") || {}).value || "",
    _honey: (form.querySelector("[name=_honey]") || {}).value || "",
  });
  const postJson = async (origin, body) => {
    const resp = await fetch(origin + "/license-request", {
      method: "POST",
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
    const targets = origins();
    if (!targets.length) return;
    event.preventDefault();
    const btn = form.querySelector("[type=submit]");
    if (btn) btn.disabled = true;
    if (status) status.textContent = t("get.formSending", "Sending to Access…");
    const body = payload();
    let lastErr = "";
    for (const origin of targets) {
      try {
        await postJson(origin, body);
        const thanks = String(cfg.thanksUrl || "thanks.html").trim() || "thanks.html";
        location.href = thanks;
        return;
      } catch (err) {
        lastErr = err && err.message ? err.message : "request failed";
      }
    }
    if (btn) btn.disabled = false;
    if (status) {
      status.textContent = t("get.formError", "Could not reach Access.") + (lastErr ? " " + lastErr : "");
    }
  });
})();
})();
