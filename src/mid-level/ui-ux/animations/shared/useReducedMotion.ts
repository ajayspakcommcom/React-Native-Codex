import { AccessibilityInfo } from 'react-native'
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false)

  useEffect(() => {
    let isMounted = true

    AccessibilityInfo.isReduceMotionEnabled()
      .then(isEnabled => {
        if (isMounted) {
          setIsReduceMotionEnabled(isEnabled)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsReduceMotionEnabled(false)
        }
      })

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduceMotionEnabled,
    )

    return () => {
      isMounted = false
      subscription.remove()
    }
  }, [])

  return isReduceMotionEnabled
}
