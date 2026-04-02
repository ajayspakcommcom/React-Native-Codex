export type TaskPriority = 'critical' | 'standard' | 'deferred';

export type TaskExecutionMode = 'background' | 'foreground';

export interface TaskPolicy {
  id: string;
  label: string;
  priority: TaskPriority;
  mode: TaskExecutionMode;
  maxRetries: number;
  requiresNetwork: boolean;
  userVisible: boolean;
}

export interface TaskRunSnapshot {
  id: string;
  policyId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  attempts: number;
  summary: string;
}
