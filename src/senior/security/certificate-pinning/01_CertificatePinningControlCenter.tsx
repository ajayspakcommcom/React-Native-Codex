import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {certificatePinningService} from './certificatePinningService';
import type {PinningRuntimeStatus} from './pinningContracts';
import {enterprisePinningProfile} from './pinningProfiles';

function ActionButton({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.actionButton,
        variant === 'secondary' && styles.actionButtonSecondary,
        variant === 'danger' && styles.actionButtonDanger,
        pressed && styles.actionButtonPressed,
      ]}>
      <Text style={styles.actionButtonText}>{label}</Text>
    </Pressable>
  );
}

function RuntimePanel({
  status,
  activityMessage,
}: {
  status: PinningRuntimeStatus;
  activityMessage: string;
}): React.JSX.Element {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Runtime status</Text>
      <Text style={styles.panelText}>
        Native module available: {status.nativeModuleAvailable ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.panelText}>
        Active profile: {status.activeProfileName ?? 'Disabled'}
      </Text>
      <Text style={styles.panelText}>
        Configured domains: {status.configuredDomains.length}
      </Text>
      <Text style={styles.panelText}>Activity: {activityMessage}</Text>
      {status.lastError ? (
        <Text style={[styles.panelText, styles.errorText]}>
          Last pinning error: {status.lastError.serverHostname}
          {status.lastError.message ? ` - ${status.lastError.message}` : ''}
        </Text>
      ) : null}
    </View>
  );
}

function ProfilePanel(): React.JSX.Element {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Pinned profile</Text>
      <Text style={styles.panelText}>
        Profile: {enterprisePinningProfile.profileName}
      </Text>
      {Object.entries(enterprisePinningProfile.domains).map(([domain, policy]) => (
        <View key={domain} style={styles.domainCard}>
          <Text style={styles.domainTitle}>{domain}</Text>
          <Text style={styles.panelText}>Environment: {policy.environment}</Text>
          <Text style={styles.panelText}>Owner: {policy.owner}</Text>
          <Text style={styles.panelText}>
            Include subdomains: {policy.includeSubdomains ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.panelText}>
            Backup pins configured: {policy.publicKeyHashes.length}
          </Text>
          <Text style={styles.panelText}>
            Expiration: {policy.expirationDate ?? 'No expiration'}
          </Text>
        </View>
      ))}
    </View>
  );
}

function CertificatePinningControlCenter(): React.JSX.Element {
  const [status, setStatus] = useState<PinningRuntimeStatus>(
    certificatePinningService.getStatus(),
  );
  const [activityMessage, setActivityMessage] = useState(
    'Pinning is available to be initialized with a vetted profile.',
  );

  useEffect(() => {
    setStatus(certificatePinningService.getStatus());

    return () => {
      certificatePinningService.dispose();
    };
  }, []);

  const enablePinning = async (): Promise<void> => {
    const nextStatus = await certificatePinningService.enable(
      enterprisePinningProfile,
    );
    setStatus(nextStatus);
    setActivityMessage(
      'Pinning profile initialized. All fetch/XMLHttpRequest traffic to pinned domains is now guarded.',
    );
  };

  const disablePinning = async (): Promise<void> => {
    const nextStatus = await certificatePinningService.disable();
    setStatus(nextStatus);
    setActivityMessage('Pinning was disabled for the current app session.');
  };

  const clearLastError = (): void => {
    const nextStatus = certificatePinningService.clearLastError();
    setStatus(nextStatus);
    setActivityMessage('Stored pinning error state was cleared.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Senior Security</Text>
        <Text style={styles.title}>Certificate Pinning Control Center</Text>
        <Text style={styles.subtitle}>
          This example models runtime public-key pinning through a maintained
          library, with domain policy owned outside of screen logic.
        </Text>
      </View>

      <RuntimePanel status={status} activityMessage={activityMessage} />
      <ProfilePanel />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Operational policy</Text>
        <Text style={styles.panelText}>
          Production pinning should always ship with backup pins and an expiration
          policy to reduce accidental lockout risk.
        </Text>
        <Text style={styles.panelText}>
          Pinning should be limited to first-party API domains, not third-party
          services that rotate certificates outside your control.
        </Text>
      </View>

      <View style={styles.actions}>
        <ActionButton label="Enable pinning profile" onPress={enablePinning} />
        <ActionButton
          label="Disable pinning"
          onPress={disablePinning}
          variant="secondary"
        />
        <ActionButton
          label="Clear last pinning error"
          onPress={clearLastError}
          variant="danger"
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
  errorText: {
    color: '#fca5a5',
  },
  domainCard: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    padding: 14,
    gap: 4,
    marginTop: 6,
  },
  domainTitle: {
    color: '#f8fafc',
    fontSize: 15,
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

export default CertificatePinningControlCenter;
