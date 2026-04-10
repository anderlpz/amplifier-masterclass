---
title: "The Foundation Bridge"
chapter: 10
blocks:
  - type: prose
  - type: diagram
    id: preparation-pipeline
    width: wide
    placement: after-pipeline-description
    rationale: "The 8-step pipeline from bundle text file to running session"
  - type: diagram
    id: two-callbacks
    width: wide
    placement: after-callback-channels
    rationale: "System Prompt Factory and BundleModuleResolver as two persistent callback channels between Foundation and Kernel"
  - type: audio
    status: stub
---

# Section 10: The Foundation Bridge

## Foundation is how we use the kernel. It is not the only way.

Foundation (`amplifier-foundation`) turns text bundle files into running sessions. It is the Amplifier team's reference implementation: their opinions about how to use the kernel, packaged for others. The kernel does not need it. You could build your own equivalent.

Think of Foundation as a convenience layer. The kernel accepts a raw configuration dictionary and a set of module paths. Foundation saves you from writing that dictionary yourself. It reads your bundle files, resolves your module references, installs packages, and assembles the configuration the kernel needs.

### PreparedBundle

Foundation's output has four parts: a mount plan (which modules to load, in what slots, with what configuration), a resolver (maps module names to file paths), the original bundle (preserved for reference), and package paths (for cleanup at session end).

### The preparation pipeline

Foundation handles all the practical mess between a text file and a running session: creating isolated environments, downloading modules from registries, resolving version constraints, assembling paths. Eight steps:

1. Compile mount plan from configuration
2. Set up environment
3. Install required Python packages
4. Collect module specifications
5. Download and install missing modules
6. Persist installation state (avoid re-downloading)
7. Create resolver function
8. Package into PreparedBundle

The kernel never sees any of it. It receives a clean mount plan and a resolver.

> The kernel doesn't need Foundation. The kernel works with a raw configuration dictionary and a set of module paths. Foundation is a user-experience layer. It makes the system approachable by translating text files into running sessions.

## Foundation does not disappear after setup. It stays connected through two live channels.

Most preparation layers do their work and leave. Foundation registers two callbacks during setup that remain active for the session's entire lifetime. The kernel calls back into Foundation code at runtime, even though the kernel has no dependency on Foundation.

### System Prompt Factory

Called on every single turn. Every time the AI is about to think (every single turn of conversation) Foundation re-reads all @mention files, resolves nested @mentions up to three levels deep, deduplicates content by SHA-256 hash, and rebuilds the complete system prompt from the instruction text plus all resolved context.

This is why @mention files are live. The kernel calls a function and gets a string back. Foundation is the one doing the file I/O, all on every turn.

### BundleModuleResolver

Called on demand during module loading. When the kernel's Module Loader needs to find a module (to resolve a module identifier like `tool-filesystem` to an actual file path) it calls the resolver. That resolver was created by Foundation during the preparation pipeline.

Foundation code is running inside the kernel's dispatch path, even though the kernel has no dependency on Foundation and no knowledge of how the resolution works.

## The runtime relationship

Foundation doesn't just set up a session. It sustains it. The kernel calls into Foundation on every turn (system prompt) and during loading (module resolution). Neither side has a code dependency on the other. The kernel calls functions without knowing who provided them. Foundation calls the kernel's API without accessing kernel internals.

Connected at runtime through callbacks. Independent at compile time through interfaces.

---

## Presentation Slides

### Slide 1: Foundation translates text files into running sessions
- Bundles are text files. The kernel expects config dicts and module paths.
- Foundation is the translator: `amplifier-foundation`
- The Amplifier team's reference implementation, not the only way

### Slide 2: PreparedBundle
- Mount plan (kernel instructions)
- Resolver (module name -> file path)
- Bundle (original config preserved)
- Package paths (for cleanup)

### Slide 3: Eight-step pipeline
- Compile, set up environment, install, download, resolve, package
- Foundation handles the mess. Kernel gets a clean mount plan.

### Slide 4: The kernel has no knowledge that Foundation exists
- Call the kernel session API directly
- Foundation is a user-experience layer, not a requirement

### Slide 5: Foundation does not just set up. It stays connected.
- Two persistent callbacks registered at session start
- Active for the entire session lifetime

### Slide 6: System Prompt Factory
- Called every turn. Re-reads all @mention files.
- Resolves nested mentions, deduplicates by SHA-256
- Edit a file mid-conversation -> agent sees it next turn
- The kernel calls a function. Doesn't know files are involved.

### Slide 7: BundleModuleResolver
- Kernel needs a module -> calls the resolver -> Foundation answers
- Foundation code inside the kernel's dispatch path
- Kernel has no dependency on Foundation. Just calls a function.

### Slide 8: The runtime relationship
- Foundation depends on kernel in code
- Kernel calls Foundation at runtime only (through callbacks)
- Neither side knows about the other at compile time

---

## Speaker Notes

### Slide 1
The gap: users write text, kernel needs structure. Foundation bridges it. But it's the team's opinion about how to bridge it, not the only possible bridge.

### Slide 2
Walk through the four parts briefly. Mount plan is what the kernel uses. Resolver comes up in the callbacks discussion.

### Slide 3
List the steps to show what "turning a text file into a running agent" involves. Step 2 is now "Set up environment" (covers virtualenv creation and related setup). The takeaway: Foundation handles complexity so the kernel doesn't have to.

### Slide 4
This shows the architecture is principled. Foundation is convenient but not required. The kernel was designed to work without it. You can call the kernel's API directly.

### Slide 5
Transition slide. Most preparation layers do their work and leave. Foundation stays. Set up the two-callback reveal.

### Slide 6
Most important slide in this section. Walk through slowly. Every turn, Foundation re-reads files. Not caching. Not file-watching. Full re-read. The practical consequence: "Edit a context file while the agent is running. It sees the change next turn."

### Slide 7
Architecturally significant. Foundation code runs inside kernel dispatch, but the kernel has no dependency on Foundation. Callback-driven architecture: kernel defines slots, Foundation fills them.

### Slide 8
Tie it together. Foundation depends on kernel (in code). Kernel calls Foundation (at runtime only). Connected at runtime through well-defined callback interfaces. Even the preparation layer follows mechanism versus policy.