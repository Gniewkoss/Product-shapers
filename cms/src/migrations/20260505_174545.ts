import { sql } from 'drizzle-orm'

/**
 * Minimal structural type for Payload migration arguments. Avoids coupling
 * to either `@payloadcms/db-postgres` or `@payloadcms/db-sqlite` (both export
 * `MigrateUpArgs`/`MigrateDownArgs` from `@payloadcms/drizzle/{dialect}`),
 * which keeps this single migration file usable regardless of which adapter
 * is active at build time. The runtime shape of `db` differs per adapter, so
 * we type it as `unknown` and narrow inside `exec()`.
 */
type MigrateArgs = {
  db: unknown
  payload: { db: { name: string } }
}
type MigrateUpArgs = MigrateArgs
type MigrateDownArgs = MigrateArgs

/**
 * Schema-recovery migration: adds upload-relation columns and one text field
 * that were declared in `payload.config` blocks but were missing from the
 * underlying schema (DB had been pushed before those fields existed).
 * All added columns are nullable, so existing rows remain valid.
 *
 * Targets (mirrored across `homepage_blocks_*` and `site_pages_blocks_*`):
 *   - feature_columns3_columns.icon_id (FK media)
 *   - industry_pillars_pillars.icon_id (FK media)
 *   - knowledge_teasers_cards.image_id (FK media)
 *   - program_modules_modules.footer_image_id (FK media)
 *   - founder_spotlight.portrait_image_id (FK media)
 *   - rich_split.media_id (FK media)
 *   - testimonials_home_items.linkedin_link (text), avatar_id (FK media)
 *
 * Cross-dialect: detects `payload.db.name` and emits Postgres or SQLite SQL.
 * Postgres: uses `IF NOT EXISTS` for idempotency (Render had
 * `PAYLOAD_DATABASE_PUSH=true` so columns may already be present).
 * SQLite: ADD COLUMN doesn't accept IF NOT EXISTS, but Payload's migration
 * runner only invokes `up()` once per registry entry.
 */

type IdColumnSpec = { table: string; column: string; indexName: string }

const ID_COLUMNS: IdColumnSpec[] = [
  { table: 'homepage_blocks_feature_columns3_columns', column: 'icon_id', indexName: 'homepage_blocks_feature_columns3_columns_icon_idx' },
  { table: 'homepage_blocks_founder_spotlight', column: 'portrait_image_id', indexName: 'homepage_blocks_founder_spotlight_portrait_image_idx' },
  { table: 'homepage_blocks_industry_pillars_pillars', column: 'icon_id', indexName: 'homepage_blocks_industry_pillars_pillars_icon_idx' },
  { table: 'homepage_blocks_knowledge_teasers_cards', column: 'image_id', indexName: 'homepage_blocks_knowledge_teasers_cards_image_idx' },
  { table: 'homepage_blocks_program_modules_modules', column: 'footer_image_id', indexName: 'homepage_blocks_program_modules_modules_footer_image_idx' },
  { table: 'homepage_blocks_rich_split', column: 'media_id', indexName: 'homepage_blocks_rich_split_media_idx' },
  { table: 'homepage_blocks_testimonials_home_items', column: 'avatar_id', indexName: 'homepage_blocks_testimonials_home_items_avatar_idx' },
  { table: 'site_pages_blocks_feature_columns3_columns', column: 'icon_id', indexName: 'site_pages_blocks_feature_columns3_columns_icon_idx' },
  { table: 'site_pages_blocks_founder_spotlight', column: 'portrait_image_id', indexName: 'site_pages_blocks_founder_spotlight_portrait_image_idx' },
  { table: 'site_pages_blocks_industry_pillars_pillars', column: 'icon_id', indexName: 'site_pages_blocks_industry_pillars_pillars_icon_idx' },
  { table: 'site_pages_blocks_knowledge_teasers_cards', column: 'image_id', indexName: 'site_pages_blocks_knowledge_teasers_cards_image_idx' },
  { table: 'site_pages_blocks_program_modules_modules', column: 'footer_image_id', indexName: 'site_pages_blocks_program_modules_modules_footer_image_idx' },
  { table: 'site_pages_blocks_rich_split', column: 'media_id', indexName: 'site_pages_blocks_rich_split_media_idx' },
  { table: 'site_pages_blocks_testimonials_home_items', column: 'avatar_id', indexName: 'site_pages_blocks_testimonials_home_items_avatar_idx' },
]

const TEXT_COLUMNS: { table: string; column: string }[] = [
  { table: 'homepage_blocks_testimonials_home_items', column: 'linkedin_link' },
  { table: 'site_pages_blocks_testimonials_home_items', column: 'linkedin_link' },
]

type Dialect = 'postgres' | 'sqlite'

const quote = (name: string, dialect: Dialect): string =>
  dialect === 'postgres' ? `"${name}"` : `\`${name}\``

async function exec(payload: { db: { name: string } }, db: unknown, query: string): Promise<void> {
  const dialect: Dialect = payload.db.name === 'postgres' ? 'postgres' : 'sqlite'
  const runner: ((q: ReturnType<typeof sql.raw>) => Promise<unknown>) =
    dialect === 'postgres'
      ? (db as { execute: (q: ReturnType<typeof sql.raw>) => Promise<unknown> }).execute.bind(db)
      : (db as { run: (q: ReturnType<typeof sql.raw>) => Promise<unknown> }).run.bind(db)
  await runner(sql.raw(query))
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === 'postgres' ? 'postgres' : 'sqlite'
  const q = (n: string) => quote(n, dialect)
  const ifNotExists = dialect === 'postgres' ? 'IF NOT EXISTS ' : ''

  for (const t of TEXT_COLUMNS) {
    await exec(payload, db, `ALTER TABLE ${q(t.table)} ADD COLUMN ${ifNotExists}${q(t.column)} text;`)
  }
  for (const c of ID_COLUMNS) {
    await exec(
      payload,
      db,
      `ALTER TABLE ${q(c.table)} ADD COLUMN ${ifNotExists}${q(c.column)} integer ` +
        `REFERENCES ${q('media')}(${q('id')}) ON UPDATE NO ACTION ON DELETE SET NULL;`,
    )
    await exec(payload, db, `CREATE INDEX IF NOT EXISTS ${q(c.indexName)} ON ${q(c.table)} (${q(c.column)});`)
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === 'postgres' ? 'postgres' : 'sqlite'
  const q = (n: string) => quote(n, dialect)

  for (const c of ID_COLUMNS) {
    await exec(payload, db, `DROP INDEX IF EXISTS ${q(c.indexName)};`)
    await exec(payload, db, `ALTER TABLE ${q(c.table)} DROP COLUMN ${q(c.column)};`)
  }
  for (const t of TEXT_COLUMNS) {
    await exec(payload, db, `ALTER TABLE ${q(t.table)} DROP COLUMN ${q(t.column)};`)
  }
}
