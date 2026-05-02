/**
 * CMS-friendly article section (frontmatter repeater, JSON field, etc.).
 * Map the same array to side nav + `<section id={id}>` blocks — single source of truth.
 */
export type ArticleSectionContentFormat = "plain" | "html";

export type ArticleSection = {
  id: string;
  number: string;
  label: string;
  title: string;
  /** Body copy: `plain` = paragraphs; lines starting with `## ` / `### ` become headings. `html` = trusted CMS HTML (sanitize at publish). */
  content: string;
  contentFormat?: ArticleSectionContentFormat;
};

/** Komórka tabeli porównawczej z Payload (`comparisonTable`). */
export type ArticleComparisonTableCell = {
  value: string;
  highlight?: boolean;
};

/** Blok `comparisonTable` z pola `layout` artykułu. */
export type ArticleComparisonTableBlock = {
  blockType: "comparisonTable";
  title?: string;
  columns: { label: string }[];
  rows: {
    name: string;
    cells: ArticleComparisonTableCell[];
  }[];
};

/** Sekcja jako blok w uporządkowanym `layout` Payload. */
export type ArticleSectionBlock = { blockType: "articleSection" } & ArticleSection;

/** Kolejność na stronie = kolejność w tablicy (sekcje i tabele przeplatane). */
export type ArticleBodyBlock = ArticleSectionBlock | ArticleComparisonTableBlock;

/** Sekcje z `body` — spójne z TOC (`ArticleNav`). */
export function articleSectionsForNav(body: ArticleBodyBlock[]): ArticleSection[] {
  return body.filter((b): b is ArticleSectionBlock => b.blockType === "articleSection").map(articleSectionFromBlock);
}

export function articleSectionFromBlock(block: ArticleSectionBlock): ArticleSection {
  const { blockType: _t, ...section } = block;
  return section;
}

export type ArticleDocument = {
  slug: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  categoryMeta: string;
  readingTimeLabel: string;
  /** Uporządkowana treść z CMS (`layout`): sekcje i tabele w dowolnej kolejności. */
  body: ArticleBodyBlock[];
};
