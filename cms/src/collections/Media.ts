import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, crop: "center" },
      { name: "card", width: 800, height: 600, crop: "center" },
      { name: "hero", width: 1440, height: 600, crop: "center" },
    ],
  },
  fields: [{ name: "alt", type: "text" }],
};
