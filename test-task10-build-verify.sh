#!/bin/bash
# test-task10-build-verify.sh
# TDD test for task-10: Build and verify
# Tests run BEFORE build to verify what's expected, then after build to confirm.
#
# RED PHASE: Some tests will fail if dist is stale or doesn't meet criteria.
# GREEN PHASE: After build, all tests should pass.

set -euo pipefail

DIST="dist"
PASS=0
FAIL=0
ERRORS=()

check() {
  local desc="$1"
  local result="$2"
  local expected="$3"

  if [ "$result" = "$expected" ]; then
    echo "  ✅ PASS: $desc"
    PASS=$((PASS + 1))
  else
    echo "  ❌ FAIL: $desc"
    echo "       expected: $expected"
    echo "       got:      $result"
    FAIL=$((FAIL + 1))
    ERRORS+=("$desc")
  fi
}

check_contains() {
  local desc="$1"
  local file="$2"
  local pattern="$3"

  if grep -q "$pattern" "$file" 2>/dev/null; then
    echo "  ✅ PASS: $desc"
    PASS=$((PASS + 1))
  else
    echo "  ❌ FAIL: $desc"
    echo "       pattern '$pattern' not found in $file"
    FAIL=$((FAIL + 1))
    ERRORS+=("$desc")
  fi
}

check_file_exists() {
  local desc="$1"
  local file="$2"

  if [ -f "$file" ]; then
    echo "  ✅ PASS: $desc"
    PASS=$((PASS + 1))
  else
    echo "  ❌ FAIL: $desc"
    echo "       file not found: $file"
    FAIL=$((FAIL + 1))
    ERRORS+=("$desc")
  fi
}

echo ""
echo "═══════════════════════════════════════════════════════════"
echo " Task 10 — Build & Verify"
echo "═══════════════════════════════════════════════════════════"
echo ""

# --- Test 1: dist/chapters/1/index.html exists ---
echo "Test 1: Chapter 1 file exists"
check_file_exists "dist/chapters/1/index.html exists" "$DIST/chapters/1/index.html"

# --- Test 2: 'Chapter 1' appears in chapter 1 ---
echo "Test 2: Chapter 1 contains 'Chapter 1' text"
if [ -f "$DIST/chapters/1/index.html" ]; then
  count=$(grep -o 'Chapter 1' "$DIST/chapters/1/index.html" | wc -l | tr -d ' ')
  check "Chapter 1 appears in chapter 1 page" "$([[ $count -gt 0 ]] && echo yes || echo no)" "yes"
  echo "       (found $count occurrences)"
else
  echo "  ⏭  SKIP: file not found"
  FAIL=$((FAIL + 1))
  ERRORS+=("Chapter 1 text check skipped - file missing")
fi

# --- Test 3: navbar renders in chapter 1 ---
echo "Test 3: navbar markup present in chapter 1"
if [ -f "$DIST/chapters/1/index.html" ]; then
  check_contains "navbar markup in chapter 1" "$DIST/chapters/1/index.html" "navbar"
else
  echo "  ⏭  SKIP: file not found"
  FAIL=$((FAIL + 1))
  ERRORS+=("navbar check skipped - file missing")
fi

# --- Test 4: 13 toc-overlay__item entries in chapter 1 ---
echo "Test 4: exactly 13 toc-overlay__item entries in chapter 1"
if [ -f "$DIST/chapters/1/index.html" ]; then
  toc_count=$(grep -c 'toc-overlay__item' "$DIST/chapters/1/index.html" || echo 0)
  check "13 toc-overlay__item entries" "$toc_count" "13"
else
  echo "  ⏭  SKIP: file not found"
  FAIL=$((FAIL + 1))
  ERRORS+=("TOC count check skipped - file missing")
fi

# --- Test 5: Chapter 6 file exists ---
echo "Test 5: Chapter 6 file exists"
check_file_exists "dist/chapters/6/index.html exists" "$DIST/chapters/6/index.html"

# --- Test 6: 'Chapter 6' appears in chapter 6 ---
echo "Test 6: Chapter 6 contains 'Chapter 6' text"
if [ -f "$DIST/chapters/6/index.html" ]; then
  check_contains "Chapter 6 text in chapter 6 page" "$DIST/chapters/6/index.html" "Chapter 6"
else
  echo "  ⏭  SKIP: file not found"
  FAIL=$((FAIL + 1))
  ERRORS+=("Chapter 6 text check skipped - file missing")
fi

# --- Test 7: 'The Orchestrator' appears in chapter 6 ---
echo "Test 7: Chapter 6 contains 'The Orchestrator' title"
if [ -f "$DIST/chapters/6/index.html" ]; then
  check_contains "The Orchestrator title in chapter 6" "$DIST/chapters/6/index.html" "The Orchestrator"
else
  echo "  ⏭  SKIP: file not found"
  FAIL=$((FAIL + 1))
  ERRORS+=("Orchestrator title check skipped - file missing")
fi

# --- Test 8: All 13 chapter dirs exist ---
echo "Test 8: All 13 chapter directories exist"
all_exist=true
for i in $(seq 1 13); do
  if [ ! -f "$DIST/chapters/$i/index.html" ]; then
    all_exist=false
    echo "       missing: dist/chapters/$i/index.html"
  fi
done
check "All 13 chapter index.html files exist" "$([[ $all_exist == true ]] && echo yes || echo no)" "yes"

# --- Test 9: index.html redirect exists ---
echo "Test 9: Root index.html exists (redirect)"
check_file_exists "dist/index.html redirect exists" "$DIST/index.html"

# --- Test 10: masterclass-preview dir is populated (after rsync) ---
echo "Test 10: ~/masterclass-preview/chapters/1/index.html exists (after rsync)"
check_file_exists "masterclass-preview/chapters/1/index.html" "$HOME/masterclass-preview/chapters/1/index.html"

# --- Test 11: TOC overlay links use number-based paths (not slugs) ---
echo "Test 11: TOC overlay links use number-based chapter paths"
if [ -f "$DIST/chapters/1/index.html" ]; then
  # Extract first href pointing to a chapters/ path from the TOC overlay links
  first_toc_href=$(grep -o 'href="[^"]*chapters/[^"]*"' "$DIST/chapters/1/index.html" | head -1)
  # Should match /chapters/1/ (number), not /chapters/some-slug/ (slug)
  check "TOC link uses number-based path (not slug)" \
    "$(echo "$first_toc_href" | grep -c '/chapters/[0-9]\+/' || echo 0)" "1"
else
  echo "  ❌ FAIL: file not found: $DIST/chapters/1/index.html"
  FAIL=$((FAIL + 1))
  ERRORS+=("TOC link path check - file missing")
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo " Results: $PASS passed, $FAIL failed"

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo ""
  echo " Failed tests:"
  for err in "${ERRORS[@]}"; do
    echo "   - $err"
  done
fi

echo "═══════════════════════════════════════════════════════════"
echo ""

if [ $FAIL -gt 0 ]; then
  exit 1
fi
exit 0
