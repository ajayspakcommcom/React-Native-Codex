import {createMMKV} from 'react-native-mmkv';

import type {SyncCheckpoint} from './syncContracts';

const storage = createMMKV({
  id: 'senior-sync-checkpoints',
});

const STORAGE_KEY = 'sync-strategy:checkpoint';

const initialCheckpoint: SyncCheckpoint = {
  cursor: 'cursor-2026-04-03T08:30:00Z',
  syncedAt: '2026-04-03T08:30:00Z',
};

export const syncCheckpointStore = {
  read(): SyncCheckpoint {
    const serialized = storage.getString(STORAGE_KEY);

    if (!serialized) {
      storage.set(STORAGE_KEY, JSON.stringify(initialCheckpoint));
      return initialCheckpoint;
    }

    try {
      return JSON.parse(serialized) as SyncCheckpoint;
    } catch {
      storage.remove(STORAGE_KEY);
      storage.set(STORAGE_KEY, JSON.stringify(initialCheckpoint));
      return initialCheckpoint;
    }
  },
  write(checkpoint: SyncCheckpoint) {
    storage.set(STORAGE_KEY, JSON.stringify(checkpoint));
  },
};
