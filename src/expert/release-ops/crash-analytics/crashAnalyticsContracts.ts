export type CrashAnalyticsProvider = 'sentry' | 'firebase-crashlytics';

export type CrashEventSeverity = 'fatal' | 'error' | 'warning';

export interface CrashContextRecord {
  release: string;
  environment: string;
  ownerTeam: string;
  moduleName: string;
}

export interface CrashProviderProfile {
  provider: CrashAnalyticsProvider;
  strengths: readonly string[];
  releaseRequirements: readonly string[];
  operationalWarnings: readonly string[];
}

export interface CrashCapturePolicy {
  provider: CrashAnalyticsProvider;
  collectNativeCrashes: boolean;
  collectNonFatalErrors: boolean;
  collectBreadcrumbs: boolean;
  requiresSymbolUpload: boolean;
  supportsReleaseHealth: boolean;
  consentMode: 'automatic' | 'opt-in';
}

export interface CrashEventRecord {
  id: string;
  title: string;
  severity: CrashEventSeverity;
  context: CrashContextRecord;
  tags: readonly string[];
}
