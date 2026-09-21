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
