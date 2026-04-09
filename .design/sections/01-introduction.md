# Section 1: Introduction

Amplifier is a framework for building AI agents.

That sentence is deliberately plain. The thing it describes is not. An AI agent (a program that reasons about a task, takes actions, observes results, and decides what to do next) is hard to build well. The model (Claude, GPT, Gemini, whatever ships next month) handles reasoning. Everything else, from tools and memory to rules and connections to the outside world, needs structure. Amplifier provides that structure.

The project calls itself an *agentic harness*. The word harness is precise. A climbing harness channels gravity into controlled movement. An electrical harness routes power where it needs to go. Amplifier does the same for an AI model: it wraps around the model and gives it a controlled way to interact with the world.

## The operating system parallel

You already know how this works, because you've used a computer. Your operating system has a kernel, tiny relative to everything else. The kernel handles fundamentals: memory management, task scheduling, hardware communication. The web browser, the file manager, every app runs on top of the kernel through well-defined interfaces.

Amplifier applies this same architecture to AI agents. A small, unchanging core at the center handles fundamentals: loading modules, dispatching events, managing sessions. Everything else (which AI model to use, what tools the agent can access, how conversations are stored, what rules the agent follows) plugs in as a module from the outside.

New AI model? Write a provider module. Safety rules? Add a hook module. Different reasoning strategy? Swap the orchestrator. The kernel stays unchanged. It provides infrastructure; modules provide behavior.

## Reading this document

This walkthrough covers the full architecture front-to-back. It starts with a map of the system, then works through each major piece. Sections build on each other, but each one also stands alone. Jump to hooks if that's what you need.

The architecture diagram in the next section is a reference map. You'll return to it.

---

## Presentation Slides

### Slide 1: Title
**Amplifier**
A framework for building AI agents with predictable structure.

### Slide 2: What's an agentic harness?
- An AI model handles reasoning: deciding what to do
- Everything around the model needs structure: tools, memory, rules, connections
- A harness channels raw power into controlled direction
- Amplifier is that harness

### Slide 3: The operating system parallel
- Your OS has a kernel, tiny, unchanging, handling the fundamentals
- Everything else plugs in through interfaces
- Amplifier applies this to AI agents
- Small kernel at the center. Modules around it. Swap anything.

### Slide 4: What this walkthrough covers
- Architecture map: the whole system at a glance
- Design philosophy: why it's shaped this way
- The kernel: what's inside the center
- Modules, tools, hooks, sessions, bundles, each piece in depth
- The complete picture: how everything connects

---

## Speaker Notes

### Slide 1
Title slide. Keep it simple. "Amplifier is an agentic harness." If someone asks what that means, the next slide answers it.

### Slide 2
The key point is that the AI model is only one piece. A model can reason, but it needs infrastructure around it: tools, memory, rules. That's what a harness provides. The word "harness" implies control and direction, not restriction.

### Slide 3
This parallel is the conceptual foundation for everything. Make sure the audience understands what a kernel does. The kernel is tiny (maybe a few percent of the whole) but it's the part that never changes. Everything else can be swapped. That's how Amplifier works: the kernel stays still, modules move around it.

### Slide 4
Roadmap slide. Don't linger. The architecture diagram in the next section is a reference the audience will return to.
