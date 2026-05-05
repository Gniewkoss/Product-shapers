/**
 * Logical export of key Payload collection tables from production Postgres
 * to local JSON files. Read-only against the DB.
 *
 * Captures FULL row contents for tables we care about during Stage 2:
 *   - core docs: articles, site_pages, homepage, footer, navigation, seo_defaults
 *   - identities: users, authors
 *   - relations: articles_rels, homepage_rels, articles_sections,
 *     case_studies, case_studies_tags
 *   - migration ledger: payload_migrations
 *
 * Output:
 *   cms/backup-prod-logical-<stamp>/<table>.json    (array of rows)
 *   cms/backup-prod-logical-<stamp>/_meta.json      (counts, schema list)
 *
 * Usage:
 *   node cms/scripts/dump_pg_logical.mjs <connection-string>
 */

import fs from 'node:fs'
import path from 'node:path'
import pg from '../node_modules/pg/lib/index.js'

const TABLES = [
  'users',
  'authors',
  'articles',
  'articles_rels',
  'articles_sections',
  'articles_blocks_article_section',
  'articles_blocks_comparison_table',
  'articles_blocks_comparison_table_columns',
  'articles_blocks_comparison_table_rows',
  'articles_blocks_comparison_table_rows_cells',
  'case_studies',
  'case_studies_tags',
  'media',
  'site_pages',
  'homepage',
  'homepage_rels',
  'footer',
  'footer_columns',
  'footer_columns_items',
  'footer_footer_links',
  'navigation',
  'navigation_links',
  'seo_defaults',
  'payload_migrations',
  'payload_preferences',
  'payload_kv',
]

async function main() {
  const uri = process.argv[2]
  if (!uri) {
    console.error('usage: node dump_pg_logical.mjs <connection-string>')
    process.exit(2)
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outDir = path.join(process.cwd(), 'cms', `backup-prod-logical-${stamp}`)
  fs.mkdirSync(outDir, { recursive: true })

  const client = new pg.Client({ connectionString: uri, ssl: { rejectUnauthorized: false } })
  await client.connect()

  const counts = {}
  const errors = {}

  for (const table of TABLES) {
    try {
      const { rows } = await client.query(`SELECT * FROM "${table}" ORDER BY 1`)
      counts[table] = rows.length
      fs.writeFileSync(
        path.join(outDir, `${table}.json`),
        JSON.stringify(rows, null, 2),
      )
    } catch (err) {
      errors[table] = err.message
      counts[table] = null
    }
  }

  fs.writeFileSync(
    path.join(outDir, '_meta.json'),
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        tables: TABLES,
        counts,
        errors,
      },
      null,
      2,
    ),
  )

  await client.end()

  let total = 0
  for (const [t, n] of Object.entries(counts)) {
    if (n != null) total += n
  }
  console.log(`Wrote ${TABLES.length} files to ${outDir}`)
  console.log('Counts:')
  for (const [t, n] of Object.entries(counts)) {
    const errMark = errors[t] ? ` ERROR: ${errors[t]}` : ''
    console.log(`  ${t}: ${n ?? 'n/a'}${errMark}`)
  }
  console.log(`Total rows captured: ${total}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
