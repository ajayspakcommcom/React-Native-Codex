import React from 'react'
import { StyleSheet, View } from 'react-native'

import { type ResponsiveFoundation } from './useResponsiveFoundation'

export function ResponsiveSplitLayout({
  foundation,
  primary,
  secondary,
}: {
  foundation: ResponsiveFoundation
  primary: React.ReactNode
  secondary: React.ReactNode
}): React.JSX.Element {
  return (
    <View
      style={[
        styles.row,
        foundation.isWide && styles.rowWide,
        { marginTop: foundation.sectionGap },
      ]}>
      <View style={styles.primaryColumn}>{primary}</View>
      <View
        style={[
          styles.secondaryColumn,
          !foundation.isWide && { marginTop: foundation.sectionGap },
        ]}>
        {secondary}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {},
  rowWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  primaryColumn: {
    flex: 1.2,
  },
  secondaryColumn: {
    flex: 0.8,
  },
})
