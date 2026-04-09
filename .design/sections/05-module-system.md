# Section 5: The Module System

## Everything outside the kernel is a module.

A module is a self-contained piece that plugs in through a standard interface to add a specific capability. Six types, one universal contract, fixed loading order. Remove one, add another. The rest of the system doesn't notice.

## Five module types

### Orchestrator — "The conductor"

Drives the conversation. Decides what context the AI needs, which provider handles each request, how tool calls are handled, when to stop. Exactly one per session. Required.

### Provider — "The AI connection"

Connects to an AI model. Claude, GPT, Gemini, local model. Each connection is a separate Provider. Translates between Amplifier's format and the model's API. Multiple per session allowed.

### Tool — "The agent's hands"

An action the agent can take. Read a file. Search the web. Run a command. The AI *decides* when to use tools. It sees them listed in its instructions. Visible, intentional, under the model's control.

### Context Manager — "The agent's memory"

Keeps track of what's been said and decides what to include when the AI needs context. Handles the token budget constraint and decides which messages fit in the AI's limited context window. Exactly one per session. Required.

### Hook Handler — "The sentinel"

Reacts to events. Fires automatically when something happens. The AI has *no idea* hooks exist. They are invisible to the model, not listed in its instructions, never chosen by it. Observe, block, inject, or modify.

A sixth type, the **Resolver**, maps module names to file paths. Infrastructure plumbing; users rarely encounter it.

## One contract for all six

Every module type plugs in through the same function:

```python
async def mount(coordinator, config) -> Optional[cleanup_fn]
```

The contract is a function called `mount`. It receives two things: the Coordinator and a configuration dictionary. The module does whatever setup it needs, registers itself into the Coordinator at the right slot, and optionally returns a cleanup function that will be called when the session ends.

The Orchestrator follows this contract. Providers, Tools, Context Managers, Hook Handlers, and Resolvers all follow this contract. The Module Loader does not need to know what type of module it is loading. It calls `mount`, and the module handles the rest.

## Loading order

Modules are loaded in a fixed order: **Orchestrator first**, then Context Manager, then Providers, then Tools, then Hook Handlers last. The Orchestrator and Context Manager are required. If either fails to mount, the session stops immediately with an error. The rest are optional.

The Orchestrator is required: if it fails to mount, the session stops. But the system needs *an* orchestrator, not a *specific* orchestrator. The default one handles think, act, observe, repeat. Swap it for one that runs parallel provider calls. The kernel does not care which orchestrator is in the slot. It only cares that something is there.

---

## Presentation Slides

### Slide 1: "Everything outside the kernel is a module." (statement)
Six types. One mount contract. Fixed loading order. Swap any piece through a standard interface.

### Slide 2: Six module types (icon-grid)
- **Orchestrator** — Drives the conversation. Exactly one per session. Required.
- **Provider** — Connects to an AI model. Claude, GPT, Gemini, local. Typically required.
- **Tool** — An action the agent can take. The AI decides when to use it.
- **Context Manager** — The agent's memory. Manages the context window. Required.
- **Hook Handler** — Reacts to events. Invisible to the AI. The model does not know they exist.

### Slide 3: Required vs Optional (compare-grid)
**Required** — session fails without these
- Orchestrator: no agent loop without it
- Context Manager: no memory without it
- Both must mount successfully

**Optional** — warn and continue if missing
- Providers: you may have others
- Tools: agent just has fewer actions
- Hook Handlers: no observers

### Slide 4: One contract for all six types (code)
```
async def mount(
    coordinator: Coordinator,
    config: dict
) -> Optional[cleanup_fn]:
    ...
```
The Orchestrator follows this. The Provider follows this. All six module types, one interface.

### Slide 5: Loading order is fixed (flow)
Orchestrator (required) -> Context (required) -> Providers (optional) -> Tools (optional) -> Hooks (optional)
Each module can count on the ones loaded before it being available.

### Slide 6: How modules are found (icon-grid)
- **Python entry points** — Install with pip. Module advertises itself automatically.
- **Filesystem scan** — Directories named `amplifier-module-*` in search paths.

### Slide 7: "If you have the right methods, you qualify." (statement)
No base class required. No explicit registration. Structural subtyping: if you have the right methods, you qualify.

### Slide 8: A preview: Tools vs Hooks (compare-grid)
**Tools** — visible to the AI
- Listed in the system prompt
- The AI decides when to call them
- Part of the model's deliberate reasoning

**Hook Handlers** — invisible to the AI
- Not in the system prompt
- Fire automatically on events
- The model does not know they exist

---

## Speaker Notes

### Slide 1
This is literal. Everything outside those five kernel subsystems is a module. Not some things: everything. Six module types, one mount contract, fixed loading order. That's the entire module system.

### Slide 2
Six types. The Orchestrator is the conductor: it drives the agent loop. Providers connect to AI models. The Context Manager handles memory and conversation state. Tools: two things to know. First, the AI can see them. Tools appear in the system prompt. Second, the AI decides when to use them. Hook Handlers are the opposite: completely invisible to the AI. They observe and intervene, but the AI never knows they're there. And Resolvers handle module discovery: infrastructure plumbing. Don't linger on Resolvers.

### Slide 3
Think about it this way. If there's no Orchestrator, what does the agent do? Nothing. There's no one to drive the loop. That's a hard error: the session cannot start. But if one tool out of twenty fails to load? The agent still has nineteen other tools. It can work. That's the distinction between required and optional. Required means the session cannot function without it. Optional means the session is degraded but viable.

### Slide 4
One contract for all six types. The Loader calls mount() and doesn't know whether it's loading a provider, a tool, or a hook handler. The module receives the Coordinator, registers itself in the correct slot, and that's it. This uniformity is what makes the system composable.

### Slide 5
The loading order is fixed, and the sequence matters. Orchestrator first, because it's the conductor: everything else needs it in place. Context Manager second, because the Orchestrator needs memory to work with. Providers come next, then Tools. And Hooks load last. Why last? Because hooks observe everything else. They need the full system set up before they start watching.

### Slide 6
Keep this brief. Two main mechanisms: Python entry points and filesystem scanning. Entry points are the standard Python packaging approach: install a package and it registers itself. Filesystem scanning looks in known directories.

### Slide 7
Amplifier uses structural subtyping. If your class has the right methods with the right signatures, it qualifies as that module type. You don't need to inherit from a base class. You don't need to declare "I am a Tool." The structure of your code determines its type.

### Slide 8
Before we move on, I want to flag something. Tools and hooks are both modules. They both plug in through mount(). But they operate in fundamentally different realms. We're going to spend an entire section on this distinction later, because getting it right is one of the most important design decisions you'll make.
