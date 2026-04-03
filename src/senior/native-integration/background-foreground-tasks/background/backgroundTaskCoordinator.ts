import type {TaskPolicy, TaskRunSnapshot} from '../taskContracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const backgroundPolicies: TaskPolicy[] = [
  {
    id: 'offline-sync',
    label: 'Offline sync reconciliation',
    priority: 'critical',
    mode: 'background',
    maxRetries: 3,
    requiresNetwork: true,
    userVisible: false,
  },
  {
    id: 'upload-drain',
    label: 'Upload retry drain',
    priority: 'standard',
    mode: 'background',
    maxRetries: 4,
    requiresNetwork: true,
    userVisible: false,
  },
  {
    id: 'token-refresh',
    label: 'Token refresh maintenance',
    priority: 'deferred',
    mode: 'background',
    maxRetries: 2,
    requiresNetwork: true,
    userVisible: false,
  },
];

export const backgroundTaskCoordinator = {
  listPolicies: () => backgroundPolicies,
  runSimulation: async (): Promise<TaskRunSnapshot[]> => {
    await wait(180);

    return backgroundPolicies.map((policy, index) => ({
      id: `bg-${policy.id}`,
      policyId: policy.id,
      status: index === 1 ? 'failed' : 'completed',
      attempts: index === 1 ? 2 : 1,
      summary:
        index === 1
          ? 'Retry window kept the task in the queue for another scheduler pass.'
          : 'Task finished within background execution constraints.',
    }));
  },
};
