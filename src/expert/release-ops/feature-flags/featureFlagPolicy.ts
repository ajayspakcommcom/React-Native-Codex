import type {
  FeatureFlagDefinition,
  FeatureFlagEvaluationContext,
  FeatureFlagRollout,
  FeatureFlagSnapshot,
} from './featureFlagContracts';

export const featureFlagDefinitions: readonly FeatureFlagDefinition[] = [
  {
    key: 'checkout.native_payments_sheet',
    title: 'Native payments sheet',
    ownerTeam: 'commerce-mobile',
    expiresOn: '2026-06-30',
    environments: ['staging', 'production'],
  },
  {
    key: 'operations.incident_hotline',
    title: 'Incident hotline shortcut',
    ownerTeam: 'ops-platform',
    expiresOn: '2026-05-15',
    environments: ['development', 'staging', 'production'],
  },
  {
    key: 'identity.profile_sync_v2',
    title: 'Profile sync v2',
    ownerTeam: 'identity-experience',
    expiresOn: '2026-07-31',
    environments: ['staging', 'production'],
  },
];

export const featureFlagRollouts: readonly FeatureFlagRollout[] = [
  {
    key: 'checkout.native_payments_sheet',
    environment: 'production',
    mode: 'percentage',
    percentage: 25,
    allowlistSegments: [],
    defaultValue: false,
  },
  {
    key: 'operations.incident_hotline',
    environment: 'production',
    mode: 'global',
    percentage: 100,
    allowlistSegments: [],
    defaultValue: true,
  },
  {
    key: 'identity.profile_sync_v2',
    environment: 'staging',
    mode: 'internal-only',
    percentage: 0,
    allowlistSegments: ['employees', 'qa'],
    defaultValue: false,
  },
];

export function evaluateFlag(
  key: string,
  context: FeatureFlagEvaluationContext,
): FeatureFlagSnapshot {
  const definition = featureFlagDefinitions.find(item => item.key === key);

  if (definition == null) {
    throw new Error(`Unknown feature flag definition: ${key}`);
  }

  const rollout = featureFlagRollouts.find(
    item => item.key === key && item.environment === context.environment,
  );

  if (rollout == null) {
    return {
      definition,
      rollout: {
        key,
        environment: context.environment,
        mode: 'disabled',
        percentage: 0,
        allowlistSegments: [],
        defaultValue: false,
      },
      evaluatedValue: false,
      reason: 'No rollout configured for this environment.',
    };
  }

  switch (rollout.mode) {
    case 'global':
      return {
        definition,
        rollout,
        evaluatedValue: true,
        reason: 'Enabled globally for this environment.',
      };
    case 'disabled':
      return {
        definition,
        rollout,
        evaluatedValue: false,
        reason: 'Flag is disabled explicitly.',
      };
    case 'internal-only': {
      const isIncluded = context.userSegments.some(segment =>
        rollout.allowlistSegments.includes(segment),
      );

      return {
        definition,
        rollout,
        evaluatedValue: isIncluded,
        reason: isIncluded
          ? 'User is in an internal rollout segment.'
          : 'User is not in an internal rollout segment.',
      };
    }
    case 'allowlist': {
      const isIncluded = context.userSegments.some(segment =>
        rollout.allowlistSegments.includes(segment),
      );

      return {
        definition,
        rollout,
        evaluatedValue: isIncluded,
        reason: isIncluded
          ? 'User is explicitly allowlisted.'
          : 'User is not in an allowlisted audience.',
      };
    }
    case 'percentage': {
      const isEnabled = context.stableUserHashBucket < rollout.percentage;

      return {
        definition,
        rollout,
        evaluatedValue: isEnabled,
        reason: isEnabled
          ? `Bucket ${context.stableUserHashBucket} is inside the rollout percentage.`
          : `Bucket ${context.stableUserHashBucket} is outside the rollout percentage.`,
      };
    }
    default:
      return {
        definition,
        rollout,
        evaluatedValue: rollout.defaultValue,
        reason: 'Used default rollout value.',
      };
  }
}
