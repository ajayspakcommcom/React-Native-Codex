import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import {
  UserRole,
  WorkspaceSessionProvider,
  useWorkspaceSession,
} from './WorkspaceSessionContext'

const projectOptions = [
  { id: 'mobile-redesign', label: 'Mobile redesign' },
  { id: 'analytics-portal', label: 'Analytics portal' },
  { id: 'growth-experiments', label: 'Growth experiments' },
] as const

const roleOptions: ReadonlyArray<UserRole> = ['Admin', 'Editor', 'Viewer']

function SessionSummaryCard(): React.JSX.Element {
  const {
    workspaceName,
    currentMember,
    activeProjectId,
    notificationsEnabled,
  } = useWorkspaceSession()

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Session summary</Text>
      <Text style={styles.primaryText}>{workspaceName}</Text>
      <Text style={styles.secondaryText}>Member: {currentMember.name}</Text>
      <Text style={styles.secondaryText}>Role: {currentMember.role}</Text>
      <Text style={styles.secondaryText}>Project: {activeProjectId}</Text>
      <Text style={styles.secondaryText}>
        Notifications: {notificationsEnabled ? 'Enabled' : 'Disabled'}
      </Text>
    </View>
  )
}

function ProjectSelector(): React.JSX.Element {
  const { activeProjectId, setActiveProjectId } = useWorkspaceSession()

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Active project</Text>
      <Text style={styles.secondaryText}>
        Context lets sibling components react to the same shared selection
        without prop drilling.
      </Text>

      <View style={styles.optionGroup}>
        {projectOptions.map(project => {
          const isActive = project.id === activeProjectId

          return (
            <Pressable
              key={project.id}
              accessibilityRole="button"
              style={[styles.optionButton, isActive && styles.optionButtonActive]}
              onPress={() => setActiveProjectId(project.id)}>
              <Text
                style={[
                  styles.optionButtonText,
                  isActive && styles.optionButtonTextActive,
                ]}>
                {project.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

function WorkspacePreferencesPanel(): React.JSX.Element {
  const { currentMember, notificationsEnabled, switchRole, toggleNotifications } =
    useWorkspaceSession()

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Shared preferences</Text>
      <Text style={styles.secondaryText}>
        These controls update global session state for every consumer below this
        provider.
      </Text>

      <View style={styles.optionGroup}>
        {roleOptions.map(role => {
          const isActive = currentMember.role === role

          return (
            <Pressable
              key={role}
              accessibilityRole="button"
              style={[styles.optionButton, isActive && styles.optionButtonActive]}
              onPress={() => switchRole(role)}>
              <Text
                style={[
                  styles.optionButtonText,
                  isActive && styles.optionButtonTextActive,
                ]}>
                {role}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: notificationsEnabled }}
        style={[
          styles.toggleButton,
          notificationsEnabled ? styles.toggleOn : styles.toggleOff,
        ]}
        onPress={toggleNotifications}>
        <Text style={styles.toggleButtonText}>
          {notificationsEnabled
            ? 'Disable notifications'
            : 'Enable notifications'}
        </Text>
      </Pressable>
    </View>
  )
}

function WorkspaceSessionConsumers(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Context API</Text>
      <Text style={styles.heading}>Workspace Session Board</Text>
      <Text style={styles.description}>
        This example uses a typed provider, a guarded custom context hook, and
        multiple consumers that share session state without prop drilling.
      </Text>

      <SessionSummaryCard />
      <ProjectSelector />
      <WorkspacePreferencesPanel />
    </ScrollView>
  )
}

export default function WorkspaceSessionBoard(): React.JSX.Element {
  return (
    <WorkspaceSessionProvider>
      <WorkspaceSessionConsumers />
    </WorkspaceSessionProvider>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#2563EB',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  primaryText: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  secondaryText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  optionButton: {
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonActive: {
    backgroundColor: '#1D4ED8',
  },
  optionButtonText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  toggleButton: {
    marginTop: 8,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  toggleOn: {
    backgroundColor: '#DBEAFE',
  },
  toggleOff: {
    backgroundColor: '#E2E8F0',
  },
  toggleButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
})
