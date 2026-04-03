import React, { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import {
  availableAppEnvironments,
  resolveAppEnvironment,
} from './appEnv'
import type { AppEnvironment } from './env.contract'

export default function EnvironmentControlCenter(): React.JSX.Element {
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<AppEnvironment>('staging')

  const environmentConfig = useMemo(
    () => resolveAppEnvironment(selectedEnvironment),
    [selectedEnvironment],
  )

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Environment configs</Text>
      <Text style={styles.heading}>Build Environment Control Center</Text>
      <Text style={styles.description}>
        Enterprise mobile builds usually separate environment values before
        release packaging happens. This example keeps app identifiers, API URLs,
        analytics environments, and automation IDs typed and centralized.
      </Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Environment selection</Text>
        <View style={styles.optionRow}>
          {availableAppEnvironments.map(environment => {
            const isActive = environment === selectedEnvironment

            return (
              <Pressable
                key={environment}
                accessibilityRole="button"
                onPress={() => setSelectedEnvironment(environment)}
                style={[
                  styles.optionButton,
                  isActive && styles.optionButtonActive,
                ]}>
                <Text
                  style={[
                    styles.optionButtonText,
                    isActive && styles.optionButtonTextActive,
                  ]}>
                  {environment}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Resolved config</Text>
        <Text style={styles.configLine}>
          App name: {environmentConfig.appDisplayName}
        </Text>
        <Text style={styles.configLine}>
          API base URL: {environmentConfig.apiBaseUrl}
        </Text>
        <Text style={styles.configLine}>
          Bundle suffix: {environmentConfig.bundleSuffix || '(none)'}
        </Text>
        <Text style={styles.configLine}>
          iOS scheme: {environmentConfig.iosSchemeName}
        </Text>
        <Text style={styles.configLine}>
          Maestro app ID: {environmentConfig.maestroAppId}
        </Text>
        <Text style={styles.configLine}>
          Analytics environment: {environmentConfig.analyticsEnvironment}
        </Text>
        <Text style={styles.configLine}>
          Sentry environment: {environmentConfig.sentryEnvironment}
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Enterprise checklist</Text>
        <Text style={styles.checklistText}>
          1. Treat environment config as typed application data, not loose string constants.
        </Text>
        <Text style={styles.checklistText}>
          2. Keep build identities, service endpoints, and automation targets aligned per environment.
        </Text>
        <Text style={styles.checklistText}>
          3. Use this layer as the source of truth for Android and iOS release setup.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#1D4ED8',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  sectionCard: {
    marginTop: 20,
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7E0EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  optionButton: {
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionButtonActive: {
    backgroundColor: '#1D4ED8',
    borderColor: '#1D4ED8',
  },
  optionButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  configLine: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
  checklistText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
})
