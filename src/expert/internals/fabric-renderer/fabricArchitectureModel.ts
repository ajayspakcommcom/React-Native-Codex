import type {FabricArchitectureModel} from './fabricContracts';

export const fabricArchitectureModel: FabricArchitectureModel = {
  stages: [
    {
      id: 'fabric-reconcile',
      phase: 'reconciliation',
      title: 'React reconciliation',
      description:
        'React decides which updates are needed and prepares the next render work with concurrency-aware scheduling.',
      executionContext: 'javascript',
    },
    {
      id: 'fabric-shadow-tree',
      phase: 'shadow-tree-build',
      title: 'Shadow tree build',
      description:
        'Fabric creates and updates the C++ shadow tree representation rather than relying on the old UIManager bridge payload flow.',
      executionContext: 'renderer',
    },
    {
      id: 'fabric-layout',
      phase: 'layout',
      title: 'Layout calculation',
      description:
        'Layout is computed against the shadow tree so mounting operations can be generated deterministically for the next commit.',
      executionContext: 'renderer',
    },
    {
      id: 'fabric-commit',
      phase: 'commit',
      title: 'Commit preparation',
      description:
        'Fabric prepares an atomic commit package that describes what changed across the surface tree.',
      executionContext: 'mixed',
    },
    {
      id: 'fabric-mount',
      phase: 'mounting',
      title: 'Mounting layer apply',
      description:
        'The mounting layer applies the committed mutations to platform views with finer-grained control than the old bridge-driven UIManager path.',
      executionContext: 'ui-thread',
    },
    {
      id: 'fabric-events',
      phase: 'event-dispatch',
      title: 'Event priority and dispatch',
      description:
        'Events are coordinated with the new rendering system so input and updates can be scheduled with better consistency under concurrent rendering.',
      executionContext: 'mixed',
    },
  ],
  designNotes: [
    'Fabric is the renderer side of the New Architecture. JSI and TurboModules explain how code reaches native modules; Fabric explains how React Native renders and commits UI.',
    'The key expert shift is that UI work is no longer best understood as “JS sends view commands over the bridge.” Fabric uses a shadow-tree and mounting model with better concurrency support.',
    'When performance or correctness issues appear in New Architecture apps, it matters whether the bottleneck lives in React reconciliation, shadow-tree work, layout, or the mounting layer.',
  ],
};
