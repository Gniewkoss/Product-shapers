/** Satisfies `declare module 'payload'` augmentation in `cms/src/payload-types.ts` when typechecking the Vite app only. */
declare module "payload" {
  export type JsonObject = Record<string, unknown>;
}
