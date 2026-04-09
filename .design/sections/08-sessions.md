# Section 8: Sessions

## A session is a container.

A session is the container around one instance of the system running. In the CLI, a session is a conversation. In a pipeline runner, a session is a single batch execution. In the kernel, a session is just an ID and a lifecycle.

## Four phases

A visual timeline of the session lifecycle:

| Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---------|---------|---------|---------|
| **Create** | **Initialize** | **Execute** | **Cleanup** |
| Session created with configuration. Coordinator and Module Loader are set up. Nothing has been loaded yet. The system knows what it needs, but hasn't started yet. | Module Loader loads modules in fixed order. If the Orchestrator or Context Manager fails to load, the session stops. Everything else is optional. | Session receives a message. Passes it to the Orchestrator. Gets a response back. This phase is repeatable. Each call is one turn of conversation. Between turns, all state is maintained. | `session:end` fires first (hooks get a final chance). Then Coordinator cleans up modules. Then Loader cleans up. In a `finally` block. Always runs, even after errors. |

> **Required**: Orchestrator + Context Manager must mount successfully during Initialize. If either fails, the session stops immediately.

## Parent and child sessions

| What you might expect | What Amplifier does |
|-----------------------|---------------------|
| Child inherits parent's context | Set `parent_id`. That is the only link. |
| Shared modules, shared memory | No shared modules, memory, or config |
| Changes in parent affect child | Each session fully self-contained |

The core provides a `parent_id` field that links one session to another. That is the extent of what the kernel does. How parent-child relationships are used (delegation, sub-agents, task decomposition) is decided by Foundation and applications built on top of it.

This is deliberately minimal. Automatic inheritance creates hidden dependencies; changes to the parent's conversation would affect the child unpredictably. Explicit is better: pass what you need, share nothing by default. Each session is self-contained and predictable.

## File output comes from modules

When you see session files on disk (`transcript.jsonl`, `events.jsonl`, `metadata.json`) the kernel didn't write them. Hook modules did. Remove every hook, and the session still runs identically. No trace on disk, but the conversation works the same.

## Cancellation

Cancellation is cooperative, not preemptive. The kernel can't forcibly stop an Orchestrator in the middle of its work. Instead, it sets a flag with three states:

1. **No cancellation requested** — normal operation continues.
2. **Graceful cancellation** — finish what you're doing, then stop.
3. **Immediate cancellation** — stop as soon as possible.

The Orchestrator must check this flag periodically. If it ignores the flag, cancellation doesn't happen.

---

## Presentation Slides

### Slide 1: Anatomy of a session
- One session = one container. All modules, all state, one lifetime.
- Create → Initialize → Execute → Cleanup
- Orchestrator + Context required; rest optional
- Execute is repeatable; each call is one turn
- Cleanup always runs (finally block)

### Slide 2: Inside each phase
- **Create**: Configuration in. Coordinator and Loader set up. Nothing loaded yet.
- **Initialize**: Fixed loading order. Orchestrator + Context required. Others optional.
- **Execute**: User sends a message. Orchestrator runs the loop. Response comes back. Repeatable.
- **Cleanup**: `session:end` fires. Modules clean up. Loader cleans up. Always runs (finally block).

### Slide 3: Parent-child sessions (compare grid)
- **What you might expect**: automatic inheritance — child inherits parent's context, shared modules and memory, changes in parent affect child
- **What Amplifier does**: explicit and independent — set `parent_id` (the only link), no shared modules/memory/config, each session fully self-contained

### Slide 4: The kernel writes nothing
- Session files come from hook modules
- `transcript.jsonl`, `events.jsonl`, `metadata.json`: all written by hooks, never by the kernel
- Remove hooks: session still runs, zero files on disk

---

## Speaker Notes

### Slide 1
Walk through as a flow. Key concept: a session means different things in different contexts (CLI conversation vs pipeline batch vs kernel ID+lifecycle). The kernel doesn't prescribe the meaning.

### Slide 2
Walk through phases in order. Key details: fixed loading order, required vs optional, cleanup guarantee. The `finally` block means sessions are always cleanly shut down even after crashes.

### Slide 3
Use the compare-grid framing. In many frameworks, spawning a child inherits configuration or state. Amplifier doesn't. If you want the child to behave like the parent, pass the same configuration. If someone asks "why not share automatically?" the answer is that hidden dependencies create unpredictable behavior.

### Slide 4
Callback to design philosophy. The kernel writes nothing. Session files are module behavior, not kernel behavior. This IS mechanism versus policy in action.
