# Builds

This folder contains the `Builds` part of the Mid-Level roadmap.

## What We Did
- Created the `builds` folder inside `src/mid-level`.
- Started this section with `environment-configs`.
- Created the second topic folder: `android-apk-aab`.
- Created the third topic folder: `ios-ipa`.
- Added this section summary file as the running log for this folder.

## Current Topics
- Android APK/AAB
- iOS IPA
- Environment configs

## Current Structure
- `environment-configs`
- `android-apk-aab`
- `ios-ipa`
- `PENDING.md`

## Notes
- Build work in this section should be production-oriented and environment-aware.
- Environment configuration should be centralized and typed so Android and iOS release workflows can consume consistent values.
- Android build setup now includes flavor-based release workflows and explicit APK/AAB scripts.
- iOS IPA work now documents archive/export structure and the current scheme limitations of this repo.
- Remaining release-engineering and validation work is tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `builds` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
