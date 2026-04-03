import {Platform} from 'react-native';

import type {HardeningControl, HardeningRuntimeSnapshot} from './hardeningContracts';

export const hardeningControls: HardeningControl[] = [
  {
    id: 'android-backup-block',
    title: 'Disable Android backup and data extraction',
    platform: 'android',
    status: 'implemented',
    rationale:
      'Prevents app data from being copied out through backup and device transfer flows by default.',
  },
  {
    id: 'android-cleartext-block',
    title: 'Block Android cleartext traffic',
    platform: 'android',
    status: 'implemented',
    rationale:
      'Ensures network traffic must use encrypted transport unless an explicit security configuration allows otherwise.',
  },
  {
    id: 'ios-ats-strict',
    title: 'Keep App Transport Security strict',
    platform: 'ios',
    status: 'implemented',
    rationale:
      'Avoids broad ATS exceptions and keeps arbitrary loads disabled in production app policy.',
  },
  {
    id: 'secure-secrets',
    title: 'Store secrets in platform-backed secure storage',
    platform: 'cross-platform',
    status: 'implemented',
    rationale:
      'Sensitive credentials should never live in plain local persistence when Keychain and Keystore are available.',
  },
  {
    id: 'certificate-pinning',
    title: 'Pin first-party API certificates',
    platform: 'cross-platform',
    status: 'implemented',
    rationale:
      'Reduces MITM exposure for first-party network traffic when the team controls certificate lifecycle.',
  },
  {
    id: 'root-jailbreak-detection',
    title: 'Compromised-device handling',
    platform: 'cross-platform',
    status: 'pending',
    rationale:
      'Root and jailbreak response depends on product risk profile, legal requirements, and real device validation.',
  },
  {
    id: 'screenshot-protection',
    title: 'Sensitive-screen screenshot protection',
    platform: 'cross-platform',
    status: 'pending',
    rationale:
      'This should be applied only to sensitive surfaces and validated carefully for usability and support tooling.',
  },
];

export function getHardeningRuntimeSnapshot(): HardeningRuntimeSnapshot {
  return {
    newArchitectureEnabled: true,
    atsStrictMode: true,
    androidCleartextBlocked: Platform.OS === 'android',
    androidBackupBlocked: Platform.OS === 'android',
    screenshotProtectionImplemented: false,
  };
}
