export interface PinnedDomainPolicy {
  includeSubdomains: boolean;
  publicKeyHashes: string[];
  expirationDate?: string;
  owner: string;
  environment: 'staging' | 'production';
}

export interface PinningProfile {
  profileName: string;
  domains: Record<string, PinnedDomainPolicy>;
}

export interface PinningRuntimeStatus {
  nativeModuleAvailable: boolean;
  activeProfileName: string | null;
  configuredDomains: string[];
  lastError?: {
    serverHostname: string;
    message?: string;
  };
}
