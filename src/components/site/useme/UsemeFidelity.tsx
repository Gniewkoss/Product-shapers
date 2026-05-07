/**
 * Pixel-structure parity with `src/pages/UsemeMain.tsx` fallback (sections only).
 * Props map to Payload blocks; line breaks in text fields use `\n` where the design uses multiple <p>.
 */

function linesFromField(text: string): string[] {
  return text
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

export function UsemeHeroFidelity({
  eyebrow,
  title,
  intro,
  asidePrimary,
  asideSecondary,
  asideAriaLabel = "Oś czasu projektu",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  asidePrimary: string;
  asideSecondary: string;
  asideAriaLabel?: string;
}) {
  return (
    <div className="w-full min-w-0 bg-white">
      <div
        className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start shrink-0 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]"
        data-node-id="1:517"
        data-name="Hero Section"
      >
        <div className="relative mx-auto grid w-full grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[auto] gap-x-8 gap-y-8 shrink-0">
          <div
            className="border-[var(--dark-blue,#022169)] border-l-4 border-solid col-[1/span_12] content-stretch flex min-h-0 flex-col gap-[24px] items-start justify-self-stretch pl-8 pr-0 sm:pl-8 relative row-1 self-start shrink-0 lg:col-[1/span_8] lg:max-w-[872px]"
            data-node-id="1:518"
            data-name="Container"
          >
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:519" data-name="Container">
              <div
                className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#005bb3] text-[16px] tracking-[1.2px] w-full"
                data-node-id="1:520"
              >
                <p className="leading-[16px]">{eyebrow}</p>
              </div>
            </div>
            <div className="content-stretch flex w-full min-w-0 max-w-[872px] flex-col items-start relative shrink-0" data-node-id="1:521" data-name="Heading 1">
              <div
                className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] w-full text-[40px] leading-tight md:text-[64px] md:leading-[1.1] md:tracking-tight"
                data-node-id="1:522"
              >
                <p className="whitespace-normal leading-[1.1]">{title}</p>
              </div>
            </div>
            <div className="content-stretch flex w-full min-w-0 flex-col items-stretch relative shrink-0" data-node-id="1:523">
              <div
                className="content-stretch flex w-full min-w-0 max-w-[672px] flex-col items-start pt-[7px] relative shrink-0"
                data-node-id="1:524"
                data-name="Container"
              >
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full"
                  data-node-id="1:525"
                >
                  <p className="leading-[27.5px]">{intro}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-[1/span_12] mt-8 flex w-full items-start justify-end self-start lg:col-[9/span_4] lg:row-1 lg:mt-0 lg:self-end lg:items-end">
            <aside
              className="ml-auto w-full max-w-[290px] shrink-0 self-start rounded-tr-[60px] border-[var(--dark-blue,#022169)] border-l-4 border-solid bg-[#f3f3f3] px-6 py-8 lg:w-[290px]"
              data-node-id="1:526"
              aria-label={asideAriaLabel}
            >
              <p className="font-['Satoshi:Bold',sans-serif] text-[40px] font-bold leading-none text-[#000f3d]">{asidePrimary}</p>
              <p className="mt-4 font-sans text-[13px] font-bold uppercase leading-5 tracking-[1.2px] text-[#757682]">{asideSecondary}</p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UsemeContextFidelity({
  mediaUrl,
  leftTitle,
  bodyParagraphs,
  quoteLine1,
  quoteLine2,
}: {
  mediaUrl: string;
  leftTitle: string;
  /** Exact English body: use \\n between the 5 lines matching Figma */
  bodyParagraphs: string;
  quoteLine1: string;
  quoteLine2: string;
}) {
  const bodyLines = linesFromField(bodyParagraphs);
  return (
    <div className="w-full bg-white">
      <div
        className="relative mx-auto flex w-full max-w-content flex-col items-center px-4 pb-[96px] sm:px-6 md:px-10 lg:px-[61px]"
        data-node-id="1:531"
      >
        <div
          className="content-stretch flex min-h-0 h-auto w-full min-w-0 flex-col gap-16 items-center lg:gap-[64px]"
          data-node-id="1:532"
          data-name="Section - Context & Hero Image"
        >
          <div
            className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-tr-[80px] shrink-0 w-full"
            data-node-id="1:533"
            data-name="Container"
          >
            <div
              className="relative h-[min(55vw,507px)] min-h-[200px] w-full shrink-0 sm:h-[400px] lg:h-[507.42px]"
              data-node-id="1:534"
              data-name="Financial technology interface"
            >
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[233.34%] left-0 max-w-none top-[-66.67%] w-full" src={mediaUrl} />
                </div>
                <div className="absolute bg-white inset-0 mix-blend-saturation" />
              </div>
            </div>
            <div className="absolute bg-[rgba(0,15,61,0.2)] inset-0 mix-blend-multiply" data-node-id="1:535" data-name="Overlay" />
          </div>
          <div
            className="grid w-full min-h-0 grid-cols-1 grid-rows-[auto] gap-8 sm:gap-12 relative shrink-0 lg:grid-cols-[repeat(12,minmax(0,1fr))] lg:grid-rows-[_minmax(0,220px)] lg:gap-x-12 lg:gap-y-12"
            data-node-id="1:536"
            data-name="Container"
          >
            <div
              className="content-stretch col-span-1 flex flex-col gap-[24px] items-start self-start row-1 shrink-0 justify-self-stretch pb-0 sm:pb-12 lg:col-[1/span_4] lg:pb-[152px] relative"
              data-node-id="1:537"
              data-name="Container"
            >
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:538" data-name="Heading 2">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full"
                  data-node-id="1:539"
                >
                  <p className="leading-[60px]">{leftTitle}</p>
                </div>
              </div>
              <div className="bg-[var(--dark-blue,#022169)] h-[4px] shrink-0 w-[48px]" data-node-id="1:540" data-name="Background" />
            </div>
            <div
              className="content-stretch col-span-1 flex min-w-0 flex-col gap-[24px] items-start self-start row-1 shrink-0 justify-self-stretch lg:col-[5/span_8] relative"
              data-node-id="1:541"
              data-name="Container"
            >
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:542" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1b] text-[22px] w-full"
                  data-node-id="1:543"
                >
                  {bodyLines.map((line, i) => (
                    <p key={i} className={`leading-[27.5px] ${i < bodyLines.length - 1 ? "mb-0" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div
                className="border-[#e2e2e2] border-l-2 border-solid content-stretch flex flex-col items-start pl-[26px] relative shrink-0 w-full"
                data-node-id="1:544"
                data-name="VerticalBorder"
              >
                <div
                  className="flex flex-col justify-center font-normal italic leading-[0] relative shrink-0 text-[#444651] text-[22px]"
                  data-node-id="1:545"
                >
                  <p className="leading-[27.5px] mb-0">{quoteLine1}</p>
                  <p className="leading-[27.5px]">{quoteLine2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ChallengeFeature = { number: string; title: string; bodyLine1: string; bodyLine2: string };

export function UsemeChallengeFidelity({
  titleLine1,
  titleLine2,
  features,
  verdictBadge,
  verdictLine1,
  verdictLine2,
  verdictLine3,
  verdictLine4,
}: {
  titleLine1: string;
  titleLine2: string;
  features: ChallengeFeature[];
  verdictBadge: string;
  verdictLine1: string;
  verdictLine2: string;
  verdictLine3: string;
  verdictLine4: string;
}) {
  return (
    <div
      className="bg-[var(--dark-blue,#022169)] content-stretch flex flex-col items-start overflow-clip py-[96px] relative shrink-0 w-full"
      data-node-id="1:546"
      data-name="Section - Challenge: The Asymmetric Layout"
    >
      <div className="mx-auto w-full min-w-0 max-w-content px-4 sm:px-6 md:px-10 lg:px-[61px]">
        <div
          className="gap-x-[96px] gap-y-[96px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_492px] relative shrink-0 w-full"
          data-node-id="1:547"
          data-name="Container"
        >
          <div
            className="col-1 content-stretch flex flex-col gap-[48px] items-start justify-self-stretch relative row-1 self-center shrink-0"
            data-node-id="1:548"
            data-name="Container"
          >
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:549" data-name="Heading 2">
              <div
                className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full"
                data-node-id="1:550"
              >
                <p className="leading-[60px] mb-0">{titleLine1}</p>
                <p className="leading-[60px]">{titleLine2}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-node-id="1:551" data-name="Container">
              {features.map((f, fi) => (
                <div
                  key={fi}
                  className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full"
                  data-node-id={fi === 0 ? "1:552" : fi === 1 ? "1:560" : "1:568"}
                  data-name="Container"
                >
                  <div
                    className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
                    data-node-id={fi === 0 ? "1:553" : fi === 1 ? "1:561" : "1:569"}
                    data-name="Container"
                  >
                    <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7dfab6] text-[24px] whitespace-nowrap"
                      data-node-id={fi === 0 ? "1:554" : fi === 1 ? "1:562" : "1:570"}
                    >
                      <p className="leading-[40px]">{f.number}</p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0"
                    data-node-id={fi === 0 ? "1:555" : fi === 1 ? "1:563" : "1:571"}
                    data-name="Container"
                  >
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id={fi === 0 ? "1:556" : fi === 1 ? "1:564" : "1:572"}
                      data-name="Heading 3"
                    >
                      <div
                        className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap"
                        data-node-id={fi === 0 ? "1:557" : fi === 1 ? "1:565" : "1:573"}
                      >
                        <p className="leading-[40px]">{f.title}</p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                      data-node-id={fi === 0 ? "1:558" : fi === 1 ? "1:566" : "1:574"}
                      data-name="Container"
                    >
                      <div
                        className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[20px] whitespace-nowrap"
                        data-node-id={fi === 0 ? "1:559" : fi === 1 ? "1:567" : "1:575"}
                      >
                        <p className="leading-[25px] mb-0">{f.bodyLine1}</p>
                        <p className="leading-[25px]">{f.bodyLine2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-center shrink-0"
            data-node-id="1:576"
            data-name="Container"
          >
            <div
              className="bg-[var(--blue,#032796)] border-[var(--green,#82ffba)] border-l-8 border-solid content-stretch flex flex-col gap-[20px] items-start pl-[56px] pr-[48px] py-[48px] relative shrink-0 w-full"
              data-node-id="1:577"
              data-name="Background+VerticalBorder"
            >
              <div className="relative shrink-0 w-full" data-node-id="1:578" data-name="Heading 4">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div
                    className="border border-[#7dfab6] border-solid content-stretch flex items-start px-[17px] py-[5px] relative shrink-0"
                    data-node-id="1:579"
                    data-name="Border"
                  >
                    <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--green,#82ffba)] text-center tracking-[1.2px] whitespace-nowrap"
                      data-node-id="1:580"
                    >
                      <p className="leading-[16px]">{verdictBadge}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-full" data-node-id="1:581" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div
                    className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-white w-full"
                    data-node-id="1:582"
                  >
                    <p className="leading-[27.5px] mb-0">{verdictLine1}</p>
                    <p className="leading-[27.5px] mb-0">{verdictLine2}</p>
                    <p className="leading-[27.5px] mb-0">{verdictLine3}</p>
                    <p className="leading-[27.5px]">{verdictLine4}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute border border-[rgba(125,250,182,0.2)] border-solid bottom-[-64px] right-[-64px] rounded-[12px] size-[256px]"
              data-node-id="1:583"
              data-name="Border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type StrategyCol = { iconUrl: string; iconWrapClass: string; title: string; bodyLines: string[]; cellClass: string };

export function UsemeStrategyFidelity({
  headingTitle,
  headingSubtitle,
  columns,
}: {
  headingTitle: string;
  headingSubtitle: string;
  columns: [StrategyCol, StrategyCol, StrategyCol];
}) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full" data-node-id="1:584">
      <div
        className="content-stretch flex w-full max-w-[1158px] flex-col gap-[96px] items-center mx-auto pt-[32px] relative shrink-0"
        data-node-id="1:585"
        data-name="Section - Solution: Shape Up & Trio"
      >
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:586" data-name="Container">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:587" data-name="Heading 2">
            <div
              className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] text-center whitespace-nowrap"
              data-node-id="1:588"
            >
              <p className="leading-[60px]">{headingTitle}</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:589" data-name="Container">
            <div
              className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[22px] text-center whitespace-nowrap"
              data-node-id="1:590"
            >
              <p className="leading-[27.5px]">{headingSubtitle}</p>
            </div>
          </div>
        </div>
        <div
          className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_288px] relative shrink-0 w-full"
          data-node-id="1:591"
          data-name="Container"
        >
          {columns.map((c, ci) => (
            <div
              key={ci}
              className={
                ci === 0 ?
                  `bg-[#f3f3f3] col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0 ${c.cellClass}`
                : ci === 1 ?
                  `bg-[#f3f3f3] col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0 ${c.cellClass}`
                : `bg-[#f3f3f3] col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0 ${c.cellClass}`
              }
              data-node-id={ci === 0 ? "1:592" : ci === 1 ? "1:599" : "1:606"}
              data-name={ci === 0 ? "Column 1" : ci === 1 ? "Column 2" : "Column 3"}
            >
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id={ci === 0 ? "1:593" : ci === 1 ? "1:600" : "1:607"} data-name="Container">
                <div className={c.iconWrapClass} data-node-id={ci === 0 ? "1:594" : ci === 1 ? "1:601" : "1:608"} data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={c.iconUrl} />
                </div>
                <div
                  className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
                  data-node-id={ci === 0 ? "1:595" : ci === 1 ? "1:602" : "1:609"}
                  data-name="Heading 3"
                >
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[24px] w-full"
                    data-node-id={ci === 0 ? "1:596" : ci === 1 ? "1:603" : "1:610"}
                  >
                    <p className="leading-[40px]">{c.title}</p>
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                  data-node-id={ci === 0 ? "1:597" : ci === 1 ? "1:604" : "1:611"}
                  data-name="Container"
                >
                  <div
                    className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full"
                    data-node-id={ci === 0 ? "1:598" : ci === 1 ? "1:605" : "1:612"}
                  >
                    {c.bodyLines.map((line, li) => (
                      <p key={li} className={`leading-[25px] ${li < c.bodyLines.length - 1 ? "mb-0" : ""}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UsemeBentoFidelity({
  lightQuote,
  lightInitials,
  lightName,
  lightRole,
  lightAvatarUrl,
  lightLinkedinLink,
  darkTopName,
  darkTopRole,
  darkTopInitials,
  darkTopAvatarUrl,
  darkTopLinkedinLink,
  darkBottomName,
  darkBottomRole,
  darkBottomInitials,
  darkBottomAvatarUrl,
  darkBottomLinkedinLink,
  darkTopLines,
  darkBottomLines,
  statValue,
  statLabel,
}: {
  lightQuote: string;
  lightInitials: string;
  lightName: string;
  lightRole: string;
  lightAvatarUrl?: string;
  lightLinkedinLink?: string;
  darkTopName?: string;
  darkTopRole?: string;
  darkTopInitials?: string;
  darkTopAvatarUrl?: string;
  darkTopLinkedinLink?: string;
  darkBottomName?: string;
  darkBottomRole?: string;
  darkBottomInitials?: string;
  darkBottomAvatarUrl?: string;
  darkBottomLinkedinLink?: string;
  darkTopLines: string[];
  darkBottomLines: string[];
  statValue: string;
  statLabel: string;
}) {
  const dTopName = darkTopName ?? lightName;
  const dTopRole = darkTopRole ?? lightRole;
  const dBottomName = darkBottomName ?? darkTopName ?? lightName;
  const dBottomRole = darkBottomRole ?? darkTopRole ?? lightRole;
  const dTopInitials = darkTopInitials ?? lightInitials;
  const dBottomInitials = darkBottomInitials ?? darkTopInitials ?? lightInitials;
  const isHttpUrl = (s?: string) => /^https?:\/\//i.test((s ?? "").trim());
  const lightHasLink = isHttpUrl(lightLinkedinLink);
  const darkTopHasLink = isHttpUrl(darkTopLinkedinLink);
  const darkBottomHasLink = isHttpUrl(darkBottomLinkedinLink);
  return (
    <div
      className="bg-[#eee] content-stretch flex w-full shrink-0 flex-col items-center px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative"
      data-node-id="1:613"
      data-name="Section - Testimonials Bento Grid"
    >
      <div
        className="mx-auto grid w-full max-w-[1158px] grid-cols-1 gap-[24px] justify-items-stretch md:grid-cols-6 md:gap-[24px]"
        data-node-id="1:614"
        data-name="Container"
      >
        <div
          className="bg-white border-[var(--dark-blue,#022169)] border-b-4 border-solid content-stretch flex w-full min-w-0 flex-col items-start pb-[52px] pt-[48px] px-[48px] relative rounded-tr-[80px] shrink-0 md:col-span-4 md:row-start-1"
          data-node-id="1:615"
          data-name="Filip"
        >
          <div className="relative w-full shrink-0 min-w-0" data-node-id="1:616" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] pb-[48px] relative size-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:617" data-name="Container">
                <div
                  className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[28px] w-full"
                  data-node-id="1:618"
                >
                  <p className="leading-[35px]">{lightQuote}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-node-id="1:619" data-name="Footer">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:620" data-name="Container">
                <div
                  className="bg-[rgba(2,33,105,0.05)] border border-[rgba(2,33,105,0.1)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px] overflow-hidden"
                  data-node-id="1:621"
                  data-name="Overlay+Border"
                >
                  {lightAvatarUrl ?
                    <img
                      alt={lightName}
                      className="absolute inset-0 size-full object-cover pointer-events-none"
                      src={lightAvatarUrl}
                    />
                  : <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[12px] text-center w-[15.86px]"
                      data-node-id="1:622"
                    >
                      <p className="leading-[16px]">{lightInitials}</p>
                    </div>
                  }
                </div>
                {lightHasLink ?
                  <a
                    href={lightLinkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[166px] no-underline"
                    aria-label={`LinkedIn: ${lightName}`}
                  >
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] w-full">
                        <p className="leading-[16px]">{lightName}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--light-blue,#0083fe)] tracking-[1.8px] uppercase w-[105.83px]">
                        <p className="leading-[13.5px]">{lightRole}</p>
                      </div>
                    </div>
                  </a>
                : <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[166px]" data-node-id="1:623" data-name="Container">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:624" data-name="Container">
                      <div
                        className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] w-full"
                        data-node-id="1:625"
                      >
                        <p className="leading-[16px]">{lightName}</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:626" data-name="Container">
                      <div
                        className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--light-blue,#0083fe)] tracking-[1.8px] uppercase w-[105.83px]"
                        data-node-id="1:627"
                      >
                        <p className="leading-[13.5px]">{lightRole}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--dark-blue,#022169)] content-stretch flex min-h-[293px] w-full min-w-0 flex-col items-start justify-between self-stretch p-[48px] relative shrink-0 md:col-span-2 md:row-start-1"
          data-node-id="1:628"
          data-name="Agnieszka"
        >
          <div className="h-[137px] relative shrink-0 w-full" data-node-id="1:629" data-name="Margin">
            <div className="absolute content-stretch flex flex-col items-start left-0 right-[0.01px] top-[-1px]" data-node-id="1:630" data-name="Container">
              <div
                className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-white md:whitespace-nowrap"
                data-node-id="1:631"
              >
                {darkTopLines.map((line, i) => (
                  <p key={i} className={`leading-[27.5px] ${i < darkTopLines.length - 1 ? "mb-0" : ""}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col min-h-[40px] items-start relative shrink-0 w-full min-w-0" data-node-id="1:632" data-name="Footer">
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:633" data-name="Container">
              <div
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px] overflow-hidden"
                data-node-id="1:634"
                data-name="Overlay+Border"
              >
                {darkTopAvatarUrl ?
                  <img
                    alt={dTopName}
                    className="absolute inset-0 size-full object-cover pointer-events-none"
                    src={darkTopAvatarUrl}
                  />
                : <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[15.86px]"
                    data-node-id="1:635"
                  >
                    <p className="leading-[16px]">{dTopInitials}</p>
                  </div>
                }
              </div>
              {darkTopHasLink ?
                <a
                  href={darkTopLinkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 min-w-0 flex-1 no-underline"
                  aria-label={`LinkedIn: ${dTopName}`}
                >
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[1.2px] w-full">
                      <p className="leading-[16px]">{dTopName}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--green,#82ffba)] tracking-[1.8px] uppercase w-[105.83px]">
                      <p className="leading-[13.5px]">{dTopRole}</p>
                    </div>
                  </div>
                </a>
              : <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 min-w-0 flex-1" data-node-id="1:636" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:637" data-name="Container">
                    <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[1.2px] w-full"
                      data-node-id="1:638"
                    >
                      <p className="leading-[16px]">{dTopName}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:639" data-name="Container">
                    <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--green,#82ffba)] tracking-[1.8px] uppercase w-[105.83px]"
                      data-node-id="1:640"
                    >
                      <p className="leading-[13.5px]">{dTopRole}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--dark-blue,#022169)] content-stretch flex min-h-[293px] w-full min-w-0 flex-col items-start justify-between self-stretch p-[48px] relative shrink-0 md:col-span-2 md:row-start-2 md:col-start-1"
          data-node-id="1:641"
          data-name="Agnieszka"
        >
          <div className="relative min-h-[137px] shrink-0 w-full" data-node-id="1:642" data-name="Margin">
            <div className="absolute content-stretch flex flex-col items-start left-0 right-[0.01px] top-[-1px]" data-node-id="1:643" data-name="Container">
              <div
                className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-white md:whitespace-nowrap"
                data-node-id="1:644"
              >
                {darkBottomLines.map((line, i) => (
                  <p key={i} className={`leading-[27.5px] ${i < darkBottomLines.length - 1 ? "mb-0" : ""}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col min-h-[40px] items-start relative shrink-0 w-full min-w-0" data-node-id="1:645" data-name="Footer">
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:646" data-name="Container">
              <div
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px] overflow-hidden"
                data-node-id="1:647"
                data-name="Overlay+Border"
              >
                {darkBottomAvatarUrl ?
                  <img
                    alt={dBottomName}
                    className="absolute inset-0 size-full object-cover pointer-events-none"
                    src={darkBottomAvatarUrl}
                  />
                : <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white w-[15.86px]"
                    data-node-id="1:648"
                  >
                    <p className="leading-[16px]">{dBottomInitials}</p>
                  </div>
                }
              </div>
              {darkBottomHasLink ?
                <a
                  href={darkBottomLinkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 min-w-0 flex-1 no-underline"
                  aria-label={`LinkedIn: ${dBottomName}`}
                >
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[1.2px] w-full">
                      <p className="leading-[16px]">{dBottomName}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--green,#82ffba)] tracking-[1.8px] uppercase w-[105.83px]">
                      <p className="leading-[13.5px]">{dBottomRole}</p>
                    </div>
                  </div>
                </a>
              : <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 min-w-0 flex-1" data-node-id="1:649" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:650" data-name="Container">
                    <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[1.2px] w-full"
                      data-node-id="1:651"
                    >
                      <p className="leading-[16px]">{dBottomName}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:652" data-name="Container">
                    <div
                      className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-[color:var(--green,#82ffba)] tracking-[1.8px] uppercase w-[105.83px]"
                      data-node-id="1:653"
                    >
                      <p className="leading-[13.5px]">{dBottomRole}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--light-blue,#0083fe)] content-stretch flex min-h-[293px] w-full min-w-0 flex-col items-center justify-center self-stretch overflow-hidden p-[48px] relative rounded-tr-[80px] shrink-0 md:col-span-4 md:row-start-2 md:col-start-3"
          data-node-id="1:654"
          data-name="Filip"
        >
          <div className="relative w-full max-w-full shrink-0 px-1" data-node-id="1:655" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex w-full flex-col gap-[8px] items-center justify-center relative size-full">
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:656" data-name="Heading 3">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[clamp(3rem,12vw,84px)] text-center text-white"
                  data-node-id="1:657"
                >
                  <p className="leading-none md:leading-[105px]">{statValue}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:658" data-name="Container">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6e3ff] text-[16px] text-center tracking-[1.2px]"
                  data-node-id="1:659"
                >
                  <p className="leading-[16px]">{statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatItem = { value: string; label: string; descriptionLine1: string; descriptionLine2?: string };

export function UsemeMeasurableFidelity({ headingTitle, headingEyebrow, items }: { headingTitle: string; headingEyebrow: string; items: [StatItem, StatItem, StatItem, StatItem] }) {
  return (
    <div
      className="content-stretch relative mx-auto flex w-full max-w-content min-w-0 shrink-0 flex-col items-center px-6 pb-[192px] pt-[96px] sm:px-10 md:px-14 lg:px-[72px]"
      data-node-id="1:660"
    >
      <div className="relative flex w-full min-w-0 shrink-0 flex-col gap-[96px] items-start" data-node-id="1:661" data-name="Section - Measurable Results">
        <div
          className="content-stretch flex font-['Satoshi:Bold',sans-serif] items-baseline justify-between leading-[0] not-italic relative shrink-0 w-full whitespace-nowrap"
          data-node-id="1:662"
          data-name="Paragraph"
        >
          <div className="flex flex-col justify-center relative shrink-0 text-[#000f3d] text-[48px]" data-node-id="1:663">
            <p className="leading-[60px]">{headingTitle}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[#757682] text-[16px] tracking-[1.2px]" data-node-id="1:664">
            <p className="leading-[16px]">{headingEyebrow}</p>
          </div>
        </div>
        <div
          className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_189px] relative shrink-0 w-full"
          data-node-id="1:665"
          data-name="Container"
        >
          {items.map((it, ii) => (
            <div
              key={ii}
              className={
                ii === 0 ?
                  "border-[#c5c5d2] border-solid border-t col-1 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0"
                : ii === 1 ?
                  "border-[#c5c5d2] border-solid border-t col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0"
                : ii === 2 ?
                  "border-[#c5c5d2] border-solid border-t col-3 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0"
                : "border-[#c5c5d2] border-solid border-t col-4 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0"
              }
              data-node-id={ii === 0 ? "1:666" : ii === 1 ? "1:673" : ii === 2 ? "1:680" : "1:687"}
              data-name="HorizontalBorder"
            >
              <div className="relative shrink-0 w-full" data-node-id={ii === 0 ? "1:667" : ii === 1 ? "1:674" : ii === 2 ? "1:681" : "1:688"} data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full"
                    data-node-id={ii === 0 ? "1:668" : ii === 1 ? "1:675" : ii === 2 ? "1:682" : "1:689"}
                  >
                    <p className="leading-[60px]">{it.value}</p>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-full" data-node-id={ii === 0 ? "1:669" : ii === 1 ? "1:676" : ii === 2 ? "1:683" : "1:690"} data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[16px] tracking-[1.2px] w-full"
                    data-node-id={ii === 0 ? "1:670" : ii === 1 ? "1:677" : ii === 2 ? "1:684" : "1:691"}
                  >
                    <p className="leading-[16px]">{it.label}</p>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-full" data-node-id={ii === 0 ? "1:671" : ii === 1 ? "1:678" : ii === 2 ? "1:685" : "1:692"} data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                  <div
                    className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[20px] w-full"
                    data-node-id={ii === 0 ? "1:672" : ii === 1 ? "1:679" : ii === 2 ? "1:686" : "1:693"}
                  >
                    <p className={`leading-[25px] ${it.descriptionLine2 ? "mb-0" : ""}`}>{it.descriptionLine1}</p>
                    {it.descriptionLine2 ? <p className="leading-[25px]">{it.descriptionLine2}</p> : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
