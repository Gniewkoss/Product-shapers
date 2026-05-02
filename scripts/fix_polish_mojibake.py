"""
Reverse UTF-8 → Windows-1250 mojibake in Figma/PowerShell-sourced text.

Correct Polish was UTF-8; bytes were (mis)read as Windows-1250 code points, then
stored as those Unicode characters. Recovered by: segment.encode("cp1250").decode("utf-8")
Only apply to strings that look like mojibake, so already-correct UTF-8 is unchanged.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path


def looks_like_mojibake(s: str) -> bool:
    if not s or s.isascii():
        return False
    # Common Figma export damage (Latin letters + mojibake from cp1250 misread)
    if "Ĺ" in s or "Ă" in s:
        return True
    if "â€" in s or "Â»" in s or "Â«" in s or "Â" in s:
        return True
    for moj in ("â€“", "â€”", "â€ž", "â€ť", "â€™", "â€˘"):
        if moj in s:
            return True
    return False


def clean_controls(s: str) -> str:
    # Stray C1 (e.g. U+0081) from split UTF-8 — breaks cp1250 encode
    return s.replace("\u0081", "")


def fix_segment(s: str) -> str:
    s = clean_controls(s)
    if not looks_like_mojibake(s):
        return s
    try:
        return s.encode("cp1250").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


def process_jsx_text(content: str) -> str:
    """Replace `>TEXT</tag>` where TEXT has no `<` (flat leaves from Figma)."""

    def repl(m: re.Match[str]) -> str:
        inner = m.group(1)
        fixed = fix_segment(inner)
        if fixed == inner:
            return m.group(0)
        return f">{fixed}</{m.group(2)}>"

    # Most copy lives in these closing tags; order longer names first
    for tag in ("span", "h4", "h3", "h2", "h1", "button", "a", "li", "p", "div"):
        content = re.sub(rf">([^<]+)</({re.escape(tag)})>", repl, content)
    return content


def process_backtick_templates(content: str) -> str:
    """Fix `{`…`}` static strings in JSX (no `${`)."""

    def repl(m: re.Match[str]) -> str:
        inner = m.group(1)
        if "${" in inner:
            return m.group(0)
        fixed = fix_segment(inner)
        if fixed == inner:
            return m.group(0)
        return "{`" + fixed + "`}"

    return re.sub(r"\{`([^`]+)`\}", repl, content)


def process_quoted_copies(content: str) -> str:
    """Double-quoted UI strings in TS (e.g. long FAQ paragraphs). Single-line only."""

    def repl(m: re.Match[str]) -> str:
        inner = m.group(1)
        if "\\" in inner and not looks_like_mojibake(inner):
            return m.group(0)
        fixed = fix_segment(inner)
        if fixed == inner:
            return m.group(0)
        return '"' + fixed.replace("\\", "\\\\").replace('"', '\\"') + '"'

    # Only run on strings that still look broken
    return re.sub(r'"((?:[^"\\]|\\.)*Ĺ[^"]*)"', repl, content) if "Ĺ" in content else content


def fix_mixed_mojibake(path: Path) -> bool:
    """Hand fixes when UTF-8 bytes were merged with a stray control (e.g. U+0081) so cp1250 round-trip cannot run."""
    name = path.name
    t = path.read_text(encoding="utf-8-sig")
    orig = t
    if name == "SzkoleniaMain.tsx":
        old = "06 MODU" + "\u0139" + "\u0102" + "\u201c" + "W / 12 TYGODNI"
        if old in t:
            t = t.replace(old, "06 MODUŁÓW / 12 TYGODNI", 1)
    if name == "HomeMain.tsx":
        l_old = "Lider" + "\u0102" + "\u0142" + "w"
        if l_old in t:
            t = t.replace(l_old, "Liderów", 1)
        for m in re.finditer(r'<p className="leading-\[25px\]">([^<]+)</p>', t):
            s = m.group(1)
            if s and s[0] == "\u0139" and "ponad 20 lat" in s:
                good = (
                    "Łączę ponad 20 lat doświadczenia w budowaniu produktów z unikalnym wglądem w procesy czołowych firm. Dzięki "
                    "aktywnemu udziałowi w społeczności produktowej mam dostęp do szerokiego benchmarku rynkowego, co pozwala "
                    "wdrażać rozwiązania sprawdzone w praktyce."
                )
                t = t.replace(
                    f'<p className="leading-[25px]">{s}</p>',
                    f'<p className="leading-[25px]">{good}</p>',
                    1,
                )
                break
    if t != orig:
        path.write_text(t, encoding="utf-8")
        return True
    return False


def process_file(path: Path) -> bool:
    raw = path.read_text(encoding="utf-8-sig")
    if not any(
        x in raw
        for x in (
            "Ĺ",
            "Ă",
            "â€",
            "Â»",
            "Â«",
        )
    ):
        return False
    n = raw
    n = process_jsx_text(n)
    n = process_backtick_templates(n)
    if "Ĺ" in n:
        n = process_quoted_copies(n)
    if n == raw:
        return False
    path.write_text(n, encoding="utf-8")
    return True


def main() -> int:
    root = Path(__file__).resolve().parent.parent / "src"
    targets = list(root.rglob("*.tsx")) + list(root.rglob("*.ts"))
    changed = 0
    for p in sorted(targets):
        if "node_modules" in p.parts or p.name == "vite-env.d.ts":
            continue
        try:
            if process_file(p):
                print("fixed:", p.relative_to(root.parent))
                changed += 1
        except Exception as e:  # noqa: BLE001
            print("error:", p, e, file=sys.stderr)
            return 1
    # Pass 2: strings where cp1250 cannot recover (mixed mojibake)
    for p in (root / "pages/HomeMain.tsx", root / "pages/SzkoleniaMain.tsx"):
        if p.is_file() and fix_mixed_mojibake(p):
            print("mixed-fix:", p.relative_to(root.parent))
            changed += 1
    print("done, files changed (total passes):", changed)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
