import {createMMKV} from 'react-native-mmkv';

import type {OfflineBoardState} from './offlineContracts';

const storage = createMMKV({
  id: 'senior-offline-first-store',
});

const STORAGE_KEY = 'offline-first:operations-board';

const initialState: OfflineBoardState = {
  tasks: [
    {
      id: 'approval-201',
      service: 'checkout-core',
      owner: 'Platform Ops',
      environment: 'production',
      approved: false,
      updatedAt: '2026-04-03T08:30:00Z',
    },
    {
      id: 'approval-202',
      service: 'catalog-api',
      owner: 'Catalog Ops',
      environment: 'staging',
      approved: true,
      updatedAt: '2026-04-03T08:34:00Z',
    },
    {
      id: 'approval-203',
      service: 'risk-engine',
      owner: 'Fraud Ops',
      environment: 'production',
      approved: false,
      updatedAt: '2026-04-03T08:41:00Z',
    },
  ],
  queuedMutations: [],
  lastSuccessfulSyncAt: null,
};

export const offlineStore = {
  read(): OfflineBoardState {
    const serialized = storage.getString(STORAGE_KEY);

    if (!serialized) {
      storage.set(STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }

    try {
      return JSON.parse(serialized) as OfflineBoardState;
    } catch {
      storage.remove(STORAGE_KEY);
      storage.set(STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }
  },
  write(state: OfflineBoardState) {
    storage.set(STORAGE_KEY, JSON.stringify(state));
  },
};
