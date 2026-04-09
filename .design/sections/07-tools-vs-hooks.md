# Section 7: Tools vs Hooks

Tools are capabilities the AI controls. Hooks are capabilities that control the AI without it knowing. That distinction is the most important design decision in Amplifier.

## Tools: the AI is in charge

A Tool is an action: read a file, search the web, run a command. Available tools are listed in the AI's system prompt. The model sees each tool's name, description, and input schema. When it decides to take an action, it generates a tool call: "Use `read_file` with path `/src/main.py`."

The model *chooses*. It looks at the request, evaluates its options, and picks a tool intentionally. Tool calls appear in conversation history. Results appear in conversation history. Visible, traceable, explainable.

Tools extend what the model can do.

## Hooks: code is in charge

A Hook Handler registers for system events. When something happens (tool about to execute, message being sent, session starting) an event fires. Registered hooks run automatically.

The AI has no idea hooks exist. They don't appear in the system prompt. The model can't see them, can't call them, can't choose them. Hooks operate in the system layer, triggered by lifecycle events, executing code the model never learns about.

Hooks can observe (logging, analytics), block (safety, compliance), modify (data transformation), or inject new context the AI reads on its next turn. In every case, the AI doesn't know a hook was involved.

Hooks govern what the model is allowed to do.

## The linter problem

You want every file the AI writes to be linted. Two approaches:

**Tool approach:** Give the AI a `run_linter` tool. Tell it in its instructions: "After writing a file, always run the linter." Problem: the model might forget. It might decide linting isn't needed this time. It might get sidetracked. You're depending on probabilistic instruction-following.

**Hook approach:** Register for the `tool:post` event on file writes. The hook runs the linter automatically. If errors are found, it injects: "The linter found 3 errors on lines 12, 15, and 22." The AI reads this on its next turn and fixes the issues. The linting happens every time, no matter what the model decides.

Tools extend. Hooks enforce. Using the wrong one for a given task produces unreliable behavior.

## inject_context: how hooks talk to the AI

The most powerful hook action is `inject_context`. A hook places a message into the conversation that the AI reads on its next turn, as if it were part of the natural flow.

The sequence: event fires → hook processes (runs linter, checks policy, validates format) → hook returns `inject_context` with a data payload → the Coordinator calls `context.add_message()` → on the AI's next turn, the message appears in conversation history.

The AI doesn't see a "hook notification." It sees a message. It reads it and responds naturally. If the message says "Linter found errors on lines 12, 15, 22," the AI fixes them. If it says "The user asked for Python 3.10 compatibility," the AI adjusts. The hook leverages what language models already do (read text, respond to text) by placing the right text at the right time.

## Priority cascade

When multiple hooks respond to one event, the system resolves conflicts through a fixed ordering, implemented in the Rust core:

**Deny**: highest priority. One deny blocks the operation immediately. No further hooks execute. This is fail-closed security: a single safety hook overrides everything else. Ten hooks say "allow"; one deny stops it. Remaining hooks don't even run.

**AskUser**: pauses for a human decision. First request wins (you can't merge multiple approval prompts into one). For operations that aren't clearly dangerous but aren't clearly safe.

**InjectContext**: accumulates. If three hooks each inject a message, all three are merged (separated by double newlines) and added to the conversation. Hooks don't compete for the AI's attention; they share it. A linter injects "3 syntax errors" while a style hook injects "naming conventions violated." The AI sees both.

**Modify**: chains. Each hook transforms the data; the next hook sees the modified version. Useful for data pipelines: redact sensitive information, then reformat output.

**Continue**: the default no-op. "Seen it, nothing to add."

## Events and dispatch

Amplifier defines 41 canonical events, all following `namespace:action` naming. `session:start`, `tool:pre`, `tool:post`, `provider:request`, `provider:response`, and so on across session, tool, provider, prompt, context, orchestrator, and agent namespaces.

Events and hooks share one dispatch mechanism: `HookRegistry.emit()`. No separate event bus, no separate hook registry.

The kernel emits only lifecycle events (session start/end). All operational events (tool calls, provider requests, prompt preparation) come from the Orchestrator module. A different Orchestrator could emit different events.

Hook errors are swallowed. Logged, but non-fatal. A crashed logging hook doesn't stop the tool call. The only way a hook stops an operation is an explicit `deny`. Every event gets auto-stamped with `session_id`, `parent_id`, and UTC `timestamp` by the Rust runtime before hooks see it.

---

## Presentation Slides

### Slide 1: Two capabilities, two models
- **Tools:** the AI decides. Visible in system prompt. Intentional, traceable.
- **Hooks:** code decides. Invisible to AI. Automatic, system-layer.
- Tools extend. Hooks govern.

### Slide 2: The linter problem
- As a tool: "Always run the linter." AI might forget. Probabilistic.
- As a hook: Register for `tool:post`. Runs automatically. Inject errors. AI sees them next turn.
- Reliability: structural, not probabilistic.

### Slide 3: inject_context
- Hook returns a message → added to conversation → AI reads it next turn
- AI sees a message in the conversation. Doesn't know a hook put it there.
- Works with the model's natural behavior: read text, respond to text.

### Slide 4: Priority cascade (Deny and AskUser)
- **Deny**: highest. One deny blocks all. Fail-closed security.
- **AskUser**: pauses for human. First one wins.

### Slide 5: Priority cascade (InjectContext, Modify, Continue)
- **InjectContext**: accumulates. All messages get through.
- **Modify**: chains. Each sees previous output.
- **Continue**: default no-op.

### Slide 6: Events and dispatch
- 41 events, `namespace:action` format
- One mechanism: `HookRegistry.emit()`
- Kernel emits lifecycle only; Orchestrator emits operational events
- Hook errors are non-fatal. Only deny stops operations.

---

## Speaker Notes

### Slide 1
The framing slide. Make sure the audience has it: tools are AI-visible, hooks are AI-invisible. Both are modules, both configured the same way, but they operate in fundamentally different realms.

### Slide 2
The clearest illustration. Walk through both. "AI models are probabilistic. They might forget. Not good enough for policy you want enforced every time." Then: "As a hook, it runs automatically. The AI doesn't know. If there are errors, the AI sees a message and fixes them." If the audience gets this example, they get tools vs hooks.

### Slide 3
Walk the data flow: event → hook processes → `inject_context` → message added → AI reads next turn. The power: the AI doesn't see a notification. It sees a message. It responds naturally. The hook placed the right text at the right time.

### Slide 4
Deny is first for a reason. "Doesn't matter if ten hooks say allow. One deny stops it." Circuit breaker analogy. AskUser is for the gray zone: not clearly dangerous, not clearly safe.

### Slide 5
InjectContext is where hooks collaborate rather than compete. Multiple hooks can all inject, and all get through. Modify is a pipeline: each transformation feeds the next. Continue is the common case; most hooks most of the time.

### Slide 6
Two key points. First: events and hooks are one system, not two. Second: the kernel only emits lifecycle events; operational events come from the Orchestrator module. Different Orchestrator, different events.
