---
title: "Agents, Context Files, Skills, and Recipes"
chapter: 11
blocks:
  - type: prose
  - type: diagram
    id: recipe-pipeline
    width: wide
    placement: after-recipes
    rationale: "The recipe pipeline showing sequential steps with output feeding to input and approval gates between steps"
  - type: vignette
    id: recipe-workflow-animation
    width: wide
    placement: after-recipe-diagram
    status: stub
    rationale: "Animating a 3-step recipe (review, write docs, create PR) with data flowing between steps and an approval gate pausing would show the workflow pattern"
  - type: audio
    status: stub
---

# Section 11: Agents, Context Files, Skills, and Recipes

## Agents, skills, recipes: each one is built from pieces you have already seen.

Every feature in this section uses sessions, bundles, and modules. No new kernel support was added. Each feature was assembled from the primitives covered in the sections above.

The section is organized into four tabs: Agents, Context Files, Recipes, and Skills.

---

## Agents are bundles

Agents *are* bundles. Same file format. Same parser. Same composition, @mentions, and merge rules.

One difference: the YAML frontmatter key. A bundle uses `bundle:`. An agent uses `meta:`. That's it. Everything else (how the file is read, how instructions are parsed, how modules load) is identical.

The kernel has no concept of "agents." It runs sessions with configurations. The naming is a semantic signal for humans: agent files represent complete autonomous entities, bundle files represent configuration fragments.

## Context files

A context file is a Markdown document that gets loaded into the AI's working memory at the start of each conversation turn. Context files are what @mentions reference. When a bundle's instruction body says `@project:standards/coding.md`, it's pointing to a context file. That file might describe the project's coding conventions, its preferred frameworks, its naming patterns.

The value of context files is separation of concerns. Instead of cramming every piece of background knowledge into the bundle's instruction body, you put each topic in its own file. One file for coding standards. One file for the API reference. One file for the team's workflow. The bundle references whichever files are relevant. One file, one source of truth. Update it once, and every agent and every bundle that references it picks up the change.

Context files are also composable. A context file can contain @mentions of its own, referencing other context files, up to three levels deep.

## Recipes

Sometimes a task is too complex for a single agent conversation. It involves multiple steps, each requiring different capabilities, where the output of one step feeds into the next. Recipes handle this.

A recipe is a YAML file that defines a sequence of steps. Each step runs its own agent session with its own bundle, tools, and instructions. Output from step N becomes input to step N+1. Review code -> Write docs -> Create pull request.

**Approval gates** pause execution for human review. Between steps, a person can review the current output before the system continues. Automated work with human judgment at the critical junctions.

**Resumability** via checkpoints. Each step creates a checkpoint. If something fails at step four of a seven-step recipe, you don't need to start over from step one. Resume from the last successful checkpoint. No work lost to a network error.

Recipes are themselves a bundle concept, not a kernel concept. The kernel doesn't know recipes exist. The recipe system is built on top of the kernel's session API. It creates sessions, runs them, collects outputs, and chains them together.

## Skills

### Skills are lazy-loaded domain knowledge

An agent can use tools and delegate to other agents, but sometimes what it needs is knowledge: coding standards for a specific framework, deployment procedures for a particular cloud provider, the team's naming conventions. Skills fill this role. A skill is a Markdown file with YAML frontmatter that the agent can discover and load on demand.

The loading follows a three-level progressive disclosure pattern:

- **Level 1: Metadata** (~100 tokens, always visible). The skill's name and a one-line description.
- **Level 2: Full content** (~1-5k tokens, on demand). Loaded only when the agent decides the skill is relevant.
- **Level 3: Companion files** (0 tokens until accessed). Code examples, templates, reference data that the skill can reference but that stay on disk until explicitly read.

The result is efficient token budget management: the agent sees what expertise is available without paying the context cost until it actually needs the knowledge.

### Fork execution

Skills can also run as isolated subagents (called fork execution), bridging the gap between passive knowledge and autonomous agents. A code review skill, for example, loads like a skill but spawns its own session with its own context window to do the work.

### Skills vs Agents

- **Skill**: knowledge for the current session
- **Agent**: independent worker, own session
- **Fork skill**: discovered like a skill, runs like an agent

## Modes and model routing

### Modes

A mode is a runtime behavior overlay: a Markdown file that, when activated, injects guidance into the AI's system prompt and enforces tool-level policies. Each tool in the session can be set to `safe`, `warn`, `confirm`, or `block`. Modes compose into workflow pipelines (brainstorm, then plan, then execute, then verify) where each phase constrains the agent to the tools and mindset appropriate for that stage. The kernel has no concept of modes. They are built from hooks and context injection.

### Model routing

Instead of hard-coding which AI model handles each request, agents declare the *type of thinking* a task requires: `coding`, `reasoning`, `critique`, `fast`, `vision`. A routing matrix maps these semantic roles to concrete models. When better models arrive or costs change, only the matrix needs updating. Agents carry their role declaration in their frontmatter. The kernel routes through the Provider slot as it always has. The routing logic lives in Foundation.

---

## Presentation Slides

### Slide 1: Agents are bundles
- Same format, parser, composition rules
- Only difference: `meta:` vs `bundle:` in frontmatter
- The kernel has no concept of "agents"
- Naming is a human signal, not a technical distinction

### Slide 2: One context file. Referenced by many bundles. Update once. Every agent picks up the change.
- No restarts. No redeployment.
- The System Prompt Factory re-reads files on every turn.

### Slide 3: Context files in practice
- Coding standards: every coding agent references the same file
- API reference: agents always work with the latest version
- Project overview: can reference sub-documents, agent gets the full context tree
- Compliance rules: one source of truth, never stale

### Slide 4: Recipes (multi-step workflows)
- YAML file defining sequential agent steps
- Each step: own session, own bundle, own tools
- Output N -> input N+1
- Example: review code -> write docs -> create PR

### Slide 5: Approval gates and resumability
- **Approval gates**: pause for human review at declared points
- **Resumability**: checkpoint per step. Resume from last success.

### Slide 6: Same primitives throughout
- Agents = bundles with a different key
- Recipes = sessions chained through the session API
- Same kernel API throughout
- No new kernel concepts needed

---

## Speaker Notes

### Slide 1
A "one line of YAML" slide. The entire agent/bundle distinction is one frontmatter key. The kernel doesn't know the difference. Foundation processes them identically.

### Slide 2
One context file, referenced by many bundles. The person who maintains the coding standards document doesn't need to coordinate with the person who maintains the agents. Update the file. Every agent that references it picks up the change on its next turn.

### Slide 3
In practice, this is what makes the system manageable at scale. Your coding standards, your API documentation, your team conventions: each lives in its own context file, maintained by the people who own that knowledge. No coordination overhead.

### Slide 4
Walk through the example. Three different agents with different capabilities. The recipe ties them together. Each step gets its own session with its own context.

### Slide 5
What makes recipes production-ready. Without gates, you trust every automated step. Without resumability, failure means restart.

### Slide 6
Synthesis. Agents are bundles. Recipes are sessions chained together. Context files are just files on disk. Three concepts that sound like they should require significant kernel support, and none of them do. Once the right primitives exist, complex behavior assembles from them naturally.