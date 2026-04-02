import type {TaskPolicy} from '../taskContracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const foregroundPolicies: TaskPolicy[] = [
  {
    id: 'checkout-submit',
    label: 'Checkout submission',
    priority: 'critical',
    mode: 'foreground',
    maxRetries: 0,
    requiresNetwork: true,
    userVisible: true,
  },
  {
    id: 'media-upload',
    label: 'Interactive media upload',
    priority: 'standard',
    mode: 'foreground',
    maxRetries: 1,
    requiresNetwork: true,
    userVisible: true,
  },
  {
    id: 'live-search',
    label: 'Live search refinement',
    priority: 'deferred',
    mode: 'foreground',
    maxRetries: 0,
    requiresNetwork: false,
    userVisible: true,
  },
];

export const foregroundTaskCoordinator = {
  listPolicies: () => foregroundPolicies,
  runTask: async (policyId: string) => {
    await wait(180);

    const policy = foregroundPolicies.find(item => item.id === policyId);

    if (!policy) {
      throw new Error(`Unknown foreground policy: ${policyId}`);
    }

    return {
      policy,
      completionMessage:
        policy.id === 'media-upload'
          ? 'Upload finished with immediate UI feedback and a final progress state.'
          : 'Foreground task completed with user-visible confirmation.',
    };
  },
};
