export const foundationTheme = {
  colors: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceMuted: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    border: '#CBD5E1',
    borderSoft: '#E2E8F0',
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    success: '#0B8F55',
    successSoft: '#DCFCE7',
    infoSoft: '#DBEAFE',
    warning: '#F59E0B',
    dangerSoft: '#FEE2E2',
    dark: '#0F172A',
    white: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    pill: 999,
  },
  shadows: {
    card: {
      shadowColor: '#0F172A',
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
  },
} as const

export type FoundationTheme = typeof foundationTheme
