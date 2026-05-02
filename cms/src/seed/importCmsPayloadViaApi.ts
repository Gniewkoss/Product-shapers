import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { seedHomepage } from "./seedData.js";
import { seedSitePagesByRoute } from "./sitePagesSeed.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const cmsRoot = path.resolve(scriptDir, "..", "..");
for (const envPath of [path.join(cmsRoot, ".env"), path.join(cmsRoot, ".env.local")]) {
  if (fs.existsSync(envPath)) {
    const parsed = dotenv.parse(fs.readFileSync(envPath, "utf8"));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined || process.env[key] === "") {
        process.env[key] = value;
      }
    }
  }
}

type JsonRecord = Record<string, unknown>;

type CmsImportPayload = {
  globals?: {
    navigation?: JsonRecord;
    homepage?: JsonRecord;
    footer?: JsonRecord;
    "seo-defaults"?: JsonRecord;
  };
  collections?: {
    "site-pages"?: JsonRecord[];
    articles?: JsonRecord[];
  };
};

const baseUrl = process.env.PAYLOAD_BASE_URL?.trim() || "http://localhost:3000";
const payloadFilePath =
  process.env.PAYLOAD_IMPORT_FILE?.trim() || path.resolve(process.cwd(), "src/seed/cms-api-payload.json");

const apiToken = process.env.PAYLOAD_API_TOKEN?.trim();
const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL?.trim();
const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD?.trim();

function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing or invalid string field: ${field}`);
  }
  return value.trim();
}

/**
 * Local seed / hand-written JSON often uses `{ blockType, heroBand: { ... } }`.
 * Payload REST create/update expects flat `{ blockType, ...heroBandFields }`.
 */
function normalizeLayoutBlockForRestApi(block: JsonRecord): JsonRecord {
  const bt = block.blockType;
  if (typeof bt !== "string") return block;
  const nested = block[bt];
  if (!nested || typeof nested !== "object" || Array.isArray(nested)) return block;
  const out: JsonRecord = { ...nested, blockType: bt };
  if (typeof block.id === "string") out.id = block.id;
  if (typeof block.blockName === "string") out.blockName = block.blockName;
  return out;
}

function normalizeSitePageForRestApi(page: JsonRecord): JsonRecord {
  const layout = page.layout;
  if (!Array.isArray(layout)) return page;
  return {
    ...page,
    layout: layout.map((b) => normalizeLayoutBlockForRestApi(b as JsonRecord)),
  };
}

function normalizeHomepageGlobalForRestApi(data: JsonRecord): JsonRecord {
  const out = { ...data };
  for (const key of ["homeTailLayout", "homeContinuationLayout"]) {
    const arr = out[key];
    if (Array.isArray(arr)) {
      out[key] = arr.map((b) => normalizeLayoutBlockForRestApi(b as JsonRecord));
    }
  }
  return out;
}

async function apiRequest(
  authorization: string,
  endpoint: string,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", authorization);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return fetch(`${baseUrl}${endpoint}`, { ...init, headers });
}

/** Payload REST: JWT uses `Bearer`; user API keys use `users API-Key <key>`. */
async function getAuthorizationHeader(): Promise<string> {
  if (apiToken) return `users API-Key ${apiToken}`;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Set PAYLOAD_API_TOKEN or both PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD.",
    );
  }

  const res = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { token?: string };
  if (!json.token) throw new Error("Login succeeded but token missing in response.");
  return `Bearer ${json.token}`;
}

async function upsertSitePage(authorization: string, page: JsonRecord) {
  const routeKey = requireString(page.routeKey, "site-pages[].routeKey");
  const body = normalizeSitePageForRestApi(page);
  const query = `/api/site-pages?where[routeKey][equals]=${encodeURIComponent(routeKey)}&limit=1`;
  const findRes = await apiRequest(authorization, query, { method: "GET" });
  if (!findRes.ok) {
    throw new Error(`Failed checking site-page "${routeKey}" (${findRes.status}).`);
  }
  const found = (await findRes.json()) as { docs?: Array<{ id: string | number }> };

  if (found.docs?.length) {
    const id = found.docs[0]!.id;
    const patchRes = await apiRequest(authorization, `/api/site-pages/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    if (!patchRes.ok) {
      const errText = await patchRes.text();
      throw new Error(`Failed updating site-page "${routeKey}" (${patchRes.status}): ${errText}`);
    }
    console.info(`[import] updated site-page: ${routeKey}`);
    return;
  }

  const createRes = await apiRequest(authorization, "/api/site-pages", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed creating site-page "${routeKey}" (${createRes.status}): ${errText}`);
  }
  console.info(`[import] created site-page: ${routeKey}`);
}

async function upsertArticle(authorization: string, article: JsonRecord) {
  const slug = requireString(article.slug, "articles[].slug");
  const query = `/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`;
  const findRes = await apiRequest(authorization, query, { method: "GET" });
  if (!findRes.ok) {
    throw new Error(`Failed checking article "${slug}" (${findRes.status}).`);
  }
  const found = (await findRes.json()) as { docs?: Array<{ id: string | number }> };

  if (found.docs?.length) {
    const id = found.docs[0]!.id;
    const patchRes = await apiRequest(authorization, `/api/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(article),
    });
    if (!patchRes.ok) {
      throw new Error(`Failed updating article "${slug}" (${patchRes.status}).`);
    }
    console.info(`[import] updated article: ${slug}`);
    return;
  }

  const createRes = await apiRequest(authorization, "/api/articles", {
    method: "POST",
    body: JSON.stringify(article),
  });
  if (!createRes.ok) {
    throw new Error(`Failed creating article "${slug}" (${createRes.status}).`);
  }
  console.info(`[import] created article: ${slug}`);
}

async function updateGlobal(authorization: string, slug: string, data: JsonRecord) {
  /** Payload REST: globals update is `POST /api/globals/:slug`, not PATCH. */
  const res = await apiRequest(authorization, `/api/globals/${slug}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed updating global "${slug}" (${res.status}): ${text}`);
  }
  console.info(`[import] updated global: ${slug}`);
}

async function run() {
  if (!fs.existsSync(payloadFilePath)) {
    throw new Error(`Payload file not found: ${payloadFilePath}`);
  }

  const raw = fs.readFileSync(payloadFilePath, "utf8");
  const payload = JSON.parse(raw) as CmsImportPayload;
  const authorization = await getAuthorizationHeader();

  if (payload.globals?.navigation) await updateGlobal(authorization, "navigation", payload.globals.navigation);
  /** Merge file overrides onto canonical seed so homepage blocks stay complete without duplicating JSON. */
  const mergedHomepage = {
    ...seedHomepage,
    ...(payload.globals?.homepage ?? {}),
  } as JsonRecord;
  await updateGlobal(authorization, "homepage", normalizeHomepageGlobalForRestApi(mergedHomepage));
  if (payload.globals?.footer) await updateGlobal(authorization, "footer", payload.globals.footer);
  if (payload.globals?.["seo-defaults"]) {
    await updateGlobal(authorization, "seo-defaults", payload.globals["seo-defaults"]);
  }

  const sitePages = payload.collections?.["site-pages"] ?? [];
  const byRoute = Object.fromEntries(
    sitePages.map((p) => [requireString((p as JsonRecord).routeKey, "routeKey"), p as JsonRecord]),
  );

  for (const routeKey of Object.keys(seedSitePagesByRoute) as (keyof typeof seedSitePagesByRoute)[]) {
    const fromFile = byRoute[routeKey];
    const seedLayout = seedSitePagesByRoute[routeKey] as JsonRecord[];
    const fileLayout = fromFile?.layout;
    const fileLen = Array.isArray(fileLayout) ? fileLayout.length : 0;
    const seedLen = seedLayout.length;
    const layout = fileLen >= seedLen ? fileLayout : seedLayout;
    await upsertSitePage(authorization, { routeKey, layout });
  }

  const articles = payload.collections?.articles ?? [];
  for (const article of articles) {
    await upsertArticle(authorization, article);
  }

  console.info("[import] done");
}

await run();
