import React, { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'

import { springPresets } from './shared/motionTokens'
import { useReducedMotion } from './shared/useReducedMotion'

interface RailCard {
  headline: string
  id: string
  stat: string
  subtext: string
}

const railCards: ReadonlyArray<RailCard> = [
  {
    id: 'focus',
    headline: 'Focus current launch risk',
    stat: '4 blockers',
    subtext: 'Swipe across the rail to move attention without forcing a hard screen transition.',
  },
  {
    id: 'signals',
    headline: 'Surface live support signals',
    stat: '19 tickets',
    subtext: 'Gesture-driven focus changes are useful for dashboards and control-center style views.',
  },
  {
    id: 'rollout',
    headline: 'Inspect rollout readiness',
    stat: '82% ready',
    subtext: 'This pattern works best when drag, snap, and detail context all feel linked.',
  },
] as const

function GestureRailCard({
  card,
  index,
  activeIndex,
  onPress,
  reducedMotionEnabled,
}: {
  activeIndex: number
  card: RailCard
  index: number
  onPress: (index: number) => void
  reducedMotionEnabled: boolean
}): React.JSX.Element {
  const progress = useSharedValue(index === activeIndex ? 1 : 0)

  React.useEffect(() => {
    progress.value = reducedMotionEnabled
      ? index === activeIndex
        ? 1
        : 0
      : withSpring(index === activeIndex ? 1 : 0, springPresets.snappy)
  }, [activeIndex, index, progress, reducedMotionEnabled])

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.98, 1.02])
    const opacity = interpolate(progress.value, [0, 1], [0.78, 1])

    return {
      opacity,
      transform: [{ scale }],
    }
  })

  return (
    <Pressable accessibilityRole="button" onPress={() => onPress(index)}>
      <Animated.View style={[styles.railCard, animatedStyle]}>
        <Text style={styles.railStat}>{card.stat}</Text>
        <Text style={styles.railHeadline}>{card.headline}</Text>
        <Text style={styles.railSubtext}>{card.subtext}</Text>
      </Animated.View>
    </Pressable>
  )
}

export default function GestureDrivenWorkspaceRail(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const translationX = useSharedValue(0)
  const reducedMotionEnabled = useReducedMotion()

  const activeCard = useMemo(
    () => railCards[activeIndex] ?? railCards[0],
    [activeIndex],
  )

  const railAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }))

  const updateIndex = (nextIndex: number): void => {
    const boundedIndex = Math.max(0, Math.min(nextIndex, railCards.length - 1))
    setActiveIndex(boundedIndex)
  }

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translationX.value = reducedMotionEnabled ? 0 : event.translationX * 0.18
    })
    .onEnd(event => {
      translationX.value = reducedMotionEnabled
        ? 0
        : withSpring(0, springPresets.gentle)

      if (event.translationX < -36) {
        runOnJS(updateIndex)(activeIndex + 1)
      }

      if (event.translationX > 36) {
        runOnJS(updateIndex)(activeIndex - 1)
      }
    })

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.screen}>
        <Text style={styles.eyebrow}>Gesture-driven motion</Text>
        <Text style={styles.heading}>Workspace Rail</Text>
        <Text style={styles.description}>
          This example uses a pan gesture and spring-based snapping to move focus
          across a compact workspace rail. It is the kind of interaction teams
          use in dashboards, ops consoles, and multi-panel control surfaces.
        </Text>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={railAnimatedStyle}>
            {railCards.map((card, index) => (
              <GestureRailCard
                key={card.id}
                activeIndex={activeIndex}
                card={card}
                index={index}
                onPress={updateIndex}
                reducedMotionEnabled={reducedMotionEnabled}
              />
            ))}
          </Animated.View>
        </GestureDetector>

        <View style={styles.detailPanel}>
          <Text style={styles.detailLabel}>Focused card</Text>
          <Text style={styles.detailHeadline}>{activeCard.headline}</Text>
          <Text style={styles.detailText}>{activeCard.subtext}</Text>
          <Text style={styles.detailText}>
            Reduced motion: {reducedMotionEnabled ? 'On' : 'Off'}
          </Text>
        </View>
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
    backgroundColor: '#F0FDF4',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#15803D',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#14532D',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#166534',
  },
  railCard: {
    marginTop: 16,
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  railStat: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#16A34A',
  },
  railHeadline: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#14532D',
  },
  railSubtext: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#166534',
  },
  detailPanel: {
    marginTop: 22,
    borderRadius: 24,
    padding: 22,
    backgroundColor: '#14532D',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#86EFAC',
  },
  detailHeadline: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: '#F0FDF4',
  },
  detailText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#DCFCE7',
  },
})
