export type HermesTuningArea =
  | 'runtime-verification'
  | 'release-bundle-shape'
  | 'source-maps'
  | 'memory-observation'
  | 'profiling'
  | 'binary-size';

export interface HermesTuningControl {
  id: string;
  area: HermesTuningArea;
  title: string;
  description: string;
  status: 'implemented' | 'guidance' | 'pending';
}

export interface HermesRuntimeSnapshot {
  hermesEnabledAtBuild: boolean;
  hermesRuntimeDetected: boolean;
  newArchitectureEnabled: boolean;
  releaseValidationRequired: boolean;
}
