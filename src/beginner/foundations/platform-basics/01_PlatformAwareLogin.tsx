import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PlatformAwareLogin(): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isIOS = Platform.OS === 'ios'

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
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subheading}>
            This screen shows safe area handling, status bar differences,
            keyboard behavior, and platform-specific styling.
          </Text>
        </View>

        <View style={[styles.card, isIOS ? styles.iosCard : styles.androidCard]}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.platformNote}>
            <Text style={styles.platformNoteText}>
              Running on: {Platform.OS} {Platform.Version}
            </Text>
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: '#F8FAFC',
      android: '#0F172A',
      default: '#F8FAFC',
    }),
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  header: {
    marginBottom: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#2563EB',
  },
  heading: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
  },
  subheading: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  card: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  iosCard: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
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
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  platformNote: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
  },
  platformNoteText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
})
