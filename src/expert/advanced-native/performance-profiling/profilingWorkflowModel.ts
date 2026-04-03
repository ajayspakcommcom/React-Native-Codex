import type {
  ProfilingScenario,
  ProfilingToolContract,
} from './profilingContracts';

export const profilingTools: ProfilingToolContract[] = [
  {
    id: 'flipper',
    title: 'Flipper',
    bestFor: ['js-runtime', 'network-behavior'],
    executionSurface: 'Development-time inspection on simulator, emulator, or device.',
    releaseExpectation:
      'Use for fast diagnostics and plugin-driven inspection, not as the only source of truth for deep native performance decisions.',
  },
  {
    id: 'xcode-instruments',
    title: 'Xcode Instruments',
    bestFor: ['ui-responsiveness', 'native-memory', 'cpu-hotspots', 'frame-drops'],
    executionSurface:
      'iOS profile and release builds on simulator or real hardware through Xcode.',
    releaseExpectation:
      'Treat as the primary source for iOS hangs, hitches, CPU, memory, and energy investigations.',
  },
  {
    id: 'android-profiler',
    title: 'Android Profiler',
    bestFor: ['native-memory', 'cpu-hotspots', 'network-behavior', 'frame-drops'],
    executionSurface:
      'Android Studio profiling against profileable or release-like builds on emulator or device.',
    releaseExpectation:
      'Use for Android CPU, memory, network, and frame analysis with real device sessions when a regression matters.',
  },
];

export const profilingScenarios: ProfilingScenario[] = [
  {
    id: 'scenario-1',
    title: 'Scrolling jank on iOS after native view adoption',
    symptom: 'The UI thread drops frames after a native-heavy screen mounts.',
    recommendedTool: 'xcode-instruments',
    reason:
      'Use Instruments to isolate main-thread work, layout churn, and memory spikes in a release-like run.',
  },
  {
    id: 'scenario-2',
    title: 'Android feed screen leaks memory during repeated navigation',
    symptom:
      'Heap usage grows across repeated visits and the app starts to stutter on lower-end devices.',
    recommendedTool: 'android-profiler',
    reason:
      'Android Profiler is the right tool for heap growth, allocation churn, and frame timing on Android.',
  },
  {
    id: 'scenario-3',
    title: 'Development-time request inspection for a native integration issue',
    symptom:
      'A device-facing feature behaves differently across environments and the team needs fast inspection of requests and logs.',
    recommendedTool: 'flipper',
    reason:
      'Flipper gives quick app and device inspection during development, before deeper platform-specific profiling begins.',
  },
];
