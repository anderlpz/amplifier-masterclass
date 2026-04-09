# Section 4: The Kernel

## Five things live in the kernel. Nothing else.

The kernel (`amplifier-core`) is a Rust and Python package. Inside it are five components. Each exists because every module in the system depends on it.

## 1. Session Lifecycle

A session is the container around a particular instance of the system running. Four phases: Create, Initialize, Execute, Cleanup. Fixed loading order. Orchestrator and Context Manager are required. Everything else is optional. Cleanup runs in a `finally` block. Always.

**Creation.** Configuration goes in. Coordinator and Loader are created. Nothing loaded yet. The system knows what it needs, but hasn't started yet.

**Initialization.** Modules load in fixed order: Orchestrator, Context Manager, Providers, Tools, Hooks. Orchestrator and Context Manager are required; failure to load either stops the session. The rest are optional (warn and continue).

**Execution.** A prompt arrives, passes to the Orchestrator, and a response comes back. This phase is repeatable. Each `execute` call is one conversation turn. Between turns, all state is maintained.

**Cleanup.** A `session:end` event fires first (hooks get a final chance to process). Then Coordinator tears down modules. Then Loader cleans up. In a `finally` block. Always runs, even after errors.

## 2. Contracts

Six module types, each defined as a contract. If a module has the right methods, it satisfies the contract. No base class required. No explicit registration. Small, stable contracts that rarely change.

The six contracts define the module ecosystem's shape. They're small (each specifying just a few methods). When they do change, every module of that type is affected, which is why stability matters here more than anywhere else.

## 3. Module Loader

Discovers available modules, loads them, and gives each one a chance to set itself up. The loader does not need to know what type of module it is loading. It calls `mount`, and the module takes care of the rest.

Discovery uses two primary channels: Python entry points (installed packages advertising they contain Amplifier modules) and filesystem scanning (directories following the `amplifier-module-*` naming convention).

## 4. The Coordinator

A passive registry: a structured shelf where modules are stored after loading. Three operations: `mount`, `get`, `unmount`. Despite the name, it does not coordinate anything. Think of it as a phone book. The Orchestrator module does the actual work.

When a module mounts, it goes into the right slot. When something needs to find a module, it checks the Coordinator. No decisions. No message routing. No behavior.

## 5. Hooks

Hooks let you interact with the system's lifecycle programmatically. They are injection points for deterministic, non-AI-driven actions. When something happens (a tool is called, a session starts, a file is written) hooks fire automatically. The AI model has no idea they exist. Hooks can observe, block, inject information into the model's context, or transform data flowing through the system.

There are 41 canonical events, organized by category: session, tool, provider, prompt, context. Events and hooks are the same system: one dispatch mechanism (`HookRegistry.emit()`), not two separate pieces. An event fires, hooks respond, results are collected. The implementation is in Rust, because event dispatch is the hottest path in the system. It runs on every tool call, every message, every session transition.

## Zero file I/O

The kernel writes zero bytes to disk. No log files, no transcripts, no configuration files. Search the entire `amplifier-core` codebase for file writes: zero matches. Mechanism, not policy, made tangible.

Logging happens through hook modules that subscribe to events. Persistence happens through context managers or hooks that save conversation history. Configuration loading happens in the Foundation layer, entirely outside the kernel.

---

## Presentation Slides

### Slide 1: 5 (big number)
things inside the kernel
amplifier-core. Everything else is a module.

### Slide 2: The five kernel components (icon-grid)
- **Session Lifecycle** — Create, Initialize, Execute, Cleanup
- **Contracts** — 6 module types, structural matching, rarely change
- **Module Loader** — Discovers and mounts all modules at session start
- **The Coordinator** — A registry. A labeled shelf for mounted modules.
- **Hooks** — 41 events, unified dispatch, high performance

### Slide 3: The hook system (hflow)
1. Something happens (tool called, message sent, session starts)
2. Kernel fires a named event: namespace:action — *kernel*
3. Registered hooks for that event are called — *dispatch*
4. Hook results resolved by priority cascade — *cascade*
5. System continues (or halts if deny returned)

### Slide 4: "Despite its name, the Coordinator does not coordinate. It is a registry." (statement)
mount(), get(), unmount(). Three operations, nothing more.

### Slide 5: Session lifecycle (flow)
Create (config in) -> Initialize (modules mount) -> Execute (repeatable) -> Cleanup (always runs)
Orchestrator + Context Manager are required. Others are optional. Cleanup runs even after errors.

### Slide 6: The universal mount contract (code)
```
async def mount(
    coordinator: Coordinator,
    config: dict
) -> Optional[cleanup_fn]:
    # receive the registry + configuration
    # do your setup work
    # register yourself in the coordinator
    # optionally return a cleanup function
```
All six module types follow this exact interface.

### Slide 7: "Zero file writes. Search the kernel codebase. Zero matches." (statement)
Logging = hook module. Persistence = context manager. Config = Foundation.

---

## Speaker Notes

### Slide 1
Five components. That's the entire kernel. This is the part that's always running, the part that everything else depends on. And it's small on purpose. The fewer lines of code here, the fewer things can go wrong in the piece that the entire system relies on.

### Slide 2
Let me name them. The Session Lifecycle, Contracts, the Loader, the Coordinator, and the hook system. Five things, nothing more. Each one exists because every module in the system needs it. That shared dependency is exactly why stability here matters so much.

### Slide 3
The hook and event system is the kernel's nervous system. And I want to be precise here: events and hooks are one system, not two. There's a single mechanism. HookRegistry.emit(). An event fires, registered hooks respond. That's it. Don't let anyone walk away thinking these are separate subsystems. This code runs on every tool call, every message, every session transition. It has to be fast.

### Slide 4
Let me clear something up right away. Despite its name, the Coordinator does not coordinate. It's a registry: a shelf with labeled slots. You put a provider in the provider slot. You put an orchestrator in the orchestrator slot. The Coordinator holds them. The actual coordinating: deciding what runs when, driving the agent loop: that's the Orchestrator, which is a module, not part of the kernel. Mechanism versus policy, once again.

### Slide 5
Walk through the four phases. Emphasize fixed loading order and why: each module can count on the ones before it being available. Required vs optional is practical: no Orchestrator means no agent, so hard error. One failed tool out of twenty? The agent has nineteen others. And cleanup is wrapped in a finally block, which means it runs even if the session crashed mid-session.

### Slide 6
This is the connective tissue of the whole system. The Loader is completely generic: it doesn't know what it's loading. It just calls mount(). And the module self-mounts into the Coordinator at the right slot. One contract, every module type.

### Slide 7
Payoff for the design philosophy section. Zero file writes in the entire kernel. Logging? That's a hook module. Persistence? Hook module. Telemetry? Hook module. Every capability you might expect the kernel to own is actually handled by a module. Remove all the hooks and the conversation still works identically: there's just no record of it.
