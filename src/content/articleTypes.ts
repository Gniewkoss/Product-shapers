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

export type ArticleDocument = {
  slug: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  categoryMeta: string;
  readingTimeLabel: string;
  sections: ArticleSection[];
};
