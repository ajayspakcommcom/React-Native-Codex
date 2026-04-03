import {createMMKV} from 'react-native-mmkv';

import type {CacheEntry} from './cacheContracts';

const storage = createMMKV({
  id: 'senior-advanced-cache',
});

const getStorageKey = (cacheKey: string) => `advanced-cache:${cacheKey}`;

export const cacheStorage = {
  read<T>(cacheKey: string) {
    const serialized = storage.getString(getStorageKey(cacheKey));

    if (!serialized) {
      return null;
    }

    try {
      return JSON.parse(serialized) as CacheEntry<T>;
    } catch {
      storage.remove(getStorageKey(cacheKey));
      return null;
    }
  },
  write<T>(cacheKey: string, entry: CacheEntry<T>) {
    storage.set(getStorageKey(cacheKey), JSON.stringify(entry));
  },
  clear(cacheKey: string) {
    storage.remove(getStorageKey(cacheKey));
  },
};
