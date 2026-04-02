# Animations

This is the first topic inside `Mid-Level -> UI/UX`.

## Focus Areas
- meaningful motion tied to product interactions
- `Animated` API for staged entry, progress, and press feedback
- Reanimated for smoother state-driven motion
- shared motion tokens and reusable hooks
- reduced-motion accessibility support
- gesture-driven interaction patterns
- reusable motion patterns instead of toy animations

## What We Added
- Added an `Animated` API screen:
  `01_AnimatedLaunchControl.tsx`
- Added a Reanimated screen:
  `02_ReanimatedWorkspaceSpotlight.tsx`
- Added a gesture-driven Reanimated screen:
  `03_GestureDrivenWorkspaceRail.tsx`
- Added shared motion utilities:
  `shared/motionTokens.ts`
  `shared/useReducedMotion.ts`
  `shared/useAnimatedEntranceSequence.ts`

## Current Files
- `README.md`
- `01_AnimatedLaunchControl.tsx`
- `02_ReanimatedWorkspaceSpotlight.tsx`
- `03_GestureDrivenWorkspaceRail.tsx`
- `shared/motionTokens.ts`
- `shared/useReducedMotion.ts`
- `shared/useAnimatedEntranceSequence.ts`

## Implementation Notes
- The `Animated` example now uses shared motion tokens and a reusable entrance-sequence hook.
- Reduced-motion accessibility handling is built into both the `Animated` and Reanimated flows.
- The Reanimated examples now include gesture-driven interaction and `GestureHandlerRootView` setup.
- This topic is configured with `react-native-reanimated`, `react-native-worklets`, `react-native-gesture-handler`, and the `react-native-worklets/plugin` Babel plugin.
