import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {ModuleDefinition, ModuleScreenProps} from '../../contracts/moduleContract';
import type {IncidentSnapshot} from '../../contracts/operationsDomain';

const severityOrder: Record<IncidentSnapshot['severity'], number> = {
  critical: 0,
  high: 1,
  medium: 2,
};

const IncidentsModuleScreen = ({container}: ModuleScreenProps) => {
  const [incidents, setIncidents] = useState<IncidentSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);

  const loadIncidents = useCallback(async () => {
    setIsLoading(true);
    const nextIncidents = await container.incidentService.list();
    setIncidents(nextIncidents);
    setIsLoading(false);
  }, [container]);

  useEffect(() => {
    const run = async () => {
      await loadIncidents();
    };

    run().catch(() => undefined);
  }, [loadIncidents]);

  const sortedIncidents = useMemo(
    () =>
      [...incidents].sort(
        (left, right) =>
          severityOrder[left.severity] - severityOrder[right.severity],
      ),
    [incidents],
  );

  const handleAcknowledge = async (incidentId: string) => {
    setActiveIncidentId(incidentId);
    const nextIncidents = await container.incidentService.acknowledge(incidentId);
    setIncidents(nextIncidents);
    setActiveIncidentId(null);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingState}>
        <ActivityIndicator color="#9a3412" />
        <Text style={styles.loadingText}>Loading incidents module...</Text>
      </View>
    );
  }

  return (
    <View style={styles.moduleSurface}>
      <View>
        <Text style={styles.sectionLabel}>Incidents Module</Text>
        <Text style={styles.heading}>Operational incidents by severity</Text>
        <Text style={styles.subtleText}>
          This module owns incident rendering and acknowledgement flow without
          leaking its state into the composition root.
        </Text>
      </View>

      {sortedIncidents.map(incident => (
        <View key={incident.id} style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={styles.cardTextBlock}>
              <Text style={styles.cardTitle}>{incident.title}</Text>
              <Text style={styles.cardMeta}>
                {incident.service} | Owner: {incident.owner}
              </Text>
            </View>
            <Text
              style={[
                styles.severityBadge,
                incident.severity === 'critical'
                  ? styles.criticalBadge
                  : incident.severity === 'high'
                    ? styles.highBadge
                    : styles.mediumBadge,
              ]}>
              {incident.severity}
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <Text
              style={[
                styles.ackState,
                incident.acknowledged ? styles.acknowledged : styles.unacknowledged,
              ]}>
              {incident.acknowledged ? 'Acknowledged' : 'Awaiting acknowledgement'}
            </Text>
            <Pressable
              accessibilityRole="button"
              disabled={incident.acknowledged || activeIncidentId === incident.id}
              onPress={() => {
                handleAcknowledge(incident.id).catch(() => undefined);
              }}
              style={[
                styles.secondaryButton,
                (incident.acknowledged || activeIncidentId === incident.id) &&
                  styles.buttonDisabled,
              ]}>
              <Text style={styles.secondaryButtonText}>
                {activeIncidentId === incident.id ? 'Saving...' : 'Acknowledge'}
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export const incidentsModule: ModuleDefinition = {
  id: 'incidents',
  title: 'Incidents',
  summary: 'Incident ownership and severity handling stay isolated inside a feature module.',
  accentColor: '#9a3412',
  Screen: IncidentsModuleScreen,
};

const styles = StyleSheet.create({
  moduleSurface: {
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
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9a3412',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  subtleText: {
    marginTop: 6,
    color: '#4b5563',
    fontSize: 14,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 18,
    borderWidth: 1,
    borderColor: '#fed7aa',
    gap: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTextBlock: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  cardMeta: {
    fontSize: 14,
    color: '#374151',
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  criticalBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  highBadge: {
    backgroundColor: '#ffedd5',
    color: '#9a3412',
  },
  mediumBadge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  ackState: {
    fontSize: 14,
    fontWeight: '600',
  },
  acknowledged: {
    color: '#166534',
  },
  unacknowledged: {
    color: '#991b1b',
  },
  secondaryButton: {
    backgroundColor: '#9a3412',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButtonText: {
    color: '#fff7ed',
    fontWeight: '700',
  },
});
