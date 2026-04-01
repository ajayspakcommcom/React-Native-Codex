import React, {
  memo,
  Profiler,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react'
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { useProfilerMetrics } from '../shared/useProfilerMetrics'

type QueueStatus = 'Delayed' | 'Packing' | 'Ready'
type Region = 'Europe' | 'India' | 'North America'

interface FulfillmentOrder {
  customer: string
  etaMinutes: number
  id: string
  itemCount: number
  priorityScore: number
  region: Region
  status: QueueStatus
}

interface OrderRowProps {
  isSelected: boolean
  onSelect: (orderId: string) => void
  order: FulfillmentOrder
}

interface QueueListSectionProps {
  onProfilerRender: React.ProfilerOnRenderCallback
  onSelectOrder: (orderId: string) => void
  orders: ReadonlyArray<FulfillmentOrder>
  selectedOrderId: string | null
}

const ROW_HEIGHT = 132
const STATUS_FILTERS: Array<'All' | QueueStatus> = [
  'All',
  'Ready',
  'Packing',
  'Delayed',
]

const fulfillmentOrders: ReadonlyArray<FulfillmentOrder> = Array.from(
  { length: 160 },
  (_, index) => {
    const statusOptions: QueueStatus[] = ['Ready', 'Packing', 'Delayed']
    const regionOptions: Region[] = ['India', 'Europe', 'North America']

    return {
      customer: `Account ${index + 1}`,
      etaMinutes: 15 + (index % 6) * 10,
      id: `order-${index + 1}`,
      itemCount: 2 + (index % 5),
      priorityScore: 45 + (index % 7) * 8,
      region: regionOptions[index % regionOptions.length],
      status: statusOptions[index % statusOptions.length],
    }
  },
)

const QueueMetricCard = memo(function QueueMetricCard({
  label,
  value,
}: {
  label: string
  value: string
}): React.JSX.Element {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  )
})

const OrderRow = memo(function OrderRow({
  isSelected,
  onSelect,
  order,
}: OrderRowProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.rowCard, isSelected && styles.rowCardSelected]}
      onPress={() => onSelect(order.id)}>
      <View style={styles.rowHeader}>
        <Text style={styles.rowTitle}>{order.customer}</Text>
        <Text style={styles.rowRegion}>{order.region}</Text>
      </View>

      <View style={styles.badgeRow}>
        <View
          style={[
            styles.statusBadge,
            order.status === 'Ready' && styles.statusBadgeSuccess,
            order.status === 'Delayed' && styles.statusBadgeWarning,
          ]}>
          <Text style={styles.statusBadgeText}>{order.status}</Text>
        </View>
      </View>

      <Text style={styles.rowMeta}>Items: {order.itemCount}</Text>
      <Text style={styles.rowMeta}>ETA: {order.etaMinutes} minutes</Text>
      <Text style={styles.rowMeta}>Priority score: {order.priorityScore}</Text>
    </Pressable>
  )
})

const OperationsNotesPanel = memo(function OperationsNotesPanel(): React.JSX.Element {
  const [draftNote, setDraftNote] = useState(
    'Hold the warehouse note here. Typing in this panel should not force list rows to do extra work.',
  )

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Operations note</Text>
      <Text style={styles.sectionText}>
        This state lives in a sibling panel so draft edits do not constantly
        churn the queue list.
      </Text>
      <TextInput
        multiline
        style={styles.noteInput}
        value={draftNote}
        onChangeText={setDraftNote}
      />
    </View>
  )
})

const QueueListSection = memo(function QueueListSection({
  onProfilerRender,
  onSelectOrder,
  orders,
  selectedOrderId,
}: QueueListSectionProps): React.JSX.Element {
  const keyExtractor = useCallback((item: FulfillmentOrder) => item.id, [])

  const getItemLayout = useCallback(
    (_data: ArrayLike<FulfillmentOrder> | null | undefined, index: number) => ({
      index,
      length: ROW_HEIGHT,
      offset: ROW_HEIGHT * index,
    }),
    [],
  )

  const renderItem = useCallback(
    ({ item }: { item: FulfillmentOrder }) => (
      <OrderRow
        order={item}
        isSelected={selectedOrderId === item.id}
        onSelect={onSelectOrder}
      />
    ),
    [onSelectOrder, selectedOrderId],
  )

  return (
    <Profiler id="OrderOperationsQueue.List" onRender={onProfilerRender}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Fulfillment queue</Text>
        <Text style={styles.sectionText}>
          `FlatList` is tuned here with row memoization, `getItemLayout`, stable
          callbacks, and batch controls.
        </Text>

        <FlatList
          data={orders}
          extraData={selectedOrderId}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={12}
          removeClippedSubviews
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          updateCellsBatchingPeriod={50}
          windowSize={7}
        />
      </View>
    </Profiler>
  )
})

export default function OrderOperationsQueue(): React.JSX.Element {
  const [selectedStatus, setSelectedStatus] = useState<'All' | QueueStatus>('All')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    fulfillmentOrders[0]?.id ?? null,
  )
  const [isPending, startTransition] = useTransition()
  const { onRender, recentSamples, summary } = useProfilerMetrics()

  const filteredOrders = useMemo(() => {
    if (selectedStatus === 'All') {
      return fulfillmentOrders
    }

    return fulfillmentOrders.filter(order => order.status === selectedStatus)
  }, [selectedStatus])

  const selectedOrder = useMemo(
    () =>
      filteredOrders.find(order => order.id === selectedOrderId) ??
      filteredOrders[0] ??
      null,
    [filteredOrders, selectedOrderId],
  )

  const queueSummary = useMemo(() => {
    const delayedOrders = filteredOrders.filter(
      order => order.status === 'Delayed',
    ).length
    const totalItems = filteredOrders.reduce(
      (sum, order) => sum + order.itemCount,
      0,
    )
    const averageEta =
      filteredOrders.length === 0
        ? 0
        : Math.round(
            filteredOrders.reduce((sum, order) => sum + order.etaMinutes, 0) /
              filteredOrders.length,
          )

    return {
      averageEta,
      delayedOrders,
      totalItems,
    }
  }, [filteredOrders])

  const handleSelectStatus = useCallback((status: 'All' | QueueStatus): void => {
    startTransition(() => {
      setSelectedStatus(status)
      setSelectedOrderId(currentSelectedId => {
        if (status === 'All') {
          return currentSelectedId
        }

        const matchingOrder = fulfillmentOrders.find(order => {
          return order.status === status && order.id === currentSelectedId
        })

        return matchingOrder
          ? matchingOrder.id
          : fulfillmentOrders.find(order => order.status === status)?.id ?? null
      })
    })
  }, [])

  const handleSelectOrder = useCallback((orderId: string): void => {
    setSelectedOrderId(orderId)
  }, [])

  return (
    <FlatList
      data={[{ id: 'performance-layout' }]}
      keyExtractor={item => item.id}
      renderItem={() => (
        <View style={styles.screen}>
          <Text style={styles.eyebrow}>FlatList optimization</Text>
          <Text style={styles.heading}>Order Operations Queue</Text>
          <Text style={styles.description}>
            This screen shows the patterns teams use in large lists: stable row
            rendering, fixed-layout measurement, batched rendering, isolated
            sibling state, and profiler-based measurement.
          </Text>

          <View style={styles.filterRow}>
            {STATUS_FILTERS.map(status => {
              const isActive = selectedStatus === status

              return (
                <Pressable
                  key={status}
                  accessibilityRole="button"
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => handleSelectStatus(status)}>
                  <Text
                    style={[
                      styles.filterChipText,
                      isActive && styles.filterChipTextActive,
                    ]}>
                    {status}
                  </Text>
                </Pressable>
              )
            })}
          </View>

          <View style={styles.metricsRow}>
            <QueueMetricCard
              label="Visible orders"
              value={`${filteredOrders.length}`}
            />
            <QueueMetricCard
              label="Delayed orders"
              value={`${queueSummary.delayedOrders}`}
            />
            <QueueMetricCard
              label="Average ETA"
              value={`${queueSummary.averageEta} min`}
            />
            <QueueMetricCard
              label="Queued items"
              value={`${queueSummary.totalItems}`}
            />
          </View>

          <View style={styles.layoutRow}>
            <View style={styles.primaryColumn}>
              <QueueListSection
                onProfilerRender={onRender}
                onSelectOrder={handleSelectOrder}
                orders={filteredOrders}
                selectedOrderId={selectedOrder?.id ?? null}
              />
            </View>

            <View style={styles.secondaryColumn}>
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Selected order</Text>
                {selectedOrder ? (
                  <>
                    <Text style={styles.detailText}>
                      Customer: {selectedOrder.customer}
                    </Text>
                    <Text style={styles.detailText}>
                      Region: {selectedOrder.region}
                    </Text>
                    <Text style={styles.detailText}>
                      Status: {selectedOrder.status}
                    </Text>
                    <Text style={styles.detailText}>
                      Items: {selectedOrder.itemCount}
                    </Text>
                    <Text style={styles.detailText}>
                      ETA: {selectedOrder.etaMinutes} minutes
                    </Text>
                  </>
                ) : (
                  <Text style={styles.sectionText}>No order selected.</Text>
                )}
              </View>

              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Profiler summary</Text>
                <Text style={styles.detailText}>
                  Samples: {summary.sampleCount}
                </Text>
                <Text style={styles.detailText}>
                  Average actual duration: {summary.averageActualDuration} ms
                </Text>
                <Text style={styles.detailText}>
                  Average base duration: {summary.averageBaseDuration} ms
                </Text>
                <Text style={styles.sectionText}>
                  Use these numbers together with React DevTools Profiler or
                  Flipper to confirm whether your list changes really improved
                  rendering.
                </Text>
                {recentSamples.slice(0, 3).map(sample => (
                  <Text key={`${sample.id}-${sample.commitTime}`} style={styles.sampleText}>
                    {sample.phase} | actual {sample.actualDuration} ms | base{' '}
                    {sample.baseDuration} ms
                  </Text>
                ))}
              </View>

              <OperationsNotesPanel />
            </View>
          </View>

          {isPending ? (
            <Text style={styles.pendingText}>Updating filter with a transition...</Text>
          ) : null}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
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
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
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
  metricsRow: {
    marginTop: 10,
  },
  metricCard: {
    marginTop: 12,
    borderRadius: 18,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  metricValue: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  layoutRow: {
    marginTop: 20,
  },
  primaryColumn: {
    flex: 1,
  },
  secondaryColumn: {
    flex: 1,
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
  rowCard: {
    height: ROW_HEIGHT - 8,
    marginTop: 12,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rowCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowRegion: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  badgeRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  statusBadge: {
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  rowMeta: {
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
  noteInput: {
    marginTop: 14,
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    padding: 14,
    textAlignVertical: 'top',
    color: '#0F172A',
  },
  pendingText: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
  },
})
