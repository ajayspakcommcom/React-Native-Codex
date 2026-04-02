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

import {notificationCoordinator} from './notificationCoordinator';
import type {NotificationRegistrationSnapshot} from './contracts';

const PushNotificationControlCenter = () => {
  const [registration, setRegistration] =
    useState<NotificationRegistrationSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSnapshot = async () => {
    setIsLoading(true);
    const nextSnapshot = await notificationCoordinator.getRegistrationSnapshot();
    setRegistration(nextSnapshot);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSnapshot().catch(() => undefined);
  }, []);

  const handleRegister = async () => {
    setIsLoading(true);
    const nextSnapshot =
      await notificationCoordinator.requestPermissionAndRegister();
    setRegistration(nextSnapshot);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Native Integration</Text>
          <Text style={styles.heroTitle}>Push Notification Control Center</Text>
          <Text style={styles.heroDescription}>
            Permission, token state, and registration lifecycle are treated as a
            governed capability instead of one-off setup code in a random screen.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Enterprise Notification Rules</Text>
          <Text style={styles.ruleText}>
            Registration state and token lifecycle should be centralized, observable,
            and resilient to provider-side token changes.
          </Text>
          <Text style={styles.ruleText}>
            Permission state is product state, not just a one-time native callback.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            handleRegister().catch(() => undefined);
          }}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Request Permission And Register</Text>
        </Pressable>

        {isLoading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Resolving notification registration...</Text>
          </View>
        ) : registration ? (
          <View style={styles.profileCard}>
            <Text style={styles.profileTitle}>Registration Snapshot</Text>
            <Text style={styles.profileText}>
              Permission: {registration.permission}
            </Text>
            <Text style={styles.profileText}>
              Token source: {registration.tokenSource}
            </Text>
            <Text style={styles.profileText}>
              Device token: {registration.deviceToken ?? 'Not registered'}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PushNotificationControlCenter;

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
  primaryButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
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
