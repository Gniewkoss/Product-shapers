import { memo, useCallback, useState, type ReactNode } from "react";
import { brandIcons } from "../lib/brandIcons";
import { CollapsibleHeight } from "./CollapsibleHeight";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

function FaqBodyText({ children }: { children: ReactNode }) {
  return (
    <div className="w-full not-italic text-[#444651] text-[22px]">
      <div className="content-stretch flex w-full flex-col items-start leading-[0] justify-center">{children}</div>
    </div>
  );
}

const defaultItems: { title: string; body: ReactNode }[] = [
  {
    title: "Dla kogo jest ten program?",
    body: (
      <FaqBodyText>
        <p className="leading-[27.5px]">{LOREM}</p>
      </FaqBodyText>
    ),
  },
  {
    title: "Ile czasu tygodniowo muszę poświęcić?",
    body: (
      <FaqBodyText>
        <p className="leading-[27.5px]">{LOREM}</p>
      </FaqBodyText>
    ),
  },
  {
    title: "Czy otrzymam certyfikat?",
    body: (
      <FaqBodyText>
        <p className="leading-[27.5px]">{LOREM}</p>
      </FaqBodyText>
    ),
  },
  {
    title: "Czy mój zespół jest na to gotowy?",
    body: (
      <FaqBodyText>
        <p className="leading-[27.5px]">
          {`Shape Up wymaga pewnej dojrzałości. Aby to zadziałało, potrzebujesz: Seniority: Przynajmniej kilku ludzi (Tech/UX), którzy znają domenę i potrafią samodzielnie rozwiązywać problemy, a nie tylko "klepać tickety". Autonomii: Gotowości Zarządu, by oddać decyzyjność zespołowi na 6 tygodni (bez mikrozarządzania). Jeśli masz samych juniorów, którzy potrzebują prowadzenia za rękę – Shape Up może być za trudny.`}
        </p>
      </FaqBodyText>
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
      className={`relative w-full shrink-0 border-l-4 border-solid bg-clip-padding ${
        open ? "border-[var(--dark-blue,#022169)] bg-[#f8fafc]" : "border-transparent bg-white"
      }`}
    >
      <div className="content-stretch flex size-full flex-col items-start border-0 border-[transparent] border-solid bg-clip-padding">
        <button
          type="button"
          className="w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#022169]"
          onClick={() => onToggle(i)}
          aria-expanded={open}
          aria-controls={`faq-panel-${i}`}
          id={`faq-trigger-${i}`}
        >
          <div className="relative flex w-full items-center justify-between px-[32px] py-[32px]">
            <div className="content-stretch flex min-w-0 flex-1 items-center gap-[24px] pr-4">
              <div className="content-stretch flex min-w-0 flex-col items-start relative shrink-0">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[24px] whitespace-normal">
                  <p className="leading-[40px]">{item.title}</p>
                </div>
              </div>
            </div>
            <div className="flex size-12 shrink-0 items-center justify-center" aria-hidden>
              <div
                className={`relative size-[14px] shrink-0 origin-center transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${open ? "rotate-45" : "rotate-0"}`}
              >
                <img
                  alt=""
                  className="absolute inset-0 size-full max-w-none"
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
          <div className="w-full">
            <div className="content-stretch flex flex-col items-start pb-[48px] pl-8 pr-8 pt-2 sm:pl-16 sm:pr-[32px] lg:pl-[128px]">
              <div className="content-stretch flex w-full max-w-[672px] flex-col items-start">
                {item.body}
              </div>
            </div>
          </div>
        </CollapsibleHeight>
      </div>
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
        body: (
          <FaqBodyText>
            <p className="leading-[27.5px] whitespace-pre-line">{it.answer}</p>
          </FaqBodyText>
        ),
      }))
    : defaultItems;

  return (
    <div
      className="content-stretch mx-auto flex w-full max-w-[896px] flex-col items-stretch gap-px border border-[rgba(197,197,210,0.2)] border-solid bg-[rgba(197,197,210,0.2)] p-px [contain:layout]"
      data-node-id="1:258"
    >
      {resolved.map((item, i) => (
        <FaqRow key={`${item.title}-${i}`} item={item} i={i} open={openIndex === i} onToggle={onToggle} />
      ))}
    </div>
  );
}
