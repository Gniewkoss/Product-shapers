/** Program bento parity with `SzkoleniaMain.tsx` (lines 51–232). */

import type { ReactNode } from "react";

const defaultFooterAsset = "https://www.figma.com/api/mcp/asset/f3b460a1-e46e-48d6-8719-40d762e6f75d";

/** Zapobiega złamaniu „C-level” między „C-” a „level”. */
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

export function SzkoleniaProgramBentoFidelity(p: SzkoleniaProgramBentoProps) {
  const footerSrc = p.m05.footerImageUrl || defaultFooterAsset;
  return (
    <div className="w-full min-w-0 shrink-0 bg-white" data-node-id="1:136" data-name="Section - Program Modules (Bento Grid)">
      <div className="content-stretch relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-[64px] px-4 pb-[96px] pt-[96px] sm:px-6 md:px-10 lg:px-[61px]">
        <div
          className="content-stretch flex font-['Satoshi:Bold',sans-serif] items-baseline justify-between leading-[0] not-italic relative shrink-0 w-full whitespace-nowrap"
          data-node-id="1:137"
          data-name="Paragraph"
        >
          <div className="flex flex-col justify-center relative shrink-0 text-[#000f3d] text-[36px]" data-node-id="1:138">
            <p className="leading-[40px]">{p.headingTitle}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[#757682] text-[16px] tracking-[1.2px]" data-node-id="1:139">
            <p className="leading-[16px]">{p.headingEyebrow}</p>
          </div>
        </div>
        <div className="content-start flex flex-wrap gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:140" data-name="Container">
          <div
            className="bg-[#f3f3f3] content-stretch flex flex-col items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]"
            data-node-id="1:141"
            data-name="Module 1"
          >
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:142" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:143" data-name="Container">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(117,118,130,0.78)] w-full"
                  data-node-id="1:144"
                >
                  <p className="leading-[40px]">01</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:145" data-name="Heading 3">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[27px] w-full"
                  data-node-id="1:146"
                >
                  <p className="leading-[40px]">{p.m01.title}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:147" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-full"
                  data-node-id="1:148"
                >
                  <p className="leading-[25px]">{p.m01.body}</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:149" data-name="Margin">
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:150" data-name="Container">
                <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:151" data-name="Background">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap"
                    data-node-id="1:152"
                  >
                    <p className="leading-[16px]">{p.m01.tagA}</p>
                  </div>
                </div>
                <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:153" data-name="Background">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap"
                    data-node-id="1:154"
                  >
                    <p className="leading-[16px]">{p.m01.tagB}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-[var(--font,#000f3d)] content-stretch flex flex-col items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]"
            data-node-id="1:155"
            data-name="Module 2"
          >
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:156" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:157" data-name="Container">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[36px] w-full"
                  data-node-id="1:158"
                >
                  <p className="leading-[40px]">02</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:159" data-name="Heading 3">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-full"
                  data-node-id="1:160"
                >
                  <p className="leading-[40px]">{p.m02.title}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-node-id="1:161" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full"
                  data-node-id="1:162"
                >
                  <p className="leading-[25px]">{p.m02.body}</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:163" data-name="Margin">
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:164" data-name="Container">
                <div className="bg-[var(--dark-blue,#022169)] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:165" data-name="Background">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[12px] tracking-[1.2px] whitespace-nowrap"
                    data-node-id="1:166"
                  >
                    <p className="leading-[16px]">{p.m02.tagA}</p>
                  </div>
                </div>
                <div className="bg-[var(--dark-blue,#022169)] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:167" data-name="Background">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[12px] tracking-[1.2px] whitespace-nowrap"
                    data-node-id="1:168"
                  >
                    <p className="leading-[16px]">{p.m02.tagB}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-[#f3f3f3] content-stretch flex flex-col h-[405px] items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]"
            data-node-id="1:169"
            data-name="Module 6"
          >
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:170" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:171" data-name="Container">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(117,118,130,0.78)] w-full"
                  data-node-id="1:172"
                >
                  <p className="leading-[40px]">03</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:173" data-name="Heading 3">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[27px] w-full"
                  data-node-id="1:174"
                >
                  <p className="leading-[40px]">{p.m03.title}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:175" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-full"
                  data-node-id="1:176"
                >
                  {p.m03.bodyLines.map((line, i) => (
                    <p key={i} className={`leading-[25px] ${i < p.m03.bodyLines.length - 1 ? "mb-0" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:177" data-name="Margin">
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:178" data-name="Container">
                <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:179" data-name="Background">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap"
                    data-node-id="1:180"
                  >
                    <p className="leading-[16px]">{p.m03.tagA}</p>
                  </div>
                </div>
                <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:181" data-name="Background">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap"
                    data-node-id="1:182"
                  >
                    <p className="leading-[16px]">{p.m03.tagB}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="relative flex min-h-[400px] min-w-0 w-full flex-[1_1_100%] flex-col bg-[#f3f3f3] p-8 lg:flex-[2_1_calc(66.666%-4px)] lg:p-[48px]"
            data-node-id="1:183"
            data-name="Module 4"
          >
            <div className="flex w-full min-w-0 flex-col gap-8 xl:flex-row xl:items-center xl:gap-10" data-node-id="1:184" data-name="Container">
              <div className="flex min-w-0 w-full flex-1 flex-col gap-[16px] items-start xl:min-w-0" data-node-id="1:185" data-name="Container">
                <div className="flex w-full min-w-0 flex-col items-start" data-node-id="1:186" data-name="Container">
                  <div
                    className="flex w-full min-w-0 flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[36px] text-[rgba(117,118,130,0.78)]"
                    data-node-id="1:187"
                  >
                    <p className="leading-[40px]">04</p>
                  </div>
                </div>
                <div className="flex w-full min-w-0 flex-col items-start pt-[16px]" data-node-id="1:188" data-name="Heading 3">
                  <div
                    className="flex w-full min-w-0 flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[#000f3d] text-[24px]"
                    data-node-id="1:189"
                  >
                    <p className="leading-[40px]">{p.m04.title}</p>
                  </div>
                </div>
                <div className="flex w-full min-w-0 flex-col items-start" data-node-id="1:190" data-name="Container">
                  <div
                    className="w-full min-w-0 max-w-prose text-[20px] font-normal leading-[25px] text-[#444651] text-pretty xl:max-w-none"
                    data-node-id="1:191"
                  >
                    <p className="leading-[27px] sm:leading-[28px]">{wrapNoBreakCLevel(p.m04.body)}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full min-w-0 justify-center xl:flex-1 xl:justify-center">
                <div
                  className="flex w-full max-w-[320px] min-w-0 shrink-0 flex-col items-start justify-center border-l-4 border-solid border-[#005bb3] bg-white py-[24px] pl-[28px] pr-[24px] xl:w-[min(100%,288px)]"
                  data-node-id="1:192"
                  data-name="Background+VerticalBorder"
                >
                  <div className="relative w-full shrink-0" data-node-id="1:193" data-name="Margin">
                    <div className="flex flex-col items-start pb-[8px]">
                      <div className="flex w-full flex-col items-start" data-node-id="1:194" data-name="Container">
                        <div
                          className="flex w-full flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px]"
                          data-node-id="1:195"
                        >
                          <p className="leading-[16px]">{p.m04.asideEyebrow}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full min-w-0 shrink-0" data-node-id="1:196" data-name="Container">
                    <div className="w-full min-w-0 text-[16px] leading-[25px] text-[#1b1b1b] text-pretty" data-node-id="1:197">
                      <p className="mb-0 leading-[25px]">{p.m04.asideQuoteLine1}</p>
                      <p className="leading-[25px]">{p.m04.asideQuoteLine2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-[#7dfab6] content-stretch flex flex-col items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]"
            data-node-id="1:198"
            data-name="Module 5"
          >
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:199" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:200" data-name="Container">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(0,33,17,0.44)] w-full"
                  data-node-id="1:201"
                >
                  <p className="leading-[40px]">05</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:202" data-name="Heading 3">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002111] text-[24px] w-full"
                  data-node-id="1:203"
                >
                  <p className="leading-[40px]">{p.m05.title}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:204" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#005231] text-[20px] w-full"
                  data-node-id="1:205"
                >
                  {p.m05.bodyLines.map((line, i) => (
                    <p key={i} className={`leading-[25px] ${i < p.m05.bodyLines.length - 1 ? "mb-0" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:206" data-name="Margin">
              <div className="h-[25.5px] relative shrink-0 w-full" data-node-id="1:207" data-name="Container">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={footerSrc} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
