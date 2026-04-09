#!/bin/bash
# Verification test for task-3-tokens
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
FILE="$ROOT/src/styles/tokens.css"

# Use -F (fixed string) and -- to prevent grep interpreting --prop-name as a flag
has_token() {
  grep -qF -- "$1" "$FILE" 2>/dev/null && echo true || echo false
}

echo ""
echo "=== Token System Verification Tests ==="
echo ""

echo "--- File Existence ---"
check "src/styles/tokens.css exists" "$([ -f "$FILE" ] && echo true || echo false)"

echo ""
echo "--- :root Block ---"
check ":root block present"      "$(has_token ':root')"

echo ""
echo "--- Backgrounds ---"
check "--bg-primary defined"     "$(has_token '--bg-primary')"
check "--bg-secondary defined"   "$(has_token '--bg-secondary')"
check "--bg-break defined"       "$(has_token '--bg-break')"

echo ""
echo "--- Text Colors ---"
check "--text-primary defined"   "$(has_token '--text-primary')"
check "--text-body defined"      "$(has_token '--text-body')"
check "--text-muted defined"     "$(has_token '--text-muted')"
check "--text-on-break defined"  "$(has_token '--text-on-break')"

echo ""
echo "--- Accent ---"
check "--accent defined"         "$(has_token '--accent')"
check "--accent-hover defined"   "$(has_token '--accent-hover')"

echo ""
echo "--- Glass Treatment ---"
check "--glass-bg defined"       "$(has_token '--glass-bg')"
check "--glass-border defined"   "$(has_token '--glass-border')"
check "--glass-blur defined"     "$(has_token '--glass-blur')"
check "--glass-radius defined"   "$(has_token '--glass-radius')"

echo ""
echo "--- Hairline Dividers ---"
check "--divider defined"           "$(has_token '--divider')"
check "--divider-on-break defined"  "$(has_token '--divider-on-break')"

echo ""
echo "--- Typography Families ---"
check "--font-serif defined"     "$(has_token '--font-serif')"
check "--font-sans defined"      "$(has_token '--font-sans')"
check "--font-mono defined"      "$(has_token '--font-mono')"

echo ""
echo "--- Typography Scale (clamp) ---"
check "--text-hero defined"      "$(has_token '--text-hero')"
check "--text-h1 defined"        "$(has_token '--text-h1')"
check "--text-h2 defined"        "$(has_token '--text-h2')"
check "--text-h3 defined"        "$(has_token '--text-h3')"
check "--text-body (scale) defined" "$(has_token '--text-body:')"
check "--text-small defined"     "$(has_token '--text-small')"
check "--text-xs defined"        "$(has_token '--text-xs')"
check "clamp() used in type scale" "$(has_token 'clamp(')"

echo ""
echo "--- Line Heights ---"
check "--leading-tight defined"   "$(has_token '--leading-tight')"
check "--leading-normal defined"  "$(has_token '--leading-normal')"
check "--leading-relaxed defined" "$(has_token '--leading-relaxed')"

echo ""
echo "--- Letter Spacing ---"
check "--tracking-tight defined"  "$(has_token '--tracking-tight')"
check "--tracking-normal defined" "$(has_token '--tracking-normal')"
check "--tracking-wide defined"   "$(has_token '--tracking-wide')"

echo ""
echo "--- Spacing (8px grid) ---"
check "--space-1 defined"   "$(has_token '--space-1')"
check "--space-2 defined"   "$(has_token '--space-2')"
check "--space-3 defined"   "$(has_token '--space-3')"
check "--space-4 defined"   "$(has_token '--space-4')"
check "--space-6 defined"   "$(has_token '--space-6')"
check "--space-8 defined"   "$(has_token '--space-8')"
check "--space-12 defined"  "$(has_token '--space-12')"
check "--space-16 defined"  "$(has_token '--space-16')"
check "--space-24 defined"  "$(has_token '--space-24')"

echo ""
echo "--- Content Widths ---"
check "--content-max defined"    "$(has_token '--content-max')"
check "--content-wide defined"   "$(has_token '--content-wide')"
check "--content-full defined"   "$(has_token '--content-full')"
check "--sidebar-width defined"  "$(has_token '--sidebar-width')"

echo ""
echo "--- Motion / Easing ---"
check "--ease-spring defined"    "$(has_token '--ease-spring')"
check "--ease-settle defined"    "$(has_token '--ease-settle')"
check "--ease-default defined"   "$(has_token '--ease-default')"
check "--duration-fast defined"  "$(has_token '--duration-fast')"
check "--duration-normal defined" "$(has_token '--duration-normal')"
check "--duration-slow defined"  "$(has_token '--duration-slow')"
check "--duration-reveal defined" "$(has_token '--duration-reveal')"

echo ""
echo "--- Z-Index Scale ---"
check "--z-content defined"   "$(has_token '--z-content')"
check "--z-sticky defined"    "$(has_token '--z-sticky')"
check "--z-sidebar defined"   "$(has_token '--z-sidebar')"
check "--z-topnav defined"    "$(has_token '--z-topnav')"
check "--z-progress defined"  "$(has_token '--z-progress')"
check "--z-modal defined"     "$(has_token '--z-modal')"

echo ""
echo "--- Reduced Motion Override ---"
check "prefers-reduced-motion media query present" \
  "$(has_token 'prefers-reduced-motion')"
check "duration tokens zeroed in reduced motion" \
  "$(grep -FA 8 -- 'prefers-reduced-motion' "$FILE" 2>/dev/null | grep -qF '0ms' && echo true || echo false)"

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
