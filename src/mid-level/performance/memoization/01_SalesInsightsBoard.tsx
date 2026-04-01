import React, { memo, useCallback, useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

type Region = 'North America' | 'Europe' | 'India'
type PipelineStatus = 'Active' | 'At Risk' | 'Closed Won'

interface DealInsight {
  id: string
  owner: string
  region: Region
  pipelineStatus: PipelineStatus
  monthlyRevenue: number
  renewalRiskScore: number
}

interface SummaryCardProps {
  label: string
  tone: 'neutral' | 'success' | 'warning'
  value: string
}

interface DealRowProps {
  deal: DealInsight
  isSelected: boolean
  onSelect: (dealId: string) => void
}

const salesInsights: ReadonlyArray<DealInsight> = [
  {
    id: 'deal-101',
    owner: 'Aarav',
    region: 'India',
    pipelineStatus: 'Active',
    monthlyRevenue: 18200,
    renewalRiskScore: 22,
  },
  {
    id: 'deal-102',
    owner: 'Mia',
    region: 'Europe',
    pipelineStatus: 'At Risk',
    monthlyRevenue: 26400,
    renewalRiskScore: 78,
  },
  {
    id: 'deal-103',
    owner: 'Noah',
    region: 'North America',
    pipelineStatus: 'Closed Won',
    monthlyRevenue: 30100,
    renewalRiskScore: 12,
  },
  {
    id: 'deal-104',
    owner: 'Ishaan',
    region: 'India',
    pipelineStatus: 'At Risk',
    monthlyRevenue: 14800,
    renewalRiskScore: 83,
  },
  {
    id: 'deal-105',
    owner: 'Emma',
    region: 'Europe',
    pipelineStatus: 'Active',
    monthlyRevenue: 21900,
    renewalRiskScore: 37,
  },
  {
    id: 'deal-106',
    owner: 'Liam',
    region: 'North America',
    pipelineStatus: 'Active',
    monthlyRevenue: 27500,
    renewalRiskScore: 29,
  },
] as const

const regionFilters: Array<'All' | Region> = [
  'All',
  'North America',
  'Europe',
  'India',
]

const SummaryCard = memo(function SummaryCard({
  label,
  tone,
  value,
}: SummaryCardProps): React.JSX.Element {
  return (
    <View
      style={[
        styles.summaryCard,
        tone === 'success' && styles.summaryCardSuccess,
        tone === 'warning' && styles.summaryCardWarning,
      ]}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  )
})

const DealRow = memo(function DealRow({
  deal,
  isSelected,
  onSelect,
}: DealRowProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.rowCard, isSelected && styles.rowCardSelected]}
      onPress={() => onSelect(deal.id)}>
      <View style={styles.rowHeader}>
        <Text style={styles.rowTitle}>{deal.owner}</Text>
        <Text style={styles.rowRegion}>{deal.region}</Text>
      </View>

      <View style={styles.badgeRow}>
        <View
          style={[
            styles.badge,
            deal.pipelineStatus === 'Closed Won' && styles.badgeSuccess,
            deal.pipelineStatus === 'At Risk' && styles.badgeWarning,
          ]}>
          <Text style={styles.badgeText}>{deal.pipelineStatus}</Text>
        </View>
      </View>

      <Text style={styles.rowMeta}>
        Monthly revenue: ${deal.monthlyRevenue.toLocaleString()}
      </Text>
      <Text style={styles.rowMeta}>
        Renewal risk score: {deal.renewalRiskScore}/100
      </Text>
    </Pressable>
  )
})

export default function SalesInsightsBoard(): React.JSX.Element {
  const [selectedRegion, setSelectedRegion] = useState<'All' | Region>('All')
  const [selectedDealId, setSelectedDealId] = useState<string | null>(
    salesInsights[0]?.id ?? null,
  )

  const filteredDeals = useMemo(() => {
    return salesInsights.filter(deal => {
      if (selectedRegion === 'All') {
        return true
      }

      return deal.region === selectedRegion
    })
  }, [selectedRegion])

  const revenueSummary = useMemo(() => {
    const totalRevenue = filteredDeals.reduce(
      (sum, deal) => sum + deal.monthlyRevenue,
      0,
    )
    const atRiskDeals = filteredDeals.filter(
      deal => deal.pipelineStatus === 'At Risk',
    ).length
    const averageRiskScore =
      filteredDeals.length === 0
        ? 0
        : Math.round(
            filteredDeals.reduce(
              (sum, deal) => sum + deal.renewalRiskScore,
              0,
            ) / filteredDeals.length,
          )

    return {
      averageRiskScore,
      atRiskDeals,
      totalRevenue,
    }
  }, [filteredDeals])

  const selectedDeal = useMemo(() => {
    return filteredDeals.find(deal => deal.id === selectedDealId) ?? filteredDeals[0]
  }, [filteredDeals, selectedDealId])

  const handleSelectRegion = useCallback((region: 'All' | Region): void => {
    setSelectedRegion(region)
    setSelectedDealId(currentSelectedId => {
      if (region === 'All') {
        return currentSelectedId
      }

      const regionDeals = salesInsights.filter(deal => deal.region === region)
      const isCurrentSelectionValid = regionDeals.some(
        deal => deal.id === currentSelectedId,
      )

      return isCurrentSelectionValid
        ? currentSelectedId
        : regionDeals[0]?.id ?? null
    })
  }, [])

  const handleSelectDeal = useCallback((dealId: string): void => {
    setSelectedDealId(dealId)
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Memoization</Text>
      <Text style={styles.heading}>Sales Insights Board</Text>
      <Text style={styles.description}>
        This screen uses memoization the way production apps usually do it:
        stable handlers, memoized derived data, and memoized child components
        that should not re-render on unrelated state changes.
      </Text>

      <View style={styles.filterRow}>
        {regionFilters.map(region => {
          const isActive = selectedRegion === region

          return (
            <Pressable
              key={region}
              accessibilityRole="button"
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => handleSelectRegion(region)}>
              <Text
                style={[
                  styles.filterChipText,
                  isActive && styles.filterChipTextActive,
                ]}>
                {region}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <View style={styles.summaryRow}>
        <SummaryCard
          label="Monthly revenue"
          tone="success"
          value={`$${revenueSummary.totalRevenue.toLocaleString()}`}
        />
        <SummaryCard
          label="At-risk deals"
          tone="warning"
          value={`${revenueSummary.atRiskDeals}`}
        />
        <SummaryCard
          label="Average risk"
          tone="neutral"
          value={`${revenueSummary.averageRiskScore}`}
        />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Deal pipeline</Text>
        <Text style={styles.sectionText}>
          Press a row to inspect deal details. Because `DealRow` is memoized and
          the `onSelect` callback is stable, only rows whose props change should
          re-render.
        </Text>

        {filteredDeals.map(deal => (
          <DealRow
            key={deal.id}
            deal={deal}
            isSelected={selectedDeal?.id === deal.id}
            onSelect={handleSelectDeal}
          />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Selected deal</Text>
        {selectedDeal ? (
          <>
            <Text style={styles.detailText}>Owner: {selectedDeal.owner}</Text>
            <Text style={styles.detailText}>Region: {selectedDeal.region}</Text>
            <Text style={styles.detailText}>
              Status: {selectedDeal.pipelineStatus}
            </Text>
            <Text style={styles.detailText}>
              Monthly revenue: ${selectedDeal.monthlyRevenue.toLocaleString()}
            </Text>
            <Text style={styles.detailText}>
              Renewal risk score: {selectedDeal.renewalRiskScore}/100
            </Text>
          </>
        ) : (
          <Text style={styles.sectionText}>
            No deals are available for the selected filter.
          </Text>
        )}
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
  summaryRow: {
    marginTop: 10,
  },
  summaryCard: {
    marginTop: 12,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  summaryCardSuccess: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
  },
  summaryCardWarning: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  summaryValue: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionCard: {
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
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
    marginTop: 14,
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
  badge: {
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
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
})
