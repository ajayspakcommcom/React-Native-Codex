export interface HardeningControl {
  id: string;
  title: string;
  platform: 'android' | 'ios' | 'cross-platform';
  status: 'implemented' | 'pending';
  rationale: string;
}

export interface HardeningRuntimeSnapshot {
  newArchitectureEnabled: boolean;
  atsStrictMode: boolean;
  androidCleartextBlocked: boolean;
  androidBackupBlocked: boolean;
  screenshotProtectionImplemented: boolean;
}
