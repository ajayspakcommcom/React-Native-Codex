import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {NotificationPayload} from './contracts';
import {notificationCoordinator} from './notificationCoordinator';
import {notificationRouteResolver} from './notificationRouteResolver';

const NotificationInboxConsole = () => {
  const [payloads, setPayloads] = useState<NotificationPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInbox = async () => {
      const nextPayloads = await notificationCoordinator.getNotificationInbox();
      setPayloads(nextPayloads);
      setIsLoading(false);
    };

    loadInbox().catch(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Senior Native Integration</Text>
          <Text style={styles.heroTitle}>Notification Inbox Console</Text>
          <Text style={styles.heroDescription}>
            Payload ingestion and route resolution are centralized so taps and app
            entries stay predictable across foreground, background, and cold starts.
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#1d4ed8" />
            <Text style={styles.loadingText}>Loading simulated notification inbox...</Text>
          </View>
        ) : (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Notification Inbox</Text>
            {payloads.map(payload => (
              <View key={payload.id} style={styles.payloadCard}>
                <Text style={styles.payloadTitle}>{payload.title}</Text>
                <Text style={styles.payloadMeta}>
                  Delivery: {payload.deliveryState} | Route: {payload.route}
                </Text>
                <Text style={styles.payloadBody}>{payload.body}</Text>
                <Text style={styles.payloadRouteSummary}>
                  {notificationRouteResolver.resolveSummary(payload)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationInboxConsole;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef4fb',
  },
  contentContainer: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#111827',
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#bfdbfe',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#f8fafc',
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#dbeafe',
  },
  loadingState: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#475569',
  },
  panel: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 12,
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  payloadCard: {
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 14,
    gap: 8,
  },
  payloadTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  payloadMeta: {
    fontSize: 13,
    color: '#334155',
  },
  payloadBody: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  payloadRouteSummary: {
    fontSize: 14,
    color: '#1d4ed8',
    lineHeight: 20,
    fontWeight: '700',
  },
});
