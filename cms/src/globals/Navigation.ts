import type { GlobalConfig } from "payload";

import { postRevalidate } from "../hooks/revalidateFrontend";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [async () => postRevalidate({ global: "navigation" })],
  },
  fields: [
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "path",
          type: "text",
          required: true,
          admin: { description: "React Router path, e.g. /artykuly" },
        },
      ],
    },
    { name: "ctaLabel", type: "text" },
    {
      name: "ctaPath",
      type: "text",
      admin: { description: "CTA target — e.g. /#konsultacja for in-page scroll" },
    },
  ],
};
