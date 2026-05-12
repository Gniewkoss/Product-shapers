import { SzkoleniaFaqAccordion } from "../components/SzkoleniaFaqAccordion";
import { type SzkoleniaWhyShapeUpProps, SzkoleniaWhyShapeUpFidelity } from "../components/site/szkolenia/SzkoleniaWhyShapeUp";
import { useSitePayload } from "../context/SitePayloadContext";
import { fourLinesPad, getBlockFields, splitLines, type PayloadLayoutBlock } from "../lib/payload/blockUtils";
import { uploadRefMedia } from "../lib/payload/client";
import dataNarrativesIcon from "../assets/branding/data-narratives.png";

const WHY_SHAPE_UP_FALLBACK: SzkoleniaWhyShapeUpProps = {
  titleLine1: "Dlaczego",
  titleLine2: "Shape Up?",
  introLines: fourLinesPad(`Metodologia Shape Up to odpowiedź na chaos agile'owy.
Zamiast dwutygodniowych sprintów, które nigdy się nie
kończą, oferujemy system, który gwarantuje dowiezienie
wartości w przewidywalnym czasie.`),
  benefit1: "Eliminacja „sprint fatigue”",
  benefit2: "Jasne granice (circuits)",
  benefit3: "Realna autonomia zespołów",
  statValue: "100%",
  statLabel: "Focus on outcomes",
  quoteLine1: `"Praca w 6-tygodniowych`,
  quoteLine2: "cyklach zmieniła nasz sposób",
  quoteLine3: `myślenia o produkcie."`,
  darkCardTitle: "Precyzyjne modelowanie",
  darkCardBody: "Stawianie na właściwe rzeczy we właściwym czasie.",
};

function whyShapeUpPropsFromLayout(layout: PayloadLayoutBlock[] | undefined): SzkoleniaWhyShapeUpProps {
  const block = layout?.find((b) => b.blockType === "szkoleniaWhyShapeUp");
  if (!block) return WHY_SHAPE_UP_FALLBACK;
  const f = getBlockFields(block);
  const quoteL = splitLines(String(f.quote ?? ""));
  while (quoteL.length < 3) quoteL.push("");
  const introLines = fourLinesPad(f.intro != null && String(f.intro).trim() !== "" ? f.intro : WHY_SHAPE_UP_FALLBACK.introLines.join("\n"));
  const accent = uploadRefMedia(f.accentTileImage);
  return {
    titleLine1: f.titleLine1 != null && String(f.titleLine1).trim() !== "" ? String(f.titleLine1) : WHY_SHAPE_UP_FALLBACK.titleLine1,
    titleLine2: f.titleLine2 != null && String(f.titleLine2).trim() !== "" ? String(f.titleLine2) : WHY_SHAPE_UP_FALLBACK.titleLine2,
    introLines,
    benefit1: f.benefit1 != null && String(f.benefit1).trim() !== "" ? String(f.benefit1) : WHY_SHAPE_UP_FALLBACK.benefit1,
    benefit2: f.benefit2 != null && String(f.benefit2).trim() !== "" ? String(f.benefit2) : WHY_SHAPE_UP_FALLBACK.benefit2,
    benefit3: f.benefit3 != null && String(f.benefit3).trim() !== "" ? String(f.benefit3) : WHY_SHAPE_UP_FALLBACK.benefit3,
    statValue: f.statValue != null && String(f.statValue).trim() !== "" ? String(f.statValue) : WHY_SHAPE_UP_FALLBACK.statValue,
    statLabel: f.statLabel != null && String(f.statLabel).trim() !== "" ? String(f.statLabel) : WHY_SHAPE_UP_FALLBACK.statLabel,
    quoteLine1: quoteL[0] !== "" ? quoteL[0]! : WHY_SHAPE_UP_FALLBACK.quoteLine1,
    quoteLine2: quoteL[1] !== "" ? quoteL[1]! : WHY_SHAPE_UP_FALLBACK.quoteLine2,
    quoteLine3: quoteL[2] !== "" ? quoteL[2]! : WHY_SHAPE_UP_FALLBACK.quoteLine3,
    darkCardTitle:
      f.darkCardTitle != null && String(f.darkCardTitle).trim() !== "" ? String(f.darkCardTitle) : WHY_SHAPE_UP_FALLBACK.darkCardTitle,
    darkCardBody:
      f.darkCardBody != null && String(f.darkCardBody).trim() !== "" ? String(f.darkCardBody) : WHY_SHAPE_UP_FALLBACK.darkCardBody,
    accentTileImageUrl: accent.url,
    accentTileImageAlt: accent.alt,
  };
}

function SzkoleniaMainFallback({
  faqItems,
  layout,
}: {
  faqItems?: { title: string; answer: string }[];
  layout?: PayloadLayoutBlock[];
}) {
  return (
    <div className="content-stretch relative size-full flex flex-col items-start bg-[#f9f9f9] pb-[3.66px]" data-node-id="1:126" data-name="Szkolenia (Desktop) - Brand Strict">
      <div className="flex flex-col items-start pt-[80px] relative w-full md:pt-[100px]">
        <div className="w-full min-w-0 bg-white">
        <div className="relative mx-auto w-full min-w-0 max-w-content shrink-0 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]" data-node-id="1:128" data-name="Hero Section">
          <div className="relative grid w-full grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[minmax(0,auto)] gap-x-8 gap-y-8 lg:grid-rows-[auto]">
          <div className="border-[var(--dark-blue,#022169)] border-l-4 border-solid col-[1/span_12] lg:col-[1/span_8] content-stretch flex w-full min-w-0 max-w-full flex-col gap-[24px] items-start justify-self-start pl-8 pr-0 sm:pl-8 relative row-1 self-start shrink-0 lg:max-w-[821px]" data-node-id="1:129" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:130" data-name="Container">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#005bb3] text-[16px] tracking-[1.2px] w-full" data-node-id="1:131">
                <p className="leading-[16px]">Ekspercka Wiedza Produktowa</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:132" data-name="Heading 1">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[40px] leading-tight w-full md:text-[64px] md:leading-[1.1] md:tracking-tight" data-node-id="1:133">
                <p className="leading-[1.1] mb-0">Program Mentorski</p>
                <p className="leading-[1.1]">2024</p>
              </div>
            </div>
            <div className="content-stretch flex w-full min-w-0 max-w-[672px] flex-col items-start pt-[7px] relative shrink-0" data-node-id="1:134" data-name="Container">
              <p className="not-italic text-[#444651] text-[22px] leading-[1.35] w-full m-0">Ekskluzywny, 12-tygodniowy proces transformacji dla Product Managerów i Leadów, którzy chcą wyjść poza ramy standardowego zarządzania i stać się architektami wartości biznesowej.</p>
            </div>
          </div>
          </div>
        </div>
        </div>
        <div className="w-full min-w-0 shrink-0 bg-white" data-node-id="1:136" data-name="Section - Program Modules (Bento Grid)">
          <div className="content-stretch relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-[64px] px-4 pb-[96px] pt-[96px] sm:px-6 md:px-10 lg:px-[61px]">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6">
            <p className="font-sans text-[26px] sm:text-[36px] font-bold leading-tight text-[#000f3d]">Struktura programu</p>
            <p className="font-sans text-[12px] sm:text-[16px] font-bold uppercase tracking-[1.2px] text-[#757682] sm:shrink-0">06 MODUŁÓW / 12 TYGODNI</p>
          </div>
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 relative shrink-0" data-node-id="1:140" data-name="Container">
            <div className="bg-[#f3f3f3] content-stretch flex flex-col items-start justify-between min-h-[400px] p-8 lg:p-[48px] relative" data-node-id="1:141" data-name="Module 1">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:142" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:143" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(117,118,130,0.78)] w-full" data-node-id="1:144">
                    <p className="leading-[40px]">01</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:145" data-name="Heading 3">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[27px] w-full" data-node-id="1:146">
                    <p className="leading-[40px]">Discovery Architecture</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:147" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-full" data-node-id="1:148">
                    <p className="leading-[25px]">Projektowanie procesów odkrywania produktu, które eliminują zgadywanie. Nauczysz się jak budować prototypy o wysokim stopniu pewności.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:149" data-name="Margin">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:150" data-name="Container">
                  <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:151" data-name="Background">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:152">
                      <p className="leading-[16px]">Validation</p>
                    </div>
                  </div>
                  <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:153" data-name="Background">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:154">
                      <p className="leading-[16px]">Validation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--font,#000f3d)] content-stretch flex flex-col items-start justify-between min-h-[400px] p-8 lg:p-[48px] relative" data-node-id="1:155" data-name="Module 2">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:156" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:157" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[36px] w-full" data-node-id="1:158">
                    <p className="leading-[40px]">02</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:159" data-name="Heading 3">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-full" data-node-id="1:160">
                    <p className="leading-[40px]">Shape up mastery</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-node-id="1:161" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full" data-node-id="1:162">
                    <p className="leading-[25px]">Głębokie zanurzenie w metodologię Basecamp. Betting, Shaping, Building. Nauczysz się jak unikać backlogów na rzecz realnej pracy.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:163" data-name="Margin">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:164" data-name="Container">
                  <div className="bg-[var(--dark-blue,#022169)] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:165" data-name="Background">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[12px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:166">
                      <p className="leading-[16px]">Strategy</p>
                    </div>
                  </div>
                  <div className="bg-[var(--dark-blue,#022169)] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:167" data-name="Background">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[12px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:168">
                      <p className="leading-[16px]">Execution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#f3f3f3] content-stretch flex flex-col items-start justify-between min-h-[400px] p-8 lg:p-[48px] relative" data-node-id="1:169" data-name="Module 6">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:170" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:171" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(117,118,130,0.78)] w-full" data-node-id="1:172">
                    <p className="leading-[40px]">03</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:173" data-name="Heading 3">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[27px] w-full" data-node-id="1:174">
                    <p className="leading-[40px]">Strategic betting</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:175" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-full" data-node-id="1:176">
                    <p className="leading-[25px] mb-0">Jak wybierać projekty, które mają</p>
                    <p className="leading-[25px] mb-0">znaczenie. Finansowe i operacyjne</p>
                    <p className="leading-[25px] mb-0">aspekty podejmowania decyzji</p>
                    <p className="leading-[25px]">produktowych.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:177" data-name="Margin">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:178" data-name="Container">
                  <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:179" data-name="Background">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:180">
                      <p className="leading-[16px]">Roi analysis</p>
                    </div>
                  </div>
                  <div className="bg-[#eee] content-stretch flex flex-col items-start px-[16px] py-[4px] relative self-stretch shrink-0" data-node-id="1:181" data-name="Background">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[12px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:182">
                      <p className="leading-[16px]">Risk management</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex min-h-[400px] min-w-0 flex-col items-start bg-[#f3f3f3] p-8 sm:col-span-2 lg:p-[48px]" data-node-id="1:183" data-name="Module 4">
              <div className="flex w-full min-w-0 flex-col gap-8 xl:flex-row xl:items-center xl:gap-10" data-node-id="1:184" data-name="Container">
                <div className="flex min-w-0 w-full flex-1 flex-col gap-[16px] items-start xl:min-w-0" data-node-id="1:185" data-name="Container">
                  <div className="flex w-full min-w-0 flex-col items-start" data-node-id="1:186" data-name="Container">
                    <div className="flex w-full min-w-0 flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[36px] text-[rgba(117,118,130,0.78)]" data-node-id="1:187">
                      <p className="leading-[40px]">04</p>
                    </div>
                  </div>
                  <div className="flex w-full min-w-0 flex-col items-start pt-[16px]" data-node-id="1:188" data-name="Heading 3">
                    <div className="flex w-full min-w-0 flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[#000f3d] text-[24px]" data-node-id="1:189">
                      <p className="leading-[40px]">{`Product authority `}</p>
                    </div>
                  </div>
                  <div className="flex w-full min-w-0 flex-col items-start" data-node-id="1:190" data-name="Container">
                    <div className="w-full min-w-0 max-w-prose text-[20px] font-normal leading-[25px] text-[#444651] text-pretty xl:max-w-none" data-node-id="1:191">
                      <p className="leading-[27px] sm:leading-[28px]">
                        Budowanie autorytetu w organizacji. Komunikacja z{" "}
                        <span className="whitespace-nowrap">C-level</span>, negocjacje zasobów i zarządzanie oczekiwaniami interesariuszy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full min-w-0 justify-center xl:flex-1 xl:justify-center" data-node-id="1:192-wrap">
                  <div
                    className="flex w-full max-w-[320px] min-w-0 shrink-0 flex-col items-start justify-center border-l-4 border-solid border-[#005bb3] bg-white py-[24px] pl-[28px] pr-[24px] xl:w-[min(100%,288px)]"
                    data-node-id="1:192"
                    data-name="Background+VerticalBorder"
                  >
                    <div className="relative shrink-0 w-full" data-node-id="1:193" data-name="Margin">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative size-full">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:194" data-name="Container">
                          <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full" data-node-id="1:195">
                            <p className="leading-[16px]">KEY TAKEAWAY</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative shrink-0 w-full" data-node-id="1:196" data-name="Container">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                        <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1b] text-[16px] w-full" data-node-id="1:197">
                          <p className="leading-[25px]">{`"Autorytet nie pochodzi z roli, ale z jakości dostarczanych argumentów i danych."`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#7dfab6] content-stretch flex flex-col items-start justify-between min-h-[400px] p-8 lg:p-[48px] relative" data-node-id="1:198" data-name="Module 5">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:199" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:200" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(0,33,17,0.44)] w-full" data-node-id="1:201">
                    <p className="leading-[40px]">05</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:202" data-name="Heading 3">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002111] text-[24px] w-full" data-node-id="1:203">
                    <p className="leading-[40px]">{`Data driven narratives `}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:204" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#005231] text-[20px] w-full" data-node-id="1:205">
                    <p className="leading-[25px] mb-0">Wykorzystanie analityki do</p>
                    <p className="leading-[25px] mb-0">budowania przekonujących historii</p>
                    <p className="leading-[25px] mb-0">produktowych, które mobilizują</p>
                    <p className="leading-[25px]">zespoły do działania.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-node-id="1:206" data-name="Margin">
                <div className="relative h-[32px] w-full shrink-0" data-node-id="1:207" data-name="Container">
                  <img
                    alt=""
                    aria-hidden
                    className="block h-full w-auto object-contain object-left"
                    src={dataNarrativesIcon}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <SzkoleniaWhyShapeUpFidelity {...whyShapeUpPropsFromLayout(layout)} />
        <div className="w-full min-w-0 bg-white">
        <div
          className="content-stretch mx-auto flex min-w-0 max-w-content flex-col items-center px-4 pb-[192px] pt-[96px] sm:px-6 md:px-10 lg:px-[61px] relative shrink-0 w-full"
          data-node-id="1:251"
          data-name="Section - FAQ Accordion"
        >
          <div
            className="mx-auto flex w-full min-w-0 max-w-[896px] shrink-0 flex-col gap-[64px] items-center content-stretch relative"
            data-node-id="1:252"
            data-name="Container"
          >
            <div className="content-stretch flex w-full flex-col gap-[16px] items-center relative shrink-0" data-node-id="1:253" data-name="Container">
              <div className="content-stretch flex w-full flex-col items-center relative shrink-0" data-node-id="1:254" data-name="Heading 2">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[32px] md:text-[48px] text-center w-full"
                  data-node-id="1:255"
                >
                  <p className="leading-[60px]">Najczęściej zadawane pytania</p>
                </div>
              </div>
              <div className="content-stretch flex w-full flex-col items-center relative shrink-0" data-node-id="1:256" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[22px] text-center"
                  data-node-id="1:257"
                >
                  <p className="leading-[27.5px]">Wszystko, co musisz wiedzieć przed dołączeniem do programu.</p>
                </div>
              </div>
            </div>
            <SzkoleniaFaqAccordion items={faqItems} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export function SzkoleniaMain() {
  const { sitePagesByRoute } = useSitePayload();
  const layout = sitePagesByRoute.szkolenia?.layout as PayloadLayoutBlock[] | undefined;

  const faqBlock = layout?.find((b) => b.blockType === "faqList");
  const faqItems = faqBlock
    ? (getBlockFields(faqBlock).items as { question?: string; answer?: string }[] | undefined)
        ?.filter((x) => x.question && x.answer)
        .map((x) => ({ title: String(x.question), answer: String(x.answer) }))
    : undefined;

  return <SzkoleniaMainFallback faqItems={faqItems} layout={layout} />;
}
