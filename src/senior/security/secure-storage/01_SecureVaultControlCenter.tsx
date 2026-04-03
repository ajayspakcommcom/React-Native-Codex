import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {secureVaultService} from './secureVaultService';
import type {
  SecureStorageCapabilitySnapshot,
  SecureStorageRecord,
  SecureStorageStatus,
} from './storageContracts';

function ActionButton({
  label,
  onPress,
  tone = 'primary',
}: {
  label: string;
  onPress: () => void;
  tone?: 'primary' | 'secondary' | 'danger';
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.actionButton,
        tone === 'secondary' && styles.actionButtonSecondary,
        tone === 'danger' && styles.actionButtonDanger,
        pressed && styles.actionButtonPressed,
      ]}>
      <Text style={styles.actionButtonText}>{label}</Text>
    </Pressable>
  );
}

function StatusPill({
  label,
  active,
}: {
  label: string;
  active: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.statusPill, active ? styles.statusPillOn : styles.statusPillOff]}>
      <Text style={styles.statusPillText}>
        {label}: {active ? 'Stored' : 'Missing'}
      </Text>
    </View>
  );
}

function RecordPanel({
  title,
  record,
}: {
  title: string;
  record: SecureStorageRecord | null;
}): React.JSX.Element {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {record ? (
        <>
          <Text style={styles.panelText}>Kind: {record.kind}</Text>
          <Text style={styles.panelText}>Account: {record.accountId}</Text>
          <Text style={styles.panelText}>Updated: {record.updatedAt}</Text>
          <Text style={styles.panelText}>
            Biometric protected: {record.requiresBiometricPrompt ? 'Yes' : 'No'}
          </Text>
        </>
      ) : (
        <Text style={styles.panelText}>No secure record loaded.</Text>
      )}
    </View>
  );
}

function CapabilityPanel({
  capabilitySnapshot,
}: {
  capabilitySnapshot?: SecureStorageCapabilitySnapshot;
}): React.JSX.Element {
  if (!capabilitySnapshot) {
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Device security posture</Text>
        <Text style={styles.panelText}>Capabilities not loaded yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Device security posture</Text>
      <Text style={styles.panelText}>
        Supported biometry: {capabilitySnapshot.supportedBiometry ?? 'None'}
      </Text>
      <Text style={styles.panelText}>
        Passcode authentication: {capabilitySnapshot.passcodeAuthAvailable ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.panelText}>
        Biometric access control available:{' '}
        {capabilitySnapshot.canUseBiometricAccessControl ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.panelText}>
        Android security level: {capabilitySnapshot.platformSecurityLevel ?? 'N/A'}
      </Text>
    </View>
  );
}

function SecureVaultControlCenter(): React.JSX.Element {
  const [status, setStatus] = useState<SecureStorageStatus>();
  const [sessionRecord, setSessionRecord] = useState<SecureStorageRecord | null>(null);
  const [refreshRecord, setRefreshRecord] = useState<SecureStorageRecord | null>(null);
  const [biometricRecord, setBiometricRecord] =
    useState<SecureStorageRecord | null>(null);
  const [activityMessage, setActivityMessage] = useState(
    'Vault is ready for secure token operations.',
  );

  const refreshStatus = async (): Promise<void> => {
    const nextStatus = await secureVaultService.getStatus();
    setStatus(nextStatus);
  };

  useEffect(() => {
    refreshStatus().catch(() => {
      setActivityMessage('Failed to load secure storage status.');
    });
  }, []);

  const seedSecureRecords = async (): Promise<void> => {
    await secureVaultService.saveSession('ops-lead@reactnativecodex.dev', 'session_token_enterprise');
    await secureVaultService.saveRefreshToken(
      'ops-lead@reactnativecodex.dev',
      'refresh_token_enterprise',
    );
    await secureVaultService.saveBiometricUnlockToken(
      'ops-lead@reactnativecodex.dev',
      'biometric_unlock_token_enterprise',
    );
    await refreshStatus();
    setActivityMessage('Session, refresh, and biometric records were stored securely.');
  };

  const loadSecureRecords = async (): Promise<void> => {
    const [nextSession, nextRefresh, nextBiometric] = await Promise.all([
      secureVaultService.readSession(),
      secureVaultService.readRefreshToken(),
      secureVaultService.readBiometricUnlockToken(),
    ]);

    setSessionRecord(nextSession);
    setRefreshRecord(nextRefresh);
    setBiometricRecord(nextBiometric);
    setActivityMessage('Secure records were loaded through Keychain/Keystore.');
  };

  const clearSecureRecords = async (): Promise<void> => {
    await secureVaultService.clearAll();
    setSessionRecord(null);
    setRefreshRecord(null);
    setBiometricRecord(null);
    await refreshStatus();
    setActivityMessage('All secure records were cleared from Keychain/Keystore.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Senior Security</Text>
        <Text style={styles.title}>Secure Vault Control Center</Text>
        <Text style={styles.subtitle}>
          This example stores sensitive session material in platform-backed
          Keychain/Keystore storage instead of plain local persistence.
        </Text>
      </View>

      <CapabilityPanel capabilitySnapshot={status?.capabilitySnapshot} />

      <View style={styles.statusRow}>
        <StatusPill label="Session" active={status?.hasSession ?? false} />
        <StatusPill label="Refresh token" active={status?.hasRefreshToken ?? false} />
        <StatusPill
          label="Biometric unlock"
          active={status?.hasBiometricUnlockToken ?? false}
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Vault policy</Text>
        <Text style={styles.panelText}>
          Session and refresh records are stored with device-bound accessibility.
        </Text>
        <Text style={styles.panelText}>
          Biometric unlock tokens require current biometric set or device passcode.
        </Text>
        <Text style={styles.panelText}>Activity: {activityMessage}</Text>
      </View>

      <View style={styles.actions}>
        <ActionButton label="Seed secure records" onPress={seedSecureRecords} />
        <ActionButton
          label="Load secure records"
          onPress={loadSecureRecords}
          tone="secondary"
        />
        <ActionButton
          label="Clear secure records"
          onPress={clearSecureRecords}
          tone="danger"
        />
      </View>

      <RecordPanel title="Session record" record={sessionRecord} />
      <RecordPanel title="Refresh token record" record={refreshRecord} />
      <RecordPanel title="Biometric unlock record" record={biometricRecord} />
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
  statusRow: {
    gap: 10,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  statusPillOn: {
    backgroundColor: '#14532d',
  },
  statusPillOff: {
    backgroundColor: '#3f3f46',
  },
  statusPillText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '700',
  },
  actions: {
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#1d4ed8',
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
  actionButtonDanger: {
    backgroundColor: '#991b1b',
  },
  actionButtonPressed: {
    opacity: 0.82,
  },
  actionButtonText: {
    color: '#eff6ff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default SecureVaultControlCenter;
