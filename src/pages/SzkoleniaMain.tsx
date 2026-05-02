import { PageBlocks } from "../components/cms/PageBlocks";
import { SzkoleniaFaqAccordion } from "../components/SzkoleniaFaqAccordion";
import { useSitePayload } from "../context/SitePayloadContext";
import type { PayloadLayoutBlock } from "../lib/payload/blockUtils";

const imgContainer = "https://www.figma.com/api/mcp/asset/f3b460a1-e46e-48d6-8719-40d762e6f75d";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/0857130b-81a6-4514-817e-27c32b4bfbda";
const imgIcon = "https://www.figma.com/api/mcp/asset/e27b3d11-14c4-4f8f-882d-78150d0442eb";
function SzkoleniaMainFallback() {
  return (
    <div className="content-stretch relative size-full flex flex-col items-start bg-[#f9f9f9] pb-[3.66px]" data-node-id="1:126" data-name="Szkolenia (Desktop) - Brand Strict">
      <div className="content-stretch flex flex-col items-start pt-[110px] relative shrink-0 w-full max-md:pt-[96px]" data-node-id="1:127" data-name="Main">
        <div className="w-full min-w-0 bg-white">
        <div className="relative mx-auto w-full min-w-0 max-w-content shrink-0 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]" data-node-id="1:128" data-name="Hero Section">
          <div className="relative grid w-full grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[minmax(0,auto)] gap-x-8 gap-y-8 lg:grid-rows-[auto]">
          <div className="border-[var(--dark-blue,#022169)] border-l-4 border-solid col-[1/span_8] content-stretch flex w-full min-w-0 max-w-full flex-col gap-[24px] items-start justify-self-start pl-8 pr-0 sm:pl-8 relative row-1 self-start shrink-0 lg:max-w-[821px]" data-node-id="1:129" data-name="Container">
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
              <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] whitespace-nowrap" data-node-id="1:135">
                <p className="leading-[27.5px] mb-0">Ekskluzywny, 12-tygodniowy proces transformacji dla Product</p>
                <p className="leading-[27.5px] mb-0">Managerów i Leadów, którzy chcą wyjść poza ramy standardowego</p>
                <p className="leading-[27.5px]">zarządzania i stać się architektami wartości biznesowej.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
        <div className="w-full min-w-0 shrink-0 bg-white" data-node-id="1:136" data-name="Section - Program Modules (Bento Grid)">
          <div className="content-stretch relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-[64px] px-4 pb-[96px] pt-[96px] sm:px-6 md:px-10 lg:px-[61px]">
          <div className="content-stretch flex font-['Satoshi:Bold',sans-serif] items-baseline justify-between leading-[0] not-italic relative shrink-0 w-full whitespace-nowrap" data-node-id="1:137" data-name="Paragraph">
            <div className="flex flex-col justify-center relative shrink-0 text-[#000f3d] text-[36px]" data-node-id="1:138">
              <p className="leading-[40px]">Struktura programu</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[#757682] text-[16px] tracking-[1.2px]" data-node-id="1:139">
              <p className="leading-[16px]">06 MODUŁÓW / 12 TYGODNI</p>
            </div>
          </div>
          <div className="content-start flex flex-wrap gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:140" data-name="Container">
            <div className="bg-[#f3f3f3] content-stretch flex flex-col items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]" data-node-id="1:141" data-name="Module 1">
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
            <div className="bg-[var(--font,#000f3d)] content-stretch flex flex-col items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]" data-node-id="1:155" data-name="Module 2">
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
            <div className="bg-[#f3f3f3] content-stretch flex flex-col h-[405px] items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]" data-node-id="1:169" data-name="Module 6">
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
            <div className="bg-[#f3f3f3] content-stretch flex flex-col h-[400px] items-start min-h-[400px] p-[48px] relative shrink-0 w-[770.667px]" data-node-id="1:183" data-name="Module 4">
              <div className="content-stretch flex h-[303px] items-center justify-between relative shrink-0 w-full" data-node-id="1:184" data-name="Container">
                <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[413.34px]" data-node-id="1:185" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:186" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(117,118,130,0.78)] w-full" data-node-id="1:187">
                      <p className="leading-[40px]">04</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-node-id="1:188" data-name="Heading 3">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[24px] w-full" data-node-id="1:189">
                      <p className="leading-[40px]">{`Product authority `}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:190" data-name="Container">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-[392px]" data-node-id="1:191">
                      <p className="leading-[25px]">Budowanie autorytetu w organizacji. Komunikacja z C-level, negocjacje zasobów i zarządzanie oczekiwaniami interesariuszy.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-[#005bb3] border-l-4 border-solid content-stretch flex flex-col h-[199px] items-start justify-center pl-[28px] pr-[24px] py-[24px] relative shrink-0 w-[231px]" data-node-id="1:192" data-name="Background+VerticalBorder">
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
                      <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1b] text-[16px] w-[183px]" data-node-id="1:197">
                        <p className="leading-[25px] mb-0">{`"Autorytet nie pochodzi z`}</p>
                        <p className="leading-[25px]">{`roli, ale z jakości dostarczanych argumentów i danych."`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#7dfab6] content-stretch flex flex-col items-start justify-between min-h-[400px] p-[48px] relative shrink-0 w-[383.333px]" data-node-id="1:198" data-name="Module 5">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:199" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:200" data-name="Container">
                  <div className="flex flex-col font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(0,33,17,0.44)] w-full" data-node-id="1:201">
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
                <div className="h-[25.5px] relative shrink-0 w-full" data-node-id="1:207" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="w-full shrink-0 bg-[#f3f3f3]" data-node-id="1:209" data-name="Section - Dlaczego Shape Up">
          <div className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 py-[96px] sm:px-6 md:px-10 lg:px-[61px]">
          <div className="gap-x-[96px] gap-y-[96px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_541px] relative shrink-0 w-full" data-node-id="1:210" data-name="Container">
            <div className="col-1 content-stretch flex flex-col gap-[31.4px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="1:211" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:212" data-name="Heading 2">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full" data-node-id="1:213">
                  <p className="leading-[60px] mb-0">Dlaczego</p>
                  <p className="leading-[60px]">Shape Up?</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="1:214" data-name="Container">
                <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full" data-node-id="1:215">
                  <p className="leading-[27.5px] mb-0">{`Metodologia Shape Up to odpowiedź na chaos agile'owy.`}</p>
                  <p className="leading-[27.5px] mb-0">Zamiast dwutygodniowych sprintów, które nigdy się nie</p>
                  <p className="leading-[27.5px] mb-0">kończą, oferujemy system, który gwarantuje dowiezienie</p>
                  <p className="leading-[27.5px]">wartości w przewidywalnym czasie.</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16.6px] relative shrink-0 w-full" data-node-id="1:216" data-name="Container">
                <div className="bg-[#e3e3e3] content-stretch flex gap-[24px] items-center p-[24px] relative shrink-0 w-full" data-node-id="1:217" data-name="Background">
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:218" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:220" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1b] text-[16px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:221">
                      <p className="leading-[16px]">Eliminacja „sprint fatigue”</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#e3e3e3] content-stretch flex gap-[24px] items-center p-[24px] relative shrink-0 w-full" data-node-id="1:222" data-name="Background">
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:223" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:225" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1b] text-[16px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:226">
                      <p className="leading-[16px]">Jasne granice (circuits)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#e3e3e3] content-stretch flex gap-[24px] items-center p-[24px] relative shrink-0 w-full" data-node-id="1:227" data-name="Background">
                  <div className="relative shrink-0 size-[20px]" data-node-id="1:228" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgContainer1} />
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:230" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1b] text-[16px] tracking-[1.2px] whitespace-nowrap" data-node-id="1:231">
                      <p className="leading-[16px]">Realna autonomia zespołów</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_496px] justify-self-stretch relative row-1 self-start shrink-0" data-node-id="1:232" data-name="Container">
              <div className="col-1 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pb-[44px] pt-[48px] relative row-1 self-start shrink-0" data-node-id="1:233" data-name="Container">
                <div className="bg-[var(--light-blue,#0083fe)] content-stretch flex flex-col items-start justify-end pb-[32px] pt-[177px] px-[32px] relative shrink-0 w-full" data-node-id="1:234" data-name="Background">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:235" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[color:var(--white,white)] w-full" data-node-id="1:236">
                      <p className="leading-[40px]">100%</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start opacity-70 relative shrink-0 w-full" data-node-id="1:237" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--white,white)] tracking-[1.2px] w-full" data-node-id="1:238">
                      <p className="leading-[16px]">Focus on outcomes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#e3e3e3] content-stretch flex flex-col items-start p-[32px] relative shrink-0 w-full" data-node-id="1:239" data-name="Background">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:240" data-name="Container">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--font,#000f3d)] w-full" data-node-id="1:241">
                      <p className="leading-[25px] mb-0">{`"Praca w 6-tygodniowych`}</p>
                      <p className="leading-[25px] mb-0">cyklach zmieniła nasz sposób</p>
                      <p className="leading-[25px]">{`myślenia o produkcie."`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-node-id="1:242" data-name="Container">
                <div className="bg-[#022169] content-stretch flex flex-col gap-[8px] items-start p-[32px] relative shrink-0 w-full" data-node-id="1:243" data-name="Background">
                  <div className="h-[27px] relative shrink-0 w-[16.5px]" data-node-id="1:244" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
                  </div>
                  <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-node-id="1:245" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[24px] w-[193px]" data-node-id="1:246">
                      <p className="leading-[40px]">Precyzyjne modelowanie</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start opacity-60 relative shrink-0 w-full" data-node-id="1:247" data-name="Container">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[16px] w-full" data-node-id="1:248">
                      <p className="leading-[25px]">Stawianie na właściwe rzeczy we właściwym czasie.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#7dfab6] content-stretch flex flex-col items-center justify-center px-[32px] py-[84px] relative rounded-tr-[80px] shrink-0 w-full" data-node-id="1:249" data-name="Background">
                  <div className="bg-white max-w-[264px] mix-blend-multiply opacity-50 shrink-0 size-[96px]" data-node-id="1:250" data-name="Analytics" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
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
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] text-center"
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
            <SzkoleniaFaqAccordion />
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
  if (layout?.length) {
    return (
      <div className="content-stretch relative size-full flex flex-col items-start bg-[#f9f9f9] pb-[3.66px]">
        <div className="content-stretch flex w-full flex-col items-start pt-[110px] relative shrink-0 max-md:pt-[96px]">
          <PageBlocks layout={layout} />
        </div>
      </div>
    );
  }
  return <SzkoleniaMainFallback />;
}
