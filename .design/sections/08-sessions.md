# Section 8: Sessions

A session is one conversation: one agent interaction from start to cleanup. It's the container where kernel infrastructure, modules, the Orchestrator, tools, and hooks all come together.

## Four phases

**Creation** (`__init__`). Configuration goes in. Coordinator and Loader are created. Nothing loaded yet. The system has a plan but hasn't acted on it.

**Initialization** (`initialize`). Modules load in fixed order. Orchestrator and Context Manager must succeed or the session stops. Providers, Tools, Hooks are optional; failures get logged, session continues.

**Execution** (`execute`). A user message arrives, passes to the Orchestrator, and a response comes back. Repeatable. Each call is one turn. Between turns, state persists: Context Manager remembers what was said, hooks retain registrations, modules stay mounted.

**Cleanup**. A `session:end` event fires first. Hooks get a final chance to flush logs, record summaries, do last processing. Then Coordinator cleans up mounted modules. Then Loader cleans up. The last step runs in a `finally` block, so cleanup happens even if the session crashed.

## Parent-child sessions

A coding agent delegates a research task to a research agent. A planning agent hands individual items to specialized workers. Amplifier handles this through parent-child sessions.

The mechanism: set `parent_id` when creating the child session. That's the entire API. The child is a full, independent session with its own Coordinator, own modules, own configuration. No automatic inheritance. No shared memory. No shared modules. Linked by ID only.

This is deliberately minimal. Automatic inheritance creates hidden dependencies; changes to the parent's conversation would affect the child unpredictably. Explicit is better: pass what you need, share nothing by default. Each session is self-contained and predictable.

## File output comes from modules

When you see session files on disk (`transcript.jsonl`, `events.jsonl`, `metadata.json`) the kernel didn't write them. Hook modules did. Remove every hook, and the session still runs identically. No trace on disk, but the conversation works the same.

## Cancellation

Cancellation is cooperative, not preemptive. The kernel sets a flag with three states: none, graceful (finish current turn), immediate (stop at next safe point). The Orchestrator is responsible for checking. If it ignores the flag, cancellation doesn't happen.

---

## Presentation Slides

### Slide 1: Four phases
- Create → Initialize → Execute → Cleanup
- Orchestrator + Context required; rest optional
- Execute is repeatable; each call is one turn
- Cleanup always runs (finally block)

### Slide 2: Parent-child sessions
- Set `parent_id` when creating child. That's the entire API.
- No auto-inheritance, no shared modules, memory, or config
- Each session fully independent. Linked by ID only.
- Explicit > implicit: predictable behavior.

### Slide 3: File output is a module concern
- The kernel writes nothing to disk
- transcript.jsonl, events.jsonl, metadata.json: all from hook modules
- Remove hooks: session still runs, zero files on disk

---

## Speaker Notes

### Slide 1
Walk through phases in order. Key details: fixed loading order, required vs optional, cleanup guarantee. The `finally` block means sessions are always cleanly shut down even after crashes.

### Slide 2
Emphasize the minimalism. In many frameworks, spawning a child inherits configuration or state. Amplifier doesn't. If you want the child to behave like the parent, pass the same configuration. If someone asks "why not share automatically?" the answer is that hidden dependencies create unpredictable behavior.

### Slide 3
Callback to design philosophy. The kernel writes nothing. Session files are module behavior, not kernel behavior.
