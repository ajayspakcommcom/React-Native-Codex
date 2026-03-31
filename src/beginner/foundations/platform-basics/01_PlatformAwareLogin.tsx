import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  FoundationCard,
  PrimaryButton,
  SectionHeader,
} from '../shared/ui'
import { foundationTheme } from '../shared/theme'

export default function PlatformAwareLogin(): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isIOS = Platform.OS === 'ios'
  const isFormValid = email.trim().length > 0 && password.trim().length >= 8

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar
        barStyle={isIOS ? 'dark-content' : 'light-content'}
        backgroundColor={isIOS ? '#F8FAFC' : '#0F172A'}
      />

      <KeyboardAvoidingView
        style={styles.screen}
        behavior={isIOS ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.caption}>
            {isIOS ? 'iOS login experience' : 'Android login experience'}
          </Text>
          <SectionHeader
            title="Welcome back"
            subtitle="This version adds stronger form behavior, clearer platform handling, and reusable shared UI so the example is closer to how production screens are structured."
          />
        </View>

        <FoundationCard
          style={[styles.card, isIOS ? styles.iosCard : styles.androidCard]}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            accessibilityLabel="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            returnKeyType="next"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            accessibilityLabel="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            textContentType="password"
            returnKeyType="done"
            style={styles.input}
          />

          <View style={styles.platformNote}>
            <Text style={styles.platformNoteText}>
              Running on: {Platform.OS} {Platform.Version}
            </Text>
          </View>

          <PrimaryButton
            label="Sign in"
            disabled={!isFormValid}
            accessibilityLabel="Sign in to your account"
          />
        </FoundationCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: foundationTheme.colors.background,
      android: foundationTheme.colors.dark,
      default: foundationTheme.colors.background,
    }),
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: foundationTheme.colors.background,
  },
  header: {
    marginBottom: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: foundationTheme.colors.primary,
  },
  card: {
    marginTop: 8,
  },
  iosCard: {
    ...foundationTheme.shadows.card,
  },
  androidCard: {
    elevation: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: foundationTheme.colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: foundationTheme.colors.textPrimary,
    marginBottom: 16,
    backgroundColor: foundationTheme.colors.surface,
  },
  platformNote: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
  },
  platformNoteText: {
    color: foundationTheme.colors.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
})
