import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ArticleSection } from "../content/articleTypes";

export type ArticleNavProps = {
  sections: ArticleSection[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
};

/**
 * Side navigation: numbered entries from CMS `sections`; active item gets left navy accent.
 */
export function ArticleNav({ sections, activeId, onNavigate, className }: ArticleNavProps) {
  return (
    <nav aria-label="Sekcje artykułu" className={className}>
      <ul className="flex flex-col gap-0">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onNavigate(s.id)}
                className={[
                  "group w-full border-0 bg-transparent py-3 pl-0 pr-1 text-left transition-colors motion-reduce:transition-none",
                  "border-l-[3px]",
                  isActive ? "border-[#022169] pl-[13px]" : "border-[#022169]/15 pl-[13px] hover:border-[#022169]/35",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#022169]",
                ].join(" ")}
              >
                <span className="block font-sans text-[12px] font-bold uppercase leading-4 tracking-[1.2px] transition-colors duration-200 motion-reduce:duration-75">
                  <span className={isActive ? "text-[#022169]" : "text-[#757682]"}>
                    {s.number}. {(s.label ?? "").toUpperCase()}
                  </span>
                </span>
                <span
                  className={[
                    "mt-1 block font-sans text-[15px] font-bold leading-snug tracking-tight transition-colors duration-200 motion-reduce:duration-75 lg:text-[16px]",
                    isActive ? "text-[#000f3d]" : "text-[#757682] group-hover:text-[#444651]",
                  ].join(" ")}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Scroll spy via IntersectionObserver (spec rootMargin).
 * Click navigation updates active immediately via {@link scrollToSection}.
 */
export function useArticleSectionTracker(sectionIds: readonly string[]) {
  const stableIds = sectionIds.join("\0");
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  const scrollToSection = useCallback((id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /** Prefer section in view inside the observer band on first paint */
  useLayoutEffect(() => {
    const ids = stableIds.split("\0").filter(Boolean);
    if (ids.length === 0) return;

    const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) {
      setActiveId(ids[0] ?? "");
      return;
    }

    const bandTop = window.innerHeight * 0.2;
    const bandBottom = window.innerHeight * 0.65;
    let picked = ids[0] ?? "";

    for (const el of headings) {
      const r = el.getBoundingClientRect();
      if (r.top < bandBottom && r.bottom > bandTop) {
        picked = el.id;
        break;
      }
    }
    setActiveId(picked);
  }, [stableIds]);

  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    const headings = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return undefined;

    /**
     * Spec: rootMargin `-20% 0px -70% 0px`, threshold `0`.
     * When several sections intersect, pick the furthest down the document so the highlight matches reading position.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;

        const ids = idsRef.current;
        let bestIdx = -1;
        let chosenId = "";

        intersecting.forEach((entry) => {
          const idx = ids.indexOf(entry.target.id);
          if (idx > bestIdx) {
            bestIdx = idx;
            chosenId = entry.target.id;
          }
        });

        if (chosenId) setActiveId(chosenId);
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stableIds]);

  return { activeId, setActiveId, scrollToSection };
}
