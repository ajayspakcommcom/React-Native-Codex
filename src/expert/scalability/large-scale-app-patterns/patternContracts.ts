export type AppLayer =
  | 'shell'
  | 'platform'
  | 'domain'
  | 'shared'
  | 'observability';

export interface BoundedContext {
  id: string;
  name: string;
  owningLayer: AppLayer;
  ownerTeam: string;
  responsibility: string;
  dependencies: string[];
}

export interface DeploymentSurface {
  id: string;
  title: string;
  releaseCadence: string;
  failureBlastRadius: 'low' | 'medium' | 'high';
  owner: string;
}

export interface ScalabilityPatternModel {
  boundedContexts: BoundedContext[];
  deploymentSurfaces: DeploymentSurface[];
  operatingPrinciples: string[];
}
