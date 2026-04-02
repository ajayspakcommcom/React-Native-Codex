import { Easing } from 'react-native'

export const motionDurations = {
  immediate: 0,
  quick: 180,
  standard: 280,
  emphasis: 360,
  stagger: 110,
} as const

export const motionEasing = {
  emphasizedEnter: Easing.out(Easing.cubic),
  standard: Easing.out(Easing.ease),
  sharp: Easing.bezier(0.2, 0, 0, 1),
} as const

export const springPresets = {
  gentle: {
    damping: 18,
    stiffness: 170,
  },
  snappy: {
    damping: 16,
    stiffness: 220,
  },
} as const
