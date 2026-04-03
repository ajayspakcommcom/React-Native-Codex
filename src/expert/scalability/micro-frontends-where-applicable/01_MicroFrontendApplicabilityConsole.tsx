import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {
  MicroFrontendSlice,
  SliceBoundaryRule,
} from './microFrontendContracts';
import {microFrontendOperatingModel} from './microFrontendModel';

function SliceCard({slice}: {slice: MicroFrontendSlice}): React.JSX.Element {
  return (
    <View style={styles.sliceCard}>
      <Text style={styles.sliceTitle}>{slice.title}</Text>
      <Text style={styles.sliceMeta}>
        {slice.mode} · owner {slice.ownerTeam}
      </Text>
      <Text style={styles.sliceText}>Release boundary: {slice.releaseBoundary}</Text>
      <Text style={styles.sliceText}>
        Mobile applicable: {slice.applicableForMobile ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sliceDeps}>
        Contracts: {slice.sharedContractDependencies.join(', ')}
      </Text>
    </View>
  );
}

function RuleCard({rule}: {rule: SliceBoundaryRule}): React.JSX.Element {
  return (
    <View style={styles.ruleCard}>
      <Text style={styles.ruleTitle}>{rule.rule}</Text>
      <Text style={styles.ruleText}>{rule.reason}</Text>
    </View>
  );
}

function MicroFrontendApplicabilityConsole(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Scalability</Text>
        <Text style={styles.title}>Micro-Frontend Applicability Console</Text>
        <Text style={styles.subtitle}>
          This topic shows where micro-frontend ideas do and do not fit a React Native
          app, with mobile-specific boundaries instead of a web-first federation mindset.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Slice composition model</Text>
        <Text style={styles.panelText}>
          In mobile, the scalable pattern is usually shell-composed domain slices with
          shared contracts and release boundaries, not arbitrary runtime federation.
        </Text>
      </View>

      {microFrontendOperatingModel.slices.map(slice => (
        <SliceCard key={slice.id} slice={slice} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Boundary rules</Text>
        <Text style={styles.panelText}>
          These rules keep slice-based ownership from collapsing back into hidden
          cross-team coupling inside the mobile shell.
        </Text>
      </View>

      {microFrontendOperatingModel.boundaryRules.map(rule => (
        <RuleCard key={rule.id} rule={rule} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Operating principles</Text>
        {microFrontendOperatingModel.operatingPrinciples.map(principle => (
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
  sliceCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2563eb',
    padding: 16,
    gap: 6,
  },
  sliceTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  sliceMeta: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sliceText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  sliceDeps: {
    color: '#dbeafe',
    fontSize: 13,
    lineHeight: 18,
  },
  ruleCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#7c3aed',
    padding: 16,
    gap: 6,
  },
  ruleTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  ruleText: {
    color: '#ddd6fe',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MicroFrontendApplicabilityConsole;
