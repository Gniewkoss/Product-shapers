import { sql } from 'drizzle-orm'

/**
 * Adds optional link/CTA fields to the Footer global so the admin can wire
 * each footer entry to a real URL:
 *   - footer_columns_items.url, footer_columns_items.open_in_new_tab
 *     (kolumna z linkami w 4 kolumnach footera)
 *   - footer.linkedin_label, footer.linkedin_open_in_new_tab
 *     (etykieta + behaviour przycisku LinkedIn)
 *   - footer.primary_cta_label, footer.primary_cta_url, footer.primary_cta_open_in_new_tab
 *     (główny CTA button w footerze)
 *
 * Cross-dialect (Postgres + SQLite) following 20260505_174545.ts pattern:
 * inline-typed args, runtime adapter detection via `payload.db.name`,
 * Postgres uses ADD COLUMN IF NOT EXISTS for idempotency, SQLite relies on
 * Payload's migration registry to run each migration only once.
 */

type MigrateArgs = {
  db: unknown
  payload: { db: { name: string } }
}
type MigrateUpArgs = MigrateArgs
type MigrateDownArgs = MigrateArgs

type Dialect = 'postgres' | 'sqlite'

const TEXT_COLUMNS: { table: string; column: string }[] = [
  { table: 'footer_columns_items', column: 'url' },
  { table: 'footer', column: 'linkedin_label' },
  { table: 'footer', column: 'primary_cta_label' },
  { table: 'footer', column: 'primary_cta_url' },
]

const BOOL_COLUMNS: { table: string; column: string; default: boolean }[] = [
  { table: 'footer_columns_items', column: 'open_in_new_tab', default: false },
  { table: 'footer', column: 'linkedin_open_in_new_tab', default: true },
  { table: 'footer', column: 'primary_cta_open_in_new_tab', default: false },
]

const quote = (name: string, dialect: Dialect): string =>
  dialect === 'postgres' ? `"${name}"` : `\`${name}\``

const boolType = (dialect: Dialect): string =>
  dialect === 'postgres' ? 'boolean' : 'integer'

const boolDefault = (value: boolean, dialect: Dialect): string => {
  if (dialect === 'postgres') return value ? 'true' : 'false'
  return value ? '1' : '0'
}

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

  for (const c of TEXT_COLUMNS) {
    await exec(payload, db, `ALTER TABLE ${q(c.table)} ADD COLUMN ${ifNotExists}${q(c.column)} text;`)
  }
  for (const c of BOOL_COLUMNS) {
    await exec(
      payload,
      db,
      `ALTER TABLE ${q(c.table)} ADD COLUMN ${ifNotExists}${q(c.column)} ${boolType(dialect)} DEFAULT ${boolDefault(c.default, dialect)};`,
    )
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === 'postgres' ? 'postgres' : 'sqlite'
  const q = (n: string) => quote(n, dialect)

  for (const c of [...BOOL_COLUMNS, ...TEXT_COLUMNS]) {
    await exec(payload, db, `ALTER TABLE ${q(c.table)} DROP COLUMN ${q(c.column)};`)
  }
}
