# Native Modules

This is the first topic inside `Senior -> Native Integration`.

## Focus Areas
- typed JS contracts for native capabilities
- native implementation boundaries in Kotlin and Swift
- wrapper-based JS consumption instead of direct `NativeModules` usage everywhere
- realistic enterprise capability design instead of a toy math example

## What We Added
- Added a native-runtime diagnostics contract and wrapper:
  `contracts.ts`
  `NativeRuntimeBridge.ts`
- Added a senior consumer screen:
  `01_RuntimeDiagnosticsConsole.tsx`
- Added native platform implementations:
  `android/app/src/main/java/com/reactnativecodex/nativeintegration/*`
  `ios/ReactNativeCodex/RuntimeDiagnosticsModule.swift`
  `ios/ReactNativeCodex/RuntimeDiagnosticsModuleBridge.m`
- Added a pending file for native build validation:
  `PENDING.md`

## Current Files
- `README.md`
- `PENDING.md`
- `contracts.ts`
- `NativeRuntimeBridge.ts`
- `01_RuntimeDiagnosticsConsole.tsx`

## Implementation Notes
- JS consumers go through the typed wrapper instead of depending directly on `NativeModules`.
- Android uses a manually registered `ReactPackage`.
- iOS uses a Swift native module exposed through an Objective-C bridge file.
- Android Kotlin compilation has been verified for the custom package.
- Remaining iOS build and runtime verification stays tracked separately in `PENDING.md`.
