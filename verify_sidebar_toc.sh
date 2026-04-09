#!/usr/bin/env bash
# Verification test for Task 7: SidebarTOC.astro + sections.ts
# RED phase: This should FAIL before implementation, PASS after.

PROJECT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SECTIONS_FILE="$PROJECT/src/data/sections.ts"
TOC_FILE="$PROJECT/src/components/navigation/SidebarTOC.astro"
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

echo "=== SidebarTOC + sections.ts Verification ==="
echo ""

# 1. File existence
echo "1. File existence"
[ -f "$SECTIONS_FILE" ] && R="true" || R="false"
check "src/data/sections.ts exists" "$R"

[ -f "$TOC_FILE" ] && R="true" || R="false"
check "src/components/navigation/SidebarTOC.astro exists" "$R"

# 2. sections.ts structure
echo ""
echo "2. sections.ts exports"
if [ -f "$SECTIONS_FILE" ]; then
  grep -q "export interface SectionMeta" "$SECTIONS_FILE" && R="true" || R="false"
  check "exports SectionMeta interface" "$R"

  grep -q "export const sections" "$SECTIONS_FILE" && R="true" || R="false"
  check "exports sections array" "$R"

  grep -q "'s1'" "$SECTIONS_FILE" && R="true" || R="false"
  check "section s1 present" "$R"

  grep -q "'s13'" "$SECTIONS_FILE" && R="true" || R="false"
  check "section s13 present (13 total)" "$R"

  grep -q "children" "$SECTIONS_FILE" && R="true" || R="false"
  check "sections have children field" "$R"

  grep -q "'s4-session'" "$SECTIONS_FILE" && R="true" || R="false"
  check "s4 child: s4-session present" "$R"

  grep -q "'s4-coordinator'" "$SECTIONS_FILE" && R="true" || R="false"
  check "s4 child: s4-coordinator present (5 children)" "$R"

  grep -q "'s5-provider'" "$SECTIONS_FILE" && R="true" || R="false"
  check "s5 child: s5-provider present" "$R"

  grep -q "'s5-agent'" "$SECTIONS_FILE" && R="true" || R="false"
  check "s5 child: s5-agent present (6 children)" "$R"

  COUNT=$(grep -o "'s[0-9]*'" "$SECTIONS_FILE" | grep -v "s4-\|s5-" | sort -u | wc -l | tr -d ' ')
  [ "$COUNT" -eq 13 ] && R="true" || R="false"
  check "exactly 13 top-level section IDs (s1–s13)" "$R"
else
  for desc in "exports SectionMeta interface" "exports sections array" \
              "section s1 present" "section s13 present (13 total)" \
              "sections have children field" "s4 child: s4-session present" \
              "s4 child: s4-coordinator present (5 children)" \
              "s5 child: s5-provider present" "s5 child: s5-agent present (6 children)" \
              "exactly 13 top-level section IDs (s1–s13)"; do
    check "$desc" "false"
  done
fi

# 3. SidebarTOC imports
echo ""
echo "3. SidebarTOC imports"
if [ -f "$TOC_FILE" ]; then
  grep -q "sections" "$TOC_FILE" && R="true" || R="false"
  check "imports sections from sections.ts" "$R"
else
  check "imports sections from sections.ts" "false"
fi

# 4. SidebarTOC HTML structure
echo ""
echo "4. SidebarTOC HTML structure"
if [ -f "$TOC_FILE" ]; then
  grep -q 'class="sidebar-toc"' "$TOC_FILE" && R="true" || R="false"
  check 'nav has class="sidebar-toc"' "$R"

  grep -q 'aria-label="Table of Contents"' "$TOC_FILE" && R="true" || R="false"
  check "nav has aria-label Table of Contents" "$R"

  grep -q 'sidebar-toc__list' "$TOC_FILE" && R="true" || R="false"
  check "ul has class sidebar-toc__list" "$R"

  grep -q 'sidebar-toc__item' "$TOC_FILE" && R="true" || R="false"
  check "li has class sidebar-toc__item" "$R"

  grep -q 'data-section-id' "$TOC_FILE" && R="true" || R="false"
  check "li has data-section-id attribute" "$R"

  grep -q 'sidebar-toc__link' "$TOC_FILE" && R="true" || R="false"
  check "a has class sidebar-toc__link" "$R"

  grep -q 'sidebar-toc__dot' "$TOC_FILE" && R="true" || R="false"
  check "dot span has class sidebar-toc__dot" "$R"

  grep -q 'sidebar-toc__label' "$TOC_FILE" && R="true" || R="false"
  check "label span has class sidebar-toc__label" "$R"

  grep -q 'sidebar-toc__children' "$TOC_FILE" && R="true" || R="false"
  check "children ul has class sidebar-toc__children" "$R"

  grep -q 'sidebar-toc__child-link' "$TOC_FILE" && R="true" || R="false"
  check "child anchor has class sidebar-toc__child-link" "$R"
else
  for desc in 'nav has class="sidebar-toc"' "nav has aria-label Table of Contents" \
              "ul has class sidebar-toc__list" "li has class sidebar-toc__item" \
              "li has data-section-id attribute" "a has class sidebar-toc__link" \
              "dot span has class sidebar-toc__dot" "label span has class sidebar-toc__label" \
              "children ul has class sidebar-toc__children" "child anchor has class sidebar-toc__child-link"; do
    check "$desc" "false"
  done
fi

# 5. Scoped styles
echo ""
echo "5. SidebarTOC scoped styles"
if [ -f "$TOC_FILE" ]; then
  grep -q "position: fixed" "$TOC_FILE" && R="true" || R="false"
  check "sidebar-toc is position: fixed" "$R"

  grep -q "var(--z-sidebar)" "$TOC_FILE" && R="true" || R="false"
  check "uses --z-sidebar token for z-index" "$R"

  grep -q "var(--sidebar-width)" "$TOC_FILE" && R="true" || R="false"
  check "uses --sidebar-width token for width" "$R"

  grep -q "is-active" "$TOC_FILE" && R="true" || R="false"
  check ".is-active CSS class present" "$R"

  grep -q "data-hidden" "$TOC_FILE" && R="true" || R="false"
  check "[data-hidden] CSS rule present" "$R"

  grep -q "var(--accent)" "$TOC_FILE" && R="true" || R="false"
  check "uses --accent token (azure dot)" "$R"

  grep -q "pointer-events: none" "$TOC_FILE" && R="true" || R="false"
  check "hidden state has pointer-events: none" "$R"

  grep -q "max-width: 1024px" "$TOC_FILE" && R="true" || R="false"
  check "mobile breakpoint @media (max-width: 1024px) present" "$R"

  grep -q "display: none" "$TOC_FILE" && R="true" || R="false"
  check "display: none in mobile breakpoint" "$R"
else
  for desc in "sidebar-toc is position: fixed" "uses --z-sidebar token for z-index" \
              "uses --sidebar-width token for width" ".is-active CSS class present" \
              "[data-hidden] CSS rule present" "uses --accent token (azure dot)" \
              "hidden state has pointer-events: none" \
              "mobile breakpoint @media (max-width: 1024px) present" \
              "display: none in mobile breakpoint"; do
    check "$desc" "false"
  done
fi

# 6. Inline script
echo ""
echo "6. SidebarTOC inline script"
if [ -f "$TOC_FILE" ]; then
  grep -q "IntersectionObserver" "$TOC_FILE" && R="true" || R="false"
  check "IntersectionObserver created" "$R"

  grep -q "data-section" "$TOC_FILE" && R="true" || R="false"
  check "observes [data-section] elements" "$R"

  grep -q "is-active" "$TOC_FILE" && R="true" || R="false"
  check "toggles is-active class" "$R"

  grep -q "data-hidden" "$TOC_FILE" && R="true" || R="false"
  check "sets data-hidden for hero detection" "$R"
else
  for desc in "IntersectionObserver created" "observes [data-section] elements" \
              "toggles is-active class" "sets data-hidden for hero detection"; do
    check "$desc" "false"
  done
fi

# 7. Build
echo ""
echo "7. Build"
cd "$PROJECT"
if npm run build --silent 2>/dev/null; then
  check "npm run build succeeds" "true"
else
  check "npm run build succeeds" "false"
fi

# 8. Built HTML
echo ""
echo "8. Built HTML output"
DIST="$PROJECT/dist/index.html"
if [ -f "$DIST" ]; then
  grep -q 'class="sidebar-toc"' "$DIST" && R="true" || R="false"
  check 'dist/index.html has <nav class="sidebar-toc">' "$R"

  grep -q 'data-section-id="s1"' "$DIST" && R="true" || R="false"
  check "dist/index.html has data-section-id=s1" "$R"

  grep -q 'data-section-id="s13"' "$DIST" && R="true" || R="false"
  check "dist/index.html has data-section-id=s13" "$R"

  COUNT=$(grep -o 'data-section-id="s[^"]*"' "$DIST" | wc -l | tr -d ' ')
  [ "$COUNT" -eq 13 ] && R="true" || R="false"
  check "dist/index.html has exactly 13 data-section-id attributes" "$R"
else
  for desc in 'dist/index.html has <nav class="sidebar-toc">' \
              "dist/index.html has data-section-id=s1" \
              "dist/index.html has data-section-id=s13" \
              "dist/index.html has exactly 13 data-section-id attributes"; do
    check "$desc" "false"
  done
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
