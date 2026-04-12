# Content Redundancy & Flow Audit
## `amplifier-masterclass.html` — Full Document

**Scope:** Abstract through Section 12 and Appendix A  
**Date:** April 2026  
**Method:** Complete prose read, skipping CSS/JS/SVG internals; all findings independently verified against line numbers.

---

## How to Read This Audit

Four finding types, ordered by severity within each:

- **R** — Redundancy: same idea stated twice (or more) without new context
- **F** — Flow break: transition feels like a reset rather than a progression
- **C** — Cut candidate: paragraph fully covered by a nearby structured element
- **H** — Heading echo: section intro restates the section heading

Each finding includes:
1. Exact line number(s) of both occurrences
2. A quote of the repeated content (first ~15 words)
3. Which occurrence to keep and which to cut/reword
4. Flow impact

---

## CRITICAL (Fix First)

---

### R-01 · Abstract tagline vs. Section 1 opening — verbatim repeat

**Occurrence A — line 1887** (Abstract `<h2 class="realization">`)
> "Amplifier is a framework for building your AI harness."

**Occurrence B — line 1898** (§1 first sentence)
> "Amplifier is a framework for building your AI harness. Some harnesses built with Amplifier are conversational AI agents…"

**What's happening:** The abstract uses this sentence as its visual centerpiece headline. Section 1 opens with the identical sentence, word for word, as its first prose sentence. The reader encounters it twice within about three scroll-lengths.

**Which to keep:** Keep A (Abstract). It belongs there as the thesis. In §1, replace the sentence with something that *advances* from the abstract — e.g., open directly with the OS analogy that §1.1 develops, or with the scope of the document. The abstract already makes the claim; §1 should build on it, not restate it.

**Flow impact:** High. Readers who slow down at the abstract will recognize the echo immediately and wonder if §1 is a continuation or a restart. The document currently feels like it has two introductions.

---

### R-02 · Abstract enumeration vs. §1.1 enumeration — near-verbatim list

**Occurrence A — line 1891** (Abstract, ¶2)
> "…what tools it can use, what it remembers, what rules it follows, how it talks to the outside world — needs structure."

**Occurrence B — line 1906** (§1.1, ¶2)
> "Which AI model to use, what tools the agent can access, how conversations are stored, what rules the agent follows: each of those is a module…"

**What's happening:** Both paragraphs enumerate the same list of "things around the AI model that need structure." The abstract frames it as the *problem*; §1.1 frames it as the *solution*. The lists are structurally identical (tools → memory/storage → rules → external interaction) but the framing is different enough that a casual reader may not notice. A careful reader will feel like they read the same paragraph twice.

**Which to keep:** Both can survive, but Occurrence B (§1.1) should drop the list and instead say something like: *"Each of those is a module."* Full stop. The abstract already named them; §1.1 just needs to complete the handoff to the OS analogy.

**Suggested rewrite for line 1906, ¶2:**
> "Amplifier borrows this structure. `amplifier-core` sits at the center. Everything that defines behavior — models, tools, memory, rules — plugs in from outside as a module."

**Flow impact:** Medium. Tolerable if kept, but tightening B makes the OS analogy land faster.

---

### R-03 · §1 prose table-of-contents vs. §1.2 bullet table-of-contents — same content twice

**Occurrence A — line 1900** (§1, ¶2)
> "This document describes Amplifier's architecture from the inside out: the unchanging kernel at the center, the module system…"

**Occurrence B — lines 1912–1924** (§1.2 bullet list)
> `Architecture map — The whole system at a glance` … (11 bullets, one per section)

**What's happening:** §1's second paragraph is a prose preview of the document. §1.2 immediately follows with a formatted bullet list of the *exact same items*, in the *exact same order*. The reader gets the document map twice in succession.

**Which to keep:** The §1.2 bullet list (Occurrence B). It is more scannable, more useful as a reference, and more memorable. The prose paragraph at line 1900 is redundant preparation for a list that immediately arrives. Cut line 1900's second sentence entirely ("This document describes Amplifier's architecture from the inside out…"). The first sentence of ¶1 (line 1898) plus §1.1's OS analogy plus the §1.2 list is already a complete introduction.

**Flow impact:** High. Currently the document gives the reader a map preview, then a map. Cut the preview; keep the map.

---

### R-04 · §4.1 session phases vs. §8.1 session phases — full duplication

**Occurrence A — lines 2224–2230** (§4.1, four-phase prose breakdown)
> "**Creation.** Configuration goes in. Coordinator and Loader are created… **Initialization.** Modules load in fixed order… **Execution.** A prompt arrives… **Cleanup.** A `session:end` event fires first…"

**Occurrence B — lines 3328–3342** (§8.1, four-phase table)
> `Create | Session created with configuration. Coordinator and Module Loader are set up…` (four rows, one per phase)

**What's happening:** §4.1 describes all four session phases in prose. §8.1 (the dedicated Sessions section) gives the same four phases in a table with nearly identical content. The table adds one new sentence ("Each call is one turn of conversation. Between turns, all state is maintained.") but the rest is a reformatted restatement.

**Which to keep:** The §8.1 table (Occurrence B) is definitive — it lives in the right section and is scannable. In §4.1, replace the four-phase prose block with a single sentence: *"The session runs through four phases — Create, Initialize, Execute, Cleanup — detailed in §8.1."* The forward-reference is already partially present; just make it complete and cut the body.

**Flow impact:** Very high. These are the two most detailed structural explanations of the same concept in the document. Readers who bookmark §4.1 and later read §8.1 will wonder if anything changed.

---

### R-05 · §9.4 live re-reading — same claim stated three times in a row

**Occurrence A — line 3573** (§9.4, ¶1)
> "@mention files are re-read on every single turn of conversation… Edit a context file while an agent is running, and the agent sees the change on its very next turn."

**Occurrence B — line 3575** (§9.4, ¶2)
> "Context files are a continuous feed of current information, not snapshots taken at session start. Not loaded once, not cached — full re-read on every turn."

**Occurrence C — lines 3579–3580** (§9.4, Design Decision)
> "Context files are re-read on every turn — never cached. Edit a coding standards file while the agent runs; it sees the change on its next turn without a restart."

**What's happening:** The same single fact (files re-read every turn, not cached, changes immediate) is stated three times in three consecutive elements. ¶1 states it clearly. ¶2 restates it with slightly different framing. The Design Decision restates it again.

**Which to keep:** Occurrence A (¶1) and Occurrence C (Design Decision). ¶2 (Occurrence B) adds nothing that isn't in the other two and should be cut entirely. The Design Decision adds the cost rationale ("The cost of a stale instruction is higher than a disk read"), which is genuinely new.

**Cut:** Line 3575 paragraph entirely.

**Flow impact:** High. Three consecutive statements of the same fact train the reader to skim aggressively.

---

### R-06 · §3.3 "zero file I/O" vs. §4.6 "zero file I/O" — near-verbatim across sections

**Occurrence A — line 2084** (§3.3, ¶1)
> "Search the entire `amplifier-core` codebase for file-writing operations: zero matches. The kernel does not write logs, save transcripts, or persist configuration."

**Occurrence B — line 2307** (§4.6, ¶1)
> "The kernel writes zero bytes to disk. No log files, no transcripts, no configuration files. Search the entire `amplifier-core` codebase for file writes: zero matches."

**Occurrence C — lines 2086–2091** (§3.3, ¶2 + Design Decision)
> "A logging hook writes logs. A persistence module saves conversations. A configuration layer reads settings. Each one is a module."

**Occurrence D — line 2309** (§4.6, ¶2)
> "Logging happens through hook modules that subscribe to events. Persistence happens through context managers… Configuration loading happens in the Foundation layer…"

**What's happening:** §3.3 states zero-file-I/O as a *philosophy* illustration. §4.6 is the dedicated "Zero file I/O" subsection. Both state the claim, both give the same three examples (logs, persistence, config), and both use the "search the codebase: zero matches" construction.

**Which to keep:** §4.6 is the correct place for the concrete claim. §3.3 can keep a one-sentence philosophical statement and point forward: *"If something can live in a module, it must — which is why `amplifier-core` has zero file writes (§4.6)."* The detailed search-the-codebase proof and the three examples should live only in §4.6.

**Flow impact:** Medium. Cross-section redundancy is less jarring than same-section repetition, but this pair is long enough that readers who read carefully will notice.

---

## HIGH PRIORITY

---

### R-07 · §3.1 ¶3 vs. §3.1 Design Decision — verbatim sentence

**Occurrence A — line 2064** (§3.1, ¶3)
> "The consequence is that when rules change — new safety requirements, new compliance needs — you change modules. The kernel stays the same."

**Occurrence B — lines 2068–2069** (§3.1, Design Decision body)
> "When rules change — new safety requirements, new compliance needs — you change modules. The kernel stays the same. Weaving policy into mechanism means every policy change risks breaking the mechanism."

**What's happening:** The Design Decision's body sentence is verbatim from the paragraph immediately above it. Design Decisions are supposed to *conclude* with a distilled insight, not repeat the preceding sentence.

**Which to keep:** Keep the Design Decision (B). Cut the sentence from ¶3 (A). The paragraph can end at "This separation has a name: mechanism versus policy." The Design Decision then delivers the implication.

**Flow impact:** Medium. Short, adjacent, minor pacing issue — but it reads as a stutter.

---

### R-08 · §3.2 ¶1 vs. §3.2 ¶2 — same point, expanded

**Occurrence A — line 2074** (§3.2, ¶1)
> "A new AI model ships. Someone writes a provider module. The kernel does not know or care which model it talks to. New tools, new paradigms, new safety requirements: all handled at the edges. The center does not move."

**Occurrence B — line 2076** (§3.2, ¶2)
> "None of this touches the kernel. A new model arrives; someone writes a provider module… The kernel doesn't know or care whether it's talking to Claude, GPT, Gemini, or a model that doesn't exist yet."

**What's happening:** ¶1 makes the point concisely. ¶2 makes the exact same point again, adding only the model name examples (Claude, GPT, Gemini). The new context added by ¶2 is two words of examples.

**Which to keep:** Occurrence A is cleaner. Merge the model names into ¶1 if they're needed (they're not essential), and cut ¶2. The feature-quote that follows (`"The center stays still so the edges can move at any speed."`) works fine directly after ¶1.

**Flow impact:** Medium. Back-to-back restatement slows the section's rhythm.

---

### R-09 · §5.1 hook visibility vs. §7.2 hook visibility — near-verbatim paragraph

**Occurrence A — line 2496** (§5.1, ¶2)
> "Hook Handlers are invisible to the AI. They do not appear in the model's instructions. They are not listed in the system prompt. The model cannot see them, cannot call them, cannot choose to use them. Hooks operate entirely in the system layer."

**Occurrence B — line 2966** (§7.2, ¶2)
> "Hooks do not appear in the model's instructions. They are not listed in the system prompt. The model cannot see them, cannot call them, cannot choose to use them. Hooks operate entirely in the system layer."

**What's happening:** Four consecutive sentences are copied nearly verbatim from §5.1 to §7.2. §7 is the dedicated "Tools vs Hooks" section and §5.1 introduced the concept; this is legitimate cross-referencing territory. But word-for-word repetition makes it a content defect, not a helpful callback.

**Which to keep:** §7.2 (B) is the authoritative home for this distinction. §5.1 should reduce its hook description to one sentence: *"Hook Handlers are invisible to the AI — see §7 for the full distinction."* The detail lives in §7, not both.

**Flow impact:** Medium. §5 and §7 are far apart enough that some readers won't notice, but any reader reading straight through will feel déjà vu.

---

### R-10 · §8.2 text vs. §8.2 Design Decision — verbatim three-clause sentence

**Occurrence A — lines 3378–3379** (§8.2, ¶2)
> "Automatic inheritance creates hidden dependencies; changes to the parent's conversation would affect the child unpredictably. Explicit is better: pass what you need, share nothing by default."

**Occurrence B — lines 3383–3384** (§8.2, Design Decision)
> "Automatic inheritance creates hidden dependencies — changes to the parent's conversation would affect the child unpredictably. Explicit is better: pass what you need, share nothing by default."

**What's happening:** The Design Decision is a reformatted copy of the paragraph above it, using em-dash instead of semicolon. Not a single new idea is added.

**Which to keep:** The Design Decision (B). Cut the paragraph at line 3378. The preceding paragraph (line 3377) already says the kernel provides only `parent_id` and points to Foundation. The Design Decision delivers the implication directly. The in-between paragraph is pure redundancy.

**Flow impact:** Medium. The Design Decision format exists to *summarize*; when it copies the prose verbatim, it loses its editorial purpose.

---

### R-11 · §12 intro paragraph vs. §12.1 post-diagram paragraph — same three claims

**Occurrence A — line 4126** (§12 opening, before §12.1 heading)
> "Each layer depends only on the one below it. Replace anything at one layer without affecting the others. A new Foundation implementation could be written without changing the kernel. A new module could be published without any existing module knowing it exists."

**Occurrence B — line 4157** (§12.1, after the nested-layers diagram)
> "The pattern across all six layers is the same: each layer depends only on the one below. This means you can replace anything at one layer without affecting the layers above or below it. A new Foundation implementation could be written without changing the kernel. A new application could be built without changing Foundation. A new module could be published without any of the existing modules knowing it exists."

**What's happening:** Same three claims (layered deps, Foundation replaceable, modules replaceable) appear in the paragraph before the §12.1 heading, then again in the paragraph after the §12.1 diagram. The diagram is sandwiched between two identical explanations.

**Which to keep:** Occurrence B (after the diagram), which adds "A new application could be built without changing Foundation" as genuinely new. Cut Occurrence A entirely and let the §12.1 heading lead directly into the diagram.

**Flow impact:** Medium. A section that's supposed to be the "complete picture" synthesis starts by repeating itself before the section even begins.

---

## MODERATE PRIORITY

---

### R-12 · §4.4 paragraph vs. §4.4 callout — "Coordinator does not coordinate"

**Occurrence A — line 2246** (§4.4, ¶1)
> "A passive registry: a structured shelf where modules are stored after loading… Despite the name, it does not coordinate anything. Think of it as a phone book."

**Occurrence B — lines 2250–2251** (§4.4 callout)
> "Despite its name, the Coordinator does not coordinate. It is a registry — a shelf with labeled slots. The actual coordinating is done by the Orchestrator (§6)…"

**What's happening:** The callout's first two sentences are a rephrasing of the paragraph's second and third sentences. The only additions in the callout are the cross-reference to §6 and the "Mechanism, not policy" callback.

**Which to keep:** Keep the callout (B), which earns its existence through the §6 cross-reference. Trim the paragraph (A) to remove "Despite the name, it does not coordinate anything. Think of it as a phone book." — leave only the structural description (three operations: mount, get, unmount) and let the callout deliver the surprise.

**Flow impact:** Low-medium. Reading "does not coordinate" twice in five lines is noticeable.

---

### R-13 · §4.5 text vs. §4.5 Design Decision — events/hooks/Rust triple

**Occurrence A — line 2258** (§4.5, ¶2)
> "Events and hooks are the same system: one dispatch mechanism (`HookRegistry.emit()`), not two separate pieces… The implementation is in Rust, because event dispatch is the hottest path in the system."

**Occurrence B — lines 2262–2263** (§4.5 Design Decision)
> "Events and hooks are one system — a single dispatch mechanism. Two systems would mean two surfaces to maintain… implemented in Rust because event dispatch is the hottest path in the system."

**What's happening:** Three claims appear in the paragraph then reappear in the Design Decision: (1) one system, not two; (2) `HookRegistry.emit()`; (3) Rust, hottest path. The Design Decision adds only "two surfaces to maintain and debug" as new reasoning.

**Which to keep:** The Design Decision (B). Trim the paragraph (A) to remove the dispatch-mechanism and Rust details, which the Design Decision handles. The paragraph can end after "results are collected."

**Flow impact:** Low-medium. The Design Decision immediately follows the paragraph; readers feel the stutter immediately.

---

### R-14 · §5.2 text vs. §5.2 Design Decision — structural subtyping

**Occurrence A — line 2508** (§5.2, ¶3)
> "Amplifier uses structural subtyping. If your class has the right methods with the right signatures, it qualifies as that module type. You don't need to inherit from a base class. You don't need to declare 'I am a Tool.'"

**Occurrence B — lines 2512–2513** (§5.2 Design Decision)
> "Structural subtyping — no base class required. If your class has the right methods with the right signatures, it qualifies. No inheritance, no 'I am a Tool' declaration. Contracts are small and stable; base classes accumulate baggage."

**What's happening:** ¶3 and the Design Decision make the same two claims (right methods = qualifies; no base class). The Design Decision adds the rationale ("Contracts are small and stable; base classes accumulate baggage"), which is new.

**Which to keep:** The Design Decision (B). Trim ¶3 to one sentence — "Amplifier uses structural subtyping: if your class has the right methods, it qualifies." — and let the Design Decision expand.

**Flow impact:** Low.

---

### R-15 · §5.3 rationale vs. §5.3 Design Decision — "hooks load last"

**Occurrence A — line 2520** (§5.3, ¶2)
> "…Hooks load last — because hooks observe everything else. §7 explains why this separation is the most consequential design decision in the module system. They need the full system set up before they start watching."

**Occurrence B — lines 2524–2525** (§5.3 Design Decision)
> "Hooks load last in the module loading order. Hooks observe everything else — they need the full system mounted before they start watching."

**What's happening:** ¶2 gives the rationale; the Design Decision repeats the same rationale in condensed form, adding nothing new except slightly crisper phrasing.

**Which to keep:** The Design Decision (B). The paragraph can drop its last two clauses (from "because hooks observe" to the end) and instead end with the §7 cross-reference.

**Flow impact:** Low.

---

### R-16 · §6.3 paragraph vs. §6.3 Design Decision — agent loop in module

**Occurrence A — line 2818** (§6.3, ¶1)
> "The agent loop — the 'think, act, observe, repeat' cycle — is not in the kernel. It lives in an Orchestrator module… the loop itself is policy. A different Orchestrator module could implement a completely different strategy: parallel provider calls, multi-step planning, debate between models."

**Occurrence B — lines 2822–2823** (§6.3 Design Decision)
> "The agent loop lives in a module, not the kernel. The 'think → act → observe → repeat' cycle is policy. A different Orchestrator could implement parallel provider calls, multi-step planning, or a debate between models."

**What's happening:** The Design Decision condenses the paragraph but shares all three claims: (1) loop in module, (2) loop is policy, (3) alternate strategies possible. Nothing is added.

**Which to keep:** The Design Decision (B). The ¶1 sentence "This is mechanism, not policy (§3.1) at its most literal" is the one genuinely new observation — keep that clause and let it bridge into the Design Decision. Cut the alternatives list from ¶1.

**Flow impact:** Low.

---

### R-17 · §7.4 table vs. post-table paragraph vs. Design Decision — "one deny blocks everything"

**Three locations:**

- **Line 3099** (§7.4 table, deny row): "Highest priority. One deny blocks the entire operation. No further hooks execute. Fail-closed security posture."
- **Line 3131** (§7.4 summary paragraph): "Deny is first for a reason. It doesn't matter if ten hooks say allow. One deny stops it. Circuit breaker."
- **Lines 3135–3136** (§7.4 Design Decision): "One `deny` blocks everything — fail-closed security. It doesn't matter if ten hooks say allow. One policy violation is enough."

**What's happening:** The same claim ("one deny wins regardless of others") appears in the table, then in the post-table paragraph, then in the Design Decision. The summary paragraph between the table and the Design Decision is squeezed between two elements that already carry this message.

**Which to keep:** The table (for reference) and the Design Decision (for emphasis). Cut the post-table summary paragraph (line 3131) entirely, or reduce it to only the InjectContext accumulation point ("InjectContext is where hooks collaborate, not compete — a code checker and a style hook can both fire simultaneously"), which is genuinely not covered by the table or Design Decision.

**Flow impact:** Low-medium. Three consecutive same-idea elements train the reader to stop engaging.

---

### R-18 · §3.4 code quality example vs. §7.3 code quality example

**Occurrence A — lines 2096–2098** (§3.4, ¶2)
> "In Amplifier, the kernel fires a `tool:pre` event before every tool call… When it sees a tool call that requires approval, it returns `ask_user`…"

(The same section introduces the `inject_context` code quality scenario via the design decision at lines 2102–2103.)

**Occurrence B — lines 2974–2976** (§7.3, ¶3)
> "As a hook: You register a Hook Handler for the `tool:post` event… the hook runs the code checker. If it finds issues, it injects a message: 'The code checker found 3 issues on lines 12, 15, and 22.'"

**What's happening:** The code-quality-as-hook scenario is introduced in §3.4 to illustrate mechanism-not-policy. It reappears in §7.3 with full prose + annotated code as the canonical worked example. §6.2 step 6 (line 2808) correctly cross-references §3.4 as "the same scenario."

**Assessment:** §7.3 is the right location for the full treatment — the annotated code is valuable and not in §3.4. The §3.4 prose version is largely superseded. §3.4 could shrink to: *"A hook module registers for `tool:pre`. Before any tool call, it decides whether to block, approve, or ask a human. The full example appears in §7.3."* This maintains the philosophy argument without duplicating the narrative.

**Flow impact:** Low for attentive readers (§6.2 flags it explicitly), medium for skimmers.

---

### R-19 · §10.3–10.6 callback repeated four times

**Occurrences:**

- **Line 3780** (§10.3): "Foundation registers two callbacks during setup that remain active for the session's entire lifetime."
- **Line 3784** (§10.4): "Called on every single turn. Every time the AI is about to think — every single turn…"
- **Line 3792** (§10.5): "Foundation code is running inside the kernel's dispatch path, even though the kernel has no dependency on Foundation…"
- **Line 3796** (§10.6): "The kernel calls into Foundation on every turn (system prompt) and during loading (module resolution). Neither side has a code dependency on the other."

**What's happening:** §10.3 introduces the two-callback concept. §10.4 and §10.5 describe each callback. §10.6 restates the two-callback concept ("calls into Foundation on every turn… and during loading") as a synthesis, but the synthesis says nothing §10.3 didn't already say.

**Which to keep:** §10.4 and §10.5 are necessary — they are the substance. §10.3 can be compressed into a one-line lead-in: *"Foundation registers two callbacks that persist for the session's lifetime:"* (making it a header sentence rather than a standalone paragraph). §10.6 should either be cut or rewritten to explain *why* this architecture is significant — the "neither side has a code dependency" point is interesting; the summary of what the callbacks do is not.

**Flow impact:** Low. The subsection structure handles this adequately, but §10.6 is pure recap with no synthesis.

---

## FLOW BREAKS

---

### F-01 · §8 opens with information the reader already has from §4.1

**Location:** Line 3269 (§8 opening sentence)
> "A session is the container around one instance of the system running."

**Where the reader already has this:** Line 2222 (§4.1)
> "A session is the container around a particular instance of the system running."

**What's happening:** §8 is the dedicated Sessions section. Its opening sentence offers a definition that §4.1 already gave, word for word (save "a particular"). The reader entering §8 from §4.1 gets the same sentence they read four sections ago.

**Fix:** Replace the §8 opening sentence with a sentence that *advances* from §4.1 rather than restating it. The section should open by saying what new material it adds over what §4.1 covered — the parent/child relationship and the file-output question are the genuinely new topics. E.g.:
> *"§4.1 walked through the four session phases. This section covers what sessions look like from outside the kernel: how parent and child sessions relate, where file output actually comes from, and how cancellation works."*

**Flow impact:** High. §8 currently resets to ground zero rather than building forward. The reader who just finished §7 (rich, layered content on tools vs hooks) lands in §8 and feels like the document started over.

---

### F-02 · §2.1 heading echoes itself in its opening sentence

**Location:** Line 1931 (H3 heading) / Line 1933 (¶1)

**Heading:** "2.1 A map of the territory before we walk through it"

**Opening sentence:** "This section provides a map of every major component and how they connect. Think of it as a city map before you walk the streets."

**What's happening:** The heading already uses the "walk through it / territory" framing. The opening sentence restates it ("city map before you walk the streets") and adds a meta-announcement ("This section provides…") that delays entry into the content.

**Fix:** Drop "This section provides a map of every major component and how they connect." and begin at "Think of it as a city map: you don't need to know every building. You need the neighborhoods." (Or rename the H3 to something like "The system at a glance" and write a clean first sentence.)

**Flow impact:** Low. A minor friction point. The reader gets the metaphor twice in a row and nothing new is said by the second instance.

---

## SECTION INTRO HEADING ECHOES

---

### H-01 · §8 "Sessions" — opening sentence defines the section noun (cross-reference issue)

**Line 3269:** "A session is the container around one instance of the system running."

The heading is "Sessions." The first sentence defines "a session." While this is a standard technical document pattern, it compounds R-04 and F-01: not only does it define a term already defined in §4.1, it does so under a heading that already names the term.

**Fix:** See F-01 above. The fix for F-01 resolves this simultaneously.

---

### H-02 · §5 "The Module System" — opening sentence restates the heading concept

**Line 2439** (§5 opening prose, after diagram):
> "Everything outside the kernel is a module. A module is a self-contained piece that plugs in through a standard interface to add a specific capability. Six types, one universal contract, fixed loading order."

The heading is "The Module System." The first sentence defines "a module." The third sentence previews the subsections (six types, one contract, fixed order) in the same order as the H3 subheadings that follow (§5.1, §5.2, §5.3).

**Assessment:** Mild version of the pattern. The opening sentence is doing necessary definitional work (this is the first full definition of "module"). The third sentence is a slight preview of content that immediately follows. Consider cutting "Six types, one universal contract, fixed loading order." from the opening and letting the subsection headings do that signaling.

**Flow impact:** Minimal.

---

## CUT CANDIDATES (Paragraphs Fully Covered by Nearby Structured Elements)

---

### C-01 · §9.4 ¶2 — fully covered by ¶1 and Design Decision

**Line 3575:**
> "Context files are a continuous feed of current information, not snapshots taken at session start. Not loaded once, not cached — full re-read on every turn. Update a coding standards file, and every agent referencing it sees the change immediately."

**Covered by:** ¶1 (line 3573) + Design Decision (lines 3579–3580). See R-05 for full analysis.

**Recommendation:** Cut entirely.

---

### C-02 · §12 intro paragraph before §12.1 — fully covered by post-diagram paragraph

**Line 4126:**
> "Each layer depends only on the one below it. Replace anything at one layer without affecting the others. A new Foundation implementation could be written without changing the kernel…"

**Covered by:** Line 4157 (fuller version of the same paragraph, post-diagram). See R-11 for full analysis.

**Recommendation:** Cut entirely. Let the §12.1 H3 heading lead directly into the nested-layers diagram.

---

### C-03 · §7.4 post-table summary paragraph — mostly covered by table + Design Decision

**Line 3131:**
> "Deny is first for a reason. It doesn't matter if ten hooks say allow. One deny stops it. Circuit breaker. InjectContext is where hooks collaborate rather than compete… Modify is a pipeline: each transformation feeds the next."

**Covered by:** The table immediately above (lines 3096–3127) and the Design Decision immediately below (lines 3133–3136). See R-17 for full analysis.

**Recommendation:** Cut the deny and modify sentences. Keep (or move to callout): "InjectContext is where hooks collaborate rather than compete — multiple hooks can all fire simultaneously, and the AI sees all injected messages" — this nuance is not explicit in either the table or the Design Decision.

---

### C-04 · §4.6 "Zero file I/O" — largely covered by §3.3 (in better location)

**Lines 2307–2309** (§4.6):
> "The kernel writes zero bytes to disk. No log files, no transcripts, no configuration files. Search the entire `amplifier-core` codebase for file writes: zero matches. Mechanism, not policy, made tangible. // Logging happens through hook modules… Persistence happens through context managers…"

**Partially covered by:** §3.3 (lines 2084–2091) in the philosophy section.

**Assessment:** §4.6 is actually the *correct* location for this detail (it belongs with the kernel description). The problem is that §3.3 pre-empts it. See R-06 for recommended edit direction: trim §3.3, keep §4.6 as written.

---

## SUMMARY TABLE

| ID | Type | Sections | Severity | Action |
|----|------|----------|----------|--------|
| R-01 | Redundancy | Abstract / §1 | Critical | Cut §1 opening sentence; rewrite §1 opener |
| R-02 | Redundancy | Abstract / §1.1 | Critical | Trim §1.1 ¶2 list; keep abstract's version |
| R-03 | Redundancy | §1 ¶2 / §1.2 | Critical | Cut §1 ¶2 ("This document describes…") |
| R-04 | Redundancy | §4.1 / §8.1 | Critical | Replace §4.1 phase prose with 1-sentence forward-ref |
| R-05 | Redundancy | §9.4 ¶2 | Critical | Cut §9.4 ¶2 entirely |
| R-06 | Redundancy | §3.3 / §4.6 | High | Trim §3.3; keep §4.6 as canonical |
| R-07 | Redundancy | §3.1 ¶3 / DD | High | Cut duplicated sentence from ¶3 |
| R-08 | Redundancy | §3.2 ¶1-2 | High | Cut §3.2 ¶2 |
| R-09 | Redundancy | §5.1 / §7.2 | High | Compress §5.1 hooks description; keep §7.2 |
| R-10 | Redundancy | §8.2 ¶2 / DD | High | Cut §8.2 ¶2; let DD carry the argument |
| R-11 | Redundancy | §12 intro / §12.1 | High | Cut §12 intro paragraph; keep §12.1 version |
| R-12 | Redundancy | §4.4 ¶1 / callout | Moderate | Trim §4.4 ¶1; callout carries the surprise |
| R-13 | Redundancy | §4.5 ¶2 / DD | Moderate | Trim §4.5 ¶2 |
| R-14 | Redundancy | §5.2 ¶3 / DD | Moderate | Trim §5.2 ¶3 |
| R-15 | Redundancy | §5.3 ¶2 / DD | Moderate | Trim §5.3 ¶2 rationale |
| R-16 | Redundancy | §6.3 ¶1 / DD | Moderate | Trim §6.3 ¶1 alternatives list |
| R-17 | Redundancy | §7.4 table/¶/DD | Moderate | Cut summary ¶ or reduce to inject-context nuance |
| R-18 | Redundancy | §3.4 / §7.3 | Moderate | Compress §3.4 prose; full treatment in §7.3 |
| R-19 | Redundancy | §10.3–10.6 | Moderate | Compress §10.3; cut or rewrite §10.6 |
| F-01 | Flow break | §8 opening | High | Rewrite §8 opener to advance from §4.1 |
| F-02 | Flow break | §2.1 heading/¶ | Low | Drop meta-announcement sentence |
| H-01 | Heading echo | §8 | High | Resolved by F-01 fix |
| H-02 | Heading echo | §5 | Low | Minor; cut "Six types, one contract…" from opener |
| C-01 | Cut candidate | §9.4 ¶2 | High | Cut entirely (same as R-05) |
| C-02 | Cut candidate | §12 intro ¶ | High | Cut entirely (same as R-11) |
| C-03 | Cut candidate | §7.4 ¶ | Moderate | Cut deny/modify sentences; keep inject-context nuance |
| C-04 | Cut candidate | §4.6 | Low | Trim §3.3 instead; §4.6 is the right location |

---

## Estimated Word Reduction

Addressing all Critical + High findings (R-01 through R-11, F-01, H-01, C-01, C-02) would remove approximately **600–800 words** of prose without losing any information currently unique to those passages. The document's current unique-information density would increase proportionally across every section affected.

---

## Notes on What Is NOT Redundancy

The following patterns look like repetition but are intentional and should be kept:

1. **Design Decision blocks restating the verdict** — When a Design Decision says *"The agent loop lives in a module, not the kernel"* after a paragraph that explained why, the verdict line is doing its job if the reasoning is new. The issue is only when the *reasoning* is also a restatement.

2. **Cross-references to previous sections** — §6.2 step 6 saying "the same scenario from §3.4" is a callback, not redundancy. §9.4 referencing §10.4 for the mechanism is correct forward-linking.

3. **The `mount()` function appearing in §4.5 and §5.2** — These are legitimately different contexts (§4.5 uses it to illustrate the universal interface; §5.2 makes it the contractual definition). The annotated code in §4.5 and the one-liner in §5.2 serve different reading modes.

4. **"Kernel writes zero bytes" in §4.6** — Correct location. See R-06 for direction.

5. **The six-layer description in §2, §12.1, and §12.2** — §2 is the orientation; §12 is the synthesis. They should reference the same structure but should feel different because §12 is the earned summary. The current draft largely achieves this; the only issue is the duplicate paragraph at lines 4126/4157 (R-11).

---

*Audit generated by complete prose read of `amplifier-masterclass.html` (5,812 lines). All line numbers verified against the file. Findings cross-checked for false positives against intentional callbacks and forward-references.*
