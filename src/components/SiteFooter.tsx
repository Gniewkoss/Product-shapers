import { Link } from "react-router-dom";
import { useSitePayload } from "../context/SitePayloadContext";
import { imgLogoFooter1, imgLogoFooter2, imgLogoFooter3 } from "../figma/brandAssets";

const footerColumns = [
  {
    title: "Shape up",
    items: [
      "Czym jest Shape Up?",
      "Dla kogo jest Shape Up?",
      "Efekty Shape Up?",
      "Shape Up w scale up",
      "Shape Up w dużej organizacji",
    ],
  },
  {
    title: "Szkolenia",
    items: ["Fundamenty Shape Up 🔵⚪️⚪️", "Praktyka Shape Up 🔵🔵⚪️", "Masterclass w Shape Up 🔵🔵🔵"],
  },
  {
    title: "Doradztwo",
    items: ["Pilot Shape Up", "Transformacja produktowa", "Wdrażanie Product Led Growth"],
  },
  {
    title: "Baza Wiedzy",
    items: ["Case study", "Ebook", "You Tube", "Podcast"],
  },
] as const;

const defaultLegalLine = "© 2025 PRODUCT SHAPERS. WSZYSTKIE PRAWA ZASTRZEŻONE.";
const defaultFooterLinks = [{ label: "POLITYKA PRYWATNOŚCI", url: "#" }, { label: "REGULAMIN", url: "#" }] as const;

export function SiteFooter() {
  const { footer } = useSitePayload();

  const columns =
    footer?.columns?.length ?
      footer.columns.map((c) => ({
        title: c.title,
        items: (c.items ?? []).map((i) => i.label),
      }))
    : footerColumns.map((c) => ({ title: c.title, items: [...c.items] }));

  const legalLine = footer?.legalText?.trim() || defaultLegalLine;
  const footerLinksResolved =
    footer?.footerLinks?.filter((f) => f.label) && footer.footerLinks.length > 0 ?
      footer.footerLinks.map((f) => ({ label: f.label ?? "", url: f.url ?? "#" }))
    : [...defaultFooterLinks];

  return (
    <div className="relative z-[25] w-full min-w-0 bg-[#022169]">
      <div
        className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 pb-[38px] pt-[80px] md:px-[61px]"
        data-name="Footer"
      >
        <div className="relative w-full max-w-[1536px] shrink-0">
          <div className="relative flex size-full flex-col items-start max-w-[inherit]">
            <div className="grid min-h-0 w-full grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12">
              {columns.map((col) => (
                <div key={col.title} className="col-span-1 flex flex-col items-start gap-[15px]">
                  <p className="w-full font-['Satoshi:Bold',sans-serif] text-[20px] leading-[25px] text-white">{col.title}</p>
                  <ul className="font-serif flex w-full flex-col gap-3 text-[16px] text-white">
                    {col.items.map((t) => (
                      <li key={t}>
                        <span className="leading-[25px]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 flex w-full flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end">
              <div className="relative h-[50px] w-[205px] shrink-0">
                <p className="absolute inset-[4%_-0.21%_2%_29.85%] font-['Satoshi:Bold',sans-serif] text-[18.571px] leading-none text-white whitespace-nowrap">
                  <span className="block leading-[23.214px]">Product Shapers</span>
                  <span className="block leading-[23.214px]">Consulting</span>
                </p>
                <div className="absolute inset-[33.58%_83.92%_1%_0]">
                  <img alt="" className="absolute inset-0 size-full max-w-none" src={imgLogoFooter1} />
                </div>
                <div className="absolute inset-[68.16%_92.49%_1%_0]">
                  <img alt="" className="absolute inset-0 size-full max-w-none" src={imgLogoFooter2} />
                </div>
                <div className="absolute inset-[-1%_75.36%_1%_0]">
                  <img alt="" className="absolute inset-0 size-full max-w-none" src={imgLogoFooter3} />
                </div>
              </div>
              <div className="flex min-w-0 max-w-full flex-wrap items-center gap-4 text-[12px] font-sans font-medium uppercase tracking-[1.2px] text-white">
                <span className="max-w-full break-words opacity-40">{legalLine}</span>
                {footerLinksResolved.map((fl, i) => (
                  <span key={`${fl.label}-${i}`} className="inline-flex flex-wrap items-center gap-4">
                    <span className="opacity-20">|</span>
                    {fl.url && fl.url !== "#" ?
                      fl.url.startsWith("http") ?
                        <a href={fl.url} className="text-inherit no-underline hover:underline">
                          {fl.label}
                        </a>
                      : <Link to={fl.url} className="text-inherit no-underline hover:underline">
                          {fl.label}
                        </Link>
                    : <span>{fl.label}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
