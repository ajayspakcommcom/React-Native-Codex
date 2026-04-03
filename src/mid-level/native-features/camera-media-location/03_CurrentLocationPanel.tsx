import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { openSettings, RESULTS } from 'react-native-permissions'

import { usePermission } from '../permissions/usePermission'
import { getCurrentLocationSnapshot } from './locationService'
import { CurrentLocationSnapshot } from './types'

export default function CurrentLocationPanel(): React.JSX.Element {
  const {
    status,
    isLoading,
    refreshPermission,
    requestPermission,
    openSettingsForPermission,
  } = usePermission('locationWhenInUse')
  const [location, setLocation] = useState<CurrentLocationSnapshot | null>(null)
  const [statusText, setStatusText] = useState('Ready to fetch current location')

  const onLoadLocation = async (): Promise<void> => {
    if (status !== RESULTS.GRANTED && status !== RESULTS.LIMITED) {
      setStatusText('Location permission is required before reading coordinates.')
      return
    }

    setStatusText('Fetching current coordinates...')

    try {
      const snapshot = await getCurrentLocationSnapshot()
      setLocation(snapshot)
      setStatusText('Current location loaded successfully.')
    } catch {
      setLocation(null)
      setStatusText('Unable to retrieve the current location.')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Location</Text>
      <Text style={styles.heading}>Current Location Panel</Text>
      <Text style={styles.description}>
        This example combines the permission layer with a geolocation service to
        retrieve the current coordinates after access is granted.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Permission gate</Text>
        <Text style={styles.secondaryText}>
          {isLoading ? 'Checking location permission...' : `Current status: ${status}`}
        </Text>

        <Pressable style={styles.primaryButton} onPress={refreshPermission}>
          <Text style={styles.primaryButtonText}>Refresh permission</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={requestPermission}>
          <Text style={styles.secondaryButtonText}>Request location access</Text>
        </Pressable>

        {status === RESULTS.BLOCKED ? (
          <Pressable
            style={styles.settingsButton}
            onPress={() => {
              openSettingsForPermission().catch(() => {
                openSettings().catch(() => undefined)
              })
            }}>
            <Text style={styles.settingsButtonText}>Open settings</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Location read</Text>
        <Text style={styles.secondaryText}>{statusText}</Text>

        <Pressable style={styles.primaryButton} onPress={onLoadLocation}>
          <Text style={styles.primaryButtonText}>Get current location</Text>
        </Pressable>

        {location ? (
          <View style={styles.locationBox}>
            <Text style={styles.secondaryText}>Latitude: {location.latitude}</Text>
            <Text style={styles.secondaryText}>Longitude: {location.longitude}</Text>
            <Text style={styles.secondaryText}>
              Accuracy: {location.accuracy ?? 'Unknown'}
            </Text>
          </View>
        ) : null}
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
  secondaryText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  primaryButton: {
    marginTop: 18,
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
  locationBox: {
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
})
