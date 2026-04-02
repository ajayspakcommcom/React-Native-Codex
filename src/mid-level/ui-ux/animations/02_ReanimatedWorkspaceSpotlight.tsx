import React, { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'

import { motionDurations, springPresets } from './shared/motionTokens'
import { useReducedMotion } from './shared/useReducedMotion'

type WorkspaceTone = 'Critical' | 'Growth' | 'Ops'

interface WorkspaceFocus {
  headline: string
  id: string
  metric: string
  summary: string
  tone: WorkspaceTone
}

interface SpotlightCardProps {
  focus: WorkspaceFocus
  index: number
  isActive: boolean
  onPress: (index: number) => void
  reducedMotionEnabled: boolean
}

const workspaceFocuses: ReadonlyArray<WorkspaceFocus> = [
  {
    id: 'release',
    headline: 'Release command center',
    metric: '14 open checks',
    summary: 'Highlight the riskiest release surface with a stronger hero state.',
    tone: 'Critical',
  },
  {
    id: 'growth',
    headline: 'Growth experiment lab',
    metric: '8 launch windows',
    summary: 'Promote high-signal experiments with smoother context switching.',
    tone: 'Growth',
  },
  {
    id: 'ops',
    headline: 'Ops visibility wall',
    metric: '32 live orders',
    summary: 'Keep operational detail panels responsive while priority shifts.',
    tone: 'Ops',
  },
] as const

function SpotlightCard({
  focus,
  index,
  isActive,
  onPress,
  reducedMotionEnabled,
}: SpotlightCardProps): React.JSX.Element {
  const activeProgress = useSharedValue(isActive ? 1 : 0)

  React.useEffect(() => {
    if (reducedMotionEnabled) {
      activeProgress.value = isActive ? 1 : 0
      return
    }

    activeProgress.value = withSpring(isActive ? 1 : 0, {
      ...springPresets.gentle,
    })
  }, [activeProgress, isActive, reducedMotionEnabled])

  const animatedCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(activeProgress.value, [0, 1], [1, 1.03])
    const translateY = interpolate(activeProgress.value, [0, 1], [0, -6])

    return {
      borderColor:
        activeProgress.value > 0.5 ? '#2563EB' : '#E2E8F0',
      transform: [{ scale }, { translateY }],
    }
  })

  return (
    <Pressable accessibilityRole="button" onPress={() => onPress(index)}>
      <Animated.View
        layout={Layout.springify().damping(18).stiffness(170)}
        style={[styles.spotlightCard, animatedCardStyle]}>
        <Text style={styles.spotlightMetric}>{focus.metric}</Text>
        <Text style={styles.spotlightHeadline}>{focus.headline}</Text>
        <Text style={styles.spotlightSummary}>{focus.summary}</Text>
      </Animated.View>
    </Pressable>
  )
}

export default function ReanimatedWorkspaceSpotlight(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelProgress = useSharedValue(1)
  const reducedMotionEnabled = useReducedMotion()

  const activeFocus = useMemo(
    () => workspaceFocuses[activeIndex] ?? workspaceFocuses[0],
    [activeIndex],
  )

  const handleSelectFocus = (index: number): void => {
    panelProgress.value = reducedMotionEnabled ? 1 : 0
    setActiveIndex(index)
    panelProgress.value = reducedMotionEnabled
      ? 1
      : withTiming(1, { duration: motionDurations.standard })
  }

  const animatedPanelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(panelProgress.value, [0, 1], [18, 0])
    const opacity = interpolate(panelProgress.value, [0, 1], [0.2, 1])

    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  const railGesture = Gesture.Pan().activeOffsetX([-14, 14]).onEnd(event => {
    if (event.translationX < -28 && activeIndex < workspaceFocuses.length - 1) {
      runOnJS(handleSelectFocus)(activeIndex + 1)
    }

    if (event.translationX > 28 && activeIndex > 0) {
      runOnJS(handleSelectFocus)(activeIndex - 1)
    }
  })

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.screen}>
        <Text style={styles.eyebrow}>Reanimated</Text>
        <Text style={styles.heading}>Workspace Spotlight</Text>
        <Text style={styles.description}>
          This example uses shared values, animated styles, layout transitions,
          reduced-motion handling, and a gesture rail to shift focus between
          workspace contexts with product-driven motion.
        </Text>
        <Text style={styles.systemNote}>
          Reduced motion: {reducedMotionEnabled ? 'On' : 'Off'}
        </Text>

        <GestureDetector gesture={railGesture}>
          <View>
            {workspaceFocuses.map((focus, index) => (
              <SpotlightCard
                key={focus.id}
              focus={focus}
              index={index}
              isActive={index === activeIndex}
              onPress={handleSelectFocus}
              reducedMotionEnabled={reducedMotionEnabled}
            />
          ))}
          </View>
        </GestureDetector>

        <Animated.View
          entering={FadeInDown.duration(motionDurations.standard)}
          exiting={FadeOutUp.duration(motionDurations.quick)}
          layout={Layout.springify().damping(18).stiffness(170)}
          style={[styles.detailPanel, animatedPanelStyle]}>
          <Text style={styles.detailLabel}>Active workspace direction</Text>
          <Text style={styles.detailHeadline}>{activeFocus.headline}</Text>
          <Text style={styles.detailSummary}>{activeFocus.summary}</Text>

          <View style={styles.detailGrid}>
            <View style={styles.detailMetricCard}>
              <Text style={styles.detailMetricLabel}>Primary metric</Text>
              <Text style={styles.detailMetricValue}>{activeFocus.metric}</Text>
            </View>
            <View style={styles.detailMetricCard}>
              <Text style={styles.detailMetricLabel}>Motion tone</Text>
              <Text style={styles.detailMetricValue}>{activeFocus.tone}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7ED',
  },
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
  systemNote: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
  },
  spotlightCard: {
    marginTop: 16,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  spotlightMetric: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#EA580C',
  },
  spotlightHeadline: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#431407',
  },
  spotlightSummary: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#7C2D12',
  },
  detailPanel: {
    marginTop: 22,
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#431407',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#FDBA74',
  },
  detailHeadline: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: '#FFEDD5',
  },
  detailSummary: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#FED7AA',
  },
  detailGrid: {
    marginTop: 18,
  },
  detailMetricCard: {
    marginTop: 12,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#7C2D12',
  },
  detailMetricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FDBA74',
  },
  detailMetricValue: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
})
