export interface ReleaseApprovalItem {
  id: string;
  service: string;
  environment: 'staging' | 'production';
  owner: string;
  riskLevel: 'low' | 'medium' | 'high';
  approved: boolean;
}

export interface ObservabilitySummary {
  source: string;
  alertBudgetRemaining: number;
  activeIncidents: number;
  deploymentFreeze: boolean;
}

export interface ReleaseApprovalGateway {
  listPendingApprovals: () => Promise<ReleaseApprovalItem[]>;
  approve: (approvalId: string) => Promise<ReleaseApprovalItem[]>;
}

export interface ObservabilityGateway {
  getSummary: () => Promise<ObservabilitySummary>;
}

export interface SeniorDependencies {
  releaseApprovalGateway: ReleaseApprovalGateway;
  observabilityGateway: ObservabilityGateway;
}
