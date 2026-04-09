# Section 12: The Complete Picture

## Each layer depends only on the one below it.

Replace anything at one layer without affecting the others. A new Foundation implementation could be written without changing the kernel. A new module could be published without any existing module knowing it exists. This is the literal code dependency structure.

**Layer 1: Kernel.** Contracts, module loading, event dispatch, session lifecycle. `amplifier-core`. The unchanging center. Everything above depends on it. Nothing here depends on anything above.

**Layer 2: Modules.** Providers, tools, hooks, orchestrators, context managers, resolvers. The actual capabilities. Depend on kernel contracts. Don't depend on Foundation (a module doesn't need to know how it was discovered).

**Layer 3: Bundles.** Configuration packages. Text files. Combine modules into deployable agents. No code required. Reference modules by name but don't depend on module code.

**Layer 4: Foundation.** Turns bundles into running sessions. Finds modules, assembles config, and stays connected at runtime. Essentially a community bundle that the Amplifier team maintains. Depends on the kernel. The kernel does not depend on Foundation.

**Layer 5: Applications.** What people use. CLI, web interface, IDE integrations, voice assistants. The things people use. Create sessions through Foundation or directly through the kernel API.

**Layer 6: Community.** Third-party modules, bundles, recipes, integrations. Open at every level. Anyone can build here.

The pattern across all six layers is the same: each layer depends only on the one below. This means you can replace anything at one layer without affecting the layers above or below it. A new Foundation implementation could be written without changing the kernel. A new application could be built without changing Foundation. A new module could be published without any of the existing modules knowing it exists.

## Where new things go

A new AI model (say, one that processes video) goes at Layer 2. A provider module. Same interface, kernel unchanged.

A team wants to block file modifications in production directories. Layer 2. A hook module. Registers for `tool:pre`, checks the path, returns `deny`. The AI never knows.

A standard agent configuration for the organization. Layer 3. A bundle. Lists modules, sets configuration, provides instruction text. Anyone can include it and customize further.

The architecture tells you where things belong. New capabilities: modules. New rules: hooks. New configurations: bundles. New interfaces: applications. The kernel doesn't change.

## Closing

The kernel provides mechanism. Modules provide policy. You build the harness.

That's why the kernel contains five things and not fifty. Why modules follow a universal mount contract. Why Foundation is optional. Why bundles are text files. Why hooks are invisible to the AI. Every decision traces to this: keep the center simple and stable, push everything that changes to the outside.

The most interesting parts of this system are the ones that haven't been built yet.

This document covers how Amplifier is built. For a hands-on walkthrough covering installation, your first conversation, and practical usage of every concept here, see the [Amplifier Tutorial](https://ramparte.github.io/amplifier-tutorial/).

---

## Presentation Slides

### Slide 1: Six layers, the full ecosystem
- Layer 1: Kernel (contracts, loading, events, lifecycle)
- Layer 2: Modules (providers, tools, hooks, orchestrators, context managers)
- Layer 3: Bundles (text file configuration, no code required)
- Layer 4: Foundation (turns bundles into sessions, optional bridge)
- Layer 5: Applications (CLI, web, IDE, voice)
- Layer 6: Community (third-party everything, open at every layer)

### Slide 2: Infrastructure layers (1-3)
- Layer 1: Kernel. Contracts, loading, events, lifecycle. Never changes.
- Layer 2: Modules. The building blocks. Providers, tools, hooks, orchestrators, context managers.
- Layer 3: Bundles. Text files. Package modules into deployable capabilities. No code required.

### Slide 3: Ecosystem layers (4-6)
- Layer 4: Foundation. Turns bundles into sessions. Optional bridge between bundles and the kernel.
- Layer 5: Applications. CLI, web, IDE, voice. The things people use.
- Layer 6: Community. Third-party everything. Open at every level. Anyone can build here.

### Slide 4: The full architecture diagram
- (Full-screen interactive diagram)
- Every cluster maps to a concept we covered
- Every arrow a dependency we traced

### Slide 5: Where do things go?
- New model -> Provider module (Layer 2)
- New safety rule -> Hook module (Layer 2)
- Shared config -> Bundle (Layer 3)
- New interface -> Application (Layer 5)

### Slide 6: Closing
- The kernel provides mechanism. Modules provide policy. You build the harness.
- The center stays still so the edges can move at any speed.
- The most interesting parts haven't been built yet.

---

## Speaker Notes

### Slide 1
Zoom-out moment. The six layers are how the code dependencies actually work. Note the restructured order from v2: Kernel -> Modules -> Bundles -> Foundation -> Applications -> Community. Foundation is now Layer 4, positioned as "essentially a community bundle the Amplifier team maintains."

### Slide 2
Review, not new material. Show how pieces from previous sections relate in the layer model. Key: modules depend on the kernel's contracts (the Coordinator, the mount protocol) but they don't depend on Foundation. A module doesn't know or care whether it was loaded through a bundle or through a direct API call.

### Slide 3
Where the system meets users. Foundation is an optional bridge. Applications are what people use. Open at every level; anyone can contribute modules, publish bundles, build applications.

### Slide 4
Interact with the diagram live. Click nodes, highlight connections, zoom into areas from earlier sections. The audience should feel recognition, not confusion.

### Slide 5
Practical test of understanding. "New model arrives. Where does it go?" The pattern should be obvious by now.

### Slide 6
Final slide. Let it breathe. "You build the harness." is the closing line. The forward-looking close: the most interesting parts haven't been built yet. Include the tutorial link for those who want to go hands-on.