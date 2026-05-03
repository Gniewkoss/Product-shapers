export type JsonRecord = Record<string, unknown>;

/**
 * Hand-written seeds often use `{ blockType, heroBand: { ... } }`.
 * Payload Local API / Mongo-style creates expect flat `{ blockType, ...fields }`.
 */
export function flattenLayoutBlock(block: JsonRecord): JsonRecord {
  const bt = block.blockType;
  if (typeof bt !== "string") return block;
  const nested = block[bt];
  if (!nested || typeof nested !== "object" || Array.isArray(nested)) return block;
  const out: JsonRecord = { ...(nested as JsonRecord), blockType: bt };
  if (typeof block.id === "string") out.id = block.id;
  if (typeof block.blockName === "string") out.blockName = block.blockName;
  return out;
}

export function flattenLayoutBlocks(layout: unknown): JsonRecord[] {
  if (!Array.isArray(layout)) return [];
  return layout.map((b) => flattenLayoutBlock(b as JsonRecord));
}
