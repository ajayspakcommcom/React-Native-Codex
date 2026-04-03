import type {PinningProfile} from './pinningContracts';

export const enterprisePinningProfile: PinningProfile = {
  profileName: 'enterprise-mobile-api',
  domains: {
    'api.reactnativecodex.internal': {
      includeSubdomains: true,
      publicKeyHashes: [
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
        'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=',
      ],
      expirationDate: '2026-12-31',
      owner: 'platform-security',
      environment: 'production',
    },
    'staging-api.reactnativecodex.internal': {
      includeSubdomains: false,
      publicKeyHashes: [
        'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC=',
        'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD=',
      ],
      expirationDate: '2026-12-31',
      owner: 'platform-security',
      environment: 'staging',
    },
  },
};
