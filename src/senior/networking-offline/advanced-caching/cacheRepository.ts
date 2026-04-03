import {cacheStorage} from './cacheStorage';
import type {
  CacheEntry,
  CacheMetadata,
  CachePolicy,
  CacheReadResult,
  ReleaseOverviewSnapshot,
} from './cacheContracts';

const HOT_CACHE = new Map<string, CacheEntry<ReleaseOverviewSnapshot>>();
const TTL_MS = 1000 * 60 * 4;
const STALE_WINDOW_MS = 1000 * 60 * 8;

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const createMetadata = (
  cacheKey: string,
  source: CacheMetadata['source'],
): CacheMetadata => {
  const cachedAt = Date.now();

  return {
    cacheKey,
    cachedAt,
    expiresAt: cachedAt + TTL_MS,
    staleAt: cachedAt + STALE_WINDOW_MS,
    source,
  };
};

const buildNetworkSnapshot = async (
  region: ReleaseOverviewSnapshot['region'],
): Promise<ReleaseOverviewSnapshot> => {
  await wait(180);

  const base = {
    'ap-south-1': {
      queueSize: 7,
      blockedApprovals: 2,
      team: 'Platform Governance',
    },
    'eu-west-1': {
      queueSize: 5,
      blockedApprovals: 1,
      team: 'Catalog Operations',
    },
    'us-east-1': {
      queueSize: 9,
      blockedApprovals: 3,
      team: 'Growth Release Operations',
    },
  } as const;

  return {
    region,
    queueSize: base[region].queueSize,
    blockedApprovals: base[region].blockedApprovals,
    team: base[region].team,
    generatedAt: new Date().toISOString(),
  };
};

const isExpired = (metadata: CacheMetadata) => metadata.expiresAt <= Date.now();
const isStale = (metadata: CacheMetadata) => metadata.staleAt <= Date.now();

const toReadResult = (
  entry: CacheEntry<ReleaseOverviewSnapshot>,
): CacheReadResult<ReleaseOverviewSnapshot> => ({
  value: entry.value,
  source: entry.metadata.source,
  freshness: isExpired(entry.metadata) ? 'stale' : 'fresh',
  metadata: entry.metadata,
});

const persistHotEntry = (
  cacheKey: string,
  source: CacheMetadata['source'],
  value: ReleaseOverviewSnapshot,
) => {
  const entry: CacheEntry<ReleaseOverviewSnapshot> = {
    value,
    metadata: createMetadata(cacheKey, source),
  };

  HOT_CACHE.set(cacheKey, entry);
  cacheStorage.write(cacheKey, entry);

  return toReadResult(entry);
};

const readAnyCache = (cacheKey: string) => {
  const hotEntry = HOT_CACHE.get(cacheKey);

  if (hotEntry) {
    return toReadResult(hotEntry);
  }

  const persistedEntry = cacheStorage.read<ReleaseOverviewSnapshot>(cacheKey);

  if (!persistedEntry) {
    return null;
  }

  HOT_CACHE.set(cacheKey, persistedEntry);
  return toReadResult({
    ...persistedEntry,
    metadata: {
      ...persistedEntry.metadata,
      source: 'persistent',
    },
  });
};

export const releaseOverviewCacheRepository = {
  async resolve(
    region: ReleaseOverviewSnapshot['region'],
    policy: CachePolicy,
  ): Promise<CacheReadResult<ReleaseOverviewSnapshot>> {
    const cacheKey = `release-overview:${region}`;
    const cached = readAnyCache(cacheKey);

    if (policy === 'cache-first' && cached && !isStale(cached.metadata)) {
      return cached;
    }

    if (policy === 'stale-while-revalidate' && cached) {
      if (isExpired(cached.metadata)) {
        const networkValue = await buildNetworkSnapshot(region);
        return persistHotEntry(cacheKey, 'network', networkValue);
      }

      const refreshInBackground = async () => {
        const networkValue = await buildNetworkSnapshot(region);
        persistHotEntry(cacheKey, 'network', networkValue);
      };

      refreshInBackground().catch(() => undefined);

      return cached;
    }

    if (policy === 'network-first') {
      try {
        const networkValue = await buildNetworkSnapshot(region);
        return persistHotEntry(cacheKey, 'network', networkValue);
      } catch (error) {
        if (cached) {
          return cached;
        }

        throw error;
      }
    }

    if (cached) {
      return cached;
    }

    const networkValue = await buildNetworkSnapshot(region);
    return persistHotEntry(cacheKey, 'network', networkValue);
  },
  clear(region: ReleaseOverviewSnapshot['region']) {
    const cacheKey = `release-overview:${region}`;
    HOT_CACHE.delete(cacheKey);
    cacheStorage.clear(cacheKey);
  },
};
