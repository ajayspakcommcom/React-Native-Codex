import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useAppTheme } from './useAppTheme'

export function ThemedSurface({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}): React.JSX.Element {
  const { theme } = useAppTheme()

  return (
    <View
      style={[
        styles.surface,
        {
          backgroundColor: theme.colors.surfacePrimary,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.large,
          shadowOpacity: theme.shadows.card,
        },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.title,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  surface: {
    marginTop: 18,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    elevation: 4,
  },
  title: {
    fontWeight: '800',
  },
})
