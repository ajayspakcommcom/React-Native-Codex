import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ActivitySeverity = 'critical' | 'high' | 'medium';

type ActivityRecord = {
  id: string;
  title: string;
  team: string;
  region: string;
  severity: ActivitySeverity;
  timestamp: string;
};

const PAGE_SIZE = 18;
const ROW_HEIGHT = 96;

const baseRecords: readonly Omit<ActivityRecord, 'id' | 'timestamp'>[] = [
  {
    title: 'Checkout fallback activation',
    team: 'Payments',
    region: 'ap-south-1',
    severity: 'critical',
  },
  {
    title: 'Search index replay lag',
    team: 'Discovery',
    region: 'us-east-1',
    severity: 'high',
  },
  {
    title: 'Catalog cache rebalance',
    team: 'Catalog',
    region: 'eu-west-1',
    severity: 'medium',
  },
];

const createDataset = (): ActivityRecord[] =>
  Array.from({length: 240}, (_, index) => {
    const source = baseRecords[index % baseRecords.length];

    return {
      ...source,
      id: `activity-${index}`,
      timestamp: `2026-04-02T${String(index % 24).padStart(2, '0')}:${String(
        (index * 3) % 60,
      ).padStart(2, '0')}:00Z`,
    };
  });

const fullDataset = createDataset();

type RowProps = {
  item: ActivityRecord;
};

const ActivityRow = React.memo(({item}: RowProps) => (
  <View style={styles.rowCard}>
    <View style={styles.rowHeader}>
      <Text style={styles.rowTitle}>{item.title}</Text>
      <Text
        style={[
          styles.severityBadge,
          item.severity === 'critical'
            ? styles.criticalBadge
            : item.severity === 'high'
              ? styles.highBadge
              : styles.mediumBadge,
        ]}>
        {item.severity}
      </Text>
    </View>
    <Text style={styles.rowMeta}>
      {item.team} | {item.region}
    </Text>
    <Text style={styles.rowMeta}>{item.timestamp}</Text>
  </View>
));

const BridgeOptimizedActivityFeed = () => {
  const [pageCount, setPageCount] = useState(1);
  const [activeSeverity, setActiveSeverity] = useState<ActivitySeverity | 'all'>(
    'all',
  );

  const filteredDataset = useMemo(() => {
    if (activeSeverity === 'all') {
      return fullDataset;
    }

    return fullDataset.filter(record => record.severity === activeSeverity);
  }, [activeSeverity]);

  const visibleRecords = useMemo(
    () => filteredDataset.slice(0, pageCount * PAGE_SIZE),
    [filteredDataset, pageCount],
  );

  const summary = useMemo(
    () => ({
      totalLoaded: visibleRecords.length,
      totalAvailable: filteredDataset.length,
      critical: filteredDataset.filter(item => item.severity === 'critical').length,
    }),
    [filteredDataset, visibleRecords.length],
  );

  const keyExtractor = (item: ActivityRecord) => item.id;

  const getItemLayout = (_data: ArrayLike<ActivityRecord> | null | undefined, index: number) => ({
    length: ROW_HEIGHT,
    offset: ROW_HEIGHT * index,
    index,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Performance</Text>
          <Text style={styles.heroTitle}>Bridge Optimized Activity Feed</Text>
          <Text style={styles.heroDescription}>
            The feed keeps the backing dataset outside component state, slices only
            the visible working set, and avoids pushing unnecessary whole-list churn
            into the native tree.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Optimization Rules</Text>
          <Text style={styles.ruleText}>
            Keep large immutable datasets outside transient UI state when they do
            not need to be rewritten on every interaction.
          </Text>
          <Text style={styles.ruleText}>
            Send smaller visible slices to `FlatList`, keep row props stable, and
            avoid rebuilding large payloads for minor filter changes.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Loaded: {summary.totalLoaded}</Text>
          <Text style={styles.summaryText}>Available: {summary.totalAvailable}</Text>
          <Text style={styles.summaryText}>Critical: {summary.critical}</Text>
        </View>

        <View style={styles.filterRail}>
          {(['all', 'critical', 'high', 'medium'] as const).map(severity => (
            <Pressable
              key={severity}
              accessibilityRole="button"
              onPress={() => {
                setActiveSeverity(severity);
                setPageCount(1);
              }}
              style={[
                styles.filterChip,
                activeSeverity === severity && styles.activeFilterChip,
              ]}>
              <Text
                style={[
                  styles.filterChipText,
                  activeSeverity === severity && styles.activeFilterChipText,
                ]}>
                {severity}
              </Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={visibleRecords}
          keyExtractor={keyExtractor}
          renderItem={({item}) => <ActivityRow item={item} />}
          getItemLayout={getItemLayout}
          removeClippedSubviews
          windowSize={7}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={32}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          onEndReachedThreshold={0.35}
          onEndReached={() => {
            if (visibleRecords.length < filteredDataset.length) {
              setPageCount(current => current + 1);
            }
          }}
          ListFooterComponent={
            visibleRecords.length < filteredDataset.length ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setPageCount(current => current + 1);
                }}
                style={styles.loadMoreButton}>
                <Text style={styles.loadMoreButtonText}>Load next slice</Text>
              </Pressable>
            ) : (
              <View style={styles.endState}>
                <Text style={styles.endStateText}>Visible working set is complete.</Text>
              </View>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default BridgeOptimizedActivityFeed;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef4fb',
  },
  screen: {
    flex: 1,
    padding: 20,
    gap: 18,
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
    fontSize: 28,
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
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  filterRail: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#dbe4f0',
  },
  activeFilterChip: {
    backgroundColor: '#1d4ed8',
  },
  filterChipText: {
    color: '#334155',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  activeFilterChipText: {
    color: '#eff6ff',
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 12,
    paddingBottom: 28,
  },
  rowCard: {
    height: ROW_HEIGHT - 12,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 16,
    gap: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  rowTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  rowMeta: {
    fontSize: 13,
    color: '#475569',
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: '700',
  },
  criticalBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  highBadge: {
    backgroundColor: '#ffedd5',
    color: '#9a3412',
  },
  mediumBadge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  loadMoreButton: {
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: '#f8fafc',
    fontWeight: '800',
  },
  endState: {
    marginTop: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  endStateText: {
    color: '#475569',
    fontWeight: '700',
  },
});
