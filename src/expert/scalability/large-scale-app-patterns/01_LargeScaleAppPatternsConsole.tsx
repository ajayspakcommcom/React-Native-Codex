import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {BoundedContext, DeploymentSurface} from './patternContracts';
import {scalabilityPatternModel} from './scalabilityPatternModel';

function ContextCard({
  context,
}: {
  context: BoundedContext;
}): React.JSX.Element {
  return (
    <View style={styles.contextCard}>
      <Text style={styles.contextTitle}>{context.name}</Text>
      <Text style={styles.contextMeta}>
        {context.owningLayer} · {context.ownerTeam}
      </Text>
      <Text style={styles.contextText}>{context.responsibility}</Text>
      <Text style={styles.contextDeps}>
        Depends on: {context.dependencies.length > 0 ? context.dependencies.join(', ') : 'None'}
      </Text>
    </View>
  );
}

function SurfaceCard({
  surface,
}: {
  surface: DeploymentSurface;
}): React.JSX.Element {
  return (
    <View style={styles.surfaceCard}>
      <Text style={styles.surfaceTitle}>{surface.title}</Text>
      <Text style={styles.surfaceMeta}>
        {surface.releaseCadence} · blast radius {surface.failureBlastRadius}
      </Text>
      <Text style={styles.surfaceText}>Owner: {surface.owner}</Text>
    </View>
  );
}

function LargeScaleAppPatternsConsole(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Scalability</Text>
        <Text style={styles.title}>Large-Scale App Patterns Console</Text>
        <Text style={styles.subtitle}>
          This topic models how a large React Native application is partitioned into
          bounded contexts, deployment surfaces, and ownership lines that can survive
          multiple teams and release streams.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Bounded contexts</Text>
        <Text style={styles.panelText}>
          Large-scale apps do not scale by adding folders. They scale by giving
          stable responsibilities and failure boundaries to shell, platform, shared,
          and domain-owned contexts.
        </Text>
      </View>

      {scalabilityPatternModel.boundedContexts.map(context => (
        <ContextCard key={context.id} context={context} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Deployment surfaces</Text>
        <Text style={styles.panelText}>
          Expert mobile architecture also needs explicit release surfaces, because
          team autonomy is tightly coupled to blast radius and rollout control.
        </Text>
      </View>

      {scalabilityPatternModel.deploymentSurfaces.map(surface => (
        <SurfaceCard key={surface.id} surface={surface} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Operating principles</Text>
        {scalabilityPatternModel.operatingPrinciples.map(principle => (
          <Text key={principle} style={styles.panelText}>
            • {principle}
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
  contextCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2563eb',
    padding: 16,
    gap: 6,
  },
  contextTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  contextMeta: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contextText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  contextDeps: {
    color: '#93c5fd',
    fontSize: 13,
    lineHeight: 18,
  },
  surfaceCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#7c3aed',
    padding: 16,
    gap: 6,
  },
  surfaceTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  surfaceMeta: {
    color: '#c4b5fd',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  surfaceText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default LargeScaleAppPatternsConsole;
