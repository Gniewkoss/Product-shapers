import { Fragment, useEffect, useState } from "react";

import productCafeSvg from "../assets/branding/product-cafe.svg";
import fintechBrewSvg from "../assets/branding/fintech-brew.svg";

const defaultBgPhotos = [
  "https://www.figma.com/api/mcp/asset/2717548e-54bd-4e3e-a05e-c1d097f5fa07",
  "https://www.figma.com/api/mcp/asset/2aa1306d-2d93-4df8-9887-62987f5b63e7",
  "https://www.figma.com/api/mcp/asset/9c240abc-dbf1-4d29-bf1f-5a2785c16c8a",
];

const defaultSupportingBrands = [
  "Autopay",
  "Allegro",
  "Box",
  "Beyond.pl",
  "ING HUBs Poland",
  "Google",
  "Snowflake",
  "StoneX",
  "PKO BP",
];

const defaultExpertNames = [
  "Allegro Pay",
  "Authologic",
  "mElements",
  "InPost",
  "PayPo",
  "Paynow",
  "Text",
  "Zendesk",
];

export type HomeCommunitySectionProps = {
  headlineItalic?: string | null;
  headlineRest?: string | null;
  leadBold?: string | null;
  body?: string | null;
  supportingBrands?: string[];
  expertNames?: string[];
  bgPhotoUrls?: string[];
};

const chipBase =
  "rounded-[6px] border border-white/35 px-4 py-2 font-['Satoshi:Bold',sans-serif] text-[12px] leading-none tracking-[0.35px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md bg-white/[0.14]";

export function HomeCommunitySection({
  headlineItalic,
  headlineRest,
  leadBold,
  body,
  supportingBrands: supportingBrandsProp,
  expertNames: expertNamesProp,
  bgPhotoUrls,
}: HomeCommunitySectionProps = {}) {
  const hi = headlineItalic ?? "know-how";
  const hr = headlineRest ?? "by community";
  const lb = leadBold ?? "Tworzę Product Cafe & FinTech Brew.";
  const bd =
    body ??
    "Łączę najlepszych liderów produktowych z topowych firm technologicznych w Polsce. Buduję żywą społeczność, w której selekcjonuję najskuteczniejsze praktyki rynkowe, by wdrażać je bezpośrednio w Twoim biznesie.";
  const supportingBrands =
    supportingBrandsProp?.length ? supportingBrandsProp : defaultSupportingBrands;
  const expertNames = expertNamesProp?.length ? expertNamesProp : defaultExpertNames;
  const bgPhotos = bgPhotoUrls?.filter(Boolean).length ? bgPhotoUrls.filter(Boolean) : defaultBgPhotos;

  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % bgPhotos.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [bgPhotos.length]);

  return (
    <div className="relative w-full min-w-0 overflow-x-clip">
      <section className="relative isolate min-h-[560px] w-full overflow-hidden bg-[#03133f] lg:min-h-[640px]">
        <div aria-hidden className="absolute inset-0">
          {bgPhotos.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                idx === activePhoto ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(103deg,rgba(2,10,38,0.92)_10%,rgba(2,10,38,0.78)_45%,rgba(2,10,38,0.58)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_36%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-content px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-[61px] lg:py-[96px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-[72px] lg:gap-y-10">
            <div className="max-w-[720px]">
              <h3 className="font-['Satoshi:Bold',sans-serif] text-[42px] leading-[1.08] text-white sm:text-[58px]">
                <span className="font-['Erode:Regular',serif] italic font-normal text-white">{hi}</span> {hr}
              </h3>

              <p className="mt-6 font-['Satoshi:Bold',sans-serif] text-[19px] leading-[24px] text-white">{lb}</p>

              <p className="mt-7 max-w-[620px] text-[18px] leading-[1.45] text-white whitespace-pre-line">{bd}</p>

              <p className="mt-9 font-['Satoshi:Bold',sans-serif] text-[11px] tracking-[2px] text-white">
                WSPIERAJĄ NAS
              </p>
              <div className="mt-3 flex max-w-[700px] flex-wrap gap-2">
                {supportingBrands.map((brand) => (
                  <span key={brand} className={chipBase}>
                    {brand}
                  </span>
                ))}
              </div>

              <p className="mt-8 font-['Satoshi:Bold',sans-serif] text-[11px] tracking-[2px] text-white">
                EKSPERCI
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-[10px] gap-y-2 text-[15px] leading-[1.55] text-white sm:text-[16px]">
                {expertNames.map((name, idx) => (
                  <Fragment key={name}>
                    {idx > 0 ? (
                      <span aria-hidden className="select-none px-0.5 text-[17px] font-light leading-none text-white/65">
                        ·
                      </span>
                    ) : null}
                    <span>{name}</span>
                  </Fragment>
                ))}
              </p>
            </div>

            <div className="flex flex-col gap-8 pt-4 lg:items-start lg:justify-start lg:pt-[36px]">
              {/* SVGs z lokalnych plików — aspect z viewBox, bez rozciągania */}
              <div className="flex w-[min(252px,100%)] flex-none flex-col items-start">
                <img
                  src={productCafeSvg}
                  alt="Product Cafe"
                  width={206}
                  height={84}
                  className="block h-auto w-[206px] max-w-full shrink-0"
                  decoding="async"
                />
                <span className="mt-3 font-['Satoshi:Bold',sans-serif] text-[10px] tracking-[1.6px] text-white">
                  COMMUNITY EVENT
                </span>
              </div>

              <div className="h-[44px] w-px shrink-0 bg-[#8d93a7]/55" aria-hidden />

              <div className="flex w-[min(276px,100%)] flex-none flex-col items-start">
                <img
                  src={fintechBrewSvg}
                  alt="FinTech Brew"
                  width={276}
                  height={34}
                  className="block h-auto w-[276px] max-w-full shrink-0"
                  decoding="async"
                />
                <span className="mt-3 block font-['Satoshi:Bold',sans-serif] text-[10px] tracking-[1.6px] text-white">
                  COMMUNITY EVENT
                </span>
              </div>

              <div className="mt-2 inline-flex items-center gap-3 rounded-[4px] border border-white/35 bg-white/[0.12] px-5 py-2.5 backdrop-blur-md">
                <span className="size-2 shrink-0 rounded-full bg-[#00ff7f]" />
                <span className="font-['Satoshi:Bold',sans-serif] text-[12px] tracking-[2px] text-white">
                  LIVE SERIES · WARSAW
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
