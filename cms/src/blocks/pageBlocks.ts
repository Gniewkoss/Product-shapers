import type { Block } from "payload";

/** Shared layout blocks for marketing routes (`site-pages`) and optional homepage tail */
export const heroBandBlock: Block = {
  slug: "heroBand",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "textarea", required: true },
    { name: "intro", type: "textarea" },
    {
      name: "asideEyebrow",
      type: "text",
      admin: { description: "Small label above KPI column (optional)" },
    },
    {
      name: "asideStats",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "textarea", required: true },
      ],
    },
    {
      name: "asidePrimary",
      type: "text",
      admin: { description: "Timeline-style aside when stats empty (e.g. 2024)" },
    },
    {
      name: "asideSecondary",
      type: "text",
      admin: { description: "Subtitle under asidePrimary (e.g. project timeline)" },
    },
    {
      name: "asideAriaLabel",
      type: "text",
      admin: { description: "Accessibility label on aside (hiring KPI / useme timeline)" },
    },
  ],
};

export const jobGridBlock: Block = {
  slug: "jobGrid",
  labels: { singular: "Job grid", plural: "Job grids" },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    { name: "sectionEyebrow", type: "text" },
    {
      name: "jobs",
      type: "array",
      fields: [
        { name: "tag", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "compensation", type: "text" },
        { name: "location", type: "text" },
        { name: "ctaLabel", type: "text", defaultValue: "Prześlij dossier" },
      ],
    },
  ],
};

export const processGridBlock: Block = {
  slug: "processGrid",
  labels: { singular: "Process grid", plural: "Process grids" },
  fields: [
    { name: "title", type: "textarea", required: true },
    { name: "intro", type: "textarea" },
    {
      name: "steps",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    {
      name: "showPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Decorative gradient placeholder next to intro" },
    },
  ],
};

export const programModulesBlock: Block = {
  slug: "programModules",
  labels: { singular: "Program modules", plural: "Program modules" },
  fields: [
    { name: "headingTitle", type: "text", required: true },
    { name: "headingEyebrow", type: "text" },
    {
      name: "modules",
      type: "array",
      fields: [
        { name: "number", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
        {
          name: "tags",
          type: "array",
          fields: [{ name: "label", type: "text", required: true }],
        },
        {
          name: "variant",
          type: "select",
          defaultValue: "light",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "Accent", value: "accent" },
          ],
        },
        {
          name: "asideEyebrow",
          type: "text",
          admin: { description: "Szkolenia wide module: aside label (e.g. KEY TAKEAWAY)" },
        },
        {
          name: "asideQuote",
          type: "textarea",
          admin: { description: "Two lines separated by newline (wide module quote)" },
        },
        {
          name: "footerImageUrl",
          type: "text",
          admin: { description: "Szkolenia accent module: decorative strip image URL" },
        },
      ],
    },
  ],
};

export const szkoleniaWhyShapeUpBlock: Block = {
  slug: "szkoleniaWhyShapeUp",
  labels: { singular: "Szkolenia: Dlaczego Shape Up", plural: "Szkolenia: Dlaczego Shape Up" },
  fields: [
    { name: "titleLine1", type: "text", required: true },
    { name: "titleLine2", type: "text", required: true },
    { name: "intro", type: "textarea", required: true, admin: { description: "Four lines, newline-separated" } },
    { name: "benefit1", type: "text", required: true },
    { name: "benefit2", type: "text", required: true },
    { name: "benefit3", type: "text", required: true },
    { name: "statValue", type: "text", required: true },
    { name: "statLabel", type: "text", required: true },
    { name: "quote", type: "textarea", required: true, admin: { description: "Three lines, newline-separated" } },
    { name: "darkCardTitle", type: "text", required: true },
    { name: "darkCardBody", type: "textarea", required: true },
    {
      name: "accentTileImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Obraz w prawym dolnym kafelku (zamiast zielonego pola). Opcjonalny — bez pliku zostaje układ demonstracyjny.",
      },
    },
  ],
};

export const faqListBlock: Block = {
  slug: "faqList",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "sectionTitle", type: "text" },
    { name: "sectionSubtitle", type: "textarea" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};

export const richSplitBlock: Block = {
  slug: "richSplit",
  labels: { singular: "Rich split (image + columns)", plural: "Rich splits" },
  fields: [
    { name: "mediaUrl", type: "text", admin: { description: "Hero image URL (optional)" } },
    { name: "leftTitle", type: "text", required: true },
    { name: "bodyParagraphs", type: "textarea", required: true },
    { name: "quote", type: "textarea" },
  ],
};

export const challengeBandBlock: Block = {
  slug: "challengeBand",
  labels: { singular: "Challenge band (dark)", plural: "Challenge bands" },
  fields: [
    { name: "title", type: "textarea", required: true },
    {
      name: "features",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const articlesHeroBlock: Block = {
  slug: "articlesHero",
  labels: { singular: "Articles listing hero", plural: "Articles listing heroes" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "textarea", required: true },
    { name: "intro", type: "textarea", required: true },
  ],
};

export const htmlSnippetBlock: Block = {
  slug: "htmlSnippet",
  labels: { singular: "HTML snippet", plural: "HTML snippets" },
  fields: [
    {
      name: "html",
      type: "textarea",
      required: true,
      admin: { description: "Trusted HTML injected after sanitization expectation — editors only." },
    },
  ],
};

/** Homepage: 4-up method tiles (e.g. „Jak to robię w praktyce”) */
export const methodTileGridBlock: Block = {
  slug: "methodTileGrid",
  labels: { singular: "Method tile grid", plural: "Method tile grids" },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    {
      name: "tiles",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const industryPillarsBlock: Block = {
  slug: "industryPillars",
  labels: { singular: "Industry pillars", plural: "Industry pillars" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "intro", type: "textarea" },
    {
      name: "pillars",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "iconUrl", type: "text" },
        {
          name: "clients",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "segment", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};

export const caseHighlightCtaBlock: Block = {
  slug: "caseHighlightCta",
  labels: { singular: "Case highlight CTA", plural: "Case highlight CTAs" },
  fields: [
    { name: "badge", type: "text" },
    { name: "title", type: "textarea", required: true },
    { name: "ctaLabel", type: "text" },
    { name: "ctaPath", type: "text" },
    {
      name: "metrics",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "textarea", required: true },
      ],
    },
  ],
};

export const numberedIconStepsBlock: Block = {
  slug: "numberedIconSteps",
  labels: { singular: "Numbered icon steps", plural: "Numbered icon steps" },
  fields: [
    { name: "sectionTitle", type: "text", required: true },
    {
      name: "steps",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const founderSpotlightBlock: Block = {
  slug: "founderSpotlight",
  labels: { singular: "Founder spotlight", plural: "Founder spotlights" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "name", type: "text", required: true },
    { name: "bodyParagraphs", type: "textarea", required: true },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    { name: "portraitUrl", type: "text" },
  ],
};

export const testimonialsHomeBlock: Block = {
  slug: "testimonialsHome",
  labels: { singular: "Testimonials (3-col)", plural: "Testimonials (3-col)" },
  fields: [
    { name: "sectionTitle", type: "text" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "authorName", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "avatarUrl", type: "text" },
      ],
    },
  ],
};

export const knowledgeTeasersBlock: Block = {
  slug: "knowledgeTeasers",
  labels: { singular: "Knowledge teaser grid", plural: "Knowledge teaser grids" },
  fields: [
    {
      name: "useHomepageFeaturedArticles",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Włączone: karty z Globals → Homepage → Baza wiedzy (wybrane artykuły, max 3). Wyłączone: użyj ręcznych kart poniżej.",
      },
    },
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "subtitle", type: "text" },
    {
      name: "cards",
      type: "array",
      fields: [
        { name: "categoryLabel", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "excerpt", type: "textarea" },
        { name: "imageUrl", type: "text" },
        { name: "href", type: "text" },
        { name: "ctaLabel", type: "text", defaultValue: "Dowiedz się więcej" },
      ],
    },
  ],
};

/** Useme: dark challenge band + right „verdict” column */
export const challengeVerdictSplitBlock: Block = {
  slug: "challengeVerdictSplit",
  labels: { singular: "Challenge + verdict split", plural: "Challenge + verdict splits" },
  fields: [
    { name: "title", type: "textarea", required: true },
    {
      name: "features",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    { name: "verdictBadge", type: "text" },
    { name: "verdictBody", type: "textarea", required: true },
  ],
};

export const featureColumns3Block: Block = {
  slug: "featureColumns3",
  labels: { singular: "3 feature columns", plural: "3 feature columns" },
  fields: [
    { name: "headingTitle", type: "text", required: true },
    { name: "headingSubtitle", type: "textarea" },
    {
      name: "columns",
      type: "array",
      fields: [
        { name: "iconUrl", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const usemeBentoResultsBlock: Block = {
  slug: "usemeBentoResults",
  labels: { singular: "Useme bento + stat", plural: "Useme bento + stats" },
  fields: [
    {
      name: "lightCard",
      type: "group",
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "authorName", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "avatarInitials", type: "text" },
      ],
    },
    {
      name: "darkCardTop",
      type: "group",
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "authorName", type: "text", required: true },
        { name: "role", type: "text", required: true },
      ],
    },
    {
      name: "darkCardBottom",
      type: "group",
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "authorName", type: "text", required: true },
        { name: "role", type: "text", required: true },
      ],
    },
    {
      name: "statCell",
      type: "group",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};

export const statsRow4Block: Block = {
  slug: "statsRow4",
  labels: { singular: "Stats row (4)", plural: "Stats rows (4)" },
  fields: [
    { name: "headingTitle", type: "text", required: true },
    { name: "headingEyebrow", type: "text" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};

export const pageLayoutBlocks: Block[] = [
  heroBandBlock,
  jobGridBlock,
  processGridBlock,
  programModulesBlock,
  faqListBlock,
  richSplitBlock,
  challengeBandBlock,
  challengeVerdictSplitBlock,
  featureColumns3Block,
  usemeBentoResultsBlock,
  statsRow4Block,
  articlesHeroBlock,
  htmlSnippetBlock,
  methodTileGridBlock,
  industryPillarsBlock,
  caseHighlightCtaBlock,
  numberedIconStepsBlock,
  founderSpotlightBlock,
  testimonialsHomeBlock,
  knowledgeTeasersBlock,
  szkoleniaWhyShapeUpBlock,
];
