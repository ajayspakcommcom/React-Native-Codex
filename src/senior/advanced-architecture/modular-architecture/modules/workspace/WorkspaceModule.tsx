import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {ModuleDefinition, ModuleScreenProps} from '../../contracts/moduleContract';
import type {WorkspaceSnapshot} from '../../contracts/operationsDomain';

const WorkspaceModuleScreen = ({container}: ModuleScreenProps) => {
  const [snapshot, setSnapshot] = useState<WorkspaceSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPromoting, setIsPromoting] = useState(false);

  const loadSnapshot = useCallback(async () => {
    setIsLoading(true);
    const nextSnapshot = await container.workspaceService.getSnapshot();
    setSnapshot(nextSnapshot);
    setIsLoading(false);
  }, [container]);

  useEffect(() => {
    const run = async () => {
      await loadSnapshot();
    };

    run().catch(() => undefined);
  }, [loadSnapshot]);

  const handlePromoteReadiness = async () => {
    setIsPromoting(true);
    const nextSnapshot = await container.workspaceService.promoteReleaseReadiness();
    setSnapshot(nextSnapshot);
    setIsPromoting(false);
  };

  if (isLoading || snapshot === null) {
    return (
      <View style={styles.loadingState}>
        <ActivityIndicator color="#14532d" />
        <Text style={styles.loadingText}>Loading workspace module...</Text>
      </View>
    );
  }

  return (
    <View style={styles.moduleSurface}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionLabel}>Workspace Module</Text>
          <Text style={styles.heading}>{snapshot.releaseName}</Text>
          <Text style={styles.subtleText}>
            Window: {snapshot.deploymentWindow} | Approver: {snapshot.approvalOwner}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={handlePromoteReadiness}
          style={[styles.primaryButton, isPromoting && styles.buttonDisabled]}
          disabled={isPromoting}>
          <Text style={styles.primaryButtonText}>
            {isPromoting ? 'Applying...' : 'Promote Readiness'}
          </Text>
        </Pressable>
      </View>

      {snapshot.lanes.map(lane => (
        <View key={lane.id} style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>{lane.label}</Text>
            <Text
              style={[
                styles.statusBadge,
                lane.releaseReady ? styles.statusReady : styles.statusBlocked,
              ]}>
              {lane.releaseReady ? 'Ready' : 'Needs attention'}
            </Text>
          </View>
          <Text style={styles.cardMeta}>Owner: {lane.owner}</Text>
          <Text style={styles.cardMeta}>Blocked tasks: {lane.blockedTasks}</Text>
        </View>
      ))}
    </View>
  );
};

export const workspaceModule: ModuleDefinition = {
  id: 'workspace',
  title: 'Workspace',
  summary: 'Release lanes and readiness progression live in an isolated feature module.',
  accentColor: '#14532d',
  Screen: WorkspaceModuleScreen,
};

const styles = StyleSheet.create({
  moduleSurface: {
    gap: 16,
  },
  loadingState: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#3f3f46',
    fontSize: 15,
  },
  headerRow: {
    gap: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  subtleText: {
    marginTop: 6,
    color: '#4b5563',
    fontSize: 14,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#14532d',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#f0fdf4',
    fontWeight: '700',
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 18,
    borderWidth: 1,
    borderColor: '#dcfce7',
    gap: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  cardMeta: {
    fontSize: 14,
    color: '#374151',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  statusReady: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  statusBlocked: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
});
