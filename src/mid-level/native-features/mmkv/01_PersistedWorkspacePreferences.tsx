import React, { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import {
  clearPersistedPreferences,
  getPersistedPreferences,
  setDarkModeEnabled,
  setNotificationsEnabled,
  setSelectedWorkspace,
} from './preferencesStorage'
import { getStorageHealthSnapshot } from './storage'

const workspaceOptions = [
  { id: 'delivery-ops', label: 'Delivery Ops' },
  { id: 'growth-lab', label: 'Growth Lab' },
  { id: 'analytics-core', label: 'Analytics Core' },
] as const

export default function PersistedWorkspacePreferences(): React.JSX.Element {
  const [preferences, setPreferences] = useState(getPersistedPreferences)
  const [storageHealth, setStorageHealth] = useState(getStorageHealthSnapshot)

  const summaryText = useMemo(
    () =>
      `Workspace: ${preferences.selectedWorkspace} | Dark mode: ${preferences.darkModeEnabled ? 'On' : 'Off'} | Notifications: ${preferences.notificationsEnabled ? 'On' : 'Off'}`,
    [preferences],
  )

  const storageSummaryText = useMemo(
    () =>
      `Schema v${storageHealth.schemaVersion} | Domains: ${storageHealth.domains
        .map(domain => `${domain.domain} (${domain.keyCount})`)
        .join(', ')}`,
    [storageHealth],
  )

  const syncStorageState = (): void => {
    setPreferences(getPersistedPreferences())
    setStorageHealth(getStorageHealthSnapshot())
  }

  const toggleDarkMode = (): void => {
    setDarkModeEnabled(!preferences.darkModeEnabled)
    syncStorageState()
  }

  const toggleNotifications = (): void => {
    setNotificationsEnabled(!preferences.notificationsEnabled)
    syncStorageState()
  }

  const updateWorkspace = (workspaceId: string): void => {
    setSelectedWorkspace(workspaceId)
    syncStorageState()
  }

  const resetPreferences = (): void => {
    clearPersistedPreferences()
    syncStorageState()
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>MMKV</Text>
      <Text style={styles.heading}>Persisted Workspace Preferences</Text>
      <Text style={styles.description}>
        This example uses MMKV for fast synchronous persistence of local app
        preferences.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Persisted summary</Text>
        <Text style={styles.secondaryText}>{summaryText}</Text>
        <Text style={styles.secondaryText}>
          Restarting the app should keep these values because they are stored in
          MMKV.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Storage architecture</Text>
        <Text style={styles.secondaryText}>{storageSummaryText}</Text>
        <Text style={styles.secondaryText}>
          This setup uses isolated MMKV domains, schema versioning, and a
          migration layer so large app features can evolve without coupling all
          persisted state into one store.
        </Text>
        <Text style={styles.secondaryText}>
          Last migration run:{' '}
          {storageHealth.lastMigrationRunAt ?? 'No migration recorded yet'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Workspace selection</Text>
        <View style={styles.optionGroup}>
          {workspaceOptions.map(option => {
            const isActive = preferences.selectedWorkspace === option.id

            return (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                style={[styles.optionButton, isActive && styles.optionButtonActive]}
                onPress={() => updateWorkspace(option.id)}>
                <Text
                  style={[
                    styles.optionButtonText,
                    isActive && styles.optionButtonTextActive,
                  ]}>
                  {option.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Feature flags</Text>

        <Pressable style={styles.toggleButton} onPress={toggleDarkMode}>
          <Text style={styles.toggleButtonText}>
            Dark mode: {preferences.darkModeEnabled ? 'Enabled' : 'Disabled'}
          </Text>
        </Pressable>

        <Pressable style={styles.toggleButton} onPress={toggleNotifications}>
          <Text style={styles.toggleButtonText}>
            Notifications: {preferences.notificationsEnabled ? 'Enabled' : 'Disabled'}
          </Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={resetPreferences}>
          <Text style={styles.resetButtonText}>Reset stored preferences</Text>
        </Pressable>
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
    color: '#2563EB',
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
  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  secondaryText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  optionButton: {
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonActive: {
    backgroundColor: '#1D4ED8',
  },
  optionButtonText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  toggleButton: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    paddingVertical: 14,
  },
  toggleButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  resetButton: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    paddingVertical: 14,
  },
  resetButtonText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '700',
  },
})
