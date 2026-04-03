import type {HermesTuningControl} from './hermesContracts';

export const hermesTuningControls: HermesTuningControl[] = [
  {
    id: 'runtime-verification',
    area: 'runtime-verification',
    title: 'Verify Hermes at runtime and in release builds',
    description:
      'Do not assume debug behavior reflects release behavior. Confirm Hermes is active in the runtime and validate startup, memory, and interaction paths on release artifacts.',
    status: 'implemented',
  },
  {
    id: 'bundle-shape',
    area: 'release-bundle-shape',
    title: 'Tune release bundle shape, not just engine selection',
    description:
      'Hermes benefits are amplified when large feature bundles, dead code, and source-map overhead are kept under control before release compilation.',
    status: 'guidance',
  },
  {
    id: 'source-maps',
    area: 'source-maps',
    title: 'Keep Hermes-compatible source map workflow',
    description:
      'Production crash analysis and profiling should preserve the correct Hermes mapping artifacts instead of treating source maps as optional.',
    status: 'guidance',
  },
  {
    id: 'memory-observation',
    area: 'memory-observation',
    title: 'Observe memory with realistic device classes',
    description:
      'Hermes tuning should include low-memory devices, not just simulator or flagship-device testing.',
    status: 'guidance',
  },
  {
    id: 'profiling',
    area: 'profiling',
    title: 'Profile startup and interaction separately',
    description:
      'Startup, first-render, and interaction performance can regress for different reasons. Hermes tuning should keep those measurements separate.',
    status: 'guidance',
  },
  {
    id: 'bytecode-benchmark',
    area: 'binary-size',
    title: 'Compare release bundle and bytecode artifacts over time',
    description:
      'Engine tuning is incomplete if the team never compares binary size, bundle size, and warm-start effects across releases.',
    status: 'pending',
  },
];
