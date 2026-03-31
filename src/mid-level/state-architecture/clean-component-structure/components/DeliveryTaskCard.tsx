import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DeliveryTask } from '../types/task'
import { formatEtaLabel, getStatusTone } from '../utils/taskFormatters'

interface DeliveryTaskCardProps {
  task: DeliveryTask
}

export function DeliveryTaskCard({
  task,
}: DeliveryTaskCardProps): React.JSX.Element {
  const tone = getStatusTone(task.status)

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={[styles.badge, toneStyles[tone]]}>
          <Text style={styles.badgeText}>{task.status}</Text>
        </View>
      </View>

      <Text style={styles.meta}>Owner: {task.owner}</Text>
      <Text style={styles.meta}>{formatEtaLabel(task.etaDays)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    marginRight: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  meta: {
    marginTop: 10,
    fontSize: 14,
    color: '#475569',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#0F172A',
    fontSize: 12,
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
