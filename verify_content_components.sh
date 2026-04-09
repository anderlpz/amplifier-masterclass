#!/usr/bin/env bash
# Verification test for Task 11: Content Components
# This should FAIL before implementation, PASS after.
set -e

PROJECT="."
PASS=0
FAIL=0
ERRORS=()

check() {
  local desc="$1"
  local result="$2"
  if [ "$result" = "true" ]; then
    echo "  ✅ $desc"
    ((PASS++))
  else
    echo "  ❌ $desc"
    ERRORS+=("$desc")
    ((FAIL++))
  fi
}

echo "=== Content Components Verification ==="
echo ""

echo "1. File existence"
[ -f "$PROJECT/src/components/content/Eyebrow.astro" ] && R="true" || R="false"
check "Eyebrow.astro exists" "$R"
[ -f "$PROJECT/src/components/content/NumberedRow.astro" ] && R="true" || R="false"
check "NumberedRow.astro exists" "$R"
[ -f "$PROJECT/src/components/content/FloatingVisual.astro" ] && R="true" || R="false"
check "FloatingVisual.astro exists" "$R"
[ -f "$PROJECT/src/components/content/UpNextTeaser.astro" ] && R="true" || R="false"
check "UpNextTeaser.astro exists" "$R"

echo ""
echo "2. Eyebrow.astro"
EYEBROW="$PROJECT/src/components/content/Eyebrow.astro"
if [ -f "$EYEBROW" ]; then
  grep -q "label" "$EYEBROW" && R="true" || R="false"
  check "Eyebrow accepts label prop" "$R"
  grep -q 'class="eyebrow"' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow has .eyebrow span" "$R"
  grep -q '•' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow has bullet prefix" "$R"
  grep -q 'var(--font-mono)' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow uses --font-mono" "$R"
  grep -q 'var(--text-small)' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow uses --text-small" "$R"
  grep -q 'var(--text-muted)' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow uses --text-muted" "$R"
  grep -q 'var(--tracking-wide)' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow uses --tracking-wide" "$R"
  grep -q 'var(--space-3)' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow uses --space-3 for margin-bottom" "$R"
  grep -q 'text-transform.*uppercase' "$EYEBROW" && R="true" || R="false"
  check "Eyebrow has text-transform uppercase" "$R"
else
  for d in "prop" "span" "bullet" "--font-mono" "--text-small" "--text-muted" "--tracking-wide" "--space-3" "uppercase"; do
    check "Eyebrow $d" "false"; done
fi

echo ""
echo "3. NumberedRow.astro"
NR="$PROJECT/src/components/content/NumberedRow.astro"
if [ -f "$NR" ]; then
  grep -q "number" "$NR" && R="true" || R="false"
  check "NumberedRow accepts number prop" "$R"
  grep -q "label" "$NR" && R="true" || R="false"
  check "NumberedRow accepts label prop" "$R"
  grep -q "description" "$NR" && R="true" || R="false"
  check "NumberedRow accepts description prop" "$R"
  grep -q 'class="numbered-row"' "$NR" && R="true" || R="false"
  check "NumberedRow has .numbered-row root" "$R"
  grep -q 'numbered-row__number' "$NR" && R="true" || R="false"
  check "NumberedRow has __number element" "$R"
  grep -q 'numbered-row__label' "$NR" && R="true" || R="false"
  check "NumberedRow has __label element" "$R"
  grep -q 'numbered-row__desc' "$NR" && R="true" || R="false"
  check "NumberedRow has __desc element" "$R"
  grep -q 'var(--accent)' "$NR" && R="true" || R="false"
  check "NumberedRow uses --accent" "$R"
  grep -q 'var(--divider)' "$NR" && R="true" || R="false"
  check "NumberedRow uses --divider" "$R"
  grep -q 'var(--font-mono)' "$NR" && R="true" || R="false"
  check "NumberedRow uses --font-mono" "$R"
  grep -q 'description &&' "$NR" && R="true" || R="false"
  check "NumberedRow conditionally renders description" "$R"
else
  for d in number label description root __number __label __desc accent divider mono conditional; do
    check "NumberedRow $d" "false"; done
fi

echo ""
echo "4. FloatingVisual.astro"
FV="$PROJECT/src/components/content/FloatingVisual.astro"
if [ -f "$FV" ]; then
  grep -q "src" "$FV" && R="true" || R="false"
  check "FloatingVisual accepts src prop" "$R"
  grep -q "alt" "$FV" && R="true" || R="false"
  check "FloatingVisual accepts alt prop" "$R"
  grep -q "caption" "$FV" && R="true" || R="false"
  check "FloatingVisual accepts caption prop" "$R"
  grep -q '<figure' "$FV" && R="true" || R="false"
  check "FloatingVisual uses figure element" "$R"
  grep -q 'class="floating-visual"' "$FV" && R="true" || R="false"
  check "FloatingVisual has .floating-visual class" "$R"
  grep -q 'loading="lazy"' "$FV" && R="true" || R="false"
  check "FloatingVisual has lazy loading" "$R"
  grep -q 'floating-visual__caption' "$FV" && R="true" || R="false"
  check "FloatingVisual has __caption element" "$R"
  grep -q 'caption &&' "$FV" && R="true" || R="false"
  check "FloatingVisual conditionally renders caption" "$R"
  grep -q 'var(--text-muted)' "$FV" && R="true" || R="false"
  check "FloatingVisual uses --text-muted" "$R"
  grep -q 'var(--space-8)' "$FV" && R="true" || R="false"
  check "FloatingVisual uses --space-8" "$R"
else
  for d in src alt caption figure class lazy caption__el conditional muted space8; do
    check "FloatingVisual $d" "false"; done
fi

echo ""
echo "5. UpNextTeaser.astro"
UN="$PROJECT/src/components/content/UpNextTeaser.astro"
if [ -f "$UN" ]; then
  grep -q "nextSection" "$UN" && R="true" || R="false"
  check "UpNextTeaser accepts nextSection prop" "$R"
  grep -q "teaser" "$UN" && R="true" || R="false"
  check "UpNextTeaser accepts teaser prop" "$R"
  grep -q 'class="up-next"' "$UN" && R="true" || R="false"
  check "UpNextTeaser has .up-next root" "$R"
  grep -q 'up-next__label' "$UN" && R="true" || R="false"
  check "UpNextTeaser has __label element" "$R"
  grep -q 'up-next__section' "$UN" && R="true" || R="false"
  check "UpNextTeaser has __section element" "$R"
  grep -q 'up-next__teaser' "$UN" && R="true" || R="false"
  check "UpNextTeaser has __teaser element" "$R"
  grep -q 'var(--font-serif)' "$UN" && R="true" || R="false"
  check "UpNextTeaser uses --font-serif" "$R"
  grep -q 'var(--font-mono)' "$UN" && R="true" || R="false"
  check "UpNextTeaser uses --font-mono" "$R"
  grep -q 'var(--divider)' "$UN" && R="true" || R="false"
  check "UpNextTeaser uses --divider" "$R"
  grep -q 'var(--text-h3)' "$UN" && R="true" || R="false"
  check "UpNextTeaser uses --text-h3" "$R"
  grep -q 'var(--space-12)' "$UN" && R="true" || R="false"
  check "UpNextTeaser uses --space-12" "$R"
else
  for d in nextSection teaser root __label __section __teaser serif mono divider h3 space12; do
    check "UpNextTeaser $d" "false"; done
fi

echo ""
echo "6. Build"
cd "$PROJECT"
if npm run build --silent 2>/dev/null; then
  check "npm run build succeeds" "true"
else
  check "npm run build succeeds" "false"
fi

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
if [ $FAIL -gt 0 ]; then
  echo "FAILED"
  exit 1
else
  echo "ALL PASSED"
  exit 0
fi
