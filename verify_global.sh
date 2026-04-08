#!/bin/bash
# Verification test for task-4-global-css
# RED phase: This should fail before implementation, PASS after

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

ROOT=$HOME/projects/amplifier-masterclass
FILE="$ROOT/src/styles/global.css"

has() {
  grep -qF -- "$1" "$FILE" 2>/dev/null && echo true || echo false
}

echo ""
echo "=== Global CSS Verification Tests ==="
echo ""

echo "--- File Existence ---"
check "src/styles/global.css exists" "$([ -f "$FILE" ] && echo true || echo false)"

echo ""
echo "--- Imports tokens.css ---"
check "imports tokens.css" "$(has 'tokens.css')"

echo ""
echo "--- @font-face: Lora (4 weights) ---"
check "Lora 400 declared" "$(has 'lora-400.woff2')"
check "Lora 500 declared" "$(has 'lora-500.woff2')"
check "Lora 600 declared" "$(has 'lora-600.woff2')"
check "Lora 700 declared" "$(has 'lora-700.woff2')"

echo ""
echo "--- @font-face: Inter (3 weights) ---"
check "Inter 400 declared" "$(has 'inter-400.woff2')"
check "Inter 500 declared" "$(has 'inter-500.woff2')"
check "Inter 600 declared" "$(has 'inter-600.woff2')"

echo ""
echo "--- @font-face: Space Grotesk (4 weights) ---"
check "Space Grotesk 400 declared" "$(has 'space-grotesk-400.woff2')"
check "Space Grotesk 500 declared" "$(has 'space-grotesk-500.woff2')"
check "Space Grotesk 600 declared" "$(has 'space-grotesk-600.woff2')"
check "Space Grotesk 700 declared" "$(has 'space-grotesk-700.woff2')"

echo ""
echo "--- @font-face count: exactly 11 ---"
FONT_FACE_COUNT=$(grep -c '@font-face' "$FILE" 2>/dev/null || echo 0)
check "11 @font-face declarations (found: $FONT_FACE_COUNT)" \
  "$([ "$FONT_FACE_COUNT" = "11" ] && echo true || echo false)"

echo ""
echo "--- format and display declarations ---"
check "format('woff2') used"    "$(has "format('woff2')")"
check "font-display: swap used" "$(has 'font-display: swap')"

echo ""
echo "--- CSS Reset ---"
check "box-sizing: border-box"          "$(has 'box-sizing: border-box')"
check "margin: 0 in reset"             "$(has 'margin: 0')"
check "padding: 0 in reset"            "$(has 'padding: 0')"
check "-webkit-text-size-adjust: 100%" "$(has '-webkit-text-size-adjust: 100%')"
check "img display: block"             "$(has 'display: block')"
check "overflow-wrap: break-word"      "$(has 'overflow-wrap: break-word')"

echo ""
echo "--- Base Dark Styles (html/body) ---"
check "scroll-behavior: smooth"             "$(has 'scroll-behavior: smooth')"
check "background-color: var(--bg-primary)" "$(has 'background-color: var(--bg-primary)')"
check "font-family: var(--font-sans)"       "$(has 'font-family: var(--font-sans)')"
check "line-height: var(--leading-normal)"  "$(has 'line-height: var(--leading-normal)')"
check "-webkit-font-smoothing: antialiased" "$(has '-webkit-font-smoothing: antialiased')"
check "-moz-osx-font-smoothing: grayscale"  "$(has '-moz-osx-font-smoothing: grayscale')"

echo ""
echo "--- Scrollbar Hiding ---"
check "scrollbar-width: none"                "$(has 'scrollbar-width: none')"
check "::-webkit-scrollbar { display: none }" "$(has 'display: none')"

echo ""
echo "--- Typography Defaults ---"
check "font-family: var(--font-serif) for headings" "$(has 'font-family: var(--font-serif)')"
check "letter-spacing: var(--tracking-tight)"       "$(has 'letter-spacing: var(--tracking-tight)')"
check "color: var(--text-primary) on headings"      "$(has 'color: var(--text-primary)')"
check "font-size: var(--text-h1)"  "$(has 'font-size: var(--text-h1)')"
check "font-size: var(--text-h2)"  "$(has 'font-size: var(--text-h2)')"
check "font-size: var(--text-h3)"  "$(has 'font-size: var(--text-h3)')"
check "max-width: 65ch on p"       "$(has 'max-width: 65ch')"
check "color: var(--accent) on a"  "$(has 'color: var(--accent)')"
check "color: var(--accent-hover) on a:hover" "$(has 'color: var(--accent-hover)')"

echo ""
echo "--- Focus & Selection ---"
check ":focus-visible outline"                      "$(has ':focus-visible')"
check "outline: 2px solid var(--accent)"            "$(has 'outline: 2px solid var(--accent)')"
check "::selection background-color: var(--accent)" "$(has '::selection')"

echo ""
echo "--- CSS Syntax (balanced braces) ---"
OPEN=$(grep -oF '{' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
CLOSE=$(grep -oF '}' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
check "Balanced braces ({$OPEN open, $CLOSE close)" \
  "$([ "$OPEN" = "$CLOSE" ] && echo true || echo false)"

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
