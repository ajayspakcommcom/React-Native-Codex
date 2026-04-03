export type OtaProviderName = 'eas-update' | 'self-hosted';

export type OtaChannel = 'internal' | 'staging' | 'production';

export type OtaRolloutState =
  | 'idle'
  | 'checking'
  | 'available'
  | 'downloading'
  | 'ready'
  | 'up-to-date'
  | 'failed';

export interface OtaUpdateManifest {
  id: string;
  runtimeVersion: string;
  channel: OtaChannel;
  semanticVersion: string;
  createdAt: string;
  message: string;
  critical: boolean;
  rolloutPercentage: number;
}

export interface OtaCheckResult {
  isAvailable: boolean;
  manifest?: OtaUpdateManifest;
  checkedAt: string;
}

export interface OtaLaunchPolicy {
  channel: OtaChannel;
  applyOnNextRestart: boolean;
  allowCriticalImmediateApply: boolean;
  minimumBackgroundDurationMs: number;
}

export interface OtaStatusSnapshot {
  provider: OtaProviderName;
  state: OtaRolloutState;
  channel: OtaChannel;
  checkedAt?: string;
  downloadedManifestId?: string;
  launchedManifestId?: string;
  errorMessage?: string;
}

export interface OtaUpdateProvider {
  readonly providerName: OtaProviderName;
  getStatus(): Promise<OtaStatusSnapshot>;
  checkForUpdate(channel: OtaChannel): Promise<OtaCheckResult>;
  downloadUpdate(manifest: OtaUpdateManifest): Promise<OtaStatusSnapshot>;
  applyUpdate(options: { immediate: boolean }): Promise<OtaStatusSnapshot>;
}
