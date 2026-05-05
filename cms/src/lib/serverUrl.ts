/**
 * Public base URL of this Payload instance (REST + admin). It must match the host you use to open `/admin`.
 *
 * Render sets `RENDER_EXTERNAL_URL` to this service. `PAYLOAD_PUBLIC_SERVER_URL` is often the **marketing**
 * Netlify domain — using that as `serverURL` while opening admin on `*.onrender.com` breaks the admin UI (404-style errors).
 *
 * Override order:
 * 1. `PAYLOAD_SERVER_URL` — explicit canonical CMS URL (recommended on Render).
 * 2. If `PAYLOAD_USE_MARKETING_SERVER_URL=true`, use `PAYLOAD_PUBLIC_SERVER_URL` (legacy: admin proxied on marketing host).
 * 3. If both marketing URL and Render URL exist and differ → default to **Render** (direct admin on Render).
 * 4. Else `PAYLOAD_PUBLIC_SERVER_URL`, else `RENDER_EXTERNAL_URL`, else localhost.
 */
export function trimServerUrl(u: string | undefined): string {
  return (u ?? "").trim().replace(/\/$/, "");
}

export function resolvePayloadServerURL(): string {
  const explicit = trimServerUrl(process.env.PAYLOAD_SERVER_URL);
  if (explicit) return explicit;

  const pub = trimServerUrl(process.env.PAYLOAD_PUBLIC_SERVER_URL);
  const render = trimServerUrl(process.env.RENDER_EXTERNAL_URL);
  const preferMarketing = process.env.PAYLOAD_USE_MARKETING_SERVER_URL === "true";

  if (preferMarketing && pub) return pub;
  if (!preferMarketing && pub && render && pub !== render) return render;
  if (pub) return pub;
  if (render) return render;
  return "http://localhost:3000";
}
