import type {
  ExperimentAssignment,
  ExperimentDefinition,
  ExperimentEvaluationContext,
} from './experimentContracts';

export const experiments: readonly ExperimentDefinition[] = [
  {
    key: 'checkout.submit-sheet-layout',
    title: 'Checkout submit sheet layout',
    ownerTeam: 'commerce-mobile',
    environments: ['staging', 'production'],
    variants: [
      {key: 'control', title: 'Control layout', allocationPercentage: 50},
      {key: 'variant-a', title: 'Condensed confirmation layout', allocationPercentage: 50},
    ],
    primaryMetric: {
      key: 'checkout_submit_conversion',
      title: 'Checkout submit conversion',
      type: 'conversion',
    },
    guardrailMetrics: [
      {
        key: 'checkout_submit_latency_p95',
        title: 'Checkout submit latency p95',
        type: 'latency',
      },
      {
        key: 'checkout_crash_rate',
        title: 'Checkout crash rate',
        type: 'guardrail',
      },
    ],
    expiresOn: '2026-06-15',
  },
  {
    key: 'support.incident-entry',
    title: 'Incident entry CTA placement',
    ownerTeam: 'ops-platform',
    environments: ['staging', 'production'],
    variants: [
      {key: 'control', title: 'Top navigation CTA', allocationPercentage: 33},
      {key: 'variant-a', title: 'Inline workspace CTA', allocationPercentage: 34},
      {key: 'variant-b', title: 'Persistent command rail CTA', allocationPercentage: 33},
    ],
    primaryMetric: {
      key: 'incident_entry_rate',
      title: 'Incident entry rate',
      type: 'conversion',
    },
    guardrailMetrics: [
      {
        key: 'incident_screen_exit_rate',
        title: 'Incident screen exit rate',
        type: 'guardrail',
      },
    ],
    expiresOn: '2026-05-30',
  },
];

export function assignExperiment(
  experimentKey: string,
  context: ExperimentEvaluationContext,
): ExperimentAssignment {
  const experiment = experiments.find(item => item.key === experimentKey);

  if (experiment == null) {
    throw new Error(`Unknown experiment definition: ${experimentKey}`);
  }

  if (!experiment.environments.includes(context.environment)) {
    return {
      experiment,
      assignedVariant: experiment.variants[0],
      reason: 'Experiment is not enabled in this environment.',
    };
  }

  let runningTotal = 0;

  for (const variant of experiment.variants) {
    runningTotal += variant.allocationPercentage;

    if (context.stableUserHashBucket < runningTotal) {
      return {
        experiment,
        assignedVariant: variant,
        reason: `Stable bucket ${context.stableUserHashBucket} maps to variant ${variant.key}.`,
      };
    }
  }

  return {
    experiment,
    assignedVariant: experiment.variants[0],
    reason: 'Fallback assignment applied because the rollout percentages did not cover the full range.',
  };
}
