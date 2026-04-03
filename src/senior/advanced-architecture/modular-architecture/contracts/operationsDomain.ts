export interface WorkspaceLane {
  id: string;
  label: string;
  owner: string;
  blockedTasks: number;
  releaseReady: boolean;
}

export interface WorkspaceSnapshot {
  releaseName: string;
  deploymentWindow: string;
  approvalOwner: string;
  lanes: WorkspaceLane[];
}

export interface IncidentSnapshot {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  owner: string;
  service: string;
  acknowledged: boolean;
}
