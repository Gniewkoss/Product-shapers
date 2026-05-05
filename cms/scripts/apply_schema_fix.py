"""Apply the schema-recovery migration directly via sqlite3 in a single
transaction, then mark the corresponding Payload migration row as run.

Mirrors `cms/src/migrations/20260505_174545.ts`. Idempotent: skips columns
that already exist (re-runs are no-ops). Non-interactive; safe under PowerShell.

Usage:
  python cms/scripts/apply_schema_fix.py <db-path> [migration-name]

If `payload_migrations` row already exists for the migration name, we skip
re-inserting (so this can also be used to re-mark a partially-applied DB)."""

from __future__ import annotations

import sqlite3
import sys
import time
from pathlib import Path
from typing import List, Tuple

ID_COLUMNS: List[Tuple[str, str, str]] = [
    ("homepage_blocks_feature_columns3_columns", "icon_id", "homepage_blocks_feature_columns3_columns_icon_idx"),
    ("homepage_blocks_founder_spotlight", "portrait_image_id", "homepage_blocks_founder_spotlight_portrait_image_idx"),
    ("homepage_blocks_industry_pillars_pillars", "icon_id", "homepage_blocks_industry_pillars_pillars_icon_idx"),
    ("homepage_blocks_knowledge_teasers_cards", "image_id", "homepage_blocks_knowledge_teasers_cards_image_idx"),
    ("homepage_blocks_program_modules_modules", "footer_image_id", "homepage_blocks_program_modules_modules_footer_image_idx"),
    ("homepage_blocks_rich_split", "media_id", "homepage_blocks_rich_split_media_idx"),
    ("homepage_blocks_testimonials_home_items", "avatar_id", "homepage_blocks_testimonials_home_items_avatar_idx"),
    ("site_pages_blocks_feature_columns3_columns", "icon_id", "site_pages_blocks_feature_columns3_columns_icon_idx"),
    ("site_pages_blocks_founder_spotlight", "portrait_image_id", "site_pages_blocks_founder_spotlight_portrait_image_idx"),
    ("site_pages_blocks_industry_pillars_pillars", "icon_id", "site_pages_blocks_industry_pillars_pillars_icon_idx"),
    ("site_pages_blocks_knowledge_teasers_cards", "image_id", "site_pages_blocks_knowledge_teasers_cards_image_idx"),
    ("site_pages_blocks_program_modules_modules", "footer_image_id", "site_pages_blocks_program_modules_modules_footer_image_idx"),
    ("site_pages_blocks_rich_split", "media_id", "site_pages_blocks_rich_split_media_idx"),
    ("site_pages_blocks_testimonials_home_items", "avatar_id", "site_pages_blocks_testimonials_home_items_avatar_idx"),
]

TEXT_COLUMNS: List[Tuple[str, str]] = [
    ("homepage_blocks_testimonials_home_items", "linkedin_link"),
    ("site_pages_blocks_testimonials_home_items", "linkedin_link"),
]


def column_exists(cur: sqlite3.Cursor, table: str, column: str) -> bool:
    cur.execute(f"PRAGMA table_info(`{table}`)")
    return any(row[1] == column for row in cur.fetchall())


def index_exists(cur: sqlite3.Cursor, name: str) -> bool:
    cur.execute("SELECT 1 FROM sqlite_master WHERE type='index' AND name=?", (name,))
    return cur.fetchone() is not None


def main() -> None:
    if len(sys.argv) < 2:
        print("usage: apply_schema_fix.py <db-path> [migration-name]")
        sys.exit(2)

    db_path = Path(sys.argv[1])
    migration_name = sys.argv[2] if len(sys.argv) > 2 else "20260505_174545"

    conn = sqlite3.connect(str(db_path))
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys = OFF;")

    added_text = 0
    skipped_text = 0
    added_id = 0
    skipped_id = 0
    added_idx = 0
    skipped_idx = 0

    cur.execute("BEGIN IMMEDIATE;")
    try:
        for table, column in TEXT_COLUMNS:
            if column_exists(cur, table, column):
                skipped_text += 1
                continue
            cur.execute(f"ALTER TABLE `{table}` ADD COLUMN `{column}` text;")
            added_text += 1

        for table, column, _ in ID_COLUMNS:
            if column_exists(cur, table, column):
                skipped_id += 1
                continue
            cur.execute(
                f"ALTER TABLE `{table}` ADD COLUMN `{column}` integer "
                f"REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null;"
            )
            added_id += 1

        for table, column, idx in ID_COLUMNS:
            if index_exists(cur, idx):
                skipped_idx += 1
                continue
            cur.execute(f"CREATE INDEX `{idx}` ON `{table}` (`{column}`);")
            added_idx += 1

        cur.execute("CREATE TABLE IF NOT EXISTS `payload_migrations` ("
                    "`id` integer PRIMARY KEY NOT NULL,"
                    "`name` text,"
                    "`batch` numeric,"
                    "`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,"
                    "`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL"
                    ");")
        cur.execute("SELECT COUNT(*) FROM `payload_migrations` WHERE name=?", (migration_name,))
        already_logged = cur.fetchone()[0] > 0
        if not already_logged:
            now = time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime())
            cur.execute(
                "INSERT INTO `payload_migrations` (`name`, `batch`, `updated_at`, `created_at`) VALUES (?, 1, ?, ?)",
                (migration_name, now, now),
            )

        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

    print(f"text columns: added={added_text} skipped_existing={skipped_text}")
    print(f"id columns:   added={added_id}   skipped_existing={skipped_id}")
    print(f"indexes:      added={added_idx}  skipped_existing={skipped_idx}")
    print(f"migration row '{migration_name}': {'logged' if not already_logged else 'already-logged'}")


if __name__ == "__main__":
    main()
