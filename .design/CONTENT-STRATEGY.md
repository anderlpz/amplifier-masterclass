# Content Strategy: Amplifier Masterclass

**Date:** 2026-04-01
**Status:** Foundational planning document
**Relationship:** Pairs with `DESIGN-SYSTEM.md` (visual spec) and `tokens.css` (design tokens)

---

## Part 1: Writing Style Guide

### Voice

Someone who has mastered this material. Not someone who built it yesterday and is excited to show you — someone who has lived with it, internalized it, and can now teach it clearly to anyone. Humble, patient, knowledgeable. The true mark of mastery is being able to teach something well, and that's what this voice does.

The voice respects the audience's intelligence while understanding the gap. The reader is smart — they just haven't been introduced to this system yet. They may have zero engineering background, or they may be deeply technical. The voice doesn't care which. It explains things so that both can follow.

When using a technical term for the first time — "kernel," "module," "hook" — the voice pauses to explain what it means. Not condescendingly, but naturally, the way a good teacher does: "The kernel — the small, unchanging center of the system — contains five things." After the first explanation, the term is used freely.

The voice never shows off. It never uses jargon to signal insider status. It never says "obviously" or "simply." Its brilliance is in its ability to hold all of these pieces — the architecture, the trade-offs, the reasoning — and lay them out in an order that builds understanding.

Think: the best professor you ever had. They knew more than they showed. They were patient. They made hard things feel approachable without making them feel simple.

### Tone

Educational. Like a university course taught by someone who has been teaching this material for years. There's experience, maturity, anecdotes about trade-offs. You go deep where it matters and show restraint everywhere else.

The tone does NOT assume the reader is a working engineer or technical PM. The reader is a smart person — maybe a designer, a product manager, a founder, a student, someone from a completely different field. They are intelligent and curious. They deserve technical precision, but they also need context. Don't tell them "the kernel uses structural subtyping" without first explaining what structural subtyping means. Don't say "it's like Linux" without explaining what Linux does and why the comparison is useful.

### Approach: Inductive, Not Deductive

This is a foundational rule for all content in this project.

**Inductive** means: start with the concrete, then name the principle. Show the thing first. Then explain the concept behind it.

**Deductive** means: state the principle, then show examples. This is what textbooks do, and it's what AI-generated content defaults to. We don't do this.

**Example — wrong (deductive):**
> "The principle of mechanism versus policy means that the kernel provides infrastructure without making decisions. For instance, the hook system..."

**Example — right (inductive):**
> "The kernel provides a hook system. Any module can register a hook that fires when something happens — a tool is called, a message is sent, a session starts. But the kernel never decides which hooks to run or what they should do. That's up to the modules. This separation has a name in operating system design: mechanism versus policy. The kernel provides the mechanism. The modules provide the policy."

The inductive approach is harder to write because you have to set up the concrete example first. But it's dramatically easier to read, especially for someone encountering the concepts for the first time.

### Audience Calibration

The reader is intelligent but may have zero engineering background. Every technical concept needs a brief, clear explanation on first use. After the first explanation, the term is used freely.

**Glossary of terms that get explained on first use:**

| Term | First-use explanation |
|---|---|
| Kernel | The small, unchanging center of the system — like an operating system's kernel, which manages the most basic operations while everything else plugs in around it |
| Module | A swappable piece that plugs into the system to add a specific capability — a tool, a connection to an AI model, a behavior rule |
| Protocol | A contract that defines what methods a module must have. If a module has the right methods, it satisfies the protocol — no registration required |
| Mount | The act of plugging a module into the system. A module "mounts" into a named slot in the Coordinator |
| Hook | A piece of code that runs automatically when something happens in the system. Unlike tools (which the AI chooses to use), hooks are invisible to the AI |
| Event | A notification that something happened — a message was sent, a tool was called, a session started. Events trigger hooks |
| Orchestrator | The module that drives the conversation loop: get context, call the AI, handle tool calls, repeat |
| Provider | A module that connects to a specific AI model (Claude, GPT, Gemini, etc.) |
| Coordinator | A registry — a shared shelf where all modules are stored. Despite its name, it doesn't coordinate anything; the Orchestrator does that |
| Session | One conversation from start to finish, with its own set of modules and configuration |
| Bundle | A configuration package — a text file (YAML or Markdown) that describes which modules to load and how to configure them |
| Foundation | The layer that turns human-readable bundle files into running sessions. Optional — the kernel works without it |

These explanations should feel natural in the prose, not like dictionary entries. Weave them in: "The Coordinator — a registry where all modules are stored — provides three methods: mount, get, and unmount."

### Vocabulary Rules

**Never use:**
- "Act I", "Act II", "Act III", etc. — this is a course, not a play
- "The Problem", "The Insight", "The Revelation" — sales keynote framing
- "game-changing", "revolutionary", "superpower", "magic" — hype words
- "Wait, really?", "Here's the surprise", "This changes everything" — manufactured drama
- VC-01 through VC-37 labels in any reader-facing content. These are internal source traceability references only. They appear in this document's source mapping tables and nowhere else.
- "37 verified claims", "7 independent agents", "code-verified facts" — verification methodology belongs in the appendix, not the body
- "Built fast. Built right." or any velocity/credibility framing in the body

**Always:**
- Use proper technical names: Coordinator, PreparedBundle, HookRegistry, AmplifierSession, ModuleLoader
- But always explain what they do the first time they appear. "The Coordinator — a Rust-backed registry where all modules register themselves"
- Prefer active voice. "The kernel loads modules" not "Modules are loaded by the kernel"
- Prefer concrete over abstract. "The hook returns `deny` and the tool call stops" not "Hooks can prevent operations"
- When citing a number, make it precise. "41 canonical events" not "dozens of events"

**Tone calibration examples:**

| Instead of this | Write this |
|---|---|
| "The kernel does nothing — and that's the point!" | "The kernel contains five things. It deliberately excludes everything else — no file I/O, no persistence, no opinions about how agents should think." |
| "Here's the surprise: hooks are invisible to the AI." | "Tools are visible in the AI's instruction set. Hooks are not. The model has no concept that hooks exist — it never sees them in its context window." |
| "What if the center did nothing?" | "The kernel provides mechanism. Modules provide policy. This separation is borrowed from operating system design." |
| "Meet Amplifier" | "Amplifier is an agentic harness — a framework that brings predictable structure to AI agents through a modular kernel architecture." |

### Depth Calibration

Not every concept deserves equal weight. Some deserve depth. Some deserve a paragraph and you move on. Getting this wrong — treating everything as equally important — is what makes the current version read like a reference manual.

**Go deep (show internals, explain trade-offs, use code examples):**
- The hook/event system and action precedence cascade
- The Orchestrator's uniquely privileged position
- Tools vs Hooks — the critical distinction
- The Rust/Python boundary and what it means
- The Foundation bridge (PreparedBundle, system prompt factory, live callbacks)
- Bundle composition and @mention resolution

**Cover clearly but move on (don't over-explain):**
- Session lifecycle (four phases, explained once)
- Cancellation (cooperative, three states, one paragraph)
- Module loading order (list it, note what's required vs optional, move on)
- Module discovery (entry points + filesystem, brief mention of WASM/gRPC)
- Parent-child sessions (linked by parent_id, no auto-inheritance)
- The two capability systems (note that they're unrelated, move on)

**Mention in passing (context, not focus):**
- Cleanup order
- `_async_compat.py` 
- `emit_and_collect()` second dispatch mode
- Type detection by attribute vs naming convention

### Anti-Patterns to Avoid

1. **Putting an entire chapter on one page.** Each section in site mode should be a comfortable reading chunk — not a wall of text that requires scrolling for minutes.

2. **Dense walls of text with no visual relief.** Break content with code blocks, comparison tables, diagrams, callouts. But don't add visual elements just for decoration — each one teaches something.

3. **Dramatic framing.** No "revelations." No "aha moments." If a fact is genuinely interesting (the kernel writes zero bytes to disk), let the fact speak. State it clearly and let the reader be surprised on their own.

4. **Treating every fact as equally important.** The hook priority cascade is architecturally significant. The cleanup function execution order is a footnote. Weight them accordingly.

5. **Verification language in the body.** "Code-verified" and "confirmed by 7 agents" belong in the appendix. The body should read as authoritative because it's well-written, not because it keeps asserting its own rigor.

6. **The taxonomy trap.** Don't organize by component ("here's the Coordinator, here's the Loader, here's the HookRegistry"). Organize by concept ("how modules get into the system", "what happens when you send a message", "how hooks observe and control").

7. **Abstract before concrete.** Don't explain "mechanism vs policy" before showing what the kernel actually contains. Principles are earned — show the thing, then explain the thinking behind it.

8. **Em dashes (— and `&mdash;`).** Em dashes are an AI writing tell. They create a distinctive rhythmic pattern that signals machine-generated text. Do not use them anywhere in reader-facing content: not in section prose, not in slide text, not in speaker notes, not in `data-notes` attributes. Use periods, commas, colons, semicolons, or restructure the sentence instead. When tempted to write "X — Y," ask whether a period and new sentence works better, whether a colon introduces the second part, or whether the sentence needs rewriting entirely.

---

## Part 2: Content Outline

Each section is a chapter in a textbook. In site mode, it's a scrollable section. In presentation mode, it becomes however many slides the topic requires — some sections are 2 slides, others might be 10. The content dictates the count, not an arbitrary range. Every section teaches ONE primary concept.

---

### Section 1: What Amplifier Is

**Primary concept:** Orient the reader. One paragraph, maximum two. What this thing is, at the highest level.

**Content:**
- Amplifier is an agentic harness — a framework for building AI agents with predictable structure
- It uses a microkernel architecture: a tiny core provides infrastructure, everything else is a pluggable module
- The design borrows from operating systems: mechanism in the kernel, policy in modules
- Active project, Rust + Python, open architecture

**Depth level:** OVERVIEW. This is the trailhead, not the hike.

**Source VCs (internal):** VC-01 (Coordinator), VC-05 (module types), XC-01 (mechanism vs policy)

**Visual assets:**
- Logo + wordmark
- One-sentence definition, large typography
- Brief context paragraph

**Presentation mode:** 1 slide. Title + definition.

---

### Section 2: The Architecture Map

**Primary concept:** Spatial orientation. "Here is the territory. Now we'll walk through it."

**Content:**
- The interactive DOT graph, rendered in-page using d3-graphviz (Graphviz compiled to WebAssembly)
- Brief legend: what the clusters represent (kernel, foundation, modules, data flow)
- This is a reference map — the reader returns to it throughout. It's not decorative.

**Depth level:** OVERVIEW. The map introduces everything; the sections that follow explain it.

**Source VCs (internal):** Section 5 of reconciliation (Educational Diagram Content Guide)

**Visual assets:**
- Interactive graph embed (compact view, click to expand to fullscreen overlay)
- In fullscreen: zoom (scroll wheel), pan (drag), click-to-highlight nodes and connections

**Presentation mode:** 1 slide. Full-bleed graph. "This is where we're going."

---

### Section 3: Design Philosophy

**Primary concept:** The three principles that explain WHY the architecture is shaped this way.

**Content:**
- **Mechanism, not policy.** The kernel provides a hook system — it has no opinion about what should be blocked. A module decides. The kernel provides a mount-point registry — it doesn't decide what gets mounted. This separation is borrowed from UNIX/Linux kernel design.
- **The center stays still.** The kernel never changes when new models drop, new paradigms emerge, or new tools appear. Stability at the center enables velocity at the edges.
- **Ruthless simplicity.** Every line in the kernel is a future constraint. The kernel does zero file I/O — not because persistence isn't important, but because the kernel isn't the right place for it.

**Depth level:** DEEP on mechanism vs policy (it's the #1 architectural principle per XC-01). OVERVIEW on the other two — state them clearly with one concrete example each.

**Source VCs (internal):** VC-27 (zero file I/O), XC-01 (mechanism vs policy), XC-05 (Foundation is optional)

**Visual assets:**
- Three principle cards: each with a name, one-line definition, one concrete example
- The zero file I/O fact: "Grep the entire amplifier-core codebase for file writes. Zero matches." — stated cleanly, not dramatized

**Teaching note:** This section comes AFTER the architecture map on purpose. The reader has seen the system. Now they understand why it's shaped that way. Principles are earned.

**Presentation mode:** 2 slides. One for mechanism vs policy (with Linux analogy). One for the other two principles + zero I/O.

---

### Section 4: The Kernel

**Primary concept:** What's actually inside amplifier-core. Five things. That's it.

**Content:**
1. **Hook / Event System** — One dispatch mechanism for all 41 events. Implemented in Rust. Events and hooks are the same system — there's no separate event bus.
2. **Module Loader** — Discovers modules through entry points and filesystem. Returns a mount closure. Supports Python, WASM, gRPC, and Rust sidecar transports.
3. **Contracts (Protocols)** — Six module types defined as Python Protocols (structural subtyping). The protocols are contracts, not enforcement — if a class has the right methods, it satisfies the Protocol.
4. **The Coordinator** — A Rust-backed passive registry. Stores modules at named mount points. Provides `mount()`, `get()`, `unmount()`. Despite its name, it does NOT coordinate — the Orchestrator does that.
5. **Session Lifecycle** — `__init__()` creates Coordinator + Loader. `initialize()` loads modules in fixed order. `execute(prompt)` calls the Orchestrator. `cleanup()` tears down.

**Depth level:** DEEP. This is the heart of the system. Spend time here.

**Source VCs (internal):** VC-01 through VC-04 (Coordinator), VC-05 (module types), VC-08 (protocols as contracts), VC-09 (mount contract), VC-14 (session lifecycle), VC-19 (event/hook same system), VC-27 (zero I/O), VC-29 (Rust/Python boundary)

**Visual assets:**
- Numbered list of five kernel components (not cards — a clean list)
- The Coordinator's mount-point table: slot name, what's in it, cardinality
- Brief note on the Rust/Python boundary: "Python is the API surface. Rust is the runtime. Every core type (Coordinator, HookRegistry, CancellationToken, Session) is a Rust struct exposed through PyO3."

**Presentation mode:** 3 slides. One listing the five things. One on the Coordinator (mount-point table). One on the Rust/Python boundary.

---

### Section 5: The Module System

**Primary concept:** Six module types, one universal contract, fixed loading order.

**Content:**
- **Universal mount contract:** `async def mount(coordinator, config) -> Optional[cleanup_fn]`. Every module type follows this. The Loader wraps it in a closure; the module self-mounts into the Coordinator.
- **Six types, revealed in order of importance:**
  1. Orchestrator — drives the agent loop (next section)
  2. Provider — connects to an AI model. Interface: `complete(ChatRequest) -> ChatResponse`
  3. Tool — an action the AI can take. Has name, description, input_schema. Interface: `execute(input) -> ToolResult`
  4. ContextManager — owns conversation memory. Decides what to return based on token budgets.
  5. HookHandler — reacts to events. Can observe, block, inject, modify, or request approval. (Deep-dived in Section 7)
  6. Resolver — maps module IDs to filesystem paths. Foundation mounts this; the kernel uses it.
- **Loading order is fixed:** Orchestrator -> Context -> Providers -> Tools -> Hooks. Orchestrator and Context are required (RuntimeError on failure). The rest are optional (warn and continue).
- **Discovery:** Entry points (`amplifier.modules` group) + filesystem (`amplifier-module-*` dirs) + `ModuleSourceResolver` if mounted.

**Depth level:** OVERVIEW for the types (each gets a sentence or two). DEEP on the universal mount contract (it's the connective tissue of the whole system).

**Source VCs (internal):** VC-05 (six types), VC-06 (hooks are special), VC-09 (mount contract), VC-10 (loading order), VC-11 (discovery), VC-12 (type detection), VC-13 (polyglot)

**Visual assets:**
- The mount-point table (slot, module type, cardinality)
- Loading order as a horizontal sequence
- Code block: the mount signature

**Presentation mode:** 2 slides. One on the six types (table). One on the mount contract and loading order.

---

### Section 6: The Orchestrator

**Primary concept:** The most privileged module — and the actual "coordinator" of the system.

**Content:**
- The Orchestrator is the ONLY module that receives the Coordinator at runtime (via `**kwargs`). All other modules get it at mount time and lose access afterward.
- It is the only module that receives all other modules at runtime: context, providers, tools, hooks, coordinator.
- It drives the agent loop: think -> act -> observe -> repeat. But the loop itself is an external module (`loop-basic`). The kernel has zero opinions about how agents think.
- The return type is `str` — a lossy boundary. Rich data (usage stats, tool history, thinking blocks) exits through hook events as a side channel.
- If the orchestrator has a bug, all modules are affected. It's the actual integration nexus.

**Depth level:** DEEP. This is where the "mechanism vs policy" principle is most visible. The kernel provides the Orchestrator contract. The module decides everything about how the agent actually works.

**Source VCs (internal):** VC-07 (Orchestrator privilege), VC-16 (str return boundary), XC-03 (uniquely privileged position)

**Visual assets:**
- Comparison table: what each module type receives at mount vs runtime
- The `str` return boundary callout
- Note: "Even the agent loop is external. `loop-basic` is a module."

**Presentation mode:** 2 slides. One on privilege (table). One on the str boundary and the external loop.

---

### Section 7: Tools vs Hooks

**Primary concept:** THE critical distinction in the system. This is where Amplifier's design philosophy becomes concrete.

**Content:**
- **Tools are AI-decided.** The AI sees tools in its context window. It chooses when to call them. Visible, intentional, under the model's control.
- **Hooks are code-decided.** The AI has no concept that hooks exist. They fire automatically, triggered by events in the system. A linter hook runs after every file write. The AI doesn't know — but it reads the results on its next turn.
- **The mechanism:** `inject_context`. A hook observes an event (say, `tool:post` after a file write), runs a linter, and returns `HookResult(action="inject_context", data="Linter found 3 errors in line 42...")`. The Coordinator's `process_hook_result()` calls `context.add_message()`. The AI reads this on its very next turn. It fixes the issue. It never knew a hook was involved.
- **Hook action precedence (from Rust source):**
  1. **Deny** — short-circuits immediately. No further handlers execute. Fail-closed security posture.
  2. **AskUser** — pauses for human decision. First one wins (can't merge approvals).
  3. **InjectContext** — accumulated across handlers, merged with `\n\n` separator.
  4. **Modify** — chains data through handlers. Each sees modified data from previous.
  5. **Continue** — default. No-op. Let it pass.
- **41 canonical events,** organized by namespace: `session:*`, `tool:*`, `provider:*`, `prompt:*`, `context:*`, etc. All dispatched through one mechanism: `HookRegistry.emit()`.
- **Error handling:** Handler errors are swallowed, not propagated. The pipeline continues. Only `Deny` short-circuits.
- **Infrastructure stamps:** Every event gets `session_id`, `parent_id`, and a UTC `timestamp` auto-injected by the Rust runtime.

**Depth level:** DEEP. This is the section that deserves the most space. The hook system is Amplifier's most distinctive architectural feature. The action precedence cascade is real engineering that warrants detailed explanation.

**Source VCs (internal):** VC-19 (events = hooks), VC-20 (namespace:action), VC-21 (kernel vs module events), VC-22 (action precedence), VC-23 (priority ordering), VC-24 (errors swallowed), VC-25 (timestamp stamp), VC-26 (emit_and_collect), VC-28 (fail-closed bridge)

**Visual assets:**
- Side-by-side comparison: Tools (green/visible) vs Hooks (red/invisible). Two panels.
- Action precedence cascade: vertical waterfall with color-coded levels (Deny=red, AskUser=amber, InjectContext=blue, Modify=purple, Continue=green)
- inject_context flow diagram: event fires -> hook processes -> context injected -> AI reads next turn

**Teaching note:** This is the section where the "university lecture" quality matters most. Don't just list the actions — explain *why* Deny short-circuits, *why* InjectContext accumulates, *why* errors are swallowed. These are deliberate design decisions with rationale.

**Presentation mode:** 4 slides. One on Tools vs Hooks (side-by-side). One on inject_context (flow). One on the priority cascade (waterfall). One on the 41 events and dispatch mechanism.

---

### Section 8: The Agent Loop

**Primary concept:** What actually happens when you send a message. A flow, not a list.

**Content:**
- The runtime flow (inferred from Protocol interfaces — the actual loop lives in the external orchestrator module):
  ```
  You -> Session -> Orchestrator -> [fetch memory from context] -> Provider -> AI thinks ->
    |-> No tools? -> Final answer (str) back to you
    |-> Tool call? -> [hooks check: allow/block] -> Execute -> [hooks inject feedback] -> Loop again
  ```
- Three key interaction points annotated on the flow:
  1. At "hooks check": Code decides whether the tool runs. Not the AI.
  2. At "hooks inject": The AI reads injected context on its next turn.
  3. At "final answer": Return type is `str`. Rich data exits through hook events.

**Depth level:** OVERVIEW. One clear flow diagram with annotations. Not 10 numbered steps.

**Source VCs (internal):** Section 5, Cluster H (reconciliation), VC-07, VC-16

**Visual assets:**
- Flow diagram (simplified pipeline, not numbered steps)
- Three annotation callouts at key junctions

**Presentation mode:** 1 slide. The flow diagram IS the slide.

---

### Section 9: Sessions

**Primary concept:** One conversation, one session, four phases.

**Content:**
- Lifecycle: `__init__` (create Coordinator + Loader) -> `initialize` (load modules in order) -> `execute` (call orchestrator, repeatable) -> `cleanup` (tear down)
- Two parallel implementations: `AmplifierSession` (Python) and `RustSession` (Rust via PyO3). At the package level, `AmplifierSession` is re-exported as `RustSession`.
- Parent-child sessions are linked by `parent_id`, not by a `spawn()` method. No automatic config inheritance. Each session starts fresh with its own modules and config.
- Cleanup order: SESSION_END event fires first (hooks can still process it), then `coordinator.cleanup()`, then `loader.cleanup()` in a finally block.
- Cancellation is cooperative: three states (NONE -> GRACEFUL -> IMMEDIATE). The orchestrator must check `cancellation.is_cancelled`. If it ignores the flag, cancellation doesn't happen.

**Depth level:** OVERVIEW. State the lifecycle clearly. Note the parent-child mechanism. Move on.

**Source VCs (internal):** VC-14 (lifecycle), VC-15 (two implementations), VC-17 (cleanup order), VC-18 (parent-child), VC-31 (cancellation)

**Visual assets:**
- Horizontal timeline: four phases with one-line descriptions
- Callout: "Child sessions are linked by parent_id. No automatic inheritance."

**Presentation mode:** 1 slide. Timeline + key callout.

---

### Section 10: Bundles and Configuration

**Primary concept:** How you actually configure and compose agents — without writing code.

**Content:**
- **Two formats:**
  - Markdown with YAML frontmatter: the YAML is config, the Markdown body becomes the system instruction
  - Pure YAML (`bundle.yaml`): no instruction body
  - Detection: directory paths try `bundle.md` first, then `bundle.yaml`
- **Composition:** Bundles can `include:` other bundles. Merge order: "includes first, then current bundle on top" (last-wins). Different merge strategies per field: deep_merge for session/spawn, merge-by-key for providers/tools/hooks, replace for instruction.
- **@mentions:** References like `@bundle-name:context/file.md` that pull in context files. Resolved recursively (up to depth 3), deduplicated by SHA-256 content hash. The system prompt factory re-reads these on every orchestrator call — files are live.
- **Agent files vs bundle files:** Same format, same parser. Only difference is `meta:` key (agent) vs `bundle:` key (bundle) in frontmatter. The distinction exists in Foundation, not the kernel.

**Depth level:** DEEP on composition and @mentions (this is how real users configure the system). OVERVIEW on the two formats (show an example, move on).

**Source VCs (internal):** VC-34 (two formats), VC-35 (composition), VC-36 (@mentions), VC-37 (agents vs bundles)

**Visual assets:**
- Example bundle (4-6 lines of YAML, not a wall of config)
- Composition diagram: Base bundle + Override bundle -> Merged result
- @mention resolution: text reference -> filesystem path -> loaded content -> injected into system prompt

**Presentation mode:** 2 slides. One showing a bundle example + composition. One on @mentions and live re-reading.

---

### Section 11: The Foundation Bridge

**Primary concept:** Foundation turns text files into running agents — and maintains live connections into the kernel at runtime.

**Content:**
- **PreparedBundle** is the bridge from bundle configuration to a running session. A dataclass with four fields: `mount_plan`, `resolver`, `bundle`, `bundle_package_paths`.
- **The 8-step preparation pipeline:** compile mount plan -> create activator -> install packages -> collect module specs -> download/install modules -> persist install state -> create resolver -> return PreparedBundle.
- **Foundation is optional.** The kernel works independently with a raw config dict. Foundation is a user-experience layer that compiles human-friendly configuration into the kernel's mount-plan format.
- **Two persistent callback channels** (the architecturally interesting part):
  1. **System Prompt Factory** — Called on every single LLM turn. Re-reads all @mention files. Rebuilds the system prompt. Edit a context file and the AI sees the change on its next turn. This isn't setup-and-forget; Foundation remains a live participant throughout the session.
  2. **BundleModuleResolver** — Called on demand by the kernel to resolve module IDs to filesystem paths. Foundation code running inside kernel dispatch.

**Depth level:** DEEP on the two callback channels (this is genuinely surprising architecture). OVERVIEW on the 8-step pipeline (list it, don't explain each step).

**Source VCs (internal):** VC-32 (PreparedBundle), VC-33 (8-step pipeline), VC-36 (@mentions and live re-reading), XC-05 (Foundation is optional)

**Visual assets:**
- Simplified pipeline: Bundle (text file) -> Foundation (compile + resolve) -> Kernel Session (running agent)
- Two callback channel cards: System Prompt Factory and BundleModuleResolver
- Callout: "Foundation is optional. The kernel works with raw config dicts."

**Presentation mode:** 2 slides. One on the pipeline + PreparedBundle. One on the two callback channels.

---

### Section 12: The Complete Picture

**Primary concept:** Zoom out. See the whole thing. The interactive diagram, fully explained.

**Content:**
- **Six-layer ecosystem stack:**
  1. Kernel — contracts, loading, events, lifecycle. Never changes.
  2. Foundation — turns bundles into sessions. Finds modules, assembles config.
  3. Modules — providers, tools, hooks, orchestrators, context managers, resolvers.
  4. Bundles — configuration packages. No code required.
  5. Apps — CLI, web, voice, IDE integrations.
  6. Community — third-party everything.
  Each layer depends only on the one below. The kernel knows nothing about Foundation.
- **The full interactive diagram** — fullscreen, zoomable, with click-to-highlight
- **Recipes** (brief): Multi-step agent workflows. Sequential steps where output from step N becomes input to step N+1. Approval gates for human-in-the-loop. Checkpoint/resume. Recipes are bundles — not built into the kernel.
- **Closing thought:** "The kernel provides mechanism. Modules provide policy. The center stays still so the edges can move at any speed."

**Depth level:** OVERVIEW. This is the capstone. Tie everything together. Don't introduce new complexity.

**Source VCs (internal):** All. This section synthesizes.

**Visual assets:**
- Six-layer stack visualization
- Full interactive d3-graphviz diagram (fullscreen overlay with zoom/pan/click-highlight)
- Closing statement in large serif typography

**Presentation mode:** 3 slides. One for the stack. One for the full diagram. One for the closing thought.

---

### Appendix: Research Methodology

**Primary concept:** How these facts were established. This is the bibliography.

**Content:**
- Investigation type: Parallax Discovery (multi-agent, multi-pass code investigation)
- 7 agents across 4 teams, each working independently
- 37 verified claims, each confirmed by 2+ agents with file:line evidence
- 4 identified discrepancies (documented with impact assessment)
- 8 consolidated unknowns (prioritized by impact)
- Codebase: amplifier-core (Python + Rust) and amplifier-foundation (Python)
- Source: reconciliation.md (805 lines of verified findings)

**Depth level:** OVERVIEW. State the methodology clearly and concisely. This is a trust anchor, not a feature.

**Visual assets:**
- Compact methodology summary (not a grid of big numbers)
- Link/reference to the full reconciliation document

**Presentation mode:** 1 slide. Brief. Like the last page of an academic paper.

---

## Part 3: Site vs Presentation Strategy

### The Fundamental Principle

The SAME content powers both modes. The site is the source of truth. The presentation is a transformation of that content, not a separate artifact.

### Site Mode (Default)

A scrolling single-page site. Each section is a readable chunk — like reading one chapter of a textbook online. The reader scrolls naturally. Sections alternate dark/light backgrounds for rhythm.

**Characteristics:**
- Long-form paragraphs where appropriate (philosophy, explanations)
- Code blocks, comparison tables, diagrams inline
- The interactive graph is compact in Section 2, expanded in Section 12
- No slide counters, no navigation arrows, no presentation UI
- Generous whitespace. Content breathes.
- Each section is contained — you can read one section and understand it without reading the others, though they build on each other

**Site-specific content:**
- Longer explanations and asides
- Inline code examples
- Cross-reference links between sections
- The appendix is fully visible

### Presentation Mode (Activated by "Present" button)

Click a floating "Present" button -> the page transforms into a fullscreen presentation. Arrow keys navigate. Escape exits. Slide counter shows position.

**Critical distinction:** Presentation mode does NOT just fullscreen the scroll. It BREAKS DOWN the content into individual slides. A section that's one scrollable page in site mode becomes however many slides the topic requires.

**How content transforms:**

| Site Mode | Presentation Mode |
|---|---|
| A short introductory section | Might be 1-2 slides |
| A deep-dive section (like Tools vs Hooks) | Might be 6-10 slides — one per concept, one per diagram |
| An overview section (like Sessions) | Might be 2-3 slides |
| The content dictates the slide count | Not the other way around |

**Slide construction rules:**
- Each slide has ONE idea. If you need a second idea, make a second slide.
- Visual assets (diagrams, tables, code blocks) get their own slides.
- Text slides: headline + 3-5 bullet points maximum. No paragraphs.
- The site's inline explanations become speaker notes (visible to presenter, not audience).

**Speaker notes:**
- Every slide has speaker notes drawn from the site's longer explanations
- Notes include: key points to emphasize, transition language to the next slide, source VCs for reference
- Notes are visible in a presenter view (bottom panel or separate window), hidden from the projected view

**Slide total:** Determined by the content. Each section becomes however many slides it needs. Don't count in advance — let the material dictate the pacing.

### Interactive Graph Behavior

**In site mode:**
- Section 2: Compact preview of the graph. Static render. Click to expand to fullscreen overlay.
- Section 12: Larger preview. Same click-to-expand behavior.
- Fullscreen overlay: Takes up the FULL window (not a floating modal). Zoom (scroll wheel), pan (drag), click-to-highlight (clicking a node dims everything else and highlights its direct connections). Close button or Escape to exit.

**In presentation mode:**
- The graph slide is fullscreen by default. Zoom/pan/click-highlight are active. The presenter can interact with it live.

### Technical Implementation Notes

- Use `d3-graphviz` (d3.js + @hpcc-js/wasm) for client-side DOT rendering. The DOT source is embedded in the page in a hidden element.
- Presentation mode uses CSS classes to transform sections into slides. JavaScript handles navigation, slide counting, speaker notes.
- Both modes use the same DOM. No content duplication. CSS + JS transforms between modes.

---

## Part 4: Content Source Mapping

This table maps each section to its verified claims. For internal reference only — these labels NEVER appear in the output.

| Section | Source VCs | Cross-Cutting Insights |
|---|---|---|
| 1. What Amplifier Is | VC-01, VC-05 | XC-01, XC-02 |
| 2. Architecture Map | Section 5 (reconciliation) | — |
| 3. Design Philosophy | VC-27 | XC-01, XC-05 |
| 4. The Kernel | VC-01–04, VC-05, VC-08, VC-09, VC-14, VC-19, VC-27, VC-29 | XC-02 |
| 5. The Module System | VC-05, VC-06, VC-09–13 | — |
| 6. The Orchestrator | VC-07, VC-16 | XC-03, XC-04 |
| 7. Tools vs Hooks | VC-19–28 | XC-06 |
| 8. The Agent Loop | VC-07, VC-16 (+ Section 5 Cluster H) | XC-03 |
| 9. Sessions | VC-14–18, VC-31 | — |
| 10. Bundles & Configuration | VC-34–37 | — |
| 11. The Foundation Bridge | VC-32, VC-33, VC-36 | XC-05 |
| 12. The Complete Picture | All | All |
| Appendix | Methodology | — |

---

## Part 5: What NOT to Say

A specific blocklist, drawn from the user's feedback on previous attempts.

1. **No act structure.** Not "Act I: The Problem." Not "Act II: The Insight." This is a course, not a three-act play.

2. **No verification badges in the body.** "37 verified claims" does not appear in Sections 1-12. It appears in the Appendix only.

3. **No VC labels in rendered output.** VC-01 through VC-37 are internal traceability labels. They appear in this document's mapping table and in source comments. Never in the HTML, never in speaker notes shown to an audience.

4. **No velocity stats in the body.** "35 repositories", "451 commits", "5 contributors" — these were in previous versions as a "Proof" section. Remove. If the content is well-taught, it doesn't need to prove it was built fast.

5. **No "cancellation is cooperative" as a section header.** It's a detail within the Sessions section. One paragraph. Not a feature.

6. **No breathless reveals.** "Wait, really?" and "Here's the surprise" are banned phrases. If the zero-I/O fact is interesting, state it: "The kernel contains zero file-writing code. All persistence is delegated to hook modules." Let the reader react on their own.

7. **No LEGO metaphor overextension.** One mention is fine ("modules compose like LEGO bricks"). Threading it through every section as "types of bricks" and "the baseplate" is too cute.

8. **No equal-weight treatment.** The hook priority cascade gets a visual waterfall. The cleanup function order gets a sentence. Weight reflects importance.

---

## Part 6: Multi-Modal Content Guidance

The v3 masterclass introduces multiple media modalities beyond prose. The voice, tone, and editorial principles from Parts 1-5 apply to ALL modalities, not just written text. This section provides guidance for each new format.

### Vignette Scripts (Video Narration)

Vignettes are 30-60 second narrated motion graphics that animate a single concept. The narration script is the voiceover that accompanies the animation.

**Voice:** The same "best professor you ever had" voice from the prose. Slightly more conversational than the written version, because audio naturally requires shorter sentences and more direct address. But never casual, never breathless, never "hey guys."

**Approach:** Inductive, always. Show the animation first, then name what the viewer is seeing. "Watch what happens when a message arrives. The Orchestrator fetches context, calls the provider, checks for tool calls. That cycle repeats until a final answer. This is the reasoning loop."

**Length:** 60-120 words per 30-second segment. Shorter sentences than prose. Pauses are part of the script: write "[pause]" where the animation needs a beat to land before the narration continues.

**What vignette scripts are NOT:**
- Not a reading of the chapter text. The script is written specifically for the visual medium.
- Not a summary. The vignette explains ONE concept that benefits from animation, not the whole chapter.
- Not excited. No "amazing" or "incredible." The animation is the hook, not the narrator's enthusiasm.

### Chat Prompt Copy

Chat prompts appear inline at natural break points, inviting the reader to ask questions about the chapter. The copy for these prompts should feel like a professor checking in after explaining something complex.

**Examples of good chat prompts:**
- "Have a question about the priority cascade?"
- "Want to see how the mount contract works with a different module type?"
- "Not sure how hooks and tools differ? Ask here."

**Examples of bad chat prompts:**
- "Ask me anything!" (too broad, no signal about what's useful to ask)
- "Test your knowledge!" (this is a quiz, not a conversation)
- "Ready to learn more?" (condescending)

**Placement:** After a complex concept, at the end of a chapter, or after a vignette/diagram where the reader might have questions. Not after every section. Not more than 1-2 per chapter.

### Audio Narration (Chapter Audio)

Each chapter can be narrated as audio. The audio version is NOT a direct reading of the prose. It is an adaptation that accounts for the fact that listeners can't see diagrams, code blocks, or tables.

**Adaptations for audio:**
- Replace "as shown in the diagram below" with a verbal description of what the diagram shows
- Read code examples only when they're short (1-3 lines). For longer blocks, describe what the code does.
- Add brief verbal signposts: "Now let's look at..." or "The next piece is..." where the prose uses visual breaks (headers, whitespace).
- Simplify tables into verbal lists: "There are six module types. The first is the Orchestrator, which drives the conversation..."

**Voice:** Same "best professor" voice. Slightly warmer than the prose because audio is intimate. The reader is in the listener's ears.

### The Inductive Principle Across All Modalities

The inductive principle (start with the concrete, then name the concept) applies everywhere:

- **Prose:** Show the example, then name the principle.
- **Vignettes:** Show the animation, then narrate what the viewer is seeing.
- **Audio:** Describe the concrete scenario, then name the architectural concept.
- **Chat:** When answering questions, give the specific answer first, then the general principle.

No modality starts with an abstraction and works toward an example. Every modality starts with something concrete.