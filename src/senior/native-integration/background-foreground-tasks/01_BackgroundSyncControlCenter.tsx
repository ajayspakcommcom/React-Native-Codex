import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {backgroundTaskCoordinator} from './background/backgroundTaskCoordinator';

const BackgroundSyncControlCenter = () => {
  const policies = useMemo(() => backgroundTaskCoordinator.listPolicies(), []);
  const [isRunning, setIsRunning] = useState(false);
  const [runs, setRuns] = useState<Awaited<
    ReturnType<typeof backgroundTaskCoordinator.runSimulation>
  > | null>(null);

  const handleRunSimulation = async () => {
    setIsRunning(true);
    const nextRuns = await backgroundTaskCoordinator.runSimulation();
    setRuns(nextRuns);
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Native Integration</Text>
          <Text style={styles.heroTitle}>Background Sync Control Center</Text>
          <Text style={styles.heroDescription}>
            Background work is modeled around policy, retry limits, and constrained
            execution instead of being treated like a hidden foreground task.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Background Task Rules</Text>
          <Text style={styles.ruleText}>
            Background execution should be resilient, idempotent, and allowed to be
            resumed or retried by the scheduler.
          </Text>
          <Text style={styles.ruleText}>
            User-visible side effects should stay out of the background path unless
            the platform explicitly supports that contract.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            handleRunSimulation().catch(() => undefined);
          }}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Run Background Task Simulation</Text>
        </Pressable>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Registered Policies</Text>
          {policies.map(policy => (
            <View key={policy.id} style={styles.policyCard}>
              <Text style={styles.policyTitle}>{policy.label}</Text>
              <Text style={styles.policyMeta}>
                Priority: {policy.priority} | Retries: {policy.maxRetries}
              </Text>
              <Text style={styles.policyMeta}>
                Requires network: {policy.requiresNetwork ? 'Yes' : 'No'}
              </Text>
            </View>
          ))}
        </View>

        {isRunning ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Executing deferred background policy simulation...</Text>
          </View>
        ) : runs ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Execution Results</Text>
            {runs.map(run => (
              <View key={run.id} style={styles.resultCard}>
                <Text style={styles.resultTitle}>{run.policyId}</Text>
                <Text style={styles.resultMeta}>
                  Status: {run.status} | Attempts: {run.attempts}
                </Text>
                <Text style={styles.resultSummary}>{run.summary}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BackgroundSyncControlCenter;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef4fb',
  },
  contentContainer: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#111827',
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#bfdbfe',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#f8fafc',
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#dbeafe',
  },
  ruleCard: {
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#93c5fd',
    padding: 18,
    gap: 10,
  },
  ruleHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  ruleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1d4ed8',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#eff6ff',
    fontWeight: '800',
  },
  panel: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 12,
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  policyCard: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 14,
    gap: 6,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  policyMeta: {
    fontSize: 14,
    color: '#475569',
  },
  loadingState: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#475569',
    textAlign: 'center',
  },
  resultCard: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 14,
    gap: 6,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  resultMeta: {
    fontSize: 14,
    color: '#334155',
  },
  resultSummary: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});
