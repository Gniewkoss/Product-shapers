import { memo, useCallback, useState, type ReactNode } from "react";
import { brandIcons } from "../lib/brandIcons";
import { CollapsibleHeight } from "./CollapsibleHeight";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

function AccordionBodyText({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[672px] text-[#444651] text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed">
      {children}
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
        <p>{LOREM}</p>
      </AccordionBodyText>
    ),
  },
  {
    num: "02",
    title: "Product Discovery",
    body: (
      <AccordionBodyText>
        <p>{LOREM}</p>
      </AccordionBodyText>
    ),
  },
  {
    num: "03",
    title: "Product Delivery",
    body: (
      <AccordionBodyText>
        <p>{LOREM}</p>
      </AccordionBodyText>
    ),
  },
  {
    num: "04",
    title: "Hiring Product People",
    body: (
      <>
        <p className="w-full max-w-[672px] font-sans text-[15px] sm:text-[17px] md:text-[20px] font-bold leading-snug text-[#022169]">
          Od chaotycznej organizacji do systematycznego myślenia produktowego.
        </p>
        <div className="mt-6 flex w-full min-w-0 flex-col gap-4 sm:mt-8 sm:gap-5">
          {[
            "Transformacja z Feature Factory na Product Operating Model",
            "Wdrożenie Shape Up - od teorii do praktyki",
            "Budowa kultury ownershipu w zespołach",
            "Aligning biznesu, produktu i engineering-u",
          ].map((line) => (
            <div key={line} className="flex w-full min-w-0 items-start gap-3 sm:gap-4">
              <div className="relative mt-0.5 size-5 shrink-0">
                <img alt="" className="block size-full object-contain" src={brandIcons.tickBlue} />
              </div>
              <AccordionBodyText>
                <p>{line}</p>
              </AccordionBodyText>
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
      className={`w-full border-l-4 border-solid transition-colors duration-150 ${
        open ? "border-[#022169] bg-[#f8fafc]" : "border-white bg-white"
      }`}
      data-name={open ? "Details - Active" : `Details - ${item.title}`}
    >
      <button
        type="button"
        className="w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#022169]"
        onClick={() => onToggle(i)}
        aria-expanded={open}
        aria-controls={`expertise-panel-${i}`}
        id={`expertise-trigger-${i}`}
      >
        <div className="flex w-full items-center justify-between gap-3 px-4 py-5 sm:px-8 sm:py-6">
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
            <span
              className={`shrink-0 font-sans text-[18px] sm:text-[22px] font-bold tabular-nums ${
                open ? "text-[#022169]" : "text-[rgba(117,118,130,0.4)]"
              }`}
            >
              {item.num}
            </span>
            <span className="min-w-0 font-sans text-[16px] sm:text-[20px] md:text-[22px] font-bold leading-snug text-[#000f3d]">
              {item.title}
            </span>
          </div>
          <div className="flex size-10 shrink-0 items-center justify-center sm:size-12" aria-hidden>
            <div
              className={`relative size-[13px] origin-center transition-transform duration-300 ease-out motion-reduce:transition-none ${
                open ? "rotate-45" : "rotate-0"
              }`}
            >
              <img
                alt=""
                className="absolute inset-0 size-full"
                src={brandIcons.plus}
                decoding="async"
                loading="lazy"
              />
            </div>
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
        <div className="flex flex-col items-start pl-1">
          <div className="flex w-full flex-col items-start pb-8 pl-4 pr-4 pt-1 sm:pb-12 sm:pl-16 sm:pr-8 lg:pl-24">
            {item.body}
          </div>
        </div>
      </CollapsibleHeight>
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
          <p className="whitespace-pre-line">{row.body || ""}</p>
        </AccordionBodyText>
      : (
        <>
          <p className="w-full max-w-[672px] font-sans text-[15px] sm:text-[17px] md:text-[20px] font-bold leading-snug text-[#022169] whitespace-pre-line">
            {row.body || ""}
          </p>
          <div className="mt-6 flex w-full min-w-0 flex-col gap-4 sm:mt-8 sm:gap-5">
            {(row.bullets ?? []).map((b, i) => (
              <div key={i} className="flex w-full min-w-0 items-start gap-3 sm:gap-4">
                <div className="relative mt-0.5 size-5 shrink-0">
                  <img alt="" className="block size-full object-contain" src={brandIcons.tickBlue} />
                </div>
                <AccordionBodyText>
                  <p>{b.line}</p>
                </AccordionBodyText>
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
      className="col-span-1 flex w-full flex-col items-start gap-px self-start border border-solid border-[rgba(197,197,210,0.2)] bg-[rgba(197,197,210,0.2)] p-px lg:col-[5/span_8]"
      data-name="Expertise Accordion"
    >
      {resolved.map((item, i) => (
        <ExpertiseRow key={`${item.num}-${item.title}`} item={item} i={i} open={openIndex === i} onToggle={onToggle} />
      ))}
    </div>
  );
}
