# iOS IPA Pending Items

These are the remaining items before this topic is fully validated at an enterprise-ready level.

## Pending Xcode Structure
- Create dedicated iOS schemes for:
  - `ReactNativeCodex-Dev`
  - `ReactNativeCodex-Staging`
  - `ReactNativeCodex`
- Introduce xcconfig files to separate environment-specific bundle IDs, display names, and service values.

## Pending Signing Work
- Configure real Apple signing identities.
- Configure provisioning profiles per environment and release target.
- Add a versioned `exportOptions.plist` strategy for IPA export.

## Pending Artifact Validation
- Run a real archive step with `xcodebuild archive`.
- Run a real export step with `xcodebuild -exportArchive`.
- Confirm the `.ipa` is generated successfully from the current release setup.

## Pending Distribution Readiness
- Define TestFlight vs production export workflow.
- Add CI automation for archive and export.
- Align scheme naming with the typed environment config source of truth.

## Current Status
- The current project has one shared iOS scheme and a Release archive path.
- IPA workflow documentation is added.
- Full enterprise iOS scheme/signing/export validation is still pending.
