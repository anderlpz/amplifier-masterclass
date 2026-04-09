# Section 9: Bundles and Configuration

Most people who use Amplifier will never write a module. They'll write a bundle: a text file, no code, that describes which modules to load, what context to give the AI, and how the session should behave.

## Two formats

**Markdown with YAML frontmatter** is the common case. YAML block at the top declares modules and configuration. Markdown body below becomes the AI's system instruction: its personality, rules, sense of purpose. The YAML handles technical setup; the Markdown handles human communication.

**Pure YAML** (`bundle.yaml`) is configuration only, no instruction body. Used when a bundle provides tools or settings but doesn't need to address the AI directly.

When Amplifier encounters a directory path, it checks for `bundle.md` first, then falls back to `bundle.yaml`.

## Composition

A bundle can `include:` other bundles. The system loads included bundles first, then applies the current bundle on top. Last wins.

Different parts merge differently because different parts have different needs:

- **Session settings**: deep-merged. Override only what you change.
- **Module lists** (providers, tools, hooks): merge by key. Same name replaces; others preserved.
- **Instruction text**: replaced entirely. Merging prose produces incoherent output.

This lets you build configurations in layers. A base bundle defines standard tools and safety hooks. A team bundle includes the base and adds team-specific tools. A project bundle includes the team bundle and overrides the model. Each layer specifies only what it changes.

## @mentions

Inside an instruction body, `@namespace:path/to/file.md` references pull external files into the AI's system prompt. Your coding standards document, project overview, API reference: each lives in its own file. The bundle references the relevant ones.

Resolution is recursive (up to three levels: referenced files can contain their own @mentions). Content is deduplicated by SHA-256 hash; same content through different paths appears only once.

## Live re-reading

Referenced files aren't read once and cached. They're re-read on every turn of conversation, through the System Prompt Factory (a callback Foundation registers with the kernel).

Edit a context file while an agent is running. The agent sees the change on its very next turn. No restart. Context files are a continuous feed of current information, not snapshots taken at session start.

---

## Presentation Slides

### Slide 1: What's a bundle?
- A text file describing an agent's configuration, no code
- Which modules, what context, how the session behaves
- Most users write bundles, not modules

### Slide 2: Two formats
- **Markdown + YAML frontmatter**: config + instructions
- **Pure YAML**: config only, no instruction body
- System checks `bundle.md` first, then `bundle.yaml`

### Slide 3: Composition (layers)
- Base: standard tools + safety hooks
- Team: includes base, adds team tools
- Project: includes team, overrides model
- Each layer specifies only what it changes

### Slide 4: Merge strategies
- Session settings: deep-merge
- Module lists: merge by key (same name = replace)
- Instructions: full replacement

### Slide 5: @mentions
- `@namespace:path/to/file.md` pulls files into the system prompt
- Recursive resolution up to 3 levels
- Deduplicated by SHA-256 hash

### Slide 6: Live context
- @mention files re-read every turn of conversation
- Edit a file while agent is running → agent sees change next turn
- No restart. Context files are live, not snapshots.

---

## Speaker Notes

### Slide 1
Where Amplifier meets most users. Everything up to now has been internal machinery. Bundles are how you go from "I want an agent that does X" to a running agent. A text file. Genuinely no code.

### Slide 2
Markdown format is for agents with personality and instructions (most agents). YAML is for configuration fragments: base layers, tool collections. System preference for `bundle.md` reflects typical use.

### Slide 3
Composition is what makes bundles scale. Concrete example: "Your org has a base with approved tools and safety hooks. Your team adds their tools. Your project overrides the model." Each file stays small and focused.

### Slide 4
The merge strategies are thoughtful, not just overwriting. Session settings: change individual values without restating everything. Module lists: add or replace specific tools without listing every tool from the base. Instructions: no sensible way to merge two paragraphs of prose.

### Slide 5
@mentions separate concerns. One file per topic, referenced by multiple bundles. Recursive resolution enables hierarchical context organization.

### Slide 6
This is the detail that changes how people think about context files. Not loaded once, not cached. Full re-read every turn. Update a coding standards file, and every agent referencing it sees the change immediately. Possible because of the System Prompt Factory callback.
