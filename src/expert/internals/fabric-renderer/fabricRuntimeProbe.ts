type RuntimeGlobals = typeof globalThis & {
  __turboModuleProxy?: unknown;
  HermesInternal?: unknown;
};

import type {FabricRuntimeSnapshot} from './fabricContracts';

export function getFabricRuntimeSnapshot(): FabricRuntimeSnapshot {
  const runtimeGlobals = globalThis as RuntimeGlobals;
  const turboModuleProxyAvailable = runtimeGlobals.__turboModuleProxy != null;
  const hermesEnabled = runtimeGlobals.HermesInternal != null;

  return {
    newArchitectureEnabled: true,
    fabricLikelyEnabled: turboModuleProxyAvailable,
    turboModuleProxyAvailable,
    hermesEnabled,
  };
}
