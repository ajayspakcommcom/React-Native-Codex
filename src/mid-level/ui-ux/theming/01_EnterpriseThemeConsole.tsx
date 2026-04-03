import React, { useMemo } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { ThemeProvider } from './ThemeProvider'
import type { ThemePreference } from './themeContract'
import { ThemedSurface } from './ThemedSurface'
import { useAppTheme } from './useAppTheme'

const preferenceOptions: ThemePreference[] = ['system', 'light', 'dark']

function EnterpriseThemeConsoleContent(): React.JSX.Element {
  const { resolvedMode, setThemePreference, systemMode, theme, themePreference } =
    useAppTheme()

  const statusText = useMemo(
    () =>
      `Preference: ${themePreference} | Resolved mode: ${resolvedMode} | System mode: ${systemMode}`,
    [resolvedMode, systemMode, themePreference],
  )

  return (
    <ScrollView
      contentContainerStyle={[
        styles.screen,
        { backgroundColor: theme.colors.background },
      ]}>
      <Text
        style={[
          styles.eyebrow,
          { color: theme.colors.accent },
        ]}>
        Dark mode, theming
      </Text>
      <Text
        style={[
          styles.heading,
          { color: theme.colors.textPrimary, fontSize: theme.typography.display },
        ]}>
        Enterprise Theme Console
      </Text>
      <Text
        style={[
          styles.description,
          { color: theme.colors.textSecondary, fontSize: theme.typography.body },
        ]}>
        This screen is built on a typed theme contract, provider-driven mode
        resolution, persisted preference storage, and reusable themed surfaces.
      </Text>

      <ThemedSurface title="Theme control">
        <Text
          style={[
            styles.surfaceText,
            { color: theme.colors.textSecondary, fontSize: theme.typography.body },
          ]}>
          Choose a manual override or stay on system mode. The preference is
          persisted and the active theme is resolved from the provider.
        </Text>

        <View style={styles.preferenceRow}>
          {preferenceOptions.map(option => {
            const isActive = option === themePreference

            return (
              <Pressable
                key={option}
                accessibilityRole="button"
                onPress={() => setThemePreference(option)}
                style={[
                  styles.preferenceButton,
                  {
                    backgroundColor: isActive
                      ? theme.colors.accent
                      : theme.colors.surfaceSecondary,
                    borderColor: theme.colors.border,
                    borderRadius: theme.radius.pill,
                  },
                ]}>
                <Text
                  style={[
                    styles.preferenceButtonText,
                    {
                      color: isActive
                        ? theme.id === 'dark'
                          ? '#0F172A'
                          : '#FFFFFF'
                        : theme.colors.textPrimary,
                    },
                  ]}>
                  {option}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Text
          style={[
            styles.statusText,
            { color: theme.colors.textSecondary },
          ]}>
          {statusText}
        </Text>
      </ThemedSurface>

      <ThemedSurface title="Theme token preview">
        <View style={styles.tokenGrid}>
          <View
            style={[
              styles.tokenCard,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.medium,
              },
            ]}>
            <Text style={[styles.tokenLabel, { color: theme.colors.textSecondary }]}>
              Accent
            </Text>
            <View
              style={[
                styles.swatch,
                { backgroundColor: theme.colors.accent, borderRadius: theme.radius.medium },
              ]}
            />
          </View>

          <View
            style={[
              styles.tokenCard,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.medium,
              },
            ]}>
            <Text style={[styles.tokenLabel, { color: theme.colors.textSecondary }]}>
              Surface
            </Text>
            <View
              style={[
                styles.swatch,
                {
                  backgroundColor: theme.colors.surfacePrimary,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radius.medium,
                },
              ]}
            />
          </View>
        </View>

        <Text style={[styles.surfaceText, { color: theme.colors.textSecondary }]}>
          Reusable primitives should consume tokens from the active theme rather
          than hardcoding colors or radius values inside screens.
        </Text>
      </ThemedSurface>

      <ThemedSurface title="Foundation checklist">
        <Text style={[styles.checklistText, { color: theme.colors.textPrimary }]}>
          1. Theme mode is resolved from system appearance plus persisted override.
        </Text>
        <Text style={[styles.checklistText, { color: theme.colors.textPrimary }]}>
          2. Theme objects are typed and centralized.
        </Text>
        <Text style={[styles.checklistText, { color: theme.colors.textPrimary }]}>
          3. Surfaces and controls read from the provider instead of local color constants.
        </Text>
        <Text style={[styles.checklistText, { color: theme.colors.textPrimary }]}>
          4. Theme preference persists across app restarts.
        </Text>
      </ThemedSurface>
    </ScrollView>
  )
}

export default function EnterpriseThemeConsole(): React.JSX.Element {
  return (
    <ThemeProvider>
      <EnterpriseThemeConsoleContent />
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heading: {
    marginTop: 8,
    fontWeight: '800',
  },
  description: {
    marginTop: 10,
    lineHeight: 22,
  },
  surfaceText: {
    marginTop: 12,
    lineHeight: 21,
  },
  preferenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  preferenceButton: {
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  preferenceButtonText: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  statusText: {
    marginTop: 12,
    lineHeight: 20,
  },
  tokenGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  tokenCard: {
    width: '48%',
    borderWidth: 1,
    padding: 16,
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  swatch: {
    marginTop: 12,
    height: 56,
    borderWidth: 1,
  },
  checklistText: {
    marginTop: 12,
    lineHeight: 21,
  },
})
