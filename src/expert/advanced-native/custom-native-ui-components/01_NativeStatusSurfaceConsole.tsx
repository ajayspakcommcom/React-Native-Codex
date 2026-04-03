import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  NativeStatusSurface,
} from './NativeStatusSurface';
import type {NativeStatusSurfaceRecord} from './nativeStatusSurfaceContracts';

const nativeSurfaces: NativeStatusSurfaceRecord[] = [
  {
    id: 'surface-1',
    title: 'Release Operations',
    subtitle:
      'The native surface exposes a product-owned control card with tight platform rendering and progress instrumentation.',
    statusTone: 'nominal',
    progressValue: 84,
    attentionCount: 2,
  },
  {
    id: 'surface-2',
    title: 'Incident Coordination',
    subtitle:
      'Native layout and rendering are useful when a product surface needs deterministic platform UI behavior at scale.',
    statusTone: 'warning',
    progressValue: 58,
    attentionCount: 6,
  },
  {
    id: 'surface-3',
    title: 'Security Controls',
    subtitle:
      'Enterprise teams should keep JS contracts stable while allowing the native view to evolve internally.',
    statusTone: 'critical',
    progressValue: 37,
    attentionCount: 11,
  },
];

function NativePatternCard(props: {title: string; body: string}) {
  return (
    <View style={styles.patternCard}>
      <Text style={styles.patternTitle}>{props.title}</Text>
      <Text style={styles.patternBody}>{props.body}</Text>
    </View>
  );
}

function NativeStatusSurfaceConsole() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Expert • Advanced Native</Text>
        <Text style={styles.title}>Custom Native UI Components</Text>
        <Text style={styles.body}>
          This console models an enterprise native-view integration where
          product code consumes a typed React wrapper and platform teams own the
          actual native surface implementation.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Native surfaces</Text>
        {nativeSurfaces.map(surface => (
          <NativeStatusSurface
            key={surface.id}
            title={surface.title}
            subtitle={surface.subtitle}
            statusTone={surface.statusTone}
            progressValue={surface.progressValue}
            attentionCount={surface.attentionCount}
            testID={surface.id}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operating rules</Text>
        <NativePatternCard
          title="Stable JS contract"
          body="The app should depend on a typed wrapper so native implementation details can change without forcing broad product-code churn."
        />
        <NativePatternCard
          title="Platform-owned internals"
          body="Native layout, rendering, and tuning belong to the platform surface owner, not to every feature team that consumes the component."
        />
        <NativePatternCard
          title="Migration-safe path"
          body="If the component later moves to a dedicated Fabric spec, product screens should not have to rewrite their usage contract."
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  heroCard: {
    borderRadius: 24,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 24,
    gap: 10,
  },
  eyebrow: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  patternCard: {
    borderRadius: 18,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 18,
    gap: 8,
  },
  patternTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  patternBody: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 21,
  },
});

export default NativeStatusSurfaceConsole;
