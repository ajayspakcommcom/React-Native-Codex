import React, { memo, useMemo, useState } from 'react'
import { type DimensionValue, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { ResponsivePage } from '../shared/ResponsivePage'
import { ResponsiveSplitLayout } from '../shared/ResponsiveSplitLayout'
import { useResponsiveFoundation } from '../shared/useResponsiveFoundation'

type WorkspaceStatus = 'At Risk' | 'Healthy' | 'Needs Review'

interface WorkspacePanel {
  detail: string
  id: string
  metric: string
  title: string
  tone: WorkspaceStatus
}

const workspacePanels: ReadonlyArray<WorkspacePanel> = [
  {
    id: 'launch',
    title: 'Launch readiness',
    metric: '82%',
    detail: 'Cross-platform QA and release notes are in final review.',
    tone: 'Needs Review',
  },
  {
    id: 'support',
    title: 'Support pressure',
    metric: '19 tickets',
    detail: 'Two priority issues are still trending upward in iOS support.',
    tone: 'At Risk',
  },
  {
    id: 'retention',
    title: 'Retention signal',
    metric: '+6.4%',
    detail: 'Recent onboarding flow changes are improving activation quality.',
    tone: 'Healthy',
  },
  {
    id: 'ops',
    title: 'Ops queue',
    metric: '31 live orders',
    detail: 'Warehouse throughput is steady, with one delayed region handoff.',
    tone: 'Healthy',
  },
] as const

const MetricPanel = memo(function MetricPanel({
  panel,
  widthPercent,
}: {
  panel: WorkspacePanel
  widthPercent: DimensionValue
}): React.JSX.Element {
  return (
    <View
      style={[
        styles.metricCard,
        { width: widthPercent },
        panel.tone === 'At Risk' && styles.metricCardRisk,
        panel.tone === 'Healthy' && styles.metricCardHealthy,
      ]}>
      <Text style={styles.metricTitle}>{panel.title}</Text>
      <Text style={styles.metricValue}>{panel.metric}</Text>
      <Text style={styles.metricDetail}>{panel.detail}</Text>
    </View>
  )
})

export default function AdaptiveOperationsWorkspace(): React.JSX.Element {
  const foundation = useResponsiveFoundation()
  const [selectedPanelId, setSelectedPanelId] = useState(workspacePanels[0]?.id ?? '')
  const [workspaceNote, setWorkspaceNote] = useState(
    'Responsive layouts should change composition, spacing, and information density without making the screen feel like a different app.',
  )

  const selectedPanel = useMemo(
    () =>
      workspacePanels.find(panel => panel.id === selectedPanelId) ??
      workspacePanels[0],
    [selectedPanelId],
  )

  const metricCardWidth: DimensionValue = foundation.cardWidth

  return (
    <ResponsivePage backgroundColor="#FFF7ED" foundation={foundation}>
      <Text style={styles.eyebrow}>Responsive layouts</Text>
      <Text style={styles.heading}>Adaptive Operations Workspace</Text>
      <Text style={styles.description}>
        This screen changes layout composition based on width. Compact mode
        stacks content, medium mode increases density, and wide mode splits the
        workspace into parallel columns without breaking the visual system.
      </Text>

      <View
        style={[
          styles.heroCard,
          foundation.isWide && styles.heroCardWide,
          { marginTop: foundation.sectionGap },
        ]}>
        <View style={styles.heroPrimary}>
          <Text style={styles.heroLabel}>Current layout mode</Text>
          <Text style={styles.heroValue}>{foundation.layoutMode}</Text>
          <Text style={styles.heroText}>
            Width: {Math.round(foundation.width)} px | Columns: {foundation.cardColumns}
          </Text>
        </View>
        <View style={styles.heroSecondary}>
          <Text style={styles.heroMiniLabel}>Responsive rule</Text>
          <Text style={styles.heroMiniText}>
            Wide layouts introduce side-by-side panels. Compact layouts keep the
            same content hierarchy, but stack sections vertically.
          </Text>
        </View>
      </View>

      <ResponsiveSplitLayout
        foundation={foundation}
        primary={
          <>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Workspace signals</Text>
              <Text style={styles.sectionText}>
                Cards keep the same visual identity while density and wrapping
                adapt to available space.
              </Text>

              <View
                style={[
                  styles.metricGrid,
                  { marginTop: foundation.sectionGap - 4 },
                ]}>
                {workspacePanels.map(panel => (
                  <Pressable
                    key={panel.id}
                    accessibilityRole="button"
                    onPress={() => setSelectedPanelId(panel.id)}
                    style={styles.metricPressable}>
                    <MetricPanel panel={panel} widthPercent={metricCardWidth} />
                  </Pressable>
                ))}
              </View>
            </View>

            <View
              style={[
                styles.sectionCard,
                { marginTop: foundation.sectionGap },
              ]}>
              <Text style={styles.sectionTitle}>Selected panel detail</Text>
              <Text style={styles.detailTitle}>{selectedPanel?.title}</Text>
              <Text style={styles.detailValue}>{selectedPanel?.metric}</Text>
              <Text style={styles.sectionText}>{selectedPanel?.detail}</Text>
            </View>
          </>
        }
        secondary={
          <>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Workspace note</Text>
              <Text style={styles.sectionText}>
                Keep editing, summaries, and actions usable across widths
                without creating separate screen implementations per device.
              </Text>
              <TextInput
                multiline
                style={[
                  styles.noteInput,
                  foundation.isCompact && styles.noteInputCompact,
                ]}
                value={workspaceNote}
                onChangeText={setWorkspaceNote}
              />
            </View>

            <View
              style={[
                styles.sectionCard,
                { marginTop: foundation.sectionGap },
              ]}>
              <Text style={styles.sectionTitle}>Layout checklist</Text>
              <Text style={styles.checklistText}>
                1. Preserve information hierarchy across widths.
              </Text>
              <Text style={styles.checklistText}>
                2. Change composition before changing the visual language.
              </Text>
              <Text style={styles.checklistText}>
                3. Increase density gradually instead of overcrowding small screens.
              </Text>
              <Text style={styles.checklistText}>
                4. Keep actions reachable and readable in all modes.
              </Text>
            </View>
          </>
        }
      />

      <View style={[styles.designSystemNote, { marginTop: foundation.sectionGap }]}>
        <Text style={styles.designSystemNoteTitle}>Design-system layer</Text>
        <Text style={styles.designSystemNoteText}>
          This screen now reads layout rules from shared responsive tokens,
          foundation hooks, and split-layout primitives instead of embedding
          breakpoints directly into the screen.
        </Text>
      </View>
    </ResponsivePage>
  )
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#C2410C',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#431407',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#7C2D12',
  },
  heroCard: {
    borderRadius: 26,
    padding: 24,
    backgroundColor: '#431407',
  },
  heroCardWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroPrimary: {
    flex: 1,
  },
  heroSecondary: {
    flex: 1,
    marginTop: 18,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#FDBA74',
  },
  heroValue: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: '800',
    color: '#FFEDD5',
  },
  heroText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#FED7AA',
  },
  heroMiniLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#FDBA74',
  },
  heroMiniText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#FED7AA',
  },
  sectionCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#431407',
  },
  sectionText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#7C2D12',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricPressable: {
    width: '100%',
    marginBottom: 12,
  },
  metricCard: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  metricCardRisk: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  metricCardHealthy: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  metricTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#431407',
  },
  metricValue: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: '#9A3412',
  },
  metricDetail: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#7C2D12',
  },
  detailTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '800',
    color: '#431407',
  },
  detailValue: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '800',
    color: '#C2410C',
  },
  noteInput: {
    marginTop: 14,
    minHeight: 180,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FED7AA',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#431407',
    textAlignVertical: 'top',
  },
  noteInputCompact: {
    minHeight: 150,
  },
  checklistText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#7C2D12',
  },
  designSystemNote: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: '#431407',
  },
  designSystemNoteTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#FDBA74',
  },
  designSystemNoteText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#FED7AA',
  },
})
