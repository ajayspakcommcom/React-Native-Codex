import { createMMKV } from 'react-native-mmkv'

import type { ThemePreference } from './themeContract'

const themeStorage = createMMKV({
  id: 'react-native-codex.theme',
})

const themePreferenceKey = 'ui.theme.preference.v1'

export function getPersistedThemePreference(): ThemePreference {
  const value = themeStorage.getString(themePreferenceKey)

  if (value === 'light' || value === 'dark' || value === 'system') {
    return value
  }

  return 'system'
}

export function setPersistedThemePreference(
  preference: ThemePreference,
): void {
  themeStorage.set(themePreferenceKey, preference)
}
