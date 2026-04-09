# Section 2: The Architecture Map

The diagram below maps every major component of Amplifier across thirteen clusters, along with the connections between them. Think of it as a city map before you walk the streets. You don't need to know every building. You need the neighborhoods.

**The center** is the kernel. Inside it: the Coordinator (a registry storing modules), the Hook and Event system (a notification network), the Module Loader, and the Session lifecycle.

**The middle ring** holds the modules, the pluggable pieces that define how an agent behaves. The Orchestrator drives the conversation. Providers connect to AI models. Tools give the agent actions. Context Managers handle memory. Hook Handlers enforce rules and react to events.

**The outer ring** is Foundation (which turns configuration files into running agents) and the ecosystem: bundles, recipes, apps, community extensions.

Arrows show dependency direction. The component at an arrow's tail depends on the component at its head.

Don't memorize it. Use it as a reference. Every cluster will be familiar by the final section.

*The interactive version lets you click any component to highlight its connections, zoom in, and pan around.*

---

## Presentation Slides

### Slide 1: The architecture map
- Full-screen diagram
- "Thirteen clusters. We'll walk through each one."
- Let the audience look first

### Slide 2: Orientation
- Center: the kernel (small, unchanging core)
- Middle ring: modules (orchestrator, providers, tools, hooks, context)
- Outer ring: Foundation + ecosystem (bundles, recipes, apps)
- Arrows show dependency direction

---

## Speaker Notes

### Slide 1
Put the full diagram on screen and pause. Let the audience absorb it for several seconds before speaking. Then: "This is the architecture of Amplifier. Thirteen clusters. We're going to walk through each one over the next forty-five minutes. By the end, every piece on this diagram will be familiar." Don't explain individual components yet; that's what the following sections are for. This is strictly orientation.

### Slide 2
Three concentric rings: kernel at the center, modules around it, ecosystem on the outside. Emphasize the dependency direction: outer layers depend on inner layers, never the reverse. The kernel has no knowledge of Foundation. Foundation has no knowledge of specific apps. This is intentional. You can replace any outer layer without affecting inner ones.
