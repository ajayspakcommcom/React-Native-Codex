export const storageSchemaVersion = 1

export const storageDomainIds = {
  bootstrap: 'react-native-codex.bootstrap',
  preferences: 'react-native-codex.preferences',
  session: 'react-native-codex.session',
} as const

export type StorageDomain = keyof typeof storageDomainIds

export const bootstrapKeys = {
  schemaVersion: 'system.schemaVersion',
  migrationAudit: 'system.migrationAudit',
} as const

export const preferenceKeys = {
  workspacePreferences: 'workspace.preferences.v1',
} as const

export interface WorkspacePreferences {
  darkModeEnabled: boolean
  notificationsEnabled: boolean
  selectedWorkspace: string
}

export const defaultWorkspacePreferences: WorkspacePreferences = {
  darkModeEnabled: false,
  notificationsEnabled: true,
  selectedWorkspace: 'delivery-ops',
}

export interface StorageMigrationAudit {
  migratedFromLegacy: boolean
  ranAt: string
  schemaVersion: number
}

export interface StorageHealthSnapshot {
  domains: Array<{
    domain: StorageDomain
    id: string
    keyCount: number
  }>
  lastMigrationRunAt: string | null
  schemaVersion: number
}
