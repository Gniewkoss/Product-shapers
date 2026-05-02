import type { Article, Footer, Homepage, Navigation, SitePage } from "@payload-types";

export function payloadApiPrefix(): string {
  return (import.meta.env.VITE_PAYLOAD_API_PREFIX as string | undefined)?.trim() || "/api";
}

export function isAbortError(e: unknown): boolean {
  return (
    (typeof DOMException !== "undefined" && e instanceof DOMException && e.name === "AbortError") ||
    (e instanceof Error && e.name === "AbortError")
  );
}

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const url = `${payloadApiPrefix()}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, { cache: "no-store", signal });
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

/** Legacy seed used this Figma asset as `portraitUrl` — it’s a silhouette overlay, not a real portrait (shows as a duplicate „ghost“ under CMS uploads). */
const LEGACY_FOUNDER_SILHOUETTE_ID = "3ba9cf8c-ddf2-4c37-87ed-e115260701a9";

export function isLegacyFounderSilhouetteAssetUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  return url.includes(LEGACY_FOUNDER_SILHOUETTE_ID);
}

/** Resolved absolute `/api…` URL and optional alt when Payload populated an upload field (`depth` ≥ 1). */
export function uploadRefMedia(ref: unknown): { url?: string; alt?: string } {
  if (!ref || typeof ref !== "object") return {};
  const r = ref as { url?: unknown; alt?: unknown };
  const rawUrl = typeof r.url === "string" ? r.url : undefined;
  const alt = typeof r.alt === "string" ? r.alt.trim() || undefined : undefined;
  const url = mediaUrl(rawUrl);
  return url ? { url, alt } : {};
}

/** Community band: prefer uploaded media; fall back to legacy URL array. */
export function resolveCommunityBackgroundUrls(homepage: Homepage | null | undefined): string[] | undefined {
  if (!homepage) return undefined;
  const photos = homepage.communityBackgroundPhotos;
  if (Array.isArray(photos) && photos.length > 0) {
    const fromUploads = photos
      .map((ref) => (typeof ref === "object" && ref ? uploadRefMedia(ref).url : undefined))
      .filter((u): u is string => Boolean(u));
    if (fromUploads.length > 0) return fromUploads;
  }
  const legacy =
    homepage.communityBgUrls
      ?.map((row) => row.url?.trim())
      .filter((u): u is string => Boolean(u)) ?? [];
  return legacy.length > 0 ? legacy : undefined;
}

export async function getGlobalHomepage(depth = 2, signal?: AbortSignal): Promise<Homepage | null> {
  try {
    const json = await fetchJson<unknown>(`/globals/homepage?depth=${depth}`, signal);
    return unwrapDoc<Homepage>(json);
  } catch (e) {
    if (isAbortError(e)) throw e;
    return null;
  }
}

export async function getGlobalNavigation(depth = 1, signal?: AbortSignal): Promise<Navigation | null> {
  try {
    const json = await fetchJson<unknown>(`/globals/navigation?depth=${depth}`, signal);
    return unwrapDoc<Navigation>(json);
  } catch (e) {
    if (isAbortError(e)) throw e;
    return null;
  }
}

export async function getGlobalFooter(depth = 1, signal?: AbortSignal): Promise<Footer | null> {
  try {
    const json = await fetchJson<unknown>(`/globals/footer?depth=${depth}`, signal);
    return unwrapDoc<Footer>(json);
  } catch (e) {
    if (isAbortError(e)) throw e;
    return null;
  }
}

export async function getSitePages(depth = 3, signal?: AbortSignal): Promise<SitePage[]> {
  try {
    const json = await fetchJson<unknown>(`/site-pages?limit=50&depth=${depth}`, signal);
    return collectionDocs<SitePage>(json);
  } catch (e) {
    if (isAbortError(e)) throw e;
    return [];
  }
}

export async function getPublishedArticles(depth = 2, limit = 200, signal?: AbortSignal): Promise<Article[]> {
  try {
    const json = await fetchJson<unknown>(
      `/articles?limit=${limit}&depth=${depth}&sort=-publishedAt&where=${publishedWhere}`,
      signal,
    );
    return collectionDocs<Article>(json);
  } catch (e) {
    if (isAbortError(e)) throw e;
    return [];
  }
}

export async function getArticleBySlug(slug: string, depth = 2, signal?: AbortSignal): Promise<Article | null> {
  const where = encodeURIComponent(JSON.stringify({ slug: { equals: slug } }));
  try {
    const json = await fetchJson<unknown>(`/articles?limit=1&depth=${depth}&where=${where}`, signal);
    const docs = collectionDocs<Article>(json);
    return docs[0] ?? null;
  } catch (e) {
    if (isAbortError(e)) throw e;
    return null;
  }
}
