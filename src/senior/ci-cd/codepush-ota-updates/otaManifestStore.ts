import {createMMKV} from 'react-native-mmkv';

import type {OtaChannel, OtaStatusSnapshot, OtaUpdateManifest} from './otaContracts';

const otaStorage = createMMKV({id: 'senior-ci-cd-ota'});

const keys = {
  activeManifest: 'ota.activeManifest',
  downloadedManifest: 'ota.downloadedManifest',
  statusSnapshot: 'ota.statusSnapshot',
  ignoredManifestIds: 'ota.ignoredManifestIds',
} as const;

function readJson<T>(key: string): T | undefined {
  const rawValue = otaStorage.getString(key);
  if (!rawValue) {
    return undefined;
  }

  return JSON.parse(rawValue) as T;
}

function writeJson<T>(key: string, value: T): void {
  otaStorage.set(key, JSON.stringify(value));
}

export const otaManifestStore = {
  getActiveManifest(): OtaUpdateManifest | undefined {
    return readJson<OtaUpdateManifest>(keys.activeManifest);
  },
  setActiveManifest(manifest: OtaUpdateManifest): void {
    writeJson(keys.activeManifest, manifest);
  },
  getDownloadedManifest(): OtaUpdateManifest | undefined {
    return readJson<OtaUpdateManifest>(keys.downloadedManifest);
  },
  setDownloadedManifest(manifest: OtaUpdateManifest): void {
    writeJson(keys.downloadedManifest, manifest);
  },
  clearDownloadedManifest(): void {
    otaStorage.remove(keys.downloadedManifest);
  },
  getStatusSnapshot(): OtaStatusSnapshot | undefined {
    return readJson<OtaStatusSnapshot>(keys.statusSnapshot);
  },
  setStatusSnapshot(snapshot: OtaStatusSnapshot): void {
    writeJson(keys.statusSnapshot, snapshot);
  },
  getIgnoredManifestIds(): string[] {
    return readJson<string[]>(keys.ignoredManifestIds) ?? [];
  },
  ignoreManifest(manifestId: string): void {
    const nextIgnoredIds = Array.from(
      new Set([...this.getIgnoredManifestIds(), manifestId]),
    );
    writeJson(keys.ignoredManifestIds, nextIgnoredIds);
  },
  isIgnored(manifestId: string): boolean {
    return this.getIgnoredManifestIds().includes(manifestId);
  },
  seedInitialManifest(channel: OtaChannel): void {
    if (this.getActiveManifest()) {
      return;
    }

    const seedManifest: OtaUpdateManifest = {
      id: 'embedded-native-release',
      runtimeVersion: '1.0.0-native',
      channel,
      semanticVersion: '1.0.0',
      createdAt: '2026-04-03T00:00:00.000Z',
      message: 'Embedded binary release',
      critical: false,
      rolloutPercentage: 100,
    };

    this.setActiveManifest(seedManifest);
  },
};
