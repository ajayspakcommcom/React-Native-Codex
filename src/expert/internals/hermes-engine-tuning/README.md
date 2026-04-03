# Hermes engine tuning

This folder contains the `Hermes engine tuning` topic from `Expert -> Internals`.

## What We Did
- Added an expert-level Hermes tuning model aligned to the current repo runtime.
- Added a runtime probe that verifies Hermes-related posture in the current app.
- Added a typed tuning-control model for runtime verification, bundle shape, source maps, memory, profiling, and binary-size considerations.
- Added a Hermes tuning console example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- runtime-level Hermes posture in the current app
- release-focused tuning areas instead of debug-only assumptions
- separation between runtime verification, tuning guidance, and UI

## Current Structure
- `README.md`
- `hermesContracts.ts`
- `hermesRuntimeProbe.ts`
- `hermesTuningModel.ts`
- `01_HermesTuningConsole.tsx`
- `PENDING.md`

## Notes
- Hermes is already enabled in this repo, so this topic is about expert tuning and verification, not initial enablement.
- Engine-level experiments, bytecode artifact comparison, and deeper release profiling follow-up are tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `hermes-engine-tuning` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
