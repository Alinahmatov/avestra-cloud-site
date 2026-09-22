(() => {
  const dict = {
    en: {
      "nav.themeLight": "Switch to dark theme",
      "nav.themeDark": "Switch to light theme",
      "nav.lang": "Language",
      "gate.pageTitle": "Avistra",
      "gate.kicker": "Restricted",
      "gate.title": "Password required",
      "gate.lead": "This path is not a public download.",
      "gate.password": "Password",
      "gate.submit": "Continue",
      "gate.checking": "Checking…",
      "gate.wrong": "Wrong password.",
      "gate.left": "{n} tries left.",
      "gate.last": "Last try.",
      "gate.ready": "Password accepted.",
      "gate.download": "Download Avistra Access",
      "gate.note": "Portable Avistra Access. Empty copy — import licenses in Access. Not Avistra Cloud.",
      "lock.title": "You’ve been kicked.",
      "lock.body": "Too many wrong attempts. This site is locked on this browser for 24 hours.",
      "lock.hint": "Avistra Cloud is unavailable until the lock expires.",
    },
    az: {
      "nav.themeLight": "Tünd mövzuya keç",
      "nav.themeDark": "Açıq mövzuya keç",
      "nav.lang": "Dil",
      "gate.pageTitle": "Avistra",
      "gate.kicker": "Məhdud",
      "gate.title": "Şifrə lazımdır",
      "gate.lead": "Bu yol ictimai yükləmə deyil.",
      "gate.password": "Şifrə",
      "gate.submit": "Davam et",
      "gate.checking": "Yoxlanır…",
      "gate.wrong": "Şifrə səhvdir.",
      "gate.left": "{n} cəhd qalıb.",
      "gate.last": "Son cəhd.",
      "gate.ready": "Şifrə qəbul olundu.",
      "gate.download": "Avistra Access yüklə",
      "gate.note": "Portativ Avistra Access. Boş nüsxə — lisenziyaları Access-də import edin. Avistra Cloud deyil.",
      "lock.title": "Saytdan çıxarıldınız.",
      "lock.body": "Həddən çox səhv cəhd. Bu brauzerdə sayt 24 saat kilidlənib.",
      "lock.hint": "Kilid bitənə qədər Avistra Cloud əlçatan deyil.",
    },
    ru: {
      "nav.themeLight": "Тёмная тема",
      "nav.themeDark": "Светлая тема",
      "nav.lang": "Язык",
      "gate.pageTitle": "Avistra",
      "gate.kicker": "Ограничено",
      "gate.title": "Нужен пароль",
      "gate.lead": "Это не публичная загрузка.",
      "gate.password": "Пароль",
      "gate.submit": "Продолжить",
      "gate.checking": "Проверка…",
      "gate.wrong": "Неверный пароль.",
      "gate.left": "Осталось попыток: {n}.",
      "gate.last": "Последняя попытка.",
      "gate.ready": "Пароль принят.",
      "gate.download": "Скачать Avistra Access",
      "gate.note": "Портативный Avistra Access. Пустая копия — импортируйте лицензии в Access. Это не Avistra Cloud.",
      "lock.title": "Вас выгнали с сайта.",
      "lock.body": "Слишком много неверных попыток. Сайт заблокирован в этом браузере на 24 часа.",
      "lock.hint": "Avistra Cloud недоступен, пока блокировка не истечёт.",
    },
  };

  const langs = ["en", "az", "ru"];
  const KEY = "avestra-lang";

  const t = (path, lang) => {
    const code = langs.includes(lang) ? lang : current;
    return (dict[code] && dict[code][path]) || (dict.en && dict.en[path]) || path;
  };

  const detect = () => {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (langs.includes(q)) return q;
      const stored = localStorage.getItem(KEY);
      if (langs.includes(stored)) return stored;
    } catch (_) {}
    return "en";
  };

  let current = detect();

  const apply = (lang) => {
    current = langs.includes(lang) ? lang : "en";
    document.documentElement.lang = current;
    document.documentElement.dataset.lang = current;
    try {
      localStorage.setItem(KEY, current);
    } catch (_) {}
    document.title = t("gate.pageTitle", current);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const html = t(el.getAttribute("data-i18n"), current);
      if (html != null) el.innerHTML = html;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), current));
    });
    document.querySelectorAll("[data-lang-code]").forEach((el) => {
      el.textContent = current.toUpperCase();
    });
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.setAttribute("aria-current", btn.getAttribute("data-set-lang") === current ? "true" : "false");
    });
    window.dispatchEvent(new CustomEvent("avestra-lang", { detail: { lang: current } }));
  };

  window.AvistraI18n = {
    t: (path) => t(path, current),
    setLang: apply,
    get lang() {
      return current;
    },
  };

  const start = () => {
    apply(current);
    const themeBtn = document.querySelector("[data-theme-toggle]");
    const setTheme = (theme) => {
      const next = theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("avestra-theme", next);
      } catch (_) {}
      if (themeBtn) {
        themeBtn.setAttribute("aria-label", t(next === "dark" ? "nav.themeDark" : "nav.themeLight", current));
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
      const setOpen = (open) => {
        langRoot.classList.toggle("open", open);
        if (toggle) toggle.setAttribute("aria-expanded", String(open));
      };
      const syncFlag = () => {
        if (flag) flag.dataset.flag = current;
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
          apply(btn.getAttribute("data-set-lang"));
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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
