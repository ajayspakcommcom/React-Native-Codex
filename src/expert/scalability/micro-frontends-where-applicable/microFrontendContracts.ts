export type CompositionMode =
  | 'shell-composed-module'
  | 'feature-flagged-slice'
  | 'separate-app-surface';

export interface MicroFrontendSlice {
  id: string;
  title: string;
  mode: CompositionMode;
  ownerTeam: string;
  releaseBoundary: string;
  sharedContractDependencies: string[];
  applicableForMobile: boolean;
}

export interface SliceBoundaryRule {
  id: string;
  rule: string;
  reason: string;
}

export interface MicroFrontendOperatingModel {
  slices: MicroFrontendSlice[];
  boundaryRules: SliceBoundaryRule[];
  operatingPrinciples: string[];
}
