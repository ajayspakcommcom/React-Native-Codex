# Navigation & Data

This folder contains the `Navigation & Data` part of the Beginner roadmap.

## What We Did
- Created the `navigation-data` folder inside `src/beginner`.
- Split the section into topic-based subfolders.
- Added one `README.md` file inside each topic folder.
- Added this section summary file as the running log for this folder.
- Installed the real libraries needed for this section:
  `@react-navigation/native`, `@react-navigation/native-stack`,
  `@react-navigation/bottom-tabs`, `react-native-screens`, and `axios`.
- Updated iOS native dependencies with `pod install`.
- Added one practical `.tsx` example file for each topic.

## Current Topics
- React Navigation (stack, tabs)
- Fetch / Axios
- Basic forms & validation

## Current Structure
- `react-navigation`
- `fetch-axios`
- `basic-forms-validation`

## Example Files Added
- `react-navigation/01_AppNavigator.tsx`
  Nested stack and bottom-tab navigation with typed params.
- `fetch-axios/01_UserDirectory.tsx`
  Real loading, error, empty, and success state handling with both `fetch` and `axios`.
- `basic-forms-validation/01_SignUpForm.tsx`
  Typed sign-up form with inline validation and controlled input handling.

## Notes
- This section depends on real libraries and patterns that are not part of the current app baseline yet.
- Proper navigation examples now use installed `@react-navigation/*` packages.
- The fetch example shows both native `fetch` and `axios`.
- The form example stays library-free for beginner clarity while still using typed validation logic.

## Update Rule
- This file is the running summary for the `navigation-data` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
