export type ReleaseLaneStatus = 'ready' | 'blocked' | 'review';

export interface ReleaseLane {
  id: string;
  team: string;
  owner: string;
  status: ReleaseLaneStatus;
  pendingChecks: number;
}

export interface ReleaseWorkspace {
  title: string;
  releaseTrain: string;
  lanes: ReleaseLane[];
}
