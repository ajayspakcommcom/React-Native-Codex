import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {ReleaseControlScreen} from './features/release-control';
import {ServiceHealthScreen} from './features/service-health';

type FeatureId = 'release-control' | 'service-health';

const featureCards: ReadonlyArray<{
  id: FeatureId;
  title: string;
  summary: string;
}> = [
  {
    id: 'release-control',
    title: 'release-control',
    summary:
      'Owns release-specific components, hooks, selectors, services, and screens.',
  },
  {
    id: 'service-health',
    title: 'service-health',
    summary:
      'Owns service-health rendering, selectors, and data access without leaking into other features.',
  },
];

const FeatureFolderingConsole = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureId>('release-control');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Architecture</Text>
          <Text style={styles.heroTitle}>Feature-Based Foldering</Text>
          <Text style={styles.heroDescription}>
            Each feature owns its screens, components, hooks, services, selectors,
            and types. The shell imports features by public entrypoints only.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleHeading}>Foldering Rules</Text>
          <Text style={styles.ruleText}>
            A feature should be readable in isolation and changeable without hunting
            through global folders.
          </Text>
          <Text style={styles.ruleText}>
            Screens compose feature pieces; services, selectors, and types remain
            local to the feature unless they are truly shared.
          </Text>
        </View>

        <View style={styles.selectorRail}>
          {featureCards.map(feature => {
            const isActive = feature.id === activeFeature;

            return (
              <Pressable
                key={feature.id}
                accessibilityRole="button"
                onPress={() => {
                  setActiveFeature(feature.id);
                }}
                style={[
                  styles.selectorCard,
                  isActive && styles.activeSelectorCard,
                ]}>
                <Text
                  style={[
                    styles.selectorTitle,
                    isActive && styles.activeSelectorTitle,
                  ]}>
                  {feature.title}
                </Text>
                <Text style={styles.selectorSummary}>{feature.summary}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.featureHost}>
          {activeFeature === 'release-control' ? (
            <ReleaseControlScreen />
          ) : (
            <ServiceHealthScreen />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeatureFolderingConsole;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f6f1',
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
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#d1d5db',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#f9fafb',
  },
  heroDescription: {
    color: '#e5e7eb',
    fontSize: 15,
    lineHeight: 22,
  },
  ruleCard: {
    borderRadius: 20,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    padding: 18,
    gap: 10,
  },
  ruleHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#7c2d12',
  },
  ruleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9a3412',
  },
  selectorRail: {
    gap: 12,
  },
  selectorCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d4d4d8',
    backgroundColor: '#fafafa',
    padding: 16,
    gap: 6,
  },
  activeSelectorCard: {
    borderColor: '#1d4ed8',
    backgroundColor: '#eff6ff',
  },
  selectorTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#18181b',
  },
  activeSelectorTitle: {
    color: '#1d4ed8',
  },
  selectorSummary: {
    color: '#52525b',
    fontSize: 14,
    lineHeight: 20,
  },
  featureHost: {
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    padding: 18,
  },
});
