import React from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'

import { foundationTheme } from './theme'

type PillTone = 'neutral' | 'info' | 'success' | 'danger'

interface FoundationCardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
}

interface PillProps {
  label: string
  tone?: PillTone
  style?: StyleProp<ViewStyle>
}

interface PrimaryButtonProps {
  label: string
  onPress?: () => void
  disabled?: boolean
  accessibilityLabel?: string
}

export function FoundationCard({
  children,
  style,
}: FoundationCardProps): React.JSX.Element {
  return <View style={[styles.card, style]}>{children}</View>
}

export function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps): React.JSX.Element {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  )
}

export function Pill({
  label,
  tone = 'neutral',
  style,
}: PillProps): React.JSX.Element {
  return (
    <View style={[styles.pill, pillToneStyles[tone], style]}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  )
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  accessibilityLabel,
}: PrimaryButtonProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: foundationTheme.colors.surface,
    borderRadius: foundationTheme.radius.lg,
    padding: foundationTheme.spacing.xl,
    ...foundationTheme.shadows.card,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: foundationTheme.colors.textPrimary,
  },
  sectionSubtitle: {
    marginTop: foundationTheme.spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: foundationTheme.colors.textSecondary,
  },
  pill: {
    borderRadius: foundationTheme.radius.pill,
    paddingHorizontal: foundationTheme.spacing.md,
    paddingVertical: foundationTheme.spacing.sm,
    marginRight: foundationTheme.spacing.sm,
    marginBottom: foundationTheme.spacing.sm,
  },
  pillText: {
    color: foundationTheme.colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    marginTop: foundationTheme.spacing.xl,
    borderRadius: foundationTheme.radius.sm,
    backgroundColor: foundationTheme.colors.primaryDark,
    alignItems: 'center',
    paddingVertical: 14,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  buttonDisabled: {
    backgroundColor: foundationTheme.colors.border,
  },
  buttonText: {
    color: foundationTheme.colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
})

const pillToneStyles = StyleSheet.create({
  neutral: {
    backgroundColor: foundationTheme.colors.surfaceMuted,
  },
  info: {
    backgroundColor: foundationTheme.colors.infoSoft,
  },
  success: {
    backgroundColor: foundationTheme.colors.successSoft,
  },
  danger: {
    backgroundColor: foundationTheme.colors.dangerSoft,
  },
})
