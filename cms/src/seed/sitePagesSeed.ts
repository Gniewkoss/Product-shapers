import type { Payload } from "payload";

import { flattenLayoutBlocks } from "./flattenLayoutBlock.js";

const hiringLayout = [
  {
    blockType: "heroBand" as const,
    heroBand: {
      eyebrow: "Kariera w architekturze",
      title: "Dołącz do arbitrów doskonałości produktowej.",
      intro:
        'Nie zatrudniamy "zasobów". Współpracujemy z architektami wzrostu, którzy traktują zarządzanie produktem jako dyscyplinę naukową. Przejrzystość to nasz standard – od wynagrodzenia po złożoność problemów, które rozwiązujemy.',
      asideEyebrow: "Nasz rekord wydajności",
      asideStats: [
        { value: "94%", label: "Retencja klientów po konsultacjach" },
        { value: "€12M+", label: "Retencja klientów po konsultacjach" },
      ],
      asideAriaLabel: "Kluczowe wskaźniki",
    },
  },
  {
    blockType: "jobGrid" as const,
    jobGrid: {
      sectionTitle: "Otwarte dyrektywy",
      sectionEyebrow: "Sortowane według wpływu",
      jobs: [
        {
          tag: "Wysoki priorytet",
          title: "Head of Product",
          description:
            "Skalowanie multidyscyplinarnej organizacji z 15 do 60 osób. Wymagana wizja strategiczna i strukturalizm architektoniczny.",
          compensation: "€140K - €180K + Equity",
          location: "Berlin/Remote (CET)",
          ctaLabel: "Prześlij dossier",
        },
        {
          tag: "Strategia",
          title: "Senior PM",
          description:
            "Prowadzenie zespołu Enterprise Architecture. Skupienie na skalowalności technicznej i strategiach wzrostu API-first.",
          compensation: "€90K - €120K",
          location: "Londyn / Hybrydowo",
          ctaLabel: "Prześlij dossier",
        },
        {
          tag: "Wzrost",
          title: "Analityk Produktowy",
          description:
            "Transformacja surowych danych behawioralnych w plany architektoniczne dla rozwoju funkcji. Niezbędne mistrzostwo SQL.",
          compensation: "€65K - €85K",
          location: "Warszawa / Remote (EU)",
          ctaLabel: "Prześlij dossier",
        },
      ],
    },
  },
  {
    blockType: "processGrid" as const,
    processGrid: {
      title: "Nasz proces rekrutacynjny",
      intro:
        "Zaprojektowany dla efektywności. Szanujemy Twój ładunek poznawczy na każdym etapie ewaluacji.",
      showPlaceholder: true,
      steps: [
        {
          number: "01",
          title: "Dopasowanie techniczne",
          body: "30-minutowa rozmowa syntetyzująca w celu uzgodnienia filozofii architektonicznej i kluczowych kompetencji technicznych. Konkrety, bez zbędnych wypełniaczy.",
        },
        {
          number: "02",
          title: "Plan przypadku",
          body: 'Realne wyzwanie architektoniczne. Zostaniesz poproszony o dekonstrukcję zawodzącego ekosystemu produktowego i zaproponowanie planu naprawczego.',
        },
        {
          number: "03",
          title: "Dekonstrukcja panelowa",
          body: "Obrona Twojego planu przed naszymi głównymi konsultantami. Szukamy jasności myślenia i zdolności do zmiany kierunku pod presją danych.",
        },
        {
          number: "04",
          title: "Werdykt egzekucyjny",
          body: "Finałowa dyskusja z Partnerami Założycielami dotycząca udziałów, trajektorii wpływu i długoterminowego autorytetu konsultingowego.",
        },
      ],
    },
  },
];

const szkoleniaLayout = [
  {
    blockType: "heroBand" as const,
    heroBand: {
      eyebrow: "Ekspercka Wiedza Produktowa",
      title: "Program Mentorski\n2024",
      intro:
        "Ekskluzywny, 12-tygodniowy proces transformacji dla Product\nManagerów i Leadów, którzy chcą wyjść poza ramy standardowego\nzarządzania i stać się architektami wartości biznesowej.",
    },
  },
  {
    blockType: "programModules" as const,
    programModules: {
      headingTitle: "Struktura programu",
      headingEyebrow: "06 MODUŁÓW / 12 TYGODNI",
      modules: [
        {
          number: "01",
          title: "Discovery Architecture",
          body: "Projektowanie procesów odkrywania produktu, które eliminują zgadywanie. Nauczysz się jak budować prototypy o wysokim stopniu pewności.",
          tags: [{ label: "Validation" }, { label: "Validation" }],
          variant: "light",
        },
        {
          number: "02",
          title: "Shape up mastery",
          body: "Głębokie zanurzenie w metodologię Basecamp. Betting, Shaping, Building. Nauczysz się jak unikać backlogów na rzecz realnej pracy.",
          tags: [{ label: "Strategy" }, { label: "Execution" }],
          variant: "dark",
        },
        {
          number: "03",
          title: "Strategic betting",
          body: "Jak wybierać projekty, które mają\nznaczenie. Finansowe i operacyjne\naspekty podejmowania decyzji\nproduktowych.",
          tags: [{ label: "Roi analysis" }, { label: "Risk management" }],
          variant: "light",
        },
        {
          number: "04",
          title: "Product authority ",
          body: "Budowanie autorytetu w organizacji. Komunikacja z C-level, negocjacje zasobów i zarządzanie oczekiwaniami interesariuszy.",
          tags: [],
          variant: "light",
          asideEyebrow: "KEY TAKEAWAY",
          asideQuote: `"Autorytet nie pochodzi z\nroli, ale z jakości dostarczanych argumentów i danych."`,
        },
        {
          number: "05",
          title: "Data driven narratives ",
          body: "Wykorzystanie analityki do\nbudowania przekonujących historii\nproduktowych, które mobilizują\nzespoły do działania.",
          tags: [],
          variant: "accent",
          footerImageUrl: "https://www.figma.com/api/mcp/asset/f3b460a1-e46e-48d6-8719-40d762e6f75d",
        },
      ],
    },
  },
  {
    blockType: "szkoleniaWhyShapeUp" as const,
    szkoleniaWhyShapeUp: {
      titleLine1: "Dlaczego",
      titleLine2: "Shape Up?",
      intro: `Metodologia Shape Up to odpowiedź na chaos agile'owy.
Zamiast dwutygodniowych sprintów, które nigdy się nie
kończą, oferujemy system, który gwarantuje dowiezienie
wartości w przewidywalnym czasie.`,
      benefit1: "Eliminacja „sprint fatigue”",
      benefit2: "Jasne granice (circuits)",
      benefit3: "Realna autonomia zespołów",
      statValue: "100%",
      statLabel: "Focus on outcomes",
      quote: `"Praca w 6-tygodniowych\ncyklach zmieniła nasz sposób\nmyślenia o produkcie."`,
      darkCardTitle: "Precyzyjne modelowanie",
      darkCardBody: "Stawianie na właściwe rzeczy we właściwym czasie.",
    },
  },
  {
    blockType: "faqList" as const,
    faqList: {
      sectionTitle: "Najczęściej zadawane pytania",
      sectionSubtitle: "Wszystko, co musisz wiedzieć przed dołączeniem do programu.",
      items: [
        {
          question: "Dla kogo jest ten program?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        },
        {
          question: "Ile czasu tygodniowo muszę poświęcić?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          question: "Czy otrzymam certyfikat?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          question: "Czy mój zespół jest na to gotowy?",
          answer: `Shape Up wymaga pewnej dojrzałości. Aby to zadziałało, potrzebujesz: Seniority: Przynajmniej kilku ludzi (Tech/UX), którzy znają domenę i potrafią samodzielnie rozwiązywać problemy, a nie tylko "klepać tickety". Autonomii: Gotowości Zarządu, by oddać decyzyjność zespołowi na 6 tygodni (bez mikrozarządzania). Jeśli masz samych juniorów, którzy potrzebują prowadzenia za rękę – Shape Up może być za trudny.`,
        },
      ],
    },
  },
];

const usemeImg =
  "https://www.figma.com/api/mcp/asset/0eba44d5-9425-4c1e-a191-f61728ae2f23";

const usemeLayout = [
  {
    blockType: "heroBand" as const,
    heroBand: {
      eyebrow: "Case study // redakcyjna analiza",
      title: "Skalowanie Useme.com: Architektoniczny Autorytet.",
      intro:
        "W jaki sposób Product Shapers zdefiniowali na nowo techniczny i strategiczny krajobraz największej giełdy freelancerów w Europie Środkowej.",
      asidePrimary: "2024",
      asideSecondary: "Oś czasu projektu",
    },
  },
  {
    blockType: "richSplit" as const,
    richSplit: {
      mediaUrl: usemeImg,
      leftTitle: "Kontekst",
      bodyParagraphs: `Useme.com stands as a pillar of the Polish gig economy, facilitating thousands of
cross-border transactions daily. However, rapid growth led to a "success-induced
inertia." The platform needed more than just a facelift; it required a structural
revolution to maintain its market dominance against emerging global
competitors.`,
      quote: `"The goal was not just to ship features faster, but to build a machine that ships
the *right* features with surgical precision."`,
    },
  },
  {
    blockType: "challengeVerdictSplit" as const,
    challengeVerdictSplit: {
      title: "The Structural\nChallenge",
      features: [
        {
          number: "01",
          title: "Technical Debt Debt",
          body: "Legacy architectures preventing the rapid deployment of new\npayment gateways and regional compliance tools.",
        },
        {
          number: "02",
          title: "Process Silos",
          body: "Product, Design, and Engineering were operating as hand-off\ndepartments rather than a unified strategic trio.",
        },
        {
          number: "03",
          title: "Outcome Uncertainty",
          body: "Difficulties in predicting the ROI of major infrastructure\ninvestments vs. front-end features.",
        },
      ],
      verdictBadge: "Architectural verdict",
      verdictBody: `The platform was suffering from
"Feature Fatigue"—a state where
every new addition added more
complexity than value.`,
    },
  },
  {
    blockType: "featureColumns3" as const,
    featureColumns3: {
      headingTitle: "The Strategy: Shape Up",
      headingSubtitle: "A radical shift in delivery architecture",
      columns: [
        {
          iconUrl: "https://www.figma.com/api/mcp/asset/7b0a516d-1b7f-47ea-afed-2a28c4aa4b40",
          title: "Product Trio",
          body: `We dissolved departmental walls to
form "Trios" consisting of a PM,
Designer, and Tech Lead, ensuring
feasibility from day one.`,
        },
        {
          iconUrl: "https://www.figma.com/api/mcp/asset/a24b3a10-b6b2-4347-b771-080662d2cf25",
          title: "Six-Week Cycles",
          body: `Abandoned the "Scrum Sprints" in
favor of deep-work cycles that allow
for meaningful, shipping-focused
progress.`,
        },
        {
          iconUrl: "https://www.figma.com/api/mcp/asset/112fb91d-7308-45fb-a626-f6e72281650f",
          title: "Pitching & Betting",
          body: `Replaced the "Backlog" with a high-
stakes Betting Table, where only well-
defined "Pitches" receive resources.`,
        },
      ],
    },
  },
  {
    blockType: "usemeBentoResults" as const,
    usemeBentoResults: {
      lightCard: {
        quote:
          '"Product Shapers didn\'t just give us a roadmap; they gave us a compass. The shift to the Product Trio model changed how we think about risk."',
        authorName: "Marta Polowczyk",
        role: "COO @Useme",
        avatarInitials: "MP",
      },
      darkCardTop: {
        quote: `"The six-week cycle allowed
our designers to breathe and
actually solve the user
problems, not just push
pixels."`,
        authorName: "Marta Polowczyk",
        role: "COO @Useme",
      },
      darkCardBottom: {
        quote: `"Finally, technical debt is
viewed as a strategic decision,
not just a nuisance in the
sprint."`,
        authorName: "Marta Polowczyk",
        role: "COO @Useme",
      },
      statCell: {
        value: "85%",
        label: "Reduction in feature waste",
      },
    },
  },
  {
    blockType: "statsRow4" as const,
    statsRow4: {
      headingTitle: "Measurable Authority.",
      headingEyebrow: "The Hard Numbers",
      items: [
        {
          value: "4x",
          label: "Velocity increase",
          description: "Through prioritized betting and cycle autonomy.",
        },
        {
          value: "12%",
          label: "Revenue growth",
          description: "Direct attribution to new payment flow architecture.",
        },
        {
          value: "0",
          label: "Silos remaining",
          description: "Complete integration of product and engineering teams.",
        },
        {
          value: "2.5k",
          label: "Hours saved",
          description: "Annual developer time reclaimed\nfrom legacy debt.",
        },
      ],
    },
  },
];

const articlesLayout = [
  {
    blockType: "articlesHero" as const,
    articlesHero: {
      eyebrow: "Artykuły i analizy",
      title: "Merytoryczny\nContent.",
      intro:
        "Głębokie nurkowanie w procesy produktowe, architekturę zespołów\ni matematykę biznesu. Bez ogólników, tylko konkretne modele.",
    },
  },
];

export const seedSitePagesByRoute = {
  hiring: hiringLayout,
  szkolenia: szkoleniaLayout,
  useme: usemeLayout,
  articles: articlesLayout,
};

export async function ensureSitePages(payload: Payload) {
  const configs = [
    { routeKey: "hiring" as const, layout: hiringLayout },
    { routeKey: "szkolenia" as const, layout: szkoleniaLayout },
    { routeKey: "useme" as const, layout: usemeLayout },
    { routeKey: "articles" as const, layout: articlesLayout },
  ];

  for (const { routeKey, layout } of configs) {
    const existing = await payload.find({
      collection: "site-pages",
      where: { routeKey: { equals: routeKey } },
      limit: 1,
      depth: 0,
    });

    if (existing.docs.length > 0) continue;

    await payload.create({
      collection: "site-pages",
      data: {
        routeKey,
        layout: flattenLayoutBlocks(layout),
      },
    });
    console.info(`[seed] Created site-page: ${routeKey}`);
  }
}
