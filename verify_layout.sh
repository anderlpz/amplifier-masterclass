#!/usr/bin/env bash
# Verification test for Task 10: MasterclassLayout.astro
# RED phase: This should FAIL before implementation, PASS after.

PROJECT="."
LAYOUT_FILE="$PROJECT/src/layouts/MasterclassLayout.astro"
INDEX_FILE="$PROJECT/src/pages/index.astro"
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

echo "=== MasterclassLayout.astro Verification ==="
echo ""

# 1. File existence
echo "1. File existence"
[ -f "$LAYOUT_FILE" ] && R="true" || R="false"
check "src/layouts/MasterclassLayout.astro exists" "$R"

# 2. Frontmatter imports
echo ""
echo "2. Frontmatter imports"
if [ -f "$LAYOUT_FILE" ]; then
  grep -q "import.*global.css" "$LAYOUT_FILE" && R="true" || R="false"
  check "imports global.css" "$R"

  grep -q "import ScrollProvider" "$LAYOUT_FILE" && R="true" || R="false"
  check "imports ScrollProvider" "$R"

  grep -q "import SidebarTOC" "$LAYOUT_FILE" && R="true" || R="false"
  check "imports SidebarTOC" "$R"

  grep -q "import ProgressBar" "$LAYOUT_FILE" && R="true" || R="false"
  check "imports ProgressBar" "$R"

  grep -q "import TopNav" "$LAYOUT_FILE" && R="true" || R="false"
  check "imports TopNav" "$R"
else
  for desc in "imports global.css" "imports ScrollProvider" "imports SidebarTOC" \
              "imports ProgressBar" "imports TopNav"; do
    check "$desc" "false"
  done
fi

# 3. Props interface
echo ""
echo "3. Props interface"
if [ -f "$LAYOUT_FILE" ]; then
  grep -q "interface Props" "$LAYOUT_FILE" && R="true" || R="false"
  check "Props interface defined" "$R"

  grep -q "title.*string" "$LAYOUT_FILE" && R="true" || R="false"
  check "title prop defined as optional string" "$R"

  grep -q "Amplifier Masterclass" "$LAYOUT_FILE" && R="true" || R="false"
  check "default title is 'Amplifier Masterclass'" "$R"
else
  check "Props interface defined" "false"
  check "title prop defined as optional string" "false"
  check "default title is 'Amplifier Masterclass'" "false"
fi

# 4. HTML structure
echo ""
echo "4. HTML structure"
if [ -f "$LAYOUT_FILE" ]; then
  grep -q 'lang="en"' "$LAYOUT_FILE" && R="true" || R="false"
  check '<html lang="en"> present' "$R"

  grep -q 'charset="utf-8"' "$LAYOUT_FILE" && R="true" || R="false"
  check 'meta charset="utf-8" present' "$R"

  grep -q 'name="viewport"' "$LAYOUT_FILE" && R="true" || R="false"
  check 'meta viewport present' "$R"

  grep -q 'name="description"' "$LAYOUT_FILE" && R="true" || R="false"
  check 'meta description present' "$R"

  grep -q '{title}' "$LAYOUT_FILE" && R="true" || R="false"
  check '<title>{title}</title> present' "$R"

  grep -q '<ProgressBar' "$LAYOUT_FILE" && R="true" || R="false"
  check '<ProgressBar /> rendered' "$R"

  grep -q '<TopNav' "$LAYOUT_FILE" && R="true" || R="false"
  check '<TopNav /> rendered' "$R"

  grep -q '<SidebarTOC' "$LAYOUT_FILE" && R="true" || R="false"
  check '<SidebarTOC /> rendered' "$R"

  grep -q 'client:only="react"' "$LAYOUT_FILE" && R="true" || R="false"
  check 'ScrollProvider uses client:only="react"' "$R"

  grep -q 'class="mc-main"' "$LAYOUT_FILE" && R="true" || R="false"
  check '<main class="mc-main"> present' "$R"

  grep -q '<slot' "$LAYOUT_FILE" && R="true" || R="false"
  check '<slot /> inside main' "$R"
else
  for desc in '<html lang="en"> present' 'meta charset="utf-8" present' \
              'meta viewport present' 'meta description present' \
              '<title>{title}</title> present' '<ProgressBar /> rendered' \
              '<TopNav /> rendered' '<SidebarTOC /> rendered' \
              'ScrollProvider uses client:only="react"' \
              '<main class="mc-main"> present' '<slot /> inside main'; do
    check "$desc" "false"
  done
fi

# 5. Scoped styles
echo ""
echo "5. Scoped styles"
if [ -f "$LAYOUT_FILE" ]; then
  grep -q "mc-main" "$LAYOUT_FILE" && R="true" || R="false"
  check ".mc-main style defined" "$R"

  grep -q "var(--sidebar-width)" "$LAYOUT_FILE" && R="true" || R="false"
  check "uses --sidebar-width token" "$R"

  grep -q "var(--space-8)" "$LAYOUT_FILE" && R="true" || R="false"
  check "uses --space-8 token for padding calc" "$R"

  grep -q "padding-left" "$LAYOUT_FILE" && R="true" || R="false"
  check "padding-left defined for sidebar offset" "$R"

  grep -q "min-height: 100vh" "$LAYOUT_FILE" && R="true" || R="false"
  check "min-height: 100vh present" "$R"

  grep -q "max-width: 1024px" "$LAYOUT_FILE" && R="true" || R="false"
  check "mobile breakpoint @media (max-width: 1024px) present" "$R"

  grep -q "padding-left: 0" "$LAYOUT_FILE" && R="true" || R="false"
  check "mobile resets padding-left to 0" "$R"
else
  for desc in ".mc-main style defined" "uses --sidebar-width token" \
              "uses --space-8 token for padding calc" "padding-left defined for sidebar offset" \
              "min-height: 100vh present" \
              "mobile breakpoint @media (max-width: 1024px) present" \
              "mobile resets padding-left to 0"; do
    check "$desc" "false"
  done
fi

# 6. index.astro uses layout
echo ""
echo "6. index.astro uses MasterclassLayout"
if [ -f "$INDEX_FILE" ]; then
  grep -q "import MasterclassLayout" "$INDEX_FILE" && R="true" || R="false"
  check "index.astro imports MasterclassLayout" "$R"

  grep -q "<MasterclassLayout" "$INDEX_FILE" && R="true" || R="false"
  check "index.astro uses <MasterclassLayout>" "$R"

  grep -q "import ProgressBar" "$INDEX_FILE" && R="false" || R="true"
  check "index.astro no longer manually imports ProgressBar" "$R"

  grep -q "import TopNav" "$INDEX_FILE" && R="false" || R="true"
  check "index.astro no longer manually imports TopNav" "$R"

  grep -q "import SidebarTOC" "$INDEX_FILE" && R="false" || R="true"
  check "index.astro no longer manually imports SidebarTOC" "$R"

  grep -q "import Section" "$INDEX_FILE" && R="true" || R="false"
  check "index.astro still imports Section" "$R"
else
  for desc in "index.astro imports MasterclassLayout" "index.astro uses <MasterclassLayout>" \
              "index.astro no longer manually imports ProgressBar" \
              "index.astro no longer manually imports TopNav" \
              "index.astro no longer manually imports SidebarTOC" \
              "index.astro still imports Section"; do
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

# 8. Built HTML output
echo ""
echo "8. Built HTML output"
DIST="$PROJECT/dist/index.html"
if [ -f "$DIST" ]; then
  grep -q 'lang="en"' "$DIST" && R="true" || R="false"
  check 'dist/index.html has <html lang="en">' "$R"

  grep -q 'name="viewport"' "$DIST" && R="true" || R="false"
  check "dist/index.html has meta viewport" "$R"

  grep -q 'name="description"' "$DIST" && R="true" || R="false"
  check "dist/index.html has meta description" "$R"

  grep -q 'Amplifier Masterclass' "$DIST" && R="true" || R="false"
  check "dist/index.html has title 'Amplifier Masterclass'" "$R"

  grep -q 'progress-bar' "$DIST" && R="true" || R="false"
  check "dist/index.html contains ProgressBar element" "$R"

  grep -q 'topnav' "$DIST" && R="true" || R="false"
  check "dist/index.html contains TopNav element" "$R"

  grep -q 'sidebar-toc' "$DIST" && R="true" || R="false"
  check "dist/index.html contains SidebarTOC element" "$R"

  grep -q 'mc-main' "$DIST" && R="true" || R="false"
  check 'dist/index.html has <main class="mc-main">' "$R"

  grep -q 'data-section="s1"' "$DIST" && R="true" || R="false"
  check "dist/index.html has section content (s1)" "$R"

  grep -q 'rel="stylesheet"' "$DIST" && R="true" || R="false"
  check "dist/index.html links a stylesheet (global.css bundled)" "$R"
else
  for desc in 'dist/index.html has <html lang="en">' "dist/index.html has meta viewport" \
              "dist/index.html has meta description" "dist/index.html has title 'Amplifier Masterclass'" \
              "dist/index.html contains ProgressBar element" "dist/index.html contains TopNav element" \
              "dist/index.html contains SidebarTOC element" \
              'dist/index.html has <main class="mc-main">' \
              "dist/index.html has section content (s1)" \
              "dist/index.html links a stylesheet (global.css bundled)"; do
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
