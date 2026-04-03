# Permissions

This is the first topic inside `Mid-Level -> Native Features`.

## Focus Areas
- checking permission status
- requesting permission
- handling blocked/denied/granted flows
- opening system settings when needed
- platform-specific permission mapping
- required native setup on iOS and Android

## What We Added
- Installed `react-native-permissions`
- Updated iOS native setup in `ios/Podfile`
- Added iOS permission description in `ios/ReactNativeCodex/Info.plist`
- Added Android location permissions in `android/app/src/main/AndroidManifest.xml`
- Added a practical permission-flow example:
  `01_LocationPermissionCenter.tsx`
- Added a reusable permission service:
  `permissionService.ts`
- Added a reusable permission hook:
  `usePermission.ts`
- Added shared permission types:
  `types.ts`

## Current Files
- `README.md`
- `01_LocationPermissionCenter.tsx`
- `permissionService.ts`
- `usePermission.ts`
- `types.ts`
