export type OwnershipCriticality = 'standard' | 'high' | 'platform-critical';

export interface OwnedCodeArea {
  id: string;
  areaName: string;
  pathPattern: string;
  primaryTeam: string;
  backupTeam: string;
  criticality: OwnershipCriticality;
  reviewRequirements: string[];
}

export interface EscalationRule {
  id: string;
  trigger: string;
  requiredParticipants: string[];
  resolutionPath: string;
}

export interface OwnershipOperatingModel {
  codeAreas: OwnedCodeArea[];
  escalationRules: EscalationRule[];
  operatingPrinciples: string[];
}
