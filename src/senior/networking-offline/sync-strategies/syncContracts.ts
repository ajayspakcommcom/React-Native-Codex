export type SyncPolicy = 'server-wins' | 'client-wins' | 'manual-review';

export interface SyncCheckpoint {
  cursor: string;
  syncedAt: string;
}

export interface SyncRecord {
  id: string;
  service: string;
  localVersion: number;
  serverVersion: number;
  localApproved: boolean;
  serverApproved: boolean;
}

export interface SyncConflict {
  recordId: string;
  resolution: SyncPolicy;
  summary: string;
}

export interface SyncRunResult {
  checkpoint: SyncCheckpoint;
  pushedCount: number;
  pulledCount: number;
  conflicts: SyncConflict[];
  summary: string;
}
