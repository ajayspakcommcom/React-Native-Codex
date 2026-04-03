export type TokenTier = 'foundations' | 'semantic' | 'component';

export interface TokenGroup {
  id: string;
  tier: TokenTier;
  title: string;
  ownerTeam: string;
  examples: string[];
}

export interface ComponentContract {
  id: string;
  title: string;
  ownerTeam: string;
  supportedPlatforms: string[];
  status: 'stable' | 'experimental' | 'deprecated';
  dependencies: string[];
}

export interface DistributionSurface {
  id: string;
  channel: string;
  consumerScope: string;
  releaseRule: string;
}

export interface DesignSystemOperatingModel {
  tokenGroups: TokenGroup[];
  componentContracts: ComponentContract[];
  distributionSurfaces: DistributionSurface[];
  operatingPrinciples: string[];
}
