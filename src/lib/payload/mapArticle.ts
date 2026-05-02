import type { Article } from "@payload-types";
import type { ArticleDocument, ArticleSection } from "../../content/articleTypes";
import { mediaUrl } from "./client";

const CATEGORY_MAP: Record<string, "methodology" | "management" | "case_studies"> = {
  methodology: "methodology",
  management: "management",
  case_studies: "case_studies",
};

export type ArticleListingCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: "methodology" | "management" | "case_studies";
  image?: string;
  readingTime?: string;
};

function mapSections(sections: Article["sections"]): ArticleSection[] {
  if (!sections?.length) return [];
  return sections.map((s) => ({
    id: s.id,
    number: s.number ?? "",
    label: s.label ?? "",
    title: s.title ?? "",
    content: s.content ?? "",
    contentFormat: (s.contentFormat === "html" ? "html" : "plain") as ArticleSection["contentFormat"],
  }));
}

export function mapPayloadArticleToDocument(doc: Article): ArticleDocument {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? doc.summary ?? "",
    categoryLabel: doc.categoryLabel ?? "Artykuł",
    categoryMeta: doc.categoryMeta ?? doc.readingTime ?? "",
    readingTimeLabel: doc.readingTime ?? doc.categoryMeta ?? "",
    sections: mapSections(doc.sections),
  };
}

export function mapPayloadArticleToListingCard(doc: Article, fallback?: ArticleListingCard): ArticleListingCard {
  const cat = CATEGORY_MAP[doc.category] ?? "methodology";
  const hero = doc.heroImage;
  const imgUrl =
    hero && typeof hero === "object" && "url" in hero ? mediaUrl(String((hero as { url?: string }).url)) : undefined;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.summary ?? doc.excerpt ?? fallback?.excerpt ?? "",
    category: cat,
    image: imgUrl ?? fallback?.image,
    readingTime: doc.readingTime ?? fallback?.readingTime,
  };
}

export function mapPayloadArticlesToRelated(
  related: Article["relatedArticles"],
  byId: Map<string, Article>,
  catalog: ArticleListingCard[],
): ArticleListingCard[] {
  if (!related?.length) return [];
  const out: ArticleListingCard[] = [];
  for (const r of related) {
    if (typeof r === "number") {
      const doc = [...byId.values()].find((a) => a.id === r);
      if (doc) out.push(mapPayloadArticleToListingCard(doc));
      continue;
    }
    if (r && typeof r === "object" && "slug" in r) {
      const doc = r as Article;
      out.push(mapPayloadArticleToListingCard(doc));
    }
  }
  const fb = new Map(catalog.map((a) => [a.slug, a]));
  return out.map((c) => {
    const f = fb.get(c.slug);
    if (!f) return c;
    return { ...c, image: c.image ?? f.image, readingTime: c.readingTime ?? f.readingTime };
  });
}
