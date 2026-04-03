export interface ServiceHealthItem {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  region: string;
  latencyMs: number;
}
