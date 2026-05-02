export type PayloadLayoutBlock = Record<string, unknown> & { blockType?: string };

const META = new Set(["id", "blockName", "blockType"]);

/**
 * REST blocks are flat `{ blockType, ...fields }`. Seed JSON may nest `{ blockType, heroBand: { ... } }`.
 */
export function getBlockFields(block: PayloadLayoutBlock): Record<string, unknown> {
  const bt = block.blockType;
  if (typeof bt === "string") {
    const nested = block[bt];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      return { ...(nested as Record<string, unknown>) };
    }
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(block)) {
    if (!META.has(k)) out[k] = v;
  }
  return out;
}

export function splitLines(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

export function splitParagraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Exactly four lines for szkolenia „Why Shape Up” intro copy (pads with empty strings). */
export function fourLinesPad(body: unknown): [string, string, string, string] {
  const L = splitLines(String(body ?? ""));
  while (L.length < 4) L.push("");
  return [L[0]!, L[1]!, L[2]!, L[3]!];
}
