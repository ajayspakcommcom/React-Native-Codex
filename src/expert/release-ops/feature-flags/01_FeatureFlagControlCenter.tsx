import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  getFeatureFlagGovernanceSnapshot,
  getFeatureFlagSnapshots,
} from './featureFlagCoordinator';

const evaluationContext = {
  environment: 'production' as const,
  userSegments: ['employees', 'beta-testers'],
  stableUserHashBucket: 18,
};

function FeatureFlagControlCenter() {
  const governance = getFeatureFlagGovernanceSnapshot();
  const snapshots = getFeatureFlagSnapshots(evaluationContext);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Expert • Release &amp; Ops</Text>
        <Text style={styles.title}>Feature Flags</Text>
        <Text style={styles.body}>
          Enterprise feature flags should be governed rollout controls with
          ownership, targeting, defaults, and cleanup posture, not random local
          booleans scattered across screens.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Evaluation context</Text>
        <Text style={styles.cardBody}>
          Environment: {evaluationContext.environment}
        </Text>
        <Text style={styles.cardBody}>
          Segments: {evaluationContext.userSegments.join(', ')}
        </Text>
        <Text style={styles.cardBody}>
          Stable bucket: {evaluationContext.stableUserHashBucket}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Governance rules</Text>
        {governance.governanceRules.map(rule => (
          <Text key={rule} style={styles.bulletLine}>
            - {rule}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Evaluated flags</Text>
        {snapshots.map(snapshot => (
          <View key={snapshot.definition.key} style={styles.flagCard}>
            <Text style={styles.flagTitle}>{snapshot.definition.title}</Text>
            <Text style={styles.cardBody}>Key: {snapshot.definition.key}</Text>
            <Text style={styles.cardBody}>
              Owner: {snapshot.definition.ownerTeam}
            </Text>
            <Text style={styles.cardBody}>
              Expires: {snapshot.definition.expiresOn}
            </Text>
            <Text style={styles.cardBody}>
              Mode: {snapshot.rollout.mode}
            </Text>
            <Text style={styles.cardBody}>
              Evaluated value: {String(snapshot.evaluatedValue)}
            </Text>
            <Text style={styles.cardBody}>Reason: {snapshot.reason}</Text>
          </View>
        ))}
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
    gap: 20,
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
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f9fafb',
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    color: '#d1d5db',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '700',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
  },
  cardBody: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  bulletLine: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 21,
  },
  flagCard: {
    borderRadius: 18,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 18,
    gap: 6,
  },
  flagTitle: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FeatureFlagControlCenter;
