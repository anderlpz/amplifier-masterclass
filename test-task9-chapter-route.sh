#!/bin/bash
# Test for task-9: Create dynamic chapter route and rewrite index.astro
# RED phase: This should FAIL before implementation.
# GREEN phase: Passes after [chapter].astro and index.astro are created.

PASS=0
FAIL=0
ERRORS=()

check() {
  local desc="$1"
  local result="$2"
  if [ "$result" = "true" ]; then
    echo "  ✅ $desc"
    PASS=$((PASS + 1))
  else
    echo "  ❌ $desc"
    FAIL=$((FAIL + 1))
    ERRORS+=("$desc")
  fi
}

ROOT="$(cd "$(dirname "$0")" && pwd)"
CHAPTER_FILE="$ROOT/src/pages/chapters/[chapter].astro"
INDEX_FILE="$ROOT/src/pages/index.astro"

echo ""
echo "=== Task-9: Chapter Route & Index Redirect Verification ==="
echo ""

# --- Section 1: File Existence ---
echo "--- File Existence ---"
check "src/pages/chapters/ directory exists" \
  "$([ -d "$ROOT/src/pages/chapters" ] && echo true || echo false)"
check "src/pages/chapters/[chapter].astro exists" \
  "$([ -f "$CHAPTER_FILE" ] && echo true || echo false)"
check "src/pages/index.astro exists" \
  "$([ -f "$INDEX_FILE" ] && echo true || echo false)"

# Early exit if chapter file doesn't exist
if [ ! -f "$CHAPTER_FILE" ]; then
  echo ""
  echo "=== FAILED: [chapter].astro does not exist. Skipping chapter route tests. ==="
fi

# --- Section 2: Chapter Route - Imports ---
echo ""
echo "--- Chapter Route: Imports ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "imports ChapterLayout from layouts/ChapterLayout.astro" \
    "$(grep -q "ChapterLayout.*from.*layouts/ChapterLayout.astro\|from.*layouts/ChapterLayout.astro.*ChapterLayout" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "imports chapters from data/chapters" \
    "$(grep -q "from.*data/chapters" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "imports Chapter type from data/chapters" \
    "$(grep -q "Chapter.*from.*data/chapters\|import type.*Chapter" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "imports ChapterLayout from layouts/ChapterLayout.astro" "false"
  check "imports chapters from data/chapters" "false"
  check "imports Chapter type from data/chapters" "false"
fi

# --- Section 3: Chapter Route - getStaticPaths ---
echo ""
echo "--- Chapter Route: getStaticPaths ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "getStaticPaths function defined" \
    "$(grep -q "getStaticPaths" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "getStaticPaths returns chapters.map" \
    "$(grep -q "chapters\.map" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "params object present in getStaticPaths" \
    "$(grep -q "params:" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "props with chapter in getStaticPaths" \
    "$(grep -q "props:.*chapter\|chapter.*props:" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "getStaticPaths function defined" "false"
  check "getStaticPaths returns chapters.map" "false"
  check "params object present in getStaticPaths" "false"
  check "props with chapter in getStaticPaths" "false"
fi

# --- Section 4: Chapter Route - Props Interface ---
echo ""
echo "--- Chapter Route: Props Interface ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "Props interface defined" \
    "$(grep -q "interface Props" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "Props has chapter: Chapter" \
    "$(grep -q "chapter.*Chapter\|Chapter.*chapter" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "Props interface defined" "false"
  check "Props has chapter: Chapter" "false"
fi

# --- Section 5: Chapter Route - prev/next computation ---
echo ""
echo "--- Chapter Route: Prev/Next Navigation Computation ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "findIndex used for chapter lookup" \
    "$(grep -q "findIndex" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "prevChapter variable defined" \
    "$(grep -q "prevChapter" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "nextChapter variable defined" \
    "$(grep -q "nextChapter" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "findIndex used for chapter lookup" "false"
  check "prevChapter variable defined" "false"
  check "nextChapter variable defined" "false"
fi

# --- Section 6: Chapter Route - BASE_URL usage ---
echo ""
echo "--- Chapter Route: BASE_URL Usage ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "import.meta.env.BASE_URL used for links" \
    "$(grep -q "import\.meta\.env\.BASE_URL" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "import.meta.env.BASE_URL used for links" "false"
fi

# --- Section 7: Chapter Route - ChapterLayout rendering ---
echo ""
echo "--- Chapter Route: ChapterLayout Rendering ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "<ChapterLayout> component rendered" \
    "$(grep -q "<ChapterLayout" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "ChapterLayout receives title='Amplifier Masterclass'" \
    "$(grep -q "Amplifier Masterclass" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "ChapterLayout receives chapterNumber prop" \
    "$(grep -q "chapterNumber" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "ChapterLayout receives chapterTitle prop" \
    "$(grep -q "chapterTitle" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "<ChapterLayout> component rendered" "false"
  check "ChapterLayout receives title='Amplifier Masterclass'" "false"
  check "ChapterLayout receives chapterNumber prop" "false"
  check "ChapterLayout receives chapterTitle prop" "false"
fi

# --- Section 8: Chapter Entry Section ---
echo ""
echo "--- Chapter Route: Chapter Entry Section ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "chapter-entry class present" \
    "$(grep -q "chapter-entry" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "width-reading class on chapter-entry" \
    "$(grep -q "width-reading" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "eyebrow element with 'Chapter {number}'" \
    "$(grep -q "Chapter.*number\|eyebrow" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "h1 title element" \
    "$(grep -q "<h1>" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "lead paragraph present" \
    "$(grep -q "lead\|\.lead" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "chapter-entry class present" "false"
  check "width-reading class on chapter-entry" "false"
  check "eyebrow element with 'Chapter {number}'" "false"
  check "h1 title element" "false"
  check "lead paragraph present" "false"
fi

# --- Section 9: Placeholder Body ---
echo ""
echo "--- Chapter Route: Placeholder Body ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "chapter-body class present" \
    "$(grep -q "chapter-body" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "placeholder references Phase 2" \
    "$(grep -qi "phase 2\|Phase 2" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "placeholder text is italic/muted" \
    "$(grep -q "<em>\|font-style.*italic\|italic" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "chapter-body class present" "false"
  check "placeholder references Phase 2" "false"
  check "placeholder text is italic/muted" "false"
fi

# --- Section 10: Chapter Navigation ---
echo ""
echo "--- Chapter Route: Chapter Navigation ---"
if [ -f "$CHAPTER_FILE" ]; then
  check "chapter-nav class present" \
    "$(grep -q "chapter-nav" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "← Previous direction label present" \
    "$(grep -q "← Previous\|Previous" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "Next → direction label present" \
    "$(grep -q "Next →\|Next" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "nav uses flex layout" \
    "$(grep -q "display.*flex\|flex" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "nav has border-top" \
    "$(grep -q "border-top" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "mobile @media max-width 480px" \
    "$(grep -q "@media.*max-width.*480px\|480px" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
  check "mobile: flex-direction column" \
    "$(grep -q "flex-direction.*column\|column" "$CHAPTER_FILE" 2>/dev/null && echo true || echo false)"
else
  check "chapter-nav class present" "false"
  check "← Previous direction label present" "false"
  check "Next → direction label present" "false"
  check "nav uses flex layout" "false"
  check "nav has border-top" "false"
  check "mobile @media max-width 480px" "false"
  check "mobile: flex-direction column" "false"
fi

# --- Section 11: index.astro Redirect ---
echo ""
echo "--- index.astro: Redirect to Chapter 1 ---"
if [ -f "$INDEX_FILE" ]; then
  check "Astro.redirect used" \
    "$(grep -q "Astro\.redirect" "$INDEX_FILE" 2>/dev/null && echo true || echo false)"
  check "redirects to chapters/1/" \
    "$(grep -q "chapters/1/" "$INDEX_FILE" 2>/dev/null && echo true || echo false)"
  check "uses import.meta.env.BASE_URL in redirect" \
    "$(grep -q "import\.meta\.env\.BASE_URL" "$INDEX_FILE" 2>/dev/null && echo true || echo false)"
  check "return statement used with redirect" \
    "$(grep -q "return.*Astro\.redirect\|return.*redirect" "$INDEX_FILE" 2>/dev/null && echo true || echo false)"
else
  check "Astro.redirect used" "false"
  check "redirects to chapters/1/" "false"
  check "uses import.meta.env.BASE_URL in redirect" "false"
  check "return statement used with redirect" "false"
fi

echo ""
if [ $FAIL -eq 0 ]; then
  echo "=== ALL TESTS PASSED ($PASS/$((PASS + FAIL))) ==="
  exit 0
else
  echo "=== FAILED: $FAIL tests failed, $PASS passed ==="
  for err in "${ERRORS[@]}"; do
    echo "  FAIL: $err"
  done
  exit 1
fi
