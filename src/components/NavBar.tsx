import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSitePayload } from "../context/SitePayloadContext";
import logo from "../assets/branding/logo.svg";
import { KonsultacjaScrollLink } from "./KonsultacjaScrollLink";

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

function HamburgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
      <path d="M1 1.5H21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M1 8H21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M1 14.5H21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M1.5 1.5L16.5 16.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M16.5 1.5L1.5 16.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const ctaClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-[12px] bg-[#022169] px-5 py-2.5 text-[14px] font-sans font-bold tracking-[0.05em] text-white no-underline transition-all duration-150 hover:bg-[#031d56] hover:shadow-[0_4px_16px_rgba(2,33,105,0.25)] hover:-translate-y-px active:translate-y-0 lg:px-7 lg:text-[15px]";

export function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigation } = useSitePayload();
  const menuRef = useRef<HTMLDivElement>(null);

  const links = useMemo(() => {
    if (navigation?.links?.length) {
      return navigation.links.map((l) => ({ to: l.path, label: l.label }));
    }
    return defaultNavLinks.map((l) => ({ to: l.to, label: l.label }));
  }, [navigation]);

  const ctaLabel = navigation?.ctaLabel?.trim() || defaultCtaLabel;
  const ctaPath = navigation?.ctaPath?.trim() || defaultCtaPath;
  const ctaIsKonsultacja = ctaPath.includes("konsultacja");

  /* Close menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Detect scroll to add stronger shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <header
      ref={menuRef}
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#c9c9c9]/20 bg-[rgba(248,250,252,0.88)] backdrop-blur-md transition-shadow duration-200 supports-[backdrop-filter]:bg-[rgba(248,250,252,0.76)] ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_20px_rgba(2,33,105,0.08)]" : ""
      }`}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-content items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:justify-items-stretch md:gap-x-6 md:px-[61px] md:py-[26px] lg:gap-x-8">

        {/* Logo */}
        <Link
          to="/"
          className="relative block h-[44px] min-h-[44px] w-[180px] max-w-[calc(100%-3.5rem)] shrink-0 justify-self-start transition-opacity duration-150 hover:opacity-80 sm:w-[205px] sm:max-w-none md:max-w-none"
          onClick={() => setOpen(false)}
        >
          <img
            alt="Product Shapers Consulting"
            className="block h-full w-full object-contain object-left"
            src={logo}
            width={205}
            height={50}
            decoding="async"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden min-w-0 items-center justify-center justify-self-center gap-x-1 gap-y-2 md:flex lg:gap-x-2"
          aria-label="Główna nawigacja"
        >
          {links.map(({ to, label }) => {
            const active = navMatch(pathname, to);
            return (
              <Link
                key={`${to}-${label}`}
                to={to}
                className={`relative min-h-[40px] shrink-0 content-center rounded-[8px] px-3 text-center text-[14px] font-sans font-bold tracking-[0.05em] transition-colors duration-150 lg:text-[15px] ${
                  active
                    ? "bg-[#022169]/[0.07] text-[#022169]"
                    : "text-[#222] hover:bg-black/[0.04] hover:text-[#022169]"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 h-[3px] w-[16px] -translate-x-1/2 rounded-full bg-[#022169]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 justify-self-end md:block">
          {ctaIsKonsultacja ? (
            <KonsultacjaScrollLink className={ctaClass}>{ctaLabel}</KonsultacjaScrollLink>
          ) : (
            <Link to={ctaPath} className={ctaClass}>
              {ctaLabel}
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-[10px] border border-[#d1d5db] text-[#222] transition-colors duration-150 hover:bg-black/[0.04] md:hidden"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav-menu"
          className="mobile-menu-enter max-h-[min(72vh,calc(100dvh-4.5rem))] overflow-y-auto overscroll-contain border-t border-[#c9c9c9]/20 bg-[rgba(248,250,252,0.98)] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
          role="dialog"
          aria-modal="false"
          aria-label="Menu mobilne"
        >
          <div className="flex flex-col gap-0.5">
            {links.map(({ to, label }) => {
              const active = navMatch(pathname, to);
              return (
                <Link
                  key={`${to}-${label}-m`}
                  to={to}
                  className={`flex min-h-[48px] items-center rounded-[10px] px-3 text-[16px] font-sans font-bold tracking-[0.04em] transition-colors duration-150 ${
                    active
                      ? "bg-[#022169]/[0.07] text-[#022169]"
                      : "text-[#000f3d] hover:bg-black/[0.04]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-3 pt-3 border-t border-[#e5e7eb]">
              {ctaIsKonsultacja ? (
                <KonsultacjaScrollLink
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[#022169] px-4 py-3 text-[15px] font-sans font-bold tracking-[0.05em] text-white no-underline"
                  onClick={() => setOpen(false)}
                >
                  {ctaLabel}
                </KonsultacjaScrollLink>
              ) : (
                <Link
                  to={ctaPath}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[#022169] px-4 py-3 text-[15px] font-sans font-bold tracking-[0.05em] text-white no-underline"
                  onClick={() => setOpen(false)}
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
