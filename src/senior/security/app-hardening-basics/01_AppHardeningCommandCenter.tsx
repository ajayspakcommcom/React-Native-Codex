import React, {useMemo} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  getHardeningRuntimeSnapshot,
  hardeningControls,
} from './hardeningPolicy';

function ControlCard({
  title,
  platform,
  status,
  rationale,
}: {
  title: string;
  platform: string;
  status: 'implemented' | 'pending';
  rationale: string;
}): React.JSX.Element {
  return (
    <View
      style={[
        styles.controlCard,
        status === 'implemented' ? styles.controlCardOn : styles.controlCardPending,
      ]}>
      <Text style={styles.controlTitle}>{title}</Text>
      <Text style={styles.controlMeta}>
        {platform} · {status}
      </Text>
      <Text style={styles.controlText}>{rationale}</Text>
    </View>
  );
}

function RuntimePill({
  label,
  active,
}: {
  label: string;
  active: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.runtimePill, active ? styles.runtimePillOn : styles.runtimePillOff]}>
      <Text style={styles.runtimePillText}>
        {label}: {active ? 'On' : 'Off'}
      </Text>
    </View>
  );
}

function AppHardeningCommandCenter(): React.JSX.Element {
  const runtimeSnapshot = useMemo(() => getHardeningRuntimeSnapshot(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Senior Security</Text>
        <Text style={styles.title}>App Hardening Command Center</Text>
        <Text style={styles.subtitle}>
          App hardening here focuses on repository-owned controls that reduce
          accidental exposure in release builds before deeper anti-tamper
          measures are layered in.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Runtime posture</Text>
        <Text style={styles.panelText}>Platform: {Platform.OS}</Text>
        <View style={styles.runtimeRow}>
          <RuntimePill
            label="New architecture"
            active={runtimeSnapshot.newArchitectureEnabled}
          />
          <RuntimePill label="ATS strict" active={runtimeSnapshot.atsStrictMode} />
          <RuntimePill
            label="Cleartext blocked"
            active={runtimeSnapshot.androidCleartextBlocked}
          />
          <RuntimePill
            label="Backups blocked"
            active={runtimeSnapshot.androidBackupBlocked}
          />
          <RuntimePill
            label="Screenshot protection"
            active={runtimeSnapshot.screenshotProtectionImplemented}
          />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Implemented controls</Text>
        <Text style={styles.panelText}>
          These controls are the baseline hardening decisions already represented
          in this repository’s Android, iOS, and cross-platform setup.
        </Text>
      </View>

      {hardeningControls.map(control => (
        <ControlCard
          key={control.id}
          title={control.title}
          platform={control.platform}
          status={control.status}
          rationale={control.rationale}
        />
      ))}
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
  runtimeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  runtimePill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  runtimePillOn: {
    backgroundColor: '#14532d',
  },
  runtimePillOff: {
    backgroundColor: '#3f3f46',
  },
  runtimePillText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  controlCard: {
    borderRadius: 18,
    padding: 16,
    gap: 6,
    borderWidth: 1,
  },
  controlCardOn: {
    backgroundColor: '#0f172a',
    borderColor: '#166534',
  },
  controlCardPending: {
    backgroundColor: '#111827',
    borderColor: '#92400e',
  },
  controlTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  controlMeta: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  controlText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AppHardeningCommandCenter;
