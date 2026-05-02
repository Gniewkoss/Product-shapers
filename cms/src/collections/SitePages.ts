import type { CollectionConfig } from "payload";

import { pageLayoutBlocks } from "../blocks/pageBlocks";
import { postRevalidate } from "../hooks/revalidateFrontend";

export const SitePages: CollectionConfig = {
  slug: "site-pages",
  access: {
    read: () => true,
  },
  labels: { singular: "Marketing page", plural: "Marketing pages" },
  admin: {
    useAsTitle: "routeKey",
    defaultColumns: ["routeKey", "updatedAt"],
    description: "One document per route (szkolenia, hiring, useme, articles). Layout drives page sections.",
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const routeKey =
          doc && typeof doc === "object" && "routeKey" in doc ? String((doc as { routeKey?: string }).routeKey) : "";
        if (routeKey) await postRevalidate({ collection: "site-pages", slug: routeKey });
      },
    ],
  },
  fields: [
    {
      name: "routeKey",
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        { label: "Szkolenia (/szkolenia)", value: "szkolenia" },
        { label: "Hiring (/hiring)", value: "hiring" },
        { label: "Useme (/useme)", value: "useme" },
        { label: "Articles (/artykuly)", value: "articles" },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageLayoutBlocks,
      admin: { description: "Stack sections top-to-bottom." },
    },
  ],
};
