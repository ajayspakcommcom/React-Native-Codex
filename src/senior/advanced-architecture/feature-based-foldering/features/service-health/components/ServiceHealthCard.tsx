import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import type {ServiceHealthItem} from '../types';

type Props = {
  item: ServiceHealthItem;
};

export const ServiceHealthCard = ({item}: Props) => (
  <View style={styles.card}>
    <View style={styles.topRow}>
      <Text style={styles.name}>{item.name}</Text>
      <Text
        style={[
          styles.badge,
          item.status === 'healthy'
            ? styles.healthy
            : item.status === 'critical'
              ? styles.critical
              : styles.degraded,
        ]}>
        {item.status}
      </Text>
    </View>
    <Text style={styles.meta}>Region: {item.region}</Text>
    <Text style={styles.meta}>Latency: {item.latencyMs} ms</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d4d4d8',
    backgroundColor: '#ffffff',
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  meta: {
    fontSize: 14,
    color: '#374151',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: '700',
  },
  healthy: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  critical: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  degraded: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
});
