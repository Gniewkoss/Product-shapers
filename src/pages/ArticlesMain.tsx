import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageBlocks } from "../components/cms/PageBlocks";
import { useSitePayload } from "../context/SitePayloadContext";
import type { PayloadLayoutBlock } from "../lib/payload/blockUtils";
import { mapPayloadArticleToListingCard } from "../lib/payload/mapArticle";

/** Hero wireframe images from Figma MCP asset URLs */
const imgArticlesWire =
  "https://www.figma.com/api/mcp/asset/e38a6720-dbbd-4d6e-af68-79ea126fbfd4";
const imgArticlesChart =
  "https://www.figma.com/api/mcp/asset/9ed5406d-b277-4e63-8a99-9e5155a806ef";

/** CMS-friendly category keys — filter UI maps labels to these */
export type ArticleCategoryKey = "methodology" | "management" | "case_studies";

const CATEGORY_LABELS: Record<ArticleCategoryKey, string> = {
  methodology: "Metodologie",
  management: "Zarządzanie",
  case_studies: "Case Studies",
};

const FILTER_ALL = "all" as const;
type FilterValue = typeof FILTER_ALL | ArticleCategoryKey;

const FILTER_TABS: { value: FilterValue; label: string }[] = [
  { value: FILTER_ALL, label: "Wszystkie" },
  { value: "methodology", label: CATEGORY_LABELS.methodology },
  { value: "management", label: CATEGORY_LABELS.management },
  { value: "case_studies", label: CATEGORY_LABELS.case_studies },
];

export type Article = {
  title: string;
  image?: string;
  excerpt: string;
  category: ArticleCategoryKey;
  slug: string;
  readingTime?: string;
  tone?: "light" | "dark" | "accent";
};

/** Listing + related-articles sidebar — single catalog */
export const articles: Article[] = [
  {
    slug: "shape-up-scrum",
    title: "Shape Up a Scrum: Hybrydowy model dowożenia.",
    excerpt:
      "Analiza połączenia elastyczności Scruma z dyscypliną Basecampowego Shape Up. Jak uniknąć niekończących się sprintów bez utraty zwinności?",
    category: "methodology",
    image: imgArticlesWire,
    readingTime: "12 min czytania",
    tone: "light",
  },
  {
    slug: "model-bettingu",
    title: "Model Bettingu w Produktach FinTech.",
    excerpt:
      'Dlaczego przewidywanie sukcesu funkcjonalności to czysta statystyka, a nie "wyczucie produktu"? Prezentujemy autorski framework wyceny ryzyka.',
    category: "case_studies",
    image: imgArticlesWire,
    readingTime: "15 min czytania",
    tone: "dark",
  },
  {
    slug: "dobre-praktyki",
    title: 'Kiedy "Dobre Praktyki" niszczą Twój produkt.',
    excerpt:
      "Analiza ślepego podążania za rynkowymi gigantami. Dlaczego model Spotify nie zadziała w Twoim 20-osobowym zespole?",
    category: "management",
    image: imgArticlesWire,
    readingTime: "10 min czytania",
    tone: "light",
  },
  {
    slug: "efektywnosc-zespolu",
    title: "Efektywność zespołu: Więcej niż Velocity.",
    excerpt:
      "Jak mierzyć to, co niemierzalne? Trzy kluczowe wskaźniki (Cycle Time, Throughput, Quality), które realnie wpływają na ROI.",
    category: "management",
    image: imgArticlesChart,
    readingTime: "10 min czytania",
    tone: "accent",
  },
  {
    slug: "discovery-architecture",
    title: "Discovery Architecture: Jak walidować pomysły przed budową.",
    excerpt: "Procesy discovery, które redukują koszt błędnych decyzji i przyspieszają time-to-value.",
    category: "methodology",
    image: imgArticlesChart,
    readingTime: "9 min czytania",
    tone: "light",
  },
  {
    slug: "pricing-engine",
    title: "Pricing Engine jako przewaga produktowa.",
    excerpt: "Case study z wdrożenia modułu wyceny, który podniósł marżę bez utraty konwersji.",
    category: "case_studies",
    image: imgArticlesWire,
    readingTime: "11 min czytania",
    tone: "dark",
  },
];

/**
 * Cyclical 12-column layout (one cycle = 11 cards, 6 rows):
 * Row 1: 1/3 + 2/3  → 4 + 8
 * Row 2: 1/2 + 1/2  → 6 + 6
 * Row 3: full       → 12
 * Row 4: 2/3 + 1/3  → 8 + 4
 * Row 5: 1/2 + 1/2  → 6 + 6
 * Row 6: 1/3 + 2/3  → 4 + 8
 */
const SPAN_CYCLE = [4, 8, 6, 6, 12, 8, 4, 6, 6, 4, 8] as const;

/**
 * Slot width for article at list index — always taken from the layout cycle only.
 * Incomplete final rows are allowed (empty space on the right); we never stretch
 * a lone card to full width to fill the row.
 */
function patternSpanForIndex(index: number): number {
  return SPAN_CYCLE[index % SPAN_CYCLE.length];
}

function mdColSpanClass(span: number): string {
  const map: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    9: "md:col-span-9",
    10: "md:col-span-10",
    11: "md:col-span-11",
    12: "md:col-span-12",
  };
  return map[span] ?? "md:col-span-12";
}

function ArticleCard({ article, colSpan }: { article: Article; colSpan: number }) {
  const tone = article.tone ?? "light";
  const toneClasses =
    tone === "dark"
      ? "article-card--dark"
      : tone === "accent"
        ? "article-card--accent"
        : "article-card--light";
  const categoryLabel = CATEGORY_LABELS[article.category];
  const spanClass = mdColSpanClass(colSpan);

  return (
    <article className={`article-card ${toneClasses} col-span-12 ${spanClass}`}>
      <div className="article-card__media-wrap">
        {article.image ? (
          <img
            className="article-card__media"
            src={article.image}
            alt={article.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="article-card__media article-card__media--placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="article-card__body">
        <div className="article-card__meta">
          <span className="article-card__category">{categoryLabel}</span>
          {article.readingTime ? (
            <span className="article-card__reading">{article.readingTime}</span>
          ) : null}
        </div>
        <h3 className="article-card__title">
          <Link to={`/artykuly/${article.slug}`} className="article-card__title-link">
            {article.title}
          </Link>
        </h3>
        <p className="article-card__excerpt">{article.excerpt}</p>
        <Link to={`/artykuly/${article.slug}`} className="article-card__cta">
          Czytaj artykuł →
        </Link>
      </div>
    </article>
  );
}

export function ArticlesMain() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(FILTER_ALL);
  const { articles: cmsArticles, sitePagesByRoute } = useSitePayload();
  const articlesLayout = sitePagesByRoute.articles?.layout as PayloadLayoutBlock[] | undefined;

  const catalogArticles = useMemo(() => {
    if (!cmsArticles?.length) return articles;
    const fb = new Map(articles.map((a) => [a.slug, a]));
    return cmsArticles.map((d) => {
      const card = mapPayloadArticleToListingCard(d, fb.get(d.slug));
      const fallback = fb.get(d.slug);
      return {
        title: card.title,
        slug: card.slug,
        excerpt: card.excerpt,
        category: card.category,
        image: card.image,
        readingTime: card.readingTime ?? fallback?.readingTime,
        tone: fallback?.tone ?? "light",
      } satisfies Article;
    });
  }, [cmsArticles]);

  const visibleArticles = useMemo(
    () =>
      activeFilter === FILTER_ALL ?
        catalogArticles
      : catalogArticles.filter((a) => a.category === activeFilter),
    [activeFilter, catalogArticles],
  );

  const spans = useMemo(
    () => visibleArticles.map((_, index) => patternSpanForIndex(index)),
    [visibleArticles],
  );

  return (
    <div className="content-stretch relative size-full flex flex-col items-start bg-white pb-[3.66px]" data-name="Articles(Desktop) - Brand Strict">
      <div className="content-stretch relative flex w-full shrink-0 flex-col items-start pt-[110px]" data-name="Main">
        <div className="w-full min-w-0 bg-white">
          <div className="relative mx-auto flex w-full min-w-0 max-w-content shrink-0 flex-col items-start bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]" data-name="Hero Section">
            <div className="relative grid w-full shrink-0 grid-cols-[repeat(12,minmax(0,1fr))] gap-x-8 gap-y-8">
              {articlesLayout?.length ?
                <PageBlocks layout={articlesLayout} />
              : <div className="col-span-12 flex min-h-0 shrink-0 flex-col items-start gap-6 border-l-4 border-[var(--dark-blue,#022169)] pl-8 pr-0 sm:pl-8 lg:col-span-8 lg:max-w-[872px]">
                  <div className="w-full font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] text-[#005bb3]">
                    <p className="leading-[16px]">Artykuły i analizy</p>
                  </div>
                  <div className="w-full max-w-[872px] font-['Satoshi:Bold',sans-serif] text-[40px] leading-tight text-[#000f3d] md:text-[64px] md:leading-[1.1] md:tracking-tight">
                    <p className="mb-0 leading-[1.1]">Merytoryczny</p>
                    <p className="leading-[1.1]">Content.</p>
                  </div>
                  <div className="w-full max-w-[672px] pt-[7px] text-[22px] text-[#444651]">
                    <p className="mb-0 leading-[27.5px]">Głębokie nurkowanie w procesy produktowe, architekturę zespołów</p>
                    <p className="leading-[27.5px]">i matematykę biznesu. Bez ogólników, tylko konkretne modele.</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <section className="relative mx-auto flex w-full min-w-0 max-w-content shrink-0 flex-col items-start gap-8 bg-white px-4 pb-[192px] pt-[96px] sm:px-6 md:px-10 lg:px-[61px]">
          <div className="w-full border-b border-[rgba(197,197,210,0.2)] pb-4">
            <div
              className="flex w-full max-w-[640px] flex-wrap items-center gap-x-8 gap-y-3"
              role="tablist"
              aria-label="Filtr kategorii artykułów"
            >
              {FILTER_TABS.map(({ value, label }) => {
                const active = activeFilter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(value)}
                    className={`border-0 bg-transparent p-0 font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] transition-colors duration-200 ${
                      active
                        ? "text-[#022169] underline decoration-solid [text-decoration-skip-ink:none]"
                        : "text-black"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="article-cycle-grid w-full" data-filter={activeFilter}>
            {visibleArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                colSpan={spans[index]!}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
