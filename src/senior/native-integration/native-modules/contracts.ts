export type NativePerformanceTier = 'standard' | 'constrained' | 'critical';

export interface NativeRuntimeProfile {
  platform: 'android' | 'ios';
  operatingSystemVersion: string;
  deviceModel: string;
  appVersion: string;
  lowPowerModeEnabled: boolean;
  performanceTier: NativePerformanceTier;
  diagnosticsSource: 'native-module';
}
