#!/usr/bin/env python3
"""
Arabic Spell Check for Daribati Codebase
=========================================
Checks Arabic text in the codebase against a known-good dictionary.
Reports any unknown Arabic words that may be typos.

Usage:
  python3 scripts/arabic-spellcheck.py [--strict] [--update-dict]

Options:
  --strict       Exit with error code 1 if unknown words are found
  --update-dict  Add all found words to the dictionary (use after manual review)
"""
import re
import os
import sys
import json

# Configuration
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
DICT_FILE = os.path.join(PROJECT_ROOT, "scripts", "arabic-dictionary.json")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")

# Arabic Unicode ranges
ARABIC_PATTERN = re.compile(
    r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+'
)

# Common Arabic typo patterns (wrong character substitutions)
COMMON_TYPOS = {
    "ة": "ه",   # ta marbuta vs ha
    "ى": "ي",   # alef maqsura vs ya
    "أ": "ا",   # hamza on alef vs plain alef
    "إ": "ا",   # hamza below alef vs plain alef
    "آ": "ا",   # madda vs plain alef
}

def load_dictionary():
    """Load the approved Arabic dictionary."""
    if os.path.exists(DICT_FILE):
        with open(DICT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return set(data.get("words", []))
    return set()

def save_dictionary(words):
    """Save the dictionary."""
    data = {
        "description": "Approved Arabic words for daribati.ae spell checking",
        "version": "1.0.0",
        "words": sorted(list(words))
    }
    with open(DICT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def extract_arabic_from_file(filepath):
    """Extract Arabic words from a file with line numbers."""
    results = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                words = ARABIC_PATTERN.findall(line)
                for word in words:
                    # Skip single characters and common particles
                    if len(word) >= 2:
                        results.append((word, line_num, line.strip()))
    except (UnicodeDecodeError, IOError):
        pass
    return results

def normalize_arabic(word):
    """Normalize Arabic text for comparison (remove diacritics, normalize hamza)."""
    # Remove tashkeel (diacritics)
    diacritics = re.compile(r'[\u064B-\u065F\u0670]')
    normalized = diacritics.sub('', word)
    return normalized

def find_similar_words(word, dictionary, max_distance=1):
    """Find similar words in dictionary (simple edit distance)."""
    suggestions = []
    normalized_word = normalize_arabic(word)
    for dict_word in dictionary:
        normalized_dict = normalize_arabic(dict_word)
        if abs(len(normalized_word) - len(normalized_dict)) <= max_distance:
            # Simple character difference count
            diff = sum(1 for a, b in zip(normalized_word, normalized_dict) if a != b)
            diff += abs(len(normalized_word) - len(normalized_dict))
            if 0 < diff <= max_distance:
                suggestions.append(dict_word)
    return suggestions[:5]

def main():
    strict_mode = "--strict" in sys.argv
    update_mode = "--update-dict" in sys.argv

    dictionary = load_dictionary()
    print(f"📖 Loaded dictionary with {len(dictionary)} words")

    # Scan source files
    all_words = {}  # word -> [(file, line_num, context)]
    extensions = ('.tsx', '.ts', '.css', '.json', '.md')

    for dirpath, dirnames, filenames in os.walk(SRC_DIR):
        # Skip node_modules and .next
        dirnames[:] = [d for d in dirnames if d not in ('node_modules', '.next', '.git')]
        for fname in filenames:
            if fname.endswith(extensions):
                filepath = os.path.join(dirpath, fname)
                results = extract_arabic_from_file(filepath)
                for word, line_num, context in results:
                    rel_path = os.path.relpath(filepath, PROJECT_ROOT)
                    if word not in all_words:
                        all_words[word] = []
                    all_words[word].append((rel_path, line_num, context))

    print(f"🔍 Found {len(all_words)} unique Arabic words in codebase")

    # Check against dictionary
    unknown_words = {}
    for word, locations in all_words.items():
        if word not in dictionary and normalize_arabic(word) not in {normalize_arabic(w) for w in dictionary}:
            unknown_words[word] = locations

    if update_mode:
        # Add all found words to dictionary
        dictionary.update(all_words.keys())
        save_dictionary(dictionary)
        print(f"✅ Dictionary updated with {len(all_words)} words (total: {len(dictionary)})")
        return 0

    if unknown_words:
        print(f"\n⚠️  Found {len(unknown_words)} words not in dictionary:\n")
        for word, locations in sorted(unknown_words.items()):
            suggestions = find_similar_words(word, dictionary)
            loc = locations[0]
            print(f"  ❓ '{word}' in {loc[0]}:{loc[1]}")
            if suggestions:
                print(f"     💡 Did you mean: {', '.join(suggestions)}")
        
        print(f"\n{'='*60}")
        print(f"Total: {len(unknown_words)} unknown words")
        print(f"\nTo approve all words, run:")
        print(f"  python3 scripts/arabic-spellcheck.py --update-dict")
        print(f"\nOr manually add words to scripts/arabic-dictionary.json")

        if strict_mode:
            print("\n❌ Spell check FAILED (strict mode)")
            return 1
    else:
        print("\n✅ All Arabic words match the dictionary!")

    return 0

if __name__ == "__main__":
    sys.exit(main())
