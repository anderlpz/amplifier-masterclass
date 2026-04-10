#!/bin/bash
# Test for task-8: Create ChapterLayout.astro
# RED phase: This should FAIL before implementation.
# GREEN phase: Passes after ChapterLayout.astro is created and MasterclassLayout.astro is deleted.

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
OLD_FILE="$ROOT/src/layouts/MasterclassLayout.astro"
NEW_FILE="$ROOT/src/layouts/ChapterLayout.astro"

echo ""
echo "=== Task-8: ChapterLayout.astro Verification ==="
echo ""

# --- Section 1: Deletion / Existence ---
echo "--- File Deletion / Existence ---"
check "src/layouts/MasterclassLayout.astro is deleted" \
  "$([ ! -f "$OLD_FILE" ] && echo true || echo false)"
check "src/layouts/ChapterLayout.astro exists" \
  "$([ -f "$NEW_FILE" ] && echo true || echo false)"

# Early exit if new file doesn't exist
if [ ! -f "$NEW_FILE" ]; then
  echo ""
  echo "=== FAILED: ChapterLayout.astro does not exist. All remaining tests skipped. ==="
  exit 1
fi

# --- Section 2: Imports ---
echo ""
echo "--- Imports ---"
check "imports global.css" \
  "$(grep -q "import.*global.css\\|from.*global.css" "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "imports NavBar from components/NavBar.astro" \
  "$(grep -q "NavBar.*from.*components/NavBar.astro\\|from.*components/NavBar.astro" "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "imports TOCOverlay from components/TOCOverlay.astro" \
  "$(grep -q "TOCOverlay.*from.*components/TOCOverlay.astro\\|from.*components/TOCOverlay.astro" "$NEW_FILE" 2>/dev/null && echo true || echo false)"

# --- Section 3: Props ---
echo ""
echo "--- Props ---"
check "Props interface defined" \
  "$(grep -q "interface Props" "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "title prop (string)" \
  "$(grep -q "title.*string\\|string.*title" "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "title defaults to 'Amplifier Masterclass'" \
  "$(grep -q "Amplifier Masterclass" "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "chapterNumber prop (number)" \
  "$(grep -q "chapterNumber.*number\\|number.*chapterNumber" "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "chapterTitle prop (string)" \
  "$(grep -q "chapterTitle.*string\\|string.*chapterTitle" "$NEW_FILE" 2>/dev/null && echo true || echo false)"

# --- Section 4: HTML Head ---
echo ""
echo "--- HTML Head ---"
check "<html lang='en'> present" \
  "$(grep -q 'lang="en"' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "meta charset utf-8 present" \
  "$(grep -q 'charset.*utf-8\|charset="utf-8"' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "meta viewport present" \
  "$(grep -q 'name="viewport"' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "meta description present" \
  "$(grep -q 'name="description"' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "title uses {chapterTitle} and {title}" \
  "$(grep -q '{chapterTitle}.*{title}\|{title}.*{chapterTitle}' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "title separator em-dash present" \
  "$(grep -q '—\|&mdash;\|\\\\u2014' "$NEW_FILE" 2>/dev/null && echo true || echo false)"

# --- Section 5: Favicons with BASE_URL ---
echo ""
echo "--- Favicon Links ---"
check "favicon.png uses import.meta.env.BASE_URL" \
  "$(grep -q 'import\.meta\.env\.BASE_URL.*favicon\.png\|favicon\.png.*import\.meta\.env\.BASE_URL' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "apple-touch-icon.png uses import.meta.env.BASE_URL" \
  "$(grep -q 'import\.meta\.env\.BASE_URL.*apple-touch-icon\.png\|apple-touch-icon\.png.*import\.meta\.env\.BASE_URL' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "icon-192.png uses import.meta.env.BASE_URL" \
  "$(grep -q 'import\.meta\.env\.BASE_URL.*icon-192\.png\|icon-192\.png.*import\.meta\.env\.BASE_URL' "$NEW_FILE" 2>/dev/null && echo true || echo false)"

# --- Section 6: Body Structure ---
echo ""
echo "--- Body Structure ---"
check "<NavBar> component rendered" \
  "$(grep -q '<NavBar' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "NavBar receives chapterNumber prop" \
  "$(grep -q 'NavBar.*chapterNumber\|chapterNumber.*NavBar' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "NavBar receives chapterTitle prop" \
  "$(grep -q 'NavBar.*chapterTitle\|chapterTitle.*NavBar' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "<TOCOverlay> component rendered" \
  "$(grep -q '<TOCOverlay' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "TOCOverlay receives currentChapter=chapterNumber" \
  "$(grep -q 'currentChapter.*chapterNumber\|chapterNumber.*currentChapter' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "<main class='chapter-card'> present" \
  "$(grep -q 'class="chapter-card"\|class=.*chapter-card' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "<article class='chapter-content'> present" \
  "$(grep -q 'class="chapter-content"\|class=.*chapter-content' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "<slot /> inside article" \
  "$(grep -q '<slot' "$NEW_FILE" 2>/dev/null && echo true || echo false)"

# --- Section 7: Styles ---
echo ""
echo "--- Styles ---"
check ".chapter-card uses var(--measure-container)" \
  "$(grep -q 'var(--measure-container)' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-card has margin-inline: auto" \
  "$(grep -q 'margin-inline: auto' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-card margin-top uses calc(52px + space-8)" \
  "$(grep -q 'calc(52px' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-card uses var(--bg-card)" \
  "$(grep -q 'var(--bg-card)' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-card uses var(--radius-md)" \
  "$(grep -q 'var(--radius-md)' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-card uses var(--shadow-card)" \
  "$(grep -q 'var(--shadow-card)' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-card min-height 80vh" \
  "$(grep -q '80vh' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check ".chapter-content width: 100%" \
  "$(grep -q 'width: 100%' "$NEW_FILE" 2>/dev/null && echo true || echo false)"

# --- Section 8: Mobile Responsive ---
echo ""
echo "--- Mobile Responsive (768px) ---"
check "mobile @media max-width: 768px present" \
  "$(grep -q '@media.*max-width.*768px\|768px.*max-width' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "mobile: margin-top: 52px (no calc)" \
  "$(grep -q 'margin-top: 52px' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "mobile: no border-radius (border-radius: 0)" \
  "$(grep -q 'border-radius: 0' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "mobile: no box-shadow (box-shadow: none)" \
  "$(grep -q 'box-shadow: none' "$NEW_FILE" 2>/dev/null && echo true || echo false)"
check "mobile: min-height calc(100vh - 52px)" \
  "$(grep -q 'calc(100vh - 52px)' "$NEW_FILE" 2>/dev/null && echo true || echo false)"

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
