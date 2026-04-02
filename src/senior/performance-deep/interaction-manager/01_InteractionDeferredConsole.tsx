import React, {useMemo, useState} from 'react';
import {
  InteractionManager,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type IncidentSeverity = 'critical' | 'high' | 'medium';

type IncidentRecord = {
  id: string;
  service: string;
  owner: string;
  severity: IncidentSeverity;
  region: string;
};

const baseRecords: ReadonlyArray<IncidentRecord> = [
  {
    id: 'inc-101',
    service: 'checkout-core',
    owner: 'Platform Ops',
    severity: 'critical',
    region: 'ap-south-1',
  },
  {
    id: 'inc-102',
    service: 'inventory-sync',
    owner: 'Supply Ops',
    severity: 'high',
    region: 'eu-west-1',
  },
  {
    id: 'inc-103',
    service: 'search-edge',
    owner: 'Discovery',
    severity: 'medium',
    region: 'us-east-1',
  },
];

const buildExpandedDataset = () =>
  Array.from({length: 220}, (_, index) => {
    const source = baseRecords[index % baseRecords.length];

    return {
      ...source,
      id: `${source.id}-${index}`,
    };
  });

const InteractionDeferredConsole = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'incidents'>(
    'overview',
  );
  const [isHydrating, setIsHydrating] = useState(false);
  const [summary, setSummary] = useState<{
    total: number;
    critical: number;
    byRegion: Record<string, number>;
  } | null>(null);

  const incidents = useMemo(() => buildExpandedDataset(), []);

  const handleTabPress = (nextTab: 'overview' | 'incidents') => {
    setSelectedTab(nextTab);

    if (nextTab !== 'incidents') {
      return;
    }

    setIsHydrating(true);

    InteractionManager.runAfterInteractions(() => {
      const byRegion = incidents.reduce<Record<string, number>>((acc, incident) => {
        acc[incident.region] = (acc[incident.region] ?? 0) + 1;
        return acc;
      }, {});

      const nextSummary = {
        total: incidents.length,
        critical: incidents.filter(incident => incident.severity === 'critical')
          .length,
        byRegion,
      };

      setSummary(nextSummary);
      setIsHydrating(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Performance</Text>
          <Text style={styles.heroTitle}>Interaction Deferred Console</Text>
          <Text style={styles.heroDescription}>
            The tab switch updates immediately. Expensive grouping and summary work
            waits until the active interaction completes.
          </Text>
        </View>

        <View style={styles.tabRail}>
          {(['overview', 'incidents'] as const).map(tab => (
            <Pressable
              key={tab}
              accessibilityRole="button"
              onPress={() => {
                handleTabPress(tab);
              }}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Why Interaction Manager Matters</Text>
          <Text style={styles.ruleText}>
            Heavy follow-up work should not compete with the gesture, transition, or
            press path that the user feels directly.
          </Text>
          <Text style={styles.ruleText}>
            This pattern keeps navigation and animation responsive while still
            allowing non-urgent computation to complete shortly after.
          </Text>
        </View>

        {selectedTab === 'overview' ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Overview</Text>
            <Text style={styles.panelText}>
              Press `incidents` to simulate a screen that needs expensive summary
              hydration after the user-facing interaction finishes.
            </Text>
          </View>
        ) : (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Incidents</Text>
            <Text style={styles.panelText}>
              Dataset size: {incidents.length} records
            </Text>
            <Text style={styles.panelText}>
              Deferred hydration state: {isHydrating ? 'running' : 'complete'}
            </Text>

            {summary ? (
              <View style={styles.summaryBlock}>
                <Text style={styles.summaryText}>Total incidents: {summary.total}</Text>
                <Text style={styles.summaryText}>
                  Critical incidents: {summary.critical}
                </Text>
                {Object.entries(summary.byRegion).map(([region, count]) => (
                  <Text key={region} style={styles.summaryText}>
                    {region}: {count}
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={styles.pendingText}>
                Waiting for post-interaction summary generation...
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InteractionDeferredConsole;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7fb',
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
  tabRail: {
    flexDirection: 'row',
    gap: 10,
  },
  tabButton: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#dbe4f0',
  },
  activeTabButton: {
    backgroundColor: '#1d4ed8',
  },
  tabText: {
    color: '#334155',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  activeTabText: {
    color: '#eff6ff',
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
    padding: 18,
    gap: 12,
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  panelText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  summaryBlock: {
    marginTop: 8,
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  pendingText: {
    marginTop: 8,
    color: '#9a3412',
    fontWeight: '700',
  },
});
