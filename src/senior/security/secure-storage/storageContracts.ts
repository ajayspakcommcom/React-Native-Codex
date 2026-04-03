export type SecureRecordKind =
  | 'session'
  | 'refresh-token'
  | 'biometric-unlock-token';

export interface SecureStorageRecord {
  kind: SecureRecordKind;
  accountId: string;
  value: string;
  updatedAt: string;
  requiresBiometricPrompt: boolean;
}

export interface SecureStorageCapabilitySnapshot {
  supportedBiometry: string | null;
  passcodeAuthAvailable: boolean;
  canUseBiometricAccessControl: boolean;
  platformSecurityLevel: string | null;
}

export interface SecureStorageStatus {
  hasSession: boolean;
  hasRefreshToken: boolean;
  hasBiometricUnlockToken: boolean;
  capabilitySnapshot: SecureStorageCapabilitySnapshot;
}
