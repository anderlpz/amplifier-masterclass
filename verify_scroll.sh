#!/usr/bin/env bash
# Verification test for Task 6: ScrollProvider.tsx
# RED phase: This should FAIL before implementation, PASS after.

PROJECT="."
FILE="$PROJECT/src/components/scroll/ScrollProvider.tsx"
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

echo "=== ScrollProvider.tsx Verification ==="
echo ""

# Test 1: File exists
echo "1. File existence"
[ -f "$FILE" ] && R="true" || R="false"
check "src/components/scroll/ScrollProvider.tsx exists" "$R"

# Test 2: Imports
echo ""
echo "2. Imports"
if [ -f "$FILE" ]; then
  grep -q "from 'gsap'" "$FILE" && R="true" || R="false"
  check "imports from 'gsap'" "$R"

  grep -q "from 'gsap/ScrollTrigger'" "$FILE" && R="true" || R="false"
  check "imports from 'gsap/ScrollTrigger'" "$R"

  grep -q "from 'lenis'" "$FILE" && R="true" || R="false"
  check "imports from 'lenis'" "$R"

  grep -q "useEffect" "$FILE" && R="true" || R="false"
  check "imports useEffect from React" "$R"

  grep -q "ReactNode" "$FILE" && R="true" || R="false"
  check "imports ReactNode type" "$R"
else
  check "imports from 'gsap'" "false"
  check "imports from 'gsap/ScrollTrigger'" "false"
  check "imports from 'lenis'" "false"
  check "imports useEffect from React" "false"
  check "imports ReactNode type" "false"
fi

# Test 3: GSAP plugin registration
echo ""
echo "3. GSAP ScrollTrigger registration"
if [ -f "$FILE" ]; then
  grep -q "gsap.registerPlugin(ScrollTrigger)" "$FILE" && R="true" || R="false"
  check "gsap.registerPlugin(ScrollTrigger) is called" "$R"
else
  check "gsap.registerPlugin(ScrollTrigger) is called" "false"
fi

# Test 4: Lenis initialization with autoRaf: false
echo ""
echo "4. Lenis initialization"
if [ -f "$FILE" ]; then
  grep -q "autoRaf.*false\|autoRaf: false" "$FILE" && R="true" || R="false"
  check "Lenis initialized with autoRaf: false" "$R"
else
  check "Lenis initialized with autoRaf: false" "false"
fi

# Test 5: GSAP ticker drives Lenis
echo ""
echo "5. GSAP ticker integration"
if [ -f "$FILE" ]; then
  grep -q "gsap.ticker.add" "$FILE" && R="true" || R="false"
  check "gsap.ticker.add is called" "$R"

  grep -q "lenis.raf\|lenis!.raf" "$FILE" && R="true" || R="false"
  check "lenis.raf is called inside ticker" "$R"

  grep -q "time \* 1000\|time\*1000" "$FILE" && R="true" || R="false"
  check "GSAP time converted to ms (* 1000)" "$R"
else
  check "gsap.ticker.add is called" "false"
  check "lenis.raf is called inside ticker" "false"
  check "GSAP time converted to ms (* 1000)" "false"
fi

# Test 6: lagSmoothing(0)
echo ""
echo "6. Lag smoothing disabled"
if [ -f "$FILE" ]; then
  grep -q "lagSmoothing(0)" "$FILE" && R="true" || R="false"
  check "gsap.ticker.lagSmoothing(0) is called" "$R"
else
  check "gsap.ticker.lagSmoothing(0) is called" "false"
fi

# Test 7: ScrollTrigger sync
echo ""
echo "7. ScrollTrigger sync"
if [ -f "$FILE" ]; then
  grep -q "ScrollTrigger.update" "$FILE" && R="true" || R="false"
  check "lenis.on('scroll', ScrollTrigger.update) syncs the two systems" "$R"
else
  check "lenis.on('scroll', ScrollTrigger.update) syncs the two systems" "false"
fi

# Test 8: prefers-reduced-motion
echo ""
echo "8. Accessibility"
if [ -f "$FILE" ]; then
  grep -q "prefers-reduced-motion" "$FILE" && R="true" || R="false"
  check "prefers-reduced-motion is checked" "$R"
else
  check "prefers-reduced-motion is checked" "false"
fi

# Test 9: Cleanup on unmount
echo ""
echo "9. Cleanup"
if [ -f "$FILE" ]; then
  grep -q "\.destroy()" "$FILE" && R="true" || R="false"
  check "lenis.destroy() called on unmount" "$R"

  grep -q "gsap.ticker.remove" "$FILE" && R="true" || R="false"
  check "gsap.ticker.remove called on unmount" "$R"

  grep -q "\.kill()" "$FILE" && R="true" || R="false"
  check "ScrollTrigger instances killed on unmount" "$R"
else
  check "lenis.destroy() called on unmount" "false"
  check "gsap.ticker.remove called on unmount" "false"
  check "ScrollTrigger instances killed on unmount" "false"
fi

# Test 10: Component structure
echo ""
echo "10. Component structure"
if [ -f "$FILE" ]; then
  grep -q "children" "$FILE" && R="true" || R="false"
  check "Component accepts children prop" "$R"

  grep -q "<>{children}</>" "$FILE" && R="true" || R="false"
  check "Component renders children directly (fragment)" "$R"

  grep -q "export default" "$FILE" && R="true" || R="false"
  check "Component is default export" "$R"
else
  check "Component accepts children prop" "false"
  check "Component renders children directly (fragment)" "false"
  check "Component is default export" "false"
fi

# Test 11: Build succeeds
echo ""
echo "11. Build"
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
