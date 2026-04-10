---
title: "The Orchestrator"
chapter: 6
blocks:
  - type: prose
  - type: diagram
    id: reasoning-loop
    width: wide
    placement: after-privilege-gap
    rationale: "The THINK-ACT-OBSERVE-DECIDE cycle as a loop diagram with the Orchestrator at center"
  - type: scrollytelling
    id: one-turn-of-conversation
    width: full
    placement: after-flow-description
    rationale: "The 7-step message flow is the best scrollytelling candidate: a sticky diagram with each step highlighting as text cards scroll past"
  - type: vignette
    id: orchestrator-loop-explainer
    width: wide
    placement: after-diagram
    status: stub
    rationale: "The 4-phase cycle is hard to grasp from text alone. Animation of the loop with each phase lighting up and data flowing would teach faster"
  - type: chat
    placement: end-of-chapter
    status: stub
    prompt: "Have a question about how the orchestrator drives the agent loop?"
  - type: audio
    status: stub
---

# Section 6: The Orchestrator

One module gets live access to the full system at runtime. Every other module is isolated after setup.

## One module gets live access to the full system at runtime. Every other module is isolated after setup.

Every other module is isolated after mount. The Orchestrator gets the Coordinator at runtime, on every call. That privilege gap defines how the entire agent loop works.

## The privilege gap

Every module in Amplifier receives the Coordinator (the registry where modules are stored) once: at mount time. The module uses it to register itself, and then the Coordinator reference is gone.

The Orchestrator is the exception. It receives the Coordinator again, at runtime, *every time it's called.* This means the Orchestrator can, at any moment during execution, reach into the registry and access any module: the Context Manager, every Provider, every Tool, every Hook Handler.

No other module can do this. A Provider can't look up which Tools are available. A Tool can't check which Provider is being used. Only the Orchestrator has a live connection to the full system at runtime. This is by design, not by accident.

## One common pattern: what happens when you send a message

This shows one commonly used orchestrator. Different orchestrators can implement completely different strategies.

1. **You send a message.** The session receives it and hands it to the Orchestrator.

2. **Hooks fire; context monitoring begins.** A context monitor hook might notice the conversation involves database queries and inject the relevant schema documentation.

3. **Orchestrator fetches context.** Calls the Context Manager to get conversation history (what's been said, what tools have been used).

4. **Provider calls the AI model.** The Orchestrator calls a Provider. The Provider sends the assembled context to the AI model and waits for a response.

5. **If the AI wants a tool, hooks check first.** Before the tool executes, an event fires. Hook Handlers can observe, modify, or block the call. A safety hook might say "that tool call is trying to delete system files. Denied." If no hook blocks the call, the tool executes.

6. **After the tool runs, hooks inject feedback.** A code quality hook might run after a file-writing tool, find issues, and inject "The code checker found 3 issues in lines 12, 15, and 22." The AI reads this on its next iteration.

7. **The Orchestrator returns the response.** Rich data (token usage, tool history) flows through the event system for any hooks that want to observe it.

## The loop lives outside the kernel

The agent loop (the "think, act, observe, repeat" cycle) is not in the kernel. It lives in an Orchestrator module. A different Orchestrator module could implement a completely different strategy: parallel provider calls, multi-step planning, debate between models. The kernel would not change.

---

## Presentation Slides

### Slide 1: The privilege gap
- Every module gets the Coordinator once, at mount time
- The Orchestrator gets it again at runtime, every call
- Live access to every module: context, providers, tools, hooks
- No other module can reach across the registry at runtime

### Slide 2: One turn of conversation
- Message → Session passes it to the Orchestrator
- Hooks fire → context monitoring begins (e.g. inject DB schema)
- Orchestrator → Context Manager (history)
- Orchestrator → Provider → AI model thinks
- Tool call? → hooks check (allow/block) → tool runs → hooks inject feedback
- Done? → Orchestrator returns a plain string response

### Slide 3: Hooks intercept at two points
- Before a tool runs, and after
- Before: observe, block, or modify
- After: inject feedback
- The AI reads injected context as if it were part of the natural conversation

### Slide 4: Plain string / rich data
- The Orchestrator returns a plain string
- Rich data (token usage, tool history, thinking blocks) exits through hook events
- The string is the public response; hook events are the telemetry
- Add instruments without changing the engine

### Slide 5: The loop is external
- Kernel defines: "receive prompt, return string"
- No knowledge of loops, tool calls, retries, strategies
- The default orchestrator implements think → act → observe → repeat
- Different Orchestrator = different agent behavior. Kernel unchanged.

---

## Speaker Notes

### Slide 1
The critical point: the Orchestrator is not like other modules. Take a moment to explain the practical consequence. A Provider can't see Tools. A Tool can't see the Context Manager. Only the Orchestrator can reach everything. A bug here affects everything.

### Slide 2
Walk through as a flow, not numbered steps. Emphasize the qualifier: "This shows one commonly used orchestrator. Different orchestrators can implement completely different strategies." The database query example in step 2 makes hook context injection concrete.

### Slide 3
Bridge to Section 7. The AI doesn't know hooks are acting. A blocked tool call shows up as "denied." Injected code quality output shows up as a message the AI reads naturally. Hooks intercept at two points: before a tool runs, and after. By design.

### Slide 4
Why not return a rich object? Because coupling. The string return means the Orchestrator is loosely coupled to every consumer. Analogy: "The string is the public response. Hook events are telemetry. Add instruments without changing the engine."

### Slide 5
Payoff for the design philosophy. The kernel provides the contract. The module provides the behavior. The default orchestrator is one option, but you could write anything. Kernel doesn't change.
