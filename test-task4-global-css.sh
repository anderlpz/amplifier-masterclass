#!/bin/bash
# Test for task-4: Rewrite global.css with v3 Paper Frame stylesheet
# RED phase: This should FAIL before implementation.
# GREEN phase: Passes after global.css is rewritten.

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
FILE="$ROOT/src/styles/global.css"

echo ""
echo "=== Task-4: global.css v3 Paper Frame Verification ==="
echo ""

# --- Section 1: File exists ---
echo "--- File Existence ---"
check "global.css exists" \
  "$([ -f "$FILE" ] && echo true || echo false)"

# --- Section 2: Line count approximately 230 ---
echo ""
echo "--- Line Count (~230 lines) ---"
LINE_COUNT=$(wc -l < "$FILE" 2>/dev/null | tr -d ' ' || echo 0)
check "Line count between 200 and 260 (got $LINE_COUNT)" \
  "$([ "$LINE_COUNT" -ge 200 ] && [ "$LINE_COUNT" -le 260 ] && echo true || echo false)"

# --- Section 3: Design Tokens import ---
echo ""
echo "--- Section 1: Design Tokens Import ---"
check "Contains @import './tokens.css'" \
  "$(grep -qF "@import './tokens.css'" "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 4: Font Face declarations (11 total) ---
echo ""
echo "--- Section 2: Font Faces (11 declarations) ---"
FONT_FACE_COUNT=$(grep -c '@font-face' "$FILE" 2>/dev/null || echo 0)
check "Exactly 11 @font-face declarations (got $FONT_FACE_COUNT)" \
  "$([ "$FONT_FACE_COUNT" -eq 11 ] && echo true || echo false)"

# Lora weights
check "Lora 400 declared" \
  "$(grep -A5 "font-family: 'Lora'" "$FILE" 2>/dev/null | grep -q 'font-weight: 400' && echo true || echo false)"
check "Lora 500 declared" \
  "$(grep -A5 "font-family: 'Lora'" "$FILE" 2>/dev/null | grep -q 'font-weight: 500' && echo true || echo false)"
check "Lora 600 declared" \
  "$(grep -A5 "font-family: 'Lora'" "$FILE" 2>/dev/null | grep -q 'font-weight: 600' && echo true || echo false)"
check "Lora 700 declared" \
  "$(grep -A5 "font-family: 'Lora'" "$FILE" 2>/dev/null | grep -q 'font-weight: 700' && echo true || echo false)"

# Inter weights
check "Inter 400 declared" \
  "$(grep -A5 "font-family: 'Inter'" "$FILE" 2>/dev/null | grep -q 'font-weight: 400' && echo true || echo false)"
check "Inter 500 declared" \
  "$(grep -A5 "font-family: 'Inter'" "$FILE" 2>/dev/null | grep -q 'font-weight: 500' && echo true || echo false)"
check "Inter 600 declared" \
  "$(grep -A5 "font-family: 'Inter'" "$FILE" 2>/dev/null | grep -q 'font-weight: 600' && echo true || echo false)"

# Space Grotesk weights
check "Space Grotesk 400 declared" \
  "$(grep -A5 "font-family: 'Space Grotesk'" "$FILE" 2>/dev/null | grep -q 'font-weight: 400' && echo true || echo false)"
check "Space Grotesk 500 declared" \
  "$(grep -A5 "font-family: 'Space Grotesk'" "$FILE" 2>/dev/null | grep -q 'font-weight: 500' && echo true || echo false)"
check "Space Grotesk 600 declared" \
  "$(grep -A5 "font-family: 'Space Grotesk'" "$FILE" 2>/dev/null | grep -q 'font-weight: 600' && echo true || echo false)"
check "Space Grotesk 700 declared" \
  "$(grep -A5 "font-family: 'Space Grotesk'" "$FILE" 2>/dev/null | grep -q 'font-weight: 700' && echo true || echo false)"

# All font-face use woff2 and /fonts/ paths
FONTS_PATH_COUNT=$(grep -c "src: url('/fonts/" "$FILE" 2>/dev/null || echo 0)
check "All 11 font paths use /fonts/ directory (got $FONTS_PATH_COUNT)" \
  "$([ "$FONTS_PATH_COUNT" -eq 11 ] && echo true || echo false)"

SWAP_COUNT=$(grep -c '  font-display: swap;' "$FILE" 2>/dev/null || echo 0)
check "All 11 fonts use font-display: swap (got $SWAP_COUNT)" \
  "$([ "$SWAP_COUNT" -eq 11 ] && echo true || echo false)"

WOFF2_COUNT=$(grep -c "format('woff2')" "$FILE" 2>/dev/null || echo 0)
check "All 11 fonts use woff2 format (got $WOFF2_COUNT)" \
  "$([ "$WOFF2_COUNT" -eq 11 ] && echo true || echo false)"

# --- Section 5: Minimal Modern Reset ---
echo ""
echo "--- Section 3: Minimal Modern Reset ---"
check "box-sizing: border-box in reset" \
  "$(grep -qF 'box-sizing: border-box' "$FILE" 2>/dev/null && echo true || echo false)"
check "margin: 0 in reset" \
  "$(grep -qF 'margin: 0' "$FILE" 2>/dev/null && echo true || echo false)"
check "padding: 0 in reset" \
  "$(grep -qF 'padding: 0' "$FILE" 2>/dev/null && echo true || echo false)"
check "text-size-adjust: 100% on html" \
  "$(grep -qF 'text-size-adjust: 100%' "$FILE" 2>/dev/null && echo true || echo false)"
check "scroll-behavior: smooth on html" \
  "$(grep -qF 'scroll-behavior: smooth' "$FILE" 2>/dev/null && echo true || echo false)"
check "Media elements display: block" \
  "$(grep -qF 'display: block' "$FILE" 2>/dev/null && echo true || echo false)"
check "Media elements max-width: 100%" \
  "$(grep -qF 'max-width: 100%' "$FILE" 2>/dev/null && echo true || echo false)"
check "Form elements font: inherit" \
  "$(grep -qF 'font: inherit' "$FILE" 2>/dev/null && echo true || echo false)"
check "overflow-wrap: break-word" \
  "$(grep -qF 'overflow-wrap: break-word' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 6: Base Styles ---
echo ""
echo "--- Section 4: Base Styles ---"
check "Body uses background-color: var(--bg-canvas)" \
  "$(grep -qF 'background-color: var(--bg-canvas)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Body uses color: var(--text-secondary)" \
  "$(grep -qF 'color: var(--text-secondary)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Body uses font-family: var(--font-sans)" \
  "$(grep -qF 'font-family: var(--font-sans)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Body uses font-size: var(--text-base)" \
  "$(grep -qF 'font-size: var(--text-base)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Body uses line-height: var(--leading-normal)" \
  "$(grep -qF 'line-height: var(--leading-normal)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Body uses antialiased (webkit-font-smoothing: antialiased)" \
  "$(grep -qF 'webkit-font-smoothing: antialiased' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 7: Typography Defaults ---
echo ""
echo "--- Section 5: Typography Defaults ---"
check "h1/h2 use font-family: var(--font-serif)" \
  "$(grep -qF 'font-family: var(--font-serif)' "$FILE" 2>/dev/null && echo true || echo false)"
check "h1/h2 font-weight: 600" \
  "$(grep -qF 'font-weight: 600' "$FILE" 2>/dev/null && echo true || echo false)"
check "h1/h2 line-height tight" \
  "$(grep -qF 'line-height: var(--leading-tight)' "$FILE" 2>/dev/null && echo true || echo false)"
check "h1/h2 letter-spacing: -0.02em" \
  "$(grep -qF 'letter-spacing: -0.02em' "$FILE" 2>/dev/null && echo true || echo false)"
check "h1/h2 color: var(--text-primary)" \
  "$(grep -qF 'color: var(--text-primary)' "$FILE" 2>/dev/null && echo true || echo false)"
check "h1 font-size: var(--text-4xl)" \
  "$(grep -qF 'font-size: var(--text-4xl)' "$FILE" 2>/dev/null && echo true || echo false)"
check "h2 font-size: var(--text-3xl)" \
  "$(grep -qF 'font-size: var(--text-3xl)' "$FILE" 2>/dev/null && echo true || echo false)"
check "h3 uses font-family: var(--font-serif) (Lora, not sans)" \
  "$(grep -A10 '^h3 ' "$FILE" 2>/dev/null | grep -qF 'font-family: var(--font-serif)' && echo true || echo false)"
check "h3 font-size: var(--text-2xl)" \
  "$(grep -qF 'font-size: var(--text-2xl)' "$FILE" 2>/dev/null && echo true || echo false)"
check "h3 line-height snug" \
  "$(grep -qF 'line-height: var(--leading-snug)' "$FILE" 2>/dev/null && echo true || echo false)"
check "p max-width: 65ch" \
  "$(grep -qF 'max-width: 65ch' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 8: Width Utilities ---
echo ""
echo "--- Section 6: Width Utilities ---"
check ".width-reading class defined" \
  "$(grep -qF '.width-reading' "$FILE" 2>/dev/null && echo true || echo false)"
check ".width-reading uses max-width: var(--measure-reading)" \
  "$(grep -qF 'max-width: var(--measure-reading)' "$FILE" 2>/dev/null && echo true || echo false)"
check ".width-wide class defined" \
  "$(grep -qF '.width-wide' "$FILE" 2>/dev/null && echo true || echo false)"
check ".width-wide uses max-width: var(--measure-wide)" \
  "$(grep -qF 'max-width: var(--measure-wide)' "$FILE" 2>/dev/null && echo true || echo false)"
check ".width-full class defined" \
  "$(grep -qF '.width-full' "$FILE" 2>/dev/null && echo true || echo false)"
check ".width-full uses max-width: 100%" \
  "$(grep -A3 '\.width-full' "$FILE" 2>/dev/null | grep -qF 'max-width: 100%' && echo true || echo false)"
check "Width utilities use margin-inline: auto (centered)" \
  "$(grep -qF 'margin-inline: auto' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 9: Inline Code ---
echo ""
echo "--- Section 7: Inline Code ---"
check "code:not(pre code) selector used" \
  "$(grep -qF 'code:not(pre code)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Inline code uses background: var(--bg-code)" \
  "$(grep -qF 'background: var(--bg-code)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Inline code uses border-radius: var(--radius-sm)" \
  "$(grep -qF 'border-radius: var(--radius-sm)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Inline code uses color: var(--text-primary)" \
  "$(grep -qF 'color: var(--text-primary)' "$FILE" 2>/dev/null && echo true || echo false)"
check "pre code resets: background: none" \
  "$(grep -qF 'background: none' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 10: Links ---
echo ""
echo "--- Section 8: Links ---"
check "Links use color: var(--accent)" \
  "$(grep -qF 'color: var(--accent)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Links have text-decoration underline" \
  "$(grep -qF 'text-decoration' "$FILE" 2>/dev/null && echo true || echo false)"
check "Link hover uses color: var(--accent-hover)" \
  "$(grep -qF 'color: var(--accent-hover)' "$FILE" 2>/dev/null && echo true || echo false)"
check "Links have transition for fast hover" \
  "$(grep -qF 'transition' "$FILE" 2>/dev/null && echo true || echo false)"

# --- Section 11: Selection ---
echo ""
echo "--- Section 9: Selection ---"
check "::selection uses background-color: var(--accent-bg)" \
  "$(grep -qF 'background-color: var(--accent-bg)' "$FILE" 2>/dev/null && echo true || echo false)"
check "::selection selector present" \
  "$(grep -qF '::selection' "$FILE" 2>/dev/null && echo true || echo false)"
check "::selection uses color: var(--text-primary)" \
  "$(grep -A3 '::selection' "$FILE" 2>/dev/null | grep -qF 'color: var(--text-primary)' && echo true || echo false)"

# --- Section 12: OLD v2 patterns should NOT exist ---
echo ""
echo "--- No v2 patterns ---"
check "No background-color: var(--bg-void) (v2 removed)" \
  "$(grep -qF 'background-color: var(--bg-void)' "$FILE" 2>/dev/null && echo false || echo true)"
check "No .content-body (v2 removed, replaced with .width-reading)" \
  "$(grep -qF '.content-body' "$FILE" 2>/dev/null && echo false || echo true)"
check "No .content-wide (v2 removed, replaced with .width-wide)" \
  "$(grep -qF '.content-wide' "$FILE" 2>/dev/null && echo false || echo true)"
check "No .glass-card (v2 removed)" \
  "$(grep -qF '.glass-card' "$FILE" 2>/dev/null && echo false || echo true)"
check "No .grain texture (v2 removed)" \
  "$(grep -qF '.grain' "$FILE" 2>/dev/null && echo false || echo true)"
check "No .section--before-break parallax (v2 removed)" \
  "$(grep -qF '.section--before-break' "$FILE" 2>/dev/null && echo false || echo true)"

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
