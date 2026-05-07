import { Link } from "react-router-dom";

import type { KnowledgeTeaserCardData } from "../lib/payload/homeFeaturedArticles";
import { mediaUrl } from "../lib/payload/client";
import iconArrow from "../assets/branding/arrow rightsvg.svg";

export function KnowledgeTeaserCard({ c, href }: { c: KnowledgeTeaserCardData; href: string }) {
  const teaserImgSrc = c.imageUrl ? mediaUrl(c.imageUrl) ?? c.imageUrl : undefined;
  const ctaLabel = c.ctaLabel ?? "Dowiedz się więcej";

  const ctaClass =
    "inline-flex items-center gap-2.5 font-sans font-bold text-[14px] tracking-[0.05em] text-[#022169] no-underline transition-all duration-150 hover:gap-4";

  const ctaInner = (
    <>
      <span>{ctaLabel}</span>
      <img alt="" src={iconArrow} className="h-4 w-4 shrink-0" />
    </>
  );

  const ctaRow =
    href.startsWith("http") ? (
      <a href={href} className={ctaClass}>
        {ctaInner}
      </a>
    ) : (
      <Link to={href} className={ctaClass}>
        {ctaInner}
      </Link>
    );

  return (
    <article className="group flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-[#e2e5ee] bg-white transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative w-full overflow-hidden bg-[#eef0f6]" style={{ aspectRatio: "16/9" }}>
        {teaserImgSrc ? (
          <img
            alt=""
            src={teaserImgSrc}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dfe7f2] to-[#eef2f8]"
            aria-hidden
          >
            <span className="font-sans font-bold text-[11px] uppercase tracking-[1.5px] text-[#022169]/25">
              Grafika artykułu
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        {c.categoryLabel && (
          <p className="m-0 font-sans font-bold text-[12px] uppercase tracking-[0.08em] text-[#0083fe]">
            {String(c.categoryLabel)}
          </p>
        )}
        <h3 className="m-0 font-sans font-bold text-[clamp(1.125rem,1.8vw,1.375rem)] leading-[1.25] text-[#022169]">
          {String(c.title)}
        </h3>
        <p className="m-0 flex-1 font-serif text-[15px] leading-[1.65] text-[#444651] line-clamp-4">
          {String(c.excerpt ?? "")}
        </p>
        <div className="pt-2">{ctaRow}</div>
      </div>
    </article>
  );
}

type HomeKnowledgeSectionProps = {
  eyebrow?: string | null;
  heading: string;
  subtitle?: string | null;
  cards: KnowledgeTeaserCardData[];
};

export function HomeKnowledgeSection({ eyebrow, heading, subtitle, cards }: HomeKnowledgeSectionProps) {
  return (
    <div className="w-full min-w-0 bg-white">
      <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-14 px-4 py-16 sm:px-6 md:px-10 lg:px-[61px] lg:py-24">
        <div className="flex flex-col gap-4">
          {eyebrow && (
            <p className="m-0 font-sans font-bold text-[14px] uppercase tracking-[0.08em] text-[#0083fe]">
              {eyebrow}
            </p>
          )}
          <h2 className="m-0 font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#000f3d]">
            {heading}
          </h2>
          {subtitle && (
            <p className="m-0 max-w-[600px] font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.65] text-[#444651]">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid w-full gap-6 ${
            cards.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {cards.map((c, ci) => {
            const rawHref = c.href ? String(c.href) : "/artykuly";
            return (
              <KnowledgeTeaserCard key={ci} c={c} href={rawHref} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
