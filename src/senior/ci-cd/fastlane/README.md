# Fastlane

This folder contains the `Fastlane` topic from `Senior -> CI/CD`.

## What We Did
- Added an enterprise-style Fastlane foundation for this repository.
- Added root Fastlane files:
- `fastlane/Appfile`
- `fastlane/Fastfile`
- `fastlane/Matchfile`
- `fastlane/.env.example`
- Updated the root `Gemfile` to include Fastlane tooling.
- Added this topic summary file and a pending tracker.

## What This Covers
- Android release lanes aligned to the existing Gradle flavor setup.
- iOS archive/export lane structure for IPA generation.
- Match-based signing management pattern for iOS.
- Environment-variable driven credential handling.
- Separation between repository-owned automation and external signing/store credentials.

## Current Lanes
- `android staging_apk`
- `android production_aab`
- `ios build_ipa`

## Current Structure
- `README.md`
- `01_EnterpriseFastlaneWorkflow.md`
- `PENDING.md`

## Notes
- This topic is implemented as real Fastlane configuration plus workflow documentation.
- Anything that depends on live Apple or Google credentials, external signing repositories, or store-provider access is tracked in `PENDING.md` instead of being treated as complete.

## Update Rule
- This file is the running summary for the `fastlane` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
