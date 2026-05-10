import { sql } from "drizzle-orm";

/**
 * Adds the avatar/LinkedIn fields introduced for the `usemeBentoResults` block
 * (commit "feat(useme-bento): CMS avatar upload and LinkedIn links") that were
 * never reflected in the database schema. Without these columns, every Payload
 * `find` on `site-pages` / `homepage` joins a missing column and the API
 * responds with `Failed query: ... no such column: light_card_linkedin_link`,
 * which surfaces in the admin UI as the homepage and every marketing page
 * failing to load (500 / "404"-style fallback).
 *
 * Adds, for each card group (`light_card`, `dark_card_top`, `dark_card_bottom`)
 * on both `homepage_blocks_useme_bento_results` and
 * `site_pages_blocks_useme_bento_results`:
 *   - `<group>_linkedin_link`            text
 *   - `<group>_avatar_url`               text
 *   - `<group>_avatar_id`                integer FK → media (ON DELETE SET NULL)
 *   - `<group>_avatar_initials`          text  (only for the two dark cards —
 *                                              the light card already has it)
 *
 * Cross-dialect (Postgres + SQLite). Postgres uses `ADD COLUMN IF NOT EXISTS`
 * so deploys with `PAYLOAD_DATABASE_PUSH=true` (Render historically) stay
 * idempotent; SQLite relies on Payload's migration registry running each
 * migration exactly once. Indexes mirror the names Drizzle generates for
 * upload-relation columns (e.g. `…_light_card_avatar_idx`).
 */

type MigrateArgs = {
  db: unknown;
  payload: { db: { name: string } };
};
type MigrateUpArgs = MigrateArgs;
type MigrateDownArgs = MigrateArgs;

type Dialect = "postgres" | "sqlite";

const TABLES = ["homepage_blocks_useme_bento_results", "site_pages_blocks_useme_bento_results"] as const;

const TEXT_COLUMNS = [
  "light_card_linkedin_link",
  "light_card_avatar_url",
  "dark_card_top_avatar_initials",
  "dark_card_top_linkedin_link",
  "dark_card_top_avatar_url",
  "dark_card_bottom_avatar_initials",
  "dark_card_bottom_linkedin_link",
  "dark_card_bottom_avatar_url",
] as const;

/** Upload-relation columns: integer FK → media(id), with a single index per FK. */
const FK_COLUMNS = [
  { column: "light_card_avatar_id", indexSuffix: "light_card_avatar_idx" },
  { column: "dark_card_top_avatar_id", indexSuffix: "dark_card_top_avatar_idx" },
  { column: "dark_card_bottom_avatar_id", indexSuffix: "dark_card_bottom_avatar_idx" },
] as const;

const quote = (name: string, dialect: Dialect): string =>
  dialect === "postgres" ? `"${name}"` : `\`${name}\``;

async function exec(payload: { db: { name: string } }, db: unknown, query: string): Promise<void> {
  const dialect: Dialect = payload.db.name === "postgres" ? "postgres" : "sqlite";
  const runner: (q: ReturnType<typeof sql.raw>) => Promise<unknown> =
    dialect === "postgres"
      ? (db as { execute: (q: ReturnType<typeof sql.raw>) => Promise<unknown> }).execute.bind(db)
      : (db as { run: (q: ReturnType<typeof sql.raw>) => Promise<unknown> }).run.bind(db);
  await runner(sql.raw(query));
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === "postgres" ? "postgres" : "sqlite";
  const q = (n: string) => quote(n, dialect);
  const ifNotExists = dialect === "postgres" ? "IF NOT EXISTS " : "";

  for (const table of TABLES) {
    for (const column of TEXT_COLUMNS) {
      await exec(payload, db, `ALTER TABLE ${q(table)} ADD COLUMN ${ifNotExists}${q(column)} text;`);
    }
    for (const fk of FK_COLUMNS) {
      await exec(
        payload,
        db,
        `ALTER TABLE ${q(table)} ADD COLUMN ${ifNotExists}${q(fk.column)} integer ` +
          `REFERENCES ${q("media")}(${q("id")}) ON UPDATE NO ACTION ON DELETE SET NULL;`,
      );
      await exec(
        payload,
        db,
        `CREATE INDEX IF NOT EXISTS ${q(`${table}_${fk.indexSuffix}`)} ON ${q(table)} (${q(fk.column)});`,
      );
    }
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === "postgres" ? "postgres" : "sqlite";
  const q = (n: string) => quote(n, dialect);

  for (const table of TABLES) {
    for (const fk of FK_COLUMNS) {
      await exec(payload, db, `DROP INDEX IF EXISTS ${q(`${table}_${fk.indexSuffix}`)};`);
      await exec(payload, db, `ALTER TABLE ${q(table)} DROP COLUMN ${q(fk.column)};`);
    }
    for (const column of TEXT_COLUMNS) {
      await exec(payload, db, `ALTER TABLE ${q(table)} DROP COLUMN ${q(column)};`);
    }
  }
}
