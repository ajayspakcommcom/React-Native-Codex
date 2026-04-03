import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {JsiCapability} from './jsiContracts';
import {jsiArchitectureModel} from './jsiArchitectureModel';
import {getJsiRuntimeSnapshot} from './jsiRuntimeProbe';

function CapabilityCard({
  capability,
}: {
  capability: JsiCapability;
}): React.JSX.Element {
  return (
    <View style={styles.capabilityCard}>
      <Text style={styles.capabilityTitle}>{capability.title}</Text>
      <Text style={styles.capabilityMeta}>
        {capability.primitive} · {capability.ownership}
      </Text>
      <Text style={styles.capabilityText}>{capability.description}</Text>
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

function JsiInternalsConsole(): React.JSX.Element {
  const runtimeSnapshot = useMemo(() => getJsiRuntimeSnapshot(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Internals</Text>
        <Text style={styles.title}>JSI Internals Console</Text>
        <Text style={styles.subtitle}>
          This topic explains how modern React Native exposes native functionality
          directly into the JavaScript runtime through JSI-backed primitives.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Runtime snapshot</Text>
        <Text style={styles.panelText}>
          JSI-capable runtime likely available: {runtimeSnapshot.likelyJsiCapable ? 'Yes' : 'No'}
        </Text>
        <View style={styles.runtimeRow}>
          <RuntimePill label="Hermes runtime" active={runtimeSnapshot.hasHermesRuntime} />
          <RuntimePill
            label="TurboModule proxy"
            active={runtimeSnapshot.hasTurboModuleProxy}
          />
          <RuntimePill
            label="Bridgeless runtime"
            active={runtimeSnapshot.hasBridgelessRuntime}
          />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>JSI primitives</Text>
        <Text style={styles.panelText}>
          These are the main building blocks used by advanced React Native native
          integrations on the modern runtime path.
        </Text>
      </View>

      {jsiArchitectureModel.primitives.map(capability => (
        <CapabilityCard key={capability.id} capability={capability} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Design notes</Text>
        {jsiArchitectureModel.designNotes.map(note => (
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
  capabilityCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2563eb',
    padding: 16,
    gap: 6,
  },
  capabilityTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  capabilityMeta: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  capabilityText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default JsiInternalsConsole;
