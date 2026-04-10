export interface ChapterBlock {
  type: 'prose' | 'diagram' | 'table' | 'code' | 'vignette' | 'audio' | 'chat' | 'scrollytelling';
  id?: string;
  width?: 'reading' | 'wide' | 'full';
  placement?: string;
  status?: 'stub';
  rationale?: string;
  prompt?: string;
}

export interface Chapter {
  number: number;
  title: string;
  slug: string;
  lead: string;
  blocks: ChapterBlock[];
}

export const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Introduction',
    slug: 'introduction',
    lead: 'What Amplifier is, why it exists, and how this book is structured.',
    blocks: [
      { type: 'prose' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 2,
    title: 'The Architecture Map',
    slug: 'architecture-map',
    lead: "A bird's-eye view of Amplifier's layered architecture and how its parts relate to each other.",
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'architecture-overview',
        width: 'wide',
        placement: 'after-intro',
      },
      {
        type: 'diagram',
        id: 'architecture-interactive',
        width: 'full',
        placement: 'end-of-chapter',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 3,
    title: 'Design Philosophy',
    slug: 'design-philosophy',
    lead: 'Mechanism over policy, composability, and the separation of concerns that shape every Amplifier decision.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'mechanism-vs-policy-flow',
        width: 'wide',
        placement: 'after-hook-example',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 4,
    title: 'The Kernel',
    slug: 'the-kernel',
    lead: 'The minimal, stable core that everything else builds upon — session management, module loading, and the coordinator.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'kernel-components',
        width: 'wide',
        placement: 'after-intro',
      },
      { type: 'code', id: 'mount-contract' },
      {
        type: 'vignette',
        id: 'kernel-five-things',
        width: 'wide',
        placement: 'after-component-list',
        status: 'stub',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 5,
    title: 'Module System',
    slug: 'module-system',
    lead: "How modules extend Amplifier's capabilities through a uniform mount/unmount contract and a type-safe module registry.",
    blocks: [
      { type: 'prose' },
      {
        type: 'table',
        id: 'module-types',
        width: 'wide',
        placement: 'after-intro',
      },
      { type: 'code', id: 'mount-contract' },
      {
        type: 'diagram',
        id: 'loading-order',
        width: 'wide',
        placement: 'after-loading-order',
      },
      {
        type: 'vignette',
        id: 'module-mount-lifecycle',
        width: 'wide',
        placement: 'after-mount-contract',
        status: 'stub',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 6,
    title: 'The Orchestrator',
    slug: 'the-orchestrator',
    lead: 'The reasoning loop at the heart of every agent interaction — how Amplifier coordinates models, tools, and context across turns.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'reasoning-loop',
        width: 'wide',
        placement: 'after-privilege-gap',
      },
      {
        type: 'scrollytelling',
        id: 'one-turn-of-conversation',
        width: 'full',
        placement: 'after-flow-description',
      },
      {
        type: 'vignette',
        id: 'orchestrator-loop-explainer',
        width: 'wide',
        placement: 'after-diagram',
        status: 'stub',
      },
      { type: 'chat', status: 'stub' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 7,
    title: 'Tools vs Hooks',
    slug: 'tools-vs-hooks',
    lead: 'Understanding the fundamental difference between tools (agent-callable) and hooks (kernel-callable) — and why the distinction matters.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'tools-vs-hooks-comparison',
        width: 'wide',
        placement: 'after-intro',
      },
      {
        type: 'diagram',
        id: 'inject-context-flow',
        width: 'wide',
        placement: 'after-code-quality-example',
      },
      {
        type: 'diagram',
        id: 'priority-cascade',
        width: 'reading',
        placement: 'after-cascade-description',
      },
      {
        type: 'vignette',
        id: 'hook-cascade-animation',
        width: 'wide',
        placement: 'after-cascade-diagram',
        status: 'stub',
      },
      { type: 'chat', status: 'stub' },
    ],
  },
  {
    number: 8,
    title: 'Sessions',
    slug: 'sessions',
    lead: 'How Amplifier manages conversation state, session lifecycles, and the relationship between parent and child sessions.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'session-lifecycle-timeline',
        width: 'wide',
        placement: 'after-four-phases',
      },
      {
        type: 'table',
        id: 'parent-child-comparison',
        width: 'wide',
        placement: 'after-parent-child',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 9,
    title: 'Bundles and Configuration',
    slug: 'bundles-and-configuration',
    lead: 'Packaging agents, tools, and settings into reusable bundles — the deployment and composition unit of Amplifier.',
    blocks: [
      { type: 'prose' },
      { type: 'code', id: 'minimal-bundle-example' },
      {
        type: 'diagram',
        id: 'composition-layers',
        width: 'wide',
        placement: 'after-composition',
      },
      {
        type: 'diagram',
        id: 'mention-resolution',
        width: 'wide',
        placement: 'after-mentions',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 10,
    title: 'The Foundation Bridge',
    slug: 'the-foundation-bridge',
    lead: 'How Amplifier Foundation prepares the agent environment before each interaction begins — the preparation pipeline and callback channels.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'preparation-pipeline',
        width: 'wide',
        placement: 'after-pipeline-description',
      },
      {
        type: 'diagram',
        id: 'two-callbacks',
        width: 'wide',
        placement: 'after-callback-channels',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 11,
    title: 'Agents, Context Files, Skills, and Recipes',
    slug: 'agents-context-skills-recipes',
    lead: 'The high-level building blocks that make Amplifier powerful in practice: agent bundles, context injection, skill libraries, and workflow recipes.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'recipe-pipeline',
        width: 'wide',
        placement: 'after-recipes',
      },
      {
        type: 'vignette',
        id: 'recipe-workflow-animation',
        width: 'wide',
        placement: 'after-recipe-diagram',
        status: 'stub',
      },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 12,
    title: 'The Complete Picture',
    slug: 'the-complete-picture',
    lead: 'All six layers of Amplifier working in concert — a unified view of the full system and where every concept fits.',
    blocks: [
      { type: 'prose' },
      {
        type: 'diagram',
        id: 'six-layer-stack',
        width: 'wide',
        placement: 'after-layer-descriptions',
      },
      {
        type: 'diagram',
        id: 'full-system-flow',
        width: 'reading',
        placement: 'after-where-things-go',
      },
      { type: 'chat', status: 'stub' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 13,
    title: 'Appendix: Research Methodology',
    slug: 'appendix-research-methodology',
    lead: 'How this book was researched and validated against the live Amplifier codebase — tools, techniques, and tradeoffs.',
    blocks: [
      { type: 'prose' },
      { type: 'audio', status: 'stub' },
    ],
  },
];
