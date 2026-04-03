import type {
  CrashCapturePolicy,
  CrashEventRecord,
  CrashProviderProfile,
} from './crashAnalyticsContracts';

export const crashProviderProfiles: readonly CrashProviderProfile[] = [
  {
    provider: 'sentry',
    strengths: [
      'Strong cross-platform issue workflow and ownership routing.',
      'Release and stack-trace workflows that fit broader error and tracing operations.',
      'Useful when one platform needs both JavaScript and native issue correlation in one place.',
    ],
    releaseRequirements: [
      'Release identifiers must be stable and match symbol/debug-file uploads.',
      'Native symbol and JavaScript source-map uploads must be tied to the exact deployed build.',
    ],
    operationalWarnings: [
      'Do not run multiple competing native crash handlers without a deliberate ownership policy.',
      'PII and breadcrumb policy should be reviewed before enabling broad context capture.',
    ],
  },
  {
    provider: 'firebase-crashlytics',
    strengths: [
      'Strong mobile-native crash reporting posture with issue grouping and release monitoring.',
      'Good fit when the organization is already invested in Firebase operational tooling.',
      'Android and Apple crash flows are well understood by mobile teams.',
    ],
    releaseRequirements: [
      'dSYMs and mapping files must be uploaded reliably for production symbolication.',
      'Console app registration and build pipeline integration must be in place before rollout.',
    ],
    operationalWarnings: [
      'Analytics and privacy posture should be reviewed if event context is expanded.',
      'If another SDK owns native crash signals, the production rule must be explicit.',
    ],
  },
];

export const crashCapturePolicy: readonly CrashCapturePolicy[] = [
  {
    provider: 'sentry',
    collectNativeCrashes: true,
    collectNonFatalErrors: true,
    collectBreadcrumbs: true,
    requiresSymbolUpload: true,
    supportsReleaseHealth: true,
    consentMode: 'opt-in',
  },
  {
    provider: 'firebase-crashlytics',
    collectNativeCrashes: true,
    collectNonFatalErrors: true,
    collectBreadcrumbs: true,
    requiresSymbolUpload: true,
    supportsReleaseHealth: true,
    consentMode: 'opt-in',
  },
];

export const crashExampleEvents: readonly CrashEventRecord[] = [
  {
    id: 'event-1',
    title: 'Checkout submission native crash',
    severity: 'fatal',
    context: {
      release: '2026.04.03-prod.4',
      environment: 'production',
      ownerTeam: 'commerce-mobile',
      moduleName: 'checkout',
    },
    tags: ['native', 'payments', 'ios'],
  },
  {
    id: 'event-2',
    title: 'Profile sync non-fatal serialization failure',
    severity: 'error',
    context: {
      release: '2026.04.03-staging.2',
      environment: 'staging',
      ownerTeam: 'identity-experience',
      moduleName: 'profile-sync',
    },
    tags: ['non-fatal', 'sync', 'android'],
  },
];
