import type { Article, Footer, Homepage, Navigation, SitePage } from "@payload-types";

export function payloadApiPrefix(): string {
  return (import.meta.env.VITE_PAYLOAD_API_PREFIX as string | undefined)?.trim() || "/api";
}

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${payloadApiPrefix()}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Payload ${res.status} ${res.statusText}: ${url}`);
  }
  return res.json() as Promise<T>;
}

/** Unwrap globals if API ever wraps as `{ doc }`. */
function unwrapDoc<T>(json: unknown): T | null {
  if (!json || typeof json !== "object") return null;
  if ("doc" in json && json.doc && typeof json.doc === "object") return json.doc as T;
  return json as T;
}

function collectionDocs<T>(json: unknown): T[] {
  if (!json || typeof json !== "object") return [];
  if ("docs" in json && Array.isArray(json.docs)) return json.docs as T[];
  return [];
}

const publishedWhere = encodeURIComponent(JSON.stringify({ status: { equals: "published" } }));

export function mediaUrl(url: string | null | undefined): string | undefined {
  if (!url || typeof url !== "string") return undefined;
  const t = url.trim();
  if (!t) return undefined;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("/")) return t;
  return `${payloadApiPrefix().replace(/\/$/, "")}/${t.replace(/^\//, "")}`;
}

export async function getGlobalHomepage(depth = 2): Promise<Homepage | null> {
  try {
    const json = await fetchJson<unknown>(`/globals/homepage?depth=${depth}`);
    return unwrapDoc<Homepage>(json);
  } catch {
    return null;
  }
}

export async function getGlobalNavigation(depth = 1): Promise<Navigation | null> {
  try {
    const json = await fetchJson<unknown>(`/globals/navigation?depth=${depth}`);
    return unwrapDoc<Navigation>(json);
  } catch {
    return null;
  }
}

export async function getGlobalFooter(depth = 1): Promise<Footer | null> {
  try {
    const json = await fetchJson<unknown>(`/globals/footer?depth=${depth}`);
    return unwrapDoc<Footer>(json);
  } catch {
    return null;
  }
}

export async function getSitePages(depth = 3): Promise<SitePage[]> {
  try {
    const json = await fetchJson<unknown>(`/site-pages?limit=50&depth=${depth}`);
    return collectionDocs<SitePage>(json);
  } catch {
    return [];
  }
}

export async function getPublishedArticles(depth = 2, limit = 200): Promise<Article[]> {
  try {
    const json = await fetchJson<unknown>(
      `/articles?limit=${limit}&depth=${depth}&sort=-publishedAt&where=${publishedWhere}`,
    );
    return collectionDocs<Article>(json);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string, depth = 2): Promise<Article | null> {
  const where = encodeURIComponent(JSON.stringify({ slug: { equals: slug } }));
  try {
    const json = await fetchJson<unknown>(`/articles?limit=1&depth=${depth}&where=${where}`);
    const docs = collectionDocs<Article>(json);
    return docs[0] ?? null;
  } catch {
    return null;
  }
}
