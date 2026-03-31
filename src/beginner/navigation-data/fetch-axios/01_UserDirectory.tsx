import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import axios from 'axios'

type DataSource = 'fetch' | 'axios'

interface ApiUser {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
}

interface DirectoryUser {
  id: string
  name: string
  email: string
  companyName: string
}

const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users'

const mapApiUser = (user: ApiUser): DirectoryUser => ({
  id: `${user.id}`,
  name: user.name,
  email: user.email,
  companyName: user.company.name,
})

const fetchUsersWithFetch = async (
  signal?: AbortSignal,
): Promise<DirectoryUser[]> => {
  const response = await fetch(USERS_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error('Fetch request failed')
  }

  const data = (await response.json()) as ApiUser[]
  return data.map(mapApiUser)
}

const fetchUsersWithAxios = async (): Promise<DirectoryUser[]> => {
  const response = await axios.get<ApiUser[]>(USERS_ENDPOINT)
  return response.data.map(mapApiUser)
}

function UserCard({ name, email, companyName }: DirectoryUser): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubtitle}>{companyName}</Text>
      <Text style={styles.cardMeta}>{email}</Text>
    </View>
  )
}

export default function UserDirectory(): React.JSX.Element {
  const [source, setSource] = useState<DataSource>('fetch')
  const [users, setUsers] = useState<DirectoryUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    const loadUsers = async (): Promise<void> => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const nextUsers =
          source === 'fetch'
            ? await fetchUsersWithFetch(controller.signal)
            : await fetchUsersWithAxios()

        if (isMounted) {
          setUsers(nextUsers)
        }
      } catch (error) {
        if (!isMounted) {
          return
        }

        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        setUsers([])
        setErrorMessage('Unable to load the user directory right now.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [source])

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Data Fetching</Text>
      <Text style={styles.heading}>User Directory</Text>
      <Text style={styles.description}>
        A realistic example showing loading, error, empty, and success states
        while switching between `fetch` and `axios`.
      </Text>

      <View style={styles.toggleRow}>
        <Pressable
          accessibilityRole="button"
          style={[styles.toggle, source === 'fetch' && styles.toggleActive]}
          onPress={() => setSource('fetch')}>
          <Text
            style={[
              styles.toggleText,
              source === 'fetch' && styles.toggleTextActive,
            ]}>
            Fetch
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={[styles.toggle, source === 'axios' && styles.toggleActive]}
          onPress={() => setSource('axios')}>
          <Text
            style={[
              styles.toggleText,
              source === 'axios' && styles.toggleTextActive,
            ]}>
            Axios
          </Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.stateBox}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.stateText}>Loading directory...</Text>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={[styles.stateBox, styles.errorBox]}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && users.length === 0 ? (
        <View style={styles.stateBox}>
          <Text style={styles.stateText}>No users found.</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage
        ? users.map(user => <UserCard key={user.id} {...user} />)
        : null}
    </ScrollView>
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
    lineHeight: 21,
    color: '#475569',
  },
  toggleRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  toggle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    marginRight: 10,
  },
  toggleActive: {
    backgroundColor: '#1D4ED8',
  },
  toggleText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  stateBox: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  stateText: {
    marginTop: 10,
    fontSize: 14,
    color: '#475569',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
  },
  card: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#2563EB',
  },
  cardMeta: {
    marginTop: 10,
    fontSize: 14,
    color: '#64748B',
  },
})
