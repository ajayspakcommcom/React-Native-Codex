import { Animated } from 'react-native'
import { useEffect, useRef } from 'react'

import { motionDurations, motionEasing } from './motionTokens'

interface StepAnimation {
  opacity: Animated.Value
  translateY: Animated.Value
}

export function useAnimatedEntranceSequence(
  itemCount: number,
  reducedMotionEnabled: boolean,
): {
  heroOpacity: Animated.Value
  heroTranslateY: Animated.Value
  stepAnimations: StepAnimation[]
} {
  const heroOpacity = useRef(new Animated.Value(reducedMotionEnabled ? 1 : 0)).current
  const heroTranslateY = useRef(
    new Animated.Value(reducedMotionEnabled ? 0 : 18),
  ).current
  const stepAnimations = useRef(
    Array.from({ length: itemCount }, () => ({
      opacity: new Animated.Value(reducedMotionEnabled ? 1 : 0),
      translateY: new Animated.Value(reducedMotionEnabled ? 0 : 22),
    })),
  ).current

  useEffect(() => {
    if (reducedMotionEnabled) {
      heroOpacity.setValue(1)
      heroTranslateY.setValue(0)
      stepAnimations.forEach(stepAnimation => {
        stepAnimation.opacity.setValue(1)
        stepAnimation.translateY.setValue(0)
      })
      return
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: motionDurations.emphasis,
          easing: motionEasing.emphasizedEnter,
          useNativeDriver: true,
        }),
        Animated.timing(heroTranslateY, {
          toValue: 0,
          duration: motionDurations.emphasis,
          easing: motionEasing.emphasizedEnter,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        motionDurations.stagger,
        stepAnimations.map(stepAnimation =>
          Animated.parallel([
            Animated.timing(stepAnimation.opacity, {
              toValue: 1,
              duration: motionDurations.standard,
              easing: motionEasing.emphasizedEnter,
              useNativeDriver: true,
            }),
            Animated.timing(stepAnimation.translateY, {
              toValue: 0,
              duration: motionDurations.standard,
              easing: motionEasing.emphasizedEnter,
              useNativeDriver: true,
            }),
          ]),
        ),
      ),
    ]).start()
  }, [
    heroOpacity,
    heroTranslateY,
    reducedMotionEnabled,
    stepAnimations,
  ])

  return {
    heroOpacity,
    heroTranslateY,
    stepAnimations,
  }
}
