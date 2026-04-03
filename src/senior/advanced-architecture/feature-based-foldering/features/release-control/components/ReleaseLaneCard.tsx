import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import type {ReleaseLane} from '../types';

type Props = {
  lane: ReleaseLane;
};

export const ReleaseLaneCard = ({lane}: Props) => (
  <View style={styles.card}>
    <View style={styles.topRow}>
      <Text style={styles.team}>{lane.team}</Text>
      <Text
        style={[
          styles.badge,
          lane.status === 'ready'
            ? styles.ready
            : lane.status === 'blocked'
              ? styles.blocked
              : styles.review,
        ]}>
        {lane.status}
      </Text>
    </View>
    <Text style={styles.meta}>Owner: {lane.owner}</Text>
    <Text style={styles.meta}>Pending checks: {lane.pendingChecks}</Text>
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
  team: {
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
  ready: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  blocked: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  review: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  },
});
