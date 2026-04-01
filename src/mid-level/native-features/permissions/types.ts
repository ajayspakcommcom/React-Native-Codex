import { PermissionStatus } from 'react-native-permissions'

export type AppPermission = 'locationWhenInUse'

export type PermissionTone = 'neutral' | 'warning' | 'danger' | 'success'

export interface PermissionFlowState {
  status: PermissionStatus
  isLoading: boolean
}
