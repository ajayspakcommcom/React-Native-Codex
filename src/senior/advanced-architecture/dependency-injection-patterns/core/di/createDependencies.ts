import type {
  ObservabilitySummary,
  ReleaseApprovalItem,
  SeniorDependencies,
} from '../../contracts/dependencyContracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

export const createProductionDependencies = (): SeniorDependencies => {
  let approvals: ReleaseApprovalItem[] = [
    {
      id: 'approval-101',
      service: 'checkout-core',
      environment: 'production',
      owner: 'Aisha',
      riskLevel: 'high',
      approved: false,
    },
    {
      id: 'approval-102',
      service: 'catalog-api',
      environment: 'staging',
      owner: 'Rahul',
      riskLevel: 'medium',
      approved: true,
    },
    {
      id: 'approval-103',
      service: 'fraud-shield',
      environment: 'production',
      owner: 'Sana',
      riskLevel: 'high',
      approved: false,
    },
  ];

  let summary: ObservabilitySummary = {
    source: 'production-observability',
    alertBudgetRemaining: 72,
    activeIncidents: 2,
    deploymentFreeze: true,
  };

  return {
    releaseApprovalGateway: {
      listPendingApprovals: async () => {
        await wait(180);
        return approvals;
      },
      approve: async approvalId => {
        await wait(180);
        approvals = approvals.map(approval =>
          approval.id === approvalId ? {...approval, approved: true} : approval,
        );
        return approvals;
      },
    },
    observabilityGateway: {
      getSummary: async () => {
        await wait(160);
        return summary;
      },
    },
  };
};
