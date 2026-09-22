# Avestra Cloud

Public marketing site for **Avestra Cloud** — indie local-AI surveillance for Windows. Faces, objects, action journal, people database.

**Live site:** [https://www.avestra.online](https://www.avestra.online) (GitHub Pages)

Typing **avestra.online** in a browser does not work until Spaceship Advanced DNS has GitHub Pages **A** records on the apex. `www` already works. This repo’s Pages `CNAME` file is `www.avestra.online` (canonical). GitHub only allows one name in that file; after the apex A records exist, GitHub issues HTTPS for **both** names and 301s `https://avestra.online` → `https://www.avestra.online`.

This repository is the website only. It does not include the Windows app, models, secrets, or personal configuration.

## DNS (Spaceship Advanced DNS — do this so `avestra.online` works)

Do **not** use Spaceship Unbox for the root host. Unbox rejected `@`. Use the same **Advanced DNS** screen that already has the `www` CNAME.

Nameservers are `launch1.spaceship.net` / `launch2.spaceship.net`. GitHub Pages official apex targets (confirmed from GitHub docs): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

### Delete if present

Any apex **A** / **AAAA** / URL-redirect / parking rows whose value is **not** a GitHub IP below. Old parking was `34.216.117.25` and `54.149.79.189` (HTTPS timeout). Do **not** add a **CNAME** on the apex.

### Add (apex / root) — four A records

Host is the root. In Advanced DNS that is **`@`**. If the Host box will not save `@`, leave Host **empty**. Do **not** type `avestra.online` in Host (that creates `avestra.online.avestra.online`).

| Host | Type | Value (Answer / Points to) | TTL |
| --- | --- | --- | --- |
| `@` (or blank) | A | `185.199.108.153` | Auto or 1800 |
| `@` (or blank) | A | `185.199.109.153` | Auto or 1800 |
| `@` (or blank) | A | `185.199.110.153` | Auto or 1800 |
| `@` (or blank) | A | `185.199.111.153` | Auto or 1800 |

### Optional AAAA (IPv6, same GitHub anycast)

| Host | Type | Value |
| --- | --- | --- |
| `@` (or blank) | AAAA | `2606:50c0:8000::153` |
| `@` (or blank) | AAAA | `2606:50c0:8001::153` |
| `@` (or blank) | AAAA | `2606:50c0:8002::153` |
| `@` (or blank) | AAAA | `2606:50c0:8003::153` |

### Keep (already live)

| Host | Type | Value |
| --- | --- | --- |
| `www` | CNAME | `alinahmatov.github.io` |

If Advanced DNS offers **ALIAS** / **ANAME** on `@` → `alinahmatov.github.io`, that can replace the four A records. Prefer the four **A** rows (GitHub’s documented layout). Do not use a registrar “URL redirect” for the apex — that is the parking HTTPS failure.

### After save

Wait for DNS (often minutes; TTL was 1800s). `nslookup avestra.online` should show those four `185.199…` addresses, not NXDOMAIN and not the old parking IPs. Then `http://avestra.online` and `https://avestra.online` should reach this site (GitHub 301 to www). If apex HTTPS is still wrong after a few hours, GitHub repo **Settings → Pages**: save custom domain `www.avestra.online` again with **Enforce HTTPS** on. Do not clear the custom domain.

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
