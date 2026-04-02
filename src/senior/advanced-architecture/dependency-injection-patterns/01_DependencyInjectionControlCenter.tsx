import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {
  ObservabilitySummary,
  ReleaseApprovalItem,
  SeniorDependencies,
} from './contracts/dependencyContracts';
import {createProductionDependencies} from './core/di/createDependencies';
import {DependencyProvider} from './core/di/DependencyProvider';
import {useDependencies} from './core/di/useDependencies';
import {createSandboxDependencies} from './sandbox/createSandboxDependencies';

const ApprovalWorkspace = ({title}: {title: string}) => {
  const {releaseApprovalGateway, observabilityGateway} = useDependencies();
  const [approvals, setApprovals] = useState<ReleaseApprovalItem[]>([]);
  const [summary, setSummary] = useState<ObservabilitySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeApprovalId, setActiveApprovalId] = useState<string | null>(null);

  const loadWorkspace = useCallback(async () => {
    setIsLoading(true);
    const [nextApprovals, nextSummary] = await Promise.all([
      releaseApprovalGateway.listPendingApprovals(),
      observabilityGateway.getSummary(),
    ]);
    setApprovals(nextApprovals);
    setSummary(nextSummary);
    setIsLoading(false);
  }, [observabilityGateway, releaseApprovalGateway]);

  useEffect(() => {
    const run = async () => {
      await loadWorkspace();
    };

    run().catch(() => undefined);
  }, [loadWorkspace]);

  const handleApprove = async (approvalId: string) => {
    setActiveApprovalId(approvalId);
    const nextApprovals = await releaseApprovalGateway.approve(approvalId);
    setApprovals(nextApprovals);
    setActiveApprovalId(null);
  };

  if (isLoading || summary === null) {
    return (
      <View style={styles.loadingState}>
        <ActivityIndicator color="#1d4ed8" />
        <Text style={styles.loadingText}>Loading injected workspace...</Text>
      </View>
    );
  }

  return (
    <View style={styles.workspaceSurface}>
      <Text style={styles.workspaceTitle}>{title}</Text>
      <Text style={styles.workspaceMeta}>
        Source: {summary.source} | Alert budget: {summary.alertBudgetRemaining}% |
        Incidents: {summary.activeIncidents}
      </Text>
      <Text style={styles.workspaceMeta}>
        Deployment freeze: {summary.deploymentFreeze ? 'Active' : 'Not active'}
      </Text>

      <View style={styles.cardsColumn}>
        {approvals.map(approval => (
          <View key={approval.id} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>{approval.service}</Text>
                <Text style={styles.cardMeta}>
                  {approval.environment} | Owner: {approval.owner}
                </Text>
                <Text style={styles.cardMeta}>Risk: {approval.riskLevel}</Text>
              </View>
              <Text
                style={[
                  styles.statusBadge,
                  approval.approved ? styles.approvedBadge : styles.pendingBadge,
                ]}>
                {approval.approved ? 'Approved' : 'Pending'}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={approval.approved || activeApprovalId === approval.id}
              onPress={() => {
                handleApprove(approval.id).catch(() => undefined);
              }}
              style={[
                styles.actionButton,
                (approval.approved || activeApprovalId === approval.id) &&
                  styles.actionButtonDisabled,
              ]}>
              <Text style={styles.actionButtonText}>
                {activeApprovalId === approval.id ? 'Applying...' : 'Approve'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const DependencyInjectionControlCenter = () => {
  const productionDependencies = useMemo(() => createProductionDependencies(), []);
  const sandboxDependencies = useMemo(() => createSandboxDependencies(), []);
  const [useSandboxRoot, setUseSandboxRoot] = useState(false);

  const rootDependencies: SeniorDependencies = useSandboxRoot
    ? sandboxDependencies
    : productionDependencies;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Architecture</Text>
          <Text style={styles.heroTitle}>Dependency Injection Patterns</Text>
          <Text style={styles.heroDescription}>
            Services are resolved through contracts and injected through a provider.
            A subtree can override dependencies without rewriting the feature itself.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>DI Rules</Text>
          <Text style={styles.ruleText}>
            Features consume typed interfaces instead of importing concrete gateways.
          </Text>
          <Text style={styles.ruleText}>
            The composition root decides which implementation is active for the app
            or for a scoped subtree.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setUseSandboxRoot(current => !current);
            }}
            style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              Root profile: {useSandboxRoot ? 'Sandbox' : 'Production-like'}
            </Text>
          </Pressable>
        </View>

        <DependencyProvider dependencies={rootDependencies}>
          <ApprovalWorkspace title="Root dependency graph" />

          <DependencyProvider
            dependencies={rootDependencies}
            overrides={{
              releaseApprovalGateway: sandboxDependencies.releaseApprovalGateway,
            }}>
            <ApprovalWorkspace title="Scoped override: sandbox approvals only" />
          </DependencyProvider>
        </DependencyProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DependencyInjectionControlCenter;

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
    backgroundColor: '#0f172a',
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#cbd5e1',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#f8fafc',
  },
  heroDescription: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 22,
  },
  ruleCard: {
    borderRadius: 20,
    backgroundColor: '#eef2ff',
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
  toggleButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleButtonText: {
    color: '#eff6ff',
    fontWeight: '800',
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
  workspaceSurface: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 18,
    gap: 16,
  },
  workspaceTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  workspaceMeta: {
    fontSize: 14,
    color: '#475569',
  },
  cardsColumn: {
    gap: 12,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 16,
    gap: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTextBlock: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
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
  actionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: '#eff6ff',
    fontWeight: '700',
  },
});
