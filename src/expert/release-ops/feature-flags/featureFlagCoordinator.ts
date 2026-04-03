import {
  evaluateFlag,
  featureFlagDefinitions,
  featureFlagRollouts,
} from './featureFlagPolicy';
import type {
  FeatureFlagEvaluationContext,
  FeatureFlagSnapshot,
} from './featureFlagContracts';

const governanceRules = [
  'Every flag should have an owner team and an expiration date.',
  'Production changes should be auditable and tied to a rollout reason.',
  'Kill switches should prefer safe defaults for critical flows.',
  'Flags should be removed after rollout, not left behind as permanent branching.',
] as const;

export function getFeatureFlagSnapshots(
  context: FeatureFlagEvaluationContext,
): readonly FeatureFlagSnapshot[] {
  return featureFlagDefinitions.map(definition =>
    evaluateFlag(definition.key, context),
  );
}

export function getFeatureFlagGovernanceSnapshot() {
  return {
    definitions: featureFlagDefinitions,
    rollouts: featureFlagRollouts,
    governanceRules,
  };
}
