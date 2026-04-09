# Section 4: The Kernel

The kernel (`amplifier-core`) contains exactly five things. Not approximately five. Not "five core concepts." Five concrete subsystems. Everything else exists outside it, in modules.

## 1. The Hook and Event system

When a message is sent, a tool is called, or a session starts, the system fires an event. There are 41 of these events, organized by category: session, tool, provider, prompt, context.

Hooks respond to events. A module registers a hook for a specific event; when that event fires, the hook runs. The kernel checks registrations, dispatches, and collects results.

Events and hooks are the same system: one dispatch mechanism, not two separate pieces. An event fires, hooks respond, results are collected. The implementation is in Rust, because event dispatch is the hottest path in the system. It runs on every tool call, every message, every session transition.

## 2. The Module Loader

The Loader discovers modules and gives each one a chance to mount. Discovery uses two primary channels: Python entry points (installed packages advertising they contain Amplifier modules) and filesystem scanning (directories following the `amplifier-module-*` naming convention). Additional channels exist for WebAssembly and remote gRPC modules, but the first two cover most cases.

When the Loader finds a module, it calls that module's `mount` function, the universal contract covered in the next section.

## 3. Contracts (Protocols)

Six module types, each defined as a Python Protocol. A Protocol specifies what methods a module must have. If a class has the right methods, it satisfies the Protocol. No base class required, no explicit registration. This is structural subtyping: the shape of the code determines its type.

The six contracts define the module ecosystem's shape. They're small (each specifying just a few methods), and they almost never change. When they do, every module of that type is affected, which is why stability matters here more than anywhere else.

## 4. The Coordinator

Misleading name. The Coordinator doesn't coordinate anything. It's a registry: a shelf with labeled slots. Slot for the orchestrator, slot for the context manager, slots for providers, tools, hooks. When a module mounts, it goes into the right slot. When something needs to find a module, it checks the Coordinator.

Three operations: `mount` (put a module in a slot), `get` (retrieve from a slot), `unmount` (remove from a slot). No decisions. No message routing. No behavior.

The actual coordination (deciding what to do, when, in what order) belongs to the Orchestrator, which is a module. Swappable. The kernel just holds pieces; the Orchestrator module decides how to use them.

Under the hood: a Rust struct exposed to Python through PyO3, part of a broader pattern where users see Python but performance-critical internals are compiled Rust.

## 5. Session Lifecycle

A session is one conversation. Four phases:

**Creation.** Configuration goes in. Coordinator and Loader are created. Nothing loaded yet.

**Initialization.** Modules load in fixed order: Orchestrator, Context Manager, Providers, Tools, Hooks. Orchestrator and Context Manager are required; failure to load either stops the session. The rest are optional (warn and continue).

**Execution.** A prompt arrives, passes to the Orchestrator, and a response comes back. This phase is repeatable. Each `execute` call is one conversation turn.

**Cleanup.** A `session:end` event fires (hooks get a final chance to process). Then Coordinator tears down modules. Then Loader cleans up. This last step runs in a `finally` block, so cleanup happens even if the session crashed.

## The Rust/Python boundary

Amplifier uses two languages by design. Python is the API surface: what module authors write, what configuration references, what methods you call. Rust is the kernel's runtime. Coordinator, HookRegistry, CancellationToken, Session are all Rust structs compiled to native code, exposed through PyO3. The Python files in `amplifier-core` are thin wrappers.

When you call `coordinator.get("provider")`, you're reaching into a compiled Rust data structure through a Python wrapper. Module authors never need to know Rust exists. But the performance characteristics (microseconds for event dispatch, compiled speed for module lookup) reflect it.

## Zero file I/O

The kernel writes nothing to disk. No log files. No transcripts. No checkpoints. Grep `amplifier-core` for file-writing operations: zero matches.

Logging happens through hook modules that subscribe to events. Persistence happens through context managers or hooks that save conversation history. Configuration loading happens in the Foundation layer, entirely outside the kernel.

Want different logging? Swap the hook module. The kernel doesn't change.

---

## Presentation Slides

### Slide 1: The kernel
- `amplifier-core`, the small, unchanging center
- In an operating system: always running, everything depends on it
- Contains exactly five things

### Slide 2: Hook and Event system
- 41 events by category (session, tool, provider, prompt, context)
- When something happens, an event fires. Hooks respond.
- One unified dispatch mechanism, not two separate systems
- Implemented in Rust (hottest code path)

### Slide 3: Module Loader
- Discovers via entry points and filesystem scan
- Calls each module's `mount` function (universal contract)
- Supports Python, WebAssembly, remote gRPC

### Slide 4: Contracts (Protocols)
- Six module types, each with a formal Protocol
- "If you have these methods, you qualify"
- Structural subtyping: no base class, no registration
- Small contracts that almost never change

### Slide 5: The Coordinator
- A registry, not a coordinator. A shelf with labeled slots.
- mount, get, unmount: three operations
- The Orchestrator module does the actual coordinating
- Rust struct via PyO3

### Slide 6: Session Lifecycle
- Create → Initialize → Execute → Cleanup
- Fixed loading order: Orchestrator, Context, Providers, Tools, Hooks
- Orchestrator + Context required; rest optional
- Cleanup runs in finally block, always

### Slide 7: Rust/Python boundary
- Python: what module authors see and write
- Rust: compiled kernel internals via PyO3
- Module authors never touch Rust
- Hot paths run at compiled speed

### Slide 8: Zero file I/O
- The kernel writes nothing to disk
- Logging = hook module. Persistence = context manager. Config = Foundation.
- Swap the logging module. The kernel doesn't change.

---

## Speaker Notes

### Slide 1
Ground the audience: the kernel is the part everything depends on. Small by design. Fewer lines means fewer things that can break in the foundation.

### Slide 2
The hook/event system is the kernel's nervous system. Key: events and hooks are ONE system, not two. One mechanism: `HookRegistry.emit()`. In Rust because it runs on every tool call, every message, every session transition.

### Slide 3
Straightforward: find modules, give them a chance to set up. The interesting detail is that discovery uses standard Python mechanisms plus filesystem conventions. Install with pip or just drop a directory. The `mount` function is the universal contract, covered next.

### Slide 4
Protocols might be unfamiliar to non-technical audiences. Analogy: a job posting says "must be able to do X, Y, Z." It doesn't say you need a specific degree. If you can do those things, you qualify. Same idea.

### Slide 5
Address the naming first: "It's called Coordinator, but it doesn't coordinate." It stores modules. Three operations. The Orchestrator, a MODULE, does the coordinating.

### Slide 6
Walk through the four phases. Emphasize fixed loading order and why: each module can count on the ones before it being available. Required vs optional is practical: no Orchestrator means no agent, so hard error. One failed tool out of twenty? The agent has nineteen others.

### Slide 7
Don't get into Rust syntax. Focus on the WHY: performance for hot paths. "When you call `coordinator.get('provider')`, you're reaching into compiled Rust. Returns in microseconds."

### Slide 8
Payoff for the design philosophy section. Zero file writes in the kernel. Let it land. Each thing you'd expect the kernel to do (logging, saving, configuring) is actually a module's job.
