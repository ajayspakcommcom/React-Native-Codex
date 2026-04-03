import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {HermesTuningControl} from './hermesContracts';
import {getHermesRuntimeSnapshot} from './hermesRuntimeProbe';
import {hermesTuningControls} from './hermesTuningModel';

function statusColor(status: HermesTuningControl['status']): string {
  switch (status) {
    case 'implemented':
      return '#166534';
    case 'guidance':
      return '#1d4ed8';
    case 'pending':
      return '#b45309';
    default:
      return '#334155';
  }
}

function ControlCard({control}: {control: HermesTuningControl}): React.JSX.Element {
  return (
    <View style={[styles.controlCard, {borderColor: statusColor(control.status)}]}>
      <Text style={styles.controlTitle}>{control.title}</Text>
      <Text style={styles.controlMeta}>
        {control.area} · {control.status}
      </Text>
      <Text style={styles.controlText}>{control.description}</Text>
    </View>
  );
}

function SnapshotPill({
  label,
  active,
}: {
  label: string;
  active: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.snapshotPill, active ? styles.snapshotPillOn : styles.snapshotPillOff]}>
      <Text style={styles.snapshotPillText}>
        {label}: {active ? 'yes' : 'no'}
      </Text>
    </View>
  );
}

function HermesTuningConsole(): React.JSX.Element {
  const runtimeSnapshot = useMemo(() => getHermesRuntimeSnapshot(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Internals</Text>
        <Text style={styles.title}>Hermes Tuning Console</Text>
        <Text style={styles.subtitle}>
          This topic frames Hermes tuning as a release-engineering and runtime
          verification discipline, not just a single engine toggle.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Runtime snapshot</Text>
        <Text style={styles.panelText}>
          Hermes is enabled in this repo and should be treated as the active engine path.
        </Text>
        <View style={styles.snapshotRow}>
          <SnapshotPill
            label="Hermes enabled at build"
            active={runtimeSnapshot.hermesEnabledAtBuild}
          />
          <SnapshotPill
            label="Hermes runtime detected"
            active={runtimeSnapshot.hermesRuntimeDetected}
          />
          <SnapshotPill
            label="New Architecture"
            active={runtimeSnapshot.newArchitectureEnabled}
          />
          <SnapshotPill
            label="Release validation required"
            active={runtimeSnapshot.releaseValidationRequired}
          />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Hermes tuning areas</Text>
        <Text style={styles.panelText}>
          The controls below show where engine tuning usually matters in real mobile
          apps: runtime verification, bundle shape, source maps, memory, profiling,
          and artifact size.
        </Text>
      </View>

      {hermesTuningControls.map(control => (
        <ControlCard key={control.id} control={control} />
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
  snapshotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  snapshotPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  snapshotPillOn: {
    backgroundColor: '#14532d',
  },
  snapshotPillOff: {
    backgroundColor: '#334155',
  },
  snapshotPillText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  controlCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 6,
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

export default HermesTuningConsole;
