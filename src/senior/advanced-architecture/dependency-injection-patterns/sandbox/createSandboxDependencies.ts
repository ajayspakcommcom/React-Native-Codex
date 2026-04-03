import type {
  ObservabilitySummary,
  ReleaseApprovalItem,
  SeniorDependencies,
} from '../contracts/dependencyContracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

export const createSandboxDependencies = (): SeniorDependencies => {
  let approvals: ReleaseApprovalItem[] = [
    {
      id: 'sandbox-1',
      service: 'sandbox-checkout',
      environment: 'staging',
      owner: 'Demo Team',
      riskLevel: 'low',
      approved: false,
    },
    {
      id: 'sandbox-2',
      service: 'sandbox-search',
      environment: 'staging',
      owner: 'QA Team',
      riskLevel: 'medium',
      approved: false,
    },
  ];

  const summary: ObservabilitySummary = {
    source: 'sandbox-observability',
    alertBudgetRemaining: 98,
    activeIncidents: 0,
    deploymentFreeze: false,
  };

  return {
    releaseApprovalGateway: {
      listPendingApprovals: async () => {
        await wait(80);
        return approvals;
      },
      approve: async approvalId => {
        await wait(80);
        approvals = approvals.map(approval =>
          approval.id === approvalId ? {...approval, approved: true} : approval,
        );
        return approvals;
      },
    },
    observabilityGateway: {
      getSummary: async () => {
        await wait(60);
        return summary;
      },
    },
  };
};
