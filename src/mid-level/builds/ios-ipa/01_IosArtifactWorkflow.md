# iOS Artifact Workflow

This guide documents the enterprise-style IPA workflow for the current repository state.

## Current Project Reality
- Current shared scheme:
  `ReactNativeCodex`
- Current archive configuration in the scheme:
  `Release`
- Current project is not yet split into dedicated environment-specific iOS schemes.

## IPA Flow
1. Build an archive with Xcode or `xcodebuild archive`
2. Export the archive using export options
3. Produce an `.ipa` for distribution

## Current CLI Pattern
- Archive:
  `xcodebuild -workspace ios/ReactNativeCodex.xcworkspace -scheme ReactNativeCodex -configuration Release -archivePath ios/build/ReactNativeCodex.xcarchive archive`
- Export:
  `xcodebuild -exportArchive -archivePath ios/build/ReactNativeCodex.xcarchive -exportOptionsPlist ios/exportOptions.plist -exportPath ios/build/export`

## Enterprise Expectations
- separate schemes for:
  - development
  - staging
  - production
- xcconfig-based environment injection
- signing identities and provisioning profiles aligned per environment
- export options versioned and reviewed
- IPA generation automated in CI/CD

## Current Repo Alignment
- Environment intent already exists in:
  - `env.contract.ts`
  - `env.dev.ts`
  - `env.staging.ts`
  - `env.production.ts`
- The next real enterprise step is to map those intended iOS scheme names into actual Xcode schemes and build settings.
