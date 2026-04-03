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

import {nativeArchitectureAdapter} from './adapters/nativeArchitectureAdapter';

const NewArchitectureConsole = () => {
  const [runtimeProfile, setRuntimeProfile] = useState<Awaited<
    ReturnType<typeof nativeArchitectureAdapter.getRuntimeProfile>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRuntimeProfile = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const nextProfile = await nativeArchitectureAdapter.getRuntimeProfile();
      setRuntimeProfile(nextProfile);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to resolve runtime profile from the architecture adapter.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRuntimeProfile().catch(() => undefined);
  }, []);

  const executionPath = nativeArchitectureAdapter.getExecutionPath();
  const fabricReadiness = nativeArchitectureAdapter.getFabricReadinessSummary();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Native Integration</Text>
          <Text style={styles.heroTitle}>New Architecture Console</Text>
          <Text style={styles.heroDescription}>
            Product code targets an adapter. The adapter can resolve a TurboModule
            path later without forcing a feature-level rewrite.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Migration Rules</Text>
          <Text style={styles.ruleText}>
            Define the TurboModule and Fabric contracts before the rollout. Keep the
            legacy path active until codegen and native implementations are ready.
          </Text>
          <Text style={styles.ruleText}>
            Migrate capability-by-capability instead of treating the new
            architecture as an all-or-nothing rewrite.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Architecture Resolution</Text>
          <Text style={styles.summaryText}>Execution path: {executionPath}</Text>
          <Text style={styles.summaryText}>
            Fabric spec: {fabricReadiness.fabricComponentSpec}
          </Text>
          <Text style={styles.summaryText}>Fabric status: {fabricReadiness.status}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            loadRuntimeProfile().catch(() => undefined);
          }}
          style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh Architecture Snapshot</Text>
        </Pressable>

        {isLoading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Resolving architecture snapshot...</Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Resolution error</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : runtimeProfile ? (
          <View style={styles.profileCard}>
            <Text style={styles.profileTitle}>Resolved Runtime Profile</Text>
            <Text style={styles.profileText}>Platform: {runtimeProfile.platform}</Text>
            <Text style={styles.profileText}>
              Device model: {runtimeProfile.deviceModel}
            </Text>
            <Text style={styles.profileText}>App version: {runtimeProfile.appVersion}</Text>
            <Text style={styles.profileText}>
              Low power mode: {runtimeProfile.lowPowerModeEnabled ? 'On' : 'Off'}
            </Text>
            <Text style={styles.profileText}>
              Performance tier: {runtimeProfile.performanceTier}
            </Text>
            <Text style={styles.profileText}>
              Source: {runtimeProfile.diagnosticsSource}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewArchitectureConsole;

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
  summaryCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 14,
    color: '#334155',
  },
  refreshButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  refreshButtonText: {
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
  errorCard: {
    borderRadius: 24,
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    padding: 20,
    gap: 10,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#9f1239',
  },
  errorText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9f1239',
  },
  profileCard: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 10,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  profileText: {
    fontSize: 14,
    color: '#334155',
  },
});
