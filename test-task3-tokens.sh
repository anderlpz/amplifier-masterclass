#!/bin/bash
# Test for task-3: Replace tokens.css with v3 light-theme tokens
# RED phase: This should FAIL before implementation (file not yet copied).
# GREEN phase: Passes after cp .design/tokens.css src/styles/tokens.css.

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

echo ""
echo "=== Task-3: v3 Light-Theme Token Verification ==="
echo ""

# --- Acceptance Criterion 1: Header shows 'Version: 3.0 — Paper Frame' ---
echo "--- Header: Version 3.0 Paper Frame ---"
check "Header contains 'Version: 3.0'" \
  "$(grep -qF 'Version: 3.0' "$FILE" 2>/dev/null && echo true || echo false)"
check "Header contains 'Paper Frame'" \
  "$(grep -qF 'Paper Frame' "$FILE" 2>/dev/null && echo true || echo false)"

echo ""
# --- Acceptance Criterion 2: --bg-canvas is #EDEBE6 ---
echo "--- Canvas: --bg-canvas: #EDEBE6 ---"
check "--bg-canvas defined" \
  "$(grep -qF -- '--bg-canvas' "$FILE" 2>/dev/null && echo true || echo false)"
check "--bg-canvas value is #EDEBE6 (warm stone)" \
  "$(grep -qF -- '--bg-canvas:' "$FILE" 2>/dev/null && grep -qF '#EDEBE6' "$FILE" 2>/dev/null && echo true || echo false)"

echo ""
# --- Acceptance Criterion 3: No dark-mode color values ---
# The v2 file had --bg-void: #0F0F13 and --bg-slate: #161619 (very dark near-black colours)
echo "--- No Dark-Mode Background Colors ---"
check "No --bg-void (v2 dark ground removed)" \
  "$(grep -qF -- '--bg-void' "$FILE" 2>/dev/null && echo false || echo true)"
check "No --bg-slate (v2 dark ground removed)" \
  "$(grep -qF -- '--bg-slate' "$FILE" 2>/dev/null && echo false || echo true)"
check "No near-black #0F0F13 (v2 void color)" \
  "$(grep -qF '#0F0F13' "$FILE" 2>/dev/null && echo false || echo true)"
check "No near-black #161619 (v2 slate color)" \
  "$(grep -qF '#161619' "$FILE" 2>/dev/null && echo false || echo true)"

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
