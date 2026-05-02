import type { ReactNode } from "react";
import { Link } from "react-router-dom";
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
import { getBlockFields, splitLines, splitParagraphs, type PayloadLayoutBlock } from "../../lib/payload/blockUtils";
import { mediaUrl } from "../../lib/payload/client";
import { sanitizeCmsHtml } from "../../lib/sanitizeCmsHtml";

/** Resolve CMS / Payload media paths (relative or absolute) for `<img src>` */
function cmsMedia(src: unknown): string {
  const raw = typeof src === "string" ? src.trim() : "";
  return mediaUrl(raw) ?? "";
}

/** Figma asset URLs — match `HomeMain` / `ArticlesMain` for visual parity with static fallbacks */
const imgCaseCtaArrow = "https://www.figma.com/api/mcp/asset/971bed54-9d58-4436-b682-fe002b12d53f";
/** `HomeMain` industry pillars — Fintech / Ecommerce icons (fallback when CMS has no URL) */
const imgIndustryPillarIcon0 = "https://www.figma.com/api/mcp/asset/57eb5300-0d15-4873-be8b-b29b2c84c025";
const imgIndustryPillarIcon1 = "https://www.figma.com/api/mcp/asset/2a0ccd0c-8aa6-4ea5-991c-72af2fde4c6e";
/** `UsemeMain` hero / context image fallback when `richSplit.mediaUrl` empty */
const USEME_CONTEXT_IMAGE_FALLBACK = "https://www.figma.com/api/mcp/asset/0eba44d5-9425-4c1e-a191-f61728ae2f23";
const imgKnowledgeTeaserArrow = "https://www.figma.com/api/mcp/asset/95d4461c-3559-429a-9376-21f687653a48";
const imgTestimonialLinkedIn = "https://www.figma.com/api/mcp/asset/01ff3667-cd79-4f08-902b-216735c2d283";
const imgFounderPortraitOverlay = "https://www.figma.com/api/mcp/asset/3ba9cf8c-ddf2-4c37-87ed-e115260701a9";

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

function fourLines(body: unknown): [string, string, string, string] {
  const L = splitLines(String(body ?? ""));
  while (L.length < 4) L.push("");
  return [L[0]!, L[1]!, L[2]!, L[3]!];
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
      bodyLines: fourLines(m2?.body),
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
      bodyLines: fourLines(m4?.body),
      footerImageUrl: m4?.footerImageUrl ? cmsMedia(m4.footerImageUrl) || undefined : undefined,
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
      const introL = fourLines(f.intro);
      const quoteL = splitLines(String(f.quote ?? ""));
      while (quoteL.length < 3) quoteL.push("");
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
          mediaUrl={cmsMedia(f.mediaUrl) || USEME_CONTEXT_IMAGE_FALLBACK}
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
      const cols = (f.columns as { iconUrl?: string; title?: string; body?: string }[]) ?? [];
      const strategyCols = cols.slice(0, 3).map((c, ci) => ({
        iconUrl: cmsMedia(c.iconUrl),
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
      return (
        <UsemeBentoFidelity
          key={index}
          lightQuote={String(light.quote ?? "")}
          lightInitials={String(light.avatarInitials ?? "MP")}
          lightName={String(light.authorName ?? "")}
          lightRole={String(light.role ?? "")}
          darkTopName={dTop.authorName ? String(dTop.authorName) : undefined}
          darkTopRole={dTop.role ? String(dTop.role) : undefined}
          darkBottomName={dBot.authorName ? String(dBot.authorName) : undefined}
          darkBottomRole={dBot.role ? String(dBot.role) : undefined}
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
      const pillars = (f.pillars as { title?: string; iconUrl?: string; clients?: { name?: string; segment?: string }[] }[]) ?? [];
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
                  const resolvedIcon = cmsMedia(p.iconUrl) || (pi === 0 ? imgIndustryPillarIcon0 : imgIndustryPillarIcon1);
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
          <div className="content-stretch mx-auto flex min-w-0 max-w-content shrink-0 flex-col items-start self-stretch overflow-clip bg-white pb-[96px] relative w-full">
            <div className="content-stretch flex w-full min-w-0 shrink-0 flex-col gap-[80px] items-start bg-white max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-[61px] relative">
              <div className="bg-[var(--blue,#032796)] content-stretch flex flex-col items-start overflow-clip pb-[80px] pt-[96px] px-5 sm:px-10 lg:px-[80px] relative rounded-tr-[100px] shrink-0 w-full">
                <div className="absolute bg-[rgba(0,91,179,0.1)] blur-[32px] right-[-80px] rounded-[12px] size-[256px] top-[-64px]" aria-hidden />
                <div className="content-stretch flex gap-[64px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[659.95px]">
                    {f.badge ?
                      <div className="border border-[#7dfab6] border-solid content-stretch flex items-start px-[17px] py-[5px] relative shrink-0">
                        <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#7dfab6] text-[12px] text-center tracking-[1.2px]">
                          <p className="leading-[16px]">{String(f.badge)}</p>
                        </div>
                      </div>
                    : null}
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-full">
                        <p className="leading-[40px] whitespace-pre-wrap">{String(f.title)}</p>
                      </div>
                    </div>
                    {ctaPath.startsWith("http") ?
                      <a
                        href={ctaPath}
                        className="bg-white content-stretch flex gap-[16px] items-center px-[40px] py-[20px] relative rounded-[18px] shrink-0 no-underline"
                      >
                        <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] w-[190px]">
                          <p className="leading-[16px]">{ctaLabel}</p>
                        </div>
                        <div className="relative shrink-0 size-[16px]">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCaseCtaArrow} />
                        </div>
                      </a>
                    : <Link
                        to={ctaPath}
                        className="bg-white content-stretch flex gap-[16px] items-center px-[40px] py-[20px] relative rounded-[18px] shrink-0 no-underline"
                      >
                        <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] w-[190px]">
                          <p className="leading-[16px]">{ctaLabel}</p>
                        </div>
                        <div className="relative shrink-0 size-[16px]">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCaseCtaArrow} />
                        </div>
                      </Link>
                    }
                  </div>
                  <div className="border-[rgba(255,255,255,0.1)] border-l border-solid content-stretch flex flex-col gap-[32px] h-[136px] items-start justify-center pl-[33px] relative shrink-0 w-[332.05px]">
                    {m0 ?
                      <div className="opacity-60 relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                            <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] w-[299px]">
                              <p className="leading-[16px]">{String(m0.label)}</p>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                            <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
                              {whiteMetricValueLines(String(m0.value ?? ""))}
                            </div>
                          </div>
                        </div>
                      </div>
                    : null}
                    {m1 ?
                      <div className="opacity-60 relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                            <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] w-full">
                              <p className="leading-[16px]">{String(m1.label)}</p>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                            <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
                              {whiteMetricValueLines(String(m1.value ?? ""))}
                            </div>
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

    case "founderSpotlight": {
      const paras = splitParagraphs(String(f.bodyParagraphs ?? ""));
      const stats = (f.stats as { value?: string; label?: string }[]) ?? [];
      const s0 = stats[0];
      const s1 = stats[1];
      const portraitUrl = cmsMedia(f.portraitUrl);
      return (
        <div key={index} className="w-full min-w-0 bg-white">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full">
            <div className="grid w-full min-h-0 max-w-[1536px] grid-cols-1 grid-rows-[auto] gap-10 lg:grid-cols-[repeat(2,minmax(0,1fr))] lg:gap-x-20 lg:gap-y-20 lg:grid-rows-[_minmax(0,568px)] relative shrink-0">
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
                        <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[16px] whitespace-nowrap">
                          <p className="leading-[25px]">{String(s0.label)}</p>
                        </div>
                      </div>
                    </div>
                  : null}
                  {s1 ?
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative self-stretch shrink-0 w-[161px]">
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
              <div className="aspect-square bg-[#e8e8e8] col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch overflow-clip relative rounded-tr-[80px] row-1 self-center shrink-0">
                {portraitUrl ?
                  <>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                      <img
                        alt=""
                        className="absolute h-full w-full max-w-none object-cover left-0 top-0"
                        src={portraitUrl}
                      />
                    </div>
                    <div className="absolute inset-0 mix-blend-multiply pointer-events-none z-[1]">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[139.57%] left-[-0.01%] max-w-none top-[0.1%] w-full"
                          src={imgFounderPortraitOverlay}
                        />
                      </div>
                    </div>
                  </>
                : (
                  <>
                    <div className="bg-white h-[568px] mix-blend-saturation shrink-0 w-full relative z-0" aria-hidden />
                    <div className="absolute inset-0 mix-blend-multiply z-[1]">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img alt="" className="absolute h-[139.57%] left-[-0.01%] max-w-none top-[0.1%] w-full" src={imgFounderPortraitOverlay} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "testimonialsHome": {
      const items = (f.items as { quote?: string; authorName?: string; role?: string; avatarUrl?: string }[]) ?? [];
      const roleColClass = ["w-[207.78px]", "w-[179px]", "w-[166px]"] as const;
      const quotePbClass = ["pb-[104px]", "pb-[40px]", "pb-[72px]"] as const;
      return (
        <div key={index} className="w-full min-w-0 bg-[#f3f3f3]">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full">
              {f.sectionTitle ?
                <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
                  <div className="h-[16px] shrink-0 w-full" aria-hidden />
                  <div className="content-stretch flex flex-col items-center pb-[8px] relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[48px] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[48px] text-center w-[441.13px]">
                      <p className="leading-[60px]">{String(f.sectionTitle)}</p>
                    </div>
                  </div>
                </div>
              : null}
              <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_464px] relative shrink-0 w-full">
                {items.map((it, ii) => {
                  const colN = ii === 0 ? "col-1" : ii === 1 ? "col-2" : "col-3";
                  const qLines = splitLines(String(it.quote ?? ""));
                  const pbQuote = quotePbClass[Math.min(ii, 2)]!;
                  const roleW = roleColClass[Math.min(ii, 2)]!;
                  const av = cmsMedia(it.avatarUrl);
                  return (
                    <div
                      key={ii}
                      className={`border-[rgba(2,33,105,0.1)] border-l border-solid ${colN} content-stretch flex flex-col items-start justify-between justify-self-stretch pl-[33px] relative row-1 self-start shrink-0`}
                    >
                      <div className="relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                          <div className={`bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start ${pbQuote} relative size-full`}>
                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                              <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-[rgba(2,33,105,0.8)] w-full">
                                {qLines.map((line, qi) => (
                                  <p key={qi} className={`leading-[27.5px] ${qi < qLines.length - 1 ? "mb-0" : ""}`}>
                                    {line}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 w-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                            <div className="bg-[rgba(2,33,105,0.05)] border border-[rgba(2,33,105,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[12px] shrink-0 size-[40px]">
                              <div className="h-[41px] relative shrink-0 w-[40px]">
                                {av ?
                                  <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={av} />
                                : null}
                              </div>
                            </div>
                            <div className={`content-stretch flex flex-col gap-[2px] items-start relative shrink-0 ${roleW}`}>
                              <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full">
                                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] whitespace-nowrap">
                                  <p className="leading-[16px]">{String(it.authorName)}</p>
                                </div>
                                <div className="relative shrink-0 size-[13px]">
                                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgTestimonialLinkedIn} />
                                </div>
                              </div>
                              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--light-blue,#0083fe)] tracking-[1.8px] uppercase w-full">
                                  <p className="leading-[13.5px]">{String(it.role)}</p>
                                </div>
                              </div>
                            </div>
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

    case "knowledgeTeasers": {
      const cards = (f.cards as { categoryLabel?: string; title?: string; excerpt?: string; imageUrl?: string; href?: string; ctaLabel?: string }[]) ?? [];
      const subtitleLines = f.subtitle ? splitLines(String(f.subtitle)) : [];
      return (
        <div key={index} className="w-full min-w-0 bg-white">
          <div className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[91px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full">
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
                className={`bg-[#e2e8f0] border border-[#e2e8f0] border-solid gap-x-px gap-y-px grid grid-cols-[repeat(3,minmax(0,1fr))] overflow-clip p-px relative shrink-0 w-full ${
                  cards.length === 3 ? "grid-rows-[__636px_minmax(0,1fr)] min-h-[637px]" : ""
                }`}
              >
                {cards.map((c, ci) => {
                  const rawHref = c.href ? String(c.href) : "/artykuly";
                  const href = rawHref.startsWith("http") ? rawHref : rawHref;
                  const colClass = cards.length === 3 ? (ci === 0 ? "col-1" : ci === 1 ? "col-2" : "col-3") + " row-1 self-start shrink-0" : "min-h-0";
                  return (
                    <div key={ci} className={`bg-white justify-self-stretch relative ${colClass}`}>
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

function KnowledgeTeaserCard({
  c,
  href,
}: {
  c: { categoryLabel?: string; title?: string; excerpt?: string; imageUrl?: string; ctaLabel?: string };
  href: string;
}) {
  const teaserImgSrc = cmsMedia(c.imageUrl);
  const ctaLabel = c.ctaLabel ?? "Dowiedz się więcej";
  const ctaRow =
    href.startsWith("http") ?
      <a href={href} className="content-stretch flex gap-[16px] items-center relative shrink-0 no-underline">
        <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--dark-blue,#022169)] tracking-[1.2px] w-[165px]">
          <p className="leading-[16px]">{ctaLabel}</p>
        </div>
        <div className="relative shrink-0 size-[12px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgKnowledgeTeaserArrow} />
        </div>
      </a>
    : <Link to={href} className="content-stretch flex gap-[16px] items-center relative shrink-0 no-underline">
        <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--dark-blue,#022169)] tracking-[1.2px] w-[165px]">
          <p className="leading-[16px]">{ctaLabel}</p>
        </div>
        <div className="relative shrink-0 size-[12px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgKnowledgeTeaserArrow} />
        </div>
      </Link>;

  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
      <div className="content-stretch flex flex-col h-[256px] items-start justify-center overflow-clip relative shrink-0 w-full">
        <div className="flex-[1_0_0] min-h-px relative w-full">
          {teaserImgSrc ?
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 overflow-hidden">
                <img alt="" className="absolute h-[157.81%] left-0 max-w-none top-[-28.91%] w-full" src={teaserImgSrc} />
              </div>
              <div className="absolute bg-white inset-0 mix-blend-saturation" />
            </div>
          : null}
        </div>
      </div>
      <div className="content-stretch flex flex-col h-[380px] items-start justify-between p-[48px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {c.categoryLabel ?
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full">
                  <p className="leading-[16px]">{String(c.categoryLabel)}</p>
                </div>
              </div>
            : null}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[24px] w-full">
                <p className="leading-[40px]">{String(c.title)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-full">
              <p className="leading-[25px]">{String(c.excerpt ?? "")}</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-end min-h-[28px] pt-[42.25px] relative w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">{ctaRow}</div>
        </div>
      </div>
    </div>
  );
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
