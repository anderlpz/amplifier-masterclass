# Section 10: The Foundation Bridge

A bundle is a text file. The kernel expects a configuration dictionary and modules ready to mount. Something has to translate between the two.

Foundation (`amplifier-foundation`) reads bundle files, resolves references, downloads needed modules, and produces a configuration the kernel can work with. It bridges how people describe agents and how the system runs them.

## PreparedBundle

Foundation's output is a PreparedBundle with four parts:

**Mount plan.** Which modules to load, in what slots, with what configuration. The blueprint the session's Loader follows.

**Resolver.** Maps module identifiers (`provider-anthropic`, `tool-filesystem`) to file paths on disk.

**Bundle.** The original configuration, preserved for reference.

**Package paths.** Filesystem paths for packages installed during preparation, enabling cleanup at session end.

## The eight-step pipeline

1. Compile mount plan from configuration
2. Create virtual environment activator
3. Install required Python packages
4. Collect module specifications
5. Download and install missing modules
6. Persist installation state (avoid re-downloading)
7. Create resolver function
8. Package into PreparedBundle

The pipeline absorbs all the practical mess: dependency management, downloads, path resolution, virtual environments. The kernel receives a clean mount plan and a resolver. Nothing else.

## Foundation is optional

The kernel works without it. Pass a raw configuration dictionary and module paths directly to the session API. The kernel has zero awareness that Foundation exists.

Foundation is a user-experience layer that makes the system approachable. The kernel's API is available to anyone who wants to bypass it.

## Two persistent callbacks

Most preparation layers do their work and disappear. Foundation does the preparation and then stays connected. It registers two callbacks that remain active for the session's entire lifetime.

### System Prompt Factory

Called every turn. Every time the AI is about to think, the kernel calls a function to get the current system prompt. Foundation provides that function.

On each call, Foundation re-reads every @mention file, resolves nested @mentions (up to three levels), deduplicates by SHA-256 hash, and rebuilds the complete system prompt from instruction text plus resolved context.

The kernel calls a function and gets a string. It doesn't know files are involved. Foundation does the file I/O, the resolution, the deduplication, all on every turn.

This is why @mention files are live. Edit a context file mid-conversation, and the agent sees the update on its next turn. Teams maintain living documents (coding standards, project requirements, API references) and agents always work with the latest version.

### BundleModuleResolver

When the kernel's Loader needs to find a module, it calls the resolver. That resolver was created by Foundation during preparation.

Foundation code runs inside the kernel's dispatch path, even though the kernel has no dependency on Foundation and no knowledge of how resolution works. The kernel defines a callable slot; Foundation fills it.

## The runtime relationship

Foundation doesn't just set up a session. It sustains it. The kernel calls into Foundation on every turn (system prompt) and during loading (module resolution). Neither side has a code dependency on the other. The kernel calls functions without knowing who provided them. Foundation calls the kernel's API without accessing kernel internals.

Connected at runtime through callbacks. Independent at compile time through interfaces.

---

## Presentation Slides

### Slide 1: The gap
- Bundles are text files. The kernel expects config dicts and module paths.
- Foundation is the translator: `amplifier-foundation`

### Slide 2: PreparedBundle
- Mount plan (kernel instructions)
- Resolver (module name → file path)
- Bundle (original config preserved)
- Package paths (for cleanup)

### Slide 3: Eight-step pipeline
- Compile, install, download, resolve, package
- Foundation handles the mess. Kernel gets a clean mount plan.

### Slide 4: Foundation is optional
- The kernel works with raw config dicts
- Foundation is a UX layer, not a requirement

### Slide 5: System Prompt Factory
- Called every turn. Re-reads all @mention files.
- Resolves nested mentions, deduplicates by SHA-256
- Edit a file mid-conversation → agent sees it next turn
- The kernel calls a function. Doesn't know files are involved.

### Slide 6: BundleModuleResolver
- Kernel needs a module → calls the resolver → Foundation answers
- Foundation code inside the kernel's dispatch path
- Kernel has no dependency on Foundation. Just calls a function.

### Slide 7: The relationship
- Foundation sets up AND sustains the session
- Neither side depends on the other in code
- Connected at runtime through well-defined callbacks

---

## Speaker Notes

### Slide 1
The gap: users write text, kernel needs structure. Foundation bridges it.

### Slide 2
Walk through the four parts briefly. Mount plan is what the kernel uses. Resolver comes up in the callbacks discussion.

### Slide 3
List the steps to show what "turning a text file into a running agent" involves. Don't dwell on individual steps. The takeaway: Foundation handles complexity so the kernel doesn't have to.

### Slide 4
This shows the architecture is principled. Foundation is convenient but not required. The kernel was designed to work without it.

### Slide 5
Most important slide in this section. Walk through slowly. Every turn, Foundation re-reads files. Not caching. Not file-watching. Full re-read. The practical consequence: "Edit a context file while the agent is running. It sees the change next turn."

### Slide 6
Architecturally significant. Foundation code runs inside kernel dispatch, but the kernel has no dependency on Foundation. Callback-driven architecture: kernel defines slots, Foundation fills them.

### Slide 7
Tie it together. Setup plus sustained participation. Neither side depends on the other in code. Connected at runtime. This is callback-driven architecture applied to the preparation layer.
