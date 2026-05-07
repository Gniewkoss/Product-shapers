import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ContactKontaktForm } from "../components/ContactKontaktForm";
import { HomeCommunitySection } from "../components/HomeCommunitySection";
import { HomeKnowledgeSection } from "../components/HomeKnowledgeSection";
import { PageBlocks } from "../components/cms/PageBlocks";
import { HomeExpertiseAccordion } from "../components/HomeExpertiseAccordion";
import { KonsultacjaScrollLink } from "../components/KonsultacjaScrollLink";
import iconEcommerce from "../assets/branding/Ecomerce.svg";
import iconFintech from "../assets/branding/Fintech.svg";
import iconLinkedIn from "../assets/branding/linkedin.svg";
import { useSitePayload } from "../context/SitePayloadContext";
import type { PayloadLayoutBlock } from "../lib/payload/blockUtils";
import { FALLBACK_KNOWLEDGE_CARDS, articleToKnowledgeCard, normalizeFeaturedArticles } from "../lib/payload/homeFeaturedArticles";
import { resolveCommunityBackgroundUrls, uploadRefMedia } from "../lib/payload/client";
import { brandIcons } from "../lib/brandIcons";

const imgImage8 = "https://www.figma.com/api/mcp/asset/2717548e-54bd-4e3e-a05e-c1d097f5fa07";
const imgImage9 = "https://www.figma.com/api/mcp/asset/2aa1306d-2d93-4df8-9887-62987f5b63e7";
const imgImage10 = "https://www.figma.com/api/mcp/asset/9c240abc-dbf1-4d29-bf1f-5a2785c16c8a";

export function HomeMain() {
  const location = useLocation();
  const { homepage } = useSitePayload();

  const heroHeadlinePrefix = homepage?.heroHeadlinePrefix ?? "Odzyskaj kontrolę nad";
  const heroHeadlineAccent = homepage?.heroHeadlineAccent ?? "RoadMapą!";
  const heroSubLines =
    homepage?.heroSubheadline?.split(/\n+/).filter(Boolean) ?? [
      "Pomagam firmom wyjść z pułapki »wiecznego backlogu« i",
      "wdrożyć systemową przewidywalność poprzez architekturę",
      "procesów produktowych.",
    ];
  const heroCtaLabel = homepage?.heroCtaLabel ?? "Umów się na 30' spotkanie";
  const heroCtaPath = homepage?.heroCtaPath ?? "/#konsultacja";
  const heroCtaIsKonsultacja = heroCtaPath.includes("konsultacja");
  const founderPortraitResolved = uploadRefMedia(
    typeof homepage?.founderPortrait === "object" && homepage.founderPortrait ? homepage.founderPortrait : null,
  );
  const founderPortraitUrl = founderPortraitResolved.url;
  const founderPortraitAlt =
    homepage?.founderPortraitAlt?.trim() || founderPortraitResolved.alt || "Dawid Jurand Szkiełka";

  const expertiseEyebrow = homepage?.expertiseEyebrow ?? "Jak pomagam";
  const expertiseHeading = homepage?.expertiseHeading ?? "Obszary ekspertyzy";
  const expertiseIntroParagraphs =
    homepage?.expertiseIntro?.split(/\n\s*\n/).filter(Boolean) ?? [
      "Systemowe podejście do budowania produktów wymaga precyzji na każdym etapie. Skupiam się na fundamentach, które decydują o sukcesie rynkowym.",
    ];

  const methodologyEyebrow = homepage?.methodologyEyebrow ?? "Metodologia";
  const methodologyHeading = homepage?.methodologyHeading ?? "Podejście do wdrożeń";
  const methodologyParas =
    homepage?.methodologyParagraphs?.split(/\n\s*\n/).filter(Boolean) ?? [
      "Dopasowuję rozwiązania do realiów firmy - jej skali, budżetu, kultury organizacyjnej oraz wymogów regulacyjnych (compliance). Zmiany wdrażam stopniowo, w podejściu day-by-day.",
      "Nie kończę na rekomendacjach — skupiam się na ich realnym wdrożeniu i dowożeniu efektów.",
    ];
  const methodologyBulletsResolved =
    homepage?.methodologyBullets?.filter((b) => b.title)?.length ?
      homepage.methodologyBullets!.filter((b) => b.title)
    : [{ title: "Tailored solutions" }, { title: "Step-by-step evolution" }, { title: "Execution focus" }];
  const methodologyIcons = [brandIcons.tailored, brandIcons.stepByStep, brandIcons.execution];

  const contactEyebrow = homepage?.contactEyebrow ?? "Konsultacja";
  const contactHeading = homepage?.contactHeading ?? "Umów się na rozmowę";
  const contactIntroLines =
    homepage?.contactIntro?.split(/\n+/).filter(Boolean) ?? [
      "Wypełnij formularz, aby umówić bezpłatną konsultację wstępną. Porozmawiamy o Twoich wyzwaniach i sprawdzimy, czy możemy wspólnie wypracować lepszą strukturę dla Twojego produktu.",
    ];
  const contactEmail = homepage?.contactEmail ?? "kontakt@productshapers.com";
  const contactLocation = homepage?.contactLocation ?? "Warszawa / Remote";

  const homeTail = homepage?.homeTailLayout as PayloadLayoutBlock[] | null | undefined;
  const homeContinuation = homepage?.homeContinuationLayout as PayloadLayoutBlock[] | null | undefined;
  const useCmsHomeBlocks = Boolean(homeTail?.length || homeContinuation?.length);

  const featuredKnowledgeArticles = normalizeFeaturedArticles(homepage?.featuredKnowledgeArticles);
  const homeKnowledgeCards =
    featuredKnowledgeArticles.length > 0 ?
      featuredKnowledgeArticles.map(articleToKnowledgeCard)
    : FALLBACK_KNOWLEDGE_CARDS;

  useLayoutEffect(() => {
    if (location.pathname !== "/" || location.hash !== "#kontakt") return;
    const el = document.getElementById("kontakt");
    if (!el) return;
    const t = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(t);
  }, [location.pathname, location.hash]);

  return (
    <div className="relative w-full min-w-0">
      <div className="flex flex-col items-stretch pt-[80px] sm:pt-[88px]">

        {/* ─────────────────────────── HERO ─────────────────────────── */}
        <section className="relative bg-[#000f3d]">
          {/* Background: dot grid + radial glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute right-[-10%] top-[-25%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,131,254,0.18)_0%,transparent_65%)]" />
            <div className="absolute bottom-[-20%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(125,250,182,0.09)_0%,transparent_70%)]" />
          </div>

          <div className="relative mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 md:px-10 lg:px-[61px] lg:pb-[110px] lg:pt-[96px]">

            {/* ── Copy ── */}
            <div className="flex w-full flex-col items-start gap-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-[7px]">
                <span className="h-[7px] w-[7px] shrink-0 animate-pulse rounded-full bg-[#7dfab6]" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
                  Product Strategy Consulting
                </span>
              </div>

              {/* H1 */}
              <h1 className="m-0 max-w-[820px] text-balance font-sans font-bold text-[clamp(2.75rem,8.5vw,6rem)] leading-[1.03] text-white">
                {heroHeadlinePrefix}{" "}
                <span className="bg-gradient-to-r from-[#7dfab6] via-[#4bf5c7] to-[#0083fe] bg-clip-text text-transparent">
                  {heroHeadlineAccent}
                </span>
              </h1>

              {/* Subline */}
              <p className="m-0 max-w-[600px] font-serif text-[clamp(1.0625rem,2vw,1.3125rem)] leading-[1.68] text-white/60">
                {heroSubLines.join(" ")}
              </p>

              {/* CTA row */}
              <div className="mt-2 flex flex-wrap items-center gap-4">
                {heroCtaIsKonsultacja ? (
                  <KonsultacjaScrollLink className="btn-primary gap-3 px-7 py-[15px] text-[15px]">
                    <span className="font-sans font-bold tracking-[0.05em]">{heroCtaLabel}</span>
                    <img alt="" className="block h-4 w-4 shrink-0" src={brandIcons.arrow} />
                  </KonsultacjaScrollLink>
                ) : (
                  <Link to={heroCtaPath} className="btn-primary gap-3 px-7 py-[15px] text-[15px]">
                    <span className="font-sans font-bold tracking-[0.05em]">{heroCtaLabel}</span>
                    <img alt="" className="block h-4 w-4 shrink-0" src={brandIcons.arrow} />
                  </Link>
                )}
                <span className="font-sans text-[13px] text-white/35">Bezpłatna, 30-minutowa rozmowa</span>
              </div>

              {/* Stats row */}
              <div className="mt-6 flex w-full flex-wrap items-start gap-x-10 gap-y-6 border-t border-white/[0.07] pt-8">
                {[
                  { value: "50+", label: "firm wdrożonych" },
                  { value: "+40%", label: "wzrost velocity" },
                  { value: "3×", label: "szybciej na rynek" },
                  { value: "100%", label: "focus na efektach" },
                ].map(({ value, label }) => (
                  <div key={value} className="flex flex-col items-start gap-1">
                    <span className="font-sans text-[2rem] font-bold leading-none text-white">{value}</span>
                    <span className="font-sans text-[12px] text-white/40">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ─────────────── OPTIONAL: SERVICES FROM CMS ─────────────── */}
        {homepage?.services?.length ? (
          <div className="w-full min-w-0 border-t border-[rgba(197,197,210,0.3)] bg-white">
            <div className="mx-auto flex w-full max-w-content flex-col px-4 py-16 sm:px-6 md:px-10 lg:px-[61px]">
              <div className="mb-10 max-w-[880px]">
                {homepage.servicesEyebrow && (
                  <p className="font-sans font-bold text-[15px] tracking-[0.05em] text-[#0083fe]">
                    {homepage.servicesEyebrow}
                  </p>
                )}
                {homepage.servicesHeading && (
                  <h2 className="mt-4 font-sans font-bold text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-[#000f3d]">
                    {homepage.servicesHeading}
                  </h2>
                )}
                {homepage.servicesIntro && (
                  <p className="mt-6 whitespace-pre-line text-[clamp(1rem,1.8vw,1.375rem)] leading-[1.55] text-[#444651]">
                    {homepage.servicesIntro}
                  </p>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {homepage.services.map((s, idx) => (
                  <div key={idx} className="rounded-[12px] border border-[#e2e5ee] bg-[#fafafa] p-7 transition-shadow duration-200 hover:shadow-[var(--shadow-card)]">
                    <h3 className="font-sans font-bold text-[20px] leading-snug text-[#022169]">{s.title}</h3>
                    <p className="mt-3 text-[16px] leading-[1.6] text-[#444651]">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* ─────────────── OPTIONAL: ABOUT FROM CMS ─────────────── */}
        {(homepage?.aboutHeading || homepage?.aboutBody) ? (
          <div className="w-full min-w-0 bg-[#fafafa] py-16">
            <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-[61px]">
              {homepage.aboutHeading && (
                <h2 className="font-sans font-bold text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-[#000f3d]">
                  {homepage.aboutHeading}
                </h2>
              )}
              {homepage.aboutBody && (
                <p className="mt-6 max-w-[820px] whitespace-pre-line text-[clamp(1rem,1.8vw,1.375rem)] leading-[1.6] text-[#444651]">
                  {homepage.aboutBody}
                </p>
              )}
            </div>
          </div>
        ) : null}

        {/* ──────────────── EXPERTISE ACCORDION ──────────────── */}
        <div className="w-full min-w-0 border-b border-t border-[rgba(197,197,210,0.3)] bg-white">
          <div className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 py-16 sm:px-6 md:px-10 lg:px-[61px] lg:py-24">
            <div className="grid w-full gap-x-16 gap-y-10 lg:grid-cols-[repeat(12,minmax(0,1fr))]">

              {/* Left: heading */}
              <div className="col-span-1 flex flex-col gap-5 self-start pb-8 lg:col-[1/span_4]">
                <p className="font-sans font-bold text-[14px] tracking-[0.08em] text-[#0083fe] uppercase">
                  {expertiseEyebrow}
                </p>
                <h2 className="m-0 font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#000f3d]">
                  {expertiseHeading}
                </h2>
                <div className="mt-2">
                  {expertiseIntroParagraphs.map((para, pi) => (
                    <p key={pi} className="font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.6] text-[#444651]">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-2 h-[3px] w-16 rounded-full bg-[#022169]" />
              </div>

              {/* Right: accordion */}
              <HomeExpertiseAccordion cmsItems={homepage?.expertiseItems?.length ? homepage.expertiseItems : null} />
            </div>
          </div>
        </div>

        {/* ──────────────── COMMUNITY ──────────────── */}
        <HomeCommunitySection
          headlineItalic={homepage?.communityHeadlineItalic}
          headlineRest={homepage?.communityHeadlineRest}
          leadBold={homepage?.communityLeadBold}
          body={homepage?.communityBody}
          supportingBrands={homepage?.communitySupportingBrands?.map((b) => b.name!).filter(Boolean)}
          expertNames={homepage?.communityExpertNames?.map((n) => n.name!).filter(Boolean)}
          bgPhotoUrls={resolveCommunityBackgroundUrls(homepage)}
        />

        {/* ──────────────── METHODOLOGY ──────────────── */}
        <div className="w-full min-w-0 bg-white">
          <div className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-10 px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-[61px] lg:py-24">

            {/* Left: text */}
            <div className="flex w-full min-w-0 max-w-[620px] flex-col gap-5">
              <p className="font-sans font-bold text-[14px] tracking-[0.08em] text-[#0083fe] uppercase">
                {methodologyEyebrow}
              </p>
              <h2 className="m-0 font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#000f3d]">
                {methodologyHeading}
              </h2>
              <div className="mt-2 flex flex-col gap-5">
                {methodologyParas.map((para, mpi) => (
                  <p key={mpi} className="m-0 font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.65] text-[#444651]">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: bullets */}
            <div className="flex w-full max-w-full shrink-0 flex-col gap-6 lg:w-auto lg:max-w-[280px]">
              {methodologyBulletsResolved.map((bullet, bi) => {
                const iconSlot = bi % 3;
                return (
                  <div key={bi} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#022169]">
                      {iconSlot === 0 ? (
                        <img alt="" className="h-5 w-5 object-contain" src={methodologyIcons[0]} />
                      ) : iconSlot === 1 ? (
                        <img alt="" className="h-6 w-6 object-contain" src={methodologyIcons[1]} />
                      ) : (
                        <img alt="" className="h-3 w-5 object-contain" src={methodologyIcons[2]} />
                      )}
                    </div>
                    <span className="font-sans font-bold text-[15px] tracking-[0.04em] text-[#000f3d]">
                      {bullet.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ──────────────── CMS BLOCKS OR FALLBACK ──────────────── */}
        {useCmsHomeBlocks ? (
          <>
            <PageBlocks layout={homeTail ?? null} />
            <PageBlocks layout={homeContinuation ?? null} />
          </>
        ) : (
          <>
            {/* ── "Jak to robię w praktyce" ── */}
            <div className="w-full min-w-0 bg-[#f6f7fa]">
              <div className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start gap-16 px-4 py-16 sm:px-6 md:px-10 lg:px-[61px] lg:py-24">
                <h2 className="m-0 w-full text-center font-sans font-bold text-[clamp(1.75rem,4.5vw,3rem)] leading-tight text-[#000f3d]">
                  Jak to robię w praktyce
                </h2>
                <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "Shape Up",
                      body: "Metodologia Basecamp do pracy w cyklach z ustalonym appetite — bez wiecznego backlogu, z pełnym fokusem zespołu.",
                    },
                    {
                      title: "Continuous Discovery",
                      body: "Nawyki Teresy Torres pozwalające budować to, czego faktycznie chcą klienci — na bazie regularnych wywiadów i testów.",
                    },
                    {
                      title: "ADKAR Change",
                      body: "Model zarządzania zmianą ludzką podczas transformacji procesowej — od Awareness po Reinforcement.",
                    },
                    {
                      title: "Product Operating Model",
                      body: "Zasady Marty'ego Cagana definiujące pracę nowoczesnych organizacji produktowych nastawionych na outcomes.",
                    },
                  ].map((card) => (
                    <div key={card.title} className="method-card">
                      <h3 className="m-0 font-sans font-bold text-[20px] leading-tight text-[#022169]">{card.title}</h3>
                      <p className="m-0 font-serif text-[15px] leading-[1.65] text-[#444651]">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Doświadczenie (Experience) ── */}
            <div className="w-full min-w-0 bg-white">
              <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-16 px-4 py-16 sm:px-6 md:px-10 lg:px-[61px] lg:py-24">
                <div className="flex flex-col gap-4 max-w-[720px]">
                  <p className="font-sans font-bold text-[14px] tracking-[0.08em] text-[#0083fe] uppercase">
                    Ekspertyza branżowa
                  </p>
                  <h2 className="m-0 font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#000f3d]">
                    Doświadczenie
                  </h2>
                  <p className="m-0 font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.65] text-[#444651]">
                    Dojrzałe, skalujące się platformy szukające sposobu aby drążyć dwa razy szybciej z tym samym zespołem.
                  </p>
                </div>

                <div className="grid w-full gap-x-12 gap-y-12 lg:grid-cols-2">
                  {/* Fintech */}
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                      <img alt="" className="h-5 w-5 shrink-0" src={iconFintech} />
                      <h3 className="m-0 font-sans font-bold text-[22px] text-[#022169]">Fintech</h3>
                    </div>
                    <div className="flex flex-col gap-5">
                      {[
                        { name: "Useme", tag: "Scale-up" },
                        { name: "Wealthon", tag: "Financial Ops" },
                        { name: "Allegro Pay", tag: "Embedded Finance" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between border-b border-[rgba(2,33,105,0.1)] pb-5">
                          <span className="font-sans font-bold text-[18px] text-[#000f3d]">{item.name}</span>
                          <span className="font-sans font-bold text-[12px] uppercase tracking-[0.08em] text-[#94a3b8]">{item.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ecommerce */}
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                      <img alt="" className="h-5 w-4 shrink-0" src={iconEcommerce} />
                      <h3 className="m-0 font-sans font-bold text-[22px] text-[#022169]">Ecommerce</h3>
                    </div>
                    <div className="flex flex-col gap-5">
                      {[
                        { name: "Allegro", tag: "Marketplace" },
                        { name: "Limango", tag: "Flash Sales" },
                        { name: "Shoplo", tag: "SaaS Platform" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between border-b border-[rgba(2,33,105,0.1)] pb-5">
                          <span className="font-sans font-bold text-[18px] text-[#000f3d]">{item.name}</span>
                          <span className="font-sans font-bold text-[12px] uppercase tracking-[0.08em] text-[#94a3b8]">{item.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Case highlight */}
                <div className="relative overflow-hidden rounded-[0_clamp(40px,8vw,80px)_clamp(16px,4vw,24px)_clamp(16px,4vw,24px)] bg-[#032796] px-6 pb-10 pt-12 sm:px-10 sm:pb-14 sm:pt-16 lg:px-16">
                  <div className="pointer-events-none absolute right-[-80px] top-[-64px] h-64 w-64 rounded-xl bg-[rgba(0,91,179,0.15)] blur-[40px]" aria-hidden />
                  <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                    <div className="flex flex-1 flex-col items-start gap-8 min-w-0">
                      <div className="inline-flex items-center border border-[#7dfab6] px-4 py-1.5">
                        <span className="font-sans font-bold text-[11px] tracking-[0.08em] text-[#7dfab6] uppercase">Case Highlight</span>
                      </div>
                      <p className="m-0 font-sans font-bold text-[clamp(1.125rem,2.5vw,2rem)] leading-[1.2] text-white text-balance">
                        Case: Useme — od 20% do 80% on-time delivery w ciągu 6 miesięcy. Ownership culture zmienia wszystko.
                      </p>
                      <Link
                        to="/useme"
                        className="inline-flex w-full items-center justify-center gap-3 rounded-[12px] bg-white px-6 py-4 no-underline transition-all duration-150 hover:bg-white/90 sm:w-auto"
                      >
                        <span className="font-sans font-bold text-[14px] tracking-[0.05em] text-[#022169]">Przeczytaj Case Study</span>
                        <img alt="" src={brandIcons.arrowDark} className="h-4 w-4 shrink-0" />
                      </Link>
                    </div>
                    <div className="flex w-full flex-col items-center gap-8 border-t border-white/10 pt-8 text-center lg:max-w-[280px] lg:flex-none lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-sans font-bold text-[11px] tracking-[0.1em] text-white uppercase opacity-70">Transformacja</span>
                        <span className="font-sans text-[15px] leading-snug text-white">Shape Up Implementation</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-sans font-bold text-[11px] tracking-[0.1em] text-white uppercase opacity-70">Wynik</span>
                        <span className="font-sans text-[15px] leading-snug text-white">+300% Predictability</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── "Jak działamy" — Process Steps ── */}
            <div className="w-full min-w-0 bg-[#f6f7fa]">
              <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-16 px-4 py-16 sm:px-6 md:px-10 lg:px-[61px] lg:py-24">
                <h2 className="m-0 w-full text-center font-sans font-bold text-[clamp(1.75rem,4.5vw,3rem)] leading-tight text-[#000f3d]">
                  Jak działamy
                </h2>
                <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      n: "1",
                      title: "Diagnoza",
                      body: "Audyt obecnych procesów, wywiad z kluczowymi osobami i identyfikacja głównych blokerów dostarczania wartości.",
                    },
                    {
                      n: "2",
                      title: "Shaping & proposal",
                      body: "Projekt rozwiązania dopasowany do kontekstu firmy — z realistycznym appetite i jasno zdefiniowanym scope.",
                    },
                    {
                      n: "3",
                      title: "Wdrożenie & coaching",
                      body: "Hands-on praca z zespołem przez 6–12 tygodni. Wdrożenie metodyki krok po kroku, z codziennym wsparciem.",
                    },
                    {
                      n: "4",
                      title: "Ewaluacja",
                      body: "Pomiar efektów względem baseline. Retrospektywa i plan dalszego skalowania zmian w organizacji.",
                    },
                  ].map((step) => (
                    <div key={step.n} className="method-card">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#022169]">
                        <span className="font-sans font-bold text-[18px] text-white">{step.n}</span>
                      </div>
                      <h3 className="m-0 font-sans font-bold text-[20px] leading-tight text-[#000f3d]">{step.title}</h3>
                      <p className="m-0 font-serif text-[15px] leading-[1.65] text-[#444651]">{step.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Kim jestem (About founder) ── */}
            <div className="w-full min-w-0 bg-white">
              <div className="mx-auto grid w-full min-w-0 max-w-content grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-x-20 lg:px-[61px] lg:py-24">
                {/* Left: text */}
                <div className="flex flex-col gap-5 self-center">
                  <p className="font-sans font-bold text-[14px] tracking-[0.08em] text-[#0083fe] uppercase">
                    Architekt projektu
                  </p>
                  <h2 className="m-0 font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#000f3d]">
                    Dawid Jurand Szkiełka
                  </h2>
                  <div className="flex flex-col gap-5">
                    <p className="m-0 font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.65] text-[#444651]">
                      Wierzę, że sukces produktu nie zależy od genialnego pomysłu, ale od higieny procesów, które pozwalają go odkryć i dowieźć. Od ponad 10 lat kształtuję produkty w środowiskach e-commerce, fintech i SaaS.
                    </p>
                    <p className="m-0 font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.65] text-[#444651]">
                      Moje podejście łączy twardą analitykę z psychologią zarządzania zmianą. Nie jestem teoretykiem — wdrażam rozwiązania, które sam przetestowałem na polu walki w największych polskich spółkach technologicznych.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="font-sans font-bold text-[2rem] leading-none text-[#022169]">10+</span>
                      <span className="font-serif text-[15px] leading-snug text-[#757682]">Lat doświadczenia</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-sans font-bold text-[2rem] leading-none text-[#022169]">50+</span>
                      <span className="font-serif text-[15px] leading-snug text-[#757682]">Zespołów produktowych</span>
                    </div>
                  </div>
                </div>

                {/* Right: portrait */}
                <div
                  className={`relative overflow-hidden ${founderPortraitUrl ? "" : "bg-[#e8e8e8]"}`}
                  style={{ aspectRatio: "1 / 1", borderRadius: "clamp(16px,6vw,48px) clamp(16px,6vw,48px) clamp(16px,6vw,48px) 4px" }}
                >
                  {founderPortraitUrl ? (
                    <img
                      alt={founderPortraitAlt}
                      src={founderPortraitUrl}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* ── Testimonials ── */}
            <div className="w-full min-w-0 bg-[#f6f7fa]">
              <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-14 px-4 py-16 sm:px-6 md:px-10 lg:px-[61px] lg:py-24">
                <h2 className="m-0 w-full text-center font-sans font-bold text-[clamp(2rem,5vw,3rem)] leading-tight text-[#022169]">
                  Opinie
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-12">
                  {[
                    {
                      text: `"Polecam współpracę z Dawidem, którego głębokie zrozumienie potrzeb klientów (JTBD) i Product<>Market Fit było kluczowe. Dzięki Shape Up wdrażaliśmy innowacje w terminie — problem, z którym boryka się większość firm. To niezwykle cenny partner w skracaniu czasu od pomysłu do wdrożenia."`,
                      name: "Filip",
                      role: "Product Growth @DocPlanner",
                      avatar: imgImage8,
                    },
                    {
                      text: `"Współpracowałam z Dawidem przez 2 lata — to ekspert, który doskonale lokalizuje prawdziwe potrzeby klientów i przekłada je na skuteczne rozwiązania produktowe. Dzięki Shape Up projekty wdrażane są na czas. Znacząco skrócił nam czas realizacji nowych funkcjonalności, co przełożyło się na wzrost firmy."`,
                      name: "Agnieszka",
                      role: "Head of Growth @Useme",
                      avatar: imgImage9,
                    },
                    {
                      text: `"Współpraca z Dawidem znacząco przyczyniła się do rozwoju kultury produktowej w organizacji. Dawid skutecznie wdrożył Shape Up, m.in. sześciotygodniowe cykle pracy i autonomię zespołów. Udało się uporządkować pracę, ograniczyć zbędne ceremonie i regularnie dostarczać wartość w terminie."`,
                      name: "Marta",
                      role: "COO @Useme",
                      avatar: imgImage10,
                    },
                  ].map((t, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-8 border-l-2 border-[rgba(2,33,105,0.15)] pl-6 sm:pl-8 md:col-span-1"
                      style={idx === 2 ? { gridColumn: undefined } : undefined}
                    >
                      <p className="m-0 font-serif text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.65] text-[rgba(2,33,105,0.8)]">
                        {t.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[rgba(2,33,105,0.12)] bg-[rgba(2,33,105,0.05)]">
                          <img alt="" src={t.avatar} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-sans font-bold text-[15px] tracking-[0.04em] text-[#022169] truncate">{t.name}</span>
                            <img alt="" src={iconLinkedIn} className="h-3 w-3 shrink-0" />
                          </div>
                          <span className="font-sans font-bold text-[10px] tracking-[0.12em] text-[#0083fe] uppercase truncate">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Knowledge articles ── */}
            <HomeKnowledgeSection
              eyebrow="Artykuły"
              heading="Baza wiedzy"
              subtitle="Eseje i artykuły"
              cards={homeKnowledgeCards}
            />
          </>
        )}

        {/* ──────────────── CONTACT ──────────────── */}
        <div className="w-full min-w-0 bg-white">
          <div
            id="kontakt"
            className="mx-auto grid w-full min-w-0 max-w-content scroll-mt-[88px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-x-20 lg:px-[61px] lg:py-24"
          >
            {/* Left: intro */}
            <div className="flex flex-col gap-5 self-center">
              <p className="font-sans font-bold text-[14px] tracking-[0.08em] text-[#0083fe] uppercase">
                {contactEyebrow}
              </p>
              <h2 className="m-0 font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#000f3d]">
                {contactHeading}
              </h2>
              <div className="flex flex-col gap-4">
                {contactIntroLines.map((line, i) => (
                  <p key={i} className="m-0 font-serif text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.65] text-[#444651]">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-4 no-underline group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f4f8] transition-colors group-hover:bg-[#e8eaf2]">
                    <img alt="" className="h-4 w-5 object-contain" src={brandIcons.kontakt} />
                  </div>
                  <span className="font-sans font-bold text-[15px] tracking-[0.04em] text-[#1b1b1b] break-all sm:break-normal group-hover:text-[#022169] transition-colors">
                    {contactEmail}
                  </span>
                </a>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f4f8]">
                    <img alt="" className="h-5 w-4 object-contain" src={brandIcons.location} />
                  </div>
                  <span className="font-sans font-bold text-[15px] tracking-[0.04em] text-[#1b1b1b]">
                    {contactLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="flex w-full min-w-0 flex-col self-start lg:pt-16">
              <ContactKontaktForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
