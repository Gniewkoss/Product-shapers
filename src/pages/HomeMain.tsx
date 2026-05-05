import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ContactKontaktForm } from "../components/ContactKontaktForm";
import { HomeCommunitySection } from "../components/HomeCommunitySection";
import { HomeKnowledgeSection } from "../components/HomeKnowledgeSection";
import { PageBlocks } from "../components/cms/PageBlocks";
import { HomeExpertiseAccordion } from "../components/HomeExpertiseAccordion";
import { KonsultacjaScrollLink } from "../components/KonsultacjaScrollLink";
import iconArrow from "../assets/branding/arrow rightsvg.svg";
import iconEcommerce from "../assets/branding/Ecomerce.svg";
import iconFintech from "../assets/branding/Fintech.svg";
import iconLinkedIn from "../assets/branding/linkedin.svg";
import { useSitePayload } from "../context/SitePayloadContext";
import type { PayloadLayoutBlock } from "../lib/payload/blockUtils";
import { FALLBACK_KNOWLEDGE_CARDS, articleToKnowledgeCard, normalizeFeaturedArticles } from "../lib/payload/homeFeaturedArticles";
import { mediaUrl, resolveCommunityBackgroundUrls, uploadRefMedia } from "../lib/payload/client";
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
  const heroCtaLabel = homepage?.heroCtaLabel ?? "Umów się na 30’ spotkanie";
  const heroCtaPath = homepage?.heroCtaPath ?? "/#konsultacja";
  const heroCtaIsKonsultacja = heroCtaPath.includes("konsultacja");
  const heroImageUrl =
    mediaUrl(
      typeof homepage?.heroImage === "object" && homepage.heroImage && "url" in homepage.heroImage ?
        String((homepage.heroImage as { url?: string }).url)
      : undefined,
    ) ?? undefined;

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
      "Systemowe podejście do budowania",
      "produktów wymaga precyzji na każdym etapie. Skupiam się na fundamentach, które decydują o sukcesie rynkowym.",
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
      "Wypełnij formularz, aby umówić bezpłatną konsultację",
      "wstępną. Porozmawiamy o Twoich wyzwaniach i",
      "sprawdzimy, czy możemy wspólnie wypracować lepszą",
      "strukturę dla Twojego produktu.",
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
    <div className="content-stretch relative size-full flex flex-col items-center bg-white pb-[3.66px]" data-node-id="1:962" data-name="Home (Desktop) - Brand Strict">
      <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full pt-[110px]" data-node-id="1:963" data-name="Main">
        <div className="w-full shrink-0 bg-[#f3f3f3]" data-node-id="1:964-outer" data-name="Hero Section (full-bleed)">
          <div
            className="relative mx-auto flex w-full min-w-0 max-w-content shrink-0 flex-col content-stretch items-stretch gap-8 px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:px-[61px] lg:py-[96px]"
            data-node-id="1:964"
            data-name="Hero Section"
          >
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full min-w-0 max-w-[698px]" data-node-id="1:965" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:966" data-name="Heading 1">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] w-full text-[2.25rem] leading-tight sm:text-4xl sm:leading-[1.12] md:text-5xl md:leading-[1.1] lg:text-[84px] lg:leading-[0]" data-node-id="1:967">
                <p>
                  <span className="text-[#000f3d] leading-[1.1] sm:leading-[1.1] lg:leading-[105px]">{heroHeadlinePrefix}</span>
                  <span className="leading-[1.1] lg:leading-[105px]">{` `}</span>
                  <span className="bg-clip-text bg-gradient-to-r from-[#0083fe] leading-[1.1] sm:leading-[1.1] text-[transparent] to-[#032796] lg:leading-[105px]">
                    {heroHeadlineAccent}
                  </span>
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start max-w-[672px] pt-[7px] relative shrink-0 w-full min-w-0" data-node-id="1:968" data-name="Container">
              <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] whitespace-normal" data-node-id="1:969">
                {heroSubLines.map((line, i) => (
                  <p key={i} className={`leading-[27.5px] ${i < heroSubLines.length - 1 ? "mb-0" : ""}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {heroCtaIsKonsultacja ?
              <KonsultacjaScrollLink
                className="bg-[var(--dark-blue,#022169)] inline-flex max-w-full shrink-0 items-center gap-4 rounded-[18px] px-6 py-[18px] text-[color:var(--white,white)] no-underline sm:px-10 sm:py-5"
                data-node-id="1:970"
                data-name="Link"
              >
                <span className="min-w-0 text-center font-['Satoshi:Bold',sans-serif] text-[15px] leading-snug tracking-[1.2px] sm:text-left sm:text-[16px]">
                  {heroCtaLabel}
                </span>
                <div className="relative shrink-0 size-[16px]" data-node-id="1:972" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={brandIcons.arrow} />
                </div>
              </KonsultacjaScrollLink>
            : <Link
                to={heroCtaPath}
                className="bg-[var(--dark-blue,#022169)] inline-flex max-w-full shrink-0 items-center gap-4 rounded-[18px] px-6 py-[18px] text-[color:var(--white,white)] no-underline sm:px-10 sm:py-5"
                data-node-id="1:970"
                data-name="Link"
              >
                <span className="min-w-0 text-center font-['Satoshi:Bold',sans-serif] text-[15px] leading-snug tracking-[1.2px] sm:text-left sm:text-[16px]">
                  {heroCtaLabel}
                </span>
                <div className="relative shrink-0 size-[16px]" data-node-id="1:972" data-name="Container">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={brandIcons.arrow} />
                </div>
              </Link>
            }
          </div>
          <div className="content-stretch flex h-[min(60vw,409px)] min-h-[220px] items-start justify-end relative shrink-0 w-full max-w-full lg:h-[409px] lg:w-[365px] lg:max-w-[365px]" data-node-id="1:974" data-name="Container">
            <div
              className="content-stretch flex flex-[1_0_0] flex-col h-full w-full items-start justify-center min-w-0 overflow-clip relative rounded-tr-[80px]"
              data-node-id="1:975"
              style={{
                backgroundImage:
                  heroImageUrl ?
                    `url(${heroImageUrl})`
                  : "linear-gradient(209.19120734429254deg, rgb(78, 78, 78) 16.635%, rgb(180, 180, 180) 104.19%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              data-name="Background"
            >
              <div className="flex-[1_0_0] min-h-px opacity-60 w-full" data-node-id="1:976" data-name="Workshop setting" />
            </div>
          </div>
          </div>
        </div>
        {homepage?.services?.length ?
          <div className="w-full min-w-0 border-t border-[rgba(197,197,210,0.3)] bg-white">
            <div className="mx-auto flex w-full max-w-content flex-col px-4 py-16 sm:px-6 md:px-10 lg:px-[61px]">
              <div className="mb-10 max-w-[880px]">
                {homepage.servicesEyebrow ?
                  <p className="font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] text-[color:var(--light-blue,#0083fe)]">
                    {homepage.servicesEyebrow}
                  </p>
                : null}
                {homepage.servicesHeading ?
                  <h2 className="mt-4 font-['Satoshi:Bold',sans-serif] text-[40px] leading-[1.1] text-[#000f3d] md:text-[48px] md:leading-[60px]">
                    {homepage.servicesHeading}
                  </h2>
                : null}
                {homepage.servicesIntro ?
                  <div className="mt-6 whitespace-pre-line text-[22px] leading-[27.5px] text-[#444651]">{homepage.servicesIntro}</div>
                : null}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {homepage.services.map((s, idx) => (
                  <div key={idx} className="rounded-lg border border-[#c5c5d2]/30 bg-[#fafafa] p-8">
                    <h3 className="font-['Satoshi:Bold',sans-serif] text-[22px] text-[#022169]">{s.title}</h3>
                    <p className="mt-3 text-[16px] leading-6 text-[#444651]">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        : null}
        {(homepage?.aboutHeading || homepage?.aboutBody) ?
          <div className="w-full min-w-0 bg-[#fafafa] py-16">
            <div className="mx-auto max-w-content px-4 sm:px-6 md:px-10 lg:px-[61px]">
              {homepage.aboutHeading ?
                <h2 className="font-['Satoshi:Bold',sans-serif] text-[40px] text-[#000f3d]">{homepage.aboutHeading}</h2>
              : null}
              {homepage.aboutBody ?
                <p className="mt-6 max-w-[820px] whitespace-pre-line text-[22px] leading-[27.5px] text-[#444651]">{homepage.aboutBody}</p>
              : null}
            </div>
          </div>
        : null}
        <div className="w-full min-w-0 border-[rgba(197,197,210,0.3)] border-b border-t border-solid bg-white">
        <div className="content-stretch flex min-h-0 h-auto flex-col items-start px-4 py-[97px] sm:px-6 md:px-10 lg:px-[61px] relative shrink-0 w-full max-w-content mx-auto min-w-0" data-node-id="1:977" data-name="Obszary Ekspertyzy (Accordion Section)">
          <div className="relative min-h-0 h-auto w-full shrink-0" data-node-id="1:978" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative grid size-full grid-cols-1 gap-x-0 gap-y-8 grid-rows-[auto] lg:grid-cols-[repeat(12,minmax(0,1fr))] lg:gap-x-[64px] lg:gap-y-[64px] lg:grid-rows-[minmax(0,auto)]">
              <div className="content-stretch col-span-1 flex flex-col gap-[24px] items-start justify-self-stretch self-start row-1 shrink-0 pb-[56px] lg:col-[1/span_4] relative" data-node-id="1:979" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:980" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full" data-node-id="1:981">
                    <p className="leading-[16px]">{expertiseEyebrow}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:982" data-name="Heading 2">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-[color:var(--font,#000f3d)] w-full" data-node-id="1:983">
                    <p className="leading-[60px]">{expertiseHeading}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pb-[16.625px] pt-[7.375px] relative shrink-0 w-full" data-node-id="1:984" data-name="Container">
                  <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full" data-node-id="1:985">
                    {expertiseIntroParagraphs.map((para, pi) => (
                      <p key={pi} className={`leading-[27.5px] ${pi < expertiseIntroParagraphs.length - 1 ? "mb-0" : ""}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="bg-[var(--dark-blue,#022169)] h-[4px] shrink-0 w-[96px]" data-node-id="1:986" data-name="Background" />
              </div>
              <HomeExpertiseAccordion cmsItems={homepage?.expertiseItems?.length ? homepage.expertiseItems : null} />
            </div>
          </div>
        </div>
        </div>
        <HomeCommunitySection
          headlineItalic={homepage?.communityHeadlineItalic}
          headlineRest={homepage?.communityHeadlineRest}
          leadBold={homepage?.communityLeadBold}
          body={homepage?.communityBody}
          supportingBrands={homepage?.communitySupportingBrands?.map((b) => b.name!).filter(Boolean)}
          expertNames={homepage?.communityExpertNames?.map((n) => n.name!).filter(Boolean)}
          bgPhotoUrls={resolveCommunityBackgroundUrls(homepage)}
        />
        <div className="w-full min-w-0 bg-white">
        <div className="content-stretch flex min-h-0 h-auto flex-col items-stretch justify-start gap-10 overflow-clip px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:h-[536px] lg:px-[61px] lg:py-[96px] relative shrink-0 w-full max-w-content mx-auto min-w-0" data-node-id="1:1122" data-name="Section - NEW SECTION: Podejście do wdroże">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full min-w-0 max-w-[662px]" data-node-id="1:1123">
            <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full" data-node-id="1:1124">
              <p className="leading-[16px]">{methodologyEyebrow}</p>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1125" data-name="Heading 2">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full" data-node-id="1:1126">
                <p className="leading-[60px]">{methodologyHeading}</p>
              </div>
            </div>
            <div className="content-stretch flex min-h-0 flex-col gap-[28px] items-start relative shrink-0 w-full" data-node-id="1:1127" data-name="Container">
              {methodologyParas.map((para, mpi) => (
                <div key={mpi} className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <p className="leading-[27.5px] not-italic text-[#444651] text-[22px] w-full">{para}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[32px] min-h-0 h-auto lg:h-[259px] items-start pt-[16px] relative shrink-0 w-full min-w-0 max-w-[275px] lg:w-[275px]" data-node-id="1:1133" data-name="Container">
            {methodologyBulletsResolved.map((bullet, bi) => {
              const iconSlot = bi % 3;
              return (
                <div key={bi} className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[48px] rounded-[12px] bg-[var(--dark-blue,#022169)] content-stretch flex items-center justify-center">
                    {iconSlot === 0 ?
                      <div className="relative size-[20px] shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={methodologyIcons[0]} />
                      </div>
                    : iconSlot === 1 ?
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 flex h-[26px] w-[27.625px] flex-col items-start">
                        <div className="relative h-[26px] w-[26.813px] shrink-0 overflow-clip">
                          <div className="absolute inset-[14.06%_12.12%_13.48%_15.15%]">
                            <img alt="" className="absolute inset-0 block size-full max-w-none" src={methodologyIcons[1]} />
                          </div>
                        </div>
                      </div>
                    : <div className="relative h-[12px] w-[20px] shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={methodologyIcons[2]} />
                      </div>}
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic text-[#000f3d] text-[16px] tracking-[1.2px]">
                      <p className="leading-[16px]">{bullet.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
        {useCmsHomeBlocks ?
          <>
            <PageBlocks layout={homeTail ?? null} />
            <PageBlocks layout={homeContinuation ?? null} />
          </>
        : (
        <>
        <div className="w-full min-w-0 bg-[#f3f3f3]">
        <div className="content-stretch flex flex-col items-start py-[96px] relative shrink-0 w-full max-w-content mx-auto min-w-0" data-node-id="1:1160" data-name="Section - Jak działamy (Process)">
          <div className="content-stretch flex flex-col gap-[96px] items-start max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-[61px] relative shrink-0 w-full" data-node-id="1:1161" data-name="Container">
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-node-id="1:1162" data-name="Heading 2">
              <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-[color:var(--font,#000f3d)] text-center w-full" data-node-id="1:1163">
                <p className="leading-[60px]">Jak to robię w praktyce</p>
              </div>
            </div>
            <div className="grid w-full min-h-0 grid-cols-1 grid-rows-[auto] gap-1 h-auto sm:grid-cols-2 lg:grid-cols-4 relative shrink-0" data-node-id="1:1164" data-name="Container">
              <div className="bg-[#f9f9f9] border-[#022169] border-solid border-t-8 col-1 content-stretch flex h-auto min-h-[240px] flex-col gap-[16px] items-start justify-self-stretch pb-[68px] pt-[48px] px-[25px] relative row-1 self-start shrink-0 sm:row-auto lg:h-[276px]" data-node-id="1:1165" data-name="Background+HorizontalBorder">
                <div className="relative shrink-0 w-full" data-node-id="1:1166" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[24px] w-full" data-node-id="1:1167">
                      <p className="leading-[40px]">Shape Up</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1168" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1169">
                      <p className="leading-[25px] mb-0">Metodologia Basecamp do pracy w</p>
                      <p className="leading-[25px]">{`cyklach z ustalonym "appetite".`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9f9f9] border-[#022169] border-solid border-t-8 col-3 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pb-[41px] pt-[48px] px-[25px] relative row-1 self-start shrink-0" data-node-id="1:1170" data-name="Background+HorizontalBorder">
                <div className="relative shrink-0 w-full" data-node-id="1:1171" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[24px] w-full" data-node-id="1:1172">
                      <p className="leading-[40px]">Continuous Discovery</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1173" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1174">
                      <p className="leading-[25px] mb-0">Nawyki Teresy Torres pozwalające</p>
                      <p className="leading-[25px] mb-0">budować to, czego faktycznie chcą</p>
                      <p className="leading-[25px]">klienci.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9f9f9] border-[#022169] border-solid border-t-8 col-4 content-stretch flex h-auto min-h-[240px] flex-col gap-[16px] items-start justify-self-stretch pb-[68px] pt-[48px] px-[25px] relative row-1 self-start shrink-0 lg:h-[276px]" data-node-id="1:1175" data-name="Background+HorizontalBorder">
                <div className="relative shrink-0 w-full" data-node-id="1:1176" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#022169] text-[24px] w-full" data-node-id="1:1177">
                      <p className="leading-[40px]">ADKAR Change</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1178" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1179">
                      <p className="leading-[25px] mb-0">Model zarządzania zmianą ludzką</p>
                      <p className="leading-[25px]">podczas transformacji procesowej.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-2 content-stretch flex h-auto min-h-[240px] flex-col gap-[16px] items-start justify-self-stretch pb-[37px] pt-[48px] px-[25px] relative row-1 self-start shrink-0 lg:h-[276px]" data-node-id="1:1180" data-name="Background+HorizontalBorder">
                <div className="relative shrink-0 w-full" data-node-id="1:1181" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--dark-blue,#022169)] w-full" data-node-id="1:1182">
                      <p className="leading-[40px] mb-0">Product Operating</p>
                      <p className="leading-[40px]">Model</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1183" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1184">
                      <p className="leading-[25px] mb-0">{`Zasady Marty'ego Cagana`}</p>
                      <p className="leading-[25px] mb-0">definiujące pracę nowoczesnych</p>
                      <p className="leading-[25px]">organizacji.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="flow-root w-full min-w-0 shrink-0 self-stretch bg-white">
        <div className="content-stretch relative mx-auto flex w-full min-w-0 max-w-content shrink-0 flex-col items-start self-stretch overflow-visible bg-white py-[96px]" data-node-id="1:1185" data-name="Section - Doświadczenie (Modern Architectural Redesign)">
          <div className="content-stretch flex w-full min-w-0 shrink-0 flex-col gap-[80px] items-start bg-white max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-[61px] relative" data-node-id="1:1187" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1188" data-name="Container">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:1189" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1190" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full" data-node-id="1:1191">
                    <p className="leading-[16px]">Ekspertyza branżowa</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1192" data-name="Heading 2">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full" data-node-id="1:1193">
                    <p className="leading-[60px]">Doświadczenie</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pb-[16.625px] pt-[7.375px] relative shrink-0 w-full" data-node-id="1:1194" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full" data-node-id="1:1195">
                    <p className="leading-[27.5px] mb-0">Dojrzałe, skalujące się platformy szukające sposobu aby drażyć dwa razy</p>
                    <p className="leading-[27.5px]">szybciej z tym samym zespołem.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid w-full min-w-0 shrink-0 grid-cols-1 gap-x-[48px] gap-y-[48px] bg-white lg:grid-cols-2 lg:grid-rows-[minmax(0,auto)]" data-node-id="1:1196" data-name="Pillars Grid">
              <div className="flex min-h-0 min-w-0 w-full flex-col gap-[40px] items-start bg-white py-[16px] pl-4 pr-4 sm:pl-6 sm:pr-6 lg:min-w-0 lg:pl-[44px] lg:pr-[40px]" data-node-id="1:1197" data-name="FinTech Pillar">
                <div className="relative w-full min-w-0 shrink-0" data-node-id="1:1198" data-name="Heading 3">
                  <div className="flex min-w-0 items-center gap-[16px]">
                    <div className="relative size-[20px] shrink-0" data-node-id="1:1199" data-name="Container">
                      <img alt="" className="absolute inset-0 block max-w-none size-full" src={iconFintech} />
                    </div>
                    <div className="min-w-0 font-['Satoshi:Bold',sans-serif] text-[24px] not-italic leading-none text-[color:var(--dark-blue,#022169)]" data-node-id="1:1201">
                      <p className="leading-[40px]">Fintech</p>
                    </div>
                  </div>
                </div>
                <div className="relative w-full min-w-0 shrink-0" data-node-id="1:1202" data-name="Container">
                  <div className="flex w-full min-w-0 flex-col gap-y-[24px]">
                    <div className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]" data-node-id="1:1203" data-name="HorizontalBorder">
                      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                        <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]" data-node-id="1:1206">
                          <p className="break-words leading-[25px]">Useme</p>
                        </div>
                        <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]" data-node-id="1:1208">
                          <p className="break-words leading-[25px]">SCALE-UP</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]" data-node-id="1:1209" data-name="HorizontalBorder">
                      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                        <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]" data-node-id="1:1212">
                          <p className="break-words leading-[25px]">Wealthon</p>
                        </div>
                        <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]" data-node-id="1:1214">
                          <p className="break-words leading-[25px]">FINANCIAL OPS</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]" data-node-id="1:1215" data-name="HorizontalBorder">
                      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                        <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]" data-node-id="1:1218">
                          <p className="break-words leading-[25px]">Allegro pay</p>
                        </div>
                        <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]" data-node-id="1:1220">
                          <p className="break-words leading-[25px]">EMBEDDED FINANCE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 w-full flex-col gap-[40px] items-start bg-white py-[16px] pl-4 pr-4 sm:pl-6 sm:pr-6 lg:min-w-0 lg:pl-[44px] lg:pr-[40px]" data-node-id="1:1221" data-name="eCommerce Pillar">
                <div className="relative w-full min-w-0 shrink-0" data-node-id="1:1222" data-name="Heading 3">
                  <div className="flex min-w-0 items-center gap-[16px]">
                    <div className="relative h-[20px] w-[16px] shrink-0" data-node-id="1:1223" data-name="Container">
                      <img alt="" className="absolute inset-0 block max-w-none size-full" src={iconEcommerce} />
                    </div>
                    <div className="min-w-0 font-['Satoshi:Bold',sans-serif] text-[24px] not-italic leading-none text-[color:var(--dark-blue,#022169)]" data-node-id="1:1225">
                      <p className="leading-[40px]">Ecommerce</p>
                    </div>
                  </div>
                </div>
                <div className="relative w-full min-w-0 shrink-0" data-node-id="1:1226" data-name="Container">
                  <div className="flex w-full min-w-0 flex-col gap-y-[24px]">
                    <div className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]" data-node-id="1:1227" data-name="HorizontalBorder">
                      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                        <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]" data-node-id="1:1230">
                          <p className="break-words leading-[25px]">Allegro</p>
                        </div>
                        <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]" data-node-id="1:1232">
                          <p className="break-words leading-[25px]">MARKETPLACE</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]" data-node-id="1:1233" data-name="HorizontalBorder">
                      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                        <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]" data-node-id="1:1236">
                          <p className="break-words leading-[25px]">Limango</p>
                        </div>
                        <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]" data-node-id="1:1238">
                          <p className="break-words leading-[25px]">FLASH SALES</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full min-w-0 border-b border-solid border-[rgba(2,33,105,0.1)] pb-[25px]" data-node-id="1:1239" data-name="HorizontalBorder">
                      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
                        <div className="min-w-0 shrink font-['Satoshi:Bold',sans-serif] text-[20px] not-italic leading-none text-[color:var(--font,#000f3d)]" data-node-id="1:1242">
                          <p className="break-words leading-[25px]">Shoplo</p>
                        </div>
                        <div className="max-w-full shrink-0 font-medium uppercase leading-none tracking-wide text-[#94a3b8] text-[14px] sm:max-w-[min(280px,48%)] sm:text-right sm:text-[16px]" data-node-id="1:1244">
                          <p className="break-words leading-[25px]">SAAS PLATFORM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative flex w-full min-w-0 shrink-0 flex-col items-stretch overflow-hidden rounded-tr-[clamp(48px,12vw,100px)] bg-[var(--blue,#032796)] px-5 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-[80px]"
              data-node-id="1:1245"
              data-name="Case Highlight Box"
            >
              <div
                className="pointer-events-none absolute right-[-80px] top-[-64px] size-[256px] rounded-[12px] bg-[rgba(0,91,179,0.1)] blur-[32px]"
                data-node-id="1:1246"
                data-name="Overlay+Blur"
              />
              <div
                className="relative flex w-full min-w-0 flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-24"
                data-node-id="1:1247"
                data-name="Container"
              >
                <div
                  className="flex min-w-0 w-full flex-1 flex-col items-start gap-8 lg:min-w-0 lg:pr-4"
                  data-node-id="1:1248"
                  data-name="Container"
                >
                  <div
                    className="inline-flex items-start border border-solid border-[#7dfab6] px-[17px] py-[5px]"
                    data-node-id="1:1249"
                    data-name="Border"
                  >
                    <div
                      className="flex flex-col justify-center font-['Satoshi:Bold',sans-serif] text-[12px] not-italic leading-[16px] tracking-[1.2px] text-[#7dfab6]"
                      data-node-id="1:1250"
                    >
                      <p>Case Highlight</p>
                    </div>
                  </div>
                  <div className="w-full min-w-0 max-w-full" data-node-id="1:1251" data-name="Heading 4">
                    <p
                      lang="pl"
                      className="m-0 max-w-full font-['Satoshi:Bold',sans-serif] text-[clamp(1.25rem,calc(0.72rem+2.65vw),2.25rem)] font-normal leading-[1.22] text-white text-balance break-words hyphens-auto sm:leading-[1.2] lg:leading-[1.15]"
                      data-node-id="1:1252"
                    >
                      {`Case: Useme - od 20% do 80% on time delivery w ciągu 6 miesięcy. ownership culture zmienia wszystko.`}
                    </p>
                  </div>
                  <Link
                    to="/useme"
                    className="flex w-full max-w-full shrink-0 flex-wrap items-center justify-center gap-3 rounded-[18px] bg-white px-6 py-4 no-underline sm:inline-flex sm:w-auto sm:justify-start sm:gap-4 sm:px-8 sm:py-5"
                    data-node-id="1:1253"
                    data-name="Link"
                  >
                    <span className="min-w-0 text-center font-['Satoshi:Bold',sans-serif] text-[15px] tracking-[1.2px] text-[#022169] sm:text-left sm:text-[16px]">
                      Przeczytaj Case Study
                    </span>
                    <span
                      aria-hidden
                      className="inline-block size-3 shrink-0 bg-current"
                      style={{ WebkitMask: `url(${iconArrow}) center / contain no-repeat`, mask: `url(${iconArrow}) center / contain no-repeat` }}
                    />
                  </Link>
                </div>
                <div
                  className="flex w-full min-w-0 flex-col items-center gap-8 border-t border-solid border-[rgba(255,255,255,0.12)] pt-8 text-center lg:max-w-md lg:flex-none lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16"
                  data-node-id="1:1257"
                  data-name="VerticalBorder"
                >
                  <div className="w-full min-w-0 max-w-md opacity-90" data-node-id="1:1258" data-name="Container">
                    <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center">
                      <p
                        className="m-0 font-['Satoshi:Bold',sans-serif] text-[12px] tracking-[1.2px] text-white"
                        data-node-id="1:1260"
                      >
                        Transformacja
                      </p>
                      <p
                        className="m-0 max-w-full break-words font-sans text-[16px] leading-[25px] text-white [overflow-wrap:anywhere]"
                        data-node-id="1:1262"
                      >
                        Shape Up Implementation
                      </p>
                    </div>
                  </div>
                  <div className="w-full min-w-0 max-w-md opacity-90" data-node-id="1:1263" data-name="Container">
                    <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center">
                      <p
                        className="m-0 font-['Satoshi:Bold',sans-serif] text-[12px] tracking-[1.2px] text-white"
                        data-node-id="1:1265"
                      >
                        Wynik
                      </p>
                      <p className="m-0 max-w-full break-words font-sans text-[16px] leading-[25px] text-white" data-node-id="1:1267">
                        +300% Predictability
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="w-full min-w-0 bg-[#f3f3f3]">
        <div className="content-stretch flex flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full max-w-content mx-auto min-w-0" data-node-id="1:1268" data-name="Section - Jak to robię (Methods)">
          <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full" data-node-id="1:1269" data-name="Container">
            <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:1270" data-name="Heading 2">
              <div className="w-full max-w-full px-2 text-center font-['Satoshi:Bold',sans-serif] text-[clamp(1.75rem,5vw,3rem)] leading-tight text-[#000f3d]" data-node-id="1:1271">
                <p className="leading-tight">{`Jak działamy `}</p>
              </div>
            </div>
            <div className="grid w-full min-h-0 grid-cols-1 grid-rows-[auto] gap-1 h-auto sm:grid-cols-2 lg:grid-cols-4 relative shrink-0" data-node-id="1:1272" data-name="Container">
              <div className="bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-1 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[68px] pt-[48px] px-5 sm:px-8 lg:px-10 relative row-1 self-start shrink-0" data-node-id="1:1273" data-name="Background+HorizontalBorder">
                <div className="bg-[var(--dark-blue,#022169)] relative shrink-0 size-[48px]" data-node-id="1:1274" data-name="Background">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:1275">
                      <p className="leading-[25px]">1</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1276" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17.1px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--font,#000f3d)] w-full" data-node-id="1:1277">
                      <p className="leading-[40px]">Diagnoza</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1278" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.625px] relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1279">
                      <p className="leading-[25px] mb-0">Lorem ipsum dolor sit amet,</p>
                      <p className="leading-[25px] mb-0">consectetur adipiscing elit.</p>
                      <p className="leading-[25px] mb-0">Audax negotium, dicerem</p>
                      <p className="leading-[25px] mb-0">impudens, nisi hoc institutum</p>
                      <p className="leading-[25px] mb-0">postea translatum ad</p>
                      <p className="leading-[25px]">philosophos nostros esset.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-2 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[40px] pt-[48px] px-5 sm:px-8 lg:px-10 relative row-1 self-start shrink-0" data-node-id="1:1280" data-name="Background+HorizontalBorder">
                <div className="bg-[var(--dark-blue,#022169)] relative shrink-0 size-[48px]" data-node-id="1:1281" data-name="Background">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:1282">
                      <p className="leading-[25px]">2</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1283" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17.1px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--font,#000f3d)] w-full" data-node-id="1:1284">
                      <p className="leading-[40px]">{`Shaping & proposal`}</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1285" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.625px] relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1286">
                      <p className="leading-[25px] mb-0">Lorem ipsum dolor sit amet,</p>
                      <p className="leading-[25px] mb-0">consectetur adipiscing elit.</p>
                      <p className="leading-[25px] mb-0">Audax negotium, dicerem</p>
                      <p className="leading-[25px] mb-0">impudens, nisi hoc institutum</p>
                      <p className="leading-[25px] mb-0">postea translatum ad</p>
                      <p className="leading-[25px]">philosophos nostros esset.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-3 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[40px] pt-[48px] px-5 sm:px-8 lg:px-10 relative row-1 self-start shrink-0" data-node-id="1:1287" data-name="Background+HorizontalBorder">
                <div className="bg-[var(--dark-blue,#022169)] relative shrink-0 size-[48px]" data-node-id="1:1288" data-name="Background">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:1289">
                      <p className="leading-[25px]">3</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1290" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17.1px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--font,#000f3d)] w-full" data-node-id="1:1291">
                      <p className="leading-[40px]">{`Wdrożenie & coaching `}</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1292" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.625px] relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1293">
                      <p className="leading-[25px] mb-0">Lorem ipsum dolor sit amet,</p>
                      <p className="leading-[25px] mb-0">consectetur adipiscing elit.</p>
                      <p className="leading-[25px] mb-0">Audax negotium, dicerem</p>
                      <p className="leading-[25px] mb-0">impudens, nisi hoc institutum</p>
                      <p className="leading-[25px] mb-0">postea translatum ad</p>
                      <p className="leading-[25px]">philosophos nostros esset.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f9f9f9] border-[var(--dark-blue,#022169)] border-solid border-t-8 col-4 content-stretch flex flex-col gap-[14.9px] items-start justify-self-stretch pb-[68px] pt-[48px] px-5 sm:px-8 lg:px-10 relative row-1 self-start shrink-0" data-node-id="1:1294" data-name="Background+HorizontalBorder">
                <div className="bg-[var(--dark-blue,#022169)] relative shrink-0 size-[48px]" data-node-id="1:1295" data-name="Background">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:1296">
                      <p className="leading-[25px]">4</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1297" data-name="Heading 4">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17.1px] relative size-full">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[color:var(--font,#000f3d)] w-full" data-node-id="1:1298">
                      <p className="leading-[40px]">Ewaluacja</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1299" data-name="Container">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.625px] relative size-full">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[16px] w-full" data-node-id="1:1300">
                      <p className="leading-[25px] mb-0">Lorem ipsum dolor sit amet,</p>
                      <p className="leading-[25px] mb-0">consectetur adipiscing elit.</p>
                      <p className="leading-[25px] mb-0">Audax negotium, dicerem</p>
                      <p className="leading-[25px] mb-0">impudens, nisi hoc institutum</p>
                      <p className="leading-[25px] mb-0">postea translatum ad</p>
                      <p className="leading-[25px]">philosophos nostros esset.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="w-full min-w-0 bg-white">
        <div className="content-stretch flex flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full max-w-content mx-auto min-w-0" data-node-id="1:1301" data-name="Section - Kim jestem (About)">
          <div className="relative grid w-full min-h-0 max-w-[1536px] grid-cols-1 grid-rows-[auto] gap-10 lg:grid-cols-[repeat(2,minmax(0,1fr))] lg:gap-x-20 lg:gap-y-16 lg:grid-rows-[minmax(0,auto)]" data-node-id="1:1302" data-name="Container">
            <div className="col-1 content-stretch flex flex-col gap-[23.3px] items-start justify-self-stretch relative row-1 self-center shrink-0" data-node-id="1:1303" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1304" data-name="Container">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full" data-node-id="1:1305">
                  <p className="leading-[16px]">Architekt projektu</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1306" data-name="Heading 2">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full" data-node-id="1:1307">
                  <p className="leading-[60px]">Dawid Jurand Szkiełka</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[23.375px] items-start pt-[16.065px] relative shrink-0 w-full" data-node-id="1:1308" data-name="Container">
                <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="1:1309" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full" data-node-id="1:1310">
                    <p className="leading-[27.5px] mb-0">Wierzę, że sukces produktu nie zależy od genialnego pomysłu, ale od higieny procesów, które pozwalają go odkryć i dowieźć. Od ponad 10 lat kształtuję produkty w środowiskach</p>
                    <p className="leading-[27.5px]">e-commerce, fintech i SaaS.</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="1:1311" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full" data-node-id="1:1312">
                    <p className="leading-[27.5px]">Moje podejście łączy twardą analitykę z psychologią zarządzania zmianą. Nie jestem teoretykiem – wdrażam rozwiązania, które sam przetestowałem na polu walki w największych polskich spółkach technologicznych.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[32px] items-start pt-[24.7px] relative shrink-0 w-full" data-node-id="1:1313" data-name="Container">
                <div className="content-stretch flex flex-col gap-[4px] items-center relative self-stretch shrink-0" data-node-id="1:1314" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1315" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[color:var(--dark-blue,#022169)] whitespace-nowrap" data-node-id="1:1316">
                      <p className="leading-[40px]">10+</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1317" data-name="Container">
                    <div className="flex max-w-[14rem] flex-col justify-center leading-snug not-italic relative shrink-0 text-[#757682] text-[16px] break-words sm:max-w-none" data-node-id="1:1318">
                      <p className="leading-[25px]">Lat doświadczenia</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex min-w-0 flex-1 flex-col gap-[4px] items-start relative self-stretch sm:flex-none sm:w-auto" data-node-id="1:1319" data-name="Container">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1320" data-name="Container">
                    <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-[color:var(--dark-blue,#022169)] whitespace-nowrap" data-node-id="1:1321">
                      <p className="leading-[40px]">50+</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:1322" data-name="Container">
                    <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#757682] text-[16px] text-center w-full" data-node-id="1:1323">
                      <p className="leading-[25px]">Zespołów produktowych</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`relative aspect-square max-h-[90vw] min-h-[240px] w-full max-w-full shrink-0 col-2 row-1 flex flex-col items-start justify-center justify-self-stretch self-start overflow-hidden rounded-tr-[clamp(40px,10vw,80px)] lg:max-h-none lg:min-h-0 lg:self-center ${founderPortraitUrl ? "bg-transparent" : "bg-[#e8e8e8]"}`}
              data-node-id="1:1324"
              data-name="Background"
            >
              {founderPortraitUrl ?
                <img
                  alt={founderPortraitAlt}
                  src={founderPortraitUrl}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              : <div className="absolute inset-0 bg-[#e8e8e8]" data-node-id="1:1325" aria-hidden />}
            </div>
          </div>
        </div>
        </div>
        <div className="w-full min-w-0 bg-[#f3f3f3]">
        <div className="content-stretch flex flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[96px] relative shrink-0 w-full max-w-content mx-auto min-w-0" data-node-id="1:1327" data-name="Section - Zaufanie Liderów (Three Testimonials)">
          <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1536px] relative shrink-0 w-full" data-node-id="1:1328" data-name="Container">
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:1329" data-name="Container">
              <div className="h-[16px] shrink-0 w-full" data-node-id="1:1330" data-name="Container" />
              <div className="content-stretch flex flex-col items-center pb-[8px] relative shrink-0 w-full px-2" data-node-id="1:1331" data-name="Heading 2">
                <div className="w-full max-w-full text-center font-['Satoshi:Bold',sans-serif] text-[clamp(2rem,6vw,3rem)] leading-tight text-[#022169]" data-node-id="1:1332">
                  <p className="leading-tight">Opinie</p>
                </div>
              </div>
            </div>
            <div
              className="relative grid w-full min-w-0 grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-3 lg:gap-x-12"
              data-node-id="1:1333"
              data-name="Container"
            >
              <div className="flex min-h-0 min-w-0 flex-col gap-8 border-[rgba(2,33,105,0.1)] border-l border-solid pl-6 sm:pl-8 lg:min-h-[unset]" data-node-id="1:1334" data-name="Testimonial 1">
                <div className="relative min-w-0 w-full shrink-0" data-node-id="1:1335" data-name="Blockquote">
                  <div className="flex flex-col items-start pb-0">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1336" data-name="Container">
                      <div className="flex min-w-0 flex-col justify-center leading-normal not-italic relative shrink-0 text-[22px] text-[rgba(2,33,105,0.8)] w-full [overflow-wrap:anywhere]" data-node-id="1:1337">
                        <p className="leading-[27.5px] mb-0">{`"Polecam współpracę z Dawidem,`}</p>
                        <p className="leading-[27.5px] mb-0">którego głębokie zrozumienie</p>
                        <p className="leading-[27.5px] mb-0">potrzeb klientów (JTBD) i</p>
                        <p className="leading-[27.5px] mb-0">{`Product<>Market Fit było kluczowe.`}</p>
                        <p className="leading-[27.5px] mb-0">Dzięki Shape Up wdrażaliśmy</p>
                        <p className="leading-[27.5px] mb-0">innowacji w terminie - problem, z</p>
                        <p className="leading-[27.5px] mb-0">którym boryka się większość firm.</p>
                        <p className="leading-[27.5px] mb-0">To niezwykle cenny partner w</p>
                        <p className="leading-[27.5px] mb-0">skracaniu czasu od pomysłu do</p>
                        <p className="leading-[27.5px]">{`wdrożenia."`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-node-id="1:1338" data-name="Footer">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:1339" data-name="Container">
                      <div className="bg-[rgba(2,33,105,0.05)] border border-[rgba(2,33,105,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[12px] shrink-0 size-[40px]" data-node-id="1:1340" data-name="Overlay+Border">
                        <div className="h-[41px] relative shrink-0 w-[40px]" data-node-id="1:1341" data-name="image 8">
                          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
                        </div>
                      </div>
                      <div className="content-stretch flex min-w-0 flex-1 flex-col gap-[2px] items-start relative shrink-0" data-node-id="1:1342" data-name="Container">
                        <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full" data-node-id="1:1343" data-name="Container">
                          <div className="min-w-0 flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] break-words" data-node-id="1:1344">
                            <p className="leading-[16px]">Filip</p>
                          </div>
                          <div className="relative shrink-0 size-[13px]" data-node-id="1:1345" data-name="image 11">
                            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={iconLinkedIn} />
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full min-w-0" data-node-id="1:1346" data-name="Container">
                          <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[9px] text-[color:var(--light-blue,#0083fe)] tracking-[1.8px] uppercase break-words" data-node-id="1:1347">
                            <p className="leading-[13.5px]">Product Growth @DocPlanner</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col gap-8 border-[rgba(2,33,105,0.1)] border-l border-solid pl-6 sm:pl-8" data-node-id="1:1348" data-name="Testimonial 2">
                <div className="relative min-w-0 w-full shrink-0" data-node-id="1:1349" data-name="Blockquote">
                  <div className="flex flex-col items-start pb-0">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full min-w-0" data-node-id="1:1350" data-name="Container">
                      <div className="flex min-w-0 flex-col justify-center leading-normal not-italic relative shrink-0 text-[22px] text-[rgba(2,33,105,0.8)] w-full [overflow-wrap:anywhere]" data-node-id="1:1351">
                        <p className="leading-[27.5px] mb-0">{`"Współpracowałam z Dawidem`}</p>
                        <p className="leading-[27.5px] mb-0">przez 2 lata - to ekspert, który</p>
                        <p className="leading-[27.5px] mb-0">doskonale lokalizuje prawdziwe</p>
                        <p className="leading-[27.5px] mb-0">potrzeby klientów i przekłada je na</p>
                        <p className="leading-[27.5px] mb-0">skuteczne rozwiązania produktowe.</p>
                        <p className="leading-[27.5px] mb-0">Dzięki Shape Up projekty wdrażane</p>
                        <p className="leading-[27.5px] mb-0">są na czas. Znacząco skrócił nam</p>
                        <p className="leading-[27.5px] mb-0">czas realizacji nowych</p>
                        <p className="leading-[27.5px] mb-0">funkcjonalności, co przełożyło się na</p>
                        <p className="leading-[27.5px] mb-0">wzrost firmy. Dzięki jego podejściu</p>
                        <p className="leading-[27.5px] mb-0">udało się nam unikać typowych</p>
                        <p className="leading-[27.5px]">{`opóźnień..."`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full min-w-0" data-node-id="1:1352" data-name="Footer">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full min-w-0" data-node-id="1:1353" data-name="Container">
                      <div className="bg-[rgba(2,33,105,0.05)] border border-[rgba(2,33,105,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[12px] shrink-0 size-[40px]" data-node-id="1:1354" data-name="Overlay+Border">
                        <div className="h-[41px] relative shrink-0 w-[40px]" data-node-id="1:1355" data-name="image 9">
                          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
                        </div>
                      </div>
                      <div className="content-stretch flex min-w-0 flex-1 flex-col gap-[2px] items-start relative shrink-0" data-node-id="1:1356" data-name="Container">
                        <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full min-w-0" data-node-id="1:1357" data-name="Container">
                          <div className="min-w-0 flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] break-words" data-node-id="1:1358">
                            <p className="leading-[16px]">Agnieszka</p>
                          </div>
                          <div className="relative shrink-0 size-[13px]" data-node-id="1:1359" data-name="image 11">
                            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={iconLinkedIn} />
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full min-w-0" data-node-id="1:1360" data-name="Container">
                          <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[9px] text-[color:var(--light-blue,#0083fe)] tracking-[1.8px] uppercase break-words" data-node-id="1:1361">
                            <p className="leading-[13.5px]">Head of Growth @Useme</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col gap-8 border-[rgba(2,33,105,0.1)] border-l border-solid pl-6 sm:pl-8 md:col-span-2 lg:col-span-1" data-node-id="1:1362" data-name="Testimonial 3">
                <div className="relative min-w-0 w-full shrink-0" data-node-id="1:1363" data-name="Blockquote">
                  <div className="flex flex-col items-start pb-0">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full min-w-0" data-node-id="1:1364" data-name="Container">
                      <div className="flex min-w-0 flex-col justify-center leading-normal not-italic relative shrink-0 text-[22px] text-[rgba(2,33,105,0.8)] w-full [overflow-wrap:anywhere]" data-node-id="1:1365">
                        <p className="leading-[27.5px] mb-0">{`"Współpraca z Dawidem znacząco`}</p>
                        <p className="leading-[27.5px] mb-0">przyczyniła się do rozwoju kultury</p>
                        <p className="leading-[27.5px] mb-0">produktowej w organizacji. Dawid</p>
                        <p className="leading-[27.5px] mb-0">skutecznie wdrożył Shape Up, w tym</p>
                        <p className="leading-[27.5px] mb-0">m.in. sześciotygodniowe cykle pracy</p>
                        <p className="leading-[27.5px] mb-0">i autonomię zespołów. Dzięki temu</p>
                        <p className="leading-[27.5px] mb-0">udało się nam uporządkować</p>
                        <p className="leading-[27.5px] mb-0">sposób pracy, ograniczyć liczbę</p>
                        <p className="leading-[27.5px] mb-0">zbędnych ceremonii i regularnie</p>
                        <p className="leading-[27.5px] mb-0">dostarczać wartość w określonym</p>
                        <p className="leading-[27.5px]">{`czasie."`}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full min-w-0" data-node-id="1:1366" data-name="Footer">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full min-w-0" data-node-id="1:1367" data-name="Container">
                      <div className="bg-[rgba(2,33,105,0.05)] border border-[rgba(2,33,105,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[12px] shrink-0 size-[40px]" data-node-id="1:1368" data-name="Overlay+Border">
                        <div className="h-[41px] relative shrink-0 w-[40px]" data-node-id="1:1369" data-name="image 10">
                          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
                        </div>
                      </div>
                      <div className="content-stretch flex min-w-0 flex-1 flex-col gap-[2px] items-start relative shrink-0" data-node-id="1:1370" data-name="Container">
                        <div className="content-stretch flex gap-[7px] items-center relative shrink-0 w-full min-w-0" data-node-id="1:1371" data-name="Container">
                          <div className="min-w-0 flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#022169] text-[16px] tracking-[1.2px] break-words" data-node-id="1:1372">
                            <p className="leading-[16px]">Marta</p>
                          </div>
                          <div className="relative shrink-0 size-[13px]" data-node-id="1:1373" data-name="image 11">
                            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={iconLinkedIn} />
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full min-w-0" data-node-id="1:1374" data-name="Container">
                          <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[9px] text-[color:var(--light-blue,#0083fe)] tracking-[1.8px] uppercase break-words" data-node-id="1:1375">
                            <p className="leading-[13.5px]">COO @Useme</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <HomeKnowledgeSection
          eyebrow="Artykuły"
          heading="Baza wiedzy"
          subtitle="Eseje i artykuły"
          cards={homeKnowledgeCards}
        />
        </>
        )}
        <div className="w-full min-w-0 bg-white">
        <div
          id="kontakt"
          className="content-stretch flex scroll-mt-[110px] flex-col items-start px-4 sm:px-6 md:px-10 lg:px-[61px] py-[60px] relative shrink-0 w-full max-w-content mx-auto min-w-0"
          data-node-id="1:1443"
          data-name="Section - Kim jestem (About)"
        >
          <div className="grid w-full min-h-0 max-w-[1536px] grid-cols-1 grid-rows-[auto] gap-10 lg:grid-cols-[repeat(2,minmax(0,1fr))] lg:gap-x-20 lg:gap-y-20 lg:grid-rows-[minmax(0,auto)] relative shrink-0" data-node-id="1:1444" data-name="Container">
            <div className="col-1 content-stretch flex flex-col gap-[23.3px] items-start justify-self-stretch relative row-1 self-center shrink-0" data-node-id="1:1445" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1446" data-name="Container">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--light-blue,#0083fe)] tracking-[1.2px] w-full" data-node-id="1:1447">
                  <p className="leading-[16px]">{contactEyebrow}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:1448" data-name="Heading 2">
                <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000f3d] text-[48px] w-full" data-node-id="1:1449">
                  <p className="leading-[60px]">{contactHeading}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start pt-[16.065px] relative shrink-0 w-full" data-node-id="1:1450" data-name="Container">
                <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="1:1451" data-name="Container">
                  <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-[#444651] text-[22px] w-full" data-node-id="1:1452">
                    {contactIntroLines.map((line, i, arr) => (
                      <p key={i} className={`leading-[27.5px] ${i < arr.length - 1 ? "mb-0" : ""}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-node-id="1:1453" data-name="Container">
                <div className="bg-[#f3f3f3] content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-node-id="1:1454" data-name="Background">
                  <div className="h-[16px] relative shrink-0 w-[20px]" data-node-id="1:1455" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={brandIcons.kontakt} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:1457" data-name="Container">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#1b1b1b] text-[16px] tracking-[1.2px] break-all no-underline sm:break-normal"
                    data-node-id="1:1458"
                  >
                    <p className="leading-[16px]">{contactEmail}</p>
                  </a>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-node-id="1:1459" data-name="Container">
                <div className="bg-[#f3f3f3] content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-node-id="1:1460" data-name="Background">
                  <div className="h-[20px] relative shrink-0 w-[16px]" data-node-id="1:1461" data-name="Container">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={brandIcons.location} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:1463" data-name="Container">
                  <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-snug not-italic relative shrink-0 text-[#1b1b1b] text-[16px] tracking-[1.2px] break-words" data-node-id="1:1464">
                    <p className="leading-[16px]">{contactLocation}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-2 row-1 flex w-full min-w-0 max-w-[539px] flex-col self-start justify-self-stretch sm:pt-[10px] lg:pt-[74.5px] lg:justify-self-end"
              data-node-id="1:1465"
            >
              <div className="w-full" data-node-id="1:1466">
                <ContactKontaktForm data-node-id="1:1472" />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
