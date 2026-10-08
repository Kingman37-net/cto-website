#!/usr/bin/env python3
"""
Rewrite local image references in cto-website to CDN URLs.
Usage:
  python3 scripts/rewrite-to-cdn.py --dry-run
  python3 scripts/rewrite-to-cdn.py --apply
"""

import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"
CDN = "https://media.kingmandigital.co.ke"

MAPPING = [
    # Full URL form (OG / Twitter / favicon)
    ("https://cto.kingmandigital.co.ke/assets/images/heroes/home-1920.webp",
     f"{CDN}/website/cto/heroes/home-1920.webp"),
    ("https://cto.kingmandigital.co.ke/assets/images/heroes/home-1200.webp",
     f"{CDN}/website/cto/heroes/home-1200.webp"),
    ("https://cto.kingmandigital.co.ke/assets/images/heroes/home-800.webp",
     f"{CDN}/website/cto/heroes/home-800.webp"),
    ("https://cto.kingmandigital.co.ke/assets/images/heroes/about-1920.webp",
     f"{CDN}/website/cto/heroes/about-1920.webp"),
    ("https://cto.kingmandigital.co.ke/assets/images/heroes/contact-1920.webp",
     f"{CDN}/website/cto/heroes/contact-1920.webp"),
    ("https://cto.kingmandigital.co.ke/assets/images/branding/kdcn-logo-500.webp",
     f"{CDN}/website/cto/logo/kdcn-logo-500.webp"),

    # Path form (img src)
    ("/assets/images/branding/kdcn-logo-500.webp",
     f"{CDN}/website/cto/logo/kdcn-logo-500.webp"),
    ("/assets/images/branding/kdcn-logo.svg",
     f"{CDN}/website/cto/logo/kdcn-logo.svg"),
    ("/assets/images/branding/kdcn-web-logo-500.webp",
     f"{CDN}/website/cto/logo/kdcn-web-logo-500.webp"),
    ("/assets/images/branding/kdcn-web-logo.svg",
     f"{CDN}/website/cto/logo/kdcn-web-logo.svg"),

    ("/assets/images/heroes/home-800.webp",
     f"{CDN}/website/cto/heroes/home-800.webp"),
    ("/assets/images/heroes/home-1200.webp",
     f"{CDN}/website/cto/heroes/home-1200.webp"),
    ("/assets/images/heroes/home-1920.webp",
     f"{CDN}/website/cto/heroes/home-1920.webp"),
    ("/assets/images/heroes/about-800.webp",
     f"{CDN}/website/cto/heroes/about-800.webp"),
    ("/assets/images/heroes/about-1200.webp",
     f"{CDN}/website/cto/heroes/about-1200.webp"),
    ("/assets/images/heroes/about-1920.webp",
     f"{CDN}/website/cto/heroes/about-1920.webp"),
    ("/assets/images/heroes/contact-800.webp",
     f"{CDN}/website/cto/heroes/contact-800.webp"),
    ("/assets/images/heroes/contact-1200.webp",
     f"{CDN}/website/cto/heroes/contact-1200.webp"),
    ("/assets/images/heroes/contact-1920.webp",
     f"{CDN}/website/cto/heroes/contact-1920.webp"),

    ("/assets/images/profile/profile-400.webp",
     f"{CDN}/website/cto/profile/profile-400.webp"),
    ("/assets/images/profile/profile-800.webp",
     f"{CDN}/website/cto/profile/profile-800.webp"),
    ("/assets/images/profile/leadership-400.webp",
     f"{CDN}/website/cto/profile/leadership-400.webp"),
    ("/assets/images/profile/leadership-800.webp",
     f"{CDN}/website/cto/profile/leadership-800.webp"),
]


def main():
    dry = "--dry-run" in sys.argv
    apply = "--apply" in sys.argv
    if not (dry or apply):
        print("Usage: rewrite-to-cdn.py [--dry-run | --apply]")
        return 1

    html_files = sorted(DOCS.rglob("*.html"))
    print(f"▶ Scanning {len(html_files)} HTML files")
    print()

    total = 0
    per_file = {}

    for path in html_files:
        original = path.read_text(encoding="utf-8")
        content = original
        hits = 0
        for old, new in MAPPING:
            c = content.count(old)
            if c:
                content = content.replace(old, new)
                hits += c
        if hits:
            per_file[path] = hits
            total += hits
            rel = path.relative_to(REPO)
            print(f"  {hits:>3}  {rel}")
            if apply:
                path.write_text(content, encoding="utf-8")

    print()
    print(f"▶ Files changed:      {len(per_file)}")
    print(f"▶ Total replacements: {total}")
    print()
    print("✅ Dry run — no files written" if dry else "✅ Changes applied")
    return 0


if __name__ == "__main__":
    sys.exit(main())
