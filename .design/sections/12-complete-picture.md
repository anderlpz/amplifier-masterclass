# Section 12: The Complete Picture

## Six layers

Amplifier's ecosystem stacks into six layers. Each depends only on the one below. This isn't conceptual; it's the literal code dependency structure.

**Layer 1: Kernel.** Contracts, module loading, event dispatch, session lifecycle. `amplifier-core`. Never changes when capabilities are added. Everything above depends on it. Nothing here depends on anything above.

**Layer 2: Foundation.** Reads bundles, resolves references, downloads modules, produces mount plans. Stays connected at runtime through callbacks. Depends on the kernel. The kernel does not depend on Foundation.

**Layer 3: Modules.** Providers, tools, hooks, orchestrators, context managers, resolvers. The pieces that give agents their capabilities. Depend on kernel contracts. Don't depend on Foundation (a module doesn't need to know how it was discovered).

**Layer 4: Bundles.** Text file configuration. Describe which modules to load and how. Processed by Foundation. Reference modules by name but don't depend on module code.

**Layer 5: Applications.** What people use. CLI, web interface, IDE integrations, voice assistants. Create sessions through Foundation or directly through the kernel API.

**Layer 6: Community.** Third-party modules, shared bundles, recipes, integrations. The architecture is open at every level.

Replace anything at one layer without affecting the others. A new Foundation could be written without changing the kernel. A new application without changing Foundation. A new module without any existing module knowing.

## The diagram, fully explained

The interactive diagram from Section 2 maps directly to these layers. By now, every label should be meaningful. The Coordinator is the shelf for mounted modules. The HookRegistry routes events to handlers. The Module Loader discovers and mounts. PreparedBundle bridges configuration and runtime.

The arrows show the dependency and data flow relationships traced through each section: the Orchestrator calls the Provider, the Provider calls the AI model, the Orchestrator calls Tools that hooks check, events flow from the kernel to Hook Handlers, Foundation registers callbacks into the kernel.

## Where new things go

A new AI model (say, one that processes video) goes at Layer 3. A provider module. Same interface, kernel unchanged.

A team wants to block file modifications in production directories. Layer 3. A hook module. Registers for `tool:pre`, checks the path, returns `deny`. The AI never knows.

A standard agent configuration for the organization. Layer 4. A bundle. Lists modules, sets configuration, provides instruction text. Anyone can include it and customize further.

The architecture tells you where things belong. New capabilities: modules. New rules: hooks. New configurations: bundles. New interfaces: applications. The kernel doesn't change.

## Closing

The kernel provides mechanism. Modules provide policy. The center stays still so the edges can move at any speed.

That's why the kernel contains five things and not fifty. Why modules follow a universal mount contract. Why Foundation is optional. Why bundles are text files. Why hooks are invisible to the AI. Every decision traces to this: keep the center simple and stable, push everything that changes to the outside.

The most interesting parts of this system are the ones that haven't been built yet.

---

## Presentation Slides

### Slide 1: Six layers
- Kernel → Foundation → Modules → Bundles → Applications → Community
- Each depends only on the one below
- Replace at any layer without affecting others

### Slide 2: Infrastructure (Layers 1–3)
- Kernel: contracts, loading, events, lifecycle. Never changes.
- Foundation: bundles to sessions. Stays connected via callbacks.
- Modules: providers, tools, hooks, orchestrators, context managers.

### Slide 3: Ecosystem (Layers 4–6)
- Bundles: text file configuration. No code.
- Applications: CLI, web, IDE, voice.
- Community: third-party everything. Open at every layer.

### Slide 4: The full architecture diagram
- (Full-screen interactive diagram)
- Every cluster maps to something covered
- Arrows show dependencies and data flow traced through each section

### Slide 5: Where do things go?
- New model → Provider module (Layer 3)
- New safety rule → Hook module (Layer 3)
- Shared config → Bundle (Layer 4)
- New interface → Application (Layer 5)

### Slide 6: Closing
- The kernel provides mechanism. Modules provide policy.
- The center stays still so the edges can move at any speed.
- The most interesting parts haven't been built yet.

---

## Speaker Notes

### Slide 1
Zoom-out moment. The six layers are how the code dependencies actually work. The key phrase: "each layer depends only on the one below."

### Slide 2
Review, not new material. Show how pieces from previous sections relate in the layer model.

### Slide 3
Where the system meets users. Open at every level; anyone can contribute modules, publish bundles, build applications.

### Slide 4
Interact with the diagram live. Click nodes, highlight connections, zoom into areas from earlier sections. The audience should feel recognition, not confusion.

### Slide 5
Practical test of understanding. "New model arrives. Where does it go?" The pattern should be obvious by now.

### Slide 6
Final slide. Let it breathe. Three sentences summarize the architecture. The forward-looking close: the most interesting parts haven't been built yet.
