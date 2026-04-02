import React, { createContext, useContext, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

import type { AppTheme, ThemeMode, ThemePreference } from './themeContract'
import { themeMap } from './themePresets'
import {
  getPersistedThemePreference,
  setPersistedThemePreference,
} from './themeStorage'

interface ThemeContextValue {
  resolvedMode: ThemeMode
  setThemePreference: (preference: ThemePreference) => void
  systemMode: ThemeMode
  theme: AppTheme
  themePreference: ThemePreference
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveThemeMode(
  themePreference: ThemePreference,
  systemMode: ThemeMode,
): ThemeMode {
  return themePreference === 'system' ? systemMode : themePreference
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const colorScheme = useColorScheme()
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(
    getPersistedThemePreference,
  )

  const systemMode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light'
  const resolvedMode = resolveThemeMode(themePreference, systemMode)
  const theme = themeMap[resolvedMode]

  const setThemePreference = (preference: ThemePreference): void => {
    setPersistedThemePreference(preference)
    setThemePreferenceState(preference)
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedMode,
      setThemePreference,
      systemMode,
      theme,
      themePreference,
    }),
    [resolvedMode, systemMode, theme, themePreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }

  return context
}
