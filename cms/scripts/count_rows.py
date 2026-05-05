"""Read-only row counts for key collections in a SQLite Payload DB. Used as part of the schema-safe recovery plan (Stage 1)."""

from __future__ import annotations

import sqlite3
import sys


def main() -> None:
    if len(sys.argv) != 2:
        print("usage: count_rows.py <path-to-sqlite-db>")
        sys.exit(2)

    db_path = sys.argv[1]
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM sqlite_master WHERE type='table'")
    print("tables:", cur.fetchone()[0])

    for table in ("articles", "media", "case_studies", "site_pages", "homepage", "footer"):
        try:
            cur.execute(f"SELECT count(*) FROM {table}")
            print(f"{table} rows:", cur.fetchone()[0])
        except sqlite3.OperationalError as exc:
            print(f"{table} rows: error ({exc})")

    conn.close()


if __name__ == "__main__":
    main()
