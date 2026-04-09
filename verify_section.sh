#!/usr/bin/env bash
# Verification test for Task 5: Section.astro
# This should FAIL before implementation, PASS after.
set -e

PROJECT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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

echo "=== Section.astro Verification ==="
echo ""

# Test 1: Component file exists
echo "1. File existence"
[ -f "$PROJECT/src/components/sections/Section.astro" ] && R="true" || R="false"
check "src/components/sections/Section.astro exists" "$R"

# Test 2: Component has required props structure
echo ""
echo "2. Component structure"
if [ -f "$PROJECT/src/components/sections/Section.astro" ]; then
  grep -q "id" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component accepts id prop" "$R"
  grep -q "label" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component accepts label prop" "$R"
  grep -q "background" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component accepts background prop" "$R"
  grep -q "data-section" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component outputs data-section attribute" "$R"
  grep -q "data-label" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component outputs data-label attribute" "$R"
  grep -q "aria-label" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component outputs aria-label attribute" "$R"
  grep -q "mc-section__inner" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component has mc-section__inner wrapper" "$R"
  grep -q "<slot" "$PROJECT/src/components/sections/Section.astro" && R="true" || R="false"
  check "Component has slot" "$R"
else
  check "Component accepts id prop" "false"
  check "Component accepts label prop" "false"
  check "Component accepts background prop" "false"
  check "Component outputs data-section attribute" "false"
  check "Component outputs data-label attribute" "false"
  check "Component outputs aria-label attribute" "false"
  check "Component has mc-section__inner wrapper" "false"
  check "Component has slot" "false"
fi

# Test 3: index.astro imports Section.astro
echo ""
echo "3. index.astro integration"
grep -q "Section" "$PROJECT/src/pages/index.astro" && R="true" || R="false"
check "index.astro imports Section component" "$R"
grep -q "global.css" "$PROJECT/src/pages/index.astro" && R="true" || R="false"
check "index.astro imports global.css" "$R"

# Test 4: Build succeeds
echo ""
echo "4. Build output"
cd "$PROJECT"
if npm run build --silent 2>/dev/null; then
  check "npm run build succeeds" "true"
else
  check "npm run build succeeds" "false"
fi

# Test 5: Built HTML contains correct sections
if [ -f "$PROJECT/dist/index.html" ]; then
  grep -q 'id="s1"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has section id=s1" "$R"
  grep -q 'id="s3"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has section id=s3" "$R"
  grep -q 'id="s4"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has section id=s4" "$R"
  grep -q 'class="mc-section primary-dark"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has .mc-section.primary-dark class" "$R"
  grep -q 'class="mc-section palette-break"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has .mc-section.palette-break class" "$R"
  grep -q 'class="mc-section secondary-dark"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has .mc-section.secondary-dark class" "$R"
  grep -q 'data-section="s1"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has data-section=s1" "$R"
  grep -q 'data-label="Introduction"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has data-label=Introduction" "$R"
  grep -q 'aria-label="Introduction"' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has aria-label=Introduction" "$R"
  grep -q 'mc-section__inner' "$PROJECT/dist/index.html" && R="true" || R="false"
  check "dist/index.html has mc-section__inner" "$R"
else
  check "dist/index.html has section id=s1" "false"
  check "dist/index.html has section id=s3" "false"
  check "dist/index.html has section id=s4" "false"
  check "dist/index.html has .mc-section.primary-dark class" "false"
  check "dist/index.html has .mc-section.palette-break class" "false"
  check "dist/index.html has .mc-section.secondary-dark class" "false"
  check "dist/index.html has data-section=s1" "false"
  check "dist/index.html has data-label=Introduction" "false"
  check "dist/index.html has aria-label=Introduction" "false"
  check "dist/index.html has mc-section__inner" "false"
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
