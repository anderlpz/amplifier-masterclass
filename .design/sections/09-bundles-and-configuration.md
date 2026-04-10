---
title: "Bundles and Configuration"
chapter: 9
blocks:
  - type: prose
  - type: code
    placement: minimal-bundle-example
  - type: diagram
    id: composition-layers
    width: wide
    placement: after-composition
    rationale: "Base bundle + Team bundle + Project bundle layering with merge behavior"
  - type: diagram
    id: mention-resolution
    width: wide
    placement: after-mentions
    rationale: "The @mention resolution flow: text reference to filesystem path to loaded content to system prompt"
  - type: audio
    status: stub
---

# Section 9: Bundles and Configuration

## Bundles are how you package and distribute capabilities.

If modules are the building blocks, bundles are the packaging. A bundle is a text file that describes which modules to load, what context to give the AI, and how the session should behave. Bundles are language-agnostic: the definitions are YAML or Markdown. What you include can be anything.

Think of bundles like npm packages for AI capabilities. A bundle packages modules, tools, hooks, instructions, and context files together. The simplest bundle is a single file: a few lines of configuration and a paragraph of instructions. That is enough to create an AI agent.

## Two formats

**Markdown with YAML frontmatter** is the more common format. The file has two parts: a block of YAML configuration at the top (between `---` markers), and a Markdown body below it. The YAML says what modules to load and how to configure them. The Markdown body becomes the AI's system instruction: its personality, its rules, its sense of purpose.

**Pure YAML** is configuration only, with no prose instruction body. Used when a bundle is providing configuration (loading certain tools, setting session parameters) but doesn't need to tell the AI anything directly.

When Amplifier encounters a directory path, it checks for `bundle.md` first, then falls back to `bundle.yaml`.

### A minimal bundle

```markdown
---
bundle:
  model: anthropic/claude
  tools:
    - name: filesystem
    - name: web-search
  hooks:
    - name: safety-guard
---

You are a helpful coding assistant.
You write clean, well-documented code.
You follow the project's coding
standards (see @project:standards.md).
```

## Composition

A bundle can declare an `include:` list of references to other bundles. When the system prepares the bundle, it loads the included bundles first, then applies the current bundle's configuration on top. Last wins.

Different parts merge differently because different parts have different needs:

- **Session settings**: deep-merged. Override only what you change.
- **Module lists** (providers, tools, hooks): merge by key. Same name replaces; others preserved.
- **Instruction text**: replaced entirely. Merging prose produces incoherent output.

This lets you build configurations in layers. A base bundle defines standard tools and safety hooks. A team bundle includes the base and adds team-specific tools. A project bundle includes the team bundle and overrides the model. Each layer specifies only what it changes.

Composability is what makes bundles reusable across teams. You can use someone else's bundle but only bring part of it. You can create a bundle that pulls parts from many sources into your own project-specific configuration.

## @mentions

Inside a bundle's instruction body, you can reference external files using `@namespace:path/to/file.md`. When the system encounters an @mention, it resolves the reference to a file on disk, reads its content, and includes it in the system prompt that the AI receives.

This is how you give an agent background knowledge without cramming everything into one enormous instruction file. Your coding standards document, project overview, list of API endpoints. Each lives in its own file, and the bundle references whichever ones are relevant.

Resolution is recursive (up to three levels: referenced files can contain their own @mentions). Content is deduplicated by SHA-256 hash; same content through different paths appears only once.

## Live re-reading

@mention files are re-read on every single turn of conversation through the System Prompt Factory. Edit a context file while an agent is running, and the agent sees the change on its very next turn. No restart required.

Context files are a continuous feed of current information, not snapshots taken at session start.

---

## Presentation Slides

### Slide 1: Most users will never write a module
- They'll write a bundle
- A text file. No code required.
- Describes which modules to load, what context to give the AI, how the session should behave

### Slide 2: Two formats
- **Markdown + YAML frontmatter** (`bundle.md`): config + instructions (the common format)
- **Pure YAML** (`bundle.yaml`): config only, no instruction body
- System checks `bundle.md` first, then `bundle.yaml`

### Slide 3: A minimal bundle (code)
```
---
bundle:
  providers:
    - provider-anthropic
  tools:
    - tool-filesystem
    - tool-terminal
---

You are a helpful coding assistant.
You follow these project standards:
@project:standards/coding.md
```
- The YAML handles technical configuration. The Markdown handles human communication.
- This is everything you need for a working agent.

### Slide 4: Composition (layers)
- Base: standard tools + safety hooks (organization)
- Team: includes base, adds team tools
- Project: includes team, overrides model
- Each layer specifies only what it changes. Last definition wins.

### Slide 5: Merge strategies
- Session settings: deep-merge
- Module lists: merge by key (same name = replace)
- Instructions: full replacement (merged prose would be incoherent)

### Slide 6: @mentions
- `@namespace:path/to/file.md` pulls files into the system prompt
- Recursive resolution up to 3 levels
- Deduplicated by SHA-256 hash

### Slide 7: Live documents, not snapshots
- @mention files re-read every turn of conversation
- Edit a file while agent is running → agent sees change next turn
- No restart required
- The System Prompt Factory re-reads files on every turn

---

## Speaker Notes

### Slide 1
Where Amplifier meets most users. Everything up to now has been internal machinery. Bundles are how you go from "I want an agent that does X" to a running agent. A text file. Genuinely no code. This is the payoff of all the architecture: the kernel, the module system, the mount contract all exist so that this file can be this simple.

### Slide 2
Markdown format is for agents with personality and instructions (most agents). YAML is for configuration fragments: base layers, tool collections. System preference for `bundle.md` reflects typical use.

### Slide 3
A real example is worth more than any explanation. This is a minimal bundle. Look at how little you need: a few lines of frontmatter, a paragraph of instructions, and you have a working agent. The npm analogy makes the concept accessible: bundles are to AI capabilities what npm packages are to JavaScript libraries.

### Slide 4
Composition is what makes bundles scale from personal projects to organization-wide deployments. Concrete example: "Your org has a base with approved tools and safety hooks. Your team adds their tools. Your project overrides the model." Each file stays small and focused.

### Slide 5
The merge strategies are thoughtful, not just overwriting. Session settings: change individual values without restating everything. Module lists: add or replace specific tools without listing every tool from the base. Instructions: no sensible way to merge two paragraphs of prose.

### Slide 6
@mentions separate concerns. One file per topic, referenced by multiple bundles. Recursive resolution enables hierarchical context organization.

### Slide 7
This is the detail that changes how people think about context files. Not loaded once, not cached. Full re-read every turn. Update a coding standards file, and every agent referencing it sees the change immediately. Possible because of the System Prompt Factory callback.
