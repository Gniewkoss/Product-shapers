import type { CollectionConfig } from "payload";

import { postRevalidate } from "../hooks/revalidateFrontend";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "status", "publishedAt"] },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc && typeof doc === "object" && "slug" in doc) {
          await postRevalidate({ collection: "articles", slug: String((doc as { slug?: string }).slug) });
        }
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "heroImage", type: "upload", relationTo: "media" },
    {
      name: "summary",
      type: "textarea",
      admin: { description: "Short blurb for listing cards (artykuły grid)." },
    },
    { name: "excerpt", type: "textarea", admin: { description: "Longer lead under the article title." } },
    {
      name: "categoryLabel",
      type: "text",
      admin: { description: "Article detail — e.g. Metodyka" },
    },
    {
      name: "categoryMeta",
      type: "text",
      admin: { description: "Article detail — e.g. reading time line" },
    },
    {
      name: "readingTime",
      type: "text",
      admin: { description: "Listing card — e.g. 12 min czytania" },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Metodologie", value: "methodology" },
        { label: "Zarządzanie", value: "management" },
        { label: "Case Studies", value: "case_studies" },
      ],
    },
    {
      name: "tone",
      type: "select",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Accent", value: "accent" },
      ],
      defaultValue: "light",
    },
    {
      name: "keyTakeaway",
      type: "group",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "id", type: "text", required: true },
        { name: "number", type: "text" },
        { name: "label", type: "text" },
        { name: "title", type: "text" },
        {
          name: "contentFormat",
          type: "select",
          defaultValue: "plain",
          options: [
            { label: "Plain (markdown-style)", value: "plain" },
            { label: "HTML", value: "html" },
          ],
        },
        {
          name: "content",
          type: "textarea",
          admin: {
            description: "Plain: paragraphs separated by blank lines; ## / ### headings. HTML: trusted markup.",
          },
        },
      ],
    },
    {
      name: "relatedArticles",
      type: "relationship",
      relationTo: "articles",
      hasMany: true,
    },
    { name: "publishedAt", type: "date" },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
    },
  ],
};
