import type {SyncConflict, SyncPolicy, SyncRecord} from './syncContracts';

export const conflictResolver = {
  resolve(records: readonly SyncRecord[], policy: SyncPolicy) {
    const conflicts: SyncConflict[] = [];

    for (const record of records) {
      const hasVersionConflict = record.localVersion !== record.serverVersion;
      const hasStateConflict = record.localApproved !== record.serverApproved;

      if (!hasVersionConflict && !hasStateConflict) {
        continue;
      }

      conflicts.push({
        recordId: record.id,
        resolution: policy,
        summary:
          policy === 'manual-review'
            ? `${record.service} requires operator review before reconciliation.`
            : policy === 'client-wins'
              ? `${record.service} keeps the local state during reconciliation.`
              : `${record.service} accepts the server snapshot during reconciliation.`,
      });
    }

    return conflicts;
  },
};
