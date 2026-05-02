import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSitePayload } from "../context/SitePayloadContext";
import { KonsultacjaScrollLink } from "./KonsultacjaScrollLink";
import { imgLogoMark1, imgLogoMark2, imgLogoMark3 } from "../figma/brandAssets";

const defaultNavLinks = [
  { to: "/", label: "Home" },
  { to: "/szkolenia", label: "Szkolenia" },
  { to: "/hiring", label: "Hiring" },
  { to: "/useme", label: "Useme" },
  { to: "/artykuly", label: "Artykuły" },
] as const;

const defaultCtaLabel = "Umów Konsultację";
const defaultCtaPath = "/#konsultacja";

function navMatch(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { navigation } = useSitePayload();

  const links = useMemo(() => {
    if (navigation?.links?.length) {
      return navigation.links.map((l) => ({ to: l.path, label: l.label }));
    }
    return defaultNavLinks.map((l) => ({ to: l.to, label: l.label }));
  }, [navigation]);

  const ctaLabel = navigation?.ctaLabel?.trim() || defaultCtaLabel;
  const ctaPath = navigation?.ctaPath?.trim() || defaultCtaPath;
  const ctaIsKonsultacja = ctaPath.includes("konsultacja");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#c9c9c9]/30 bg-[rgba(248,250,252,0.8)] shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full min-w-0 max-w-content items-center justify-between gap-4 px-4 py-[22px] md:px-[61px] md:py-[30px]">
        <Link to="/" className="relative h-[50px] w-[205px] shrink-0" onClick={() => setOpen(false)}>
          <span className="absolute inset-[5%_-0.21%_1%_29.85%] text-left font-['Satoshi:Bold',sans-serif] text-[18.571px] leading-[23.214px] text-[#032796] whitespace-nowrap">
            Product Shapers<br />Consulting
          </span>
          <span className="absolute inset-[34.58%_83.92%_0_0] block">
            <img alt="" className="h-full w-full object-contain" src={imgLogoMark1} />
          </span>
          <span className="absolute inset-[69.16%_92.49%_0_0] block">
            <img alt="" className="h-full w-full object-contain" src={imgLogoMark2} />
          </span>
          <span className="absolute inset-[0_75.36%_0_0] block">
            <img alt="" className="h-full w-full object-contain" src={imgLogoMark3} />
          </span>
        </Link>

        <nav className="hidden h-[26px] flex-[0_0_auto] items-center justify-between gap-2 md:flex md:min-w-[400px] md:max-w-[551px] md:flex-[1] lg:gap-0">
          {links.map(({ to, label }) => {
            const active = navMatch(pathname, to);
            return (
              <Link
                key={`${to}-${label}`}
                to={to}
                className={`shrink-0 text-center text-[16px] font-sans font-bold tracking-[1.2px] ${
                  active ? "text-[#022169] underline decoration-solid [text-decoration-skip-ink:none]" : "text-black"
                } `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          {ctaIsKonsultacja ?
            <KonsultacjaScrollLink className="inline-flex h-[50px] flex-col items-center justify-center rounded-[18px] bg-[#022169] px-8 py-3 text-center text-[16px] font-sans font-medium capitalize tracking-[1.2px] text-white no-underline">
              {ctaLabel}
            </KonsultacjaScrollLink>
          : <Link
              to={ctaPath}
              className="inline-flex h-[50px] flex-col items-center justify-center rounded-[18px] bg-[#022169] px-8 py-3 text-center text-[16px] font-sans font-medium capitalize tracking-[1.2px] text-white no-underline"
            >
              {ctaLabel}
            </Link>
          }
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#c9c9c9] md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-xl leading-none">☰</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#c9c9c9]/30 bg-[rgba(248,250,252,0.98)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(({ to, label }) => (
              <Link
                key={`${to}-${label}-m`}
                to={to}
                className="py-2 text-[16px] font-sans font-bold tracking-[1.2px] text-[#000f3d]"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            {ctaIsKonsultacja ?
              <KonsultacjaScrollLink
                className="mt-2 inline-flex h-[50px] items-center justify-center rounded-[18px] bg-[#022169] text-[16px] font-sans font-medium text-white no-underline"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </KonsultacjaScrollLink>
            : <Link
                to={ctaPath}
                className="mt-2 inline-flex h-[50px] items-center justify-center rounded-[18px] bg-[#022169] text-[16px] font-sans font-medium text-white no-underline"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            }
          </div>
        </div>
      )}
    </header>
  );
}
