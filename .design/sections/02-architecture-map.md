# Section 2: The Architecture Map

## A map of the territory before we walk through it.

This diagram shows every major component and how they connect. Think of it as a city map before you walk the streets. You don't need to know every building. You need the neighborhoods.

**The center** is the kernel. Inside it: the Coordinator (a registry storing modules), the Hook and Event system (a notification network), the Module Loader, and the Session lifecycle.

**The middle ring** holds the modules, the pluggable pieces that define how an agent behaves. The Orchestrator drives the conversation. Providers connect to AI models. Tools give the agent actions. Context Managers handle memory. Hook Handlers enforce rules and react to events.

**The outer ring** is Foundation (which turns configuration files into running agents) and the ecosystem: bundles, recipes, apps, community extensions.

The most important cluster is at the center: `amplifier-core`. Everything else depends on it; it depends on nothing. That asymmetry is the architecture in one sentence.

Don't try to memorize the diagram. Use it as a reference. As we walk through each piece in the sections that follow, this map will make more sense. By the time we reach the final section, every cluster will be familiar.

*The interactive version lets you click any component to highlight its connections, zoom in, and pan around.*

### Reading the diagram

- Arrow direction = dependency direction
- Cluster = a group of related components
- Click "Explore full diagram" to zoom & pan
- Click any node to highlight its connections

---

## Presentation Slides

### Slide 1: The architecture map (diagram)
- Full-screen diagram
- "Thirteen clusters. We'll walk through each one."
- Let the audience look first

### Slide 2: Three concentric rings (icon-grid)
- **The kernel (center)** — Small, unchanging. Coordinator, events, loading, sessions.
- **Modules (middle ring)** — Pluggable behavior: orchestrator, providers, tools, context, hooks.
- **Ecosystem (outer ring)** — Foundation, bundles, apps, community extensions.

---

## Speaker Notes

### Slide 1
Put the full diagram on screen and pause. Let the audience absorb it for several seconds before speaking. Then: "This is the architecture of Amplifier. Thirteen clusters. Right now it probably looks dense. That's fine. We're going to walk through every single piece. By the end of this talk, every node on this diagram will be familiar."

### Slide 2
Three concentric rings. The kernel at the center, Foundation in the middle, applications on the outside. Here's the critical rule: outer layers depend on inner layers, never the reverse. The kernel knows nothing about Foundation. Foundation knows nothing about your specific application. Which means you can replace any outer layer without touching the inner ones. That's not an accident; it's the most important structural decision in the system.
