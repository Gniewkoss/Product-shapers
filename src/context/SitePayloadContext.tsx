import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Article, Footer, Homepage, Navigation, SitePage } from "@payload-types";
import {
  getGlobalFooter,
  getGlobalHomepage,
  getGlobalNavigation,
  getPublishedArticles,
  getSitePages,
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

const SitePayloadContext = createContext<SitePayloadState>(defaultState);

export function SitePayloadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SitePayloadState>(defaultState);
  const seenVersionRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPayload(): Promise<void> {
      try {
        const [homepage, navigation, footer, sitePages, articles] = await Promise.all([
          getGlobalHomepage(3),
          getGlobalNavigation(1),
          getGlobalFooter(1),
          getSitePages(3),
          getPublishedArticles(2, 200),
        ]);
        if (cancelled) return;
        const sitePagesByRoute: Partial<Record<RouteKey, SitePage>> = {};
        for (const p of sitePages) {
          sitePagesByRoute[p.routeKey] = p;
        }
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
        setState({
          ...defaultState,
          loading: false,
          error: e instanceof Error ? e.message : "Nie udało się załadować treści z CMS.",
        });
      }
    }

    async function tickContentVersion(): Promise<void> {
      try {
        const prefix = payloadApiPrefix();
        const url = `${prefix}/content-version`;
        const res = await fetch(url, { cache: "no-store" });
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
          await loadPayload();
        }
      } catch {
        /* ignore transient poll failures */
      }
    }

    void (async () => {
      await loadPayload();
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
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <SitePayloadContext.Provider value={state}>{children}</SitePayloadContext.Provider>;
}

export function useSitePayload(): SitePayloadState {
  return useContext(SitePayloadContext);
}
