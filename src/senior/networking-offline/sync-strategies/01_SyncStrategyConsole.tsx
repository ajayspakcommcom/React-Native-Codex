import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {syncEngine} from './syncEngine';
import type {SyncCheckpoint, SyncPolicy, SyncRunResult} from './syncContracts';

const policies: readonly SyncPolicy[] = [
  'server-wins',
  'client-wins',
  'manual-review',
];

const SyncStrategyConsole = () => {
  const [policy, setPolicy] = useState<SyncPolicy>('manual-review');
  const [checkpoint, setCheckpoint] = useState<SyncCheckpoint | null>(null);
  const [result, setResult] = useState<SyncRunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCheckpoint(syncEngine.getCheckpoint());
  }, []);

  const handleRunSync = async () => {
    setIsRunning(true);
    const nextResult = await syncEngine.run(policy);
    setResult(nextResult);
    setCheckpoint(nextResult.checkpoint);
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Networking</Text>
          <Text style={styles.heroTitle}>Sync Strategy Console</Text>
          <Text style={styles.heroDescription}>
            Push, pull, conflict policy, and checkpoint advancement are all explicit
            so the team can reason about reconciliation behavior under change.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Sync Strategy Rules</Text>
          <Text style={styles.ruleText}>
            Push and pull are not the same concern. Conflict handling should be a
            policy decision, not an accidental side effect.
          </Text>
          <Text style={styles.ruleText}>
            Checkpoints must move forward only when the sync run is complete and
            the chosen reconciliation strategy has been applied.
          </Text>
        </View>

        <View style={styles.controlCard}>
          <Text style={styles.controlHeading}>Conflict Policy</Text>
          <View style={styles.chipRow}>
            {policies.map(nextPolicy => (
              <Pressable
                key={nextPolicy}
                accessibilityRole="button"
                onPress={() => {
                  setPolicy(nextPolicy);
                }}
                style={[
                  styles.chip,
                  policy === nextPolicy && styles.activeChip,
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    policy === nextPolicy && styles.activeChipText,
                  ]}>
                  {nextPolicy}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              handleRunSync().catch(() => undefined);
            }}
            style={styles.primaryButton}
            disabled={isRunning}>
            <Text style={styles.primaryButtonText}>
              {isRunning ? 'Running sync...' : 'Run Sync Strategy'}
            </Text>
          </Pressable>
        </View>

        {checkpoint ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Current Checkpoint</Text>
            <Text style={styles.summaryText}>Cursor: {checkpoint.cursor}</Text>
            <Text style={styles.summaryText}>Synced at: {checkpoint.syncedAt}</Text>
          </View>
        ) : null}

        {isRunning ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Executing push and pull phases...</Text>
          </View>
        ) : result ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Sync Result</Text>
            <Text style={styles.resultMeta}>Pushed: {result.pushedCount}</Text>
            <Text style={styles.resultMeta}>Pulled: {result.pulledCount}</Text>
            <Text style={styles.resultMeta}>Summary: {result.summary}</Text>

            <View style={styles.conflictBlock}>
              <Text style={styles.conflictHeading}>Conflicts</Text>
              {result.conflicts.length === 0 ? (
                <Text style={styles.conflictText}>No conflicts detected.</Text>
              ) : (
                result.conflicts.map(conflict => (
                  <View key={conflict.recordId} style={styles.conflictCard}>
                    <Text style={styles.conflictTitle}>{conflict.recordId}</Text>
                    <Text style={styles.conflictText}>
                      Policy: {conflict.resolution}
                    </Text>
                    <Text style={styles.conflictText}>{conflict.summary}</Text>
                  </View>
                ))
              )}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SyncStrategyConsole;

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
  controlCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 14,
  },
  controlHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: 999,
    backgroundColor: '#dbe4f0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  activeChip: {
    backgroundColor: '#1d4ed8',
  },
  chipText: {
    color: '#334155',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  activeChipText: {
    color: '#eff6ff',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#f8fafc',
    fontWeight: '800',
  },
  summaryCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 8,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    color: '#334155',
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
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  resultMeta: {
    fontSize: 14,
    color: '#334155',
  },
  conflictBlock: {
    marginTop: 8,
    gap: 10,
  },
  conflictHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  conflictCard: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 14,
    gap: 6,
  },
  conflictTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  conflictText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});
