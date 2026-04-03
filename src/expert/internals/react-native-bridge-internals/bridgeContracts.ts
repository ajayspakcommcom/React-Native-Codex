export type ArchitectureMode =
  | 'legacy-bridge'
  | 'new-architecture'
  | 'new-architecture-with-interop';

export type RuntimeThread =
  | 'javascript-thread'
  | 'bridge-queue'
  | 'native-module-thread'
  | 'ui-thread'
  | 'render-thread'
  | 'jsi-runtime';

export interface BridgePipelineStage {
  id: string;
  title: string;
  thread: RuntimeThread;
  description: string;
  costProfile: 'low' | 'medium' | 'high';
}

export interface RuntimeArchitectureSnapshot {
  architectureMode: ArchitectureMode;
  isHermesEnabled: boolean;
  isTurboModuleProxyAvailable: boolean;
  isBridgelessRuntime: boolean;
  reactNativeVersion: string;
}

export interface BridgeInternalsModel {
  legacyBridgeStages: BridgePipelineStage[];
  newArchitectureStages: BridgePipelineStage[];
  interopNotes: string[];
}
