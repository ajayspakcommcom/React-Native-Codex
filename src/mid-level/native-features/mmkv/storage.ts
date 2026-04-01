import { createMMKV, type MMKV } from 'react-native-mmkv'

import {
  bootstrapKeys,
  defaultWorkspacePreferences,
  preferenceKeys,
  storageDomainIds,
  storageSchemaVersion,
  type StorageDomain,
  type StorageHealthSnapshot,
  type StorageMigrationAudit,
  type WorkspacePreferences,
} from './storageContracts'
import { readNumber, readObject, removeKeys, writeObject } from './storageCodecs'

const legacyPreferenceKeys = {
  darkModeEnabled: 'preferences.darkModeEnabled',
  notificationsEnabled: 'preferences.notificationsEnabled',
  selectedWorkspace: 'preferences.selectedWorkspace',
} as const

const legacyStorage = createMMKV({
  id: 'react-native-codex-storage',
})

function getOptionalEncryptionKey(_domain: StorageDomain): string | undefined {
  return undefined
}

function createScopedStorage(domain: StorageDomain): MMKV {
  return createMMKV({
    id: storageDomainIds[domain],
    encryptionKey: getOptionalEncryptionKey(domain),
  })
}

export const storageRegistry = {
  bootstrap: createScopedStorage('bootstrap'),
  preferences: createScopedStorage('preferences'),
  session: createScopedStorage('session'),
} as const

export const bootstrapStore = storageRegistry.bootstrap
export const preferencesStore = storageRegistry.preferences
export const sessionStore = storageRegistry.session

let hasInitializedStorage = false

function extractLegacyPreferences(): Partial<WorkspacePreferences> {
  const darkModeEnabled = legacyStorage.getBoolean(
    legacyPreferenceKeys.darkModeEnabled,
  )
  const notificationsEnabled = legacyStorage.getBoolean(
    legacyPreferenceKeys.notificationsEnabled,
  )
  const selectedWorkspace = legacyStorage.getString(
    legacyPreferenceKeys.selectedWorkspace,
  )

  const legacyPreferences: Partial<WorkspacePreferences> = {}

  if (typeof darkModeEnabled === 'boolean') {
    legacyPreferences.darkModeEnabled = darkModeEnabled
  }

  if (typeof notificationsEnabled === 'boolean') {
    legacyPreferences.notificationsEnabled = notificationsEnabled
  }

  if (selectedWorkspace) {
    legacyPreferences.selectedWorkspace = selectedWorkspace
  }

  return legacyPreferences
}

function migrateLegacyPreferences(): boolean {
  const legacyPreferences = extractLegacyPreferences()

  if (Object.keys(legacyPreferences).length === 0) {
    return false
  }

  const currentPreferences = readObject(
    preferencesStore,
    preferenceKeys.workspacePreferences,
    defaultWorkspacePreferences,
  )

  writeObject(preferencesStore, preferenceKeys.workspacePreferences, {
    ...currentPreferences,
    ...legacyPreferences,
  })

  removeKeys(legacyStorage, Object.values(legacyPreferenceKeys))
  return true
}

function runStorageMigrations(): void {
  const currentVersion = readNumber(
    bootstrapStore,
    bootstrapKeys.schemaVersion,
    0,
  )

  if (currentVersion >= storageSchemaVersion) {
    return
  }

  let migratedFromLegacy = false

  if (currentVersion < 1) {
    migratedFromLegacy = migrateLegacyPreferences()
  }

  bootstrapStore.set(bootstrapKeys.schemaVersion, storageSchemaVersion)

  const auditRecord: StorageMigrationAudit = {
    migratedFromLegacy,
    ranAt: new Date().toISOString(),
    schemaVersion: storageSchemaVersion,
  }

  writeObject(bootstrapStore, bootstrapKeys.migrationAudit, auditRecord)
}

export function initializeStorageArchitecture(): void {
  if (hasInitializedStorage) {
    return
  }

  runStorageMigrations()
  hasInitializedStorage = true
}

export function getStorageHealthSnapshot(): StorageHealthSnapshot {
  initializeStorageArchitecture()

  const migrationAudit = bootstrapStore.getString(bootstrapKeys.migrationAudit)
    ? readObject<StorageMigrationAudit>(bootstrapStore, bootstrapKeys.migrationAudit, {
        migratedFromLegacy: false,
        ranAt: '',
        schemaVersion: storageSchemaVersion,
      })
    : null

  return {
    domains: (Object.entries(storageRegistry) as Array<[StorageDomain, MMKV]>).map(
      ([domain, storage]) => ({
        domain,
        id: storageDomainIds[domain],
        keyCount: storage.getAllKeys().length,
      }),
    ),
    lastMigrationRunAt: migrationAudit?.ranAt ?? null,
    schemaVersion: readNumber(
      bootstrapStore,
      bootstrapKeys.schemaVersion,
      storageSchemaVersion,
    ),
  }
}
