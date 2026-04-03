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

import {offlineRepository} from './offlineRepository';
import type {OfflineBoardSnapshot} from './offlineContracts';

const OfflineFirstOperationsBoard = () => {
  const [mode, setMode] = useState<OfflineBoardSnapshot['mode']>('offline');
  const [snapshot, setSnapshot] = useState<OfflineBoardSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const loadSnapshot = (nextMode: OfflineBoardSnapshot['mode']) => {
    setIsLoading(true);
    const nextSnapshot = offlineRepository.load(nextMode);
    setSnapshot(nextSnapshot);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSnapshot(mode);
  }, [mode]);

  const handleToggleApproval = (taskId: string) => {
    const nextSnapshot = offlineRepository.toggleApproval(taskId, mode);
    setSnapshot(nextSnapshot);
  };

  const handleSynchronize = async () => {
    setIsSyncing(true);
    const nextSnapshot = await offlineRepository.synchronize(mode);
    setSnapshot(nextSnapshot);
    setIsSyncing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Networking</Text>
          <Text style={styles.heroTitle}>Offline-First Operations Board</Text>
          <Text style={styles.heroDescription}>
            The board writes locally first, persists unsynced mutations, and only
            reconciles against the network when the app is in an online mode.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Offline-First Rules</Text>
          <Text style={styles.ruleText}>
            Reads should come from local state first. Network improves freshness,
            but does not block core task continuity.
          </Text>
          <Text style={styles.ruleText}>
            Mutations should be queued durably and reconciled explicitly instead of
            disappearing when connectivity changes.
          </Text>
        </View>

        <View style={styles.controlCard}>
          <Text style={styles.controlHeading}>Connectivity Mode</Text>
          <View style={styles.chipRow}>
            {(['offline', 'online'] as const).map(nextMode => (
              <Pressable
                key={nextMode}
                accessibilityRole="button"
                onPress={() => {
                  setMode(nextMode);
                }}
                style={[
                  styles.chip,
                  mode === nextMode && styles.activeChip,
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    mode === nextMode && styles.activeChipText,
                  ]}>
                  {nextMode}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              handleSynchronize().catch(() => undefined);
            }}
            style={styles.secondaryButton}
            disabled={isSyncing}>
            <Text style={styles.secondaryButtonText}>
              {isSyncing ? 'Synchronizing...' : 'Run Sync'}
            </Text>
          </Pressable>
        </View>

        {isLoading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Loading offline-first board...</Text>
          </View>
        ) : snapshot ? (
          <>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Board Status</Text>
              <Text style={styles.summaryText}>Mode: {snapshot.mode}</Text>
              <Text style={styles.summaryText}>
                Unsynced changes: {snapshot.unsyncedCount}
              </Text>
              <Text style={styles.summaryText}>
                Last successful sync: {snapshot.lastSuccessfulSyncAt ?? 'Never'}
              </Text>
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Approval Tasks</Text>
              {snapshot.tasks.map(task => (
                <View key={task.id} style={styles.taskCard}>
                  <View style={styles.taskHeader}>
                    <View style={styles.taskTextBlock}>
                      <Text style={styles.taskTitle}>{task.service}</Text>
                      <Text style={styles.taskMeta}>
                        {task.environment} | Owner: {task.owner}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.statusBadge,
                        task.approved ? styles.approvedBadge : styles.pendingBadge,
                      ]}>
                      {task.approved ? 'Approved' : 'Pending'}
                    </Text>
                  </View>

                  <Pressable
                    accessibilityRole="button"
                    onPress={() => {
                      handleToggleApproval(task.id);
                    }}
                    style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Toggle Local Approval</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfflineFirstOperationsBoard;

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
  secondaryButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#f8fafc',
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
  taskCard: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 14,
    gap: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  taskTextBlock: {
    flex: 1,
    gap: 6,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  taskMeta: {
    fontSize: 14,
    color: '#475569',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  approvedBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  pendingBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: '#eff6ff',
    fontWeight: '800',
  },
});
