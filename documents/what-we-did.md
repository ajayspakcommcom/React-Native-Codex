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
