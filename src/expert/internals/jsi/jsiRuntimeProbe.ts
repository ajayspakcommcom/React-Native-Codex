import {Platform} from 'react-native';

import type {JsiRuntimeSnapshot} from './jsiContracts';

type RuntimeGlobals = typeof globalThis & {
  __turboModuleProxy?: unknown;
  HermesInternal?: unknown;
  RN$Bridgeless?: boolean;
};

export function getJsiRuntimeSnapshot(): JsiRuntimeSnapshot {
  const runtimeGlobals = globalThis as RuntimeGlobals;
  const hasHermesRuntime = runtimeGlobals.HermesInternal != null;
  const hasTurboModuleProxy = runtimeGlobals.__turboModuleProxy != null;
  const hasBridgelessRuntime = runtimeGlobals.RN$Bridgeless === true;

  return {
    hasHermesRuntime,
    hasTurboModuleProxy,
    hasBridgelessRuntime,
    likelyJsiCapable:
      hasTurboModuleProxy || hasBridgelessRuntime || Platform.OS === 'ios' || Platform.OS === 'android',
  };
}
