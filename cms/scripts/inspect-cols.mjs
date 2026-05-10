/**
 * Quick SQLite column inspector for the local Payload DB. Pair with
 * `inspect-db.mjs` to confirm whether a missing column (e.g.
 * `light_card_linkedin_link`) is the source of a Payload 500 / "page not
 * loading in CMS" symptom and a new migration is required.
 *
 * Usage:
 *   node scripts/inspect-cols.mjs site_pages_blocks_useme_bento_results
 *   node scripts/inspect-cols.mjs <table1> <table2> ...
 */
import { createClient } from "@libsql/client";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dbFile = path.resolve("payload.local.db");
const client = createClient({ url: pathToFileURL(dbFile).href });

const tables = process.argv.slice(2);

if (!tables.length) {
  console.error("usage: node scripts/inspect-cols.mjs <table> [table…]");
  process.exit(1);
}

for (const table of tables) {
  const res = await client.execute(`PRAGMA table_info("${table}")`);
  console.log(`# ${table}`);
  for (const row of res.rows) {
    console.log(
      `  ${row.name}\t${row.type}` +
        `${row.notnull ? " NOT NULL" : ""}` +
        `${row.dflt_value != null ? ` DEFAULT ${row.dflt_value}` : ""}`,
    );
  }
}
