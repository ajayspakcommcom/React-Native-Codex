import type {MicroFrontendOperatingModel} from './microFrontendContracts';

export const microFrontendOperatingModel: MicroFrontendOperatingModel = {
  slices: [
    {
      id: 'operations-slice',
      title: 'Operations slice',
      mode: 'shell-composed-module',
      ownerTeam: 'operations-experience',
      releaseBoundary: 'feature-flagged inside the mobile shell',
      sharedContractDependencies: ['navigation contracts', 'design system', 'identity session'],
      applicableForMobile: true,
    },
    {
      id: 'commerce-slice',
      title: 'Commerce slice',
      mode: 'shell-composed-module',
      ownerTeam: 'commerce-mobile',
      releaseBoundary: 'domain-owned release readiness inside app-store release train',
      sharedContractDependencies: ['pricing contracts', 'design system', 'analytics contracts'],
      applicableForMobile: true,
    },
    {
      id: 'admin-console-surface',
      title: 'Admin console surface',
      mode: 'separate-app-surface',
      ownerTeam: 'ops-platform',
      releaseBoundary: 'deployed separately as a dedicated app or web/admin client',
      sharedContractDependencies: ['shared domain types', 'auth contracts'],
      applicableForMobile: true,
    },
    {
      id: 'runtime-remote-federation',
      title: 'Runtime remote federation',
      mode: 'separate-app-surface',
      ownerTeam: 'platform-architecture',
      releaseBoundary: 'not preferred for native mobile shell composition',
      sharedContractDependencies: ['remote runtime loader', 'version compatibility matrix'],
      applicableForMobile: false,
    },
  ],
  boundaryRules: [
    {
      id: 'shell-ownership',
      rule: 'The mobile shell owns composition, navigation bootstrap, and global session state.',
      reason: 'Without shell ownership, feature slices fight over startup and release-critical responsibilities.',
    },
    {
      id: 'shared-contract-only',
      rule: 'Feature slices can depend only on shared contracts, not on each other’s private internals.',
      reason: 'This preserves independent ownership and prevents hidden cross-team coupling.',
    },
    {
      id: 'mobile-federation-warning',
      rule: 'Treat remote runtime federation as an exception, not a default mobile pattern.',
      reason: 'Native mobile apps have stricter runtime, review, store, and offline constraints than the web.',
    },
  ],
  operatingPrinciples: [
    'For mobile, “micro-frontends” usually means shell-composed domain slices with strong boundaries, not browser-style remote bundles loaded arbitrarily at runtime.',
    'If a surface truly needs independent deployment, it is often cleaner to split it into a separate app surface rather than force web-style federation into the native shell.',
    'The architecture only scales if shared contracts stay stable and domain slices are allowed to own their release readiness inside the shared shell.',
    'Micro-frontend patterns are only applicable when the cost of team isolation is lower than the cost of cross-domain coupling.',
  ],
};
