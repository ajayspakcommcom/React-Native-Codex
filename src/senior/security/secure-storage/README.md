# Secure storage

This folder contains the `Secure storage` topic from `Senior -> Security`.

## What We Did
- Added enterprise-style secure storage using `react-native-keychain`.
- Added device-capability probing for biometry, passcode support, and Android security level.
- Added a vault service that separates secure token handling from screen code.
- Added a secure-vault control-center example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- platform-backed Keychain / Keystore storage for sensitive data
- separate storage policies for session, refresh token, and biometric unlock token
- biometric and passcode-aware access control
- device security capability inspection
- clear separation between secure storage logic and UI

## Current Structure
- `README.md`
- `storageContracts.ts`
- `deviceSecurityProbe.ts`
- `secureVaultService.ts`
- `01_SecureVaultControlCenter.tsx`
- `PENDING.md`

## Notes
- This topic uses `react-native-keychain`, which exposes iOS Keychain and Android Keystore backed storage.
- Plain MMKV or AsyncStorage is not used here for secrets.
- Anything that depends on server-issued secret rotation, jailbroken/rooted device policy, or production auth backend coordination is tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `secure-storage` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
