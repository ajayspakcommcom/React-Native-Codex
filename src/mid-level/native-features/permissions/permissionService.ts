import { Platform } from 'react-native'
import {
  check,
  openSettings,
  PERMISSIONS,
  Permission,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions'

import { AppPermission, PermissionTone } from './types'

export function resolvePermission(permission: AppPermission): Permission {
  switch (permission) {
    case 'locationWhenInUse':
      return Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      })
  }
}

export async function checkAppPermission(
  permission: AppPermission,
): Promise<PermissionStatus> {
  return check(resolvePermission(permission))
}

export async function requestAppPermission(
  permission: AppPermission,
): Promise<PermissionStatus> {
  return request(resolvePermission(permission))
}

export async function openAppPermissionSettings(): Promise<void> {
  await openSettings()
}

export function getPermissionStatusText(status: PermissionStatus): string {
  switch (status) {
    case RESULTS.UNAVAILABLE:
      return 'Unavailable on this device'
    case RESULTS.DENIED:
      return 'Denied but requestable'
    case RESULTS.BLOCKED:
      return 'Blocked, open settings'
    case RESULTS.GRANTED:
      return 'Granted'
    case RESULTS.LIMITED:
      return 'Limited access'
  }
}

export function getPermissionTone(status: PermissionStatus): PermissionTone {
  switch (status) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return 'success'
    case RESULTS.DENIED:
      return 'warning'
    case RESULTS.BLOCKED:
      return 'danger'
    case RESULTS.UNAVAILABLE:
      return 'neutral'
  }
}

export function getBlockedStateMessage(permission: AppPermission): string {
  switch (permission) {
    case 'locationWhenInUse':
      return 'Location access was blocked. Open system settings to re-enable location for nearby feature access.'
  }
}

export function getPermissionReadinessMessage(status: PermissionStatus): string {
  switch (status) {
    case RESULTS.GRANTED:
      return 'The feature can continue with full location access.'
    case RESULTS.LIMITED:
      return 'The feature can continue with limited access.'
    case RESULTS.DENIED:
      return 'The app can still request this permission from the system prompt.'
    case RESULTS.BLOCKED:
      return 'The app should guide the user to Settings instead of requesting again.'
    case RESULTS.UNAVAILABLE:
      return 'This device does not support the requested permission flow.'
  }
}
