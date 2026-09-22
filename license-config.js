/**
 * Durable license-request endpoints. No secrets.
 *
 * workerUrl: Cloudflare Worker origin after `npx wrangler deploy` in control_plane/
 *            (https://avestra-access.<account>.workers.dev or https://api.avestra.online).
 *            Leave empty until that Worker exists.
 *
 * accessUrl: Optional live Avistra Access origin (https://….trycloudflare.com).
 *            This hostname changes whenever Access restarts the quick tunnel.
 *            Copy it from Access → Copy request URL, then paste the origin only
 *            (no /license-request suffix) if the Worker is not deployed yet.
 *
 * If both are empty, the form falls back to FormSubmit email so the live Pages
 * site still accepts requests. The Developer then still approves in Access after the
 * Worker/Access URL is configured.
 */
window.AVESTRA_LICENSE = {
  workerUrl: "",
  accessUrl: "",
  thanksUrl: "https://www.avestra.online/thanks.html",
};
