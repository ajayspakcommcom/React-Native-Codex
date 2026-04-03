import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {getCrashAnalyticsSnapshot} from './crashAnalyticsCoordinator';
import type {CrashAnalyticsProvider} from './crashAnalyticsContracts';

const providerOptions: readonly CrashAnalyticsProvider[] = [
  'sentry',
  'firebase-crashlytics',
];

function ProviderButton(props: {
  value: CrashAnalyticsProvider;
  isActive: boolean;
  onPress: (value: CrashAnalyticsProvider) => void;
}) {
  return (
    <Pressable
      onPress={() => props.onPress(props.value)}
      style={[styles.providerButton, props.isActive && styles.providerButtonActive]}>
      <Text
        style={[
          styles.providerButtonText,
          props.isActive && styles.providerButtonTextActive,
        ]}>
        {props.value}
      </Text>
    </Pressable>
  );
}

function CrashAnalyticsControlCenter() {
  const [provider, setProvider] = useState<CrashAnalyticsProvider>('sentry');
  const snapshot = getCrashAnalyticsSnapshot(provider);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Expert • Release &amp; Ops</Text>
        <Text style={styles.title}>Crash Analytics</Text>
        <Text style={styles.body}>
          This control center models enterprise crash analytics around a stable
          coordinator contract so product code is not tied directly to Sentry or
          Firebase Crashlytics.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Provider posture</Text>
        <View style={styles.providerRow}>
          {providerOptions.map(option => (
            <ProviderButton
              key={option}
              value={option}
              isActive={provider === option}
              onPress={setProvider}
            />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Policy</Text>
        <Text style={styles.cardBody}>
          Native crashes: {String(snapshot.policy.collectNativeCrashes)}
        </Text>
        <Text style={styles.cardBody}>
          Non-fatal capture: {String(snapshot.policy.collectNonFatalErrors)}
        </Text>
        <Text style={styles.cardBody}>
          Breadcrumbs: {String(snapshot.policy.collectBreadcrumbs)}
        </Text>
        <Text style={styles.cardBody}>
          Symbol upload required: {String(snapshot.policy.requiresSymbolUpload)}
        </Text>
        <Text style={styles.cardBody}>
          Release health: {String(snapshot.policy.supportsReleaseHealth)}
        </Text>
        <Text style={styles.cardBody}>
          Consent mode: {snapshot.policy.consentMode}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Provider strengths</Text>
        {snapshot.profile.strengths.map(item => (
          <Text key={item} style={styles.bulletLine}>
            - {item}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Release requirements</Text>
        {snapshot.profile.releaseRequirements.map(item => (
          <Text key={item} style={styles.bulletLine}>
            - {item}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Governance rules</Text>
        {snapshot.governanceRules.map(item => (
          <Text key={item} style={styles.bulletLine}>
            - {item}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sample events</Text>
        {snapshot.sampleEvents.map(event => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.cardBody}>Severity: {event.severity}</Text>
            <Text style={styles.cardBody}>Release: {event.context.release}</Text>
            <Text style={styles.cardBody}>Owner: {event.context.ownerTeam}</Text>
            <Text style={styles.cardBody}>Module: {event.context.moduleName}</Text>
            <Text style={styles.cardBody}>Tags: {event.tags.join(', ')}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#030712',
  },
  content: {
    padding: 24,
    gap: 20,
  },
  heroCard: {
    borderRadius: 24,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 24,
    gap: 10,
  },
  eyebrow: {
    color: '#fb7185',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f9fafb',
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    color: '#d1d5db',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#f9fafb',
    fontSize: 18,
    fontWeight: '700',
  },
  providerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  providerButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111827',
  },
  providerButtonActive: {
    backgroundColor: '#881337',
    borderColor: '#f43f5e',
  },
  providerButtonText: {
    color: '#e5e7eb',
    fontSize: 13,
    fontWeight: '700',
  },
  providerButtonTextActive: {
    color: '#fff1f2',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
  },
  cardBody: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  bulletLine: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 21,
  },
  eventCard: {
    borderRadius: 16,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 14,
    gap: 4,
  },
  eventTitle: {
    color: '#f9fafb',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default CrashAnalyticsControlCenter;
