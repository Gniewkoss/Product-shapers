import type { GlobalConfig } from "payload";

import { postRevalidate } from "../hooks/revalidateFrontend";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  hooks: {
    afterChange: [async () => postRevalidate({ global: "footer" })],
  },
  fields: [
    { name: "companyName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "email", type: "email" },
    { name: "linkedinUrl", type: "text" },
    { name: "legalText", type: "textarea" },
    {
      name: "columns",
      type: "array",
      admin: { description: "Four columns like current footer" },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [{ name: "label", type: "text", required: true }],
        },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "url", type: "text" },
      ],
    },
  ],
};
