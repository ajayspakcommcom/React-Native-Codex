# OTA Updates Pending

These items are intentionally tracked as pending because they require live provider setup, native integration changes, or secret-backed release infrastructure.

## Pending Rollout Work
- Choose and finalize the live OTA provider. The modern recommended target here is `expo-updates` with EAS Update, but a self-hosted update service is also possible.
- Install and configure Expo modules support for this bare React Native app if EAS Update is selected.
- Install and configure `expo-updates` in the native Android and iOS projects.
- Update `metro.config.js` and `babel.config.js` to the Expo-compatible setup required for `expo-updates`.
- Add the native Android and iOS integration changes required for release-bundle loading through `expo-updates`.
- Create the real EAS project and configure update channels, branches, runtime versioning, and code signing policy.
- Add the actual OTA publish pipeline into CI once the team decides how releases and updates should be promoted.
- Verify OTA behavior end to end on release builds for:
- foreground update checks
- background fetch/download policy
- critical update handling
- rollback and recovery behavior
- Add analytics and observability for update adoption, failure rate, rollback events, and manifest health.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on provider choice, Expo/EAS project ownership, native setup changes, release builds, and real account credentials.
