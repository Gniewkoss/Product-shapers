import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Schema-recovery migration: adds upload-relation columns and one text field
 * that were declared in `payload.config` blocks but were missing from the
 * underlying SQLite schema (DB had been pushed before those fields existed,
 * and `PAYLOAD_DATABASE_PUSH` is now disabled). All added columns are nullable,
 * so existing rows remain valid.
 *
 * Targets:
 *   - homepage_blocks_feature_columns3_columns.icon_id (FK media)
 *   - homepage_blocks_industry_pillars_pillars.icon_id (FK media)
 *   - homepage_blocks_knowledge_teasers_cards.image_id (FK media)
 *   - homepage_blocks_program_modules_modules.footer_image_id (FK media)
 *   - homepage_blocks_founder_spotlight.portrait_image_id (FK media)
 *   - homepage_blocks_rich_split.media_id (FK media)
 *   - homepage_blocks_testimonials_home_items.linkedin_link (text), avatar_id (FK media)
 *   - and the same 7 columns mirrored on `site_pages_blocks_*` tables
 *
 * SQLite ADD COLUMN cannot embed FOREIGN KEY clauses, so FK enforcement is
 * application-level (Payload doesn't rely on DB-side FKs anyway). Indexes are
 * created for each new *_id column to match the schema produced by Drizzle.
 */

type IdColumnSpec = { table: string; column: string; indexName: string };

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
];

const TEXT_COLUMNS: { table: string; column: string }[] = [
  { table: 'homepage_blocks_testimonials_home_items', column: 'linkedin_link' },
  { table: 'site_pages_blocks_testimonials_home_items', column: 'linkedin_link' },
];

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const t of TEXT_COLUMNS) {
    await db.run(sql.raw(`ALTER TABLE \`${t.table}\` ADD COLUMN \`${t.column}\` text;`));
  }
  for (const c of ID_COLUMNS) {
    await db.run(sql.raw(`ALTER TABLE \`${c.table}\` ADD COLUMN \`${c.column}\` integer REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null;`));
    await db.run(sql.raw(`CREATE INDEX \`${c.indexName}\` ON \`${c.table}\` (\`${c.column}\`);`));
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const c of ID_COLUMNS) {
    await db.run(sql.raw(`DROP INDEX IF EXISTS \`${c.indexName}\`;`));
    await db.run(sql.raw(`ALTER TABLE \`${c.table}\` DROP COLUMN \`${c.column}\`;`));
  }
  for (const t of TEXT_COLUMNS) {
    await db.run(sql.raw(`ALTER TABLE \`${t.table}\` DROP COLUMN \`${t.column}\`;`));
  }
}
