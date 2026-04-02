import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {ReleaseLaneCard} from '../components/ReleaseLaneCard';
import {useReleaseWorkspace} from '../hooks/useReleaseWorkspace';
import {filterReleaseLanes, summarizeReleaseLanes} from '../state/releaseFilters';
import type {ReleaseLaneStatus} from '../types';

const statuses: readonly ('all' | ReleaseLaneStatus)[] = [
  'all',
  'ready',
  'blocked',
  'review',
];

export const ReleaseControlScreen = () => {
  const {workspace, isLoading} = useReleaseWorkspace();
  const [activeStatus, setActiveStatus] = useState<'all' | ReleaseLaneStatus>('all');

  const visibleLanes = useMemo(
    () => filterReleaseLanes(workspace?.lanes ?? [], activeStatus),
    [workspace?.lanes, activeStatus],
  );

  const summary = useMemo(
    () => summarizeReleaseLanes(workspace?.lanes ?? []),
    [workspace?.lanes],
  );

  if (isLoading || workspace === null) {
    return (
      <View style={styles.loadingState}>
        <ActivityIndicator color="#1d4ed8" />
        <Text style={styles.loadingText}>Loading release-control feature...</Text>
      </View>
    );
  }

  return (
    <View style={styles.surface}>
      <Text style={styles.featureLabel}>Feature: release-control</Text>
      <Text style={styles.title}>{workspace.title}</Text>
      <Text style={styles.subtitle}>Train: {workspace.releaseTrain}</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Total: {summary.total}</Text>
        <Text style={styles.summaryText}>Ready: {summary.ready}</Text>
        <Text style={styles.summaryText}>Blocked: {summary.blocked}</Text>
        <Text style={styles.summaryText}>Review: {summary.review}</Text>
      </View>

      <View style={styles.filterRow}>
        {statuses.map(status => (
          <Pressable
            key={status}
            accessibilityRole="button"
            onPress={() => {
              setActiveStatus(status);
            }}
            style={[
              styles.filterButton,
              activeStatus === status && styles.activeFilterButton,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeStatus === status && styles.activeFilterText,
              ]}>
              {status}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.cardsColumn}>
        {visibleLanes.map(lane => (
          <ReleaseLaneCard key={lane.id} lane={lane} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
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
  featureLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1d4ed8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    color: '#4b5563',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryText: {
    color: '#1f2937',
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  activeFilterButton: {
    backgroundColor: '#1d4ed8',
  },
  filterText: {
    color: '#374151',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  activeFilterText: {
    color: '#eff6ff',
  },
  cardsColumn: {
    gap: 12,
  },
});
