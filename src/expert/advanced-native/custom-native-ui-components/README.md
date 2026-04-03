# Custom Native UI Components

This topic models how enterprise React Native apps introduce custom native views when:

- JavaScript composition is not enough
- platform-native rendering or interaction is required
- product code needs a stable JS interface instead of direct native coupling

## What This Implementation Includes
- typed JS-side contracts for a native status surface
- a wrapper component that isolates product code from raw native registration details
- an Android native view implementation
- iOS native view implementation files
- a real screen example that consumes the component through the wrapper
- pending tracking for deeper rollout and verification work

## Files
- `nativeStatusSurfaceContracts.ts`
- `NativeStatusSurface.tsx`
- `01_NativeStatusSurfaceConsole.tsx`
- `PENDING.md`

## Native Files
- Android:
- `android/app/src/main/java/com/reactnativecodex/advancednative/OperationsStatusSurfaceView.kt`
- `android/app/src/main/java/com/reactnativecodex/advancednative/OperationsStatusSurfaceManager.kt`
- `android/app/src/main/java/com/reactnativecodex/advancednative/OperationsStatusSurfacePackage.kt`
- iOS:
- `ios/ReactNativeCodex/OperationsStatusSurfaceView.swift`
- `ios/ReactNativeCodex/OperationsStatusSurfaceViewManager.swift`
- `ios/ReactNativeCodex/OperationsStatusSurfaceViewManagerBridge.m`

## Enterprise Notes
- Product code should depend on the wrapper, not `requireNativeComponent` directly.
- Native view props should stay narrow, typed, and stable.
- Rollout work that depends on Xcode/device verification or deeper Fabric migration is tracked in `PENDING.md`.
