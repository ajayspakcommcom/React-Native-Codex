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

import {nativeRuntimeBridge} from './NativeRuntimeBridge';
import type {NativeRuntimeProfile} from './contracts';

const RuntimeDiagnosticsConsole = () => {
  const [profile, setProfile] = useState<NativeRuntimeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadProfile = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const nextProfile = await nativeRuntimeBridge.getRuntimeProfile();
      setProfile(nextProfile);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to load native runtime profile.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile().catch(() => undefined);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Native Integration</Text>
          <Text style={styles.heroTitle}>Runtime Diagnostics Console</Text>
          <Text style={styles.heroDescription}>
            JS consumes a typed native capability through a wrapper instead of
            reaching into raw native modules across the app.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Enterprise Module Rules</Text>
          <Text style={styles.ruleText}>
            Keep JS consumers behind a typed wrapper so native implementation
            details do not leak through the product codebase.
          </Text>
          <Text style={styles.ruleText}>
            The native layer owns platform-specific diagnostics. The JS layer owns
            presentation and product decisions.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            loadProfile().catch(() => undefined);
          }}
          style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh Native Profile</Text>
        </Pressable>

        {isLoading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Loading native diagnostics...</Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Native module unavailable</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : profile ? (
          <View style={styles.profileCard}>
            <Text style={styles.profileTitle}>Runtime Profile</Text>
            <Text style={styles.profileText}>Platform: {profile.platform}</Text>
            <Text style={styles.profileText}>
              OS version: {profile.operatingSystemVersion}
            </Text>
            <Text style={styles.profileText}>Device model: {profile.deviceModel}</Text>
            <Text style={styles.profileText}>App version: {profile.appVersion}</Text>
            <Text style={styles.profileText}>
              Low power mode: {profile.lowPowerModeEnabled ? 'On' : 'Off'}
            </Text>
            <Text style={styles.profileText}>
              Performance tier: {profile.performanceTier}
            </Text>
            <Text style={styles.profileText}>
              Source: {profile.diagnosticsSource}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RuntimeDiagnosticsConsole;

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
