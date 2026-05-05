-- Read-only Postgres inspection. Used during Stage 2 schema-recovery.
-- Reports total tables, presence of expected upload-relation columns,
-- payload_migrations state, and row counts for key collections.

\echo === tables count ===
SELECT count(*) AS total_tables
FROM information_schema.tables
WHERE table_schema = 'public';

\echo === expected columns presence ===
WITH expected(t, c) AS (VALUES
  ('homepage_blocks_feature_columns3_columns', 'icon_id'),
  ('homepage_blocks_founder_spotlight', 'portrait_image_id'),
  ('homepage_blocks_industry_pillars_pillars', 'icon_id'),
  ('homepage_blocks_knowledge_teasers_cards', 'image_id'),
  ('homepage_blocks_program_modules_modules', 'footer_image_id'),
  ('homepage_blocks_rich_split', 'media_id'),
  ('homepage_blocks_testimonials_home_items', 'avatar_id'),
  ('homepage_blocks_testimonials_home_items', 'linkedin_link'),
  ('site_pages_blocks_feature_columns3_columns', 'icon_id'),
  ('site_pages_blocks_founder_spotlight', 'portrait_image_id'),
  ('site_pages_blocks_industry_pillars_pillars', 'icon_id'),
  ('site_pages_blocks_knowledge_teasers_cards', 'image_id'),
  ('site_pages_blocks_program_modules_modules', 'footer_image_id'),
  ('site_pages_blocks_rich_split', 'media_id'),
  ('site_pages_blocks_testimonials_home_items', 'avatar_id'),
  ('site_pages_blocks_testimonials_home_items', 'linkedin_link')
)
SELECT
  e.t AS table_name,
  e.c AS column_name,
  CASE WHEN ic.column_name IS NULL THEN 'MISSING' ELSE 'present' END AS status
FROM expected e
LEFT JOIN information_schema.columns ic
  ON ic.table_schema = 'public' AND ic.table_name = e.t AND ic.column_name = e.c
ORDER BY status DESC, e.t, e.c;

\echo === payload_migrations ===
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name = 'payload_migrations'
) AS payload_migrations_exists;

SELECT id, name, batch, created_at, updated_at
FROM payload_migrations
ORDER BY id;

\echo === row counts for key collections ===
SELECT 'articles' AS table_name, count(*) AS rows FROM articles
UNION ALL SELECT 'media', count(*) FROM media
UNION ALL SELECT 'case_studies', count(*) FROM case_studies
UNION ALL SELECT 'site_pages', count(*) FROM site_pages
UNION ALL SELECT 'homepage', count(*) FROM homepage
UNION ALL SELECT 'footer', count(*) FROM footer
UNION ALL SELECT 'authors', count(*) FROM authors
UNION ALL SELECT 'users', count(*) FROM users;
