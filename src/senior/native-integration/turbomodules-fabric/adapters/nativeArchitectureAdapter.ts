import {Platform} from 'react-native';

import {nativeRuntimeBridge} from '../../native-modules/NativeRuntimeBridge';
import type {NativeRuntimeProfile} from '../../native-modules/contracts';
import {NativeDiagnosticsTurboModule} from '../specs/NativeDiagnosticsTurboModule';

type RuntimeProfile =
  | NativeRuntimeProfile
  | {
      platform: 'android' | 'ios';
      appVersion: string;
      deviceModel: string;
      lowPowerModeEnabled: boolean;
      performanceTier: 'standard' | 'constrained' | 'critical';
      diagnosticsSource: 'turbo-module';
    };

export const nativeArchitectureAdapter = {
  getRuntimeProfile: async (): Promise<RuntimeProfile> => {
    if (NativeDiagnosticsTurboModule) {
      return NativeDiagnosticsTurboModule.getRuntimeSnapshot();
    }

    return nativeRuntimeBridge.getRuntimeProfile();
  },
  getExecutionPath: () =>
    NativeDiagnosticsTurboModule ? 'turbo-module' : 'legacy-native-module',
  getFabricReadinessSummary: () => ({
    platform: Platform.OS,
    fabricComponentSpec: 'CommandDeckSurface',
    status: 'spec-defined-pending-native-codegen',
  }),
};
