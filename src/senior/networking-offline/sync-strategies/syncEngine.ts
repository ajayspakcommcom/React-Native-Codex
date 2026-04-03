import {conflictResolver} from './conflictResolver';
import {syncCheckpointStore} from './syncCheckpointStore';
import type {
  SyncCheckpoint,
  SyncPolicy,
  SyncRecord,
  SyncRunResult,
} from './syncContracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const syncRecords: SyncRecord[] = [
  {
    id: 'sync-301',
    service: 'checkout-core',
    localVersion: 4,
    serverVersion: 3,
    localApproved: true,
    serverApproved: false,
  },
  {
    id: 'sync-302',
    service: 'catalog-api',
    localVersion: 5,
    serverVersion: 5,
    localApproved: true,
    serverApproved: true,
  },
  {
    id: 'sync-303',
    service: 'risk-engine',
    localVersion: 2,
    serverVersion: 4,
    localApproved: false,
    serverApproved: true,
  },
];

const advanceCheckpoint = (): SyncCheckpoint => {
  const checkpoint = {
    cursor: `cursor-${new Date().toISOString()}`,
    syncedAt: new Date().toISOString(),
  };

  syncCheckpointStore.write(checkpoint);
  return checkpoint;
};

export const syncEngine = {
  getCheckpoint() {
    return syncCheckpointStore.read();
  },
  async run(policy: SyncPolicy): Promise<SyncRunResult> {
    await wait(220);

    const conflicts = conflictResolver.resolve(syncRecords, policy);
    const checkpoint = advanceCheckpoint();

    return {
      checkpoint,
      pushedCount: 2,
      pulledCount: 3,
      conflicts,
      summary:
        conflicts.length === 0
          ? 'Push and pull completed with no reconciliation conflicts.'
          : 'Push and pull completed with explicit conflict handling.',
    };
  },
};
