import {
  crashCapturePolicy,
  crashExampleEvents,
  crashProviderProfiles,
} from './crashAnalyticsPolicy';
import type {
  CrashAnalyticsProvider,
  CrashCapturePolicy,
  CrashContextRecord,
  CrashEventRecord,
  CrashProviderProfile,
} from './crashAnalyticsContracts';

export interface CrashAnalyticsSnapshot {
  activeProvider: CrashAnalyticsProvider;
  policy: CrashCapturePolicy;
  profile: CrashProviderProfile;
  sampleEvents: readonly CrashEventRecord[];
  governanceRules: readonly string[];
}

const governanceRules = [
  'Product code should log through the analytics coordinator, not directly through a provider SDK.',
  'Only one native crash owner should be authoritative in production unless a split policy is documented and validated.',
  'Release, environment, and owner-team metadata should be attached consistently to every captured event.',
  'Consent and privacy posture should be reviewed before enabling broad user context or breadcrumbs.',
] as const;

export function getCrashAnalyticsSnapshot(
  provider: CrashAnalyticsProvider,
): CrashAnalyticsSnapshot {
  const policy = crashCapturePolicy.find(item => item.provider === provider);
  const profile = crashProviderProfiles.find(item => item.provider === provider);

  if (policy == null || profile == null) {
    throw new Error(`Unsupported crash analytics provider: ${provider}`);
  }

  return {
    activeProvider: provider,
    policy,
    profile,
    sampleEvents: crashExampleEvents,
    governanceRules,
  };
}

export function buildCrashContext(
  context: CrashContextRecord,
): Record<string, string> {
  return {
    release: context.release,
    environment: context.environment,
    ownerTeam: context.ownerTeam,
    moduleName: context.moduleName,
  };
}
