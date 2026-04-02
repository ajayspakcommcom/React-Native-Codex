import {NativeModules, Platform} from 'react-native';

import type {NativeRuntimeProfile} from './contracts';

type NativeRuntimeDiagnosticsModule = {
  getRuntimeProfile: () => Promise<NativeRuntimeProfile>;
};

const MODULE_NAME = 'RuntimeDiagnosticsModule';

const nativeModule = NativeModules[MODULE_NAME] as
  | NativeRuntimeDiagnosticsModule
  | undefined;

const assertNativeModule = () => {
  if (!nativeModule) {
    throw new Error(
      `${MODULE_NAME} is not linked for ${Platform.OS}. Verify native registration before using the wrapper.`,
    );
  }

  return nativeModule;
};

export const nativeRuntimeBridge = {
  getRuntimeProfile: async () => {
    const module = assertNativeModule();
    return module.getRuntimeProfile();
  },
};
