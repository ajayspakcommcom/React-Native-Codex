# Android APK/AAB

This is the second topic inside `Mid-Level -> Builds`.

## Focus Areas
- environment-based product flavors
- APK and AAB release artifacts
- release signing strategy
- explicit build scripts for CI and local release workflows
- Android build structure aligned with typed environment config

## What We Added
- Updated Gradle flavor and signing setup:
  `android/app/build.gradle`
- Added package scripts for release artifacts:
  `package.json`
- Added Android build workflow documentation:
  `01_AndroidArtifactWorkflow.md`

## Current Files
- `README.md`
- `01_AndroidArtifactWorkflow.md`

## Implementation Notes
- Android now has `development`, `staging`, and `production` product flavors.
- Release signing can use explicit Gradle properties, with debug signing as a local fallback.
- APK scripts are available for development, staging, and production release variants.
- AAB generation is explicitly wired for the production release path.
