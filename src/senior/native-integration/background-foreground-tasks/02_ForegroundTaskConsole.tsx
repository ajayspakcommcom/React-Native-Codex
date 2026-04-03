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

import {foregroundTaskCoordinator} from './foreground/foregroundTaskCoordinator';

const ForegroundTaskConsole = () => {
  const policies = useMemo(() => foregroundTaskCoordinator.listPolicies(), []);
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);

  const handleRun = async (policyId: string) => {
    setActivePolicyId(policyId);
    setCompletionMessage(null);

    try {
      const result = await foregroundTaskCoordinator.runTask(policyId);
      setCompletionMessage(result.completionMessage);
    } finally {
      setActivePolicyId(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Native Integration</Text>
          <Text style={styles.heroTitle}>Foreground Task Console</Text>
          <Text style={styles.heroDescription}>
            Foreground work is user-visible, immediate, and should expose progress
            and completion without borrowing background execution assumptions.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Foreground Task Rules</Text>
          <Text style={styles.ruleText}>
            Foreground tasks should optimize for responsiveness, progress clarity,
            and safe retries under direct user control.
          </Text>
          <Text style={styles.ruleText}>
            If work becomes non-urgent, it should be handed off to a background path
            deliberately instead of drifting there accidentally.
          </Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>User-Visible Tasks</Text>
          {policies.map(policy => (
            <View key={policy.id} style={styles.policyCard}>
              <Text style={styles.policyTitle}>{policy.label}</Text>
              <Text style={styles.policyMeta}>
                Priority: {policy.priority} | User visible: {policy.userVisible ? 'Yes' : 'No'}
              </Text>
              <Pressable
                accessibilityRole="button"
                disabled={activePolicyId === policy.id}
                onPress={() => {
                  handleRun(policy.id).catch(() => undefined);
                }}
                style={[
                  styles.runButton,
                  activePolicyId === policy.id && styles.runButtonDisabled,
                ]}>
                <Text style={styles.runButtonText}>
                  {activePolicyId === policy.id ? 'Running...' : 'Run foreground task'}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        {activePolicyId ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Executing foreground workflow...</Text>
          </View>
        ) : null}

        {completionMessage ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultText}>{completionMessage}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForegroundTaskConsole;

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
    gap: 8,
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
  runButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  runButtonDisabled: {
    opacity: 0.65,
  },
  runButtonText: {
    color: '#eff6ff',
    fontWeight: '800',
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
  },
  resultCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  resultText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
});
