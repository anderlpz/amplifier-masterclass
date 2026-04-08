#!/bin/bash
# Verification test for task-1-scaffold
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

echo ""
echo "=== Scaffold Verification Tests ==="
echo ""

echo "--- Required Files ---"
check "package.json exists" "$([ -f $ROOT/package.json ] && echo true || echo false)"
check "astro.config.mjs exists" "$([ -f $ROOT/astro.config.mjs ] && echo true || echo false)"
check "tsconfig.json exists" "$([ -f $ROOT/tsconfig.json ] && echo true || echo false)"
check ".gitignore exists" "$([ -f $ROOT/.gitignore ] && echo true || echo false)"
check "src/pages/index.astro exists" "$([ -f $ROOT/src/pages/index.astro ] && echo true || echo false)"

echo ""
echo "--- Required Directories ---"
check "src/layouts exists" "$([ -d $ROOT/src/layouts ] && echo true || echo false)"
check "src/components/navigation exists" "$([ -d $ROOT/src/components/navigation ] && echo true || echo false)"
check "src/components/sections exists" "$([ -d $ROOT/src/components/sections ] && echo true || echo false)"
check "src/components/content exists" "$([ -d $ROOT/src/components/content ] && echo true || echo false)"
check "src/components/scroll exists" "$([ -d $ROOT/src/components/scroll ] && echo true || echo false)"
check "src/pages exists" "$([ -d $ROOT/src/pages ] && echo true || echo false)"
check "src/styles exists" "$([ -d $ROOT/src/styles ] && echo true || echo false)"
check "src/data exists" "$([ -d $ROOT/src/data ] && echo true || echo false)"
check "public/fonts exists" "$([ -d $ROOT/public/fonts ] && echo true || echo false)"
check "node_modules exists (npm install ran)" "$([ -d $ROOT/node_modules ] && echo true || echo false)"

echo ""
echo "--- package.json Contents ---"
PKG=$ROOT/package.json
check "name is amplifier-masterclass" "$(node -e "const p=require('$PKG'); console.log(p.name==='amplifier-masterclass')" 2>/dev/null || echo false)"
check "type is module" "$(node -e "const p=require('$PKG'); console.log(p.type==='module')" 2>/dev/null || echo false)"
check "private is true" "$(node -e "const p=require('$PKG'); console.log(p.private===true)" 2>/dev/null || echo false)"
check "astro dependency present" "$(node -e "const p=require('$PKG'); console.log(!!p.dependencies['astro'])" 2>/dev/null || echo false)"
check "react dependency present" "$(node -e "const p=require('$PKG'); console.log(!!p.dependencies['react'])" 2>/dev/null || echo false)"
check "@astrojs/react present" "$(node -e "const p=require('$PKG'); console.log(!!p.dependencies['@astrojs/react'])" 2>/dev/null || echo false)"
check "gsap present" "$(node -e "const p=require('$PKG'); console.log(!!p.dependencies['gsap'])" 2>/dev/null || echo false)"
check "lenis present" "$(node -e "const p=require('$PKG'); console.log(!!p.dependencies['lenis'])" 2>/dev/null || echo false)"
check "@phosphor-icons/react present" "$(node -e "const p=require('$PKG'); console.log(!!p.dependencies['@phosphor-icons/react'])" 2>/dev/null || echo false)"
check "d3 NOT present (phase 3 only)" "$(node -e "const p=require('$PKG'); console.log(!p.dependencies['d3'] && !p.dependencies['d3-graphviz'])" 2>/dev/null || echo false)"
check "dev script includes astro dev" "$(node -e "const p=require('$PKG'); console.log(p.scripts.dev.includes('astro dev'))" 2>/dev/null || echo false)"
check "dev script has --host 0.0.0.0" "$(node -e "const p=require('$PKG'); console.log(p.scripts.dev.includes('--host 0.0.0.0'))" 2>/dev/null || echo false)"

echo ""
echo "--- dist/ (astro build output) ---"
check "dist/ directory exists (build ran)" "$([ -d $ROOT/dist ] && echo true || echo false)"
check "dist/index.html exists" "$([ -f $ROOT/dist/index.html ] && echo true || echo false)"

echo ""
echo "--- Git Repository ---"
check "git repo initialized (.git exists)" "$([ -d $ROOT/.git ] && echo true || echo false)"
check "has at least one commit" "$(cd $ROOT && git log --oneline 2>/dev/null | head -1 | grep -q . && echo true || echo false)"

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
