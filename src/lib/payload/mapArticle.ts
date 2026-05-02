import type { Article } from "@payload-types";
import type {
  ArticleBodyBlock,
  ArticleComparisonTableBlock,
  ArticleComparisonTableCell,
  ArticleDocument,
  ArticleSection,
  ArticleSectionBlock,
} from "../../content/articleTypes";
import type { PayloadLayoutBlock } from "./blockUtils";
import { getBlockFields } from "./blockUtils";
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

function normalizeComparisonCells(raw: unknown): ArticleComparisonTableCell[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((cell) => {
    if (typeof cell === "string") return { value: cell };
    const o = cell as { value?: string; highlight?: boolean | null };
    return { value: String(o?.value ?? ""), highlight: Boolean(o?.highlight) };
  });
}

function mapComparisonTableBlock(block: unknown): ArticleComparisonTableBlock | null {
  if (!block || typeof block !== "object") return null;
  const b = block as { blockType?: string };
  if (b.blockType !== "comparisonTable") return null;
  const f = getBlockFields(block as PayloadLayoutBlock);
  const cols = (f.columns as { label?: string }[]) ?? [];
  const rowsRaw = (f.rows as { name?: string; cells?: unknown }[]) ?? [];
  const columns = cols.map((c) => ({ label: String(c.label ?? "").trim() })).filter((c) => c.label);
  if (!columns.length) return null;
  return {
    blockType: "comparisonTable",
    title: typeof f.title === "string" && f.title.trim() !== "" ? f.title : undefined,
    columns,
    rows: rowsRaw.map((r) => ({
      name: String(r.name ?? "").trim(),
      cells: normalizeComparisonCells(r.cells),
    })),
  };
}

function mapArticleSectionBlock(block: unknown): ArticleSectionBlock | null {
  if (!block || typeof block !== "object") return null;
  const b = block as { blockType?: string };
  if (b.blockType !== "articleSection") return null;
  const f = getBlockFields(block as PayloadLayoutBlock);
  const anchorRaw = f.anchorId ?? f.id;
  const id = typeof anchorRaw === "string" ? anchorRaw.trim() : "";
  if (!id) return null;
  return {
    blockType: "articleSection",
    id,
    number: String(f.number ?? ""),
    label: String(f.label ?? ""),
    title: String(f.title ?? ""),
    content: String(f.content ?? ""),
    contentFormat: (f.contentFormat === "html" ? "html" : "plain") as ArticleSection["contentFormat"],
  };
}

/**
 * CMS `layout`: mieszane bloki `articleSection` | `comparisonTable`.
 *
 * Legacy: brak bloków `articleSection` w `layout` → traktujemy `layout` jak wyłącznie tabele,
 * a narrację bierzemy z ukrytego pola `sections`.
 */
export function mapArticleBody(doc: Article): ArticleBodyBlock[] {
  const layout = doc.layout;
  const legacySections = mapSections(doc.sections);

  if (!layout?.length) {
    return legacySections.map((s) => ({ blockType: "articleSection" as const, ...s }));
  }

  const hasArticleSectionBlock = layout.some(
    (block) => block && typeof block === "object" && (block as { blockType?: string }).blockType === "articleSection",
  );

  if (hasArticleSectionBlock) {
    const out: ArticleBodyBlock[] = [];
    for (const block of layout) {
      const bt =
        block && typeof block === "object" ? (block as { blockType?: string }).blockType : undefined;
      if (bt === "articleSection") {
        const s = mapArticleSectionBlock(block);
        if (s) out.push(s);
      } else if (bt === "comparisonTable") {
        const t = mapComparisonTableBlock(block);
        if (t) out.push(t);
      }
    }
    return out;
  }

  const tables = layout.map(mapComparisonTableBlock).filter(Boolean) as ArticleComparisonTableBlock[];
  return [...legacySections.map((s) => ({ blockType: "articleSection" as const, ...s })), ...tables];
}

export function mapPayloadArticleToDocument(doc: Article): ArticleDocument {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? doc.summary ?? "",
    categoryLabel: doc.categoryLabel ?? "Artykuł",
    categoryMeta: doc.categoryMeta ?? doc.readingTime ?? "",
    readingTimeLabel: doc.readingTime ?? doc.categoryMeta ?? "",
    body: mapArticleBody(doc),
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
