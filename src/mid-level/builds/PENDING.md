# Builds Pending Items

This file tracks the remaining work for `Mid-Level -> Builds` before the section is fully validated at an enterprise-ready level.

## Environment Configs
- Map the typed environment source of truth into native platform build systems end-to-end.
- Connect Android flavor values and iOS scheme values to the same verified release pipeline.
- Add CI validation so environment resolution is checked automatically for development, staging, and production.

## Android APK/AAB
- Run and verify:
  - `assembleDevelopmentRelease`
  - `assembleStagingRelease`
  - `assembleProductionRelease`
  - `bundleProductionRelease`
- Confirm the generated APK and AAB artifact output paths.
- Validate real release signing using:
  - `RELEASE_STORE_FILE`
  - `RELEASE_STORE_PASSWORD`
  - `RELEASE_KEY_ALIAS`
  - `RELEASE_KEY_PASSWORD`
- Confirm flavor-specific naming, version suffixes, and `BuildConfig.APP_ENV` values in built artifacts.
- Add CI automation for Android release artifact generation.

## iOS IPA
- Create dedicated iOS schemes for:
  - `ReactNativeCodex-Dev`
  - `ReactNativeCodex-Staging`
  - `ReactNativeCodex`
- Introduce `xcconfig` files for environment-specific iOS settings.
- Configure real Apple signing identities and provisioning profiles.
- Add a versioned `exportOptions.plist` strategy.
- Run and verify:
  - `xcodebuild archive`
  - `xcodebuild -exportArchive`
- Confirm `.ipa` generation from the release pipeline.
- Add CI automation for archive and export workflows.

## Reference Files
- Android details: `android-apk-aab/PENDING.md`
- iOS details: `ios-ipa/PENDING.md`
