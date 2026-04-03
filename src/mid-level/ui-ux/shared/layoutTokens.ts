export type LayoutMode = 'compact' | 'medium' | 'wide'

export const layoutBreakpoints = {
  medium: 680,
  wide: 960,
} as const

export const layoutContainerWidths = {
  wide: 1180,
} as const

export const layoutSpacing = {
  compact: 16,
  medium: 18,
  wide: 20,
} as const

export const layoutPadding = {
  compact: 18,
  medium: 24,
  wide: 28,
} as const
