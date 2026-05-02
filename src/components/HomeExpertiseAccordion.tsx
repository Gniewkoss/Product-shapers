import { memo, useCallback, useState, type ReactNode } from "react";
import { CollapsibleHeight } from "./CollapsibleHeight";

const imgContainer1 =
  "https://www.figma.com/api/mcp/asset/2ff6a2e7-f1a0-4189-b14d-665cef3e8fa6";
const imgContainer2 =
  "https://www.figma.com/api/mcp/asset/53ecc42b-d884-4c38-af0f-b5df9b9060a3";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

function AccordionBodyText({ children }: { children: ReactNode }) {
  return (
    <div className="content-stretch flex w-full max-w-[672px] flex-col items-start not-italic text-[#444651] text-[22px]">
      <div className="content-stretch flex w-full flex-col items-start leading-[0] justify-center">
        {children}
      </div>
    </div>
  );
}

type Item = {
  num: string;
  title: string;
  body: ReactNode;
};

const defaultItems: Item[] = [
  {
    num: "01",
    title: "Product Transformation",
    body: (
      <AccordionBodyText>
        <p className="leading-[27.5px]">{LOREM}</p>
      </AccordionBodyText>
    ),
  },
  {
    num: "02",
    title: "Product Discovery",
    body: (
      <AccordionBodyText>
        <p className="leading-[27.5px]">{LOREM}</p>
      </AccordionBodyText>
    ),
  },
  {
    num: "03",
    title: "Product Delivery",
    body: (
      <AccordionBodyText>
        <p className="leading-[27.5px]">{LOREM}</p>
      </AccordionBodyText>
    ),
  },
  {
    num: "04",
    title: "Hiring Product People",
    body: (
      <>
        <div className="content-stretch flex w-full max-w-[672px] flex-col items-start" data-node-id="1:1026">
          <div
            className="flex w-full flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[20px] text-[color:var(--dark-blue,#022169)]"
            data-node-id="1:1027"
          >
            <p className="leading-[25px] mb-0">Od chaotycznej organizacji do systematycznego myślenia</p>
            <p className="leading-[25px]">produktowego.</p>
          </div>
        </div>
        <div className="content-stretch flex w-full flex-col items-start gap-[24px]" data-node-id="1:1028">
          {[
            "Transformacja z Feature Factory na Product Operating Model",
            "Wdrożenie Shape Up - od teorii do praktyki",
            "Budowa kultury ownershipu w zespołach",
            "Aligning biznesu, produktu i engineering-u",
          ].map((line) => (
            <div
              key={line}
              className="content-stretch flex w-full items-start gap-[20px]"
              data-node-id="1:1029"
            >
              <div className="content-stretch flex flex-col items-start pt-[4px]" data-node-id="1:1030">
                <div
                  className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[20px] text-[color:var(--light-blue,#0083fe)] whitespace-nowrap"
                  data-node-id="1:1031"
                >
                  <p className="leading-[20px]">/</p>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col items-start border-b border-solid border-[rgba(0,0,0,0)] pb-px"
                data-node-id="1:1032"
              >
                <AccordionBodyText>
                  <p className="leading-[27.5px]">{line}</p>
                </AccordionBodyText>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

type RowProps = {
  item: Item;
  i: number;
  open: boolean;
  onToggle: (i: number) => void;
};

const ExpertiseRow = memo(function ExpertiseRow({ item, i, open, onToggle }: RowProps) {
  return (
    <div
      className={
        open
          ? "w-full shrink-0 border-l-4 border-solid border-[var(--dark-blue,#022169)] bg-[#f8fafc] relative"
          : "relative w-full shrink-0 bg-white"
      }
      data-name={open ? "Details - Active" : `Details - ${item.title}`}
    >
      <div className="content-stretch flex size-full flex-col items-start border-0 border-[transparent] border-solid bg-clip-padding">
        <button
          type="button"
          className="w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#022169]"
          onClick={() => onToggle(i)}
          aria-expanded={open}
          aria-controls={`expertise-panel-${i}`}
          id={`expertise-trigger-${i}`}
        >
          <div
            className={
              open
                ? "relative flex size-full w-full items-center justify-between border-0 border-[transparent] border-solid bg-clip-padding py-[32px] pl-[32px] pr-[23.667px]"
                : "relative flex w-full shrink-0 items-center justify-between p-[32px]"
            }
            data-node-id={open ? "1:1016" : "1:989"}
          >
            <div
              className={`content-stretch flex items-center ${open ? "gap-[32px]" : "gap-[24px]"} relative shrink-0`}
            >
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <div
                  className={`flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] whitespace-nowrap ${
                    open ? "text-[color:var(--dark-blue,#022169)]" : "text-[rgba(117,118,130,0.4)]"
                  }`}
                >
                  <p className="leading-[40px]">{item.num}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <div
                  className={`flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] whitespace-normal ${
                    open ? "text-[color:var(--font,#000f3d)]" : "text-[#000f3d]"
                  }`}
                >
                  <p className="leading-[40px]">{item.title}</p>
                </div>
              </div>
            </div>
            <div className="relative flex shrink-0 items-center justify-center p-1" aria-hidden>
              {open ? (
                <div className="flex size-[24.749px] items-center justify-center">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[17.5px]">
                      <img
                        alt=""
                        className="absolute inset-0 size-full max-w-none"
                        src={imgContainer2}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative size-[14px]">
                  <img
                    alt=""
                    className="absolute inset-0 size-full max-w-none"
                    src={imgContainer1}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </button>
        <CollapsibleHeight
          open={open}
          id={`expertise-panel-${i}`}
          role="region"
          aria-hidden={!open}
          aria-labelledby={`expertise-trigger-${i}`}
        >
          <div
            className="content-stretch flex flex-col items-start pl-[4px] relative"
            data-node-id="1:1025"
          >
            <div className="content-stretch flex flex-col items-start border-0 border-[transparent] border-solid bg-clip-padding pb-[48px] pl-[32px] pr-[32px] pt-[4px] sm:pl-[64px] lg:pl-[128px]">
              {item.body}
            </div>
          </div>
        </CollapsibleHeight>
      </div>
    </div>
  );
});

export type CmsExpertiseItem = {
  number?: string | null;
  title?: string | null;
  layout?: "simple" | "bullets" | null;
  body?: string | null;
  bullets?: { line?: string | null }[] | null;
};

function mapCmsExpertise(items: CmsExpertiseItem[]): Item[] {
  return items.map((row, idx) => {
    const num = row.number?.trim() || String(idx + 1).padStart(2, "0");
    const layout = row.layout === "bullets" ? "bullets" : "simple";
    const bodySimple =
      layout === "simple" ?
        <AccordionBodyText>
          <p className="leading-[27.5px] whitespace-pre-line">{row.body || ""}</p>
        </AccordionBodyText>
      : (
        <>
          <div className="content-stretch flex w-full max-w-[672px] flex-col items-start" data-node-id="1:1026">
            <div className="flex w-full flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[20px] text-[color:var(--dark-blue,#022169)]">
              <p className="leading-[25px] whitespace-pre-line">{row.body || ""}</p>
            </div>
          </div>
          <div className="content-stretch flex w-full flex-col items-start gap-[24px]" data-node-id="1:1028">
            {(row.bullets ?? []).map((b, i) => (
              <div key={i} className="content-stretch flex w-full items-start gap-[20px]" data-node-id="1:1029">
                <div className="content-stretch flex flex-col items-start pt-[4px]" data-node-id="1:1030">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[20px] text-[color:var(--light-blue,#0083fe)] whitespace-nowrap">
                    <p className="leading-[20px]">/</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start border-b border-solid border-[rgba(0,0,0,0)] pb-px">
                  <AccordionBodyText>
                    <p className="leading-[27.5px]">{b.line}</p>
                  </AccordionBodyText>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    return { num, title: row.title ?? "", body: bodySimple };
  });
}

export function HomeExpertiseAccordion({ cmsItems }: { cmsItems?: CmsExpertiseItem[] | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const onToggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  const resolved = cmsItems?.length ? mapCmsExpertise(cmsItems) : defaultItems;

  return (
    <div
      className="content-stretch col-span-1 flex flex-col gap-px items-start self-start row-1 shrink-0 justify-self-stretch border border-[rgba(197,197,210,0.2)] border-solid bg-[rgba(197,197,210,0.2)] p-px lg:col-[5/span_8] relative [contain:layout]"
      data-node-id="1:987"
      data-name="Overlay+Border"
    >
      {resolved.map((item, i) => (
        <ExpertiseRow key={`${item.num}-${item.title}`} item={item} i={i} open={openIndex === i} onToggle={onToggle} />
      ))}
    </div>
  );
}
