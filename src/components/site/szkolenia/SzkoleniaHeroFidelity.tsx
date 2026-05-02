/** Hero markup parity with `SzkoleniaMain.tsx` fallback (lines 25–49). */

export function SzkoleniaHeroFidelity({
  eyebrow,
  titleLine1,
  titleLine2,
  introLines,
}: {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  introLines: [string, string, string];
}) {
  return (
    <div className="w-full min-w-0 bg-white">
      <div
        className="relative mx-auto w-full min-w-0 max-w-content shrink-0 bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]"
        data-node-id="1:128"
        data-name="Hero Section"
      >
        <div className="relative grid w-full grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[minmax(0,auto)] gap-x-8 gap-y-8 lg:grid-rows-[auto]">
          <div
            className="border-[var(--dark-blue,#022169)] border-l-4 border-solid col-[1/span_8] content-stretch flex w-full min-w-0 max-w-full flex-col gap-[24px] items-start justify-self-start pl-8 pr-0 sm:pl-8 relative row-1 self-start shrink-0 lg:max-w-[821px]"
            data-node-id="1:129"
            data-name="Container"
          >
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:130" data-name="Container">
              <div
                className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#005bb3] text-[16px] tracking-[1.2px] w-full"
                data-node-id="1:131"
              >
                <p className="leading-[16px]">{eyebrow}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:132" data-name="Heading 1">
              <div
                className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[40px] leading-tight w-full md:text-[64px] md:leading-[1.1] md:tracking-tight"
                data-node-id="1:133"
              >
                <p className="leading-[1.1] mb-0">{titleLine1}</p>
                <p className="leading-[1.1]">{titleLine2}</p>
              </div>
            </div>
            <div
              className="content-stretch flex w-full min-w-0 max-w-[672px] flex-col items-start pt-[7px] relative shrink-0"
              data-node-id="1:134"
              data-name="Container"
            >
              <div
                className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] whitespace-nowrap"
                data-node-id="1:135"
              >
                <p className="leading-[27.5px] mb-0">{introLines[0]}</p>
                <p className="leading-[27.5px] mb-0">{introLines[1]}</p>
                <p className="leading-[27.5px]">{introLines[2]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
