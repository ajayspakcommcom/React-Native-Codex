import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  getExperimentAssignments,
  getExperimentGovernanceSnapshot,
} from './experimentCoordinator';

const evaluationContext = {
  environment: 'production' as const,
  stableUserHashBucket: 27,
  userSegments: ['employees', 'beta-testers'],
};

function ExperimentationControlCenter() {
  const governance = getExperimentGovernanceSnapshot();
  const assignments = getExperimentAssignments(evaluationContext);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Expert • Release &amp; Ops</Text>
        <Text style={styles.title}>A/B Testing</Text>
        <Text style={styles.body}>
          Enterprise experiments should combine deterministic assignment,
          explicit metrics, and ownership discipline rather than scattered
          variant switches in product code.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Evaluation context</Text>
        <Text style={styles.cardBody}>
          Environment: {evaluationContext.environment}
        </Text>
        <Text style={styles.cardBody}>
          Stable bucket: {evaluationContext.stableUserHashBucket}
        </Text>
        <Text style={styles.cardBody}>
          Segments: {evaluationContext.userSegments.join(', ')}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Governance rules</Text>
        {governance.experimentationRules.map(rule => (
          <Text key={rule} style={styles.bulletLine}>
            - {rule}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignments</Text>
        {assignments.map(assignment => (
          <View key={assignment.experiment.key} style={styles.assignmentCard}>
            <Text style={styles.assignmentTitle}>{assignment.experiment.title}</Text>
            <Text style={styles.cardBody}>
              Owner: {assignment.experiment.ownerTeam}
            </Text>
            <Text style={styles.cardBody}>
              Assigned variant: {assignment.assignedVariant.title}
            </Text>
            <Text style={styles.cardBody}>
              Primary metric: {assignment.experiment.primaryMetric.title}
            </Text>
            <Text style={styles.cardBody}>
              Guardrails:{' '}
              {assignment.experiment.guardrailMetrics
                .map(metric => metric.title)
                .join(', ')}
            </Text>
            <Text style={styles.cardBody}>
              Expires: {assignment.experiment.expiresOn}
            </Text>
            <Text style={styles.cardBody}>Reason: {assignment.reason}</Text>
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
    color: '#2dd4bf',
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
  assignmentCard: {
    borderRadius: 18,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 18,
    gap: 6,
  },
  assignmentTitle: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ExperimentationControlCenter;
