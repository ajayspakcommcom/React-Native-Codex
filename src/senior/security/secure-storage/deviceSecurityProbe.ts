import {Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';

import type {SecureStorageCapabilitySnapshot} from './storageContracts';

export async function getSecureStorageCapabilities(): Promise<SecureStorageCapabilitySnapshot> {
  const [supportedBiometry, passcodeAuthAvailable, canUseBiometricAccessControl] =
    await Promise.all([
      Keychain.getSupportedBiometryType(),
      Keychain.isPasscodeAuthAvailable(),
      Keychain.canImplyAuthentication(),
    ]);

  const platformSecurityLevel =
    Platform.OS === 'android' ? await Keychain.getSecurityLevel() : null;

  return {
    supportedBiometry,
    passcodeAuthAvailable,
    canUseBiometricAccessControl,
    platformSecurityLevel:
      platformSecurityLevel === null ? null : Keychain.SECURITY_LEVEL[platformSecurityLevel],
  };
}
