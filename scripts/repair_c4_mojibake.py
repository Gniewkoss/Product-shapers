"""Fix remaining mojibake: UTF-8 Polish bytes read as two Windows-1250-like code points (e.g. U+00C4 + U+2122 for ę)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

# Leading bytes that, as two mojibake chars, may reverse via cp1250
PREFIX = frozenset({"\u00c4", "\u00c3", "\u00c5", "\u00c2", "\u00c1", "\u00c6", "\u00c7"})


def try_pair(s2: str) -> str | None:
    if len(s2) != 2:
        return None
    for enc in ("cp1250", "cp1252", "iso-8859-2"):
        try:
            b = s2.encode(enc)
        except (UnicodeEncodeError, LookupError):
            continue
        try:
            out = b.decode("utf-8")
        except UnicodeDecodeError:
            continue
        if len(out) == 1 and s2 != out:
            return out
    return None


def repair_string(text: str) -> str:
    if not any(p in text for p in PREFIX):
        return text
    out: list[str] = []
    i = 0
    n = len(text)
    while i < n:
        if i + 1 < n and text[i] in PREFIX:
            t = try_pair(text[i : i + 2])
            if t is not None and len(t) == 1:
                out.append(t)
                i += 2
                continue
        out.append(text[i])
        i += 1
    return "".join(out)


def main() -> int:
    root = Path(__file__).resolve().parent.parent / "src"
    changed = 0
    for path in sorted(root.rglob("*.tsx")):
        raw = path.read_text(encoding="utf-8-sig")
        fixed = repair_string(raw)
        if fixed != raw:
            path.write_text(fixed, encoding="utf-8")
            print("repaired", path.relative_to(root.parent))
            changed += 1
    print("files:", changed)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
