#!/bin/bash
# Test for task-7: Create TOCOverlay.astro
# RED phase: This should FAIL before implementation.
# GREEN phase: Passes after TOCOverlay.astro is created.

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
FILE="$ROOT/src/components/TOCOverlay.astro"

echo ""
echo "=== Task-7: TOCOverlay.astro Verification ==="
echo ""

# --- Section 1: File exists ---
echo "--- File Existence ---"
check "src/components/TOCOverlay.astro exists" \
  "$([ -f "$FILE" ] && echo true || echo false)"

# Early exit if file doesn't exist
if [ ! -f "$FILE" ]; then
  echo ""
  echo "=== FAILED: File does not exist. All remaining tests skipped. ==="
  exit 1
fi

# --- Section 2: Props ---
echo ""
echo "--- Props ---"
check "accepts currentChapter prop" \
  "$(grep -q 'currentChapter' "$FILE" 2>/dev/null && echo true || echo false)"
check "currentChapter typed as number" \
  "$(grep -q 'currentChapter.*number\|number.*currentChapter' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 3: Imports ---
echo ""
echo "--- Imports ---"
check "imports chapters from data/chapters" \
  "$(grep -q "chapters.*from.*data/chapters\|from.*data/chapters.*chapters" "$FILE" 2>/dev/null && echo true || echo false)"
check "uses import.meta.env.BASE_URL" \
  "$(grep -q 'import\.meta\.env\.BASE_URL' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 4: HTML Structure ---
echo ""
echo "--- HTML Structure ---"
check "div with id=toc-overlay" \
  "$(grep -q 'id="toc-overlay"' "$FILE" 2>/dev/null && echo true || echo false)"
check "div has class toc-overlay" \
  "$(grep -q 'class="toc-overlay"' "$FILE" 2>/dev/null && echo true || echo false)"
check "role=dialog" \
  "$(grep -q 'role="dialog"' "$FILE" 2>/dev/null && echo true || echo false)"
check "aria-label Table of contents" \
  "$(grep -q 'aria-label="Table of contents"' "$FILE" 2>/dev/null && echo true || echo false)"
check "aria-hidden=true (default hidden)" \
  "$(grep -q 'aria-hidden="true"' "$FILE" 2>/dev/null && echo true || echo false)"
check "backdrop div present (toc-overlay__backdrop)" \
  "$(grep -q 'toc-overlay__backdrop' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel div present (toc-overlay__panel)" \
  "$(grep -q 'toc-overlay__panel' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 5: Contents Heading ---
echo ""
echo "--- Contents Heading ---"
check "Contents heading text present" \
  "$(grep -q 'Contents' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 6: Chapters List ---
echo ""
echo "--- Chapters List ---"
check "ordered list (ol) present" \
  "$(grep -q '<ol' "$FILE" 2>/dev/null && echo true || echo false)"
check "toc-overlay__item--active conditional class" \
  "$(grep -q 'toc-overlay__item--active' "$FILE" 2>/dev/null && echo true || echo false)"
check "active class conditional on currentChapter match" \
  "$(grep -q 'currentChapter\|ch\.number' "$FILE" 2>/dev/null && echo true || echo false)"
check "chapter link href uses chapters/ path" \
  "$(grep -q "chapters/" "$FILE" 2>/dev/null && echo true || echo false)"
check "chapter link href uses ch.slug" \
  "$(grep -q 'ch\.slug' "$FILE" 2>/dev/null && echo true || echo false)"
check "number span present (toc-overlay__number)" \
  "$(grep -q 'toc-overlay__number' "$FILE" 2>/dev/null && echo true || echo false)"
check "title span present (toc-overlay__title)" \
  "$(grep -q 'toc-overlay__title' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 7: Styles ---
echo ""
echo "--- Styles ---"
check "overlay position: fixed" \
  "$(grep -q 'position: fixed' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--z-toc-overlay) for z-index" \
  "$(grep -q 'var(--z-toc-overlay)' "$FILE" 2>/dev/null && echo true || echo false)"
check "pointer-events: none (default closed)" \
  "$(grep -q 'pointer-events: none' "$FILE" 2>/dev/null && echo true || echo false)"
check "opacity: 0 (default closed)" \
  "$(grep -q 'opacity: 0' "$FILE" 2>/dev/null && echo true || echo false)"
check "slow transition for open/close" \
  "$(grep -q 'var(--duration-slow)' "$FILE" 2>/dev/null && echo true || echo false)"
check "when aria-hidden=false: pointer-events auto" \
  "$(grep -q 'pointer-events: auto' "$FILE" 2>/dev/null && echo true || echo false)"
check "when aria-hidden=false: opacity 1" \
  "$(grep -q 'opacity: 1' "$FILE" 2>/dev/null && echo true || echo false)"
check "backdrop rgba(0,0,0,0.2)" \
  "$(grep -q 'rgba(0.*0.*0.*0\.2)' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel top: 52px" \
  "$(grep -q 'top: 52px' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel uses var(--bg-card)" \
  "$(grep -q 'var(--bg-card)' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel uses var(--measure-container) max-width" \
  "$(grep -q 'var(--measure-container)' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel shadow 0 8px 24px" \
  "$(grep -q '0 8px 24px' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel max-height calc(100vh - 52px)" \
  "$(grep -q 'calc(100vh' "$FILE" 2>/dev/null && echo true || echo false)"
check "panel overflow-y: auto" \
  "$(grep -q 'overflow-y: auto' "$FILE" 2>/dev/null && echo true || echo false)"
check "active item uses var(--accent)" \
  "$(grep -q 'var(--accent)' "$FILE" 2>/dev/null && echo true || echo false)"
check "active item uses var(--accent-bg)" \
  "$(grep -q 'var(--accent-bg)' "$FILE" 2>/dev/null && echo true || echo false)"
check "number span font-mono style" \
  "$(grep -q 'var(--font-mono)' "$FILE" 2>/dev/null && echo true || echo false)"
check "title span font-sans style" \
  "$(grep -q 'var(--font-sans)' "$FILE" 2>/dev/null && echo true || echo false)"
check "mobile media query present" \
  "$(grep -q '@media' "$FILE" 2>/dev/null && echo true || echo false)"
check "ease-out transition" \
  "$(grep -q 'var(--ease-out)' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 8: Script ---
echo ""
echo "--- Script ---"
check "script tag present" \
  "$(grep -q '<script>' "$FILE" 2>/dev/null && echo true || echo false)"
check "openTOC function defined" \
  "$(grep -q 'openTOC\|function.*open\|open.*function' "$FILE" 2>/dev/null && echo true || echo false)"
check "closeTOC function defined" \
  "$(grep -q 'closeTOC\|function.*close\|close.*function' "$FILE" 2>/dev/null && echo true || echo false)"
check "sets aria-hidden=false when opening" \
  "$(grep -q "aria-hidden.*false\|'false'" "$FILE" 2>/dev/null && echo true || echo false)"
check "sets aria-hidden=true when closing" \
  "$(grep -q "aria-hidden.*true\|setAttribute.*'true'" "$FILE" 2>/dev/null && echo true || echo false)"
check "listens for toc-toggle custom event" \
  "$(grep -q 'toc-toggle' "$FILE" 2>/dev/null && echo true || echo false)"
check "dispatches toc-close event" \
  "$(grep -q 'toc-close' "$FILE" 2>/dev/null && echo true || echo false)"
check "backdrop click handler (closes on click)" \
  "$(grep -q 'backdrop.*click\|click.*backdrop\|addEventListener.*click' "$FILE" 2>/dev/null && echo true || echo false)"
check "Escape key handler" \
  "$(grep -q "Escape\|keydown\|keyCode\|key === 'Escape'" "$FILE" 2>/dev/null && echo true || echo false)"

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
