/**
 * Quick SQLite schema inspector for the local Payload DB. Useful when a Payload
 * `find` returns 500 with `Failed query … no such column: …` (= block schema
 * was extended in `pageBlocks.ts` but no matching migration was added).
 *
 * Usage:
 *   node scripts/inspect-db.mjs              # list all tables
 *   node scripts/inspect-db.mjs site_pages   # filter by substring
 */
import { createClient } from "@libsql/client";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dbFile = path.resolve("payload.local.db");
const client = createClient({ url: pathToFileURL(dbFile).href });

const tables = (
  await client.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
).rows.map((row) => row.name);

const filter = process.argv[2] || "";
const filtered = filter ? tables.filter((t) => t.includes(filter)) : tables;
console.log(`Total tables: ${tables.length}`);
console.log(`Match (${filter || "all"}): ${filtered.length}`);
for (const t of filtered) console.log(t);
