/**
 * Generuje public/_redirects dla Netlify (proxy CMS pod /admin, /api, /media).
 * Ustaw CMS_ORIGIN=https://twoj-backend.railway.app (bez końcowego /).
 * Bez CMS_ORIGIN — tylko fallback SPA (localhost / preview bez API).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pub = path.join(root, "public");
const outFile = path.join(pub, "_redirects");

const cmsOrigin = (process.env.CMS_ORIGIN ?? "").trim().replace(/\/$/, "");

if (!fs.existsSync(pub)) {
  fs.mkdirSync(pub, { recursive: true });
}

let body = "";

if (cmsOrigin) {
  body += `# Proxied z CMS_ORIGIN (${cmsOrigin}) — adres w przeglądarce pozostaje domeną Netlify\n`;
  body += `/api/*\t${cmsOrigin}/api/:splat\t200\n`;
  body += `/admin\t${cmsOrigin}/admin\t200\n`;
  body += `/admin/*\t${cmsOrigin}/admin/:splat\t200\n`;
  body += `/media/*\t${cmsOrigin}/media/:splat\t200\n`;
  console.info("[netlify] CMS_ORIGIN:", cmsOrigin, "→ public/_redirects (proxy)");
} else {
  console.warn("[netlify] CMS_ORIGIN nie ustawione — tylko SPA fallback (brak /api z produkcji)");
}

body += `/*\t/index.html\t200\n`;

fs.writeFileSync(outFile, body, "utf8");
