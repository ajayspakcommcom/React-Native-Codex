import type {ReleaseWorkspace} from '../types';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const workspace: ReleaseWorkspace = {
  title: 'Release Control Workspace',
  releaseTrain: 'Train 2026.04',
  lanes: [
    {
      id: 'lane-1',
      team: 'Payments',
      owner: 'Ajay',
      status: 'blocked',
      pendingChecks: 2,
    },
    {
      id: 'lane-2',
      team: 'Catalog',
      owner: 'Mina',
      status: 'ready',
      pendingChecks: 0,
    },
    {
      id: 'lane-3',
      team: 'Growth',
      owner: 'Nikhil',
      status: 'review',
      pendingChecks: 1,
    },
  ],
};

export const releaseService = {
  loadWorkspace: async () => {
    await wait(160);
    return workspace;
  },
};
