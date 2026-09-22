/**
 * Durable license-request origin. No secrets.
 *
 * The homepage POSTs JSON to workerUrl + /license-request (our Cloudflare Worker).
 * Stay on this site — success and errors show under the form.
 * This origin is our Worker only (no third-party form hosts, no trycloudflare).
 */
window.AVESTRA_LICENSE = {
  workerUrl: "https://avestra-license-queue.alinahmatov.workers.dev",
  requestPath: "/license-request",
  accessInstallUrl:
    "https://github.com/Alinahmatov/avestra-cloud-site/releases/latest/download/AvistraAccess.zip",
  // SHA-256 of the install-panel password (not the password). Prefer Worker/Access POST /unlock-access.
  accessInstallSha256: "6a7ae366aa7a9fa65603d1b3e4543cf71a692645436f5a94c50af7490a1390b3",
};
