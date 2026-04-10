---
title: "Tools vs Hooks"
chapter: 7
blocks:
  - type: prose
  - type: diagram
    id: tools-vs-hooks-comparison
    width: wide
    placement: after-intro
    rationale: "Side-by-side comparison showing the fundamental difference: AI-visible vs AI-invisible"
  - type: diagram
    id: inject-context-flow
    width: wide
    placement: after-code-quality-example
    rationale: "The inject_context flow: event fires, hook processes, context injected, AI reads next turn"
  - type: diagram
    id: priority-cascade
    width: reading
    placement: after-cascade-description
    rationale: "The 5-level priority cascade as a vertical waterfall with color-coded levels"
  - type: vignette
    id: hook-cascade-animation
    width: wide
    placement: after-cascade-diagram
    status: stub
    rationale: "Animating the cascade with events flowing through deny/askuser/inject/modify/continue would show how results resolve dynamically"
  - type: chat
    placement: end-of-chapter
    status: stub
    prompt: "Not sure whether something should be a tool or a hook? Ask here."
  - type: audio
    status: stub
---

# Section 7: Tools vs Hooks

## Tools are capabilities the AI controls. Hooks control the AI without it knowing.

Both are modules. Both plug in the same way. But they operate in fundamentally different realms, and using the wrong one for a task produces unreliable behavior.

## Tools: the AI decides

A Tool is an action: read a file, search the web, run a command. Available tools are listed in the AI's system prompt. The model sees each tool's name, description, and input schema. When it decides to take an action, it generates a tool call: "Use `read_file` with path `/src/main.py`."

The model *chooses*. It looks at the request, evaluates its options, and picks a tool intentionally. Tool calls appear in conversation history. Results appear in conversation history. Everything is visible, traceable, and explainable.

Tools extend what the model can do.

## Hooks: code decides

Hook Handlers respond to events in the system. When something happens, an event fires. Hook Handlers that have registered for that event run automatically. The AI model has *no idea* that hooks exist.

Hooks do not appear in the model's instructions. They are not listed in the system prompt. The model cannot see them, cannot call them, cannot choose to use them. Hooks operate entirely in the system layer.

Hooks can observe (logging, analytics), block (safety, compliance), modify (data transformation), or inject new context the AI reads on its next turn. In every case, the AI doesn't know a hook was involved.

Hooks govern what the model is allowed to do.

## The code quality problem

You want every file the AI writes to pass a code quality check. Two approaches:

**As a tool:** You give the AI a `run_code_checker` tool and tell it in its instructions to always run it after writing a file. The problem? The AI might forget. It might decide the check isn't needed this time. It might get sidetracked by the user's follow-up question. You're relying on the model's compliance with an instruction, which is probabilistic, not guaranteed.

**As a hook:** You register a Hook Handler for the `tool:post` event, which fires after any tool completes. When the event fires for a file-writing tool, the hook runs the code checker. If it finds issues, it injects a message: "The code checker found 3 issues on lines 12, 15, and 22." The AI reads this on its next turn and fixes the issues. The check happens every single time, regardless of what the model decides.

> **inject_context**: The most powerful hook action. A hook places a message into the conversation that the AI reads on its next turn, as if it were part of the natural flow. The hook doesn't interrupt the AI. It doesn't send a signal or raise a flag. It places information where the AI will naturally encounter it. The AI does what language models do: read text and respond to it.

## Priority cascade

When multiple hooks respond to one event, their results are resolved in this order, from highest authority to lowest:

**Deny**: highest priority. One deny blocks the entire operation. No further hooks execute. Fail-closed security posture. A single safety hook can override everything.

**AskUser**: pauses execution for a human decision. First one wins. You can't merge approval requests. For operations that aren't clearly dangerous but aren't clearly safe either.

**InjectContext**: accumulates. Multiple hooks can all inject messages into the same turn. All messages are merged and added to conversation history. A code checker hook can inject "3 syntax errors" while a style hook simultaneously injects "naming conventions violated." The AI sees both.

**Modify**: transforms data flowing through the event. Multiple modify hooks chain. Each sees the output of the previous. For data transformation pipelines: redact sensitive info, reformat output.

**Continue**: the default. No-op. "I've seen this event and I have nothing to add." If a hook doesn't care about an event, it returns continue. The event passes through unmodified.

## Events and dispatch

Amplifier defines 41 canonical events, organized by namespace. Each event name follows a consistent pattern: `namespace:action`. Session events are `session:start`, `session:end`. Tool events are `tool:pre` (before execution), `tool:post` (after execution). Provider events are `provider:request`, `provider:response`.

Events and hooks are the same system. There is no separate "event bus" and "hook registry." It's one unified dispatch mechanism (`HookRegistry.emit()`) that fires an event and collects responses from registered hooks.

When a hook handler throws an error, the error is swallowed. The pipeline continues. The error is logged, but it doesn't crash the system. The only hook action that stops an operation is an explicit `deny`. Every event also gets automatically stamped with the session ID, parent session ID, and a UTC timestamp.

---

## Presentation Slides

### Slide 1: Tools extend. Hooks govern.
- **Tools:** the AI decides. Visible in system prompt. Intentional, traceable.
- **Hooks:** code decides. Invisible to AI. Automatic, system-layer.
- Tools extend what the model can do. Hooks govern what the model may do.

### Slide 2: Tools are listed in the system prompt
- The AI sees them. The AI chooses them.
- Every tool call is visible in the conversation history
- Intentional. Traceable. Explainable.

### Slide 3: The AI has no concept hooks exist
- They are not in its instructions
- Hooks fire on system events
- They observe, block, modify, or inject context—all without the model's awareness
- Think fire safety in a building: smoke detectors, sprinklers, alarm systems monitor constantly. The occupants don't interact with these systems. Hooks are that fire safety system.

### Slide 4: The code quality problem
- As a tool: "Always run the code checker." AI might forget. Probabilistic.
- As a hook: Register for `tool:post`. Runs automatically. Inject errors. AI sees them next turn.
- Reliability: structural, not probabilistic.

### Slide 5: Priority cascade
- **Deny**: highest. One deny blocks all. Fail-closed security.
- **AskUser**: pauses for human. First one wins.
- **InjectContext**: accumulates. All messages get through.
- **Modify**: chains. Each sees previous output.
- **Continue**: default no-op.

### Slide 6: 41 canonical events
- 41 events, `namespace:action` format
- One mechanism: `HookRegistry.emit()`
- Kernel emits lifecycle only; Orchestrator emits operational events

### Slide 7: Hook errors are non-fatal
- Only an explicit deny stops an operation
- A crashed logging hook does not stop the tool call
- Every event is auto-stamped: session ID, parent ID, UTC timestamp

---

## Speaker Notes

### Slide 1
The framing slide. Make sure the audience has it: tools are AI-visible, hooks are AI-invisible. Both are modules, both configured the same way, but they operate in fundamentally different realms.

### Slide 2
Tools appear in the system prompt. The AI sees them, reasons about them, and decides when to use them. It's like handing someone a toolbox: they can see what's inside and choose the right tool for the job.

### Slide 3
The fire safety analogy makes this concrete. People go about their day: working, talking, getting coffee. Meanwhile, smoke detectors, sprinklers, and alarm systems monitor constantly. The people don't interact with these systems. They don't know when a sensor checks the air. Hooks are that fire safety system. Always watching, ready to act, completely invisible to the occupants.

### Slide 4
The clearest illustration. Walk through both. "AI models are probabilistic. They might forget. Not good enough for policy you want enforced every time." Then: "As a hook, it runs automatically. The AI doesn't know. If there are errors, the AI sees a message and fixes them." If the audience gets this example, they get tools vs hooks.

### Slide 5
Deny is first for a reason. "Doesn't matter if ten hooks say allow. One deny stops it." Circuit breaker analogy. AskUser is for the gray zone. InjectContext is where hooks collaborate rather than compete. Modify is a pipeline: each transformation feeds the next. Continue is the common case.

### Slide 6
Two key points. First: events and hooks are one system, not two. Second: the kernel only emits lifecycle events; operational events come from the Orchestrator module. Different Orchestrator, different events.

### Slide 7
Hook errors are non-fatal. If a hook throws an exception, the core operation continues. The agent's conversation should not crash because a logging observer had a bug. An error in a hook is not a deny; it's a malfunction in the observer, and it gets logged and skipped.
