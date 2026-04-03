import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {profilingScenarios, profilingTools} from './profilingWorkflowModel';

function ToolCard(props: {
  title: string;
  bestFor: string[];
  executionSurface: string;
  releaseExpectation: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.cardLabel}>Best for</Text>
      <Text style={styles.cardBody}>{props.bestFor.join(', ')}</Text>
      <Text style={styles.cardLabel}>Execution surface</Text>
      <Text style={styles.cardBody}>{props.executionSurface}</Text>
      <Text style={styles.cardLabel}>Enterprise rule</Text>
      <Text style={styles.cardBody}>{props.releaseExpectation}</Text>
    </View>
  );
}

function ScenarioCard(props: {
  title: string;
  symptom: string;
  recommendedTool: string;
  reason: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.cardBody}>{props.symptom}</Text>
      <Text style={styles.cardLabel}>Recommended tool</Text>
      <Text style={styles.cardBody}>{props.recommendedTool}</Text>
      <Text style={styles.cardLabel}>Why</Text>
      <Text style={styles.cardBody}>{props.reason}</Text>
    </View>
  );
}

function NativeProfilingConsole() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Expert • Advanced Native</Text>
        <Text style={styles.title}>Performance Profiling</Text>
        <Text style={styles.body}>
          Enterprise native performance work should route each regression class
          to the right profiler instead of treating all performance debugging as
          one tool problem.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profiler posture</Text>
        {profilingTools.map(tool => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            bestFor={tool.bestFor}
            executionSurface={tool.executionSurface}
            releaseExpectation={tool.releaseExpectation}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scenario routing</Text>
        {profilingScenarios.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            symptom={scenario.symptom}
            recommendedTool={scenario.recommendedTool}
            reason={scenario.reason}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#030712',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  hero: {
    borderRadius: 24,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 24,
    gap: 10,
  },
  eyebrow: {
    color: '#22c55e',
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
    borderRadius: 18,
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
  cardLabel: {
    color: '#86efac',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  cardBody: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default NativeProfilingConsole;
