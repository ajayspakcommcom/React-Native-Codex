import { useMemo } from 'react'
import { type DimensionValue, useWindowDimensions } from 'react-native'

import {
  layoutBreakpoints,
  layoutContainerWidths,
  layoutPadding,
  layoutSpacing,
  type LayoutMode,
} from './layoutTokens'

export interface ResponsiveFoundation {
  cardColumns: 1 | 2
  cardWidth: DimensionValue
  contentMaxWidth?: number
  horizontalPadding: number
  isCompact: boolean
  isWide: boolean
  layoutMode: LayoutMode
  sectionGap: number
  width: number
}

export function useResponsiveFoundation(): ResponsiveFoundation {
  const { width } = useWindowDimensions()

  return useMemo(() => {
    if (width >= layoutBreakpoints.wide) {
      return {
        cardColumns: 2,
        cardWidth: '48.5%' as const,
        contentMaxWidth: layoutContainerWidths.wide,
        horizontalPadding: layoutPadding.wide,
        isCompact: false,
        isWide: true,
        layoutMode: 'wide',
        sectionGap: layoutSpacing.wide,
        width,
      }
    }

    if (width >= layoutBreakpoints.medium) {
      return {
        cardColumns: 2,
        cardWidth: '48.5%' as const,
        contentMaxWidth: undefined,
        horizontalPadding: layoutPadding.medium,
        isCompact: false,
        isWide: false,
        layoutMode: 'medium',
        sectionGap: layoutSpacing.medium,
        width,
      }
    }

    return {
      cardColumns: 1,
      cardWidth: '100%' as const,
      contentMaxWidth: undefined,
      horizontalPadding: layoutPadding.compact,
      isCompact: true,
      isWide: false,
      layoutMode: 'compact',
      sectionGap: layoutSpacing.compact,
      width,
    }
  }, [width])
}
