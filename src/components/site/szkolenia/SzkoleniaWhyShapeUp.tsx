/** „Dlaczego Shape Up?” — parity with `SzkoleniaMain.tsx` (lines 234–332). */

const imgBenefitIcon = "https://www.figma.com/api/mcp/asset/0857130b-81a6-4514-817e-27c32b4bfbda";
const imgDarkCardIcon = "https://www.figma.com/api/mcp/asset/e27b3d11-14c4-4f8f-882d-78150d0442eb";

export type SzkoleniaWhyShapeUpProps = {
  titleLine1: string;
  titleLine2: string;
  introLines: [string, string, string, string];
  benefit1: string;
  benefit2: string;
  benefit3: string;
  statValue: string;
  statLabel: string;
  quoteLine1: string;
  quoteLine2: string;
  quoteLine3: string;
  darkCardTitle: string;
  darkCardBody: string;
  /** CMS „accent tile” image (bottom-right); omit for mint placeholder. */
  accentTileImageUrl?: string | null;
  accentTileImageAlt?: string | null;
};

export function SzkoleniaWhyShapeUpFidelity(p: SzkoleniaWhyShapeUpProps) {
  return (
    <div className="w-full shrink-0 bg-[#f3f3f3]" data-node-id="1:209" data-name="Section - Dlaczego Shape Up">
      <div className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 py-[96px] sm:px-6 md:px-10 lg:px-[61px]">
        <div
          className="relative grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16 xl:gap-x-24"
          data-node-id="1:210"
          data-name="Container"
        >
          <div
            className="col-span-1 flex min-w-0 flex-col gap-[31.4px] items-start lg:justify-self-stretch"
            data-node-id="1:211"
            data-name="Container"
          >
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:212" data-name="Heading 2">
              <div
                className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full"
                data-node-id="1:213"
              >
                <p className="leading-[60px] mb-0">{p.titleLine1}</p>
                <p className="leading-[60px]">{p.titleLine2}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="1:214" data-name="Container">
              <div
                className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full"
                data-node-id="1:215"
              >
                {p.introLines.map((line, i) => (
                  <p key={i} className={`leading-[27.5px] ${i < p.introLines.length - 1 ? "mb-0" : ""}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16.6px] relative shrink-0 w-full" data-node-id="1:216" data-name="Container">
              {[p.benefit1, p.benefit2, p.benefit3].map((label, bi) => (
                <div
                  key={bi}
                  className="bg-[#e3e3e3] content-stretch flex gap-[24px] items-center p-[24px] relative shrink-0 w-full"
                  data-node-id={bi === 0 ? "1:217" : bi === 1 ? "1:222" : "1:227"}
                  data-name="Background"
                >
                  <div
                    className="relative shrink-0 size-[20px]"
                    data-node-id={bi === 0 ? "1:218" : bi === 1 ? "1:223" : "1:228"}
                    data-name="Container"
                  >
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBenefitIcon} />
                  </div>
                  <div
                    className="content-stretch flex flex-col items-start relative shrink-0"
                    data-node-id={bi === 0 ? "1:220" : bi === 1 ? "1:225" : "1:230"}
                    data-name="Container"
                  >
                    <div
                      className="min-w-0 flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#1b1b1b] text-[16px] tracking-[1.2px] break-words"
                      data-node-id={bi === 0 ? "1:221" : bi === 1 ? "1:226" : "1:231"}
                    >
                      <p className="leading-[16px]">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-span-1 grid min-h-0 w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-4"
            data-node-id="1:232"
            data-name="Container"
          >
            <div
              className="flex min-h-0 min-w-0 flex-col gap-[16px] items-start lg:pb-[44px] lg:pt-[48px]"
              data-node-id="1:233"
              data-name="Container"
            >
              <div
                className="relative flex w-full min-w-0 shrink-0 flex-col items-start justify-end bg-[var(--light-blue,#0083fe)] px-6 pb-8 pt-24 sm:px-8 sm:pt-32 lg:px-[32px] lg:pb-[32px] lg:pt-[177px]"
                data-node-id="1:234"
                data-name="Background"
              >
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:235" data-name="Container">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[color:var(--white,white)] w-full"
                    data-node-id="1:236"
                  >
                    <p className="leading-[40px]">{p.statValue}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start opacity-70 relative shrink-0 w-full" data-node-id="1:237" data-name="Container">
                  <div
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--white,white)] tracking-[1.2px] w-full"
                    data-node-id="1:238"
                  >
                    <p className="leading-[16px]">{p.statLabel}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#e3e3e3] content-stretch flex flex-col items-start p-[32px] relative shrink-0 w-full" data-node-id="1:239" data-name="Background">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:240" data-name="Container">
                  <div
                    className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--font,#000f3d)] w-full"
                    data-node-id="1:241"
                  >
                    <p className="leading-[25px] mb-0">{p.quoteLine1}</p>
                    <p className="leading-[25px] mb-0">{p.quoteLine2}</p>
                    <p className="leading-[25px]">{p.quoteLine3}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex min-h-0 min-w-0 flex-col gap-[16px] items-start lg:justify-self-stretch"
              data-node-id="1:242"
              data-name="Container"
            >
              <div
                className="bg-[#022169] content-stretch flex flex-col gap-[8px] items-start p-[32px] relative shrink-0 w-full"
                data-node-id="1:243"
                data-name="Background"
              >
                <div className="h-[27px] relative shrink-0 w-[16.5px]" data-node-id="1:244" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDarkCardIcon} />
                </div>
                <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-node-id="1:245" data-name="Container">
                  <div
                    className="flex max-w-full flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#778cd8] text-[24px] break-words"
                    data-node-id="1:246"
                  >
                    <p className="leading-[40px]">{p.darkCardTitle}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start opacity-60 relative shrink-0 w-full" data-node-id="1:247" data-name="Container">
                  <div
                    className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#778cd8] text-[16px] w-full"
                    data-node-id="1:248"
                  >
                    <p className="leading-[25px]">{p.darkCardBody}</p>
                  </div>
                </div>
              </div>
              <div
                className={`relative shrink-0 w-full overflow-hidden rounded-tr-[80px] ${p.accentTileImageUrl ? "min-h-[220px] bg-[#7dfab6]" : "bg-[#7dfab6] content-stretch flex flex-col items-center justify-center px-[32px] py-[84px]"}`}
                data-node-id="1:249"
                data-name="Background"
              >
                {p.accentTileImageUrl ?
                  <img
                    alt={p.accentTileImageAlt ?? ""}
                    className="block h-full min-h-[220px] w-full object-cover"
                    src={p.accentTileImageUrl}
                    loading="lazy"
                    decoding="async"
                  />
                : <div className="bg-white max-w-[264px] mix-blend-multiply opacity-50 shrink-0 size-[96px]" data-node-id="1:250" data-name="Analytics" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
