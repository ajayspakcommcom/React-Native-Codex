import type { AppTheme, ThemeMode } from './themeContract'

export const lightTheme: AppTheme = {
  colors: {
    accent: '#1D4ED8',
    accentMuted: '#DBEAFE',
    background: '#F8FAFC',
    border: '#D7E0EA',
    danger: '#B91C1C',
    surfacePrimary: '#FFFFFF',
    surfaceSecondary: '#EEF2FF',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
  },
  id: 'light',
  radius: {
    large: 26,
    medium: 18,
    pill: 999,
  },
  shadows: {
    card: 0.08,
  },
  typography: {
    body: 14,
    caption: 12,
    display: 30,
    title: 18,
  },
}

export const darkTheme: AppTheme = {
  colors: {
    accent: '#7DD3FC',
    accentMuted: '#083344',
    background: '#020617',
    border: '#1E293B',
    danger: '#FCA5A5',
    surfacePrimary: '#0F172A',
    surfaceSecondary: '#111827',
    textPrimary: '#E2E8F0',
    textSecondary: '#94A3B8',
  },
  id: 'dark',
  radius: {
    large: 26,
    medium: 18,
    pill: 999,
  },
  shadows: {
    card: 0.26,
  },
  typography: {
    body: 14,
    caption: 12,
    display: 30,
    title: 18,
  },
}

export const themeMap: Record<ThemeMode, AppTheme> = {
  dark: darkTheme,
  light: lightTheme,
}
