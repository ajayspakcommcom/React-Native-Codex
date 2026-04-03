import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {BridgePipelineStage} from './bridgeContracts';
import {bridgeInternalsModel} from './bridgePipelineModel';
import {getRuntimeArchitectureSnapshot} from './bridgeRuntimeProbe';

function costColor(costProfile: BridgePipelineStage['costProfile']): string {
  switch (costProfile) {
    case 'low':
      return '#166534';
    case 'medium':
      return '#1d4ed8';
    case 'high':
      return '#b45309';
    default:
      return '#334155';
  }
}

function StageCard({stage}: {stage: BridgePipelineStage}): React.JSX.Element {
  return (
    <View style={[styles.stageCard, {borderColor: costColor(stage.costProfile)}]}>
      <Text style={styles.stageTitle}>{stage.title}</Text>
      <Text style={styles.stageMeta}>
        {stage.thread} · {stage.costProfile} cost
      </Text>
      <Text style={styles.stageText}>{stage.description}</Text>
    </View>
  );
}

function SnapshotPill({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.snapshotPill, active ? styles.snapshotPillOn : styles.snapshotPillOff]}>
      <Text style={styles.snapshotPillText}>
        {label}: {value}
      </Text>
    </View>
  );
}

function BridgeInternalsConsole(): React.JSX.Element {
  const runtimeSnapshot = useMemo(() => getRuntimeArchitectureSnapshot(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Internals</Text>
        <Text style={styles.title}>React Native Bridge Internals Console</Text>
        <Text style={styles.subtitle}>
          This expert example explains the old bridge, the New Architecture, and the
          migration interop layer side by side, using the current app runtime as
          a concrete reference point.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Current runtime snapshot</Text>
        <Text style={styles.panelText}>
          Architecture mode: {runtimeSnapshot.architectureMode}
        </Text>
        <Text style={styles.panelText}>
          React Native version: {runtimeSnapshot.reactNativeVersion}
        </Text>
        <View style={styles.snapshotRow}>
          <SnapshotPill
            label="Hermes"
            value={runtimeSnapshot.isHermesEnabled ? 'enabled' : 'disabled'}
            active={runtimeSnapshot.isHermesEnabled}
          />
          <SnapshotPill
            label="TurboModule proxy"
            value={runtimeSnapshot.isTurboModuleProxyAvailable ? 'present' : 'absent'}
            active={runtimeSnapshot.isTurboModuleProxyAvailable}
          />
          <SnapshotPill
            label="Bridgeless runtime"
            value={runtimeSnapshot.isBridgelessRuntime ? 'yes' : 'no'}
            active={runtimeSnapshot.isBridgelessRuntime}
          />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Legacy bridge pipeline</Text>
        <Text style={styles.panelText}>
          The old architecture uses an asynchronous bridge with serialization and queueing
          between JS and native.
        </Text>
      </View>
      {bridgeInternalsModel.legacyBridgeStages.map(stage => (
        <StageCard key={stage.id} stage={stage} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>New Architecture pipeline</Text>
        <Text style={styles.panelText}>
          Modern React Native replaces the old bridge-heavy flow with JSI-backed access,
          TurboModules, and Fabric rendering.
        </Text>
      </View>
      {bridgeInternalsModel.newArchitectureStages.map(stage => (
        <StageCard key={stage.id} stage={stage} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Interop and migration notes</Text>
        {bridgeInternalsModel.interopNotes.map(note => (
          <Text key={note} style={styles.panelText}>
            • {note}
          </Text>
        ))}
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
  stageCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  stageTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  stageMeta: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  stageText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default BridgeInternalsConsole;
