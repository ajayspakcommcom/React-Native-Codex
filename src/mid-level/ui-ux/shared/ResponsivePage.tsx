import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { type ResponsiveFoundation } from './useResponsiveFoundation'

export function ResponsivePage({
  backgroundColor,
  children,
  foundation,
}: {
  backgroundColor: string
  children: React.ReactNode
  foundation: ResponsiveFoundation
}): React.JSX.Element {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.screen,
        {
          backgroundColor,
          paddingBottom: foundation.sectionGap + 20,
        },
      ]}>
      <View
        style={[
          styles.content,
          {
            maxWidth: foundation.contentMaxWidth,
            paddingHorizontal: foundation.horizontalPadding,
          },
        ]}>
        {children}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 20,
  },
})
