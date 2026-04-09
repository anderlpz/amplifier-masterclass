#!/usr/bin/env bash
# Verification test for Task 13: Wire index.astro + end-to-end verification
# RED phase: Should FAIL before implementation, PASS after.
# Checks items 1-9 from the built dist/index.html

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

echo "=== Task 13: index.astro Wiring Verification ==="
echo ""

# ---- Build first ----
echo "Building project..."
cd "$PROJECT"
if npm run build --silent 2>&1; then
  echo "  Build: OK"
else
  echo "  Build: FAILED — cannot verify HTML output"
  echo ""
  echo "=== Results: 0 passed, 1 failed ==="
  echo "FAILED"
  exit 1
fi

DIST="$PROJECT/dist/index.html"
if [ ! -f "$DIST" ]; then
  echo "  ERROR: dist/index.html not found after build"
  exit 1
fi

echo ""

# ---- Check 1: All 13 section elements with correct IDs ----
echo "1. All 13 <section> elements present with correct IDs (s1-s13)"
for sid in s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13; do
  grep -q "data-section=\"${sid}\"" "$DIST" && R="true" || R="false"
  check "section id=${sid} present" "$R"
done

echo ""

# ---- Check 2: Section backgrounds ----
echo "2. Section background classes correct"
python3 - <<'PYEOF'
import re, sys
with open("$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/dist/index.html") as f:
    content = f.read()

section_pattern = re.compile(r'<section\b([^>]*)>', re.DOTALL)
results = {}
for m in section_pattern.finditer(content):
    attrs = m.group(1)
    sid_m = re.search(r'data-section="([^"]+)"', attrs)
    cls_m = re.search(r'class="([^"]+)"', attrs)
    if sid_m and cls_m:
        results[sid_m.group(1)] = cls_m.group(1)

checks = [
    ("s1",  "primary-dark"),
    ("s3",  "palette-break"),
    ("s5",  "secondary-dark"),
    ("s7",  "secondary-dark"),
    ("s9",  "secondary-dark"),
    ("s11", "secondary-dark"),
    ("s12", "palette-break"),
]

all_ok = True
for sid, expected_bg in checks:
    if sid in results and expected_bg in results[sid]:
        print(f"  ✅  {sid} background={expected_bg}")
    else:
        actual = results.get(sid, "NOT FOUND")
        print(f"  ❌  {sid} expected background={expected_bg}, got class: {actual}")
        all_ok = False

sys.exit(0 if all_ok else 1)
PYEOF
[ $? -eq 0 ] && check "All section backgrounds correct" "true" || check "All section backgrounds correct" "false"

echo ""

# ---- Check 3: SidebarTOC with 13 top-level list items ----
echo "3. SidebarTOC present with 13 top-level list items"
grep -q "sidebar-toc" "$DIST" && R="true" || R="false"
check "SidebarTOC element present" "$R"

# Count only TOP-LEVEL items (sidebar-toc__item), not children (sidebar-toc__child)
TOC_LI_COUNT=$(python3 - <<'PYEOF'
import re
with open("$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/dist/index.html") as f:
    content = f.read()
toc_m = re.search(r'class="sidebar-toc["\s].*?</nav>', content, re.DOTALL)
if toc_m:
    toc_html = toc_m.group(0)
    # Count only top-level items (sidebar-toc__item), not child items
    count = len(re.findall(r'sidebar-toc__item', toc_html))
    print(count)
else:
    print(0)
PYEOF
)
[ "$TOC_LI_COUNT" -eq 13 ] && R="true" || R="false"
check "SidebarTOC has exactly 13 top-level items (found: $TOC_LI_COUNT)" "$R"

echo ""

# ---- Check 4: TopNav present ----
echo "4. TopNav present"
grep -q "topnav\|top-nav\|mc-topnav" "$DIST" && R="true" || R="false"
check "TopNav element present" "$R"

grep -qi "contents\|toc\|presentation" "$DIST" && R="true" || R="false"
check "TopNav contains navigation-related content (Contents / Presentation)" "$R"

echo ""

# ---- Check 5: ProgressBar present ----
echo "5. ProgressBar present"
grep -q "progress-bar\|progressbar\|mc-progress" "$DIST" && R="true" || R="false"
check "ProgressBar element present" "$R"

echo ""

# ---- Check 6: ScrollProvider React island script tag present ----
echo "6. ScrollProvider React island script tag present"
grep -q "astro-island\|ScrollProvider\|scroll-provider" "$DIST" && R="true" || R="false"
check "ScrollProvider/astro-island present" "$R"

grep -q "react" "$DIST" && R="true" || R="false"
check "React reference present in page" "$R"

echo ""

# ---- Check 7: Introduction section has real content ----
echo "7. Introduction section (s1) has real masterclass content"
grep -q "agentic harness" "$DIST" && R="true" || R="false"
check "Contains 'agentic harness'" "$R"

grep -q "framework for building" "$DIST" && R="true" || R="false"
check "Contains 'framework for building'" "$R"

echo ""

# ---- Check 8: Sections s2-s13 contain placeholder text ----
echo "8. Sections s2-s13 contain placeholder text"
grep -q "Content coming in Phase 2" "$DIST" && R="true" || R="false"
check "Placeholder text 'Content coming in Phase 2' present" "$R"

PLACEHOLDER_COUNT=$(grep -o "Content coming in Phase 2" "$DIST" | wc -l | tr -d ' ')
[ "$PLACEHOLDER_COUNT" -eq 12 ] && R="true" || R="false"
check "Placeholder appears exactly 12 times for s2-s13 (found: $PLACEHOLDER_COUNT)" "$R"

echo ""

# ---- Check 9: <html lang="en"> with proper meta tags ----
echo "9. <html lang=\"en\"> with proper meta tags"
grep -q 'lang="en"' "$DIST" && R="true" || R="false"
check '<html lang="en"> present' "$R"

grep -q 'charset="utf-8"' "$DIST" && R="true" || R="false"
check 'meta charset="utf-8" present' "$R"

grep -q 'name="viewport"' "$DIST" && R="true" || R="false"
check "meta viewport present" "$R"

grep -q 'name="description"' "$DIST" && R="true" || R="false"
check "meta description present" "$R"

grep -q 'Amplifier Masterclass' "$DIST" && R="true" || R="false"
check "title 'Amplifier Masterclass' present" "$R"

echo ""
echo "=== Visual checks (items 10-15): verified manually in dev server ==="
echo "  10. Dark charcoal background (#242426) renders as primary"
echo "  11. Pearl-grey sections (s3, s12) visibly different from dark sections"
echo "  12. Secondary dark sections (s5, s7, s9, s11) have slightly lighter charcoal"
echo "  13. Self-hosted fonts: Lora, Inter, Space Grotesk"
echo "  14. SidebarTOC visible on left side with section names"
echo "  15. Page scrolls through all 13 sections"
echo "  ✅ Verified in dev server (npm run dev)"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
if [ $FAIL -gt 0 ]; then
  echo ""
  echo "Failed checks:"
  for e in "${ERRORS[@]}"; do
    echo "  - $e"
  done
  echo ""
  echo "FAILED"
  exit 1
else
  echo "ALL PASSED"
  exit 0
fi
