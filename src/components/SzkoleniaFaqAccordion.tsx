import { memo, useCallback, useState, type ReactNode } from "react";
import { brandIcons } from "../lib/brandIcons";
import { CollapsibleHeight } from "./CollapsibleHeight";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

const defaultItems: { title: string; body: ReactNode }[] = [
  {
    title: "Dla kogo jest ten program?",
    body: <p>{LOREM}</p>,
  },
  {
    title: "Ile czasu tygodniowo muszę poświęcić?",
    body: <p>{LOREM}</p>,
  },
  {
    title: "Czy otrzymam certyfikat?",
    body: <p>{LOREM}</p>,
  },
  {
    title: "Czy mój zespół jest na to gotowy?",
    body: (
      <p>
        {`Shape Up wymaga pewnej dojrzałości. Aby to zadziałało, potrzebujesz: Seniority: Przynajmniej kilku ludzi (Tech/UX), którzy znają domenę i potrafią samodzielnie rozwiązywać problemy, a nie tylko "klepać tickety". Autonomii: Gotowości Zarządu, by oddać decyzyjność zespołowi na 6 tygodni (bez mikrozarządzania). Jeśli masz samych juniorów, którzy potrzebują prowadzenia za rękę – Shape Up może być za trudny.`}
      </p>
    ),
  },
];

type RowProps = {
  item: (typeof defaultItems)[number];
  i: number;
  open: boolean;
  onToggle: (i: number) => void;
};

const FaqRow = memo(function FaqRow({ item, i, open, onToggle }: RowProps) {
  return (
    <div
      className={`w-full border-l-4 border-solid transition-colors duration-150 ${
        open ? "border-[#022169] bg-[#f8fafc]" : "border-white bg-white"
      }`}
    >
      <button
        type="button"
        className="w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#022169]"
        onClick={() => onToggle(i)}
        aria-expanded={open}
        aria-controls={`faq-panel-${i}`}
        id={`faq-trigger-${i}`}
      >
        <div className="flex w-full items-center justify-between gap-3 px-4 py-5 sm:px-8 sm:py-6">
          <span className="min-w-0 font-sans text-[16px] sm:text-[19px] md:text-[22px] font-bold leading-snug text-[#000f3d]">
            {item.title}
          </span>
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
        id={`faq-panel-${i}`}
        role="region"
        aria-hidden={!open}
        aria-labelledby={`faq-trigger-${i}`}
      >
        <div className="w-full px-4 pb-8 pt-1 sm:px-8 sm:pb-12 sm:pl-16 lg:pl-24">
          <div className="w-full max-w-[672px] text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed text-[#444651]">
            {item.body}
          </div>
        </div>
      </CollapsibleHeight>
    </div>
  );
});

export function SzkoleniaFaqAccordion({ items: cmsItems }: { items?: { title: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const onToggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  const resolved =
    cmsItems?.length ?
      cmsItems.map((it) => ({
        title: it.title,
        body: <p className="whitespace-pre-line">{it.answer}</p>,
      }))
    : defaultItems;

  return (
    <div className="mx-auto flex w-full max-w-[896px] flex-col items-stretch gap-px border border-solid border-[rgba(197,197,210,0.2)] bg-[rgba(197,197,210,0.2)] p-px">
      {resolved.map((item, i) => (
        <FaqRow key={`${item.title}-${i}`} item={item} i={i} open={openIndex === i} onToggle={onToggle} />
      ))}
    </div>
  );
}
