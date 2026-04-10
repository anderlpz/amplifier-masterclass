---
title: "Design Philosophy"
chapter: 3
blocks:
  - type: prose
  - type: diagram
    id: mechanism-vs-policy-flow
    width: wide
    placement: after-hook-example
    rationale: "The tool:pre event flow (kernel fires, hooks decide) is the clearest illustration of mechanism vs policy"
  - type: audio
    status: stub
---

# Section 3: Design Philosophy

## Three ideas shape how Amplifier is built.

They weren't written on a whiteboard first. They emerged from the code, from decisions made repeatedly about what belongs in the kernel and what doesn't.

## Mechanism, not policy

The kernel fires a `tool:pre` event before every tool call. A safety module decides whether to block it. A logging module records it. The kernel has no opinion about what should happen. It fires events and collects results. This separation has a name: mechanism versus policy.

This principle comes from operating system design. The Linux kernel provides process scheduling and memory management without deciding how programs use those mechanisms. Amplifier does the same: the kernel provides module loading, event dispatch, and session lifecycle. It never decides which modules matter, which events to act on, or what should happen during a session.

The consequence is that when rules change (new safety requirements, new compliance needs) you change modules. The kernel stays the same.

## The center stays still

A new AI model ships. Someone writes a provider module. The kernel does not know or care which model it talks to. New tools, new paradigms, new safety requirements: all handled at the edges. The center does not move.

None of this touches the kernel. A new model arrives; someone writes a provider module that connects to its API and translates between Amplifier's format and the model's format. Same interface every other provider uses. The kernel doesn't know or care whether it's talking to Claude, GPT, Gemini, or a model that doesn't exist yet.

## Ruthless simplicity

Search the entire `amplifier-core` codebase for file-writing operations: zero matches. The kernel does not write logs, save transcripts, or persist configuration. If something can live in a module, it must.

Every line in the kernel is a line that every module depends on. Every line is a potential constraint on the future. So the kernel is aggressive about exclusion. A logging hook writes logs. A persistence module saves conversations. A configuration layer reads settings. Each one is a module.

## Why mechanism over policy matters in practice

Consider what happens when you deploy an AI agent in a setting where certain operations need human approval. In a system without this separation, you would modify the tool-calling code itself: add an if-statement, check a config flag, pop up a dialog. The approval logic is now woven into the execution logic. Every future tool must remember to include the approval check. Miss one, and the policy has a hole.

In Amplifier, the kernel fires a `tool:pre` event before every tool call. A hook module registers for that event. When it sees a tool call that requires approval, it returns `ask_user`. The kernel pauses execution and waits for a human decision. The tool itself has no knowledge that approval was required. The hook module can be swapped, updated, or removed without touching any tool code. The policy lives in a module; the mechanism lives in the kernel.

This pattern repeats at every level. Logging is a hook, not a kernel feature. Context injection is a hook response, not an API call. Safety rules are hook policies, not built-in constraints. Each policy can be independently developed, tested, and replaced.

---

## Presentation Slides

### Slide 1: Three ideas shaped the architecture (icon-grid)
- **Mechanism, not policy** — The kernel provides capabilities. Modules decide how to use them.
- **The center stays still** — New models, new paradigms: none of it touches the kernel.
- **Ruthless simplicity** — Every line in the kernel is a future constraint. Keep it small.

### Slide 2: "Mechanism, not policy." (statement)
The kernel provides the hook system. It never decides what gets blocked.

### Slide 3: The hook example (hflow)
1. A tool is about to be called
2. The kernel fires a `tool:pre` event — *kernel*
3. Registered Hook Handlers run — *mechanism*
4. Safety hook blocks it. Logger observes it. Approval hook pauses it. — *policy*
5. Kernel collects results. Done. — *kernel*

### Slide 4: "The center stays still so the edges can move at any speed." (statement)
New AI model? Write a provider module. The kernel does not change.

### Slide 5: 0 (big number)
bytes written to disk by the kernel
not logs, not transcripts, not config

### Slide 6: "The kernel is boring. That boringness is the point." (statement)
Mechanism-not-policy + still center + ruthless simplicity = a core that never needs to change.

---

## Speaker Notes

### Slide 1
Before we dive into components, let's talk about the ideas that shaped them. These aren't aspirational principles on a wiki page somewhere. These are patterns you can see in the actual code. We looked at what the system does, then named the principle behind it.

### Slide 2
This is the single most important idea in the architecture. The kernel provides mechanism: it gives you the ability to do something. Modules provide policy; they decide what to actually do. Think of a traffic light system. The light hardware is the mechanism: it can show red, yellow, green. The city configures the timing: that's the policy. You can change the timing without rewiring the lights. That separation is everywhere in Amplifier.

### Slide 3
Walk through each step on screen. The kernel fires an event: say, tool_call_requested. It collects results from every registered hook. But it never decides what those results mean. Should this tool call be allowed? Denied? Modified? The kernel doesn't care. That decision belongs entirely to whoever registered hooks for that event. The kernel provides the mechanism of firing and collecting. The hooks provide the policy of what to do about it.

### Slide 4
The center stays still so the edges can move at any speed. When a new model drops: say, Claude 4 ships tomorrow. Amplifier needs exactly one thing: a new provider module. That's it. The kernel doesn't know the new model exists. It doesn't need to. It just knows there's something in the provider slot, and it calls the same interface it always has.

### Slide 5
Let this number land. Zero. You can grep the entire kernel codebase for file writes and find nothing. No logs, no persistence, no side effects. And that's intentional. Every line of code in the kernel is a dependency for every module in the system. The smaller you keep it, the more freedom modules have to evolve independently. This isn't minimalism for aesthetics. It's ruthless simplicity as an engineering strategy.

### Slide 6
The kernel is boring. And I mean that as the highest compliment. All the interesting behavior: the agent loops, the safety rules, the tool execution: lives in modules. The kernel is the stable foundation that makes all of that possible. Transition: Now that we know why the kernel is shaped this way, let's look at what's actually inside it.
