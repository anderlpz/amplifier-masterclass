# Section 3: Design Philosophy

Three ideas shaped how Amplifier is built. They weren't written on a whiteboard first. They emerged from the code, from decisions made repeatedly about what belongs in the kernel and what doesn't.

## Mechanism, not policy

The kernel has a hook system. Modules can react when things happen. A tool is about to be called; the kernel fires an event. Registered hooks respond. A safety module might block the call. A logging module might observe it. An approval module might pause and ask a human.

The kernel never decides which response is correct. It fires events and collects results. The decision (what to block, what to log, what to approve) belongs to modules.

This separation comes from operating system design. The Linux kernel provides process scheduling and memory management without deciding how programs use those mechanisms. Amplifier does the same: the kernel provides module loading, event dispatch, and session lifecycle. It never decides which modules matter, which events to act on, or what should happen during a session.

The consequence is that when rules change (new safety requirements, new compliance needs) you change modules. The kernel stays the same.

## The center stays still

New AI models ship every few months. New paradigms emerge: multi-modal models, reasoning models, computer-use models. The tooling landscape shifts constantly.

None of this touches the kernel.

A new model arrives; someone writes a provider module that connects to its API and translates between Amplifier's format and the model's format. Same interface every other provider uses. The kernel doesn't know or care whether it's talking to Claude, GPT, Gemini, or a model that doesn't exist yet.

Same for new tools, new orchestration strategies, new memory approaches. All modules. All plug in from outside. The center is the hardest part of the system to change, so it's designed to rarely need changing.

## Ruthless simplicity

The kernel does zero file I/O. No logs. No transcripts. No configuration files. Nothing to disk, ever.

Not because those things don't matter. They do. Because the kernel isn't the right place for them. A logging hook writes logs. A persistence module saves conversations. A configuration layer reads settings. Each one is a module.

Every line in the kernel is a line that every module depends on. Every line is a potential constraint on the future. So the kernel is aggressive about exclusion. If something can be a module, it must be a module.

You can search the entire `amplifier-core` codebase for file-writing operations. Zero matches. That's not an accident; it's the clearest expression of this principle.

## The reinforcement loop

These three ideas aren't independent. Mechanism-not-policy keeps the kernel free of decisions that might change. The still center means those decisions live in modules that can be swapped. Ruthless simplicity keeps the kernel small enough that the first two properties actually hold.

The result is a kernel that does nothing interesting on its own. AI reasoning, tool usage, safety enforcement, conversation management are all in modules. The kernel makes sure modules can talk to each other and respond to events.

That boringness is the point.

---

## Presentation Slides

### Slide 1: Three design principles
- Amplifier's architecture is shaped by three principles
- Emerged from the code, not from a planning document

### Slide 2: Mechanism, not policy (concrete)
- The kernel has a hook system: modules react when things happen
- Tool about to be called → kernel fires event → hooks respond
- Safety module blocks. Logging module observes. Approval module pauses.
- The kernel doesn't decide. Modules do.

### Slide 3: Mechanism, not policy (origin)
- From operating system design (Linux kernel)
- The OS kernel provides scheduling, memory, device access but never decides how they're used
- In Amplifier: module loading, event dispatch, session lifecycle
- Rules change → swap modules. Kernel stays.

### Slide 4: The center stays still
- New AI models every few months. New paradigms constantly.
- None of it touches the kernel.
- New model? Provider module. Same interface.
- The center stays still so the edges can move at any speed.

### Slide 5: Ruthless simplicity
- The kernel does zero file I/O. No logs, no transcripts, no persistence.
- Because those belong in modules.
- Every kernel line constrains every module.
- Grep the kernel for file writes: zero matches.

### Slide 6: The reinforcement loop
- Mechanism-not-policy keeps the kernel free of decisions
- The still center pushes those decisions to swappable modules
- Ruthless simplicity keeps the kernel small enough for both to hold
- Result: a boring kernel. All interesting behavior is in modules.

---

## Speaker Notes

### Slide 1
Frame it: these aren't ideals we're selling. They're patterns visible in the code. We look at what the system does, then name the principle.

### Slide 2
The most important principle in the architecture. Walk through the example carefully. The key phrase: "the kernel provides the mechanism; the module provides the policy." If the audience remembers one thing from this entire presentation, it should be this.

### Slide 3
The Linux comparison grounds this in decades of proven engineering. The consequence is practical: new safety requirements, new compliance needs. Swap modules, never the kernel.

### Slide 4
About durability. If the kernel had to change with every new model or paradigm, it would be a maintenance nightmare. Concrete example: "When the next Claude version ships, Amplifier needs one thing: a new provider module. The kernel doesn't know it exists."

### Slide 5
Let the zero-I/O fact land. "Grep the kernel for file writes. Nothing." Then explain why: every kernel line is a dependency for every module. Smaller kernel means more module freedom.

### Slide 6
Tie the principles together. The kernel is deliberately boring; all interesting behavior lives in modules. Set up the next section: "Now that we know why the kernel is shaped this way, let's see what's actually inside it."
