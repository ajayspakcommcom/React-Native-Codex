export type ExperimentEnvironment = 'development' | 'staging' | 'production';

export interface ExperimentVariant {
  key: string;
  title: string;
  allocationPercentage: number;
}

export interface ExperimentMetric {
  key: string;
  title: string;
  type: 'conversion' | 'guardrail' | 'latency';
}

export interface ExperimentDefinition {
  key: string;
  title: string;
  ownerTeam: string;
  environments: readonly ExperimentEnvironment[];
  variants: readonly ExperimentVariant[];
  primaryMetric: ExperimentMetric;
  guardrailMetrics: readonly ExperimentMetric[];
  expiresOn: string;
}

export interface ExperimentEvaluationContext {
  environment: ExperimentEnvironment;
  stableUserHashBucket: number;
  userSegments: readonly string[];
}

export interface ExperimentAssignment {
  experiment: ExperimentDefinition;
  assignedVariant: ExperimentVariant;
  reason: string;
}
