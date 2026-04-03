export type FabricPipelinePhase =
  | 'reconciliation'
  | 'shadow-tree-build'
  | 'layout'
  | 'mounting'
  | 'event-dispatch'
  | 'commit';

export interface FabricPipelineStage {
  id: string;
  phase: FabricPipelinePhase;
  title: string;
  description: string;
  executionContext: 'javascript' | 'renderer' | 'ui-thread' | 'mixed';
}

export interface FabricRuntimeSnapshot {
  newArchitectureEnabled: boolean;
  fabricLikelyEnabled: boolean;
  turboModuleProxyAvailable: boolean;
  hermesEnabled: boolean;
}

export interface FabricArchitectureModel {
  stages: FabricPipelineStage[];
  designNotes: string[];
}
