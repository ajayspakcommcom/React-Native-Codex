import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {ServiceHealthCard} from '../components/ServiceHealthCard';
import {useServiceHealth} from '../hooks/useServiceHealth';
import {
  orderByCriticality,
  summarizeServiceHealth,
} from '../state/serviceHealthSelectors';

export const ServiceHealthScreen = () => {
  const {items, isLoading} = useServiceHealth();

  const orderedItems = useMemo(() => orderByCriticality(items), [items]);
  const summary = useMemo(() => summarizeServiceHealth(items), [items]);

  if (isLoading) {
    return (
      <View style={styles.loadingState}>
        <ActivityIndicator color="#7c2d12" />
        <Text style={styles.loadingText}>Loading service-health feature...</Text>
      </View>
    );
  }

  return (
    <View style={styles.surface}>
      <Text style={styles.featureLabel}>Feature: service-health</Text>
      <Text style={styles.title}>Service Health Console</Text>
      <Text style={styles.summary}>
        Total: {summary.total} | Critical: {summary.critical} | Degraded:{' '}
        {summary.degraded}
      </Text>

      <View style={styles.cardsColumn}>
        {orderedItems.map(item => (
          <ServiceHealthCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    gap: 16,
  },
  loadingState: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#3f3f46',
    fontSize: 15,
  },
  featureLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9a3412',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  summary: {
    color: '#4b5563',
    fontSize: 14,
  },
  cardsColumn: {
    gap: 12,
  },
});
