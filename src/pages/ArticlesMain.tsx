import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSitePayload } from "../context/SitePayloadContext";
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

function lgColSpanClass(span: number): string {
  const map: Record<number, string> = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
    9: "lg:col-span-9",
    10: "lg:col-span-10",
    11: "lg:col-span-11",
    12: "lg:col-span-12",
  };
  return map[span] ?? "lg:col-span-12";
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
  const spanClass = lgColSpanClass(colSpan);

  return (
    <article className={`article-card ${toneClasses} col-span-1 ${spanClass}`}>
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
  const { articles: cmsArticles } = useSitePayload();

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
    <div className="relative w-full min-w-0 bg-white">
      <div className="relative flex w-full flex-col items-start pt-[80px] sm:pt-[88px]">

        {/* Hero */}
        <div className="w-full min-w-0 border-b border-[rgba(197,197,210,0.25)] bg-white">
          <div className="mx-auto w-full min-w-0 max-w-content px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[61px] lg:py-24">
            <div className="flex min-h-0 min-w-0 max-w-[820px] flex-col items-start gap-5 border-l-[3px] border-[#022169] pl-7 sm:pl-8">
              <p className="m-0 font-sans font-bold text-[14px] uppercase tracking-[0.08em] text-[#0083fe]">
                Artykuły i analizy
              </p>
              <h1 className="m-0 font-sans font-bold text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.08] text-[#000f3d]">
                Merytoryczny Content.
              </h1>
              <p className="m-0 max-w-[600px] font-serif text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.65] text-[#444651]">
                Głębokie nurkowanie w procesy produktowe, architekturę zespołów i matematykę biznesu. Bez ogólników, tylko konkretne modele.
              </p>
            </div>
          </div>
        </div>

        {/* Filter + grid */}
        <section className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-8 bg-white px-4 pb-24 pt-10 sm:px-6 sm:pb-28 md:px-10 lg:px-[61px]">
          <div className="w-full border-b border-[rgba(197,197,210,0.25)] pb-3">
            <div
              className="flex w-full flex-wrap items-center gap-x-1 gap-y-1"
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
                    className={`inline-flex min-h-[40px] items-center rounded-[8px] px-3 py-2 font-sans font-bold text-[14px] tracking-[0.04em] transition-colors duration-150 sm:text-[15px] ${
                      active
                        ? "bg-[#022169]/[0.07] text-[#022169]"
                        : "text-[#444] hover:bg-black/[0.04] hover:text-[#022169]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="article-cycle-grid w-full">
            {visibleArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} colSpan={spans[index]!} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
