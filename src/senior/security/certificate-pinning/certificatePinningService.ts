import {
  addSslPinningErrorListener,
  disableSslPinning,
  initializeSslPinning,
  isSslPinningAvailable,
} from 'react-native-ssl-public-key-pinning';

import type {
  PinnedDomainPolicy,
  PinningProfile,
  PinningRuntimeStatus,
} from './pinningContracts';

function mapDomainsToNativeShape(profile: PinningProfile): Record<
  string,
  Pick<PinnedDomainPolicy, 'includeSubdomains' | 'publicKeyHashes' | 'expirationDate'>
> {
  return Object.fromEntries(
    Object.entries(profile.domains).map(([domain, policy]) => [
      domain,
      {
        includeSubdomains: policy.includeSubdomains,
        publicKeyHashes: policy.publicKeyHashes,
        expirationDate: policy.expirationDate,
      },
    ]),
  );
}

class CertificatePinningService {
  private activeProfile: PinningProfile | null = null;

  private lastError?: {
    serverHostname: string;
    message?: string;
  };

  private readonly errorSubscription = addSslPinningErrorListener(error => {
    this.lastError = error;
  });

  getStatus(): PinningRuntimeStatus {
    return {
      nativeModuleAvailable: isSslPinningAvailable(),
      activeProfileName: this.activeProfile?.profileName ?? null,
      configuredDomains: this.activeProfile ? Object.keys(this.activeProfile.domains) : [],
      lastError: this.lastError,
    };
  }

  async enable(profile: PinningProfile): Promise<PinningRuntimeStatus> {
    if (!isSslPinningAvailable()) {
      throw new Error('SSL public key pinning native module is not available.');
    }

    await initializeSslPinning(mapDomainsToNativeShape(profile));
    this.activeProfile = profile;
    return this.getStatus();
  }

  async disable(): Promise<PinningRuntimeStatus> {
    if (isSslPinningAvailable()) {
      await disableSslPinning();
    }

    this.activeProfile = null;
    return this.getStatus();
  }

  clearLastError(): PinningRuntimeStatus {
    this.lastError = undefined;
    return this.getStatus();
  }

  dispose(): void {
    this.errorSubscription.remove();
  }
}

export const certificatePinningService = new CertificatePinningService();
