import { Link } from "react-router-dom";

import type { KnowledgeTeaserCardData } from "../lib/payload/homeFeaturedArticles";
import { splitLines } from "../lib/payload/blockUtils";
import { mediaUrl } from "../lib/payload/client";

const imgKnowledgeTeaserArrow = "https://www.figma.com/api/mcp/asset/95d4461c-3559-429a-9376-21f687653a48";

export function KnowledgeTeaserCard({
  c,
  href,
}: {
  c: KnowledgeTeaserCardData;
  href: string;
}) {
  const teaserImgSrc = c.imageUrl ? mediaUrl(c.imageUrl) ?? c.imageUrl : undefined;
  const ctaLabel = c.ctaLabel ?? "Dowiedz się więcej";
  const linkClass =
    "inline-flex gap-4 items-center no-underline font-['Satoshi:Bold',sans-serif] text-[16px] leading-4 tracking-[1.2px] text-[color:var(--dark-blue,#022169)]";

  const ctaInner = (
    <>
      <span>{ctaLabel}</span>
      <span className="relative inline-block size-3 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgKnowledgeTeaserArrow} />
      </span>
    </>
  );

  const ctaRow =
    href.startsWith("http") ?
      <a href={href} className={linkClass}>
        {ctaInner}
      </a>
    : <Link to={href} className={linkClass}>
        {ctaInner}
      </Link>;

  return (
    <article className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col bg-white">
      <div className="relative h-[240px] w-full min-w-0 shrink-0 overflow-hidden bg-[#e8edf5]">
        {teaserImgSrc ?
          <img alt="" src={teaserImgSrc} className="h-full w-full min-w-0 object-cover object-center" loading="lazy" decoding="async" />
        : <div
            className="box-border flex h-full w-full min-w-0 items-center justify-center bg-[linear-gradient(145deg,#dfe7f2_0%,#eef2f8_45%,#e2e9f4_100%)]"
            aria-hidden
          >
            <span className="font-['Satoshi:Bold',sans-serif] text-[11px] uppercase tracking-[1.5px] text-[#022169]/30">
              Grafika artykułu
            </span>
          </div>
        }
      </div>

      {/* auto | 1fr | auto — CTA zawsze przy dolnej krawędzi karty niezależnie od długości leadu */}
      <div className="grid min-h-0 w-full min-w-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] px-10 pb-10 pt-10 sm:px-12 sm:pb-12 sm:pt-12">
        <header className="flex flex-col gap-4">
          {c.categoryLabel ?
            <p className="m-0 font-['Satoshi:Bold',sans-serif] text-[12px] tracking-[1.2px] leading-4 text-[color:var(--light-blue,#0083fe)]">
              {String(c.categoryLabel)}
            </p>
          : null}
          <h3 className="m-0 font-['Satoshi:Bold',sans-serif] text-[24px] font-bold leading-[1.35] text-[#022169] break-words">
            {String(c.title)}
          </h3>
        </header>

        <div className="min-h-0 pt-4">
          <p className="m-0 text-[20px] leading-[25px] text-[#444651] line-clamp-6 [overflow-wrap:anywhere]">
            {String(c.excerpt ?? "")}
          </p>
        </div>

        <div className="pt-8">{ctaRow}</div>
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
  const subtitleLines = subtitle ? splitLines(String(subtitle)) : [];
  return (
    <div className="w-full min-w-0 bg-white">
      <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[91px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            {eyebrow ?
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full">
                  <p className="leading-[16px]">{eyebrow}</p>
                </div>
              </div>
            : null}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full">
                <p className="leading-[60px]">{heading}</p>
              </div>
            </div>
            {subtitleLines.length > 0 ?
              <div className="content-stretch flex flex-col items-start pb-[16.625px] pt-[7.375px] relative shrink-0 w-full">
                <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full">
                  {subtitleLines.map((line, li) => (
                    <p key={li} className={`leading-[27.5px] ${li < subtitleLines.length - 1 ? "mb-0" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            : null}
          </div>
          <div
            className={`grid w-full min-w-0 shrink-0 gap-px border border-solid border-[#e2e8f0] bg-[#e2e8f0] p-px ${
              cards.length === 3 ?
                "grid-cols-1 md:grid-cols-[repeat(3,minmax(0,1fr))]"
              : "grid-cols-1 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]"
            } items-stretch`}
          >
            {cards.map((c, ci) => {
              const rawHref = c.href ? String(c.href) : "/artykuly";
              const href = rawHref.startsWith("http") ? rawHref : rawHref;
              return (
                <div
                  key={ci}
                  className="flex min-h-[28rem] w-full min-w-0 flex-col bg-white md:min-h-[32rem] lg:min-h-[34rem]"
                >
                  <KnowledgeTeaserCard c={c} href={href} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
