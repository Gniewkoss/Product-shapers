import type { GlobalConfig } from "payload";

import { postRevalidate } from "../hooks/revalidateFrontend";

export const SeoDefaults: GlobalConfig = {
  slug: "seo-defaults",
  label: "SEO defaults",
  hooks: {
    afterChange: [async () => postRevalidate({ global: "seo-defaults" })],
  },
  fields: [
    { name: "siteName", type: "text" },
    { name: "defaultMetaTitle", type: "text" },
    { name: "defaultMetaDescription", type: "textarea" },
    { name: "defaultOgImage", type: "upload", relationTo: "media" },
  ],
};
