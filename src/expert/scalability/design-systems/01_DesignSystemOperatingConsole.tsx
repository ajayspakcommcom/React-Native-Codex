import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import type {
  ComponentContract,
  DistributionSurface,
  TokenGroup,
} from './designSystemContracts';
import {designSystemOperatingModel} from './designSystemModel';

function TokenCard({tokenGroup}: {tokenGroup: TokenGroup}): React.JSX.Element {
  return (
    <View style={styles.tokenCard}>
      <Text style={styles.tokenTitle}>{tokenGroup.title}</Text>
      <Text style={styles.tokenMeta}>
        {tokenGroup.tier} · owner {tokenGroup.ownerTeam}
      </Text>
      {tokenGroup.examples.map(example => (
        <Text key={example} style={styles.tokenText}>
          • {example}
        </Text>
      ))}
    </View>
  );
}

function ComponentCard({
  component,
}: {
  component: ComponentContract;
}): React.JSX.Element {
  return (
    <View style={styles.componentCard}>
      <Text style={styles.componentTitle}>{component.title}</Text>
      <Text style={styles.componentMeta}>
        {component.status} · {component.ownerTeam}
      </Text>
      <Text style={styles.componentText}>
        Platforms: {component.supportedPlatforms.join(', ')}
      </Text>
      <Text style={styles.componentText}>
        Depends on: {component.dependencies.join(', ')}
      </Text>
    </View>
  );
}

function DistributionCard({
  surface,
}: {
  surface: DistributionSurface;
}): React.JSX.Element {
  return (
    <View style={styles.distributionCard}>
      <Text style={styles.distributionTitle}>{surface.channel}</Text>
      <Text style={styles.distributionText}>Consumers: {surface.consumerScope}</Text>
      <Text style={styles.distributionText}>Rule: {surface.releaseRule}</Text>
    </View>
  );
}

function DesignSystemOperatingConsole(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert Scalability</Text>
        <Text style={styles.title}>Design System Operating Console</Text>
        <Text style={styles.subtitle}>
          This topic treats the design system as an owned platform product with token tiers,
          stable contracts, and distribution surfaces across the organization.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Token architecture</Text>
        <Text style={styles.panelText}>
          Large design systems scale when raw foundations, semantic meaning, and
          component-level contracts are separated instead of collapsing into one token file.
        </Text>
      </View>

      {designSystemOperatingModel.tokenGroups.map(tokenGroup => (
        <TokenCard key={tokenGroup.id} tokenGroup={tokenGroup} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Component contracts</Text>
        <Text style={styles.panelText}>
          Stable primitives and domain-owned compositions need different governance,
          ownership, and rollout expectations.
        </Text>
      </View>

      {designSystemOperatingModel.componentContracts.map(component => (
        <ComponentCard key={component.id} component={component} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Distribution surfaces</Text>
        <Text style={styles.panelText}>
          A design system only functions at scale if there is a clear distribution and
          documentation path for consumers across product teams.
        </Text>
      </View>

      {designSystemOperatingModel.distributionSurfaces.map(surface => (
        <DistributionCard key={surface.id} surface={surface} />
      ))}

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Operating principles</Text>
        {designSystemOperatingModel.operatingPrinciples.map(principle => (
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
  tokenCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2563eb',
    padding: 16,
    gap: 6,
  },
  tokenTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  tokenMeta: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tokenText: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 20,
  },
  componentCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#7c3aed',
    padding: 16,
    gap: 6,
  },
  componentTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  componentMeta: {
    color: '#c4b5fd',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  componentText: {
    color: '#ddd6fe',
    fontSize: 14,
    lineHeight: 20,
  },
  distributionCard: {
    backgroundColor: '#101826',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#0f766e',
    padding: 16,
    gap: 6,
  },
  distributionTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  distributionText: {
    color: '#ccfbf1',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default DesignSystemOperatingConsole;
