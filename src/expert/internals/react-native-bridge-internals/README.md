# React Native bridge internals

This folder contains the `React Native bridge internals` topic from `Expert -> Internals`.

## What We Did
- Added an expert-level bridge internals model that explains both the legacy bridge and the New Architecture runtime.
- Added a runtime probe for Hermes, TurboModule proxy availability, and bridgeless state.
- Added a typed pipeline model for legacy and new-architecture execution paths.
- Added a bridge-internals console example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- legacy bridge queue and serialization model
- New Architecture runtime detection
- side-by-side comparison of old bridge stages and new-architecture stages
- interop-layer explanation for mixed migrations
- separation between runtime probing, architecture modeling, and UI

## Current Structure
- `README.md`
- `bridgeContracts.ts`
- `bridgeRuntimeProbe.ts`
- `bridgePipelineModel.ts`
- `01_BridgeInternalsConsole.tsx`
- `PENDING.md`

## Notes
- React Native 0.76 made the New Architecture the default, so bridge internals now need to be taught in both historical and migration terms.
- This topic models the architecture honestly from the app side. Direct tracing inside React Native core C++, scheduler internals, or engine internals is tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `react-native-bridge-internals` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
