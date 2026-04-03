# Certificate pinning

This folder contains the `Certificate pinning` topic from `Senior -> Security`.

## What We Did
- Added enterprise-style public-key pinning using `react-native-ssl-public-key-pinning`.
- Added typed pinning contracts and a profile model for pinned domains.
- Added a pinning service that owns runtime enable/disable logic and error-state handling.
- Added a certificate-pinning control-center example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- runtime public-key pinning initialization
- per-domain pinning policy with backup hashes
- pinning error event capture
- profile-driven enable/disable orchestration
- separation between pinning policy and screen logic

## Current Structure
- `README.md`
- `pinningContracts.ts`
- `pinningProfiles.ts`
- `certificatePinningService.ts`
- `01_CertificatePinningControlCenter.tsx`
- `PENDING.md`

## Notes
- This topic uses `react-native-ssl-public-key-pinning`, which uses OkHttp `CertificatePinner` on Android and TrustKit on iOS.
- The example profile intentionally uses placeholder hashes because production hashes must come from your real certificate/public-key chain and should not be invented in repo code.
- The real certificate extraction, rotation policy, and iOS native installation follow-up are tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `certificate-pinning` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
