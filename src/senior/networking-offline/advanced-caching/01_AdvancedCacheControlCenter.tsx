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

import {releaseOverviewCacheRepository} from './cacheRepository';
import type {
  CachePolicy,
  CacheReadResult,
  ReleaseOverviewSnapshot,
} from './cacheContracts';

const policies: readonly CachePolicy[] = [
  'network-first',
  'cache-first',
  'stale-while-revalidate',
];

const regions: readonly ReleaseOverviewSnapshot['region'][] = [
  'ap-south-1',
  'eu-west-1',
  'us-east-1',
];

const AdvancedCacheControlCenter = () => {
  const [activePolicy, setActivePolicy] = useState<CachePolicy>('network-first');
  const [activeRegion, setActiveRegion] =
    useState<ReleaseOverviewSnapshot['region']>('ap-south-1');
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] =
    useState<CacheReadResult<ReleaseOverviewSnapshot> | null>(null);

  const loadOverview = async (
    region: ReleaseOverviewSnapshot['region'],
    policy: CachePolicy,
  ) => {
    setIsLoading(true);
    const nextResult = await releaseOverviewCacheRepository.resolve(region, policy);
    setResult(nextResult);
    setIsLoading(false);
  };

  useEffect(() => {
    loadOverview(activeRegion, activePolicy).catch(() => undefined);
  }, [activeRegion, activePolicy]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Networking</Text>
          <Text style={styles.heroTitle}>Advanced Cache Control Center</Text>
          <Text style={styles.heroDescription}>
            Memory and MMKV persistence sit behind one repository. The screen chooses
            policy, while freshness and revalidation stay out of the UI layer.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Enterprise Cache Rules</Text>
          <Text style={styles.ruleText}>
            Cache policy belongs to a repository or data layer, not inside each
            screen branch.
          </Text>
          <Text style={styles.ruleText}>
            Freshness, expiry, and stale tolerance should be explicit so product
            teams know when data is live, stale, or being refreshed.
          </Text>
        </View>

        <View style={styles.controlCard}>
          <Text style={styles.controlHeading}>Policy</Text>
          <View style={styles.chipRow}>
            {policies.map(policy => (
              <Pressable
                key={policy}
                accessibilityRole="button"
                onPress={() => {
                  setActivePolicy(policy);
                }}
                style={[
                  styles.chip,
                  activePolicy === policy && styles.activeChip,
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    activePolicy === policy && styles.activeChipText,
                  ]}>
                  {policy}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.controlCard}>
          <Text style={styles.controlHeading}>Region</Text>
          <View style={styles.chipRow}>
            {regions.map(region => (
              <Pressable
                key={region}
                accessibilityRole="button"
                onPress={() => {
                  setActiveRegion(region);
                }}
                style={[
                  styles.chip,
                  activeRegion === region && styles.activeChip,
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    activeRegion === region && styles.activeChipText,
                  ]}>
                  {region}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              releaseOverviewCacheRepository.clear(activeRegion);
              loadOverview(activeRegion, activePolicy).catch(() => undefined);
            }}
            style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Clear Active Cache Entry</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Resolving cache policy...</Text>
          </View>
        ) : result ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resolved Snapshot</Text>
            <Text style={styles.resultMeta}>Source: {result.source}</Text>
            <Text style={styles.resultMeta}>Freshness: {result.freshness}</Text>
            <Text style={styles.resultMeta}>
              Cached at: {new Date(result.metadata.cachedAt).toLocaleTimeString('en-IN')}
            </Text>
            <Text style={styles.resultMeta}>
              Expires at: {new Date(result.metadata.expiresAt).toLocaleTimeString('en-IN')}
            </Text>

            <View style={styles.snapshotCard}>
              <Text style={styles.snapshotTitle}>{result.value.team}</Text>
              <Text style={styles.snapshotMeta}>Region: {result.value.region}</Text>
              <Text style={styles.snapshotMeta}>
                Queue size: {result.value.queueSize}
              </Text>
              <Text style={styles.snapshotMeta}>
                Blocked approvals: {result.value.blockedApprovals}
              </Text>
              <Text style={styles.snapshotMeta}>
                Generated at: {result.value.generatedAt}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdvancedCacheControlCenter;

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
  snapshotCard: {
    marginTop: 8,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 16,
    gap: 8,
  },
  snapshotTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  snapshotMeta: {
    fontSize: 14,
    color: '#475569',
  },
});
