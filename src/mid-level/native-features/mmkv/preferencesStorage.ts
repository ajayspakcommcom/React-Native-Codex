import {
  defaultWorkspacePreferences,
  preferenceKeys,
  type WorkspacePreferences,
} from './storageContracts'
import { readObject, writeObject } from './storageCodecs'
import { initializeStorageArchitecture, preferencesStore } from './storage'

export type PersistedPreferences = WorkspacePreferences

export function getPersistedPreferences(): PersistedPreferences {
  initializeStorageArchitecture()

  return readObject(
    preferencesStore,
    preferenceKeys.workspacePreferences,
    defaultWorkspacePreferences,
  )
}

export function replacePersistedPreferences(
  value: PersistedPreferences,
): PersistedPreferences {
  initializeStorageArchitecture()
  writeObject(preferencesStore, preferenceKeys.workspacePreferences, value)
  return getPersistedPreferences()
}

export function updatePersistedPreferences(
  value: Partial<PersistedPreferences>,
): PersistedPreferences {
  const nextPreferences = {
    ...getPersistedPreferences(),
    ...value,
  }

  return replacePersistedPreferences(nextPreferences)
}

export function setDarkModeEnabled(value: boolean): PersistedPreferences {
  return updatePersistedPreferences({ darkModeEnabled: value })
}

export function setNotificationsEnabled(value: boolean): PersistedPreferences {
  return updatePersistedPreferences({ notificationsEnabled: value })
}

export function setSelectedWorkspace(value: string): PersistedPreferences {
  return updatePersistedPreferences({ selectedWorkspace: value })
}

export function clearPersistedPreferences(): PersistedPreferences {
  initializeStorageArchitecture()
  preferencesStore.remove(preferenceKeys.workspacePreferences)
  return getPersistedPreferences()
}
