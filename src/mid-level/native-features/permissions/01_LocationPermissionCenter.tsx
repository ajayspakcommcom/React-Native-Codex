import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RESULTS } from 'react-native-permissions'

import {
  getBlockedStateMessage,
  getPermissionReadinessMessage,
  getPermissionStatusText,
  getPermissionTone,
} from './permissionService'
import { usePermission } from './usePermission'

export default function LocationPermissionCenter(): React.JSX.Element {
  const {
    status,
    isLoading,
    platformPermission,
    refreshPermission,
    requestPermission,
    openSettingsForPermission,
  } = usePermission('locationWhenInUse')

  const statusTone = getPermissionTone(status)

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Permissions</Text>
      <Text style={styles.heading}>Location Permission Center</Text>
      <Text style={styles.description}>
        This example now uses a reusable permission hook and service layer to
        model a more production-style permission flow.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current status</Text>
        <View style={[styles.statusBadge, toneStyles[statusTone]]}>
          <Text style={styles.statusBadgeText}>
            {isLoading ? 'Checking...' : getPermissionStatusText(status)}
          </Text>
        </View>

        <Text style={styles.secondaryText}>
          Platform permission:
          {' '}
          <Text style={styles.codeText}>{platformPermission}</Text>
        </Text>

        <Text style={styles.secondaryText}>
          {getPermissionReadinessMessage(status)}
        </Text>

        <View style={styles.actionGroup}>
          <Pressable
            accessibilityRole="button"
            style={styles.primaryButton}
            onPress={refreshPermission}>
            <Text style={styles.primaryButtonText}>Check permission</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={styles.secondaryButton}
            onPress={requestPermission}>
            <Text style={styles.secondaryButtonText}>Request permission</Text>
          </Pressable>

          {status === RESULTS.BLOCKED ? (
            <Pressable
              accessibilityRole="button"
              style={styles.settingsButton}
              onPress={() => {
                openSettingsForPermission().catch(() => undefined)
              }}>
              <Text style={styles.settingsButtonText}>Open settings</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {status === RESULTS.BLOCKED ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Blocked-state recovery</Text>
          <Text style={styles.secondaryText}>
            {getBlockedStateMessage('locationWhenInUse')}
          </Text>
          <Text style={styles.secondaryText}>
            When the app returns from Settings, the permission status refreshes
            automatically.
          </Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Expected permission flow</Text>
        <Text style={styles.secondaryText}>
          1. Check the current permission status.
        </Text>
        <Text style={styles.secondaryText}>
          2. If denied, request the permission from the system dialog.
        </Text>
        <Text style={styles.secondaryText}>
          3. If blocked, guide the user to system settings.
        </Text>
        <Text style={styles.secondaryText}>
          4. If granted, continue to the location-based feature.
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusBadge: {
    marginTop: 16,
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  statusBadgeText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryText: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  codeText: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  actionGroup: {
    marginTop: 18,
  },
  primaryButton: {
    borderRadius: 14,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  settingsButton: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingsButtonText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '700',
  },
})

const toneStyles = StyleSheet.create({
  neutral: {
    backgroundColor: '#E2E8F0',
  },
  warning: {
    backgroundColor: '#FEF3C7',
  },
  danger: {
    backgroundColor: '#FEE2E2',
  },
  success: {
    backgroundColor: '#DCFCE7',
  },
})
