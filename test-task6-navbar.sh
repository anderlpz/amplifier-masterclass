#!/bin/bash
# Test for task-6: Create NavBar.astro
# RED phase: This should FAIL before implementation.
# GREEN phase: Passes after NavBar.astro is created.

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
FILE="$ROOT/src/components/NavBar.astro"

echo ""
echo "=== Task-6: NavBar.astro Verification ==="
echo ""

# --- Section 1: File exists ---
echo "--- File Existence ---"
check "src/components/NavBar.astro exists" \
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
check "accepts chapterNumber prop" \
  "$(grep -q 'chapterNumber' "$FILE" 2>/dev/null && echo true || echo false)"
check "accepts chapterTitle prop" \
  "$(grep -q 'chapterTitle' "$FILE" 2>/dev/null && echo true || echo false)"
check "chapterNumber is typed as number" \
  "$(grep -q 'chapterNumber.*number\|number.*chapterNumber' "$FILE" 2>/dev/null && echo true || echo false)"
check "chapterTitle is typed as string" \
  "$(grep -q 'chapterTitle.*string\|string.*chapterTitle' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 3: Nav element structure ---
echo ""
echo "--- Nav Element Structure ---"
check "nav element with class navbar" \
  "$(grep -q "class=\"navbar\"" "$FILE" 2>/dev/null && echo true || echo false)"
check "nav has role=navigation" \
  "$(grep -q 'role="navigation"' "$FILE" 2>/dev/null && echo true || echo false)"
check "nav has aria-label for chapter navigation" \
  "$(grep -q 'aria-label="Chapter navigation"' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 4: Chapter toggle button ---
echo ""
echo "--- Chapter Toggle Button ---"
check "button with class navbar__chapter-toggle" \
  "$(grep -q "class=\"navbar__chapter-toggle\"" "$FILE" 2>/dev/null && echo true || echo false)"
check "button has aria-expanded=false" \
  "$(grep -q 'aria-expanded="false"' "$FILE" 2>/dev/null && echo true || echo false)"
check "button has aria-controls=toc-overlay" \
  "$(grep -q 'aria-controls="toc-overlay"' "$FILE" 2>/dev/null && echo true || echo false)"
check "button has aria-label Open table of contents" \
  "$(grep -q 'aria-label="Open table of contents"' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 5: Chapter indicator content ---
echo ""
echo "--- Chapter Indicator Content ---"
check "chapter number rendered (chapterNumber prop)" \
  "$(grep -q '{chapterNumber}' "$FILE" 2>/dev/null && echo true || echo false)"
check "middot separator present" \
  "$(grep -q '·\|&middot;\|&#183;' "$FILE" 2>/dev/null && echo true || echo false)"
check "chapter title rendered (chapterTitle prop)" \
  "$(grep -q '{chapterTitle}' "$FILE" 2>/dev/null && echo true || echo false)"
check "hamburger icon present (☰ or &#9776;)" \
  "$(grep -q '☰\|&#9776;' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 6: Audio stub ---
echo ""
echo "--- Audio Stub ---"
check "audio stub div present (navbar__audio)" \
  "$(grep -q 'navbar__audio' "$FILE" 2>/dev/null && echo true || echo false)"
check "play icon present (▶ or &#9654;)" \
  "$(grep -q '▶\|&#9654;' "$FILE" 2>/dev/null && echo true || echo false)"
check "Listen label present" \
  "$(grep -q 'Listen' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 7: BEM class names ---
echo ""
echo "--- BEM Class Names (navbar__ prefix) ---"
check "navbar__inner container class" \
  "$(grep -q 'navbar__inner\|navbar__container\|navbar__wrapper' "$FILE" 2>/dev/null && echo true || echo false)"
check "navbar__left class" \
  "$(grep -q 'navbar__left' "$FILE" 2>/dev/null && echo true || echo false)"
check "navbar__right class" \
  "$(grep -q 'navbar__right' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 8: Styles ---
echo ""
echo "--- Styles ---"
check "position: fixed for navbar" \
  "$(grep -q 'position: fixed' "$FILE" 2>/dev/null && echo true || echo false)"
check "height 52px" \
  "$(grep -q '52px' "$FILE" 2>/dev/null && echo true || echo false)"
check "top: 0" \
  "$(grep -q 'top: 0' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--bg-card) for background" \
  "$(grep -q 'var(--bg-card)' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--border-default) for border-bottom" \
  "$(grep -q 'var(--border-default)' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--shadow-nav)" \
  "$(grep -q 'var(--shadow-nav)' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--z-nav)" \
  "$(grep -q 'var(--z-nav)' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--font-mono) for Space Grotesk" \
  "$(grep -q 'var(--font-mono)' "$FILE" 2>/dev/null && echo true || echo false)"
check "audio stub has opacity 0.5 (disabled)" \
  "$(grep -q 'opacity: 0.5\|opacity:.5' "$FILE" 2>/dev/null && echo true || echo false)"
check "audio stub has cursor not-allowed" \
  "$(grep -q 'cursor: not-allowed' "$FILE" 2>/dev/null && echo true || echo false)"
check "toggle has hover bg-muted" \
  "$(grep -q 'var(--bg-muted)' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--radius-sm) for button" \
  "$(grep -q 'var(--radius-sm)' "$FILE" 2>/dev/null && echo true || echo false)"
check "uses var(--duration-fast) for transition" \
  "$(grep -q 'var(--duration-fast)' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 9: Script ---
echo ""
echo "--- Script ---"
check "script tag present" \
  "$(grep -q '<script>' "$FILE" 2>/dev/null && echo true || echo false)"
check "click event handler present" \
  "$(grep -q 'addEventListener.*click\|click.*addEventListener' "$FILE" 2>/dev/null && echo true || echo false)"
check "dispatches CustomEvent toc-toggle" \
  "$(grep -q "toc-toggle" "$FILE" 2>/dev/null && echo true || echo false)"
check "CustomEvent detail has open property" \
  "$(grep -q 'open:' "$FILE" 2>/dev/null && echo true || echo false)"
check "listens for toc-close event" \
  "$(grep -q "toc-close" "$FILE" 2>/dev/null && echo true || echo false)"
check "syncs aria-expanded back to false on toc-close" \
  "$(grep -q 'aria-expanded.*false\|false.*aria-expanded' "$FILE" 2>/dev/null && echo true || echo false)"

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
