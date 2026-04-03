import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { motionDurations, motionEasing } from './shared/motionTokens'
import { useAnimatedEntranceSequence } from './shared/useAnimatedEntranceSequence'
import { useReducedMotion } from './shared/useReducedMotion'

interface LaunchStep {
  description: string
  id: string
  label: string
  metric: string
}

const launchSteps: ReadonlyArray<LaunchStep> = [
  {
    id: 'qa',
    label: 'QA Sign-off',
    description: 'Regression suite, smoke flows, and release notes are approved.',
    metric: '96% pass rate',
  },
  {
    id: 'assets',
    label: 'Store Assets',
    description: 'Screenshots, promo copy, and metadata are ready for submission.',
    metric: '12 assets ready',
  },
  {
    id: 'rollout',
    label: 'Rollout Guardrails',
    description: 'Feature flags and rollback path are confirmed before rollout.',
    metric: '3 safety checks',
  },
] as const

export default function AnimatedLaunchControl(): React.JSX.Element {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const reducedMotionEnabled = useReducedMotion()
  const { heroOpacity, heroTranslateY, stepAnimations } =
    useAnimatedEntranceSequence(launchSteps.length, reducedMotionEnabled)
  const progressValue = useRef(new Animated.Value(0)).current
  const ctaScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (reducedMotionEnabled) {
      progressValue.setValue((activeStepIndex + 1) / launchSteps.length)
      return
    }

    Animated.timing(progressValue, {
      toValue: (activeStepIndex + 1) / launchSteps.length,
      duration: motionDurations.standard,
      easing: motionEasing.standard,
      useNativeDriver: false,
    }).start()
  }, [activeStepIndex, progressValue, reducedMotionEnabled])

  const progressWidth = useMemo(
    () =>
      progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      }),
    [progressValue],
  )

  const handleAdvance = (): void => {
    if (reducedMotionEnabled) {
      setActiveStepIndex(currentIndex => (currentIndex + 1) % launchSteps.length)
      return
    }

    Animated.sequence([
      Animated.spring(ctaScale, {
        toValue: 0.96,
        useNativeDriver: true,
      }),
      Animated.spring(ctaScale, {
        toValue: 1,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start()

    setActiveStepIndex(currentIndex => (currentIndex + 1) % launchSteps.length)
  }

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          styles.heroCard,
          {
            opacity: heroOpacity,
            transform: [{ translateY: heroTranslateY }],
          },
        ]}>
        <Text style={styles.eyebrow}>Animated API</Text>
        <Text style={styles.heading}>Launch Control</Text>
        <Text style={styles.description}>
          This screen uses intentional motion for entry sequencing, progress
          feedback, and press interaction instead of decorative animation.
        </Text>
        <Text style={styles.systemNote}>
          Reduced motion: {reducedMotionEnabled ? 'On' : 'Off'}
        </Text>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Text style={styles.progressLabel}>
          Active step: {launchSteps[activeStepIndex]?.label}
        </Text>
      </Animated.View>

      {launchSteps.map((step, index) => {
        const isActive = index === activeStepIndex

        return (
          <Animated.View
            key={step.id}
            style={[
              styles.stepCard,
              isActive && styles.stepCardActive,
              {
                opacity: stepAnimations[index]?.opacity,
                transform: [{ translateY: stepAnimations[index]?.translateY }],
              },
            ]}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>{step.label}</Text>
              <Text style={styles.stepMetric}>{step.metric}</Text>
            </View>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </Animated.View>
        )
      })}

      <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
        <Pressable style={styles.ctaButton} onPress={handleAdvance}>
          <Text style={styles.ctaText}>Advance launch checkpoint</Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#0F172A',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#7DD3FC',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#CBD5E1',
  },
  systemNote: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '700',
    color: '#7DD3FC',
  },
  progressTrack: {
    marginTop: 18,
    height: 10,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#1E293B',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#22C55E',
  },
  progressLabel: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  stepCard: {
    marginTop: 16,
    borderRadius: 22,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stepCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepMetric: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  stepDescription: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#1D4ED8',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
})
