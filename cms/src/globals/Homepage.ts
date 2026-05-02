import type { GlobalConfig } from "payload";

import { pageLayoutBlocks } from "../blocks/pageBlocks";
import { postRevalidate } from "../hooks/revalidateFrontend";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
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
          name: "communityBgUrls",
          type: "array",
          admin: { description: "Rotating background photos (URLs)" },
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
