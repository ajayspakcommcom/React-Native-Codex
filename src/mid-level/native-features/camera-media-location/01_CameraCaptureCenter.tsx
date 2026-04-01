import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { openSettings, RESULTS } from 'react-native-permissions'

import {
  capturePhoto,
  ensureCameraPermission,
} from './deviceMediaService'
import { SelectedMediaAsset } from './types'

export default function CameraCaptureCenter(): React.JSX.Element {
  const [statusText, setStatusText] = useState('Ready to capture a photo')
  const [capturedAsset, setCapturedAsset] = useState<SelectedMediaAsset | null>(null)

  const onCapturePhoto = async (): Promise<void> => {
    setStatusText('Checking camera permission...')

    const permissionStatus = await ensureCameraPermission()

    if (permissionStatus === RESULTS.BLOCKED) {
      setStatusText('Camera permission is blocked. Open settings to continue.')
      return
    }

    if (permissionStatus !== RESULTS.GRANTED && permissionStatus !== RESULTS.LIMITED) {
      setStatusText('Camera permission was not granted.')
      return
    }

    setStatusText('Launching camera...')
    const asset = await capturePhoto()

    if (!asset) {
      setStatusText('Camera flow finished without a selected photo.')
      return
    }

    setCapturedAsset(asset)
    setStatusText('Photo captured successfully.')
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Camera</Text>
      <Text style={styles.heading}>Camera Capture Center</Text>
      <Text style={styles.description}>
        This example requests camera permission before launching the native
        camera flow for task-related image capture.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current workflow</Text>
        <Text style={styles.secondaryText}>{statusText}</Text>

        <Pressable style={styles.primaryButton} onPress={onCapturePhoto}>
          <Text style={styles.primaryButtonText}>Capture photo</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            openSettings().catch(() => undefined)
          }}>
          <Text style={styles.secondaryButtonText}>Open settings</Text>
        </Pressable>
      </View>

      {capturedAsset ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Captured asset</Text>
          <Text style={styles.secondaryText}>File: {capturedAsset.fileName}</Text>
          <Text style={styles.secondaryText}>Type: {capturedAsset.type}</Text>
          <Text style={styles.secondaryText}>URI: {capturedAsset.uri}</Text>
        </View>
      ) : null}
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
})
