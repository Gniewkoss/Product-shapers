import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type { Article as PayloadArticle } from "@payload-types";
import { ArticleNav, useArticleSectionTracker } from "../components/ArticleNav";
import { ArticleSectionBody } from "../components/ArticleSectionBody";
import { shapeUpScrumArticle } from "../content/articles/shape-up-scrum";
import type { ArticleDocument } from "../content/articleTypes";
import { useSitePayload } from "../context/SitePayloadContext";
import { getArticleBySlug, mediaUrl } from "../lib/payload/client";
import { mapPayloadArticleToDocument, mapPayloadArticlesToRelated } from "../lib/payload/mapArticle";
import { articles as articlesCatalog, type Article } from "./ArticlesMain";

const RELATED_COUNT = 2;

function sampleRelatedArticles(catalog: Article[], excludeSlug: string, count: number): Article[] {
  const pool = catalog.filter((a) => a.slug !== excludeSlug);
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

/** Distance from viewport top to TOC pin line (~ `110px + 1.5rem`) */
const TOC_VIEW_TOP_PX = 134;

const LG_MIN = "(min-width: 1024px)";

const GRAY_CLEAR_BELOW_PIN_PX = 8;
const GRAY_OVERLAP_UNPIN_PX = 40;

const FOOTER_SELECTOR = '[data-name="Footer"]';
const FOOTER_GAP_PX = 28;
const MIN_PINNED_HEIGHT_PX = 152;

function useDelayedTocPin(heroRef: RefObject<HTMLElement | null>) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(false);
  const [pinned, setPinned] = useState(false);
  const [placeholderH, setPlaceholderH] = useState(0);
  const [geom, setGeom] = useState({ left: 0, width: 166 });

  useEffect(() => {
    let raf = 0;

    const isLg = () => window.matchMedia(LG_MIN).matches;

    const footerTopPx = () => {
      const footer = document.querySelector(FOOTER_SELECTOR) as HTMLElement | null;
      return footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
    };

    const run = () => {
      if (!isLg()) {
        if (pinnedRef.current) {
          pinnedRef.current = false;
          setPinned(false);
        }
        return;
      }

      const anchor = anchorRef.current;
      const nav = navRef.current;
      const hero = heroRef.current;
      if (!anchor || !nav) return;

      const vh = window.innerHeight;
      const mid = vh * 0.5;
      const HYST = 56;

      const anchorR = anchor.getBoundingClientRect();
      const navR = nav.getBoundingClientRect();
      const heroBottom = hero?.getBoundingClientRect().bottom ?? -Infinity;

      const grayClearForPin =
        !hero || heroBottom <= TOC_VIEW_TOP_PX + GRAY_CLEAR_BELOW_PIN_PX;

      let next = pinnedRef.current;

      if (!next) {
        const cy = navR.top + navR.height / 2;
        if (grayClearForPin && navR.height > 8 && cy <= mid && navR.bottom > 120) {
          next = true;
          setPlaceholderH(nav.offsetHeight);
          setGeom({ left: anchorR.left, width: Math.max(navR.width, anchorR.width) });
        }
      } else {
        const footerTop = footerTopPx();
        const footerCap = footerTop - TOC_VIEW_TOP_PX - FOOTER_GAP_PX;
        const grayScrollBack =
          Boolean(hero) && heroBottom > TOC_VIEW_TOP_PX + GRAY_OVERLAP_UNPIN_PX;

        if (anchorR.top > mid + HYST) next = false;
        else if (grayScrollBack) next = false;
        else if (footerCap < MIN_PINNED_HEIGHT_PX) next = false;
      }

      if (next !== pinnedRef.current) {
        pinnedRef.current = next;
        setPinned(next);
      }
    };

    const loop = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(run);
    };

    const onResize = () => {
      if (!isLg()) return;
      const anchor = anchorRef.current;
      if (anchor && pinnedRef.current) {
        const ar = anchor.getBoundingClientRect();
        setGeom({ left: ar.left, width: ar.width });
      }
      loop();
    };

    run();
    window.addEventListener("scroll", loop, { passive: true });
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia(LG_MIN);
    mq.addEventListener("change", loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", loop);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", loop);
    };
  }, [heroRef]);

  return { anchorRef, navRef, pinned, placeholderH, geom };
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { articles: cmsList, contentVersion } = useSitePayload();

  const [article, setArticle] = useState<ArticleDocument | null>(null);
  const [payloadDoc, setPayloadDoc] = useState<PayloadArticle | null>(null);

  useEffect(() => {
    if (!slug) {
      setArticle(null);
      setPayloadDoc(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const doc = await getArticleBySlug(slug, 2);
      if (cancelled) return;
      if (doc) {
        setPayloadDoc(doc);
        setArticle(mapPayloadArticleToDocument(doc));
      } else {
        setPayloadDoc(null);
        setArticle(slug === "shape-up-scrum" ? shapeUpScrumArticle : null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, contentVersion]);

  const sectionIds = useMemo(() => article?.sections.map((s) => s.id) ?? [], [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    const byId = new Map((cmsList ?? []).map((d) => [String(d.id), d]));
    if (payloadDoc?.relatedArticles?.length) {
      return mapPayloadArticlesToRelated(payloadDoc.relatedArticles, byId, articlesCatalog).slice(0, RELATED_COUNT);
    }
    return sampleRelatedArticles(articlesCatalog, article.slug, RELATED_COUNT);
  }, [article, payloadDoc, cmsList]);

  const heroImageUrl =
    mediaUrl(
      typeof payloadDoc?.heroImage === "object" && payloadDoc.heroImage && "url" in payloadDoc.heroImage ?
        String((payloadDoc.heroImage as { url?: string }).url)
      : undefined,
    ) ?? undefined;

  const { activeId, scrollToSection } = useArticleSectionTracker(sectionIds);

  const heroRef = useRef<HTMLDivElement>(null);
  const { anchorRef, navRef, pinned, placeholderH, geom } = useDelayedTocPin(heroRef);

  if (!slug) {
    return <Navigate to="/artykuly" replace />;
  }

  if (!article) {
    return (
      <div className="flex min-h-[50vh] flex-col items-start gap-4 bg-white px-6 pb-24 pt-[140px]">
        <p className="font-sans text-[#000f3d]">Nie znaleziono artykułu.</p>
        <Link to="/artykuly" className="text-[#022169] underline">
          ← Wszystkie artykuły
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex w-full min-w-0 flex-col bg-white" data-name="Article page shell">
      <div className="relative flex w-full flex-col pt-[110px]">
        <div
          className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 pt-12 pb-24 sm:px-6 sm:pt-16 sm:pb-24 md:px-10 lg:px-[61px] lg:pt-[96px] lg:pb-24"
          data-name="Article(Desktop) - Brand Strict"
        >
          <header className="mb-8 w-full pb-10">
            <div className="relative grid w-full grid-cols-[repeat(12,minmax(0,1fr))] gap-x-8 gap-y-8">
              <div className="col-span-12 flex min-h-0 flex-col items-start gap-6 border-l-4 border-[#022169] pl-8 pr-0 sm:pl-8 lg:col-span-8 lg:max-w-[872px]">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-sans text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#005bb3]">
                    {article.categoryLabel}
                  </span>
                  <span className="font-sans text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#757682]">
                    {article.categoryMeta}
                  </span>
                </div>
                <h1 className="font-sans text-[40px] font-bold leading-tight text-[#000f3d] md:text-[64px] md:leading-[1.1] md:tracking-tight">
                  {article.title}
                </h1>
                <p className="max-w-[672px] text-[18px] leading-[27.5px] text-[#444651] md:text-[22px]">{article.excerpt}</p>
                <p className="font-sans text-[14px] text-[#757682]">
                  <Link to="/artykuly" className="text-[#022169] underline">
                    ← Wszystkie artykuły
                  </Link>
                </p>
              </div>
            </div>
          </header>

          <div
            ref={heroRef}
            className="relative mb-12 min-h-[200px] w-full overflow-hidden rounded-tr-[40px] bg-[#f3f3f3] md:min-h-[min(50vh,507px)] md:rounded-tr-[80px]"
            data-name="Section - Context & Hero Image"
            style={
              heroImageUrl ?
                {
                  backgroundImage: `url(${heroImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
            }
          >
            <div className="absolute inset-0 bg-[#000f3d]/10" />
          </div>

          <div className="article-layout w-full" data-name="Main Content Area">
            <div
              ref={anchorRef}
              className="order-2 hidden min-w-0 shrink-0 lg:order-1 lg:block lg:w-full lg:max-w-[166px] lg:self-start"
            >
              {pinned ?
                <div className="w-full shrink-0" style={{ height: placeholderH }} aria-hidden />
              : null}
              <div
                ref={navRef}
                className={
                  pinned ?
                    "overflow-visible bg-transparent pb-10 pt-1 motion-reduce:transition-none"
                  : "relative"
                }
                style={
                  pinned ?
                    {
                      position: "fixed",
                      top: "calc(110px + 1.5rem)",
                      left: geom.left,
                      width: geom.width,
                      zIndex: 20,
                    }
                  : undefined
                }
              >
                <ArticleNav sections={article.sections} activeId={activeId} onNavigate={scrollToSection} />
              </div>
            </div>

            <article className="order-1 min-w-0 w-full max-w-[662px] flex-1 lg:order-2" data-name="Article - Body Text">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-[7.5rem]"
                  aria-labelledby={`heading-${section.id}`}
                >
                  <h2 id={`heading-${section.id}`} className="sr-only">
                    {section.label} — {section.title}
                  </h2>
                  <ArticleSectionBody section={section} />
                </section>
              ))}
            </article>

            <div className="order-3 hidden min-h-0 w-full md:flex md:flex-col lg:order-3 lg:flex lg:h-full lg:min-h-0 lg:w-[265px] lg:max-w-[265px] lg:shrink-0">
              <aside className="sidebar-related motion-reduce:transition-none lg:pb-2">
                <h5 className="font-sans text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#000f3d]">
                  Inne artykuły
                </h5>
                <div className="sidebar-related-cards mt-6">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} to={`/artykuly/${a.slug}`} className="block no-underline">
                      <div className="h-40 w-full overflow-hidden bg-[#f3f3f3]">
                        {a.image ?
                          <img src={a.image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                        : <div className="h-full w-full bg-[#f3f3f3]" aria-hidden />}
                      </div>
                      <p className="mt-3 font-sans text-[16px] font-bold text-[#000f3d]">{a.title}</p>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
