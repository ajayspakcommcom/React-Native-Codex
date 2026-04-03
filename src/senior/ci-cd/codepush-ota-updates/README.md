# CodePush / OTA updates

This folder contains the `CodePush / OTA updates` topic from `Senior -> CI/CD`.

## What We Did
- Implemented this topic as an enterprise OTA architecture instead of wiring the repository to the retired App Center CodePush path.
- Added a provider-agnostic OTA contract layer.
- Added persistent OTA manifest and status storage with MMKV.
- Added rollout-channel resolution and update coordination logic.
- Added an enterprise OTA control-center example screen.
- Added this topic summary file and a pending tracker for native/provider rollout work.

## What This Covers
- OTA provider abstraction with a current `eas-update` target.
- rollout channel policy for internal, staging, and production builds.
- persisted manifest and status tracking
- update check, download, apply, and dismiss orchestration
- screen logic separated from provider and storage logic

## Current Structure
- `README.md`
- `otaContracts.ts`
- `otaManifestStore.ts`
- `otaChannelResolver.ts`
- `otaUpdateCoordinator.ts`
- `01_EnterpriseOtaControlCenter.tsx`
- `PENDING.md`

## Notes
- As of March 31, 2025, App Center was retired. For a modern enterprise OTA direction in React Native, this repo is modeled around an OTA abstraction that can target Expo `expo-updates` / EAS Update or a self-hosted service instead of hard-coding CodePush.
- The real native/provider rollout work is tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `codepush-ota-updates` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
