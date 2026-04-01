import React, {
  memo,
  Profiler,
  startTransition,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { useProfilerMetrics } from '../shared/useProfilerMetrics'

type TicketPriority = 'High' | 'Low' | 'Medium'
type TicketStatus = 'Blocked' | 'In Review' | 'Open'

interface SupportTicket {
  assignedTo: string
  customer: string
  id: string
  lastUpdatedMinutesAgo: number
  priority: TicketPriority
  status: TicketStatus
  title: string
}

interface TicketListPanelProps {
  onProfilerRender: React.ProfilerOnRenderCallback
  onSelectTicket: (ticketId: string) => void
  selectedTicketId: string | null
  tickets: ReadonlyArray<SupportTicket>
}

const PRIORITY_FILTERS: Array<'All' | TicketPriority> = [
  'All',
  'High',
  'Medium',
  'Low',
]

const supportTickets: ReadonlyArray<SupportTicket> = [
  {
    assignedTo: 'Ava',
    customer: 'Northwind',
    id: 'ticket-1',
    lastUpdatedMinutesAgo: 18,
    priority: 'High',
    status: 'Open',
    title: 'Subscription renewal checkout is failing on iOS',
  },
  {
    assignedTo: 'Noah',
    customer: 'Brightworks',
    id: 'ticket-2',
    lastUpdatedMinutesAgo: 42,
    priority: 'Medium',
    status: 'In Review',
    title: 'Push notification copy is missing on Android 15',
  },
  {
    assignedTo: 'Mia',
    customer: 'Helio Labs',
    id: 'ticket-3',
    lastUpdatedMinutesAgo: 7,
    priority: 'High',
    status: 'Blocked',
    title: 'Camera permission recovery flow does not reopen correctly',
  },
  {
    assignedTo: 'Ishaan',
    customer: 'Flowstack',
    id: 'ticket-4',
    lastUpdatedMinutesAgo: 63,
    priority: 'Low',
    status: 'Open',
    title: 'Marketing banner image needs refreshed aspect ratio guidance',
  },
  {
    assignedTo: 'Emma',
    customer: 'Riverline',
    id: 'ticket-5',
    lastUpdatedMinutesAgo: 25,
    priority: 'Medium',
    status: 'In Review',
    title: 'Workspace settings sync note should clarify saved state timing',
  },
] as const

const MetricStrip = memo(function MetricStrip({
  blockedCount,
  highPriorityCount,
  visibleCount,
}: {
  blockedCount: number
  highPriorityCount: number
  visibleCount: number
}): React.JSX.Element {
  return (
    <View style={styles.metricStrip}>
      <Text style={styles.metricText}>Visible: {visibleCount}</Text>
      <Text style={styles.metricText}>High priority: {highPriorityCount}</Text>
      <Text style={styles.metricText}>Blocked: {blockedCount}</Text>
    </View>
  )
})

const TicketRow = memo(function TicketRow({
  isSelected,
  onSelectTicket,
  ticket,
}: {
  isSelected: boolean
  onSelectTicket: (ticketId: string) => void
  ticket: SupportTicket
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.ticketCard, isSelected && styles.ticketCardSelected]}
      onPress={() => onSelectTicket(ticket.id)}>
      <Text style={styles.ticketTitle}>{ticket.title}</Text>
      <Text style={styles.ticketMeta}>
        {ticket.customer} | {ticket.assignedTo}
      </Text>
      <Text style={styles.ticketMeta}>
        {ticket.priority} priority | {ticket.status} | Updated{' '}
        {ticket.lastUpdatedMinutesAgo}m ago
      </Text>
    </Pressable>
  )
})

const DraftComposer = memo(function DraftComposer(): React.JSX.Element {
  const [draftReply, setDraftReply] = useState(
    'Draft reply state lives here instead of the parent screen, which keeps unrelated panels from re-rendering while the user types.',
  )

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Draft composer</Text>
      <Text style={styles.sectionText}>
        Colocate fast-changing state near the component that owns it.
      </Text>
      <TextInput
        multiline
        style={styles.input}
        value={draftReply}
        onChangeText={setDraftReply}
      />
    </View>
  )
})

const TicketListPanel = memo(function TicketListPanel({
  onProfilerRender,
  onSelectTicket,
  selectedTicketId,
  tickets,
}: TicketListPanelProps): React.JSX.Element {
  return (
    <Profiler id="WorkspaceSupportConsole.List" onRender={onProfilerRender}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Ticket stream</Text>
        <Text style={styles.sectionText}>
          Search and priority filtering feed this panel. The ticket list is
          isolated so the draft composer can update independently.
        </Text>

        {tickets.map(ticket => (
          <TicketRow
            key={ticket.id}
            isSelected={selectedTicketId === ticket.id}
            onSelectTicket={onSelectTicket}
            ticket={ticket}
          />
        ))}
      </View>
    </Profiler>
  )
})

export default function WorkspaceSupportConsole(): React.JSX.Element {
  const [priorityFilter, setPriorityFilter] = useState<'All' | TicketPriority>('All')
  const [query, setQuery] = useState('')
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    supportTickets[0]?.id ?? null,
  )
  const deferredQuery = useDeferredValue(query)
  const { onRender, recentSamples, summary } = useProfilerMetrics()

  const visibleTickets = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    return supportTickets.filter(ticket => {
      const matchesPriority =
        priorityFilter === 'All' || ticket.priority === priorityFilter

      const matchesQuery =
        normalizedQuery.length === 0 ||
        ticket.title.toLowerCase().includes(normalizedQuery) ||
        ticket.customer.toLowerCase().includes(normalizedQuery)

      return matchesPriority && matchesQuery
    })
  }, [deferredQuery, priorityFilter])

  const selectedTicket = useMemo(
    () =>
      visibleTickets.find(ticket => ticket.id === selectedTicketId) ??
      visibleTickets[0] ??
      null,
    [selectedTicketId, visibleTickets],
  )

  const supportMetrics = useMemo(() => {
    return {
      blockedCount: visibleTickets.filter(ticket => ticket.status === 'Blocked')
        .length,
      highPriorityCount: visibleTickets.filter(
        ticket => ticket.priority === 'High',
      ).length,
      visibleCount: visibleTickets.length,
    }
  }, [visibleTickets])

  const handleSelectTicket = useCallback((ticketId: string): void => {
    setSelectedTicketId(ticketId)
  }, [])

  const handlePriorityFilterChange = useCallback(
    (priority: 'All' | TicketPriority): void => {
      startTransition(() => {
        setPriorityFilter(priority)
      })
    },
    [],
  )

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Avoid unnecessary re-renders</Text>
      <Text style={styles.heading}>Workspace Support Console</Text>
      <Text style={styles.description}>
        This screen demonstrates render isolation patterns used in larger apps:
        colocated state, deferred search, transitions for heavy filter updates,
        and memoized panels with narrow props.
      </Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Filters</Text>
        <TextInput
          placeholder="Search tickets or customers"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />

        <View style={styles.filterRow}>
          {PRIORITY_FILTERS.map(priority => {
            const isActive = priorityFilter === priority

            return (
              <Pressable
                key={priority}
                accessibilityRole="button"
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => handlePriorityFilterChange(priority)}>
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}>
                  {priority}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <MetricStrip
        blockedCount={supportMetrics.blockedCount}
        highPriorityCount={supportMetrics.highPriorityCount}
        visibleCount={supportMetrics.visibleCount}
      />

      <TicketListPanel
        onProfilerRender={onRender}
        onSelectTicket={handleSelectTicket}
        selectedTicketId={selectedTicket?.id ?? null}
        tickets={visibleTickets}
      />

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Selected ticket</Text>
        {selectedTicket ? (
          <>
            <Text style={styles.detailText}>{selectedTicket.title}</Text>
            <Text style={styles.detailText}>
              Customer: {selectedTicket.customer}
            </Text>
            <Text style={styles.detailText}>
              Owner: {selectedTicket.assignedTo}
            </Text>
            <Text style={styles.detailText}>
              Status: {selectedTicket.status}
            </Text>
            <Text style={styles.detailText}>
              Priority: {selectedTicket.priority}
            </Text>
          </>
        ) : (
          <Text style={styles.sectionText}>No ticket selected.</Text>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Profiler summary</Text>
        <Text style={styles.detailText}>Samples: {summary.sampleCount}</Text>
        <Text style={styles.detailText}>
          Average actual duration: {summary.averageActualDuration} ms
        </Text>
        <Text style={styles.detailText}>
          Average base duration: {summary.averageBaseDuration} ms
        </Text>
        {recentSamples.slice(0, 3).map(sample => (
          <Text key={`${sample.id}-${sample.commitTime}`} style={styles.sampleText}>
            {sample.phase} | actual {sample.actualDuration} ms | base{' '}
            {sample.baseDuration} ms
          </Text>
        ))}
      </View>

      <DraftComposer />
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
    letterSpacing: 0.8,
    textTransform: 'uppercase',
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
  sectionCard: {
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  input: {
    marginTop: 14,
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    textAlignVertical: 'top',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  filterChip: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  filterChipActive: {
    backgroundColor: '#1D4ED8',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  metricStrip: {
    marginTop: 20,
    borderRadius: 18,
    padding: 18,
    backgroundColor: '#DBEAFE',
  },
  metricText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A8A',
    marginTop: 6,
  },
  ticketCard: {
    marginTop: 14,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ticketCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  ticketMeta: {
    marginTop: 8,
    fontSize: 13,
    color: '#475569',
  },
  detailText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
  sampleText: {
    marginTop: 8,
    fontSize: 12,
    color: '#475569',
  },
})
