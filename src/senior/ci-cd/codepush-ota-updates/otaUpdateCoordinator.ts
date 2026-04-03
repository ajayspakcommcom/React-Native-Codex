import type {
  OtaCheckResult,
  OtaLaunchPolicy,
  OtaStatusSnapshot,
  OtaUpdateManifest,
  OtaUpdateProvider,
} from './otaContracts';
import {otaManifestStore} from './otaManifestStore';

const mockAvailableUpdate: OtaUpdateManifest = {
  id: 'ota-2026-04-03-incident-hotfix',
  runtimeVersion: '1.0.0-native',
  channel: 'production',
  semanticVersion: '1.0.1',
  createdAt: '2026-04-03T09:15:00.000Z',
  message: 'Hotfix for notification routing and cache recovery',
  critical: true,
  rolloutPercentage: 10,
};

class EasUpdateProvider implements OtaUpdateProvider {
  readonly providerName = 'eas-update' as const;

  async getStatus(): Promise<OtaStatusSnapshot> {
    const storedSnapshot = otaManifestStore.getStatusSnapshot();
    const activeManifest = otaManifestStore.getActiveManifest();
    const downloadedManifest = otaManifestStore.getDownloadedManifest();

    return (
      storedSnapshot ?? {
        provider: this.providerName,
        state: 'idle',
        channel: activeManifest?.channel ?? 'production',
        launchedManifestId: activeManifest?.id,
        downloadedManifestId: downloadedManifest?.id,
      }
    );
  }

  async checkForUpdate(channel: OtaLaunchPolicy['channel']): Promise<OtaCheckResult> {
    const checkedAt = new Date().toISOString();

    if (
      channel === mockAvailableUpdate.channel &&
      !otaManifestStore.isIgnored(mockAvailableUpdate.id)
    ) {
      otaManifestStore.setStatusSnapshot({
        provider: this.providerName,
        state: 'available',
        channel,
        checkedAt,
        launchedManifestId: otaManifestStore.getActiveManifest()?.id,
      });

      return {
        isAvailable: true,
        manifest: mockAvailableUpdate,
        checkedAt,
      };
    }

    otaManifestStore.setStatusSnapshot({
      provider: this.providerName,
      state: 'up-to-date',
      channel,
      checkedAt,
      launchedManifestId: otaManifestStore.getActiveManifest()?.id,
    });

    return {
      isAvailable: false,
      checkedAt,
    };
  }

  async downloadUpdate(manifest: OtaUpdateManifest): Promise<OtaStatusSnapshot> {
    otaManifestStore.setDownloadedManifest(manifest);
    const snapshot: OtaStatusSnapshot = {
      provider: this.providerName,
      state: 'ready',
      channel: manifest.channel,
      checkedAt: new Date().toISOString(),
      downloadedManifestId: manifest.id,
      launchedManifestId: otaManifestStore.getActiveManifest()?.id,
    };

    otaManifestStore.setStatusSnapshot(snapshot);
    return snapshot;
  }

  async applyUpdate(options: {immediate: boolean}): Promise<OtaStatusSnapshot> {
    const downloadedManifest = otaManifestStore.getDownloadedManifest();
    if (!downloadedManifest) {
      const failedSnapshot: OtaStatusSnapshot = {
        provider: this.providerName,
        state: 'failed',
        channel: otaManifestStore.getActiveManifest()?.channel ?? 'production',
        errorMessage: 'No downloaded update is available to apply.',
      };

      otaManifestStore.setStatusSnapshot(failedSnapshot);
      return failedSnapshot;
    }

    otaManifestStore.setActiveManifest(downloadedManifest);
    otaManifestStore.clearDownloadedManifest();

    const nextSnapshot: OtaStatusSnapshot = {
      provider: this.providerName,
      state: options.immediate ? 'idle' : 'up-to-date',
      channel: downloadedManifest.channel,
      checkedAt: new Date().toISOString(),
      launchedManifestId: downloadedManifest.id,
    };

    otaManifestStore.setStatusSnapshot(nextSnapshot);
    return nextSnapshot;
  }
}

export class OtaUpdateCoordinator {
  constructor(
    private readonly provider: OtaUpdateProvider,
    private readonly launchPolicy: OtaLaunchPolicy,
  ) {
    otaManifestStore.seedInitialManifest(launchPolicy.channel);
  }

  getLaunchPolicy(): OtaLaunchPolicy {
    return this.launchPolicy;
  }

  async getStatus(): Promise<OtaStatusSnapshot> {
    return this.provider.getStatus();
  }

  async check(): Promise<OtaCheckResult> {
    return this.provider.checkForUpdate(this.launchPolicy.channel);
  }

  async download(manifest: OtaUpdateManifest): Promise<OtaStatusSnapshot> {
    return this.provider.downloadUpdate(manifest);
  }

  async apply(manifest: OtaUpdateManifest): Promise<OtaStatusSnapshot> {
    const immediate =
      manifest.critical && this.launchPolicy.allowCriticalImmediateApply;
    return this.provider.applyUpdate({immediate});
  }

  dismiss(manifestId: string): void {
    otaManifestStore.ignoreManifest(manifestId);
  }
}

export function createEnterpriseOtaCoordinator(): OtaUpdateCoordinator {
  return new OtaUpdateCoordinator(
    new EasUpdateProvider(),
    {
      channel: 'production',
      applyOnNextRestart: true,
      allowCriticalImmediateApply: false,
      minimumBackgroundDurationMs: 30_000,
    },
  );
}
