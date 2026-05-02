import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Article, Footer, Homepage, Navigation, SitePage } from "@payload-types";
import {
  getGlobalFooter,
  getGlobalHomepage,
  getGlobalNavigation,
  getPublishedArticles,
  getSitePages,
  isAbortError,
  payloadApiPrefix,
} from "../lib/payload/client";

type RouteKey = SitePage["routeKey"];

export type SitePayloadState = {
  homepage: Homepage | null;
  navigation: Navigation | null;
  footer: Footer | null;
  sitePagesByRoute: Partial<Record<RouteKey, SitePage>>;
  articles: Article[];
  /** Bumped when CMS signals new content — consumers refetch scoped data when this changes. */
  contentVersion: number;
  loading: boolean;
  error: string | null;
};

const defaultState: SitePayloadState = {
  homepage: null,
  navigation: null,
  footer: null,
  sitePagesByRoute: {},
  articles: [],
  contentVersion: 0,
  loading: true,
  error: null,
};

const CACHE_KEY = "psc_cms_v1";
/** CMS nie odpowiada → bez tego UI zostaje w loading na zawsze (fetch bez timeoutu). */
const CMS_BOOT_TIMEOUT_MS = 35_000;

type CacheShape = Pick<SitePayloadState, "homepage" | "navigation" | "footer" | "sitePagesByRoute" | "articles">;

function readCache(): CacheShape | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheShape;
  } catch {
    return null;
  }
}

function writeCache(data: CacheShape) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* storage quota or private-browsing restriction — silently skip */
  }
}

function cmsBootFailureMessage(): string {
  return `Ładowanie treści z CMS — brak odpowiedzi po ${Math.round(CMS_BOOT_TIMEOUT_MS / 1000)}s. Uruchom CMS (npm run dev:cms / port 3000) lub sprawdź proxy Vite.`;
}

const SitePayloadContext = createContext<SitePayloadState>(defaultState);

export function SitePayloadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SitePayloadState>(() => {
    const cached = readCache();
    if (cached) {
      /* Od razu pokaż cache; odświeżenie z CMS idzie w tle bez blokady „wiecznego ładowania”. */
      return { ...defaultState, ...cached, loading: false };
    }
    return defaultState;
  });
  const seenVersionRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let abortBootLoad: (() => void) | null = null;

    async function loadPayload(signal: AbortSignal): Promise<void> {
      try {
        /* depth 3: homepage + featured artykuły + heroImage; depth 4 site-pages jak w wcześniejszym ustawieniu. */
        const [homepage, navigation, footer, sitePages, articles] = await Promise.all([
          getGlobalHomepage(3, signal),
          getGlobalNavigation(1, signal),
          getGlobalFooter(1, signal),
          getSitePages(4, signal),
          getPublishedArticles(2, 200, signal),
        ]);
        if (cancelled || signal.aborted) return;
        const sitePagesByRoute: Partial<Record<RouteKey, SitePage>> = {};
        for (const p of sitePages) {
          sitePagesByRoute[p.routeKey] = p;
        }
        writeCache({ homepage, navigation, footer, sitePagesByRoute, articles });
        setState((prev) => ({
          ...prev,
          homepage,
          navigation,
          footer,
          sitePagesByRoute,
          articles,
          loading: false,
          error: null,
        }));
      } catch (e) {
        if (cancelled) return;
        const errorMsg =
          isAbortError(e) ? cmsBootFailureMessage()
          : e instanceof Error ? e.message
          : "Nie udało się załadować treści z CMS.";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMsg,
        }));
      }
    }

    /** Jedna próba bootstrapu z timeoutem — przerywa wiszące fetch(e), żeby zakładka nie „kręciła się” w nieskończoność. */
    async function loadPayloadWithBootTimeout(): Promise<void> {
      const ctrl = new AbortController();
      abortBootLoad = () => ctrl.abort();
      const tid = window.setTimeout(() => ctrl.abort(), CMS_BOOT_TIMEOUT_MS);
      try {
        await loadPayload(ctrl.signal);
      } finally {
        window.clearTimeout(tid);
        abortBootLoad = null;
      }
    }

    async function tickContentVersion(): Promise<void> {
      try {
        const prefix = payloadApiPrefix();
        const url = `${prefix}/content-version`;
        const ctrl = new AbortController();
        const tid = window.setTimeout(() => ctrl.abort(), 10_000);
        try {
          const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
          if (!res.ok || cancelled) return;
          const data = (await res.json()) as { version?: unknown };
          const version = typeof data.version === "number" ? data.version : 0;
          if (seenVersionRef.current === null) {
            seenVersionRef.current = version;
            setState((prev) => ({ ...prev, contentVersion: version }));
            return;
          }
          if (version !== seenVersionRef.current) {
            seenVersionRef.current = version;
            setState((prev) => ({ ...prev, contentVersion: version }));
            if (!cancelled) await loadPayloadWithBootTimeout();
          }
        } finally {
          window.clearTimeout(tid);
        }
      } catch {
        /* ignore transient poll failures */
      }
    }

    void (async () => {
      await loadPayloadWithBootTimeout();
      if (!cancelled) await tickContentVersion();
    })();

    const pollMs = 8000;
    const interval = window.setInterval(() => {
      if (cancelled || document.visibilityState !== "visible") return;
      void tickContentVersion();
    }, pollMs);

    const onVisibility = () => {
      if (!cancelled && document.visibilityState === "visible") void tickContentVersion();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      abortBootLoad?.();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <SitePayloadContext.Provider value={state}>{children}</SitePayloadContext.Provider>;
}

export function useSitePayload(): SitePayloadState {
  return useContext(SitePayloadContext);
}
