#!/usr/bin/env bash
# Verification test for Task 8: ProgressBar.astro
# RED phase: This should FAIL before implementation, PASS after.

PROJECT="."
COMPONENT="$PROJECT/src/components/navigation/ProgressBar.astro"
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

echo "=== ProgressBar.astro Verification ==="
echo ""

# 1. File existence
echo "1. File existence"
[ -f "$COMPONENT" ] && R="true" || R="false"
check "src/components/navigation/ProgressBar.astro exists" "$R"

# 2. HTML structure
echo ""
echo "2. HTML structure"
if [ -f "$COMPONENT" ]; then
  grep -q 'class="progress-bar"' "$COMPONENT" && R="true" || R="false"
  check 'outer div has class="progress-bar"' "$R"

  grep -q 'class="progress-bar__fill"' "$COMPONENT" && R="true" || R="false"
  check 'inner div has class="progress-bar__fill"' "$R"

  grep -q 'aria-hidden="true"' "$COMPONENT" && R="true" || R="false"
  check 'progress-bar has aria-hidden="true"' "$R"
else
  for desc in 'outer div has class="progress-bar"' \
              'inner div has class="progress-bar__fill"' \
              'progress-bar has aria-hidden="true"'; do
    check "$desc" "false"
  done
fi

# 3. Scoped CSS
echo ""
echo "3. Scoped CSS"
if [ -f "$COMPONENT" ]; then
  grep -q "position: fixed" "$COMPONENT" && R="true" || R="false"
  check "progress-bar is position: fixed" "$R"

  grep -q "top: 0" "$COMPONENT" && R="true" || R="false"
  check "progress-bar has top: 0" "$R"

  grep -q "height: 2px" "$COMPONENT" && R="true" || R="false"
  check "progress-bar has height: 2px" "$R"

  grep -q "var(--z-progress)" "$COMPONENT" && R="true" || R="false"
  check "uses --z-progress token for z-index" "$R"

  grep -q "pointer-events: none" "$COMPONENT" && R="true" || R="false"
  check "has pointer-events: none" "$R"

  grep -q "var(--accent)" "$COMPONENT" && R="true" || R="false"
  check "fill uses --accent token (Azure)" "$R"

  grep -q "width: 0%" "$COMPONENT" && R="true" || R="false"
  check "fill starts at width: 0%" "$R"

  grep -q "transition:" "$COMPONENT" && R="true" || R="false"
  check "fill has transition property" "$R"

  grep -q "50ms" "$COMPONENT" && R="true" || R="false"
  check "fill transition uses 50ms" "$R"
else
  for desc in "progress-bar is position: fixed" "progress-bar has top: 0" \
              "progress-bar has height: 2px" "uses --z-progress token for z-index" \
              "has pointer-events: none" "fill uses --accent token (Azure)" \
              "fill starts at width: 0%" "fill has transition property" \
              "fill transition uses 50ms"; do
    check "$desc" "false"
  done
fi

# 4. Inline script
echo ""
echo "4. Inline script"
if [ -f "$COMPONENT" ]; then
  grep -q "progress-bar__fill" "$COMPONENT" && R="true" || R="false"
  check "script queries .progress-bar__fill" "$R"

  grep -q "window.addEventListener.*scroll" "$COMPONENT" && R="true" || R="false"
  check "script adds scroll event listener" "$R"

  grep -q "passive.*true" "$COMPONENT" && R="true" || R="false"
  check "scroll listener uses passive: true" "$R"

  grep -q "scrollY\|scrollTop" "$COMPONENT" && R="true" || R="false"
  check "script reads scrollY / scrollTop" "$R"

  grep -q "scrollHeight" "$COMPONENT" && R="true" || R="false"
  check "script reads document.documentElement.scrollHeight" "$R"

  grep -q "style.width" "$COMPONENT" && R="true" || R="false"
  check "script sets fill style.width" "$R"
else
  for desc in "script queries .progress-bar__fill" \
              "script adds scroll event listener" \
              "scroll listener uses passive: true" \
              "script reads scrollY / scrollTop" \
              "script reads document.documentElement.scrollHeight" \
              "script sets fill style.width"; do
    check "$desc" "false"
  done
fi

# 5. Build
echo ""
echo "5. Build"
cd "$PROJECT"
if npm run build --silent 2>/dev/null; then
  check "npm run build succeeds" "true"
else
  check "npm run build succeeds" "false"
fi

# 6. Built HTML
echo ""
echo "6. Built HTML output"
DIST="$PROJECT/dist/index.html"
if [ -f "$DIST" ]; then
  grep -q 'progress-bar' "$DIST" && R="true" || R="false"
  check 'dist/index.html has progress-bar markup' "$R"

  grep -q 'progress-bar__fill' "$DIST" && R="true" || R="false"
  check 'dist/index.html has progress-bar__fill' "$R"
else
  check 'dist/index.html has progress-bar markup' "false"
  check 'dist/index.html has progress-bar__fill' "false"
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
