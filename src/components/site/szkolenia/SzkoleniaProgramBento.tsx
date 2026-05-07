/** Program bento parity with `SzkoleniaMain.tsx` (lines 51–232). */

import type { ReactNode } from "react";

const defaultFooterAsset = "https://www.figma.com/api/mcp/asset/f3b460a1-e46e-48d6-8719-40d762e6f75d";

/** Zapobiega złamaniu „C-level" między „C-" a „level". */
function wrapNoBreakCLevel(text: string): ReactNode {
  const parts = text.split(/(C-level)/gi);
  return parts.map((part, i) =>
    /^c-level$/i.test(part) ?
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    : part,
  );
}

export type SzkoleniaProgramBentoProps = {
  headingTitle: string;
  headingEyebrow: string;
  m01: { title: string; body: string; tagA: string; tagB: string };
  m02: { title: string; body: string; tagA: string; tagB: string };
  m03: { title: string; bodyLines: [string, string, string, string]; tagA: string; tagB: string };
  m04: { title: string; body: string; asideEyebrow: string; asideQuoteLine1: string; asideQuoteLine2: string };
  m05: { title: string; bodyLines: [string, string, string, string]; footerImageUrl?: string };
};

function ModuleTag({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`inline-block px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[1.2px] ${
        dark ? "bg-[#022169] text-[#778cd8]" : "bg-[#eee] text-[#757682]"
      }`}
    >
      {label}
    </span>
  );
}

function ModuleNumber({ num, color }: { num: string; color?: string }) {
  return (
    <span className={`font-sans text-[28px] sm:text-[36px] font-bold leading-none ${color ?? "text-[rgba(117,118,130,0.78)]"}`}>
      {num}
    </span>
  );
}

export function SzkoleniaProgramBentoFidelity(p: SzkoleniaProgramBentoProps) {
  const footerSrc = p.m05.footerImageUrl || defaultFooterAsset;
  return (
    <div className="w-full min-w-0 shrink-0 bg-white" data-name="Section - Program Modules (Bento Grid)">
      <div className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-10 px-4 pb-[96px] pt-[96px] sm:gap-16 sm:px-6 md:px-10 lg:px-[61px]">

        {/* Section heading */}
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6">
          <p className="font-sans text-[26px] sm:text-[36px] font-bold leading-tight text-[#000f3d]">
            {p.headingTitle}
          </p>
          <p className="font-sans text-[12px] sm:text-[16px] font-bold uppercase tracking-[1.2px] text-[#757682] sm:shrink-0">
            {p.headingEyebrow}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">

          {/* Module 01 */}
          <div className="flex min-h-[300px] flex-col items-start justify-between bg-[#f3f3f3] p-6 sm:min-h-[400px] sm:p-10 lg:p-[48px]" data-name="Module 1">
            <div className="flex w-full flex-col gap-4">
              <ModuleNumber num="01" />
              <p className="font-sans text-[20px] sm:text-[24px] lg:text-[27px] font-bold leading-snug text-[#000f3d]">
                {p.m01.title}
              </p>
              <p className="text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed text-[#444651]">
                {p.m01.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-6">
              <ModuleTag label={p.m01.tagA} />
              <ModuleTag label={p.m01.tagB} />
            </div>
          </div>

          {/* Module 02 */}
          <div className="flex min-h-[300px] flex-col items-start justify-between bg-[#000f3d] p-6 sm:min-h-[400px] sm:p-10 lg:p-[48px]" data-name="Module 2">
            <div className="flex w-full flex-col gap-4">
              <ModuleNumber num="02" color="text-[#757682]" />
              <p className="font-sans text-[20px] sm:text-[24px] font-bold leading-snug text-white">
                {p.m02.title}
              </p>
              <p className="text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed text-white/80">
                {p.m02.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-6">
              <ModuleTag label={p.m02.tagA} dark />
              <ModuleTag label={p.m02.tagB} dark />
            </div>
          </div>

          {/* Module 03 */}
          <div className="flex min-h-[300px] flex-col items-start justify-between bg-[#f3f3f3] p-6 sm:min-h-[400px] sm:p-10 lg:p-[48px]" data-name="Module 3">
            <div className="flex w-full flex-col gap-4">
              <ModuleNumber num="03" />
              <p className="font-sans text-[20px] sm:text-[24px] lg:text-[27px] font-bold leading-snug text-[#000f3d]">
                {p.m03.title}
              </p>
              <div className="text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed text-[#444651]">
                {p.m03.bodyLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-6">
              <ModuleTag label={p.m03.tagA} />
              <ModuleTag label={p.m03.tagB} />
            </div>
          </div>

          {/* Module 04 — spans 2 columns on lg */}
          <div
            className="flex min-h-[300px] w-full flex-col bg-[#f3f3f3] p-6 sm:col-span-2 sm:min-h-[400px] sm:p-10 lg:col-span-2 lg:p-[48px]"
            data-name="Module 4"
          >
            <div className="flex w-full min-w-0 flex-col gap-8 xl:flex-row xl:items-center xl:gap-10">

              {/* Left: text */}
              <div className="flex min-w-0 w-full flex-1 flex-col gap-4">
                <ModuleNumber num="04" />
                <p className="font-sans text-[20px] sm:text-[24px] font-bold leading-snug text-[#000f3d]">
                  {p.m04.title}
                </p>
                <p className="text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed text-[#444651] text-pretty">
                  {wrapNoBreakCLevel(p.m04.body)}
                </p>
              </div>

              {/* Right: quote card */}
              <div className="flex w-full min-w-0 justify-start xl:flex-1 xl:justify-center">
                <div className="w-full max-w-sm border-l-4 border-[#005bb3] bg-white py-6 pl-7 pr-6 xl:w-[min(100%,288px)]">
                  <p className="font-sans text-[13px] sm:text-[16px] font-bold uppercase tracking-[1.2px] text-[#0083fe] pb-3">
                    {p.m04.asideEyebrow}
                  </p>
                  <p className="text-[14px] sm:text-[16px] leading-relaxed text-[#1b1b1b]">
                    {p.m04.asideQuoteLine1}
                  </p>
                  <p className="text-[14px] sm:text-[16px] leading-relaxed text-[#1b1b1b]">
                    {p.m04.asideQuoteLine2}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Module 05 */}
          <div className="flex min-h-[300px] flex-col items-start justify-between bg-[#7dfab6] p-6 sm:min-h-[400px] sm:p-10 lg:p-[48px]" data-name="Module 5">
            <div className="flex w-full flex-col gap-4">
              <ModuleNumber num="05" color="text-[rgba(0,33,17,0.44)]" />
              <p className="font-sans text-[20px] sm:text-[24px] font-bold leading-snug text-[#002111]">
                {p.m05.title}
              </p>
              <div className="text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed text-[#005231]">
                {p.m05.bodyLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            <div className="relative h-6 w-full pt-6">
              <img alt="" className="block h-full w-auto max-w-full object-contain object-left" src={footerSrc} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
