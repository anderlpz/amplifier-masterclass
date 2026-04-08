export interface SectionMeta {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
}

export const sections: SectionMeta[] = [
  { id: 's1', label: 'Introduction' },
  { id: 's2', label: 'Architecture Map' },
  { id: 's3', label: 'Design Philosophy' },
  {
    id: 's4',
    label: 'The Kernel',
    children: [
      { id: 's4-session', label: 'Session Lifecycle' },
      { id: 's4-contracts', label: 'Contracts' },
      { id: 's4-loader', label: 'Module Loader' },
      { id: 's4-coordinator', label: 'The Coordinator' },
      { id: 's4-hooks', label: 'Hooks' },
    ],
  },
  {
    id: 's5',
    label: 'Module System',
    children: [
      { id: 's5-provider', label: 'Provider' },
      { id: 's5-tool', label: 'Tool' },
      { id: 's5-orchestrator', label: 'Orchestrator' },
      { id: 's5-context', label: 'Context' },
      { id: 's5-hook', label: 'Hook' },
      { id: 's5-agent', label: 'Agent' },
    ],
  },
  { id: 's6', label: 'The Orchestrator' },
  { id: 's7', label: 'Tools vs Hooks' },
  { id: 's8', label: 'Sessions' },
  { id: 's9', label: 'Bundles' },
  { id: 's10', label: 'Foundation Bridge' },
  { id: 's11', label: 'Agents & Recipes' },
  { id: 's12', label: 'Complete Picture' },
  { id: 's13', label: 'Appendix' },
];
