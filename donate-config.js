/**
 * Public donate settings only. No secret keys.
 *
 * PayPal: hosted Donate page. Funds go to paypalBusinessEmail unless you
 * set paypalHostedButtonId (from paypal.com/buttons) or paypalMeUrl.
 * Do not invent a paypal.me username — leave paypalMeUrl empty until you
 * create one in PayPal and paste the real URL.
 *
 * Cards: PayPal Donate already accepts debit/credit as guest for many
 * accounts. For a dedicated card checkout, create a Stripe Payment Link
 * (Dashboard → Payment Links) and paste the public URL below.
 */
window.AVESTRA_DONATE = {
  paypalBusinessEmail: "alii.nahmatov@gmail.com",
  paypalHostedButtonId: "",
  paypalMeUrl: "",
  stripePaymentLink: "",
  itemName: "Avistra Cloud",
  currency: "USD",
};
