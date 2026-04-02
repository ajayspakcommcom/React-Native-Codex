# Build Environment Workflow

This guide documents the enterprise-style environment strategy introduced for the `Builds` section.

## Current Environment Set
- `development`
- `staging`
- `production`

## What Each Environment Owns
- application display name
- bundle suffix
- API base URL
- analytics environment
- Sentry environment
- iOS scheme name
- Maestro app ID

## Why This Matters
- Android and iOS release flows should not invent environment values independently.
- CI, local builds, monitoring, and E2E automation need the same environment identity.
- Typed config reduces release mistakes caused by duplicated strings.

## How This Would Scale Further
- map environment config into Android `productFlavors`
- map environment config into iOS schemes and xcconfig files
- inject JS-accessible runtime config during builds
- align release signing and artifact naming per environment

## Repo Notes
- The typed source of truth lives in:
  - `env.contract.ts`
  - `env.dev.ts`
  - `env.staging.ts`
  - `env.production.ts`
  - `appEnv.ts`
- The current UI example is:
  - `01_EnvironmentControlCenter.tsx`

## Next Build Topics
- Android APK/AAB
- iOS IPA
