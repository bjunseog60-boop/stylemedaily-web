#!/usr/bin/env python3
"""
StyleMeDaily Auto Content Agent (Gemini Edition)
Generates new fashion guides using Gemini API and adds them to the site.
Voice: Friendly best-friend stylist (NOT magazine editor tone)
"""

import io
import json
import os
import re
import subprocess
import sys
from pathlib import Path

# Fix Windows cp949 encoding
if sys.stdout and hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

from google import genai

# -- Paths --
ROOT = Path(__file__).parent.parent
GUIDES_DATA = ROOT / "src" / "lib" / "guides-data.ts"
GUIDES_CONTENT = ROOT / "src" / "lib" / "guides-content-new.ts"

# -- Amazon affiliate URLs pool --
AMZN_URLS = [
    "https://amzn.to/4rVjOFg",
    "https://amzn.to/3ZCaw4S",
    "https://amzn.to/3Mro3JB",
    "https://amzn.to/3OhrhzW",
    "https://amzn.to/4anggFT",
    "https://amzn.to/4rfVnSQ",
    "https://amzn.to/4tH7kT9",
    "https://amzn.to/40drBCf",
    "https://amzn.to/4kNVNxy",
    "https://amzn.to/3Mro7cj",
    "https://amzn.to/4tEIRhl",
    "https://amzn.to/3OrVpsf",
    "https://amzn.to/4rUPDhk",
    "https://amzn.to/4qBF7dJ",
    "https://amzn.to/4tH7kT9",
]

# -- Unsplash image pool --
UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
]

THUMB_IMAGES = [
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=200&fit=crop",
]


def escape_ts(s: str) -> str:
    """Escape single quotes for TypeScript string literals."""
    return s.replace("\\", "\\\\").replace("'", "\\'")


def get_existing_slugs() -> list[str]:
    """Read existing guide slugs from guides-data.ts."""
    content = GUIDES_DATA.read_text(encoding="utf-8")
    return re.findall(r"slug:\s*'([^']+)'", content)


def generate_guide_json(client, existing_slugs: list[str]) -> dict:
    """Call Gemini API to generate a new unique fashion guide."""

    prompt = f"""You are a friendly fashion stylist writing for StyleMeDaily -- a down-to-earth
women's style guide site. Your tone is like a supportive best friend who happens
to know a LOT about fashion. You speak directly to "you", use casual language,
and give practical, real-world advice. Think relatable Instagram captions, NOT
Vogue magazine articles.

VOICE EXAMPLES (use this tone throughout):
- "Okay so here's the thing -- you don't need to spend a fortune to look amazing."
- "Trust me, this combo works for literally every body type."
- "If you're anything like me, you've stared at your closet thinking 'I have nothing to wear.'"

Generate ONE new SEO-optimized fashion guide. Return ONLY valid JSON, no other text.

EXISTING SLUGS (must NOT duplicate any of these):
{json.dumps(existing_slugs[:30], indent=2)}

Use this EXACT JSON structure:
{{
  "slug": "unique-kebab-case-slug-2026",
  "title": "Catchy, Searchable Title (include year if relevant)",
  "category": "workwear",
  "description": "SEO meta description under 155 characters. Conversational and keyword-rich.",
  "readTime": "12 min",
  "date": "2026-02-21",
  "tag": "Guide",
  "emoji": "icon",
  "image_index": 0,
  "affiliateProducts": [
    {{
      "name": "Product Name",
      "price": "$XX",
      "url_index": 0,
      "tag": "Best Overall",
      "image_index": 0
    }}
  ],
  "content": [
    {{
      "heading": "Section Heading",
      "paragraphs": [
        "Detailed paragraph with 80+ words of genuine, friendly fashion advice...",
        "Another paragraph with real tips, not filler content..."
      ]
    }}
  ]
}}

RULES:
- category must be one of: workwear, casual, date-night, seasonal, body-type, budget, occasion
- tag must be one of: Guide, Product Review, Trending, Hot, Pillar Guide, Viral, Style Tips, Seasonal, Popular, Budget Picks
- Include exactly 4-5 affiliate products (use url_index 0-{len(AMZN_URLS) - 1})
- Include exactly 5 content sections, each with 2-3 detailed paragraphs (80+ words each)
- Write like you're texting style advice to your best friend -- warm, funny, helpful
- Do NOT use formal magazine language (no "sartorial", "atelier", "curated selection")
- DO use casual language ("game-changer", "totally", "legit", "obsessed with")
- slug must be unique and descriptive, not in existing list
- image_index for guide: 0-{len(UNSPLASH_IMAGES) - 1}
- image_index for products: 0-{len(THUMB_IMAGES) - 1}
- Do NOT use em dashes. Use double hyphens -- instead.
- IMPORTANT: Do NOT use apostrophes inside words in a way that would conflict with JSON. Use full words instead of contractions when possible, or escape properly.

Pick a fresh fashion topic not covered by existing slugs. Ideas:
maternity fashion, boho style, color seasons analysis, smart packing,
office party outfits, cocktail attire, tropical vacation, winter accessories,
sustainable fashion, 30s fashion, capsule wardrobe beginners, linen fashion,
blazer dress, jumpsuit styling, leather jacket outfits, maxi dress styling,
palazzo pants, wide leg jeans, trench coat outfits, turtleneck outfits,
midi skirt outfits, denim outfit ideas, evening bags, work from home outfits"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    text = response.text.strip()
    # Fix invalid backslash escapes that Gemini sometimes produces
    text = re.sub(r'\\(?!["\\/nrtbfu])', r'\\\\', text)
    # Extract JSON from response (handle markdown code blocks)
    json_match = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", text)
    if json_match:
        return json.loads(json_match.group(1))
    # Try raw JSON
    json_match = re.search(r"\{[\s\S]*\}", text)
    if json_match:
        return json.loads(json_match.group())
    raise ValueError(f"No valid JSON in Gemini response:\n{text[:500]}")


def resolve_urls(guide: dict) -> dict:
    """Replace index references with actual URLs."""
    guide["image"] = UNSPLASH_IMAGES[guide.get("image_index", 0) % len(UNSPLASH_IMAGES)]
    guide.pop("image_index", None)

    for p in guide["affiliateProducts"]:
        p["url"] = AMZN_URLS[p.get("url_index", 0) % len(AMZN_URLS)]
        p["image"] = THUMB_IMAGES[p.get("image_index", 0) % len(THUMB_IMAGES)]
        p["brand"] = "Amazon"
        p.pop("url_index", None)
        p.pop("image_index", None)

    return guide


def format_guide_data_ts(guide: dict) -> str:
    """Format guide metadata as TypeScript object for guides-data.ts."""
    products_ts = ""
    for p in guide["affiliateProducts"]:
        tag_part = f", tag: '{escape_ts(p.get('tag', ''))}'" if p.get("tag") else ""
        image_part = f", image: '{p.get('image', '')}'" if p.get("image") else ""
        products_ts += (
            f"      {{ name: '{escape_ts(p['name'])}', brand: '{p['brand']}', "
            f"price: '{p['price']}', url: '{p['url']}'{tag_part}{image_part} }},\n"
        )

    return f"""  {{
    slug: '{guide['slug']}',
    title: '{escape_ts(guide['title'])}',
    category: '{guide['category']}',
    description: '{escape_ts(guide['description'])}',
    readTime: '{guide['readTime']}',
    date: '{guide['date']}',
    tag: '{guide['tag']}',
    emoji: '{guide['emoji']}',
    image: '{guide['image']}',
    affiliateProducts: [
{products_ts}    ],
  }},
"""


def format_guide_content_ts(guide: dict) -> str:
    """Format guide content as TypeScript for guides-content-new.ts."""
    sections_ts = ""
    for section in guide["content"]:
        paragraphs_ts = ", ".join(
            [f"'{escape_ts(p)}'" for p in section["paragraphs"]]
        )
        sections_ts += (
            f"  {{ heading: '{escape_ts(section['heading'])}', "
            f"paragraphs: [{paragraphs_ts}] }},\n"
        )

    return f"\n'{guide['slug']}': [\n{sections_ts}],\n"


def insert_guide_into_data_file(guide_ts: str):
    """Insert guide entry into guides-data.ts before the closing ];"""
    content = GUIDES_DATA.read_text(encoding="utf-8")
    marker = "];\n\nexport function getGuideBySlug"
    if marker not in content:
        raise ValueError("Could not find insertion point in guides-data.ts")
    updated = content.replace(marker, guide_ts + marker)
    GUIDES_DATA.write_text(updated, encoding="utf-8")


def insert_guide_into_content_file(content_ts: str):
    """Insert guide content into guides-content-new.ts before the closing };"""
    content = GUIDES_CONTENT.read_text(encoding="utf-8")
    marker = "\n};\n"
    if marker not in content:
        raise ValueError("Could not find insertion point in guides-content-new.ts")
    last_idx = content.rfind(marker)
    updated = content[:last_idx] + content_ts + content[last_idx:]
    GUIDES_CONTENT.write_text(updated, encoding="utf-8")


def git_commit_and_push(slug: str, title: str):
    """Commit and push the new guide."""
    subprocess.run(["git", "config", "user.email", "agent@stylemedaily.com"], check=True, cwd=ROOT)
    subprocess.run(["git", "config", "user.name", "StyleMeDaily Content Agent"], check=True, cwd=ROOT)
    subprocess.run(["git", "add", str(GUIDES_DATA), str(GUIDES_CONTENT)], check=True, cwd=ROOT)
    subprocess.run(
        ["git", "commit", "-m", f"feat: auto-generate guide '{title}' [{slug}]"],
        check=True, cwd=ROOT,
    )
    subprocess.run(["git", "pull", "--rebase", "origin", "main"], check=True, cwd=ROOT)
    subprocess.run(["git", "push", "origin", "main"], check=True, cwd=ROOT)
    print(f"[OK] Committed and pushed: {slug}")


def main():
    print("[StyleMeDaily] Content Agent (Gemini) starting...")

    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        print("[ERROR] GEMINI_API_KEY not set")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    existing_slugs = get_existing_slugs()
    print(f"[INFO] Found {len(existing_slugs)} existing guides")

    print("[INFO] Generating new guide with Gemini...")
    guide_raw = generate_guide_json(client, existing_slugs)
    guide = resolve_urls(guide_raw)

    print(f"[OK] Generated: '{guide['title']}' [{guide['slug']}]")

    # Validate slug is unique
    if guide["slug"] in existing_slugs:
        print(f"[ERROR] Duplicate slug detected: {guide['slug']}. Aborting.")
        sys.exit(1)

    guide_data_ts = format_guide_data_ts(guide)
    guide_content_ts = format_guide_content_ts(guide)

    insert_guide_into_data_file(guide_data_ts)
    insert_guide_into_content_file(guide_content_ts)
    print("[OK] Files updated successfully")

    git_commit_and_push(guide["slug"], guide["title"])
    print("[DONE] New guide is live!")


if __name__ == "__main__":
    main()
