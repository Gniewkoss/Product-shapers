"""Compare current SQLite DB schema vs the schema declared in a Payload-generated migration file.

Reads CREATE TABLE statements from the migration file and reports per-table:
  - tables expected but missing in DB
  - columns expected but missing in DB (per existing table)

Read-only against the DB. Used during Stage 1 schema-recovery."""

from __future__ import annotations

import re
import sqlite3
import sys
from pathlib import Path
from typing import Dict, List, Tuple


CREATE_TABLE_RE = re.compile(
    r"CREATE TABLE \\`(?P<name>[^`\\]+)\\`\s*\((?P<body>.+?)\);",
    re.DOTALL,
)


def parse_columns(body: str) -> List[str]:
    """Extract column names from a CREATE TABLE body. Skips constraints (FOREIGN KEY/UNIQUE/etc)."""
    cols: List[str] = []
    for raw_line in body.split("\n"):
        line = raw_line.strip().strip(",")
        if not line:
            continue
        upper = line.upper()
        if upper.startswith(("FOREIGN KEY", "PRIMARY KEY", "UNIQUE", "CHECK", "CONSTRAINT")):
            continue
        match = re.match(r"\\`([^`\\]+)\\`", line)
        if match:
            cols.append(match.group(1))
    return cols


def expected_schema(migration_path: Path) -> Dict[str, List[str]]:
    text = migration_path.read_text(encoding="utf-8")
    tables: Dict[str, List[str]] = {}
    for match in CREATE_TABLE_RE.finditer(text):
        name = match.group("name")
        cols = parse_columns(match.group("body"))
        tables[name] = cols
    return tables


def actual_schema(db_path: Path) -> Dict[str, List[str]]:
    conn = sqlite3.connect(str(db_path))
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
    table_names = [row[0] for row in cur.fetchall()]
    schema: Dict[str, List[str]] = {}
    for table in table_names:
        cur.execute(f"PRAGMA table_info(`{table}`)")
        schema[table] = [row[1] for row in cur.fetchall()]
    conn.close()
    return schema


def diff(expected: Dict[str, List[str]], actual: Dict[str, List[str]]) -> Tuple[List[str], List[str], Dict[str, List[str]]]:
    expected_tables = set(expected.keys())
    actual_tables = set(actual.keys())

    missing_tables = sorted(expected_tables - actual_tables)
    extra_tables = sorted(actual_tables - expected_tables)

    missing_cols: Dict[str, List[str]] = {}
    for table in sorted(expected_tables & actual_tables):
        exp = expected[table]
        act = set(actual[table])
        miss = [c for c in exp if c not in act]
        if miss:
            missing_cols[table] = miss

    return missing_tables, extra_tables, missing_cols


def main() -> None:
    if len(sys.argv) != 3:
        print("usage: schema_diff.py <db-path> <migration-file>")
        sys.exit(2)

    db_path = Path(sys.argv[1])
    mig_path = Path(sys.argv[2])

    expected = expected_schema(mig_path)
    actual = actual_schema(db_path)

    missing_tables, extra_tables, missing_cols = diff(expected, actual)

    print(f"expected_tables: {len(expected)}")
    print(f"actual_tables:   {len(actual)}")
    print(f"missing_tables:  {len(missing_tables)}")
    for t in missing_tables:
        print(f"  - {t}")
    print(f"extra_tables_in_db_only: {len(extra_tables)}")
    for t in extra_tables:
        print(f"  + {t}")
    print(f"tables_with_missing_columns: {len(missing_cols)}")
    for t, cols in missing_cols.items():
        print(f"  {t}:")
        for c in cols:
            print(f"    - {c}")


if __name__ == "__main__":
    main()
