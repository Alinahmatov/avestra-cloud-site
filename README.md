# Avestra Cloud

Public marketing site for **Avestra Cloud** — indie local-AI surveillance for Windows. Faces, objects, action journal, people database. Zip by request.

**Live site:** [https://www.avestra.online](https://www.avestra.online)

The apex `avestra.online` is still Spaceship parking until A records can be added outside Unbox. Use **www**. GitHub Pages is a backup of this same site.

This repository is the website only. It does not include the Windows app, models, or personal configuration. The zip is not hosted here — people request access with the homepage form, and Alin emails the package.

## Donate

The homepage has a **Donate** section (also in the nav, hero, and footer). Checkout is hosted off-site. No secret keys belong in this repo.

**PayPal** uses a hosted Donate page to `alii.nahmatov@gmail.com` (`donate-config.js` → `paypalBusinessEmail`). PayPal Donate also accepts credit/debit cards as a guest for many accounts.

Optional, if you want different PayPal routing later (do not invent a paypal.me username):

1. Create a [PayPal Donate button](https://www.paypal.com/buttons/) and paste the hosted button ID into `paypalHostedButtonId`, **or**
2. Create a real [paypal.me](https://www.paypal.me/) link and paste the full URL into `paypalMeUrl`.

**Stripe (optional card checkout):** no Stripe secret keys. In the Stripe Dashboard create a [Payment Link](https://dashboard.stripe.com/payment-links), copy the public URL (`https://buy.stripe.com/...`), and paste it into `stripePaymentLink` in `donate-config.js`. The **Pay with card** button then opens Stripe instead of PayPal guest checkout.
