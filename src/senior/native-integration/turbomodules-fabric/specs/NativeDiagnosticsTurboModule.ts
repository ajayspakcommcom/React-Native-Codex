import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export type RuntimeTier = 'standard' | 'constrained' | 'critical';

export interface RuntimeSnapshot {
  platform: 'android' | 'ios';
  appVersion: string;
  deviceModel: string;
  lowPowerModeEnabled: boolean;
  performanceTier: RuntimeTier;
  diagnosticsSource: 'turbo-module';
}

export interface Spec extends TurboModule {
  getRuntimeSnapshot(): Promise<RuntimeSnapshot>;
}

export const NativeDiagnosticsTurboModule =
  TurboModuleRegistry.get<Spec>('RuntimeDiagnosticsTurboModule');
