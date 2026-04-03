import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {FabricPipelineStage} from './fabricContracts';
import {fabricArchitectureModel} from './fabricArchitectureModel';
import {getFabricRuntimeSnapshot} from './fabricRuntimeProbe';

function StageCard({stage}: {stage: FabricPipelineStage}): React.JSX.Element {
  return (
    <View style={styles.stageCard}>
      <Text style={styles.stageTitle}>{stage.title}</Text>
      <Text style={styles.stageMeta}>
        {stage.phase} · {stage.executionContext}
      </Text>
      <Text style={styles.stageText}>{stage.description}</Text>
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
        {label}: {active ? 'yes' : 'no'}
      </Text>
    </View>
  );
}

function FabricRendererConsole(): React.JSX.Element {
  const runtimeSnapshot = useMemo(() => getFabricRuntimeSnapshot(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Internals</Text>
        <Text style={styles.title}>Fabric Renderer Console</Text>
        <Text style={styles.subtitle}>
          This topic explains the modern React Native rendering pipeline used by
          the New Architecture and shows how Fabric differs from the old
          UIManager-through-the-bridge mental model.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Runtime snapshot</Text>
        <Text style={styles.panelText}>
          New Architecture enabled: {runtimeSnapshot.newArchitectureEnabled ? 'Yes' : 'No'}
        </Text>
        <View style={styles.runtimeRow}>
          <RuntimePill
            label="Fabric likely enabled"
            active={runtimeSnapshot.fabricLikelyEnabled}
          />
          <RuntimePill
            label="TurboModule proxy"
            active={runtimeSnapshot.turboModuleProxyAvailable}
          />
          <RuntimePill label="Hermes" active={runtimeSnapshot.hermesEnabled} />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Fabric pipeline</Text>
        <Text style={styles.panelText}>
          Fabric should be understood as a shadow-tree, layout, mounting, and event
          coordination pipeline, not just a faster view update path.
        </Text>
      </View>

      {fabricArchitectureModel.stages.map(stage => (
        <StageCard key={stage.id} stage={stage} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Design notes</Text>
        {fabricArchitectureModel.designNotes.map(note => (
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
    backgroundColor: '#334155',
  },
  runtimePillText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  stageCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#7c3aed',
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

export default FabricRendererConsole;
