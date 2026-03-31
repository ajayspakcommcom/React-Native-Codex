import React, { useEffect, useReducer, useRef } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { useDebouncedValue } from './useDebouncedValue'

type FeedbackStatus = 'all' | 'open' | 'planned' | 'closed'

interface FeedbackItem {
  id: string
  title: string
  team: string
  priority: 'Low' | 'Medium' | 'High'
  status: Exclude<FeedbackStatus, 'all'>
}

interface FeedbackState {
  query: string
  selectedStatus: FeedbackStatus
  selectedId: string | null
  visibleItems: FeedbackItem[]
  isSearching: boolean
  syncNote: string
}

type FeedbackAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_STATUS'; payload: FeedbackStatus }
  | { type: 'SEARCH_STARTED' }
  | { type: 'SEARCH_COMPLETED'; payload: FeedbackItem[] }
  | { type: 'SELECT_ITEM'; payload: string }
  | { type: 'SYNC_NOTE_UPDATED'; payload: string }

const feedbackItems: ReadonlyArray<FeedbackItem> = [
  {
    id: 'feedback-1',
    title: 'Add offline mode for saved reports',
    team: 'Analytics',
    priority: 'High',
    status: 'planned',
  },
  {
    id: 'feedback-2',
    title: 'Support biometric login on Android',
    team: 'Platform',
    priority: 'High',
    status: 'open',
  },
  {
    id: 'feedback-3',
    title: 'Improve export progress feedback',
    team: 'Reporting',
    priority: 'Medium',
    status: 'closed',
  },
  {
    id: 'feedback-4',
    title: 'Add keyboard shortcuts to dashboard',
    team: 'Workspace',
    priority: 'Low',
    status: 'open',
  },
]

const statusOptions: ReadonlyArray<FeedbackStatus> = [
  'all',
  'open',
  'planned',
  'closed',
]

const filterFeedbackItems = (
  items: ReadonlyArray<FeedbackItem>,
  query: string,
  status: FeedbackStatus,
): FeedbackItem[] => {
  const normalizedQuery = query.trim().toLowerCase()

  return items.filter(item => {
    const matchesStatus = status === 'all' ? true : item.status === status
    const matchesQuery =
      normalizedQuery.length === 0
        ? true
        : item.title.toLowerCase().includes(normalizedQuery) ||
          item.team.toLowerCase().includes(normalizedQuery)

    return matchesStatus && matchesQuery
  })
}

const createInitialState = (): FeedbackState => ({
  query: '',
  selectedStatus: 'all',
  selectedId: feedbackItems[0]?.id ?? null,
  visibleItems: [...feedbackItems],
  isSearching: false,
  syncNote: 'Ready to search product feedback',
})

function feedbackReducer(
  state: FeedbackState,
  action: FeedbackAction,
): FeedbackState {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      }
    case 'SET_STATUS':
      return {
        ...state,
        selectedStatus: action.payload,
      }
    case 'SEARCH_STARTED':
      return {
        ...state,
        isSearching: true,
        syncNote: 'Searching feedback items...',
      }
    case 'SEARCH_COMPLETED':
      return {
        ...state,
        isSearching: false,
        visibleItems: action.payload,
        selectedId: action.payload[0]?.id ?? null,
      }
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedId: action.payload,
      }
    case 'SYNC_NOTE_UPDATED':
      return {
        ...state,
        syncNote: action.payload,
      }
    default:
      return state
  }
}

function formatStatusLabel(status: FeedbackStatus): string {
  if (status === 'all') {
    return 'All'
  }

  return status.charAt(0).toUpperCase() + status.slice(1)
}

export default function FeedbackInsightsBoard(): React.JSX.Element {
  const [state, dispatch] = useReducer(feedbackReducer, undefined, createInitialState)
  const searchInputRef = useRef<TextInput | null>(null)
  const requestSequenceRef = useRef(0)
  const debouncedQuery = useDebouncedValue(state.query, 350)

  useEffect(() => {
    const focusTimeoutId = setTimeout(() => {
      searchInputRef.current?.focus()
    }, 250)

    return () => {
      clearTimeout(focusTimeoutId)
    }
  }, [])

  useEffect(() => {
    requestSequenceRef.current += 1
    const requestId = requestSequenceRef.current

    dispatch({ type: 'SEARCH_STARTED' })

    const searchTimeoutId = setTimeout(() => {
      const nextItems = filterFeedbackItems(
        feedbackItems,
        debouncedQuery,
        state.selectedStatus,
      )

      if (requestId !== requestSequenceRef.current) {
        return
      }

      dispatch({ type: 'SEARCH_COMPLETED', payload: nextItems })
      dispatch({
        type: 'SYNC_NOTE_UPDATED',
        payload: `Showing ${nextItems.length} result(s) for "${debouncedQuery || 'all feedback'}"`,
      })
    }, 450)

    return () => {
      clearTimeout(searchTimeoutId)
    }
  }, [debouncedQuery, state.selectedStatus])

  const selectedItem =
    state.visibleItems.find(item => item.id === state.selectedId) ?? null

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Hooks In Depth</Text>
      <Text style={styles.heading}>Feedback Insights Board</Text>
      <Text style={styles.description}>
        This mid-level example combines `useReducer`, `useEffect`, `useRef`,
        cleanup logic, and a reusable custom hook for debounced search.
      </Text>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Search workspace</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Focus search input"
            style={styles.secondaryButton}
            onPress={() => searchInputRef.current?.focus()}>
            <Text style={styles.secondaryButtonText}>Focus input</Text>
          </Pressable>
        </View>

        <TextInput
          ref={searchInputRef}
          accessibilityLabel="Search product feedback"
          value={state.query}
          onChangeText={value => dispatch({ type: 'SET_QUERY', payload: value })}
          placeholder="Search by title or team"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusRow}>
          {statusOptions.map(status => {
            const isActive = state.selectedStatus === status

            return (
              <Pressable
                key={status}
                accessibilityRole="button"
                style={[styles.statusChip, isActive && styles.statusChipActive]}
                onPress={() => dispatch({ type: 'SET_STATUS', payload: status })}>
                <Text
                  style={[
                    styles.statusChipText,
                    isActive && styles.statusChipTextActive,
                  ]}>
                  {formatStatusLabel(status)}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>

        <View style={styles.syncBox}>
          <Text style={styles.syncText}>
            {state.isSearching ? 'Updating results...' : state.syncNote}
          </Text>
        </View>
      </View>

      <View style={styles.layoutRow}>
        <View style={[styles.card, styles.resultsPanel]}>
          <Text style={styles.sectionTitle}>Visible items</Text>
          {state.visibleItems.length > 0 ? (
            state.visibleItems.map(item => {
              const isSelected = state.selectedId === item.id

              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  style={[styles.resultRow, isSelected && styles.resultRowActive]}
                  onPress={() =>
                    dispatch({ type: 'SELECT_ITEM', payload: item.id })
                  }>
                  <View style={styles.resultContent}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultMeta}>
                      {item.team} | {item.priority} priority
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      item.status === 'open'
                        ? styles.openBadge
                        : item.status === 'planned'
                          ? styles.plannedBadge
                          : styles.closedBadge,
                    ]}>
                    <Text style={styles.badgeText}>
                      {formatStatusLabel(item.status)}
                    </Text>
                  </View>
                </Pressable>
              )
            })
          ) : (
            <Text style={styles.emptyText}>
              No feedback matched the current search and filter.
            </Text>
          )}
        </View>

        <View style={[styles.card, styles.detailPanel]}>
          <Text style={styles.sectionTitle}>Selected item</Text>
          {selectedItem ? (
            <>
              <Text style={styles.detailTitle}>{selectedItem.title}</Text>
              <Text style={styles.detailMeta}>Team: {selectedItem.team}</Text>
              <Text style={styles.detailMeta}>
                Priority: {selectedItem.priority}
              </Text>
              <Text style={styles.detailMeta}>
                Status: {formatStatusLabel(selectedItem.status)}
              </Text>

              <View style={styles.notesBox}>
                <Text style={styles.notesHeading}>Hooks used here</Text>
                <Text style={styles.notesText}>
                  `useReducer` manages screen state, `useEffect` handles debounced
                  search side effects, `useRef` keeps the input handle and
                  request sequence stable, and `useDebouncedValue` extracts
                  reusable timing logic.
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.emptyText}>Select an item to inspect details.</Text>
          )}
        </View>
      </View>
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
    lineHeight: 22,
    color: '#475569',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  secondaryButton: {
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  statusRow: {
    paddingTop: 16,
  },
  statusChip: {
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
  },
  statusChipActive: {
    backgroundColor: '#1D4ED8',
  },
  statusChipText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  statusChipTextActive: {
    color: '#FFFFFF',
  },
  syncBox: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    padding: 14,
  },
  syncText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '600',
  },
  layoutRow: {
    marginTop: 4,
  },
  resultsPanel: {
    marginTop: 16,
  },
  detailPanel: {
    marginTop: 16,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultRowActive: {
    backgroundColor: '#F8FAFC',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  resultContent: {
    flex: 1,
    marginRight: 10,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  resultMeta: {
    marginTop: 6,
    fontSize: 13,
    color: '#64748B',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  openBadge: {
    backgroundColor: '#DBEAFE',
  },
  plannedBadge: {
    backgroundColor: '#FEF3C7',
  },
  closedBadge: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 18,
    fontSize: 14,
    color: '#64748B',
  },
  detailTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  detailMeta: {
    marginTop: 10,
    fontSize: 14,
    color: '#475569',
  },
  notesBox: {
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  notesHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  notesText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
})
