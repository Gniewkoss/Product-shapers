import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: {
    /** Enable per-user API keys for `Authorization: Bearer <key>` on REST / GraphQL. */
    useAPIKey: true,
  },
  fields: [],
};
