# Avestra Cloud

Public marketing site for **Avestra Cloud** — indie local-AI surveillance for Windows. Faces, objects, action journal, people database.

**Live site:** [https://www.avestra.online](https://www.avestra.online)

The apex `avestra.online` is still Spaceship parking until A records can be added outside Unbox. Use **www**. GitHub Pages hosts this site.

This repository is the website only. It does not include the Windows app, models, secrets, or personal configuration.

## Download / Install

The homepage has a **Download / Install** button for `AvestraCloud-Setup.exe`. The binary is a GitHub Release asset (too large for Pages). Latest:

[https://github.com/Alinahmatov/avestra-cloud-site/releases/latest/download/AvestraCloud-Setup.exe](https://github.com/Alinahmatov/avestra-cloud-site/releases/latest/download/AvestraCloud-Setup.exe)

Installing the exe does **not** create an account. Sign-in still needs a valid active license issued by Alin in Avestra Access (Access URL, nickname, password, license key). Expired licenses cannot sign in.

**Uninstall:** There is no separate uninstall download (do not upload another ~338MB file). After install, people remove it from Windows Settings → Apps → Avestra Cloud, or Start Menu → Avestra Cloud → Uninstall Avestra Cloud, or `Uninstall.exe` in the install folder. Program files go away. Local people/logs stay unless they check “Also remove local data”. Do not put `%USERPROFILE%\.aegis_monitor` on GitHub.

Do not commit the Setup.exe into this Pages repo.

The contact form remains for people who need a license or another copy. It does not email keys automatically.

The Android app is a **secondary standalone client** (phone camera, on-device detection). It is sideloaded from Avestra Cloud on Windows, not from this Pages site. Do not commit APKs here.

## Donate

The homepage has a **Donate** section (also in the nav, hero, and footer). Checkout is hosted off-site. No secret keys belong in this repo.

**PayPal** uses a hosted Donate page to `alii.nahmatov@gmail.com` (`donate-config.js` → `paypalBusinessEmail`). PayPal Donate also accepts credit/debit cards as a guest for many accounts.

Optional, if you want different PayPal routing later (do not invent a paypal.me username):

1. Create a [PayPal Donate button](https://www.paypal.com/buttons/) and paste the hosted button ID into `paypalHostedButtonId`, **or**
2. Create a real [paypal.me](https://www.paypal.me/) link and paste the full URL into `paypalMeUrl`.

**Stripe (optional card checkout):** no Stripe secret keys. In the Stripe Dashboard create a [Payment Link](https://dashboard.stripe.com/payment-links), copy the public URL (`https://buy.stripe.com/...`), and paste it into `stripePaymentLink` in `donate-config.js`. The **Pay with card** button then opens Stripe instead of PayPal guest checkout.
