"""Removes the Payload `(name='dev', batch=-1)` baseline marker from
`payload_migrations`. Required after Payload has been run in push mode
once and you want subsequent `payload migrate` to run non-interactively
(without the "data loss will occur" prompt). Idempotent.

Usage:
  python cms/scripts/delete_dev_marker.py <db-path>
"""

from __future__ import annotations

import sqlite3
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) != 2:
        print("usage: delete_dev_marker.py <db-path>")
        sys.exit(2)

    db_path = Path(sys.argv[1])
    conn = sqlite3.connect(str(db_path))
    cur = conn.cursor()
    cur.execute("SELECT id, name, batch FROM payload_migrations ORDER BY id")
    print("before:", cur.fetchall())
    cur.execute("DELETE FROM payload_migrations WHERE batch = -1 AND name = 'dev'")
    print("deleted:", cur.rowcount)
    conn.commit()
    cur.execute("SELECT id, name, batch FROM payload_migrations ORDER BY id")
    print("after:", cur.fetchall())
    conn.close()


if __name__ == "__main__":
    main()
