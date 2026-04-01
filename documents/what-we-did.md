# What We Did

## 1. Read the roadmap PDF
- Opened and extracted the contents of `React Native Roadmap Open AI.pdf`.
- Reviewed the document page by page.
- Summarized the roadmap section-wise from Beginner to Expert.

## 2. Saved the roadmap as Markdown
- Created the `documents` folder in the project.
- Added [react-roadmap.md](/Users/spakcomm-ajay/Documents/React-Native-Codex/documents/react-roadmap.md).
- Stored the full roadmap content in a structured Markdown format with headings and bullet points.

## 3. Set up a bare React Native project with TypeScript
- Scaffolded a bare React Native app in this repository.
- Used the React Native Community CLI.
- Generated the standard React Native project structure with:
- Android project
- iOS project
- TypeScript configuration
- Metro configuration
- Jest test setup
- ESLint setup

## 4. Installed project dependencies
- Installed JavaScript dependencies with `npm`.
- Installed iOS native dependencies with CocoaPods in the `ios` folder.
- Generated the Xcode workspace required for iOS builds.

## 5. Verified the generated project
- Ran `npm run lint` successfully.
- Ran `npm test -- --runInBand` successfully.
- Confirmed that the default starter app builds correctly.

## 6. Ran the application
- Checked available runtime targets on the machine.
- Found a booted iOS simulator: `iPhone 15 Pro`.
- Started Metro on port `8081`.
- Built the iOS app with React Native CLI.
- Installed and launched the app successfully on the iOS simulator.

## 7. Current project state
- The project now contains a working bare React Native TypeScript app.
- The roadmap is documented in Markdown for future reference and expansion.
- The iOS app has already been built and launched once successfully.

## 8. Implemented Beginner Foundations
- Created the `src` folder for roadmap-based source organization.
- Created the main roadmap folders:
- `src/beginner`
- `src/mid-level`
- `src/senior`
- `src/expert`
- Created `src/beginner/foundations`.
- Split Foundations into topic folders:
- `javascript-typescript`
- `react-fundamentals`
- `react-native-core`
- `styling`
- `platform-basics`
- Added section and topic `README.md` files.
- Added real-world `.tsx` example files for each Foundations topic except `CLI vs Expo`.
- Refactored the Foundations examples toward a cleaner industry-style beginner structure.
- Added shared beginner foundations files:
- `src/beginner/foundations/shared/theme.ts`
- `src/beginner/foundations/shared/ui.tsx`
- Updated the Foundations summary file to act as the running log for that folder.

## 9. Implemented Beginner Navigation & Data
- Created `src/beginner/navigation-data`.
- Split the section into:
- `react-navigation`
- `fetch-axios`
- `basic-forms-validation`
- Added a section summary file:
- `src/beginner/navigation-data/README.md`
- Added topic `README.md` files inside each subfolder.
- Installed the real packages needed for this section:
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `react-native-screens`
- `axios`
- Ran `pod install` inside the `ios` folder to update native iOS dependencies.
- Added real example files:
- `src/beginner/navigation-data/react-navigation/01_AppNavigator.tsx`
- `src/beginner/navigation-data/fetch-axios/01_UserDirectory.tsx`
- `src/beginner/navigation-data/basic-forms-validation/01_SignUpForm.tsx`
- Implemented:
- stack and tab navigation with typed params
- API data fetching with both `fetch` and `axios`
- loading, error, empty, and success states
- typed sign-up form validation with inline error messages
- Ran `npm run lint` and fixed the navigation JSX issue so the section is clean.

## 10. Implemented Beginner Tools
- Created `src/beginner/tools`.
- Split the section into:
- `metro`
- `debugging`
- `git-basics`
- Added a section summary file:
- `src/beginner/tools/README.md`
- Added topic `README.md` files inside each subfolder.
- Added practical workflow documents for each tools topic:
- `src/beginner/tools/metro/01_MetroWorkflow.md`
- `src/beginner/tools/debugging/01_DebuggingWorkflow.md`
- `src/beginner/tools/git-basics/01_GitWorkflow.md`
- Documented:
- how Metro works in this bare React Native project
- how `npm start` fits into iOS and Android run flow
- cache reset and Metro troubleshooting
- how to debug navigation, API requests, forms, and runtime errors
- how to use logs, the Dev Menu, and dev tools
- the beginner Git workflow used in this repository
- `git status`, `git add`, `git commit`, `git push`, and branch basics
- common beginner Git mistakes to avoid

## 11. Implemented Mid-Level State & Architecture
- Created `src/mid-level/state-architecture`.
- Implemented the full `State & Architecture` section one topic at a time.
- Updated the roadmap direction from:
- `Redux Toolkit / Zustand`
- to:
- `Redux Toolkit / RTK Query`

### Hooks in depth
- Created:
- `src/mid-level/state-architecture/hooks-in-depth/README.md`
- `src/mid-level/state-architecture/hooks-in-depth/useDebouncedValue.ts`
- `src/mid-level/state-architecture/hooks-in-depth/01_FeedbackInsightsBoard.tsx`
- Implemented:
- `useReducer`
- `useEffect`
- `useRef`
- cleanup logic with `clearTimeout`
- a reusable custom hook for debounced values

### Context API
- Created:
- `src/mid-level/state-architecture/context-api/README.md`
- `src/mid-level/state-architecture/context-api/WorkspaceSessionContext.tsx`
- `src/mid-level/state-architecture/context-api/01_WorkspaceSessionBoard.tsx`
- Implemented:
- typed React context
- provider and consumer pattern
- guarded custom hook
- shared session state without prop drilling

### Redux Toolkit / RTK Query
- Installed:
- `@reduxjs/toolkit`
- `react-redux`
- Created:
- `src/mid-level/state-architecture/redux-toolkit-rtk-query/README.md`
- `src/mid-level/state-architecture/redux-toolkit-rtk-query/feedbackFiltersSlice.ts`
- `src/mid-level/state-architecture/redux-toolkit-rtk-query/feedbackApi.ts`
- `src/mid-level/state-architecture/redux-toolkit-rtk-query/store.ts`
- `src/mid-level/state-architecture/redux-toolkit-rtk-query/hooks.ts`
- `src/mid-level/state-architecture/redux-toolkit-rtk-query/01_FeedbackOperationsDashboard.tsx`
- Implemented:
- Redux Toolkit slice for client-side UI state
- RTK Query service for server state
- typed store and typed hooks
- loading, error, success, and refetch flow

### Clean component structure
- Created:
- `src/mid-level/state-architecture/clean-component-structure/README.md`
- `src/mid-level/state-architecture/clean-component-structure/01_DeliveryWorkspace.tsx`
- `src/mid-level/state-architecture/clean-component-structure/components/DeliveryTaskCard.tsx`
- `src/mid-level/state-architecture/clean-component-structure/hooks/useDeliveryTasks.ts`
- `src/mid-level/state-architecture/clean-component-structure/services/taskService.ts`
- `src/mid-level/state-architecture/clean-component-structure/types/task.ts`
- `src/mid-level/state-architecture/clean-component-structure/utils/taskFormatters.ts`
- Implemented:
- feature-level file splitting into components, hooks, services, types, and utils
- smaller screen entry file
- clearer separation of UI, logic, data, and formatting responsibilities

### Validation
- Ran `npm run lint` after each topic implementation.
- Confirmed the full `Mid-Level -> State & Architecture` section is lint clean.

## 12. Implemented Mid-Level Native Features
- Created `src/mid-level/native-features`.
- Split the section into:
- `permissions`
- `camera-media-location`
- `mmkv`
- Added section and topic `README.md` files to track the work.

### Permissions
- Installed:
- `react-native-permissions`
- Updated native configuration:
- `ios/Podfile`
- `ios/ReactNativeCodex/Info.plist`
- `android/app/src/main/AndroidManifest.xml`
- Created:
- `src/mid-level/native-features/permissions/README.md`
- `src/mid-level/native-features/permissions/types.ts`
- `src/mid-level/native-features/permissions/permissionService.ts`
- `src/mid-level/native-features/permissions/usePermission.ts`
- `src/mid-level/native-features/permissions/01_LocationPermissionCenter.tsx`
- Implemented:
- reusable permission service and custom hook
- location permission status check and request flow
- denied, blocked, granted state handling
- app settings recovery flow
- automatic permission refresh after returning from settings

### Camera, Media, Location
- Installed:
- `react-native-image-picker`
- `@react-native-community/geolocation`
- Extended native configuration:
- `ios/Podfile`
- `ios/ReactNativeCodex/Info.plist`
- `android/app/src/main/AndroidManifest.xml`
- Created:
- `src/mid-level/native-features/camera-media-location/README.md`
- `src/mid-level/native-features/camera-media-location/types.ts`
- `src/mid-level/native-features/camera-media-location/deviceMediaService.ts`
- `src/mid-level/native-features/camera-media-location/locationService.ts`
- `src/mid-level/native-features/camera-media-location/01_CameraCaptureCenter.tsx`
- `src/mid-level/native-features/camera-media-location/02_MediaLibraryPicker.tsx`
- `src/mid-level/native-features/camera-media-location/03_CurrentLocationPanel.tsx`
- Implemented:
- camera capture flow with permission gating
- media library image picker flow
- current location retrieval
- shared service wrappers for device media and location APIs

### MMKV
- Installed:
- `react-native-mmkv`
- `react-native-nitro-modules`
- Created:
- `src/mid-level/native-features/mmkv/README.md`
- `src/mid-level/native-features/mmkv/storage.ts`
- `src/mid-level/native-features/mmkv/storageContracts.ts`
- `src/mid-level/native-features/mmkv/storageCodecs.ts`
- `src/mid-level/native-features/mmkv/preferencesStorage.ts`
- `src/mid-level/native-features/mmkv/01_PersistedWorkspacePreferences.tsx`
- Implemented:
- domain-based MMKV storage registry
- schema versioning and migration tracking
- repository-style preferences storage helpers
- safe object serialization utilities
- persisted workspace preferences example screen
- storage health and migration visibility in the demo UI

### Validation
- Ran `pod install` after native package changes.
- Ran `npm run lint` successfully.
- Ran `npx tsc --noEmit` successfully.
- Fixed a TypeScript issue in the navigation example and a promise typing issue in the clean component structure service during final validation.

## Files created so far
- [documents/react-roadmap.md](/Users/spakcomm-ajay/Documents/React-Native-Codex/documents/react-roadmap.md)
- [documents/what-we-did.md](/Users/spakcomm-ajay/Documents/React-Native-Codex/documents/what-we-did.md)
- [documents/application-create-run.md](/Users/spakcomm-ajay/Documents/React-Native-Codex/documents/application-create-run.md)

## Temporary or helper files/folders created during setup
- `.tmp-react-native-roadmap.txt`
- `.codex-pdf-venv`

## Next possible steps
- Replace the default React Native starter screen.
- Start implementing roadmap topics one by one.
- Organize the app into folders such as `src`, `components`, `screens`, and `navigation`.
- Set up Android emulator support and run the app on Android as well.
