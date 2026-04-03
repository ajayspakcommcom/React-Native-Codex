import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
  requireNativeComponent,
} from 'react-native';

import type {
  NativeStatusSurfaceProps,
  NativeStatusTone,
} from './nativeStatusSurfaceContracts';

const COMPONENT_NAME = 'OperationsStatusSurfaceViewManager';

type NativeComponentProps = NativeStatusSurfaceProps;

const NativeStatusSurfaceComponent =
  requireNativeComponent<NativeComponentProps>(COMPONENT_NAME);

function getToneCopy(statusTone: NativeStatusTone) {
  switch (statusTone) {
    case 'nominal':
      return 'Nominal';
    case 'warning':
      return 'Warning';
    case 'critical':
      return 'Critical';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Unknown';
  }
}

function isNativeSurfaceRegistered() {
  if (Platform.OS === 'android') {
    return UIManager.getViewManagerConfig(COMPONENT_NAME) != null;
  }

  return COMPONENT_NAME in UIManager;
}

function FallbackStatusSurface(props: NativeStatusSurfaceProps) {
  return (
    <View style={styles.fallbackCard} testID={props.testID}>
      <View style={styles.fallbackHeaderRow}>
        <Text style={styles.fallbackTitle}>{props.title}</Text>
        <View style={styles.fallbackBadge}>
          <Text style={styles.fallbackBadgeText}>{getToneCopy(props.statusTone)}</Text>
        </View>
      </View>
      <Text style={styles.fallbackSubtitle}>{props.subtitle}</Text>
      <View style={styles.fallbackTrack}>
        <View
          style={[
            styles.fallbackFill,
            {width: `${Math.max(0, Math.min(100, props.progressValue))}%`},
          ]}
        />
      </View>
      <Text style={styles.fallbackMeta}>
        Attention items: {props.attentionCount}
      </Text>
    </View>
  );
}

export function NativeStatusSurface(props: NativeStatusSurfaceProps) {
  if (!isNativeSurfaceRegistered()) {
    return <FallbackStatusSurface {...props} />;
  }

  return <NativeStatusSurfaceComponent {...props} />;
}

const styles = StyleSheet.create({
  fallbackCard: {
    borderRadius: 20,
    backgroundColor: '#0f172a',
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 12,
  },
  fallbackHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  fallbackTitle: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  fallbackBadge: {
    borderRadius: 999,
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  fallbackBadgeText: {
    color: '#eff6ff',
    fontSize: 12,
    fontWeight: '700',
  },
  fallbackSubtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  fallbackTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1e293b',
    overflow: 'hidden',
  },
  fallbackFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#22c55e',
  },
  fallbackMeta: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
});
