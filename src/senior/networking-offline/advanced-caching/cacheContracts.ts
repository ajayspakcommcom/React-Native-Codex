export type CachePolicy = 'network-first' | 'cache-first' | 'stale-while-revalidate';

export interface CacheMetadata {
  cacheKey: string;
  cachedAt: number;
  expiresAt: number;
  staleAt: number;
  source: 'memory' | 'persistent' | 'network';
}

export interface CacheEntry<T> {
  metadata: CacheMetadata;
  value: T;
}

export interface CacheReadResult<T> {
  value: T;
  source: 'memory' | 'persistent' | 'network';
  freshness: 'fresh' | 'stale';
  metadata: CacheMetadata;
}

export interface ReleaseOverviewSnapshot {
  team: string;
  queueSize: number;
  blockedApprovals: number;
  region: 'ap-south-1' | 'eu-west-1' | 'us-east-1';
  generatedAt: string;
}
