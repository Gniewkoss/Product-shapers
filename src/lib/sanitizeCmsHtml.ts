import DOMPurify from "dompurify";

/**
 * Allowed semantic markup from Pilot CMS `htmlSnippet` blocks only.
 * Presentation comes from `.cms-html-snippet` in `index.css` — no `style` or `class` from editors.
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "a",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "blockquote",
];

export function sanitizeCmsHtml(html: string): string {
  const dirty = String(html ?? "").trim();
  if (!dirty) return "";
  if (typeof document === "undefined") return "";

  const sanitized = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "title"],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });

  const tpl = document.createElement("template");
  tpl.innerHTML = sanitized;
  tpl.content.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    if (/^https?:\/\//i.test(href)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
  return tpl.innerHTML;
}
