import { Link } from "react-router-dom";
import { useSitePayload } from "../context/SitePayloadContext";
import logo from "../assets/branding/logo.svg";

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

type ItemView = { label: string; url?: string | null; openInNewTab?: boolean | null };

/** External when explicit http(s) URL or `mailto:` / `tel:` schemes — otherwise treat as internal SPA route. */
function isExternal(url: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/i.test(url);
}

function FooterTextLink({ item, className }: { item: ItemView; className?: string }) {
  const url = item.url?.trim();
  if (!url || url === "#") {
    return <span className={className}>{item.label}</span>;
  }
  if (isExternal(url) || item.openInNewTab) {
    return (
      <a
        href={url}
        className={className}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link to={url} className={className}>
      {item.label}
    </Link>
  );
}

const ctaBaseClass =
  "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-['Satoshi:Bold',sans-serif] text-[14px] uppercase tracking-[1.2px] text-[#022169] transition hover:bg-white/90";
const linkedinBaseClass =
  "inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-['Satoshi:Bold',sans-serif] text-[14px] uppercase tracking-[1.2px] text-white transition hover:bg-white/10";

export function SiteFooter() {
  const { footer } = useSitePayload();

  const columns =
    footer?.columns?.length ?
      footer.columns.map((c) => ({
        title: c.title,
        items: (c.items ?? []).map<ItemView>((i) => ({
          label: i.label,
          url: i.url,
          openInNewTab: i.openInNewTab,
        })),
      }))
    : footerColumns.map((c) => ({
        title: c.title,
        items: c.items.map<ItemView>((label) => ({ label })),
      }));

  const legalLine = footer?.legalText?.trim() || defaultLegalLine;
  const footerLinksResolved =
    footer?.footerLinks?.filter((f) => f.label) && footer.footerLinks.length > 0 ?
      footer.footerLinks.map((f) => ({ label: f.label ?? "", url: f.url ?? "#" }))
    : [...defaultFooterLinks];

  const tagline = footer?.tagline?.trim() ?? "";
  const cta = footer?.primaryCta;
  const ctaLabel = cta?.label?.trim() ?? "";
  const ctaUrl = cta?.url?.trim() ?? "";
  const showCta = Boolean(ctaLabel && ctaUrl);
  const ctaItem: ItemView | null = showCta
    ? { label: ctaLabel, url: ctaUrl, openInNewTab: cta?.openInNewTab }
    : null;

  const linkedinUrl = footer?.linkedinUrl?.trim() ?? "";
  const linkedinLabel = footer?.linkedinLabel?.trim() ?? "";
  const showLinkedIn = Boolean(linkedinUrl && linkedinLabel);
  const linkedinItem: ItemView | null = showLinkedIn
    ? { label: linkedinLabel, url: linkedinUrl, openInNewTab: footer?.linkedinOpenInNewTab ?? true }
    : null;

  const showTopRow = Boolean(tagline || showCta || showLinkedIn);

  return (
    <div className="relative z-[25] w-full min-w-0 bg-[#022169]">
      <div
        className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 pb-[38px] pt-[80px] md:px-[61px]"
        data-name="Footer"
      >
        <div className="relative w-full max-w-[1536px] shrink-0">
          <div className="relative flex size-full flex-col items-start max-w-[inherit]">
            {showTopRow && (
              <div className="mb-10 flex w-full flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center">
                {tagline && (
                  <p className="font-['Satoshi:Medium',sans-serif] text-[18px] leading-[28px] text-white md:max-w-[60%]">
                    {tagline}
                  </p>
                )}
                {(showCta || showLinkedIn) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {ctaItem && <FooterTextLink item={ctaItem} className={ctaBaseClass} />}
                    {linkedinItem && <FooterTextLink item={linkedinItem} className={linkedinBaseClass} />}
                  </div>
                )}
              </div>
            )}
            <div className="grid min-h-0 w-full grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12">
              {columns.map((col) => (
                <div key={col.title} className="col-span-1 flex flex-col items-start gap-[15px]">
                  <p className="w-full font-['Satoshi:Bold',sans-serif] text-[20px] leading-[25px] text-white">{col.title}</p>
                  <ul className="font-serif flex w-full flex-col gap-3 text-[16px] text-white">
                    {col.items.map((item, idx) => (
                      <li key={`${item.label}-${idx}`}>
                        <FooterTextLink
                          item={item}
                          className="leading-[25px] text-inherit no-underline hover:underline"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 flex w-full flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end">
              <div className="relative h-[50px] w-[205px] shrink-0">
                <img
                  alt="Product Shapers Consulting"
                  className="block h-full w-full max-w-none object-contain object-left brightness-0 invert"
                  src={logo}
                  width={205}
                  height={50}
                  decoding="async"
                />
              </div>
              <div className="flex min-w-0 max-w-full flex-wrap items-center gap-4 text-[12px] font-sans font-medium uppercase tracking-[1.2px] text-white">
                <span className="max-w-full break-words opacity-40">{legalLine}</span>
                {footerLinksResolved.map((fl, i) => (
                  <span key={`${fl.label}-${i}`} className="inline-flex flex-wrap items-center gap-4">
                    <span className="opacity-20">|</span>
                    <FooterTextLink
                      item={{ label: fl.label, url: fl.url }}
                      className="text-inherit no-underline hover:underline"
                    />
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
