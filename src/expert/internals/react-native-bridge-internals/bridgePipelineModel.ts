import type {BridgeInternalsModel} from './bridgeContracts';

export const bridgeInternalsModel: BridgeInternalsModel = {
  legacyBridgeStages: [
    {
      id: 'legacy-js-enqueue',
      title: 'JS schedules native work',
      thread: 'javascript-thread',
      description:
        'JavaScript prepares a batched command payload for UI updates or native module calls.',
      costProfile: 'medium',
    },
    {
      id: 'legacy-serialization',
      title: 'Payload serialization',
      thread: 'bridge-queue',
      description:
        'Arguments are serialized into a bridge-friendly representation before crossing the native boundary.',
      costProfile: 'high',
    },
    {
      id: 'legacy-native-dispatch',
      title: 'Native dispatch',
      thread: 'native-module-thread',
      description:
        'The native side dequeues work and routes it to module handlers or UI manager operations.',
      costProfile: 'medium',
    },
    {
      id: 'legacy-ui-commit',
      title: 'UI thread apply',
      thread: 'ui-thread',
      description:
        'View operations are finally committed on the UI thread after the async bridge handoff.',
      costProfile: 'medium',
    },
  ],
  newArchitectureStages: [
    {
      id: 'new-jsi-call',
      title: 'JSI direct invocation',
      thread: 'jsi-runtime',
      description:
        'JavaScript can talk to native abstractions through JSI-backed interfaces without the old serialized bridge queue.',
      costProfile: 'low',
    },
    {
      id: 'new-turbomodule',
      title: 'TurboModule boundary',
      thread: 'native-module-thread',
      description:
        'Typed native modules expose methods through generated specs and direct host-function plumbing.',
      costProfile: 'low',
    },
    {
      id: 'new-fabric-render',
      title: 'Fabric render pipeline',
      thread: 'render-thread',
      description:
        'Fabric computes trees and commits with finer-grained synchronization across render and UI work.',
      costProfile: 'medium',
    },
    {
      id: 'new-sync-interaction',
      title: 'Priority-aware UI response',
      thread: 'ui-thread',
      description:
        'The New Architecture allows more direct, interruption-friendly updates for modern React concurrency behavior.',
      costProfile: 'low',
    },
  ],
  interopNotes: [
    'React Native 0.76 and later enable the New Architecture by default, but many apps still run mixed legacy and new-architecture surfaces during migration.',
    'TurboModule interop allows old bridge-based modules to continue working, but not every legacy pattern maps cleanly to concurrent rendering or custom shadow-node access.',
    'When debugging performance, it is still useful to know whether overhead is coming from legacy serialization, Fabric scheduling, or a library still operating through the interop layer.',
  ],
};
