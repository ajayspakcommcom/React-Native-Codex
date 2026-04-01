# MMKV

This is the final topic inside `Mid-Level -> Native Features`.

## Focus Areas
- fast local key-value persistence
- synchronous storage reads and writes
- isolated storage domains
- schema versioning and migration safety
- repository-based access patterns
- persisted feature flags and user preferences
- industry-oriented alternative to AsyncStorage

## What We Added
- Installed:
  - `react-native-mmkv`
  - `react-native-nitro-modules`
- Added a domain-based storage registry:
  `storage.ts`
- Added storage contracts and typed defaults:
  `storageContracts.ts`
- Added safe serialization helpers:
  `storageCodecs.ts`
- Added preference repository helpers:
  `preferencesStorage.ts`
- Added a practical persisted-state example:
  `01_PersistedWorkspacePreferences.tsx`

## Current Files
- `README.md`
- `storage.ts`
- `storageContracts.ts`
- `storageCodecs.ts`
- `preferencesStorage.ts`
- `01_PersistedWorkspacePreferences.tsx`

## Architecture Notes
- Separate MMKV instances are used for bootstrap, preferences, and session data.
- Preferences are stored behind a repository API instead of direct screen access.
- Legacy keys from the earlier single-store setup are migrated into the new domain structure.
- The current storage factory is encryption-ready, but real encryption keys should come from secure native key management before sensitive data is persisted.
