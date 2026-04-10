#!/usr/bin/env bash
# test-task1-config-cleanup.sh
# TDD verification tests for task-1: Remove React and animation dependencies
# Run BEFORE changes to confirm tests FAIL, then AFTER to confirm they PASS.

set -euo pipefail

PASS=0
FAIL=0
ERRORS=()

assert_no_match() {
  local description="$1"
  local pattern="$2"
  local file="$3"
  if grep -qE "$pattern" "$file" 2>/dev/null; then
    echo "FAIL: $description"
    echo "  Found pattern '$pattern' in $file"
    ERRORS+=("$description")
    FAIL=$((FAIL + 1))
  else
    echo "PASS: $description"
    PASS=$((PASS + 1))
  fi
}

assert_match() {
  local description="$1"
  local pattern="$2"
  local file="$3"
  if grep -qE "$pattern" "$file" 2>/dev/null; then
    echo "PASS: $description"
    PASS=$((PASS + 1))
  else
    echo "FAIL: $description"
    echo "  Pattern '$pattern' not found in $file"
    ERRORS+=("$description")
    FAIL=$((FAIL + 1))
  fi
}

assert_file_content_equals() {
  local description="$1"
  local file="$2"
  local expected="$3"
  local actual
  actual=$(cat "$file")
  if [ "$actual" = "$expected" ]; then
    echo "PASS: $description"
    ((PASS++))
  else
    echo "FAIL: $description"
    echo "  Expected:"
    echo "$expected" | head -20
    echo "  Actual:"
    echo "$actual" | head -20
    ERRORS+=("$description")
    ((FAIL++))
  fi
}

echo "========================================="
echo "Task 1: Remove React and animation deps"
echo "========================================="
echo ""

# --- package.json tests ---
echo "--- package.json ---"

assert_no_match \
  "package.json: no @astrojs/react dependency" \
  "@astrojs/react" \
  "package.json"

assert_no_match \
  "package.json: no @phosphor-icons/react dependency" \
  "@phosphor-icons/react" \
  "package.json"

assert_no_match \
  "package.json: no @types/react dependency" \
  "@types/react" \
  "package.json"

assert_no_match \
  "package.json: no @types/react-dom dependency" \
  "@types/react-dom" \
  "package.json"

assert_no_match \
  "package.json: no react dependency" \
  '"react"' \
  "package.json"

assert_no_match \
  "package.json: no react-dom dependency" \
  "react-dom" \
  "package.json"

assert_no_match \
  "package.json: no gsap dependency" \
  "gsap" \
  "package.json"

assert_no_match \
  "package.json: no lenis dependency" \
  "lenis" \
  "package.json"

assert_match \
  "package.json: astro dependency present" \
  '"astro"' \
  "package.json"

assert_match \
  "package.json: typescript dependency present" \
  '"typescript"' \
  "package.json"

# Acceptance criteria check: grep -E 'react|gsap|lenis|phosphor' package.json returns no matches
echo ""
echo "--- Acceptance Criteria grep check ---"
if grep -qE 'react|gsap|lenis|phosphor' package.json 2>/dev/null; then
  echo "FAIL: grep -E 'react|gsap|lenis|phosphor' package.json should return no matches"
  echo "  Offending lines:"
  grep -E 'react|gsap|lenis|phosphor' package.json
  ERRORS+=("grep acceptance criteria: no react|gsap|lenis|phosphor in package.json")
  ((FAIL++))
else
  echo "PASS: grep -E 'react|gsap|lenis|phosphor' package.json returns no matches"
  ((PASS++))
fi

echo ""
echo "--- astro.config.mjs ---"

assert_no_match \
  "astro.config.mjs: no import react line" \
  "import react" \
  "astro.config.mjs"

assert_no_match \
  "astro.config.mjs: no @astrojs/react import" \
  "@astrojs/react" \
  "astro.config.mjs"

assert_no_match \
  "astro.config.mjs: no integrations array with react()" \
  "integrations.*react\(\)" \
  "astro.config.mjs"

assert_no_match \
  "astro.config.mjs: no integrations key at all" \
  "integrations" \
  "astro.config.mjs"

assert_match \
  "astro.config.mjs: output static present" \
  "output.*static" \
  "astro.config.mjs"

assert_match \
  "astro.config.mjs: base /masterclass-preview/ present" \
  "base.*masterclass-preview" \
  "astro.config.mjs"

assert_match \
  "astro.config.mjs: devToolbar disabled" \
  "devToolbar.*enabled.*false" \
  "astro.config.mjs"

assert_match \
  "astro.config.mjs: server host 0.0.0.0" \
  "host.*0\.0\.0\.0" \
  "astro.config.mjs"

assert_match \
  "astro.config.mjs: server port 4322" \
  "port.*4322" \
  "astro.config.mjs"

assert_match \
  "astro.config.mjs: vite allowedHosts from env" \
  "allowedHosts" \
  "astro.config.mjs"

echo ""
echo "--- tsconfig.json ---"

assert_no_match \
  "tsconfig.json: no jsx config" \
  '"jsx"' \
  "tsconfig.json"

assert_no_match \
  "tsconfig.json: no jsxImportSource" \
  "jsxImportSource" \
  "tsconfig.json"

assert_no_match \
  "tsconfig.json: no compilerOptions" \
  "compilerOptions" \
  "tsconfig.json"

assert_match \
  "tsconfig.json: extends astro/tsconfigs/strict" \
  'extends.*astro/tsconfigs/strict' \
  "tsconfig.json"

echo ""
echo "========================================="
echo "Results: $PASS passed, $FAIL failed"
echo "========================================="

if [ $FAIL -gt 0 ]; then
  echo ""
  echo "FAILED tests:"
  for err in "${ERRORS[@]}"; do
    echo "  - $err"
  done
  exit 1
else
  echo "ALL TESTS PASSED"
  exit 0
fi
