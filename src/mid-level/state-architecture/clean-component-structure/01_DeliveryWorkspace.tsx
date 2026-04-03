import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'

import { DeliveryTaskCard } from './components/DeliveryTaskCard'
import { useDeliveryTasks } from './hooks/useDeliveryTasks'

export default function DeliveryWorkspace(): React.JSX.Element {
  const { tasks, isLoading, errorMessage } = useDeliveryTasks()

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Clean Component Structure</Text>
      <Text style={styles.heading}>Delivery Workspace</Text>
      <Text style={styles.description}>
        This example shows how to split one feature into `components`, `hooks`,
        `services`, `types`, and `utils` instead of keeping all logic in a
        single file.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Why this structure helps</Text>
        <Text style={styles.secondaryText}>
          UI stays in components, fetching logic stays in hooks and services,
          types stay centralized, and formatting logic stays in utilities.
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.card}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.stateText}>Loading delivery tasks...</Text>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={styles.card}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Feature module layout</Text>
          <Text style={styles.secondaryText}>
            This file is only the screen entry point. The real work is delegated
            to smaller files in the same module.
          </Text>

          {tasks.map(task => (
            <DeliveryTaskCard key={task.id} task={task} />
          ))}
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
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  stateText: {
    marginTop: 10,
    fontSize: 14,
    color: '#475569',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
  },
})
