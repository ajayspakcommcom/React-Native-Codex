import React, {useMemo, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {createAppContainer} from './core/di/appContainer';
import {seniorArchitectureModules} from './core/navigation/moduleRegistry';

const ModularControlTower = () => {
  const container = useMemo(() => createAppContainer(), []);
  const [activeModuleId, setActiveModuleId] = useState(
    seniorArchitectureModules[0]?.id ?? 'workspace',
  );

  const activeModule =
    seniorArchitectureModules.find(module => module.id === activeModuleId) ??
    seniorArchitectureModules[0];

  if (!activeModule) {
    return null;
  }

  const ActiveModuleScreen = activeModule.Screen;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Architecture</Text>
          <Text style={styles.heroTitle}>Modular Control Tower</Text>
          <Text style={styles.heroDescription}>
            The app shell owns composition, contracts, and container wiring. Each
            feature module owns its own rendering and business flow.
          </Text>
        </View>

        <View style={styles.tabRail}>
          {seniorArchitectureModules.map(module => {
            const isActive = module.id === activeModule.id;

            return (
              <Pressable
                key={module.id}
                accessibilityRole="button"
                onPress={() => {
                  setActiveModuleId(module.id);
                }}
                style={[
                  styles.tabButton,
                  isActive && styles.activeTabButton,
                  isActive && {borderColor: module.accentColor},
                ]}>
                <Text style={[styles.tabTitle, isActive && {color: module.accentColor}]}>
                  {module.title}
                </Text>
                <Text style={styles.tabSummary}>{module.summary}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.boundaryCard}>
          <Text style={styles.boundaryHeading}>Composition Root Rules</Text>
          <Text style={styles.boundaryBullet}>
            Modules depend on typed contracts, not on sibling feature files.
          </Text>
          <Text style={styles.boundaryBullet}>
            Shared services are assembled once in the app container.
          </Text>
          <Text style={styles.boundaryBullet}>
            Feature UI stays inside its module instead of leaking into the shell.
          </Text>
        </View>

        <View style={styles.moduleHost}>
          <ActiveModuleScreen container={container} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModularControlTower;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7f4',
  },
  contentContainer: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#102a13',
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#d1fae5',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#f0fdf4',
  },
  heroDescription: {
    color: '#dcfce7',
    fontSize: 15,
    lineHeight: 22,
  },
  tabRail: {
    gap: 12,
  },
  tabButton: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d4d4d8',
    backgroundColor: '#fafafa',
    padding: 16,
    gap: 6,
  },
  activeTabButton: {
    backgroundColor: '#ffffff',
  },
  tabTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#18181b',
  },
  tabSummary: {
    color: '#52525b',
    fontSize: 14,
    lineHeight: 20,
  },
  boundaryCard: {
    borderRadius: 20,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    padding: 18,
    gap: 10,
  },
  boundaryHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#7c2d12',
  },
  boundaryBullet: {
    fontSize: 14,
    color: '#9a3412',
    lineHeight: 20,
  },
  moduleHost: {
    borderRadius: 24,
    backgroundColor: '#eef6ee',
    padding: 18,
  },
});
