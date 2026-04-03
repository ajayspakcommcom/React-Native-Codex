import React, {useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  createEnterpriseOtaCoordinator,
  OtaUpdateCoordinator,
} from './otaUpdateCoordinator';
import {describeChannel, resolveOtaChannel} from './otaChannelResolver';
import type {OtaStatusSnapshot, OtaUpdateManifest} from './otaContracts';

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}): React.JSX.Element {
  return (
    <View style={[styles.metricCard, {borderColor: accent}]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.actionButton,
        variant === 'secondary' && styles.actionButtonSecondary,
        disabled && styles.actionButtonDisabled,
        pressed && !disabled && styles.actionButtonPressed,
      ]}>
      <Text
        style={[
          styles.actionButtonText,
          variant === 'secondary' && styles.actionButtonTextSecondary,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function renderManifest(manifest?: OtaUpdateManifest): React.JSX.Element {
  if (!manifest) {
    return <Text style={styles.emptyText}>No OTA manifest is selected.</Text>;
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{manifest.semanticVersion}</Text>
      <Text style={styles.panelText}>Manifest: {manifest.id}</Text>
      <Text style={styles.panelText}>Channel: {manifest.channel}</Text>
      <Text style={styles.panelText}>Runtime: {manifest.runtimeVersion}</Text>
      <Text style={styles.panelText}>Rollout: {manifest.rolloutPercentage}%</Text>
      <Text style={styles.panelText}>Critical: {manifest.critical ? 'Yes' : 'No'}</Text>
      <Text style={styles.panelText}>Message: {manifest.message}</Text>
    </View>
  );
}

function renderStatus(snapshot?: OtaStatusSnapshot): React.JSX.Element {
  if (!snapshot) {
    return <Text style={styles.emptyText}>No OTA status recorded yet.</Text>;
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Current status</Text>
      <Text style={styles.panelText}>Provider: {snapshot.provider}</Text>
      <Text style={styles.panelText}>State: {snapshot.state}</Text>
      <Text style={styles.panelText}>Channel: {snapshot.channel}</Text>
      <Text style={styles.panelText}>
        Launched manifest: {snapshot.launchedManifestId ?? 'Embedded only'}
      </Text>
      <Text style={styles.panelText}>
        Downloaded manifest: {snapshot.downloadedManifestId ?? 'None'}
      </Text>
      <Text style={styles.panelText}>Last check: {snapshot.checkedAt ?? 'Not yet checked'}</Text>
      {snapshot.errorMessage ? (
        <Text style={[styles.panelText, styles.errorText]}>
          Error: {snapshot.errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

function getStateAccent(state?: OtaStatusSnapshot['state']): string {
  switch (state) {
    case 'available':
      return '#f59e0b';
    case 'ready':
      return '#2563eb';
    case 'up-to-date':
      return '#15803d';
    case 'failed':
      return '#dc2626';
    default:
      return '#475569';
  }
}

function getStatusLabel(state?: OtaStatusSnapshot['state']): string {
  return state ? state.replace('-', ' ') : 'idle';
}

const coordinator: OtaUpdateCoordinator = createEnterpriseOtaCoordinator();

function EnterpriseOtaControlCenter(): React.JSX.Element {
  const [status, setStatus] = useState<OtaStatusSnapshot>();
  const [availableUpdate, setAvailableUpdate] = useState<OtaUpdateManifest>();
  const [activeUpdate, setActiveUpdate] = useState<OtaUpdateManifest>();
  const [busyLabel, setBusyLabel] = useState<string>('Idle');

  const launchPolicy = useMemo(
    () =>
      resolveOtaChannel({
        appEnv: 'production',
        internalBuild: false,
      }),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function hydrate(): Promise<void> {
      const nextStatus = await coordinator.getStatus();
      if (cancelled) {
        return;
      }

      setStatus(nextStatus);
    }

    hydrate().catch(() => {
      setBusyLabel('Failed to hydrate OTA status');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const checkForUpdate = async (): Promise<void> => {
    setBusyLabel('Checking for OTA update');
    const checkResult = await coordinator.check();
    const nextStatus = await coordinator.getStatus();
    setStatus(nextStatus);
    setAvailableUpdate(checkResult.manifest);
    setBusyLabel(checkResult.isAvailable ? 'Update available' : 'App is current');
  };

  const downloadUpdate = async (): Promise<void> => {
    if (!availableUpdate) {
      return;
    }

    setBusyLabel('Downloading OTA payload');
    const nextStatus = await coordinator.download(availableUpdate);
    setStatus(nextStatus);
    setBusyLabel('Update downloaded');
  };

  const applyUpdate = async (): Promise<void> => {
    if (!availableUpdate) {
      return;
    }

    setBusyLabel('Applying OTA update policy');
    const nextStatus = await coordinator.apply(availableUpdate);
    setStatus(nextStatus);
    setActiveUpdate(availableUpdate);
    setAvailableUpdate(undefined);
    setBusyLabel(
      availableUpdate.critical && launchPolicy.allowCriticalImmediateApply
        ? 'Critical update applied immediately'
        : 'Update staged for next launch policy',
    );
  };

  const dismissUpdate = (): void => {
    if (!availableUpdate) {
      return;
    }

    coordinator.dismiss(availableUpdate.id);
    setAvailableUpdate(undefined);
    setBusyLabel('Update dismissed for this device cohort');
  };

  const accent = getStateAccent(status?.state);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Senior CI/CD</Text>
        <Text style={styles.title}>Enterprise OTA Control Center</Text>
        <Text style={styles.subtitle}>
          This models provider-isolated over-the-air update control for live store
          builds, with rollout policy separated from screen logic.
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <MetricCard
          label="Provider"
          value="EAS Update"
          accent="#7c3aed"
        />
        <MetricCard
          label="Launch channel"
          value={launchPolicy.channel}
          accent="#0891b2"
        />
        <MetricCard
          label="Current state"
          value={getStatusLabel(status?.state)}
          accent={accent}
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Rollout policy</Text>
        <Text style={styles.panelText}>
          {describeChannel(launchPolicy.channel)}
        </Text>
        <Text style={styles.panelText}>
          Apply on next restart: {launchPolicy.applyOnNextRestart ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.panelText}>
          Allow critical immediate apply:{' '}
          {launchPolicy.allowCriticalImmediateApply ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.panelText}>
          Background safety window: {launchPolicy.minimumBackgroundDurationMs} ms
        </Text>
        <Text style={styles.panelText}>Coordinator status: {busyLabel}</Text>
      </View>

      {renderStatus(status)}
      {renderManifest(availableUpdate ?? activeUpdate)}

      <View style={styles.actions}>
        <ActionButton label="Check for update" onPress={checkForUpdate} />
        <ActionButton
          label="Download update"
          onPress={downloadUpdate}
          disabled={!availableUpdate}
          variant="secondary"
        />
        <ActionButton
          label="Apply update"
          onPress={applyUpdate}
          disabled={!availableUpdate}
        />
        <ActionButton
          label="Dismiss update"
          onPress={dismissUpdate}
          disabled={!availableUpdate}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 18,
    backgroundColor: '#020617',
  },
  hero: {
    gap: 6,
  },
  eyebrow: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  metricsRow: {
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metricValue: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800',
  },
  panel: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  panelTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  panelText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: '#fca5a5',
  },
  actions: {
    gap: 10,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#475569',
  },
  actionButtonDisabled: {
    opacity: 0.45,
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonText: {
    color: '#eff6ff',
    fontSize: 15,
    fontWeight: '700',
  },
  actionButtonTextSecondary: {
    color: '#e2e8f0',
  },
});

export default EnterpriseOtaControlCenter;
