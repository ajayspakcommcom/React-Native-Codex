export type NativeStatusTone =
  | 'nominal'
  | 'warning'
  | 'critical'
  | 'maintenance';

export interface NativeStatusSurfaceProps {
  title: string;
  subtitle: string;
  statusTone: NativeStatusTone;
  progressValue: number;
  attentionCount: number;
  testID?: string;
}

export interface NativeStatusSurfaceRecord {
  id: string;
  title: string;
  subtitle: string;
  statusTone: NativeStatusTone;
  progressValue: number;
  attentionCount: number;
}
