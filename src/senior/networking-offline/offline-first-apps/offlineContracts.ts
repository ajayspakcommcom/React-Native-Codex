export interface ApprovalTask {
  id: string;
  service: string;
  owner: string;
  environment: 'staging' | 'production';
  approved: boolean;
  updatedAt: string;
}

export interface QueuedMutation {
  id: string;
  taskId: string;
  nextApprovedValue: boolean;
  createdAt: string;
  status: 'queued' | 'synced';
}

export interface OfflineBoardState {
  tasks: ApprovalTask[];
  queuedMutations: QueuedMutation[];
  lastSuccessfulSyncAt: string | null;
}

export interface OfflineBoardSnapshot extends OfflineBoardState {
  unsyncedCount: number;
  mode: 'offline' | 'online';
}
