# Android APK/AAB Pending Items

These are the remaining items before this topic is fully validated at an enterprise-ready level.

## Pending Validation
- Run and confirm:
  - `assembleDevelopmentRelease`
  - `assembleStagingRelease`
  - `assembleProductionRelease`
  - `bundleProductionRelease`
- Verify that the generated APK and AAB artifacts are created in the expected Gradle output folders.

## Pending Signing Work
- Test real release signing with:
  - `RELEASE_STORE_FILE`
  - `RELEASE_STORE_PASSWORD`
  - `RELEASE_KEY_ALIAS`
  - `RELEASE_KEY_PASSWORD`
- Confirm production release builds no longer rely on debug signing fallback.

## Pending Distribution Readiness
- Confirm the production AAB is acceptable for Play Store delivery.
- Define artifact naming and retention rules for CI/CD.
- Add CI automation for release artifact generation if this project moves beyond local/manual builds.

## Current Status
- Flavor and artifact configuration is implemented.
- Build scripts are added.
- Documentation is added.
- Lint and TypeScript checks passed.
- End-to-end Android artifact execution is still pending.
