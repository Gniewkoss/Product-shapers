import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSitePayload } from "../../context/SitePayloadContext";
import { HomeKnowledgeSection } from "../HomeKnowledgeSection";
import { SzkoleniaFaqAccordion } from "../SzkoleniaFaqAccordion";
import { SzkoleniaHeroFidelity } from "../site/szkolenia/SzkoleniaHeroFidelity";
import { SzkoleniaProgramBentoFidelity, type SzkoleniaProgramBentoProps } from "../site/szkolenia/SzkoleniaProgramBento";
import { SzkoleniaWhyShapeUpFidelity } from "../site/szkolenia/SzkoleniaWhyShapeUp";
import {
  UsemeBentoFidelity,
  UsemeChallengeFidelity,
  UsemeContextFidelity,
  UsemeHeroFidelity,
  UsemeMeasurableFidelity,
  UsemeStrategyFidelity,
} from "../site/useme/UsemeFidelity";
import { fourLinesPad, getBlockFields, splitLines, splitParagraphs, type PayloadLayoutBlock } from "../../lib/payload/blockUtils";
import { articleToKnowledgeCard, normalizeFeaturedArticles, type KnowledgeTeaserCardData } from "../../lib/payload/homeFeaturedArticles";
import { isLegacyFounderSilhouetteAssetUrl, mediaUrl, uploadRefMedia } from "../../lib/payload/client";
import { sanitizeCmsHtml } from "../../lib/sanitizeCmsHtml";
import iconArrow from "../../assets/branding/arrow rightsvg.svg";
import iconEcommerce from "../../assets/branding/Ecomerce.svg";
import iconFintech from "../../assets/branding/Fintech.svg";
import iconLinkedIn from "../../assets/branding/linkedin.svg";

/** Resolve CMS / Payload media paths (relative or absolute) for `<img src>` */
function cmsMedia(src: unknown): string {
  const raw = typeof src === "string" ? src.trim() : "";
  return mediaUrl(raw) ?? "";
}

function cmsMediaEither(urlCandidate: unknown, uploadCandidate: unknown): string {
  const uploadResolved = uploadRefMedia(uploadCandidate);
  const uploadUrl = uploadResolved.url ? String(uploadResolved.url).trim() : "";
  if (uploadUrl) return uploadUrl;
  return cmsMedia(urlCandidate);
}

function isFigmaMcpAssetUrl(url: string): boolean {
  return /figma\.com\/api\/mcp\/asset/i.test(url);
}

/** `UsemeMain` hero / context image fallback when `richSplit.mediaUrl` empty */
const USEME_CONTEXT_IMAGE_FALLBACK = "https://www.figma.com/api/mcp/asset/0eba44d5-9425-4c1e-a191-f61728ae2f23";
const METHOD_TILE_OUTER = [
  "bg-[#f9f9f9] border-[#022169] border-solid border-t-8 col-1 content-stretch flex h-auto min-h-[240px] flex-col gap-[16px] items-start justify-self-stretch pb-[68px] pt-[48px] px-[25px] relative row-1 self-start shrink-0 sm:row-auto lg:h-[276px]",
  "bg-[#f9f9f9] border-[#022169] border-solid border-t-8 col-3 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pb-[41px] pt-[48px] px-[25px] relative row-1 self-start shrink-0",
  "bg-[#f9f9f9] border-[#022169] border-solid border-t-8 col-4 content-stretch flex h-auto min-h-[240px] flex-col gap-[16px] items-start justify-self-stretch pb-[68px] pt-[48px] px-[25px] relative row-1 self-start shrink-0 lg:h-[276px]",
  "bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-2 content-stretch flex h-auto min-h-[240px] flex-col gap-[16px] items-start justify-self-stretch pb-[37px] pt-[48px] px-[25px] relative row-1 self-start shrink-0 lg:h-[276px]",
] as const;

const NUMBERED_STEP_OUTER = [
  "bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-1 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[68px] pt-[48px] px-[40px] relative row-1 self-start shrink-0",
  "bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-2 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[40px] pt-[48px] px-[40px] relative row-1 self-start shrink-0",
  "bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-3 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[40px] pt-[48px] px-[40px] relative row-1 self-start shrink-0",
  "bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-4 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[68px] pt-[48px] px-[40px] relative row-1 self-start shrink-0",
] as const;

function bodyLinesToParagraphs(body: string) {
  const lines = splitLines(String(body ?? ""));
  return lines.map((line, i) => (
    <p key={i} className={`leading-[25px] ${i < lines.length - 1 ? "mb-0" : ""}`}>
      {line}
    </p>
  ));
}

function whiteMetricValueLines(val: string) {
  const lines = splitLines(String(val ?? ""));
  return lines.map((line, li) => (
    <p key={li} className={`leading-[25px] ${li < lines.length - 1 ? "mb-0" : ""}`}>
      {line}
    </p>
  ));
}

function methodTileTitleLines(title: string) {
  const L = splitLines(String(title ?? ""));
  return L.length ? L : [String(title ?? "")];
}

type StatQuad = { value: string; label: string; descriptionLine1: string; descriptionLine2?: string };

function padFourStats(raw: { value?: string; label?: string; description?: string | null }[]): [StatQuad, StatQuad, StatQuad, StatQuad] {
  const mapped: StatQuad[] = raw.map((it) => {
    const desc = splitLines(it.description ?? "");
    return {
      value: it.value ?? "—",
      label: it.label ?? "",
      descriptionLine1: desc[0] ?? "",
      descriptionLine2: desc[1],
    };
  });
  while (mapped.length < 4) {
    mapped.push({ value: "—", label: "", descriptionLine1: "", descriptionLine2: "" });
  }
  return [mapped[0]!, mapped[1]!, mapped[2]!, mapped[3]!];
}

function programModulesToBento(block: Record<string, unknown>): SzkoleniaProgramBentoProps | null {
  const modules = block.modules as Record<string, unknown>[] | undefined;
  if (!modules || modules.length < 5) return null;
  const [m0, m1, m2, m3, m4] = modules;
  const t0 = ((m0?.tags as { label?: string }[]) ?? []).map((x) => x.label ?? "");
  const t1 = ((m1?.tags as { label?: string }[]) ?? []).map((x) => x.label ?? "");
  const t2 = ((m2?.tags as { label?: string }[]) ?? []).map((x) => x.label ?? "");
  const q = splitLines(String(m3?.asideQuote ?? ""));
  return {
    headingTitle: String(block.headingTitle ?? ""),
    headingEyebrow: String(block.headingEyebrow ?? ""),
    m01: {
      title: String(m0?.title ?? ""),
      body: String(m0?.body ?? ""),
      tagA: t0[0] ?? "",
      tagB: t0[1] ?? "",
    },
    m02: {
      title: String(m1?.title ?? ""),
      body: String(m1?.body ?? ""),
      tagA: t1[0] ?? "",
      tagB: t1[1] ?? "",
    },
    m03: {
      title: String(m2?.title ?? ""),
      bodyLines: fourLinesPad(m2?.body),
      tagA: t2[0] ?? "",
      tagB: t2[1] ?? "",
    },
    m04: {
      title: String(m3?.title ?? ""),
      body: String(m3?.body ?? ""),
      asideEyebrow: String(m3?.asideEyebrow ?? ""),
      asideQuoteLine1: q[0] ?? "",
      asideQuoteLine2: q[1] ?? "",
    },
    m05: {
      title: String(m4?.title ?? ""),
      bodyLines: fourLinesPad(m4?.body),
      footerImageUrl: cmsMediaEither(m4?.footerImageUrl, m4?.footerImage) || undefined,
    },
  };
}

function HeroBandBlock({ f }: { f: Record<string, unknown> }) {
  const eyebrow = String(f.eyebrow ?? "");
  const title = String(f.title ?? "");
  const intro = String(f.intro ?? "");
  const asideStats = (f.asideStats as { value: string; label: string }[] | null | undefined) ?? null;
  const asidePrimary = f.asidePrimary ? String(f.asidePrimary) : "";
  const asideSecondary = f.asideSecondary ? String(f.asideSecondary) : "";
  const asideAria = f.asideAriaLabel ? String(f.asideAriaLabel) : "Aside";

  if (asideStats && asideStats.length > 0) {
    return (
      <div className="w-full min-w-0 bg-white">
        <div className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]">
          <section className="flex w-full flex-col gap-10 py-0 sm:gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8">
            <div className="flex min-h-0 min-w-0 max-w-[1095px] flex-1 flex-col gap-[24px] border-[var(--dark-blue,#022169)] border-l-4 border-solid pl-8">
              <div className="flex flex-col gap-10">
                <p className="font-['Satoshi:Bold',sans-serif] text-[16px] font-bold leading-4 tracking-[1.2px] text-[#005bb3]">{eyebrow}</p>
                <h1 className="font-['Satoshi:Bold',sans-serif] text-[40px] font-bold leading-tight text-[#000f3d] md:text-[64px] md:leading-[1.1] md:tracking-tight">
                  {title}
                </h1>
              </div>
              <p className="max-w-[648px] text-[20px] leading-[27.5px] text-[#444651] md:text-[22px]">{intro}</p>
            </div>
            <div className="flex w-full shrink-0 justify-end lg:w-auto lg:flex-col lg:justify-end">
              <aside
                className="ml-auto w-full max-w-[290px] shrink-0 rounded-tr-[60px] border-[var(--dark-blue,#022169)] border-l-4 border-solid bg-[#f3f3f3] px-6 py-8 lg:ml-0 lg:w-[290px]"
                aria-label={asideAria}
              >
                {f.asideEyebrow ?
                  <p className="font-sans text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#757682]">{String(f.asideEyebrow)}</p>
                : null}
                <div className="mt-6 space-y-6">
                  {asideStats.map((s, i) => (
                    <div key={i}>
                      <p className="font-['Satoshi:Bold',sans-serif] text-[40px] font-bold leading-none text-[#000f3d]">{s.value}</p>
                      <p className="mt-1 font-serif text-[13px] leading-5 text-[#444651]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (title.includes("\n") && !asidePrimary) {
    const [l1, l2] = (() => {
      const p = title.split("\n");
      return [p[0] ?? "", p.slice(1).join("\n") || ""];
    })();
    const introLines = threeIntroLines(intro);
    return (
      <SzkoleniaHeroFidelity eyebrow={eyebrow} titleLine1={l1} titleLine2={l2} introLines={introLines} />
    );
  }

  return (
    <UsemeHeroFidelity
      eyebrow={eyebrow}
      title={title.replace(/\n/g, " ")}
      intro={intro}
      asidePrimary={asidePrimary || "2024"}
      asideSecondary={asideSecondary || ""}
      asideAriaLabel={asideAria}
    />
  );
}

function threeIntroLines(intro: string): [string, string, string] {
  const L = splitLines(intro);
  while (L.length < 3) L.push("");
  return [L[0]!, L[1]!, L[2]!];
}

function FounderSpotlightBlock({ f }: { f: Record<string, unknown> }) {
  const { homepage } = useSitePayload();
  const rawBlock = cmsMediaEither(f.portraitUrl, f.portraitImage);
  const blockPortrait =
    rawBlock && !isLegacyFounderSilhouetteAssetUrl(rawBlock) ? rawBlock : "";

  const globalResolved = uploadRefMedia(
    typeof homepage?.founderPortrait === "object" && homepage.founderPortrait ? homepage.founderPortrait : null,
  );
  const globalPortrait =
    globalResolved.url && !isLegacyFounderSilhouetteAssetUrl(globalResolved.url) ? globalResolved.url : "";

  const portraitUrl = blockPortrait || globalPortrait || "";
  const nameTrim = String(f.name ?? "").trim();
  const portraitAlt =
    homepage?.founderPortraitAlt?.trim() || globalResolved.alt || (nameTrim ? `${nameTrim}, portret` : "");

  const paras = splitParagraphs(String(f.bodyParagraphs ?? ""));
  const stats = (f.stats as { value?: string; label?: string }[]) ?? [];
  const s0 = stats[0];
  const s1 = stats[1];

  return (
    <div className="w-full min-w-0 bg-white">
      <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full">
        <div className="relative grid w-full min-h-0 max-w-[1536px] grid-cols-1 grid-rows-[auto] gap-10 lg:grid-cols-[repeat(2,minmax(0,1fr))] lg:gap-x-20 lg:gap-y-16 lg:grid-rows-[minmax(0,auto)]">
          <div className="col-1 content-stretch flex flex-col gap-[23.3px] items-start justify-self-stretch relative row-1 self-center shrink-0">
            {f.eyebrow ?
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full">
                  <p className="leading-[16px]">{String(f.eyebrow)}</p>
                </div>
              </div>
            : null}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full">
                <p className="leading-[60px]">{String(f.name)}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[23.375px] items-start pt-[16.065px] relative shrink-0 w-full">
              {paras.map((para, pi) => {
                const lines = splitLines(para);
                return (
                  <div key={pi} className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full">
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full">
                      {lines.map((line, li) => (
                        <p key={li} className={`leading-[27.5px] ${li < lines.length - 1 ? "mb-0" : ""}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="content-stretch flex gap-[32px] items-start pt-[24.7px] relative shrink-0 w-full">
              {s0 ?
                <div className="content-stretch flex flex-col gap-[4px] items-center relative self-stretch shrink-0">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[color:var(--dark-blue,#022169)] whitespace-nowrap">
                      <p className="leading-[40px]">{String(s0.value)}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex max-w-[14rem] flex-col justify-center leading-snug not-italic relative shrink-0 text-[#757682] text-[16px] break-words sm:max-w-none">
                      <p className="leading-[25px]">{String(s0.label)}</p>
                    </div>
                  </div>
                </div>
              : null}
              {s1 ?
                <div className="content-stretch flex min-w-0 flex-1 flex-col gap-[4px] items-start relative self-stretch sm:flex-none sm:w-auto">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[color:var(--dark-blue,#022169)] whitespace-nowrap">
                      <p className="leading-[40px]">{String(s1.value)}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[16px] text-center w-full">
                      <p className="leading-[25px]">{String(s1.label)}</p>
                    </div>
                  </div>
                </div>
              : null}
            </div>
          </div>
          <div
            className={`aspect-square max-h-[90vw] min-h-[240px] w-full max-w-full shrink-0 col-2 row-1 flex flex-col items-start justify-center justify-self-stretch self-start overflow-hidden rounded-tr-[clamp(40px,10vw,80px)] lg:max-h-none lg:min-h-0 lg:self-center relative ${portraitUrl ? "bg-transparent" : "bg-[#e8e8e8]"}`}
          >
            {portraitUrl ?
              <img
                alt={portraitAlt}
                src={portraitUrl}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            : <div className="absolute inset-0 bg-[#e8e8e8]" aria-hidden />}
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeTeasersBlockPayload({ f }: { f: Record<string, unknown> }) {
  const { homepage } = useSitePayload();
  const useHome = f.useHomepageFeaturedArticles !== false;
  const featured = normalizeFeaturedArticles(homepage?.featuredKnowledgeArticles);
  const legacyRaw = (f.cards as KnowledgeTeaserCardData[]) ?? [];
  const legacyCards = legacyRaw.filter((c) => c.title);
  const cards =
    useHome && featured.length > 0 ? featured.map(articleToKnowledgeCard)
    : legacyCards.length > 0 ?
      legacyCards.map((c) => {
        const cardAny = c as KnowledgeTeaserCardData & { image?: unknown };
        const resolvedImage = cmsMediaEither(cardAny.imageUrl, cardAny.image);
        return { ...c, imageUrl: resolvedImage || cardAny.imageUrl };
      })
    : [];

  const eyebrow = f.eyebrow ? String(f.eyebrow) : undefined;
  const heading = String(f.heading ?? "Baza wiedzy");
  const subtitle = f.subtitle ? String(f.subtitle) : undefined;

  if (!cards.length) return null;

  return <HomeKnowledgeSection eyebrow={eyebrow} heading={heading} subtitle={subtitle} cards={cards} />;
}

function renderOneBlock(block: PayloadLayoutBlock, index: number): ReactNode {
  const bt = block.blockType;
  if (!bt) return null;
  const f = getBlockFields(block);

  switch (bt) {
    case "heroBand":
      return <HeroBandBlock key={index} f={f} />;

    case "jobGrid": {
      const jobs = (f.jobs as Record<string, unknown>[]) ?? [];
      return (
        <section key={index} className="w-full min-w-0 bg-white px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-[61px]">
          <div className="mx-auto w-full max-w-content">
            <div className="mb-8 flex flex-col items-start justify-between gap-2 pb-6 md:flex-row md:items-end">
              <h2 className="font-['Satoshi:Bold',sans-serif] text-[32px] font-bold text-[#000f3d] md:text-[40px]">{String(f.sectionTitle)}</h2>
              {f.sectionEyebrow ?
                <p className="text-[12px] font-sans font-bold uppercase leading-4 tracking-[1.2px] text-[#757682]">{String(f.sectionEyebrow)}</p>
              : null}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {jobs.map((job, ji) => (
                <div key={ji} className="flex flex-col border border-[#c5c5d2]/20 bg-white p-8 md:min-h-[460px]">
                  {job.tag ?
                    <div className="mb-4 flex items-start justify-between">
                      <span className="bg-[#eee] px-4 py-1 text-[12px] font-bold leading-4 tracking-[1.2px] text-[#757682]">{String(job.tag)}</span>
                    </div>
                  : null}
                  <h3 className="mb-2 font-['Satoshi:Bold',sans-serif] text-[24px] font-bold text-[#000f3d]">{String(job.title)}</h3>
                  <p className="mb-6 flex-1 text-[16px] leading-6 text-[#444651] md:text-[15px]">{String(job.description ?? "")}</p>
                  <div className="mt-auto space-y-3 border-t border-[#c5c5d2]/20 pt-6 text-[14px] text-[#444651]">
                    <div className="flex justify-between">
                      <span>Renumeracja</span>
                      <span className="text-right text-[#000f3d]">{String(job.compensation ?? "—")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lokalizacja</span>
                      <span className="text-right">{String(job.location ?? "—")}</span>
                    </div>
                    <button
                      type="button"
                      className="mt-2 w-full rounded-md border-2 border-[#022169] py-3 text-center text-[12px] font-sans font-bold uppercase leading-4 tracking-[1.2px] text-[#022169] hover:bg-[#022169] hover:text-white"
                    >
                      {String(job.ctaLabel ?? "Prześlij dossier")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "processGrid": {
      const steps = (f.steps as { number?: string; title?: string; body?: string }[]) ?? [];
      const showPh = Boolean(f.showPlaceholder ?? true);
      return (
        <section key={index} className="w-full min-w-0 bg-white px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-[61px]">
          <div className="mx-auto w-full max-w-content">
            <div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-[352px_1fr]">
              <div>
                <h2 className="font-['Satoshi:Bold',sans-serif] text-[32px] font-bold leading-tight text-[#000f3d] md:text-[40px]">
                  {String(f.title)}
                </h2>
                {f.intro ?
                  <p className="mt-4 text-[18px] leading-6 text-[#444651]">{String(f.intro)}</p>
                : null}
                {showPh ?
                  <div className="mt-6 h-[200px] w-full max-w-[352px] rounded-lg bg-gradient-to-br from-[#c5c5d2]/30 to-[#f3f3f3] md:h-[416px]" aria-hidden="true" />
                : null}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {steps.map((s, si) => (
                  <div key={si} className="min-w-0">
                    <p className="font-['Satoshi:Bold',sans-serif] text-[24px] font-bold leading-none tabular-nums tracking-tight text-[#757682]">{String(s.number)}</p>
                    <h4 className="mt-2 font-['Satoshi:Bold',sans-serif] text-[20px] font-bold leading-tight text-[#000f3d]">{String(s.title)}</h4>
                    <p className="mt-2 text-[16px] leading-6 text-[#444651]">{String(s.body)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "programModules": {
      const bento = programModulesToBento(f);
      return bento ? <SzkoleniaProgramBentoFidelity key={index} {...bento} /> : null;
    }

    case "szkoleniaWhyShapeUp": {
      const introL = fourLinesPad(f.intro);
      const quoteL = splitLines(String(f.quote ?? ""));
      while (quoteL.length < 3) quoteL.push("");
      const accent = uploadRefMedia(f.accentTileImage);
      return (
        <SzkoleniaWhyShapeUpFidelity
          key={index}
          titleLine1={String(f.titleLine1)}
          titleLine2={String(f.titleLine2)}
          introLines={[introL[0]!, introL[1]!, introL[2]!, introL[3]!]}
          benefit1={String(f.benefit1)}
          benefit2={String(f.benefit2)}
          benefit3={String(f.benefit3)}
          statValue={String(f.statValue)}
          statLabel={String(f.statLabel)}
          quoteLine1={quoteL[0]!}
          quoteLine2={quoteL[1]!}
          quoteLine3={quoteL[2]!}
          darkCardTitle={String(f.darkCardTitle)}
          darkCardBody={String(f.darkCardBody)}
          accentTileImageUrl={accent.url}
          accentTileImageAlt={accent.alt}
        />
      );
    }

    case "faqList": {
      const items = (f.items as { question?: string; answer?: string }[]) ?? [];
      const mapped = items
        .filter((x) => x.question && x.answer)
        .map((x) => ({ title: String(x.question), answer: String(x.answer) }));
      return (
        <div key={index} className="w-full min-w-0 bg-white px-4 py-16 sm:px-6 md:px-10 lg:px-[61px]">
          <div className="mx-auto max-w-content">
            {f.sectionTitle ?
              <h2 className="mb-4 font-['Satoshi:Bold',sans-serif] text-3xl text-[#000f3d]">{String(f.sectionTitle)}</h2>
            : null}
            {f.sectionSubtitle ?
              <p className="mb-8 text-[#444651] whitespace-pre-line">{String(f.sectionSubtitle)}</p>
            : null}
            <SzkoleniaFaqAccordion items={mapped} />
          </div>
        </div>
      );
    }

    case "richSplit": {
      const quoteLines = splitLines(String(f.quote ?? ""));
      return (
        <UsemeContextFidelity
          key={index}
          mediaUrl={cmsMediaEither(f.mediaUrl, f.media) || USEME_CONTEXT_IMAGE_FALLBACK}
          leftTitle={String(f.leftTitle)}
          bodyParagraphs={String(f.bodyParagraphs ?? "")}
          quoteLine1={quoteLines[0] ?? ""}
          quoteLine2={quoteLines[1] ?? quoteLines[0] ?? ""}
        />
      );
    }

    case "challengeVerdictSplit": {
      const titleLines = splitLines(String(f.title ?? ""));
      const features = ((f.features as { number?: string; title?: string; body?: string }[]) ?? []).map((x) => {
        const bl = splitLines(String(x.body ?? ""));
        return {
          number: String(x.number ?? ""),
          title: String(x.title ?? ""),
          bodyLine1: bl[0] ?? "",
          bodyLine2: bl[1] ?? "",
        };
      });
      const vLines = splitLines(String(f.verdictBody ?? ""));
      while (vLines.length < 4) vLines.push("");
      return (
        <UsemeChallengeFidelity
          key={index}
          titleLine1={titleLines[0] ?? ""}
          titleLine2={titleLines[1] ?? titleLines[0] ?? ""}
          features={features}
          verdictBadge={String(f.verdictBadge ?? "")}
          verdictLine1={vLines[0]!}
          verdictLine2={vLines[1]!}
          verdictLine3={vLines[2]!}
          verdictLine4={vLines[3]!}
        />
      );
    }

    case "featureColumns3": {
      const cols = (f.columns as { iconUrl?: string; icon?: unknown; title?: string; body?: string }[]) ?? [];
      const strategyCols = cols.slice(0, 3).map((c, ci) => ({
        iconUrl: cmsMediaEither(c.iconUrl, c.icon),
        iconWrapClass: ci === 0 ? "h-[27px] relative shrink-0 w-[16.5px]" : ci === 1 ? "h-[31.5px] relative shrink-0 w-[27px]" : "h-[27px] relative shrink-0 w-[20px]",
        title: String(c.title ?? ""),
        bodyLines: splitLines(String(c.body ?? "")),
        cellClass: "p-[40px]",
      }));
      while (strategyCols.length < 3) {
        strategyCols.push({
          iconUrl: "",
          iconWrapClass: "h-[27px] relative shrink-0 w-[16.5px]",
          title: "",
          bodyLines: [],
          cellClass: "p-[40px]",
        });
      }
      const trip = strategyCols as [(typeof strategyCols)[0], (typeof strategyCols)[1], (typeof strategyCols)[2]];
      return (
        <UsemeStrategyFidelity
          key={index}
          headingTitle={String(f.headingTitle)}
          headingSubtitle={String(f.headingSubtitle ?? "").replace(/\n/g, " ") || " "}
          columns={trip}
        />
      );
    }

    case "usemeBentoResults": {
      const light = (f.lightCard as Record<string, unknown>) ?? {};
      const dTop = (f.darkCardTop as Record<string, unknown>) ?? {};
      const dBot = (f.darkCardBottom as Record<string, unknown>) ?? {};
      const stat = (f.statCell as Record<string, unknown>) ?? {};
      const lightAvatarUrl = cmsMediaEither(light.avatarUrl, light.avatar);
      const darkTopAvatarUrl = cmsMediaEither(dTop.avatarUrl, dTop.avatar);
      const darkBottomAvatarUrl = cmsMediaEither(dBot.avatarUrl, dBot.avatar);
      return (
        <UsemeBentoFidelity
          key={index}
          lightQuote={String(light.quote ?? "")}
          lightInitials={String(light.avatarInitials ?? "MP")}
          lightName={String(light.authorName ?? "")}
          lightRole={String(light.role ?? "")}
          lightAvatarUrl={lightAvatarUrl || undefined}
          lightLinkedinLink={light.linkedinLink ? String(light.linkedinLink) : undefined}
          darkTopName={dTop.authorName ? String(dTop.authorName) : undefined}
          darkTopRole={dTop.role ? String(dTop.role) : undefined}
          darkTopInitials={dTop.avatarInitials ? String(dTop.avatarInitials) : undefined}
          darkTopAvatarUrl={darkTopAvatarUrl || undefined}
          darkTopLinkedinLink={dTop.linkedinLink ? String(dTop.linkedinLink) : undefined}
          darkBottomName={dBot.authorName ? String(dBot.authorName) : undefined}
          darkBottomRole={dBot.role ? String(dBot.role) : undefined}
          darkBottomInitials={dBot.avatarInitials ? String(dBot.avatarInitials) : undefined}
          darkBottomAvatarUrl={darkBottomAvatarUrl || undefined}
          darkBottomLinkedinLink={dBot.linkedinLink ? String(dBot.linkedinLink) : undefined}
          darkTopLines={splitLines(String(dTop.quote ?? ""))}
          darkBottomLines={splitLines(String(dBot.quote ?? ""))}
          statValue={String(stat.value ?? "")}
          statLabel={String(stat.label ?? "")}
        />
      );
    }

    case "statsRow4": {
      const items = (f.items as { value?: string; label?: string; description?: string | null }[]) ?? [];
      return (
        <UsemeMeasurableFidelity
          key={index}
          headingTitle={String(f.headingTitle)}
          headingEyebrow={String(f.headingEyebrow ?? "")}
          items={padFourStats(items)}
        />
      );
    }

    case "articlesHero": {
      const titleLines = splitLines(String(f.title ?? ""));
      const introLines = splitLines(String(f.intro ?? ""));
      return (
        <div key={index} className="col-span-12 flex min-h-0 shrink-0 flex-col items-start gap-6 border-l-4 border-[var(--dark-blue,#022169)] pl-8 pr-0 sm:pl-8 lg:col-span-8 lg:max-w-[872px]">
          <div className="w-full font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] text-[#005bb3]">
            <p className="leading-[16px]">{String(f.eyebrow)}</p>
          </div>
          <div className="w-full max-w-[872px] font-['Satoshi:Bold',sans-serif] text-[40px] leading-tight text-[#000f3d] md:text-[64px] md:leading-[1.1] md:tracking-tight">
            {titleLines.length <= 1 ?
              <p className="leading-[1.1]">{titleLines[0] ?? String(f.title)}</p>
            : <>
                <p className="mb-0 leading-[1.1]">{titleLines[0]}</p>
                <p className="leading-[1.1]">{titleLines.slice(1).join(" ")}</p>
              </>
            }
          </div>
          <div className="w-full max-w-[672px] pt-[7px] text-[22px] text-[#444651]">
            {introLines.length <= 1 ?
              <p className="leading-[27.5px]">{introLines[0] ?? String(f.intro)}</p>
            : <>
                <p className="mb-0 leading-[27.5px]">{introLines[0]}</p>
                <p className="leading-[27.5px]">{introLines.slice(1).join(" ")}</p>
              </>
            }
          </div>
        </div>
      );
    }

    case "htmlSnippet": {
      const safe = sanitizeCmsHtml(String(f.html ?? ""));
      if (!safe) return null;
      return (
        <div
          key={index}
          className="cms-html-snippet mx-auto w-full min-w-0 max-w-content px-4 py-8 sm:px-6 md:px-10 lg:px-[61px]"
          dangerouslySetInnerHTML={{ __html: safe }}
        />
      );
    }

    case "methodTileGrid": {
      const tiles = (f.tiles as { title?: string; body?: string }[]) ?? [];
      return (
        <div key={index} className="w-full min-w-0 bg-[#f3f3f3]">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start py-[96px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[96px] items-start max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-[61px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-[color:var(--font,#000f3d)] text-center w-full">
                  <p className="leading-[60px]">{String(f.sectionTitle)}</p>
                </div>
              </div>
              <div className="grid w-full min-h-0 grid-cols-1 grid-rows-[auto] gap-1 h-auto sm:grid-cols-2 lg:grid-cols-4 relative shrink-0">
                {tiles.map((t, ti) => {
                  const outer = METHOD_TILE_OUTER[Math.min(ti, METHOD_TILE_OUTER.length - 1)]!;
                  const titleLines = methodTileTitleLines(String(t.title ?? ""));
                  return (
                    <div key={ti} className={outer}>
                      <div className="relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
                          <div
                            className={`flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] w-full ${ti === 3 ? "text-[color:var(--dark-blue,#022169)]" : "text-[#022169]"}`}
                          >
                            {titleLines.map((line, li) => (
                              <p key={li} className={`leading-[40px] ${li < titleLines.length - 1 ? "mb-0" : ""}`}>
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                          <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full">
                            {bodyLinesToParagraphs(String(t.body ?? ""))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "industryPillars": {
      const pillars = (f.pillars as { title?: string; iconUrl?: string; icon?: unknown; clients?: { name?: string; segment?: string }[] }[]) ?? [];
      const introLines = f.intro ? splitLines(String(f.intro)) : [];
      return (
        <div key={index} className="flow-root w-full min-w-0 shrink-0 self-stretch bg-white">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content shrink-0 flex-col items-start self-stretch overflow-clip bg-white pb-[80px] pt-[96px] relative w-full">
            <div className="content-stretch flex w-full min-w-0 shrink-0 flex-col gap-[80px] items-start bg-white max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-[61px] relative">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                  {f.eyebrow ?
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full">
                        <p className="leading-[16px]">{String(f.eyebrow)}</p>
                      </div>
                    </div>
                  : null}
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full">
                      <p className="leading-[60px]">{String(f.heading)}</p>
                    </div>
                  </div>
                  {introLines.length > 0 ?
                    <div className="content-stretch flex flex-col items-start pb-[16.625px] pt-[7.375px] relative shrink-0 w-full">
                      <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full">
                        {introLines.map((line, li) => (
                          <p key={li} className={`leading-[27.5px] ${li < introLines.length - 1 ? "mb-0" : ""}`}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  : null}
                </div>
              </div>
              <div className="grid w-full min-w-0 shrink-0 grid-cols-1 gap-x-[48px] gap-y-[48px] bg-white lg:grid-cols-2 lg:grid-rows-[minmax(0,auto)]">
                {pillars.map((p, pi) => {
                  const cmsIcon = cmsMediaEither(p.iconUrl, p.icon);
                  const resolvedIcon =
                    cmsIcon && !isFigmaMcpAssetUrl(cmsIcon) ? cmsIcon
                    : (pi === 0 ? iconFintech : iconEcommerce);
                  const iconNarrow = pi === 1;
                  return (
                    <div
                      key={pi}
                      className="flex min-h-0 min-w-0 w-full flex-col gap-[40px] items-start bg-white py-[16px] pl-4 pr-4 sm:pl-6 sm:pr-6 lg:min-w-0 lg:pl-[44px] lg:pr-[40px]"
                    >
                      <div className="relative w-full min-w-0 shrink-0">
                        <div className="flex min-w-0 items-center gap-[16px]">
                          {iconNarrow ?
                            <div className="relative h-[20px] w-[16px] shrink-0">
                              <img alt="" className="absolute inset-0 block max-w-none size-full" src={resolvedIcon} />
                            </div>
                          : <div className="relative size-[20px] shrink-0">
                              <img alt="" className="absolute inset-0 block max-w-none size-full" src={resolvedIcon} />
                            </div>}
                          <div className="min-w-0 font-['Satoshi:Bold',sans-serif] text-[24px] not-italic leading-none text-[color:var(--dark-blue,#022169)]">
                            <p className="leading-[40px]">{String(p.title)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full min-w-0 shrink-0">
                        <div className="flex w-full min-w-0 flex-col gap-y-[24px]">
                          {(p.clients ?? []).map((c, ci) => (
                            <div
                              key={ci}
                              className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]"
                            >
                              <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                                <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]">
                                  <p className="break-words leading-[25px]">{String(c.name)}</p>
                                </div>
                                <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]">
                                  <p className="break-words leading-[25px]">{String(c.segment)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "caseHighlightCta": {
      const metrics = (f.metrics as { label?: string; value?: string }[]) ?? [];
      const m0 = metrics[0];
      const m1 = metrics[1];
      const ctaPath = f.ctaPath ? String(f.ctaPath) : "/useme";
      const ctaLabel = f.ctaLabel ? String(f.ctaLabel) : "Przeczytaj Case Study";
      return (
        <div key={index} className="flow-root w-full min-w-0 shrink-0 self-stretch bg-white">
          <div className="content-stretch relative mx-auto flex w-full min-w-0 max-w-content shrink-0 flex-col items-start self-stretch overflow-visible bg-white pb-[96px]">
            <div className="content-stretch relative flex w-full min-w-0 shrink-0 flex-col gap-[80px] items-start bg-white max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-[61px]">
              <div className="relative flex w-full min-w-0 shrink-0 flex-col items-stretch overflow-hidden rounded-tr-[clamp(48px,12vw,100px)] bg-[var(--blue,#032796)] px-5 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-[80px]">
                <div className="pointer-events-none absolute right-[-80px] top-[-64px] size-[256px] rounded-[12px] bg-[rgba(0,91,179,0.1)] blur-[32px]" aria-hidden />
                <div className="relative flex w-full min-w-0 flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
                  <div className="flex min-w-0 w-full flex-1 flex-col items-start gap-8 lg:min-w-0 lg:pr-4 lg:max-w-[min(100%,42rem)]">
                    {f.badge ?
                      <div className="inline-flex items-start border border-solid border-[#7dfab6] px-[17px] py-[5px]">
                        <p className="m-0 font-['Satoshi:Bold',sans-serif] text-[12px] leading-[16px] tracking-[1.2px] text-[#7dfab6]">{String(f.badge)}</p>
                      </div>
                    : null}
                    <p
                      lang="pl"
                      className="m-0 max-w-full font-['Satoshi:Bold',sans-serif] text-[clamp(1.25rem,calc(0.72rem+2.65vw),2.25rem)] font-normal leading-[1.22] text-white text-balance break-words hyphens-auto whitespace-pre-wrap sm:leading-[1.2] lg:leading-[1.15]"
                    >
                      {String(f.title)}
                    </p>
                    {ctaPath.startsWith("http") ?
                      <a
                        href={ctaPath}
                        className="inline-flex max-w-full shrink-0 flex-wrap items-center justify-center gap-3 rounded-[18px] bg-white px-6 py-4 no-underline sm:inline-flex sm:justify-start sm:gap-4 sm:px-8 sm:py-5"
                      >
                        <span className="min-w-0 text-center font-['Satoshi:Bold',sans-serif] text-[15px] tracking-[1.2px] text-[#022169] sm:text-left sm:text-[16px]">
                          {ctaLabel}
                        </span>
                        <span
                          aria-hidden
                          className="inline-flex h-4 w-4 shrink-0 items-center justify-center"
                        >
                          <img alt="" src={iconArrow} className="block h-4 w-4" />
                        </span>
                      </a>
                    : <Link
                        to={ctaPath}
                        className="inline-flex max-w-full shrink-0 flex-wrap items-center justify-center gap-3 rounded-[18px] bg-white px-6 py-4 no-underline sm:inline-flex sm:justify-start sm:gap-4 sm:px-8 sm:py-5"
                      >
                        <span className="min-w-0 text-center font-['Satoshi:Bold',sans-serif] text-[15px] tracking-[1.2px] text-[#022169] sm:text-left sm:text-[16px]">
                          {ctaLabel}
                        </span>
                        <span
                          aria-hidden
                          className="inline-flex h-4 w-4 shrink-0 items-center justify-center"
                        >
                          <img alt="" src={iconArrow} className="block h-4 w-4" />
                        </span>
                      </Link>
                    }
                  </div>
                  <div className="flex w-full min-w-0 flex-col items-center gap-8 border-t border-solid border-[rgba(255,255,255,0.12)] pt-8 text-center lg:max-w-md lg:flex-none lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16">
                    {m0 ?
                      <div className="w-full min-w-0 max-w-md opacity-90">
                        <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center">
                          <p className="m-0 font-['Satoshi:Bold',sans-serif] text-[12px] tracking-[1.2px] text-white">{String(m0.label)}</p>
                          <div className="max-w-full break-words font-sans text-[16px] leading-[25px] text-white [overflow-wrap:anywhere]">
                            {whiteMetricValueLines(String(m0.value ?? ""))}
                          </div>
                        </div>
                      </div>
                    : null}
                    {m1 ?
                      <div className="w-full min-w-0 max-w-md opacity-90">
                        <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center">
                          <p className="m-0 font-['Satoshi:Bold',sans-serif] text-[12px] tracking-[1.2px] text-white">{String(m1.label)}</p>
                          <div className="max-w-full break-words font-sans text-[16px] leading-[25px] text-white [overflow-wrap:anywhere]">
                            {whiteMetricValueLines(String(m1.value ?? ""))}
                          </div>
                        </div>
                      </div>
                    : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "numberedIconSteps": {
      const steps = (f.steps as { number?: string; title?: string; body?: string }[]) ?? [];
      return (
        <div key={index} className="w-full min-w-0 bg-[#f3f3f3]">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] text-center whitespace-nowrap">
                  <p className="leading-[60px]">{String(f.sectionTitle)}</p>
                </div>
              </div>
              <div className="grid w-full min-h-0 grid-cols-1 grid-rows-[auto] gap-1 h-auto sm:grid-cols-2 lg:grid-cols-4 relative shrink-0">
                {steps.map((s, si) => {
                  const outer = NUMBERED_STEP_OUTER[Math.min(si, NUMBERED_STEP_OUTER.length - 1)]!;
                  return (
                    <div key={si} className={outer}>
                      <div className="bg-[var(--dark-blue,#022169)] relative shrink-0 size-[48px]">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                          <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap">
                            <p className="leading-[25px]">{String(s.number ?? "")}</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17.1px] relative size-full">
                          <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--font,#000f3d)] w-full">
                            <p className="leading-[40px]">{String(s.title ?? "")}</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.625px] relative size-full">
                          <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full">
                            {bodyLinesToParagraphs(String(s.body ?? ""))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "founderSpotlight":
      return <FounderSpotlightBlock key={index} f={f} />;

    case "testimonialsHome": {
      const items =
        (f.items as { quote?: string; authorName?: string; role?: string; avatarUrl?: string; avatar?: unknown; linkedinLink?: string }[]) ?? [];
      return (
        <div key={index} className="w-full min-w-0 bg-[#f3f3f3]">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 py-[96px] sm:px-6 md:px-10 lg:px-[61px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full">
              {f.sectionTitle ?
                <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
                  <div className="h-[16px] shrink-0 w-full" aria-hidden />
                  <div className="content-stretch flex flex-col items-center px-2 pb-[8px] relative shrink-0 w-full">
                    <div className="w-full max-w-full text-center font-['Satoshi:Bold',sans-serif] text-[clamp(2rem,6vw,3rem)] leading-tight text-[#022169]">
                      <p className="leading-tight">{String(f.sectionTitle)}</p>
                    </div>
                  </div>
                </div>
              : null}
              <div className="relative grid w-full min-w-0 grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-3 lg:gap-x-12">
                {items.map((it, ii) => {
                  const qLines = splitLines(String(it.quote ?? ""));
                  const av = cmsMediaEither(it.avatarUrl, it.avatar);
                  const spanThird = ii === 2 ? "md:col-span-2 lg:col-span-1" : "";
                  const linkedinLink = String(it.linkedinLink ?? "").trim();
                  const hasLinkedinLink = /^https?:\/\//i.test(linkedinLink);
                  return (
                    <div
                      key={ii}
                      className={`flex min-h-0 min-w-0 flex-col gap-8 border-[rgba(2,33,105,0.1)] border-l border-solid pl-6 sm:pl-8 ${spanThird}`}
                    >
                      <div className="relative min-w-0 w-full shrink-0">
                        <div className="flex flex-col items-start">
                          <div className="flex min-w-0 flex-col justify-center leading-normal not-italic text-[22px] text-[rgba(2,33,105,0.8)] w-full [overflow-wrap:anywhere]">
                            {qLines.map((line, qi) => (
                              <p key={qi} className={`leading-[27.5px] ${qi < qLines.length - 1 ? "mb-0" : ""}`}>
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full min-w-0 shrink-0">
                        <div className="flex gap-[16px] items-center w-full min-w-0">
                          <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[rgba(2,33,105,0.1)] bg-[rgba(2,33,105,0.05)] p-px size-[40px]">
                            <div className="relative h-[41px] w-[40px]">
                              {av ?
                                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={av} />
                              : null}
                            </div>
                          </div>
                          {hasLinkedinLink ?
                            <a
                              href={linkedinLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex min-w-0 flex-1 flex-col gap-[2px] items-start no-underline"
                            >
                              <div className="flex min-w-0 gap-[7px] items-center">
                                <div className="min-w-0 font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] text-[#022169] break-words">
                                  <p className="leading-[16px] m-0">{String(it.authorName)}</p>
                                </div>
                                <div className="relative shrink-0 size-[13px]">
                                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={iconLinkedIn} />
                                </div>
                              </div>
                              <p className="m-0 font-['Satoshi:Bold',sans-serif] text-[9px] uppercase leading-[13.5px] tracking-[1.8px] text-[color:var(--light-blue,#0083fe)] break-words">
                                {String(it.role)}
                              </p>
                            </a>
                          : <div className="flex min-w-0 flex-1 flex-col gap-[2px] items-start">
                              <div className="flex min-w-0 gap-[7px] items-center">
                                <div className="min-w-0 font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] text-[#022169] break-words">
                                  <p className="leading-[16px] m-0">{String(it.authorName)}</p>
                                </div>
                                <div className="relative shrink-0 size-[13px]">
                                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={iconLinkedIn} />
                                </div>
                              </div>
                              <p className="m-0 font-['Satoshi:Bold',sans-serif] text-[9px] uppercase leading-[13.5px] tracking-[1.8px] text-[color:var(--light-blue,#0083fe)] break-words">
                                {String(it.role)}
                              </p>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "knowledgeTeasers":
      return <KnowledgeTeasersBlockPayload key={index} f={f} />;

    case "challengeBand": {
      const rawFeatures = (f.features as { number?: string; title?: string; body?: string }[]) ?? [];
      const titleLines = splitLines(String(f.title ?? ""));
      const titleLine1 = titleLines[0] ?? String(f.title ?? "");
      const titleLine2 = titleLines.length > 1 ? titleLines.slice(1).join(" ") : "";
      const features = rawFeatures.map((x) => {
        const bl = splitLines(String(x.body ?? ""));
        return {
          number: String(x.number ?? ""),
          title: String(x.title ?? ""),
          bodyLine1: bl[0] ?? "",
          bodyLine2: bl[1] ?? "",
        };
      });
      return (
        <div
          key={index}
          className="bg-[var(--dark-blue,#022169)] content-stretch flex flex-col items-start overflow-clip py-[96px] relative shrink-0 w-full"
        >
          <div className="mx-auto w-full min-w-0 max-w-content px-4 sm:px-6 md:px-10 lg:px-[61px]">
            <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
                  {titleLine2 ?
                    <>
                      <p className="leading-[60px] mb-0">{titleLine1}</p>
                      <p className="leading-[60px]">{titleLine2}</p>
                    </>
                  : <p className="leading-[60px] whitespace-pre-wrap">{String(f.title)}</p>}
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
                {features.map((x, xi) => (
                  <div key={xi} className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0">
                      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7dfab6] text-[24px] whitespace-nowrap">
                        <p className="leading-[40px]">{x.number}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">
                          <p className="leading-[40px]">{x.title}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[20px] whitespace-nowrap">
                          <p className={`leading-[25px] ${x.bodyLine2 ? "mb-0" : ""}`}>{x.bodyLine1}</p>
                          {x.bodyLine2 ? <p className="leading-[25px]">{x.bodyLine2}</p> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

export function PageBlocks({ layout }: { layout: PayloadLayoutBlock[] | null | undefined }) {
  if (!layout?.length) return null;
  return (
    <>
      {layout.map((block, i) => (
        <div key={(block.id as string) ?? i} className="w-full min-w-0 shrink-0 self-stretch">
          {renderOneBlock(block, i)}
        </div>
      ))}
    </>
  );
}
