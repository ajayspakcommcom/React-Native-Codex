import React, { useMemo, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native'

type Environment = 'Production' | 'Staging'

const environmentOptions: Environment[] = ['Staging', 'Production']

export default function MaestroWorkspaceHarness(): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [workspaceName, setWorkspaceName] = useState('')
  const [environment, setEnvironment] = useState<Environment>('Staging')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const isFormValid = useMemo(() => {
    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    const hasWorkspaceName = workspaceName.trim().length >= 3

    return hasEmail && hasWorkspaceName
  }, [email, workspaceName])

  const handleCreateWorkspace = (): void => {
    if (!isFormValid) {
      return
    }

    setConfirmationMessage(
      `${workspaceName.trim()} workspace created in ${environment} with ${
        notificationsEnabled ? 'notifications enabled' : 'notifications disabled'
      }.`,
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>E2E testing</Text>
      <Text style={styles.heading}>Workspace Access Harness</Text>
      <Text style={styles.description}>
        This screen exists as a stable E2E automation surface for Maestro.
        Enterprise mobile E2E tests work best when the app exposes resilient IDs
        and predictable flows instead of relying on visual coincidence.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Access setup</Text>

        <Text style={styles.label}>Work email</Text>
        <TextInput
          accessibilityLabel="Work email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="qa@reactnativecodex.dev"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          testID="e2e-email-input"
          value={email}
        />

        <Text style={styles.label}>Workspace name</Text>
        <TextInput
          accessibilityLabel="Workspace name"
          autoCapitalize="words"
          onChangeText={setWorkspaceName}
          placeholder="Operations Hub"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          testID="e2e-workspace-input"
          value={workspaceName}
        />

        <Text style={styles.label}>Environment</Text>
        <View style={styles.environmentRow}>
          {environmentOptions.map(option => {
            const isActive = option === environment

            return (
              <Pressable
                key={option}
                accessibilityRole="button"
                onPress={() => setEnvironment(option)}
                style={[
                  styles.environmentButton,
                  isActive && styles.environmentButtonActive,
                ]}
                testID={`e2e-environment-${option.toLowerCase()}`}>
                <Text
                  style={[
                    styles.environmentButtonText,
                    isActive && styles.environmentButtonTextActive,
                  ]}>
                  {option}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleCopy}>
            <Text style={styles.label}>Enable alerts</Text>
            <Text style={styles.helperText}>
              Toggle a user-visible setting so the E2E flow can verify stateful interaction.
            </Text>
          </View>
          <Switch
            onValueChange={setNotificationsEnabled}
            testID="e2e-alerts-switch"
            value={notificationsEnabled}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !isFormValid }}
          disabled={!isFormValid}
          onPress={handleCreateWorkspace}
          style={[styles.ctaButton, !isFormValid && styles.ctaButtonDisabled]}
          testID="e2e-create-workspace-button">
          <Text style={styles.ctaButtonText}>Create workspace</Text>
        </Pressable>

        {confirmationMessage ? (
          <View style={styles.successBanner} testID="e2e-success-banner">
            <Text style={styles.successTitle}>Workspace created</Text>
            <Text style={styles.successText}>{confirmationMessage}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#0F766E',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  card: {
    marginTop: 20,
    padding: 22,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7E0EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  label: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  environmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  environmentButton: {
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  environmentButtonActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  environmentButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  environmentButtonTextActive: {
    color: '#FFFFFF',
  },
  toggleRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleCopy: {
    flex: 1,
    paddingRight: 14,
  },
  helperText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: '#64748B',
  },
  ctaButton: {
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#1D4ED8',
    paddingVertical: 15,
  },
  ctaButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  successBanner: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#86EFAC',
    padding: 16,
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#166534',
  },
  successText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#166534',
  },
})
