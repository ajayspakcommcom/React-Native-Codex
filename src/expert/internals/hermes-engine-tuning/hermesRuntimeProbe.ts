type RuntimeGlobals = typeof globalThis & {
  HermesInternal?: unknown;
};

import type {HermesRuntimeSnapshot} from './hermesContracts';

export function getHermesRuntimeSnapshot(): HermesRuntimeSnapshot {
  const runtimeGlobals = globalThis as RuntimeGlobals;

  return {
    hermesEnabledAtBuild: true,
    hermesRuntimeDetected: runtimeGlobals.HermesInternal != null,
    newArchitectureEnabled: true,
    releaseValidationRequired: true,
  };
}
