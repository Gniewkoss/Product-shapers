/**
 * Generuje public/_redirects dla Netlify.
 *
 * - `/admin` → zewnętrzny CMS (301), żeby productshapers.pl/admin nie proxy’owało Panelu Payload pod tą samą domeną.
 * - `/api/*`, `/media/*` → proxy do CMS_ORIGIN (200), jeśli ustawione.
 *
 * CMS_ORIGIN=https://twoj-backend.onrender.com (bez końcowego /).
 * Opcjonalnie ADMIN_REDIRECT_URL — pełny URL panelu (domyślnie `${CMS_ORIGIN}/admin`).
 * Bez CMS_ORIGIN — opcjonalnie tylko ADMIN_REDIRECT_URL dla /admin; zawsze SPA fallback na końcu.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pub = path.join(root, "public");
const outFile = path.join(pub, "_redirects");

const cmsOrigin = (process.env.CMS_ORIGIN ?? "").trim().replace(/\/$/, "");
const adminRedirectRaw = (process.env.ADMIN_REDIRECT_URL ?? "").trim().replace(/\/$/, "");
const adminRedirectBase =
  adminRedirectRaw ? adminRedirectRaw
  : cmsOrigin ? `${cmsOrigin}/admin`
  : "";

if (!fs.existsSync(pub)) {
  fs.mkdirSync(pub, { recursive: true });
}

let body = "";

if (adminRedirectBase) {
  body += `# /admin -> Payload admin (301, not reverse-proxy on marketing domain)\n`;
  body += `/admin\t${adminRedirectBase}\t301!\n`;
  body += `/admin/*\t${adminRedirectBase}/:splat\t301!\n`;
}

if (cmsOrigin) {
  body += `# Proxy: CMS_ORIGIN (${cmsOrigin})\n`;
  body += `/api/*\t${cmsOrigin}/api/:splat\t200\n`;
  body += `/media/*\t${cmsOrigin}/media/:splat\t200\n`;
  console.info("[netlify] CMS_ORIGIN:", cmsOrigin, "→ public/_redirects (api/media proxy + admin redirect)");
} else if (!adminRedirectBase) {
  console.warn("[netlify] CMS_ORIGIN nie ustawione — tylko SPA fallback (brak /api z produkcji)");
}

body += `/*\t/index.html\t200\n`;

fs.writeFileSync(outFile, body, "utf8");
