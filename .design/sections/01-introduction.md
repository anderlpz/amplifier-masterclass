---
title: "Introduction"
chapter: 1
blocks:
  - type: prose
  - type: audio
    status: stub
---

# Section 1: Introduction

Amplifier is a framework for building your AI harness.

That sentence is deliberately simple, because the idea it describes is not. A harness, in the traditional sense, takes raw power and gives it direction. A climbing harness lets you use gravity safely. An electrical harness routes power to the right places. An AI harness does the same for a model: it wraps around the model and provides a controlled way to interact with the world. Some harnesses built with Amplifier are conversational AI agents: programs that can reason about a task, take actions, observe the results, and decide what to do next. Others are pipeline runners with zero AI loops. The framework does not prescribe what you build.

AI models are powerful, but raw power without structure is unpredictable. The model itself handles reasoning. Everything around the model (what tools it can use, what it remembers, what rules it follows, how it talks to the outside world) needs structure. Amplifier provides that structure. Think of it as a construction kit: it gives you the pieces, and you assemble the harness that fits your use case.

### The design borrows from operating systems.

If you've used a computer, you've used an operating system. An operating system has a kernel at its center. The kernel is tiny relative to the whole system. It handles the most fundamental things: managing memory, scheduling tasks, letting programs talk to hardware. Everything else (the web browser, the file manager, the apps) runs on top of the kernel, plugging into it through well-defined interfaces.

Amplifier borrows this structure. At the center is a small core called `amplifier-core`. It handles module loading, event dispatch, and session lifecycle. Which AI model to use, what tools the agent can access, how conversations are stored, what rules the agent follows: each of those is a module that plugs in from the outside.

A new AI model comes out? Write a new provider module. Need the agent to follow safety rules? Add a hook module. The core does not change. It provides the infrastructure; the modules provide the behavior.

### What this document covers

- Architecture map
- Design philosophy
- The kernel (5 components)
- Module system (6 types)
- Tools vs Hooks
- Sessions & bundles
- The complete picture

---

## Presentation Slides

### Slide 1: Title
**Amplifier**
A framework for building your AI harness with predictable structure.

### Slide 2: What does an agent need? (compare-grid)
Two columns:

**The Model** — handles the reasoning
- Decides what to do next
- Generates responses
- Interprets tool results

**The Harness** — handles everything else
- What tools can it use?
- What does it remember?
- What rules does it follow?

### Slide 3: The operating system analogy (compare-grid)
Two columns:

**An OS kernel** — the unchanging center
- Tiny relative to the whole
- Everything plugs in through interfaces
- Swap apps without touching it

**Amplifier kernel** — same structure, for AI agents
- Small, unchanging core
- Modules plug in around it
- Swap any piece, center stays still

### Slide 4: What we will cover (icon-grid)
- Architecture map — The whole system at a glance
- Design philosophy — Why it is shaped this way
- The kernel — Five components, nothing more
- Modules, tools, hooks — How capability is added
- The complete picture — Six layers, one ecosystem

---

## Speaker Notes

### Slide 1
Let this slide breathe. The subtitle says it all: a framework for building your AI harness with predictable structure. That word, "predictable," is doing a lot of work. We're going to unpack what it means over the next hour.

### Slide 2
Everyone focuses on the model. Which model, how many parameters, what's the benchmark score. But the model is only one piece. You also need tool execution, memory, safety enforcement, session management, observability. All of that infrastructure needs structure. And that structure is what Amplifier provides.

### Slide 3
This analogy is the conceptual anchor for the rest of the talk. Think of it like an operating system. There's a tiny, stable kernel at the center. Everything else: your tools, your providers, your safety rules: plugs in as modules. The kernel doesn't do much by itself, and that's the point. It provides the infrastructure for everything else to work.

### Slide 4
Move through briskly. Here's our path. We'll start with the full architecture diagram, then zoom into each piece: the kernel, the module system, the orchestrator, tools versus hooks, sessions, bundles, and Foundation. By the end, you'll be able to look at the architecture diagram and know exactly what every piece does.
