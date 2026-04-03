# Enterprise Fastlane Workflow

This topic adds a release-automation layer that sits on top of the build structure already present in the repository.

## Why Fastlane Is Used Here
- It gives Android and iOS release automation a single controlled entrypoint.
- It keeps secrets out of the repository by relying on environment variables.
- It makes local, CI, and release engineer workflows use the same lanes instead of ad hoc shell commands.

## Android Lanes

### `staging_apk`
- Cleans the Android project.
- Builds the `StagingRelease` APK using the existing flavor setup.
- Accepts release signing values through environment variables when they are available.
- Fits QA and internal distribution workflows.

### `production_aab`
- Cleans the Android project.
- Builds the `ProductionRelease` AAB for Play Store delivery.
- Enforces Android signing variables when the lane runs in CI.
- Fits production release workflows.

## iOS Lane

### `build_ipa`
- Uses the existing workspace: `ios/ReactNativeCodex.xcworkspace`.
- Builds the `ReactNativeCodex` scheme in `Release`.
- Runs `match`-style signing sync before archive/export.
- Exports an IPA into `artifacts/ios`.
- Supports `export_method` overrides such as `app-store` or `ad-hoc`.

## Secrets and Signing Strategy
- iOS signing is modeled through `fastlane/Matchfile`.
- Android signing is injected via environment variables instead of checked-in secrets.
- The repository includes `fastlane/.env.example` only as a contract, not as a secret store.

## Why This Is Enterprise Style
- Release automation is versioned with the codebase.
- Android and iOS have explicit lanes instead of undocumented manual release steps.
- Credential handling is externalized.
- Signing and artifact generation are separated from the app code.
- Anything not fully verified in this machine or not available without external credentials is tracked in `PENDING.md`.
