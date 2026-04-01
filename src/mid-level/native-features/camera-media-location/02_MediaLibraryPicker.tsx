import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { pickImageFromLibrary } from './deviceMediaService'
import { SelectedMediaAsset } from './types'

export default function MediaLibraryPicker(): React.JSX.Element {
  const [selectedAsset, setSelectedAsset] = useState<SelectedMediaAsset | null>(null)
  const [statusText, setStatusText] = useState('Ready to open media library')

  const onPickMedia = async (): Promise<void> => {
    setStatusText('Opening media library...')
    const asset = await pickImageFromLibrary()

    if (!asset) {
      setStatusText('Media picker closed without selecting an image.')
      return
    }

    setSelectedAsset(asset)
    setStatusText('Library image selected successfully.')
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Media</Text>
      <Text style={styles.heading}>Media Library Picker</Text>
      <Text style={styles.description}>
        This example launches the native image library so an existing workspace
        image can be attached to a task or report.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Library workflow</Text>
        <Text style={styles.secondaryText}>{statusText}</Text>

        <Pressable style={styles.primaryButton} onPress={onPickMedia}>
          <Text style={styles.primaryButtonText}>Pick image</Text>
        </Pressable>
      </View>

      {selectedAsset ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Selected media</Text>
          <Text style={styles.secondaryText}>File: {selectedAsset.fileName}</Text>
          <Text style={styles.secondaryText}>Type: {selectedAsset.type}</Text>
          <Text style={styles.secondaryText}>URI: {selectedAsset.uri}</Text>
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
})
