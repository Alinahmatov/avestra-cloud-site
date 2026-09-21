const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");

if (menu && nav) {
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  menu.addEventListener("click", () => {
    setOpen(!nav.classList.contains("open"));
  });
  nav.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

const clock = document.querySelector("[data-clock]");
if (clock) {
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  tick();
  window.setInterval(tick, 1000);
}

const donate = window.AVESTRA_DONATE || {};

const paypalDonateUrl = () => {
  const hosted = String(donate.paypalHostedButtonId || "").trim();
  if (hosted) {
    return `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(hosted)}`;
  }
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
if (paypalBtn && paypalLink) {
  paypalBtn.href = paypalLink;
}

const cardBtn = document.querySelector("[data-donate-card]");
const cardNote = document.querySelector("[data-donate-card-note]");
if (cardBtn && cardLink) {
  cardBtn.href = cardLink;
}
if (cardNote) {
  cardNote.textContent = stripeLink
    ? "Visa, Mastercard, and other cards through a Stripe Payment Link. No Stripe keys are stored on this site."
    : "Visa, Mastercard, and other cards as a guest on PayPal’s donate page. No PayPal account required for many cards.";
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ticker = document.querySelector("[data-ticker]");
if (ticker && !reduceMotion) {
  const lines = [
    "Unknown walked through · laptop in view · occupancy 3",
    "Alex present · 0.94 · occupancy 2",
    "Unknown entered · capture · occupancy 3",
    "Laptop in view · chair in frame · occupancy 2",
  ];
  let index = 0;
  window.setInterval(() => {
    ticker.classList.add("is-swap");
    window.setTimeout(() => {
      index = (index + 1) % lines.length;
      ticker.textContent = lines[index];
      ticker.classList.remove("is-swap");
    }, 320);
  }, 3800);
}

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
  window.setTimeout(reveal, 2500);
} else {
  reveal();
}
