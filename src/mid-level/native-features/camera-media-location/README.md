# Camera, Media, Location

This is the second topic inside `Mid-Level -> Native Features`.

## Focus Areas
- camera capture flow
- media library selection
- current location retrieval
- native package setup
- platform permissions and capability wiring
- separating device-service logic from screen UI

## What We Added
- Installed:
  - `react-native-image-picker`
  - `@react-native-community/geolocation`
- Updated native setup:
  - iOS `Podfile`
  - iOS `Info.plist`
  - Android `AndroidManifest.xml`
- Added shared service files:
  - `deviceMediaService.ts`
  - `locationService.ts`
  - `types.ts`
- Added practical example screens:
  - `01_CameraCaptureCenter.tsx`
  - `02_MediaLibraryPicker.tsx`
  - `03_CurrentLocationPanel.tsx`

## Current Files
- `README.md`
- `deviceMediaService.ts`
- `locationService.ts`
- `types.ts`
- `01_CameraCaptureCenter.tsx`
- `02_MediaLibraryPicker.tsx`
- `03_CurrentLocationPanel.tsx`
