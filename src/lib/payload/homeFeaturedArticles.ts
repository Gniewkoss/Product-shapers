import type { Article } from "@payload-types";

import { uploadRefMedia } from "./client";

/** Cards consumed by `HomeKnowledgeSection` / `KnowledgeTeaserCard`. */
export type KnowledgeTeaserCardData = {
  categoryLabel?: string;
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  href?: string;
  ctaLabel?: string;
};

const CATEGORY_FALLBACK: Record<NonNullable<Article["category"]>, string> = {
  methodology: "Metodyka",
  management: "Zespół",
  case_studies: "Proces",
};

export function normalizeFeaturedArticles(raw: unknown): Article[] {
  if (!Array.isArray(raw)) return [];
  const out: Article[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const a = item as Article;
    if (typeof a.slug !== "string" || !a.slug.trim()) continue;
    if (a.status !== "published") continue;
    out.push(a);
    if (out.length >= 3) break;
  }
  return out;
}

/** Matches legacy homepage / seed teasers when Globals → Homepage has no picks yet. */
export const FALLBACK_KNOWLEDGE_CARDS: KnowledgeTeaserCardData[] = [
  {
    categoryLabel: "Metodyka",
    title: "Shape Up a Scrum",
    excerpt:
      "Scrum miał być remedium na chaos, ale dla wielu stał się pułapką ceremonii. Dlaczego Shape Up wygrywa w scale-upach?",
    imageUrl: "https://www.figma.com/api/mcp/asset/88685f3f-56ca-44e8-912f-8b7808a067b2",
    href: "/artykuly/shape-up-scrum",
    ctaLabel: "Dowiedz się więcej",
  },
  {
    categoryLabel: "Zespół",
    title: "Zarządzanie ryzykiem",
    excerpt:
      "W innowacji nie ma pewności. Betting model pozwala nam decydować na co postawić czas zespołu z zimną krwią.",
    imageUrl: "https://www.figma.com/api/mcp/asset/231a2f81-6ab2-41a0-b6dc-d26a1717c8e1",
    href: "/artykuly",
    ctaLabel: "Dowiedz się więcej",
  },
  {
    categoryLabel: "Proces",
    title: "Efektywność & focus",
    excerpt:
      "Większość zespołów produktowych spędza więcej czasu na rozmawianiu o pracy niż na samej pracy. Czas to zmienić.",
    imageUrl: "https://www.figma.com/api/mcp/asset/be5ca7b5-8a11-47bc-be13-4fc3cbc9c51b",
    href: "/artykuly",
    ctaLabel: "Dowiedz się więcej",
  },
];

export function articleToKnowledgeCard(article: Article): KnowledgeTeaserCardData {
  const hero = uploadRefMedia(article.heroImage);
  const categoryLabel =
    typeof article.categoryLabel === "string" && article.categoryLabel.trim() ?
      article.categoryLabel.trim()
    : article.category ? (CATEGORY_FALLBACK[article.category] ?? "Artykuły")
    : "Artykuły";

  const excerpt =
    typeof article.summary === "string" && article.summary.trim() ?
      article.summary.trim()
    : typeof article.excerpt === "string" && article.excerpt.trim() ?
      article.excerpt.trim()
    : "";

  return {
    categoryLabel,
    title: typeof article.title === "string" ? article.title : "",
    excerpt,
    imageUrl: hero.url,
    href: `/artykuly/${article.slug}`,
    ctaLabel: "Dowiedz się więcej",
  };
}
