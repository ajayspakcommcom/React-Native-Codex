import React, { createContext, useContext, useMemo, useState } from 'react'

export type UserRole = 'Admin' | 'Editor' | 'Viewer'

export interface WorkspaceMember {
  id: string
  name: string
  role: UserRole
}

interface WorkspaceSessionContextValue {
  workspaceName: string
  activeProjectId: string
  notificationsEnabled: boolean
  currentMember: WorkspaceMember
  setActiveProjectId: (projectId: string) => void
  toggleNotifications: () => void
  switchRole: (role: UserRole) => void
}

interface WorkspaceSessionProviderProps {
  children: React.ReactNode
}

const WorkspaceSessionContext =
  createContext<WorkspaceSessionContextValue | null>(null)

const initialMember: WorkspaceMember = {
  id: 'member-01',
  name: 'Ava Mitchell',
  role: 'Editor',
}

export function WorkspaceSessionProvider({
  children,
}: WorkspaceSessionProviderProps): React.JSX.Element {
  const [activeProjectId, setActiveProjectId] = useState('mobile-redesign')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [currentMember, setCurrentMember] = useState<WorkspaceMember>(initialMember)

  const value = useMemo<WorkspaceSessionContextValue>(
    () => ({
      workspaceName: 'Northstar Product Workspace',
      activeProjectId,
      notificationsEnabled,
      currentMember,
      setActiveProjectId,
      toggleNotifications: () => {
        setNotificationsEnabled(currentValue => !currentValue)
      },
      switchRole: (role: UserRole) => {
        setCurrentMember(member => ({
          ...member,
          role,
        }))
      },
    }),
    [activeProjectId, currentMember, notificationsEnabled],
  )

  return (
    <WorkspaceSessionContext.Provider value={value}>
      {children}
    </WorkspaceSessionContext.Provider>
  )
}

export function useWorkspaceSession(): WorkspaceSessionContextValue {
  const context = useContext(WorkspaceSessionContext)

  if (!context) {
    throw new Error(
      'useWorkspaceSession must be used inside WorkspaceSessionProvider',
    )
  }

  return context
}
