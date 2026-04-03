# Fabric renderer

This folder contains the `Fabric renderer` topic from `Expert -> Internals`.

## What We Did
- Added an expert-level Fabric renderer model for the modern React Native rendering pipeline.
- Added a runtime probe for likely Fabric availability in the current New Architecture app.
- Added a typed Fabric pipeline model covering reconciliation, shadow-tree work, layout, commit, mounting, and event handling.
- Added a Fabric renderer console example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- Fabric runtime posture in the current app
- modern rendering pipeline stages
- distinction between Fabric rendering and the old bridge-driven UI mental model
- separation between runtime probing, pipeline modeling, and UI

## Current Structure
- `README.md`
- `fabricContracts.ts`
- `fabricRuntimeProbe.ts`
- `fabricArchitectureModel.ts`
- `01_FabricRendererConsole.tsx`
- `PENDING.md`

## Notes
- This topic models Fabric from the application side and the known New Architecture runtime signals in this repo.
- Real custom Fabric component implementation, shadow-node debugging, or React Native core telemetry wiring are tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `fabric-renderer` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
