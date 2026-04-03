import {Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';

import {getSecureStorageCapabilities} from './deviceSecurityProbe';
import type {
  SecureStorageCapabilitySnapshot,
  SecureStorageRecord,
  SecureStorageStatus,
} from './storageContracts';

const services = {
  session: 'com.reactnativecodex.secure.session',
  refreshToken: 'com.reactnativecodex.secure.refresh-token',
  biometricUnlockToken: 'com.reactnativecodex.secure.biometric-unlock-token',
} as const;

function getBaseAuthenticationPrompt(title: string) {
  return {
    title,
    subtitle: 'ReactNativeCodex secure storage',
    description: 'Authenticate to access protected credentials.',
    cancel: 'Cancel',
  };
}

async function saveRecord(
  service: string,
  record: SecureStorageRecord,
  useBiometricAccessControl: boolean,
): Promise<void> {
  const serializedRecord = JSON.stringify(record);

  const result = await Keychain.setGenericPassword(
    record.accountId,
    serializedRecord,
    {
      service,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      authenticationPrompt: getBaseAuthenticationPrompt(
        'Authenticate to save secure credentials',
      ),
      accessControl: useBiometricAccessControl
        ? Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE
        : undefined,
      securityLevel:
        Platform.OS === 'android'
          ? Keychain.SECURITY_LEVEL.SECURE_HARDWARE
          : undefined,
      storage:
        Platform.OS === 'android' && useBiometricAccessControl
          ? Keychain.STORAGE_TYPE.AES_GCM
          : Platform.OS === 'android'
            ? Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH
            : undefined,
    },
  );

  if (!result) {
    throw new Error('Secure storage write failed.');
  }
}

async function readRecord(
  service: string,
  title: string,
): Promise<SecureStorageRecord | null> {
  const credentials = await Keychain.getGenericPassword({
    service,
    authenticationPrompt: getBaseAuthenticationPrompt(title),
  });

  if (!credentials) {
    return null;
  }

  return JSON.parse(credentials.password) as SecureStorageRecord;
}

async function hasRecord(service: string): Promise<boolean> {
  return Keychain.hasGenericPassword({service});
}

async function clearRecord(service: string): Promise<void> {
  await Keychain.resetGenericPassword({service});
}

export const secureVaultService = {
  async getCapabilities(): Promise<SecureStorageCapabilitySnapshot> {
    return getSecureStorageCapabilities();
  },

  async saveSession(accountId: string, sessionToken: string): Promise<void> {
    await saveRecord(
      services.session,
      {
        kind: 'session',
        accountId,
        value: sessionToken,
        updatedAt: new Date().toISOString(),
        requiresBiometricPrompt: false,
      },
      false,
    );
  },

  async saveRefreshToken(accountId: string, refreshToken: string): Promise<void> {
    await saveRecord(
      services.refreshToken,
      {
        kind: 'refresh-token',
        accountId,
        value: refreshToken,
        updatedAt: new Date().toISOString(),
        requiresBiometricPrompt: false,
      },
      false,
    );
  },

  async saveBiometricUnlockToken(
    accountId: string,
    biometricUnlockToken: string,
  ): Promise<void> {
    await saveRecord(
      services.biometricUnlockToken,
      {
        kind: 'biometric-unlock-token',
        accountId,
        value: biometricUnlockToken,
        updatedAt: new Date().toISOString(),
        requiresBiometricPrompt: true,
      },
      true,
    );
  },

  async readSession(): Promise<SecureStorageRecord | null> {
    return readRecord(services.session, 'Authenticate to read the session token');
  },

  async readRefreshToken(): Promise<SecureStorageRecord | null> {
    return readRecord(
      services.refreshToken,
      'Authenticate to read the refresh token',
    );
  },

  async readBiometricUnlockToken(): Promise<SecureStorageRecord | null> {
    return readRecord(
      services.biometricUnlockToken,
      'Authenticate to read the biometric unlock token',
    );
  },

  async clearAll(): Promise<void> {
    await Promise.all([
      clearRecord(services.session),
      clearRecord(services.refreshToken),
      clearRecord(services.biometricUnlockToken),
    ]);
  },

  async getStatus(): Promise<SecureStorageStatus> {
    const [hasSession, hasRefreshToken, hasBiometricUnlockToken, capabilitySnapshot] =
      await Promise.all([
        hasRecord(services.session),
        hasRecord(services.refreshToken),
        hasRecord(services.biometricUnlockToken),
        this.getCapabilities(),
      ]);

    return {
      hasSession,
      hasRefreshToken,
      hasBiometricUnlockToken,
      capabilitySnapshot,
    };
  },
};
