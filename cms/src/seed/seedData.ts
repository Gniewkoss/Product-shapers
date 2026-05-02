/** Mirrors current marketing site copy for first-time seeding. */

const LOREM_EXP =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const IMG_PILLAR_FT = "https://www.figma.com/api/mcp/asset/57eb5300-0d15-4873-be8b-b29b2c84c025";
const IMG_PILLAR_EC = "https://www.figma.com/api/mcp/asset/2a0ccd0c-8aa6-4ea5-991c-72af2fde4c6e";
const IMG_T_FILIP = "https://www.figma.com/api/mcp/asset/2717548e-54bd-4e3e-a05e-c1d097f5fa07";
const IMG_T_AGN = "https://www.figma.com/api/mcp/asset/2aa1306d-2d93-4df8-9887-62987f5b63e7";
const IMG_T_MARTA = "https://www.figma.com/api/mcp/asset/9c240abc-dbf1-4d29-bf1f-5a2785c16c8a";
const IMG_KNOW1 = "https://www.figma.com/api/mcp/asset/88685f3f-56ca-44e8-912f-8b7808a067b2";
const IMG_KNOW2 = "https://www.figma.com/api/mcp/asset/231a2f81-6ab2-41a0-b6dc-d26a1717c8e1";
const IMG_KNOW3 = "https://www.figma.com/api/mcp/asset/be5ca7b5-8a11-47bc-be13-4fc3cbc9c51b";

/** Homepage blocks: practice grid → contact intro lives in structured contact* fields */
export const seedHomeContinuationLayout = [
  {
    blockType: "methodTileGrid" as const,
    methodTileGrid: {
      sectionTitle: "Jak to robię w praktyce",
      tiles: [
        {
          title: "Shape Up",
          body: 'Metodologia Basecamp do pracy w\ncyklach z ustalonym "appetite".',
        },
        {
          title: "Continuous Discovery",
          body: "Nawyki Teresy Torres pozwalające\nbudować to, czego faktycznie chcą\nklienci.",
        },
        {
          title: "ADKAR Change",
          body: "Model zarządzania zmianą ludzką\npodczas transformacji procesowej.",
        },
        {
          title: "Product Operating Model",
          body: "Zasady Marty'ego Cagana\ndefiniujące pracę nowoczesnych\norganizacji.",
        },
      ],
    },
  },
  {
    blockType: "industryPillars" as const,
    industryPillars: {
      eyebrow: "Ekspertyza branżowa",
      heading: "Doświadczenie",
      intro: "Dojrzałe, skalujące się platformy szukające sposobu aby drażyć dwa razy\nszybciej z tym samym zespołem.",
      pillars: [
        {
          title: "Fintech",
          iconUrl: IMG_PILLAR_FT,
          clients: [
            { name: "Useme", segment: "SCALE-UP" },
            { name: "Wealthon", segment: "FINANCIAL OPS" },
            { name: "Allegro pay", segment: "EMBEDDED FINANCE" },
          ],
        },
        {
          title: "Ecommerce",
          iconUrl: IMG_PILLAR_EC,
          clients: [
            { name: "Allegro", segment: "MARKETPLACE" },
            { name: "Limango", segment: "FLASH SALES" },
            { name: "Shoplo", segment: "SAAS PLATFORM" },
          ],
        },
      ],
    },
  },
  {
    blockType: "caseHighlightCta" as const,
    caseHighlightCta: {
      badge: "Case Highlight",
      title:
        "Case: Useme - od 20% do 80% on  time delivery w ciągu 6 miesięcy. ownership culture zmienia wszystko.",
      ctaLabel: "Przeczytaj Case Study",
      ctaPath: "/useme",
      metrics: [
        { label: "Transformacja", value: "Shape Up Implementation" },
        { label: "Wynik", value: "+300% Predictability" },
      ],
    },
  },
  {
    blockType: "numberedIconSteps" as const,
    numberedIconSteps: {
      sectionTitle: "Jak działamy ",
      steps: [
        {
          number: "1",
          title: "Diagnoza",
          body: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nAudax negotium, dicerem\nimpudens, nisi hoc institutum\npostea translatum ad\nphilosophos nostros esset.",
        },
        {
          number: "2",
          title: "Shaping & proposal",
          body: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nAudax negotium, dicerem\nimpudens, nisi hoc institutum\npostea translatum ad\nphilosophos nostros esset.",
        },
        {
          number: "3",
          title: "Wdrożenie & coaching ",
          body: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nAudax negotium, dicerem\nimpudens, nisi hoc institutum\npostea translatum ad\nphilosophos nostros esset.",
        },
        {
          number: "4",
          title: "Ewaluacja",
          body: "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nAudax negotium, dicerem\nimpudens, nisi hoc institutum\npostea translatum ad\nphilosophos nostros esset.",
        },
      ],
    },
  },
  {
    blockType: "founderSpotlight" as const,
    founderSpotlight: {
      eyebrow: "Architekt projektu",
      name: "Dawid Jurand Szkiełka",
      bodyParagraphs:
        "Wierzę, że sukces produktu nie zależy od genialnego pomysłu, ale od higieny procesów, które pozwalają go odkryć i dowieźć. Od ponad 10 lat kształtuję produkty w środowiskach\ne-commerce, fintech i SaaS.\n\nMoje podejście łączy twardą analitykę z psychologią zarządzania zmianą. Nie jestem teoretykiem – wdrażam rozwiązania, które sam przetestowałem na polu walki w największych polskich spółkach technologicznych.",
      stats: [
        { value: "10+", label: "Lat doświadczenia" },
        { value: "50+", label: "Zespołów produktowych" },
      ],
      portraitUrl: "",
    },
  },
  {
    blockType: "testimonialsHome" as const,
    testimonialsHome: {
      sectionTitle: "Opinie",
      items: [
        {
          quote:
            '"Polecam współpracę z Dawidem, którego głębokie zrozumienie potrzeb klientów (JTBD) i Product<>Market Fit było kluczowe. Dzięki Shape Up wdrażaliśmy innowacji w terminie - problem, z którym boryka się większość firm. To niezwykle cenny partner w skracaniu czasu od pomysłu do wdrożenia."',
          authorName: "Filip",
          role: "Product Growth @DocPlanner",
          avatarUrl: IMG_T_FILIP,
        },
        {
          quote:
            '"Współpracowałam z Dawidem przez 2 lata - to ekspert, który doskonale lokalizuje prawdziwe potrzeby klientów i przekłada je na skuteczne rozwiązania produktowe. Dzięki Shape Up projekty wdrażane są na czas. Znacząco skrócił nam czas realizacji nowych funkcjonalności, co przełożyło się na wzrost firmy. Dzięki jego podejściu udało się nam unikać typowych opóźnień..."',
          authorName: "Agnieszka",
          role: "Head of Growth @Useme",
          avatarUrl: IMG_T_AGN,
        },
        {
          quote:
            '"Współpraca z Dawidem znacząco przyczyniła się do rozwoju kultury produktowej w organizacji. Dawid skutecznie wdrożył Shape Up, w tym m.in. sześciotygodniowe cykle pracy i autonomię zespołów. Dzięki temu udało się nam uporządkować sposób pracy, ograniczyć liczbę zbędnych ceremonii i regularnie dostarczać wartość w określonym czasie."',
          authorName: "Marta",
          role: "COO @Useme",
          avatarUrl: IMG_T_MARTA,
        },
      ],
    },
  },
  {
    blockType: "knowledgeTeasers" as const,
    knowledgeTeasers: {
      useHomepageFeaturedArticles: true,
      eyebrow: "Artykuły",
      heading: "Baza wiedzy",
      subtitle: "Eseje i artykuły",
      cards: [
        {
          categoryLabel: "Metodyka",
          title: "Shape Up a Scrum",
          excerpt:
            "Scrum miał być remedium na chaos, ale dla wielu stał się pułapką ceremonii. Dlaczego Shape Up wygrywa w scale-upach?",
          imageUrl: IMG_KNOW1,
          href: "/artykuly/shape-up-scrum",
          ctaLabel: "Dowiedz się więcej",
        },
        {
          categoryLabel: "Zespół",
          title: "Zarządzanie ryzykiem",
          excerpt:
            "W innowacji nie ma pewności. Betting model pozwala nam decydować na co postawić czas zespołu z zimną krwią.",
          imageUrl: IMG_KNOW2,
          href: "/artykuly",
          ctaLabel: "Dowiedz się więcej",
        },
        {
          categoryLabel: "Proces",
          title: "Efektywność & focus",
          excerpt:
            "Większość zespołów produktowych spędza więcej czasu na rozmawianiu o pracy niż na samej pracy. Czas to zmienić.",
          imageUrl: IMG_KNOW3,
          href: "/artykuly",
          ctaLabel: "Dowiedz się więcej",
        },
      ],
    },
  },
];

export const seedHomeExpertiseItems = [
  {
    number: "01",
    title: "Product Transformation",
    layout: "simple" as const,
    body: LOREM_EXP,
  },
  {
    number: "02",
    title: "Product Discovery",
    layout: "simple" as const,
    body: LOREM_EXP,
  },
  {
    number: "03",
    title: "Product Delivery",
    layout: "simple" as const,
    body: LOREM_EXP,
  },
  {
    number: "04",
    title: "Hiring Product People",
    layout: "bullets" as const,
    body: "Od chaotycznej organizacji do systematycznego myślenia produktowego.",
    bullets: [
      { line: "Transformacja z Feature Factory na Product Operating Model" },
      { line: "Wdrożenie Shape Up - od teorii do praktyki" },
      { line: "Budowa kultury ownershipu w zespołach" },
      { line: "Aligning biznesu, produktu i engineering-u" },
    ],
  },
];

export const seedNavigation = {
  links: [
    { label: "Home", path: "/" },
    { label: "Szkolenia", path: "/szkolenia" },
    { label: "Hiring", path: "/hiring" },
    { label: "Useme", path: "/useme" },
    { label: "Artykuły", path: "/artykuly" },
  ],
  ctaLabel: "Umów Konsultację",
  ctaPath: "/#konsultacja",
};

export const seedHomepage = {
  heroHeadlinePrefix: "Odzyskaj kontrolę nad",
  heroHeadlineAccent: "RoadMapą!",
  heroSubheadline:
    "Pomagam firmom wyjść z pułapki »wiecznego backlogu« i\nwdrożyć systemową przewidywalność poprzez architekturę\nprocesów produktowych.",
  heroCtaLabel: "Umów się na 30’ spotkanie",
  heroCtaPath: "/#konsultacja",
  servicesEyebrow: "Jak pomagam",
  servicesHeading: "Obszary ekspertyzy",
  servicesIntro:
    "Systemowe podejście do budowania\nproduktów wymaga precyzji na każdym etapie. Skupiam się na fundamentach, które decydują o sukcesie rynkowym.",
  services: [
    {
      title: "Shape Up",
      description:
        "Metodologia Basecamp do pracy w cyklach z ustalonym „appetite” — od shapingu po shipping bez backlogowej pułapki.",
    },
    {
      title: "Continuous Discovery",
      description:
        "Nawyki Teresy Torres pozwalające budować to, czego faktycznie chcą klienci — z dowodem, nie założeniami.",
    },
    {
      title: "Product Operating Model",
      description:
        "Zasady Marty’ego Cagana definiujące pracę nowoczesnych organizacji produktowych na miarę scale-upów.",
    },
  ],
  aboutHeading: "O mnie",
  aboutBody:
    "Wdrażam produktowe modele pracy tam, gdzie liczy się przewidywalność i efekt biznesowy — nie sprint velocity dla samego KPI.",

  expertiseEyebrow: "Jak pomagam",
  expertiseHeading: "Obszary ekspertyzy",
  expertiseIntro:
    "Systemowe podejście do budowania produktów wymaga precyzji na każdym etapie. Skupiam się na fundamentach, które decydują o sukcesie rynkowym.",

  communityHeadlineItalic: "know-how",
  communityHeadlineRest: "by community",
  communityLeadBold: "Tworzę Product Cafe & FinTech Brew.",
  communityBody:
    "Łączę najlepszych liderów produktowych z topowych firm technologicznych w Polsce. Buduję żywą społeczność, w której selekcjonuję najskuteczniejsze praktyki rynkowe, by wdrażać je bezpośrednio w Twoim biznesie.",
  communitySupportingBrands: [
    { name: "Autopay" },
    { name: "Allegro" },
    { name: "Box" },
    { name: "Beyond.pl" },
    { name: "ING HUBs Poland" },
    { name: "Google" },
    { name: "Snowflake" },
    { name: "StoneX" },
    { name: "PKO BP" },
  ],
  communityExpertNames: [
    { name: "Allegro Pay" },
    { name: "Authologic" },
    { name: "mElements" },
    { name: "InPost" },
    { name: "PayPo" },
    { name: "Paynow" },
    { name: "Text" },
    { name: "Zendesk" },
  ],
  communityBgUrls: [
    { url: "https://www.figma.com/api/mcp/asset/2717548e-54bd-4e3e-a05e-c1d097f5fa07" },
    { url: "https://www.figma.com/api/mcp/asset/2aa1306d-2d93-4df8-9887-62987f5b63e7" },
    { url: "https://www.figma.com/api/mcp/asset/9c240abc-dbf1-4d29-bf1f-5a2785c16c8a" },
  ],

  methodologyEyebrow: "Metodologia",
  methodologyHeading: "Podejście do wdrożeń",
  methodologyParagraphs:
    "Dopasowuję rozwiązania do realiów firmy - jej skali, budżetu, kultury organizacyjnej oraz wymogów regulacyjnych (compliance). Zmiany wdrażam stopniowo, w podejściu day-by-day.\n\nNie kończę na rekomendacjach — skupiam się na ich realnym wdrożeniu i dowożeniu efektów.",
  methodologyBullets: [
    { title: "Tailored solutions" },
    { title: "Step-by-step evolution" },
    { title: "Execution focus" },
  ],

  expertiseItems: seedHomeExpertiseItems,
  homeContinuationLayout: seedHomeContinuationLayout,

  contactEyebrow: "Konsultacja",
  contactHeading: "Umów się na rozmowę",
  contactIntro:
    "Wypełnij formularz, aby umówić bezpłatną konsultację\nwstępną. Porozmawiamy o Twoich wyzwaniach i\nsprawdzimy, czy możemy wspólnie wypracować lepszą\nstrukturę dla Twojego produktu.",
  contactEmail: "kontakt@productshapers.com",
  contactLocation: "Warszawa / Remote",
};

export const seedFooter = {
  companyName: "Product Shapers Consulting",
  tagline: "",
  email: "",
  linkedinUrl: "",
  legalText: "© 2025 PRODUCT SHAPERS. WSZYSTKIE PRAWA ZASTRZEŻONE.",
  columns: [
    {
      title: "Shape up",
      items: [
        { label: "Czym jest Shape Up?" },
        { label: "Dla kogo jest Shape Up?" },
        { label: "Efekty Shape Up?" },
        { label: "Shape Up w scale up" },
        { label: "Shape Up w dużej organizacji" },
      ],
    },
    {
      title: "Szkolenia",
      items: [
        { label: "Fundamenty Shape Up 🔵⚪️⚪️" },
        { label: "Praktyka Shape Up 🔵🔵⚪️" },
        { label: "Masterclass w Shape Up 🔵🔵🔵" },
      ],
    },
    {
      title: "Doradztwo",
      items: [
        { label: "Pilot Shape Up" },
        { label: "Transformacja produktowa" },
        { label: "Wdrażanie Product Led Growth" },
      ],
    },
    {
      title: "Baza Wiedzy",
      items: [{ label: "Case study" }, { label: "Ebook" }, { label: "You Tube" }, { label: "Podcast" }],
    },
  ],
  footerLinks: [{ label: "POLITYKA PRYWATNOŚCI", url: "#" }, { label: "REGULAMIN", url: "#" }],
};

export const seedSeo = {
  siteName: "Product Shapers Consulting",
  defaultMetaTitle: "Product Shapers Consulting",
  defaultMetaDescription: "Konsulting produktowy, Shape Up, szkolenia.",
};

export const shapeUpScrumSections = [
  {
    anchorId: "kontekst",
    number: "01",
    label: "Kontekst",
    title: "Problem Skalowania",
    contentFormat: "plain" as const,
    content: `W świecie consultingu produktowego najczęściej spotykamy dwa ekstrema: zespoły, które "biegają w kółko" w nieskończonych sprintach Scruma bez wizji mety, oraz organizacje próbujące wdrożyć metodologię Basecampa (Shape Up) bez gotowości na tak radykalną autonomię. Hybrydowy model dowożenia, który wypracowaliśmy w Product Shapers, to odpowiedź na ten dylemat.`,
  },
  {
    anchorId: "architektura",
    number: "02",
    label: "Architektura",
    title: "Struktura Hybrydy",
    contentFormat: "plain" as const,
    content: `## Pętla vs Projekt: Gdzie Scrum traci impet?

Scrum świetnie radzi sobie z utrzymaniem rytmu pracy, ale często gubi szeroki kontekst biznesowy. Kiedy backlog staje się listą życzeń, a nie planem bitwy, zespół traci poczucie sprawstwa. Shape Up wprowadza koncepcję "Appetite" zamiast estymacji – pytamy, ile czasu chcemy zainwestować, a nie ile coś potrwa.

### Filary Hybrydy Product Shapers:

(Treść w pliku Figma powtarza akapit demonstracyjny; pełna redakcja w źródle projektu.)`,
  },
  {
    anchorId: "wyniki",
    number: "03",
    label: "Wyniki",
    title: "Efektywność Zespołu",
    contentFormat: "html" as const,
    content: `<div style="margin-bottom:1.5rem;border:1px solid #e2e2e2;background:#f8fafc;padding:1.5rem 2rem;border-radius:2px"><h4 style="margin:0 0 0.5rem 0;font-family:Satoshi,ui-sans-serif,system-ui,sans-serif;font-size:20px;font-weight:700;color:#000f3d">Kluczowy Takeaway</h4><p style="margin:0;font-family:Erode,Georgia,serif;font-size:18px;line-height:1.55;color:#444651">Model hybrydowy redukuje wypalenie zespołu o 40% w pierwszym kwartale wdrożenia, jednocześnie zwiększając przewidywalność dostarczania kluczowych ficzerów o ponad połowę.</p></div>`,
  },
];

export const seedArticleSummaries = [
  {
    slug: "shape-up-scrum",
    title: "Shape Up a Scrum: Hybrydowy model dowożenia",
    summary:
      "Analiza połączenia elastyczności Scruma z dyscypliną Basecampowego Shape Up. Jak uniknąć niekończących się sprintów bez utraty zwinności?",
    category: "methodology" as const,
    readingTime: "12 min czytania",
    tone: "light" as const,
    categoryLabel: "Metodyka",
    categoryMeta: "12 minut czytania",
    excerpt:
      "Dlaczego tradycyjne podejście Agile często zawodzi przy skalowaniu i jak połączenie dyscypliny Shape Up z rytmem Scruma zmienia reguły gry w budowaniu produktów.",
    layout: [
      { blockType: "articleSection" as const, ...shapeUpScrumSections[0] },
      {
        blockType: "comparisonTable" as const,
        title: "Porównanie podejść",
        columns: [{ label: "Skala" }, { label: "Biurokracja" }],
        rows: [
          {
            name: "Scrum",
            cells: [
              { value: "Typowo 5–9 osób", highlight: false },
              { value: "Ceremonie, artefakty, SM/PO", highlight: false },
            ],
          },
          {
            name: "Shape Up",
            cells: [
              { value: "Małe zespoły, krótkie cykle", highlight: true },
              { value: "Minimalna — appetite i shaping", highlight: false },
            ],
          },
        ],
      },
      { blockType: "articleSection" as const, ...shapeUpScrumSections[1] },
      { blockType: "articleSection" as const, ...shapeUpScrumSections[2] },
    ],
  },
  {
    slug: "model-bettingu",
    title: "Model Bettingu w Produktach FinTech.",
    summary:
      'Dlaczego przewidywanie sukcesu funkcjonalności to czysta statystyka, a nie "wyczucie produktu"? Prezentujemy autorski framework wyceny ryzyka.',
    category: "case_studies" as const,
    readingTime: "15 min czytania",
    tone: "dark" as const,
    categoryLabel: "Case Studies",
    categoryMeta: "15 min czytania",
    excerpt: "Placeholder — uzupełnij treść w Payload.",
    layout: [],
  },
  {
    slug: "dobre-praktyki",
    title: 'Kiedy "Dobre Praktyki" niszczą Twój produkt.',
    summary:
      "Analiza ślepego podążania za rynkowymi gigantami. Dlaczego model Spotify nie zadziała w Twoim 20-osobowym zespole?",
    category: "management" as const,
    readingTime: "10 min czytania",
    tone: "light" as const,
    categoryLabel: "Zarządzanie",
    categoryMeta: "10 min czytania",
    excerpt: "Placeholder — uzupełnij treść w Payload.",
    layout: [],
  },
  {
    slug: "efektywnosc-zespolu",
    title: "Efektywność zespołu: Więcej niż Velocity.",
    summary:
      "Jak mierzyć to, co niemierzalne? Trzy kluczowe wskaźniki (Cycle Time, Throughput, Quality), które realnie wpływają na ROI.",
    category: "management" as const,
    readingTime: "10 min czytania",
    tone: "accent" as const,
    categoryLabel: "Zarządzanie",
    categoryMeta: "10 min czytania",
    excerpt: "Placeholder — uzupełnij treść w Payload.",
    layout: [],
  },
  {
    slug: "discovery-architecture",
    title: "Discovery Architecture: Jak walidować pomysły przed budową.",
    summary: "Procesy discovery, które redukują koszt błędnych decyzji i przyspieszają time-to-value.",
    category: "methodology" as const,
    readingTime: "9 min czytania",
    tone: "light" as const,
    categoryLabel: "Metodyka",
    categoryMeta: "9 min czytania",
    excerpt: "Placeholder — uzupełnij treść w Payload.",
    layout: [],
  },
  {
    slug: "pricing-engine",
    title: "Pricing Engine jako przewaga produktowa.",
    summary: "Case study z wdrożenia modułu wyceny, który podniósł marżę bez utraty konwersji.",
    category: "case_studies" as const,
    readingTime: "11 min czytania",
    tone: "dark" as const,
    categoryLabel: "Case Studies",
    categoryMeta: "11 min czytania",
    excerpt: "Placeholder — uzupełnij treść w Payload.",
    layout: [],
  },
];
