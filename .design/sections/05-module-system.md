# Section 5: The Module System

Everything outside the kernel's five subsystems is a module: a self-contained piece that plugs in through a standard interface to add a specific capability.

## Six types, in order of importance

### Orchestrator

Drives the conversation. Decides what context the AI needs, which provider handles each request, how tool calls are managed, when to stop. Exactly one per session. Required. The Orchestrator's unique privilege is covered in its own section.

### Provider

Connects to an AI model. Claude, GPT-4, Gemini, a local model on your machine: each connection is a separate Provider. The Provider translates between Amplifier's internal request format and whatever the model expects. A session can have multiple Providers; the Orchestrator picks which one to use per turn.

### Tool

An action the agent can take: read a file, search the web, run a command. The AI *decides* when to use tools. It sees them in its system prompt, considers its options, and generates a tool call. Tools are visible, intentional, under the model's control. Each tool has a name, description, input schema, and an `execute` method.

### Context Manager

The agent's memory. Tracks the conversation (user messages, AI responses, tool results) and decides what fits within the AI model's token budget. AI models have limited context windows; a long conversation can't be sent in its entirety. The Context Manager makes the cut. Exactly one per session. Required.

### Hook Handler

Reacts to system events. When something happens (a tool is about to execute, a message is being sent, a session is starting) an event fires. Registered hooks run automatically.

Unlike every other module type, hooks are invisible to the AI. The model has no concept they exist. Not in the system prompt, never chosen by the model. This distinction between tools the AI controls and hooks that control the AI is one of the most important in the architecture. It gets its own section.

### Resolver

Maps module identifiers (names like `anthropic-provider`) to actual file paths on disk. Infrastructure plumbing. Foundation mounts one; users rarely write these.

## One contract for all six

Every module type plugs in through the same function:

```python
async def mount(coordinator, config) -> Optional[cleanup_fn]
```

The module receives the Coordinator (the registry) and a configuration dictionary. It does whatever setup it needs, registers itself into the Coordinator at the appropriate slot, and optionally returns a cleanup function for session teardown.

Orchestrators follow this. Providers follow this. Tools, Context Managers, Hooks, Resolvers: all of them. The Loader doesn't need to know what type it's loading. It calls `mount`; the module handles the rest.

The cleanup function is the flip side. If a module opens a network connection or allocates resources during mount, it returns a cleanup function that releases those resources. The session calls all cleanup functions at shutdown.

## Fixed loading order

Modules load in sequence:

1. **Orchestrator** first, because other modules may need to know the conversation strategy
2. **Context Manager** second, because the Orchestrator needs memory available
3. **Providers** third, because tools may check which models are available
4. **Tools** fourth, because hooks may want to observe tool registration
5. **Hook Handlers** last, because they observe everything else and need the system fully set up

Orchestrator and Context Manager are required. If either fails to mount, the session stops. There's no reasonable way to run an agent that can't think or can't remember. The remaining three are optional. A failed Provider gets logged; you might have others. A failed Tool means the agent has fewer actions. A failed Hook means fewer observers.

## Discovery channels

Before mounting, the Loader needs to find modules. Two primary channels:

**Python entry points**: installed packages advertise "I contain an Amplifier module." Standard `pip install` handles registration automatically. The Loader scans these at startup.

**Filesystem scanning**: directories named `amplifier-module-*` in configured search paths. Useful for local development. Create a directory, name it correctly, and the Loader finds it.

Advanced channels exist for WebAssembly modules (sandboxed binaries) and remote gRPC modules (running on separate machines), but entry points and filesystem scanning cover most needs.

## Contracts are contracts, not enforcement

The six protocols use structural subtyping. The system checks what methods a module has and infers the type. A module with `complete` is probably a Provider. A module with `execute` and `input_schema` is probably a Tool.

There's no runtime type-checking at load time. If you write a Provider missing its `complete` method, nothing complains until the system actually calls it. That's a trade-off: maximum flexibility for module authors (no base classes, no registration boilerplate) at the cost of late failure. In practice it works well, because module authors test their modules.

---

## Presentation Slides

### Slide 1: Six module types
- Orchestrator: drives conversation. Required.
- Provider: connects to AI model. Multiple allowed.
- Tool: action the AI can take. AI decides when.
- Context Manager: the agent's memory. Required.
- Hook Handler: reacts to events. Invisible to AI.
- Resolver: maps names to paths. Infrastructure.

### Slide 2: The universal mount contract
```
async def mount(coordinator, config) → Optional[cleanup_fn]
```
- Receive the registry + configuration
- Set yourself up, register yourself
- Optionally return a cleanup function
- Same interface for all six types

### Slide 3: Loading order
- Orchestrator → Context → Providers → Tools → Hooks
- Orchestrator and Context are required; session fails without them
- Others are optional: warn and continue

### Slide 4: Discovery
- Entry points: install with pip, module advertises itself
- Filesystem: directories named `amplifier-module-*`
- Advanced: WebAssembly, remote gRPC
- Most users need only the first two

---

## Speaker Notes

### Slide 1
Walk through the types briefly. Two things to emphasize: Tools are AI-visible (the model decides when to use them), Hook Handlers are AI-invisible (the model has no idea they exist). This gets expanded in Section 7.

### Slide 2
The mount contract is the system's connective tissue. The Loader is completely generic. It doesn't know what type it's loading. It calls `mount`, and the module self-mounts into the Coordinator at the right slot.

### Slide 3
Order matters because each module can rely on the ones before it. Ask the audience: "No Orchestrator. What does the agent do? Nothing. Hard error. One failed tool out of twenty? Nineteen still work."

### Slide 4
Keep brief. Entry points and filesystem scanning are what matter for most users.
