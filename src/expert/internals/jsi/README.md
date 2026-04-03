# JSI

This folder contains the `JSI` topic from `Expert -> Internals`.

## What We Did
- Added an expert-level JSI model focused on modern React Native runtime integration.
- Added a runtime probe for Hermes, TurboModule proxy availability, and bridgeless state.
- Added a typed JSI architecture model covering host functions, host objects, TurboModule bindings, and runtime globals.
- Added a JSI internals console example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- runtime-level JSI capability detection
- JSI primitive modeling
- separation between low-level runtime concepts and product-facing UI
- enterprise guidance for hiding JSI behind stable contracts

## Current Structure
- `README.md`
- `jsiContracts.ts`
- `jsiRuntimeProbe.ts`
- `jsiArchitectureModel.ts`
- `01_JsiInternalsConsole.tsx`
- `PENDING.md`

## Notes
- This topic explains JSI from the app architecture side.
- Real native host-object installation, C++ bindings, or custom runtime global setup are tracked in `PENDING.md` because they require deeper native implementation than repository-only JS/TS code can honestly provide.

## Update Rule
- This file is the running summary for the `jsi` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
