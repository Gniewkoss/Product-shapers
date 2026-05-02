/**
 * Jednorazowa naprawa SQLite: kod Payload oczekuje kolumny `anchor_id`, a stara baza ma tylko `id` (PK wiersza).
 * Wywołanie: node scripts/migrateArticleSectionAnchorId.js (z katalogu cms/)
 */
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "..", "payload.local.db");
const url = "file:" + dbPath.replace(/\\/g, "/");

function slugify(s) {
  const t = String(s ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return t.length ? t : "section";
}

const c = createClient({ url });

const pragma = await c.execute({
  sql: "SELECT 1 FROM pragma_table_info('articles_blocks_article_section') WHERE name = 'anchor_id'",
});
if (pragma.rows.length === 0) {
  await c.execute({
    sql: 'ALTER TABLE articles_blocks_article_section ADD COLUMN anchor_id TEXT',
  });
  console.info("[migrate] Added column articles_blocks_article_section.anchor_id");
}

const rows = await c.execute({
  sql: "SELECT rowid, _order, label, title FROM articles_blocks_article_section WHERE anchor_id IS NULL OR anchor_id = ''",
});

for (const r of rows.rows) {
  const base = slugify(r.label ?? r.title);
  const anchor = `${base}-${r._order}`;
  await c.execute({
    sql: "UPDATE articles_blocks_article_section SET anchor_id = ? WHERE rowid = ?",
    args: [anchor, r.rowid],
  });
  console.info("[migrate] rowid", r.rowid, "anchor_id ->", anchor);
}

const left = await c.execute({
  sql: "SELECT COUNT(*) as n FROM articles_blocks_article_section WHERE anchor_id IS NULL OR anchor_id = ''",
});
console.info("[migrate] rows still missing anchor_id:", left.rows[0]?.n ?? "?");
process.exit(0);
