# Section 6: The Orchestrator and the Agent Loop

The Orchestrator isn't just another module with a leadership role. It occupies a fundamentally different position in the system.

## The privilege gap

Every module receives the Coordinator once, at mount time. The module uses it to register itself, maybe look up other modules, and then that reference is gone. From that point on, the module works without direct access to the full registry.

The Orchestrator receives the Coordinator again at runtime, every time it's called. When `execute` fires with a user's message, the kernel passes the Coordinator along. The Orchestrator can reach into the registry at any point during execution: the Context Manager, every Provider, every Tool, every Hook Handler.

No other module has this access. A Provider can't check which Tools exist. A Tool can't look up which Provider is active. Only the Orchestrator sees the full system at runtime.

This concentration is intentional. Think about what an agent does during a turn: gather context, choose a model, decide whether to use tools, handle results, determine when to stop. Every one of those steps crosses module boundaries. One module needs the access to do it, and that module is the Orchestrator.

The cost is proportional. A bug in the Orchestrator's context management affects every conversation. A mistake in tool handling breaks every tool. The most privileged position carries the most risk.

## What happens during one turn

You send a message. The session passes it to the Orchestrator.

The Orchestrator calls the Context Manager for conversation history: what you've said, what the agent has said, what tools have been used.

Events fire. Hooks can inject additional context before the AI sees anything. "Remember: this user prefers concise answers" or "The linter found errors in the last file you wrote." The AI reads this injected context as part of the conversation, unaware a hook placed it there.

The Orchestrator calls a Provider, which sends the assembled context to the AI model.

The model responds. Maybe a direct answer. Maybe a tool call: "I want to use `read_file` with path `/src/main.py`." If a tool call: an event fires before execution. Hooks can observe, modify, or block. A safety hook might deny a dangerous operation. An approval hook might pause for a human decision. If nothing blocks, the tool executes.

After the tool runs, another event fires. Hooks observe the result. A linter hook might inject "Found 3 errors in lines 12, 15, and 22." The AI reads this on its next iteration and can fix the issues.

The Orchestrator decides: is the model done, or does it want another action? If another action, the cycle repeats. If satisfied, the final response returns.

That response is a plain text string. Token usage, tool call history, thinking blocks (all the rich data generated during the turn) exit through hook events, not through the return value. The string return keeps the Orchestrator contract simple. Logging hooks, monitoring hooks, and analytics hooks capture the rich data by subscribing to events. The Orchestrator doesn't need to know any of them exist.

## The loop lives outside the kernel

The kernel defines the Orchestrator contract: receive a prompt, return a string. That's the entire specification. The kernel has zero opinions about what happens between those two points. No knowledge of loops, tool calls, retries, or conversation strategies.

The agent loop (think, act, observe, repeat) lives in an Orchestrator module called `loop-basic`. A different Orchestrator could implement parallel provider calls, tree-of-thought reasoning, task decomposition, or multi-model debate. The kernel wouldn't know the difference.

---

## Presentation Slides

### Slide 1: The privilege gap
- Every module gets the Coordinator once, at mount time
- The Orchestrator gets it again at runtime, every call
- Live access to every module: context, providers, tools, hooks
- No other module can reach across the registry at runtime

### Slide 2: One turn of conversation
- Message → Orchestrator → Context Manager (history)
- Events fire → hooks can inject context (invisible to AI)
- Orchestrator → Provider → AI model thinks
- Tool call? → hooks check (allow/block) → tool runs → hooks inject feedback
- Done? → final response as string

### Slide 3: Hooks in the loop
- Before tool: hooks observe, modify, or block
  - Safety: "Trying to delete system files. Denied."
  - Approval: "Sensitive operation. Ask the user."
- After tool: hooks inject feedback
  - Linter: "3 errors in lines 12, 15, 22."
- AI reads injected context on next turn; never knows hooks were involved

### Slide 4: String return boundary
- Orchestrator returns a plain string
- Rich data (token usage, tool history) exits through hook events
- Keeps the contract simple; keeps the system loosely coupled
- Any number of logging/monitoring hooks without Orchestrator changes

### Slide 5: The loop is external
- Kernel defines: "receive prompt, return string"
- No knowledge of loops, tool calls, retries, strategies
- `loop-basic` is a module that implements think → act → observe → repeat
- Different Orchestrator = different agent behavior. Kernel unchanged.

---

## Speaker Notes

### Slide 1
The critical point: the Orchestrator is not like other modules. Take a moment to explain the practical consequence. A Provider can't see Tools. A Tool can't see the Context Manager. Only the Orchestrator can reach everything. A bug here affects everything.

### Slide 2
Walk through as a flow, not steps. "You type something. It goes to the Orchestrator. It asks the Context Manager for history. Events fire; hooks might inject context. Then the Provider sends everything to the model..."

### Slide 3
Bridge to Section 7. The AI doesn't know hooks are acting. A blocked tool call shows up as "denied." Injected linter output shows up as a message the AI reads naturally. By design.

### Slide 4
Why not return a rich object? Because coupling. The string return means the Orchestrator is loosely coupled to every consumer. Analogy: "The string is the public response. Hook events are telemetry. Add instruments without changing the engine."

### Slide 5
Payoff for the design philosophy. The kernel provides the contract. The module provides the behavior. `loop-basic` is the default, but you could write anything. Kernel doesn't change.
