import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSitePayload } from "../context/SitePayloadContext";
import { KonsultacjaScrollLink } from "./KonsultacjaScrollLink";
import { imgLogoLockup } from "../figma/brandAssets";

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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#c9c9c9]/30 bg-[rgba(248,250,252,0.85)] shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-[rgba(248,250,252,0.72)]">
      <div className="mx-auto flex w-full min-w-0 max-w-content items-center justify-between gap-3 px-4 py-4 sm:gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:justify-items-stretch md:gap-x-6 md:px-[61px] md:py-[30px] lg:gap-x-8">
        <Link
          to="/"
          className="relative block h-[50px] min-h-[44px] w-[205px] max-w-[calc(100%-3.75rem)] shrink-0 justify-self-start sm:max-w-none md:max-w-none"
          onClick={() => setOpen(false)}
        >
          <img
            alt="Product Shapers Consulting"
            className="block h-full w-full object-contain object-left"
            src={imgLogoLockup}
            width={205}
            height={50}
            decoding="async"
          />
        </Link>

        <nav
          className="hidden min-w-0 items-center justify-center justify-self-center gap-x-4 gap-y-2 md:flex lg:gap-x-6 xl:gap-x-8"
          aria-label="Główna nawigacja"
        >
          {links.map(({ to, label }) => {
            const active = navMatch(pathname, to);
            return (
              <Link
                key={`${to}-${label}`}
                to={to}
                className={`min-h-[44px] shrink-0 content-center text-center text-[15px] font-sans font-bold tracking-[1.2px] lg:text-[16px] ${
                  active ? "text-[#022169] underline decoration-solid [text-decoration-skip-ink:none]" : "text-black"
                } `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 justify-self-end md:block">
          {ctaIsKonsultacja ?
            <KonsultacjaScrollLink className="inline-flex min-h-[48px] flex-col items-center justify-center rounded-[18px] bg-[#022169] px-6 py-3 text-center text-[15px] font-sans font-medium capitalize tracking-[1.2px] text-white no-underline lg:px-8 lg:text-[16px]">
              {ctaLabel}
            </KonsultacjaScrollLink>
          : <Link
              to={ctaPath}
              className="inline-flex min-h-[48px] flex-col items-center justify-center rounded-[18px] bg-[#022169] px-6 py-3 text-center text-[15px] font-sans font-medium capitalize tracking-[1.2px] text-white no-underline lg:px-8 lg:text-[16px]"
            >
              {ctaLabel}
            </Link>
          }
        </div>

        <button
          type="button"
          className="flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#c9c9c9] md:hidden"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-xl leading-none" aria-hidden>
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open ?
        <div
          id="mobile-nav-menu"
          className="max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain border-t border-[#c9c9c9]/30 bg-[rgba(248,250,252,0.98)] px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
          role="dialog"
          aria-modal="false"
          aria-label="Menu mobilne"
        >
          <div className="flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={`${to}-${label}-m`}
                to={to}
                className="flex min-h-[48px] items-center rounded-lg px-2 text-[16px] font-sans font-bold tracking-[1.2px] text-[#000f3d] active:bg-black/[0.04]"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            {ctaIsKonsultacja ?
              <KonsultacjaScrollLink
                className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-[18px] bg-[#022169] px-4 py-3 text-[16px] font-sans font-medium text-white no-underline"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </KonsultacjaScrollLink>
            : <Link
                to={ctaPath}
                className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-[18px] bg-[#022169] px-4 py-3 text-[16px] font-sans font-medium text-white no-underline"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            }
          </div>
        </div>
      : null}
    </header>
  );
}
