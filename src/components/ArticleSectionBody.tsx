import type { ArticleSection } from "../content/articleTypes";

/**
 * Renders `ArticleSection.content`.
 * - plain: blocks separated by blank lines; `## ` → h2, `### ` → h3 (CMS-friendly lightweight markup).
 * - html: trusted CMS output — sanitize at publish time in production.
 */
export function ArticleSectionBody({ section }: { section: ArticleSection }) {
  const format = section.contentFormat ?? "plain";

  if (format === "html") {
    return (
      <div
        className="article-section-body article-section-body--html mb-6 [&_p:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    );
  }

  const blocks = section.content.trim().split(/\n\n+/);

  return (
    <div className="article-section-body article-section-body--plain">
      {blocks.map((block, i) => {
        const b = block.trim();
        if (b.startsWith("### ")) {
          return (
            <h3 key={i} className="mb-2 font-sans text-[22px] font-bold text-[#000f3d]">
              {b.slice(4).trim()}
            </h3>
          );
        }
        if (b.startsWith("## ")) {
          return (
            <h2 key={i} className="mb-4 font-sans text-[30px] font-bold text-[#000f3d] md:text-[36px]">
              {b.slice(3).trim()}
            </h2>
          );
        }
        return (
          <p key={i} className="mb-6 text-[18px] leading-7 text-[#444651]">
            {b}
          </p>
        );
      })}
    </div>
  );
}
