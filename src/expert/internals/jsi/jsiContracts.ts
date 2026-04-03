export type JsiPrimitive =
  | 'host-function'
  | 'host-object'
  | 'turbo-module-binding'
  | 'runtime-global';

export interface JsiCapability {
  id: string;
  primitive: JsiPrimitive;
  title: string;
  description: string;
  ownership: 'javascript' | 'native' | 'shared';
}

export interface JsiRuntimeSnapshot {
  hasHermesRuntime: boolean;
  hasTurboModuleProxy: boolean;
  hasBridgelessRuntime: boolean;
  likelyJsiCapable: boolean;
}

export interface JsiArchitectureModel {
  primitives: JsiCapability[];
  designNotes: string[];
}
