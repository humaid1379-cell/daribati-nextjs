#!/usr/bin/env python3
"""
Tool 2: Arabic Content Linter
==============================
Checks all .tsx/.ts files for common Arabic typos using a dictionary
of known misspellings. Fails the build if typos are found.

Usage:
    python3 scripts/arabic-linter.py [--fix] [--path src/]

Exit codes:
    0 - No typos found
    1 - Typos found (build should fail)
"""

import json
import os
import re
import sys
from pathlib import Path

# Common Arabic misspellings dictionary
# Format: { "wrong": "correct" }
ARABIC_TYPOS = {
    "المثدئ": "المبتدئ",
    "المبتدأ": "المبتدئ",
    "الأحتراف": "الاحتراف",
    "إحتراف": "احتراف",
    "الإحتراف": "الاحتراف",
    "أستخدام": "استخدام",
    "الأستخدام": "الاستخدام",
    "إستخدام": "استخدام",
    "الإستخدام": "الاستخدام",
    "أستراتيجية": "استراتيجية",
    "إستراتيجية": "استراتيجية",
    "أستثمار": "استثمار",
    "إستثمار": "استثمار",
    "أنشاء": "إنشاء",
    "الأنشاء": "الإنشاء",
    "أختيار": "اختيار",
    "الأختيار": "الاختيار",
    "إختيار": "اختيار",
    "الإختيار": "الاختيار",
    "أكتشاف": "اكتشاف",
    "إكتشاف": "اكتشاف",
    "أنتقال": "انتقال",
    "إنتقال": "انتقال",
    "أحترافي": "احترافي",
    "إحترافي": "احترافي",
    "أسأل": "اسأل",
    "تعليمى": "تعليمي",
    "مجانى": "مجاني",
    "أساسى": "أساسي",
    "عربى": "عربي",
    "إلكترونى": "إلكتروني",
    "تطبيقى": "تطبيقي",
    "عملى": "عملي",
    "نظرى": "نظري",
    "شخصى": "شخصي",
    "رقمى": "رقمي",
    "ذكى": "ذكي",
    "تفاعلى": "تفاعلي",
    "إبداعى": "إبداعي",
    "مبتدىء": "مبتدئ",
    "مبتدأ": "مبتدئ",
    "الذى": "الذي",
    "اللذى": "الذي",
    "هاذا": "هذا",
    "هاذه": "هذه",
    "ضربة": "ضربة",
    "لاكن": "لكن",
    "إنة": "إنه",
    "أنة": "أنه",
    "لاكنه": "لكنه",
    "بإمكانية": "بإمكانه",
    "سوى": "سوى",
}


def load_custom_dictionary():
    """Load additional typos from external dictionary file if exists."""
    dict_path = Path(__file__).parent / "arabic-dictionary.json"
    if dict_path.exists():
        try:
            with open(dict_path, "r", encoding="utf-8") as f:
                custom = json.load(f)
                if isinstance(custom, dict):
                    return custom
        except (json.JSONDecodeError, IOError) as e:
            print(f"  Warning: Could not load {dict_path}: {e}")
    return {}


def extract_arabic_text(content):
    """Extract Arabic text segments from source code (strings, JSX content)."""
    # Match content in quotes (single, double, backtick)
    patterns = [
        r'"([^"]*[\u0600-\u06FF][^"]*)"',  # Double-quoted strings with Arabic
        r"'([^']*[\u0600-\u06FF][^']*)'",  # Single-quoted strings with Arabic
        r"`([^`]*[\u0600-\u06FF][^`]*)`",  # Template literals with Arabic
        r">([^<]*[\u0600-\u06FF][^<]*)<",  # JSX text content with Arabic
    ]
    segments = []
    for pattern in patterns:
        segments.extend(re.findall(pattern, content))
    return segments


def check_file(filepath, typo_dict):
    """Check a single file for Arabic typos. Returns list of findings."""
    findings = []
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
    except (IOError, UnicodeDecodeError):
        return findings

    for line_num, line in enumerate(lines, 1):
        # Skip comments and imports
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("import "):
            continue

        for wrong, correct in typo_dict.items():
            if wrong in line:
                col = line.index(wrong) + 1
                findings.append({
                    "file": str(filepath),
                    "line": line_num,
                    "column": col,
                    "wrong": wrong,
                    "correct": correct,
                    "context": stripped[:100],
                })
    return findings


def main():
    # Parse arguments
    fix_mode = "--fix" in sys.argv
    search_path = "src/"

    for arg in sys.argv[1:]:
        if arg.startswith("--path"):
            idx = sys.argv.index(arg)
            if idx + 1 < len(sys.argv):
                search_path = sys.argv[idx + 1]
        elif not arg.startswith("--"):
            search_path = arg

    # Build complete typo dictionary
    typo_dict = {**ARABIC_TYPOS, **load_custom_dictionary()}

    print("=" * 60)
    print("  Arabic Content Linter")
    print("=" * 60)
    print(f"  Search path: {search_path}")
    print(f"  Dictionary size: {len(typo_dict)} known misspellings")
    print(f"  Mode: {'Fix' if fix_mode else 'Check'}")
    print("=" * 60)
    print()

    # Find all .ts and .tsx files
    search_root = Path(search_path)
    if not search_root.exists():
        print(f"  Warning: Path '{search_path}' does not exist.")
        print("  Checking current directory...")
        search_root = Path(".")

    files_checked = 0
    all_findings = []

    for ext in ["*.ts", "*.tsx"]:
        for filepath in search_root.rglob(ext):
            # Skip node_modules and .next
            if "node_modules" in str(filepath) or ".next" in str(filepath):
                continue
            files_checked += 1
            findings = check_file(filepath, typo_dict)
            all_findings.extend(findings)

    # Report results
    if all_findings:
        print(f"❌ Found {len(all_findings)} Arabic typo(s) in {files_checked} files:\n")

        # Group by file
        by_file = {}
        for f in all_findings:
            by_file.setdefault(f["file"], []).append(f)

        for filepath, findings in by_file.items():
            print(f"  📄 {filepath}")
            for f in findings:
                print(f"     Line {f['line']}:{f['column']} - '{f['wrong']}' → '{f['correct']}'")
                # GitHub Actions annotation format
                print(f"::error file={f['file']},line={f['line']},col={f['column']}::Arabic typo: '{f['wrong']}' should be '{f['correct']}'")
            print()

        if fix_mode:
            print("\n🔧 Applying fixes...")
            for filepath, findings in by_file.items():
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()
                    for finding in findings:
                        content = content.replace(finding["wrong"], finding["correct"])
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"  ✅ Fixed: {filepath}")
                except IOError as e:
                    print(f"  ❌ Could not fix {filepath}: {e}")
            print("\nFixes applied. Please review changes before committing.")
            sys.exit(0)

        print(f"\nTotal: {len(all_findings)} typo(s) in {len(by_file)} file(s)")
        print("Run with --fix to automatically correct these typos.")
        sys.exit(1)
    else:
        print(f"✅ No Arabic typos found in {files_checked} files.")
        sys.exit(0)


if __name__ == "__main__":
    main()
