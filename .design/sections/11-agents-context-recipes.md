# Section 11: Agents, Context Files, and Recipes

Three concepts that sound like they should require significant kernel support, and none of them do. Each is built from primitives already covered.

## Agents are bundles

Same file format. Same parser. Same composition and @mention system. Same merge rules.

One difference: the YAML frontmatter key. A bundle uses `bundle:`. An agent uses `meta:`. That's it. One key name. Everything else (how the file is read, how instructions are parsed, how modules load) is identical.

This distinction exists in Foundation, not the kernel. The kernel has no concept of "agents." It runs sessions with configurations. Whether that configuration came from an agent file or a bundle file is irrelevant to it.

The naming is a semantic signal for humans: an agent file represents a complete autonomous entity ("this is a coding assistant"), while a bundle file represents a configuration fragment ("these are the database tools").

## Context files

A context file is a Markdown document loaded into the AI's working memory each turn. It's the target of @mentions. When a bundle says `@project:standards/coding.md`, it's pointing to a context file containing coding conventions, preferred frameworks, naming patterns.

Separation of concerns: instead of cramming everything into one instruction body, each topic gets its own file. Coding standards in one place. API reference in another. Team workflow in a third. The bundle references the relevant ones.

One file, one source of truth. Update a coding standards file once, and every agent referencing it picks up the change. No need to update a dozen instruction bodies across a dozen agent definitions. And because the System Prompt Factory re-reads files every turn, agents see updates immediately.

Context files can contain their own @mentions, referencing other context files up to three levels deep. This allows hierarchical organization: a project overview referencing architecture docs, conventions, and deployment guides. The agent gets the full tree.

## Recipes

Some tasks are too complex for a single conversation. A code review that feeds documentation that feeds a pull request involves three distinct tasks, each needing different tools and instructions.

A recipe is a YAML file defining a sequence of steps. Each step runs its own agent session with its own bundle, tools, and instructions. Output from step N becomes input to step N+1.

**Approval gates** pause execution for human review. Between the review step and the writing step, a person verifies findings before documentation is written based on them. Human judgment at the critical junctions.

**Resumability** via checkpoints. If step four of a seven-step recipe fails, resume from step three, not from the beginning. A thirty-minute code review doesn't need repeating because a network error hit during publishing.

Recipes are built on the session API, not added to the kernel. The kernel doesn't know recipes exist. The recipe system creates sessions, runs them, collects outputs, and chains them together. Complex behavior from simple primitives.

---

## Presentation Slides

### Slide 1: Agents are bundles
- Same format, parser, composition rules
- Only difference: `meta:` vs `bundle:` in frontmatter
- The kernel has no concept of "agents"
- Naming is a human signal, not a technical distinction

### Slide 2: Context files
- Markdown docs loaded via @mentions
- One file, one source of truth: update once, all agents update
- Composable: context files can reference other context files (3 levels)

### Slide 3: Recipes (multi-step workflows)
- YAML file defining sequential agent steps
- Each step: own session, own bundle, own tools
- Output N → input N+1
- Example: review code → write docs → create PR

### Slide 4: Approval gates and resumability
- **Approval gates**: pause for human review at declared points
- **Resumability**: checkpoint per step. Resume from last success.

### Slide 5: Same primitives throughout
- Agents = bundles with a different key
- Context files = @mentions resolved by System Prompt Factory
- Recipes = sessions chained through the session API
- No new kernel concepts needed

---

## Speaker Notes

### Slide 1
A "one line of YAML" slide. The entire agent/bundle distinction is one frontmatter key. The kernel doesn't know the difference. Foundation processes them identically.

### Slide 2
Practical value: one file, many bundles. Update the standards doc once, every coding agent sees it immediately. Direct consequence of the System Prompt Factory re-reading files every turn.

### Slide 3
Walk through the example. Three different agents with different capabilities. The recipe ties them together.

### Slide 4
What makes recipes production-ready. Without gates, you trust every automated step. Without resumability, failure means restart.

### Slide 5
Synthesis. Three concepts that sound like major features, all built from existing primitives. Once the right primitives exist, complex behavior assembles from them naturally.
