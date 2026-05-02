import type { GlobalConfig } from "payload";

import { pageLayoutBlocks } from "../blocks/pageBlocks";
import { postRevalidate } from "../hooks/revalidateFrontend";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [async () => postRevalidate({ global: "homepage" })],
  },
  fields: [
    {
      name: "heroHeadlinePrefix",
      type: "text",
      admin: { description: "Text before the accent word (e.g. Odzyskaj kontrolę nad)" },
    },
    {
      name: "heroHeadlineAccent",
      type: "text",
      admin: { description: "Gradient accent word (e.g. RoadMapą!)" },
    },
    { name: "heroSubheadline", type: "textarea" },
    { name: "heroCtaLabel", type: "text" },
    {
      name: "heroCtaPath",
      type: "text",
      admin: { description: "Usually /#konsultacja" },
    },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "servicesEyebrow", type: "text" },
    { name: "servicesHeading", type: "text" },
    { name: "servicesIntro", type: "textarea" },
    {
      name: "services",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "icon", type: "text", admin: { description: "Optional icon URL or asset path" } },
      ],
    },
    { name: "aboutHeading", type: "text" },
    {
      name: "aboutBody",
      type: "textarea",
      admin: { description: "About section copy (plain text or trusted HTML if the site renders it)." },
    },
    {
      type: "collapsible",
      label: "Obszary ekspertyzy (accordion)",
      fields: [
        { name: "expertiseEyebrow", type: "text", admin: { description: 'Default: "Jak pomagam"' } },
        { name: "expertiseHeading", type: "text", admin: { description: 'Default: "Obszary ekspertyzy"' } },
        {
          name: "expertiseIntro",
          type: "textarea",
          admin: { description: "Paragraphs separated by blank lines" },
        },
        {
          name: "expertiseItems",
          type: "array",
          labels: { singular: "Item", plural: "Items" },
          fields: [
            { name: "number", type: "text", admin: { description: "e.g. 01" } },
            { name: "title", type: "text", required: true },
            {
              name: "layout",
              type: "select",
              defaultValue: "simple",
              options: [
                { label: "Simple paragraph", value: "simple" },
                { label: "Paragraph + bullet list", value: "bullets" },
              ],
            },
            { name: "body", type: "textarea", admin: { description: "Shown when layout is simple or as intro with bullets" } },
            {
              name: "bullets",
              type: "array",
              fields: [{ name: "line", type: "text", required: true }],
            },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Community band",
      fields: [
        { name: "communityHeadlineItalic", type: "text", admin: { description: 'e.g. "know-how"' } },
        { name: "communityHeadlineRest", type: "text", admin: { description: 'e.g. "by community"' } },
        { name: "communityLeadBold", type: "textarea" },
        { name: "communityBody", type: "textarea" },
        {
          name: "communitySupportingBrands",
          type: "array",
          fields: [{ name: "name", type: "text", required: true }],
        },
        {
          name: "communityExpertNames",
          type: "array",
          fields: [{ name: "name", type: "text", required: true }],
        },
        {
          name: "communityBackgroundPhotos",
          type: "relationship",
          relationTo: "media",
          hasMany: true,
          admin: {
            description:
              "Tła sekcji community (karuzela). Upload z biblioteki Media — gdy dodasz przynajmniej jedno zdjęcie, lista adresów URL poniżej jest pomijana.",
          },
        },
        {
          name: "communityBgUrls",
          type: "array",
          admin: {
            description:
              "Opcjonalnie: zewnętrzne adresy URL obrazów (starszy sposób). Używane tylko gdy „Community background photos” jest puste.",
          },
          fields: [{ name: "url", type: "text", required: true }],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Metodologia — podejście do wdrożeń",
      fields: [
        { name: "methodologyEyebrow", type: "text" },
        { name: "methodologyHeading", type: "text" },
        {
          name: "methodologyParagraphs",
          type: "textarea",
          admin: { description: "Separate paragraphs with blank lines" },
        },
        {
          name: "methodologyBullets",
          type: "array",
          fields: [{ name: "title", type: "text", required: true }],
          admin: { description: "Icon rows (Tailored solutions, Step-by-step…)" },
        },
      ],
    },
    {
      name: "homeTailLayout",
      type: "blocks",
      blocks: pageLayoutBlocks,
      admin: {
        description:
          "Legacy optional blocks immediately after methodology. Prefer „Home continuation layout” for the rest of the page.",
      },
    },
    {
      name: "homeContinuationLayout",
      type: "blocks",
      blocks: pageLayoutBlocks,
      admin: {
        description:
          "Ordered sections from practice tiles through knowledge grid (method tiles, pillars, founder, testimonials, article teasers, etc.).",
      },
    },
    {
      type: "collapsible",
      label: "Kim jestem — zdjęcie (strona główna)",
      fields: [
        {
          name: "founderPortrait",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "Portret w sekcji „Architekt projektu” / Dawid Jurand Szkiełka — zaokrąglony prawy górny róg nadal z CSS. Bez uploadu pokazywany jest domyślny obraz z layoutu.",
          },
        },
        {
          name: "founderPortraitAlt",
          type: "text",
          admin: { description: "Krótki opis dla a11y (np. Dawid Jurand Szkiełka, portret)" },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Baza wiedzy (strona główna)",
      fields: [
        {
          name: "featuredKnowledgeArticles",
          type: "relationship",
          relationTo: "articles",
          hasMany: true,
          maxRows: 3,
          admin: {
            description:
              "Maks. 3 opublikowane artykuły — kolejność tu = kolejność kafelków. Używane gdy blok „Knowledge teaser grid” ma włączone „Użyj wyboru ze strony głównej”, oraz na stronie głównej bez bloków CMS.",
          },
          filterOptions: {
            status: {
              equals: "published",
            },
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Kontakt (nad stopką)",
      fields: [
        { name: "contactEyebrow", type: "text" },
        { name: "contactHeading", type: "text" },
        { name: "contactIntro", type: "textarea" },
        { name: "contactEmail", type: "text" },
        { name: "contactLocation", type: "text" },
      ],
    },
  ],
};
