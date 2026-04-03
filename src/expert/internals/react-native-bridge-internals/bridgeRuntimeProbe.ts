import {Platform} from 'react-native';

import type {ArchitectureMode, RuntimeArchitectureSnapshot} from './bridgeContracts';

type RuntimeGlobals = typeof globalThis & {
  __turboModuleProxy?: unknown;
  HermesInternal?: unknown;
  RN$Bridgeless?: boolean;
};

function resolveArchitectureMode(
  isTurboModuleProxyAvailable: boolean,
  isBridgelessRuntime: boolean,
): ArchitectureMode {
  if (isBridgelessRuntime) {
    return 'new-architecture';
  }

  if (isTurboModuleProxyAvailable) {
    return 'new-architecture-with-interop';
  }

  return 'legacy-bridge';
}

export function getRuntimeArchitectureSnapshot(): RuntimeArchitectureSnapshot {
  const runtimeGlobals = globalThis as RuntimeGlobals;
  const isTurboModuleProxyAvailable = runtimeGlobals.__turboModuleProxy != null;
  const isHermesEnabled = runtimeGlobals.HermesInternal != null;
  const isBridgelessRuntime = runtimeGlobals.RN$Bridgeless === true;

  const reactNativeVersion = (Platform.constants as {reactNativeVersion?: {major: number; minor: number; patch: number}} | undefined)
    ?.reactNativeVersion;

  return {
    architectureMode: resolveArchitectureMode(
      isTurboModuleProxyAvailable,
      isBridgelessRuntime,
    ),
    isHermesEnabled,
    isTurboModuleProxyAvailable,
    isBridgelessRuntime,
    reactNativeVersion: reactNativeVersion
      ? `${reactNativeVersion.major}.${reactNativeVersion.minor}.${reactNativeVersion.patch}`
      : 'unknown',
  };
}
