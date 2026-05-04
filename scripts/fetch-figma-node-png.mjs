/**
 * Download a PNG export for a Figma node (REST API).
 * Create a token: Figma → Settings → Security → Personal access tokens.
 *
 * Usage:
 *   set FIGMA_ACCESS_TOKEN=your_token
 *   node scripts/fetch-figma-node-png.mjs
 *
 * Optional args: [fileKey] [nodeId] [outputPath]
 * Defaults: Product-Shapers-Consulting file, node 42:117 (szkolenia benefit icon),
 *           public/brand/szkolenia-benefit-icon.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const FILE_KEY = process.argv[2] ?? "HOx04KQIMUQQ2oHYeczRnB";
const NODE_ID = process.argv[3] ?? "42:117";
const OUT = process.argv[4] ?? path.join(root, "public", "brand", "szkolenia-benefit-icon.png");

const token = process.env.FIGMA_ACCESS_TOKEN?.trim();
if (!token) {
  console.error("Missing FIGMA_ACCESS_TOKEN. Generate one under Figma → Settings → Security.");
  process.exit(1);
}

const ids = encodeURIComponent(NODE_ID);
const metaUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=png&scale=2`;
const metaRes = await fetch(metaUrl, { headers: { "X-Figma-Token": token } });
if (!metaRes.ok) {
  const t = await metaRes.text();
  console.error(`Figma images API ${metaRes.status}:`, t);
  process.exit(1);
}
const meta = await metaRes.json();
const imageUrl = meta.images?.[NODE_ID];
if (!imageUrl) {
  console.error("No image URL in response:", JSON.stringify(meta, null, 2));
  process.exit(1);
}

const imgRes = await fetch(imageUrl);
if (!imgRes.ok) {
  console.error("Download failed:", imgRes.status);
  process.exit(1);
}
const buf = Buffer.from(await imgRes.arrayBuffer());
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, buf);
console.log(`Wrote ${OUT} (${buf.length} bytes)`);
