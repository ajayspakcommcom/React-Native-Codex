export type ThemeMode = 'dark' | 'light'
export type ThemePreference = ThemeMode | 'system'

export interface ThemeColorScale {
  accent: string
  accentMuted: string
  background: string
  border: string
  danger: string
  surfacePrimary: string
  surfaceSecondary: string
  textPrimary: string
  textSecondary: string
}

export interface ThemeTypographyScale {
  body: number
  caption: number
  display: number
  title: number
}

export interface ThemeRadiusScale {
  large: number
  medium: number
  pill: number
}

export interface ThemeShadowScale {
  card: number
}

export interface AppTheme {
  colors: ThemeColorScale
  id: ThemeMode
  radius: ThemeRadiusScale
  shadows: ThemeShadowScale
  typography: ThemeTypographyScale
}
