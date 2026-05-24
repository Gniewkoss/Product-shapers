/**
 * Prebuild: pobiera wszystkie dane z CMS i zapisuje do public/cms-data.json.
 * Frontend ładuje ten plik natychmiast z CDN Netlify (~100ms) bez zależności od stanu Render.
 * Uruchamiany przed vite build w ramach build:netlify.
 *
 * Wymagane env: CMS_ORIGIN=https://product-shapers-cms.onrender.com
 * Jeśli nie ustawione — skrypt kończy się bez błędu (graceful skip, brak pliku).
 */
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const CMS = (process.env.CMS_ORIGIN ?? "").trim().replace(/\/$/, "");

if (!CMS) {
  console.warn("[fetch-cms-data] CMS_ORIGIN nie ustawiony — pomijam (dane będą pobierane runtime)");
  process.exit(0);
}

const publishedWhere = encodeURIComponent(JSON.stringify({ status: { equals: "published" } }));

/**
 * Fetch z retry i długim timeoutem — Render free może potrzebować ~60s na cold start.
 * Przy każdej próbie czeka dłużej (8s, 16s, 24s…).
 */
async function fetchWithRetry(label, url, retries = 3, timeoutMs = 90_000) {
  for (let i = 0; i < retries; i++) {
    try {
      if (i > 0) console.log(`[fetch-cms-data] ${label}: próba ${i + 1}/${retries}…`);
      else console.log(`[fetch-cms-data] GET ${label}`);
      const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      const wait = 8000 * (i + 1);
      console.warn(`[fetch-cms-data] ${label} nie odpowiada (${e.message}), ponawiam za ${wait / 1000}s…`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

console.log(`\n[fetch-cms-data] Łączenie z CMS: ${CMS}\n`);

const [homepage, navigation, footer, sitePages, articles] = await Promise.all([
  fetchWithRetry("homepage", `${CMS}/api/globals/homepage?depth=3`),
  fetchWithRetry("navigation", `${CMS}/api/globals/navigation?depth=1`),
  fetchWithRetry("footer", `${CMS}/api/globals/footer?depth=1`),
  fetchWithRetry("site-pages", `${CMS}/api/site-pages?limit=50&depth=4`),
  fetchWithRetry("articles", `${CMS}/api/articles?limit=200&depth=2&sort=-publishedAt&where=${publishedWhere}`),
]);

const pub = path.join(root, "public");
if (!existsSync(pub)) mkdirSync(pub, { recursive: true });

const outFile = path.join(pub, "cms-data.json");
writeFileSync(
  outFile,
  JSON.stringify({ homepage, navigation, footer, sitePages, articles, _fetchedAt: Date.now() }),
);

console.log(`\n[fetch-cms-data] Zapisano dane build-time → ${outFile} ✓\n`);
