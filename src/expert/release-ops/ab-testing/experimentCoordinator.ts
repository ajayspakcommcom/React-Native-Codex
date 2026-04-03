import {assignExperiment, experiments} from './experimentPolicy';
import type {
  ExperimentAssignment,
  ExperimentEvaluationContext,
} from './experimentContracts';

const experimentationRules = [
  'Every experiment needs a primary metric and guardrails before rollout.',
  'Variant allocation should be deterministic for the same user identity.',
  'Experiments should have an expiration date and cleanup plan.',
  'Exposure and conversion events should be captured consistently through a single analytics pipeline.',
] as const;

export function getExperimentAssignments(
  context: ExperimentEvaluationContext,
): readonly ExperimentAssignment[] {
  return experiments.map(experiment => assignExperiment(experiment.key, context));
}

export function getExperimentGovernanceSnapshot() {
  return {
    experiments,
    experimentationRules,
  };
}
