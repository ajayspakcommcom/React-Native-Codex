import { AppState, AppStateStatus } from 'react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PermissionStatus, RESULTS } from 'react-native-permissions'

import { AppPermission, PermissionFlowState } from './types'
import {
  checkAppPermission,
  openAppPermissionSettings,
  requestAppPermission,
  resolvePermission,
} from './permissionService'

interface UsePermissionResult extends PermissionFlowState {
  platformPermission: string
  refreshPermission: () => Promise<void>
  requestPermission: () => Promise<void>
  openSettingsForPermission: () => Promise<void>
}

export function usePermission(permission: AppPermission): UsePermissionResult {
  const [status, setStatus] = useState<PermissionStatus>(RESULTS.DENIED)
  const [isLoading, setIsLoading] = useState(true)
  const appStateRef = useRef<AppStateStatus>(AppState.currentState)
  const shouldRefreshOnReturnRef = useRef(false)

  const platformPermission = useMemo(
    () => resolvePermission(permission),
    [permission],
  )

  const refreshPermission = useCallback(async (): Promise<void> => {
    setIsLoading(true)

    try {
      const nextStatus = await checkAppPermission(permission)
      setStatus(nextStatus)
    } finally {
      setIsLoading(false)
    }
  }, [permission])

  const requestPermission = useCallback(async (): Promise<void> => {
    setIsLoading(true)

    try {
      const nextStatus = await requestAppPermission(permission)
      setStatus(nextStatus)
    } finally {
      setIsLoading(false)
    }
  }, [permission])

  const openSettingsForPermission = useCallback(async (): Promise<void> => {
    shouldRefreshOnReturnRef.current = true
    await openAppPermissionSettings()
  }, [])

  useEffect(() => {
    refreshPermission()
  }, [refreshPermission])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const previousAppState = appStateRef.current
      appStateRef.current = nextAppState

      const returnedToForeground =
        /inactive|background/.test(previousAppState) && nextAppState === 'active'

      if (returnedToForeground && shouldRefreshOnReturnRef.current) {
        shouldRefreshOnReturnRef.current = false
        refreshPermission().catch(() => undefined)
      }
    })

    return () => {
      subscription.remove()
    }
  }, [refreshPermission])

  return {
    status,
    isLoading,
    platformPermission,
    refreshPermission,
    requestPermission,
    openSettingsForPermission,
  }
}
