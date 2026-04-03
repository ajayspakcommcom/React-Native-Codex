export type FlagEnvironment = 'development' | 'staging' | 'production';

export type FlagRolloutMode =
  | 'disabled'
  | 'internal-only'
  | 'percentage'
  | 'allowlist'
  | 'global';

export interface FeatureFlagDefinition {
  key: string;
  title: string;
  ownerTeam: string;
  expiresOn: string;
  environments: readonly FlagEnvironment[];
}

export interface FeatureFlagRollout {
  key: string;
  environment: FlagEnvironment;
  mode: FlagRolloutMode;
  percentage: number;
  allowlistSegments: readonly string[];
  defaultValue: boolean;
}

export interface FeatureFlagEvaluationContext {
  environment: FlagEnvironment;
  userSegments: readonly string[];
  stableUserHashBucket: number;
}

export interface FeatureFlagSnapshot {
  definition: FeatureFlagDefinition;
  rollout: FeatureFlagRollout;
  evaluatedValue: boolean;
  reason: string;
}
