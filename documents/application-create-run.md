# Application Create and Run

This file records the steps used to create and run this bare React Native TypeScript project.

## 1. Checked the workspace before scaffolding
- Verified the current repository contents.
- Confirmed the repo did not already contain an existing React Native app.
- Confirmed the folder was safe to use for project setup.

## 2. Checked required tooling
- Checked Node.js version.
- Checked npm version.
- Checked the React Native Community CLI init command and available options.

Commands used:

```bash
node -v
npm -v
npx @react-native-community/cli@latest init --help
```

## 3. Attempted to scaffold directly in the repository root
- Tried to create the app directly in the current folder using the React Native Community CLI.
- The CLI failed because targeting the current directory with `--directory .` did not work correctly in this case.

Attempted command:

```bash
npx @react-native-community/cli@latest init ReactNativeCodex --directory . --skip-git-init --pm npm --install-pods false
```

## 4. Used a temporary folder to generate the app
- Created the app in a temporary folder named `.rn-init-temp`.
- Skipped git initialization because the repository already had a `.git` folder.
- Used npm as the package manager.
- Skipped pod installation during init so native setup could be controlled separately.

Command used:

```bash
npx @react-native-community/cli@latest init ReactNativeCodex --directory .rn-init-temp --skip-git-init --pm npm --install-pods false
```

## 5. Moved the generated project into the repository root
- After the app was created successfully in `.rn-init-temp`, copied all generated files into the current project root.
- Removed the temporary generation folder after the merge.

Command used:

```bash
rsync -a .rn-init-temp/ ./ && rm -rf .rn-init-temp
```

## 6. Verified the generated project structure
- Confirmed the following project files were present:
- `App.tsx`
- `package.json`
- `tsconfig.json`
- `android/`
- `ios/`
- `index.js`
- `metro.config.js`
- `jest.config.js`

## 7. Verified JavaScript and TypeScript setup
- Ran lint on the generated app.
- Ran the default Jest test suite.
- Confirmed both commands passed successfully.

Commands used:

```bash
npm run lint
npm test -- --runInBand
```

## 8. Checked available runtime targets
- Checked for available iOS simulators.
- Checked whether Android devices or emulators were connected.
- Checked whether CocoaPods was available.
- Checked the installed Xcode version.

Commands used:

```bash
xcrun simctl list devices available
adb devices
which pod && pod --version
xcodebuild -version
```

## 9. Installed iOS native dependencies
- Confirmed the `ios/Pods` folder was missing.
- Ran CocoaPods installation inside the `ios` directory.
- Generated the Xcode workspace and installed all required pods.

Command used:

```bash
cd ios
pod install
cd ..
```

## 10. Started the Metro bundler
- Started Metro for the React Native app on port `8081`.

Command used:

```bash
npm start
```

## 11. Ran the app on iOS simulator
- Found that `iPhone 15 Pro` was already booted.
- Used the React Native CLI to build and run the app on that simulator.
- The app built successfully, installed, and launched successfully.

Command used:

```bash
npx react-native run-ios --simulator "iPhone 15 Pro"
```

## 12. Android run status
- `adb devices` returned no attached Android emulator or device at the time.
- Because of that, the app was only run on iOS during this setup session.

## 13. Final result
- A bare React Native TypeScript project was created successfully.
- The app was linted and tested successfully.
- The iOS native dependencies were installed successfully.
- The app was launched successfully on the iOS simulator.

## Main commands summary

```bash
node -v
npm -v
npx @react-native-community/cli@latest init --help
npx @react-native-community/cli@latest init ReactNativeCodex --directory .rn-init-temp --skip-git-init --pm npm --install-pods false
rsync -a .rn-init-temp/ ./ && rm -rf .rn-init-temp
npm run lint
npm test -- --runInBand
xcrun simctl list devices available
adb devices
cd ios && pod install && cd ..
npm start
npx react-native run-ios --simulator "iPhone 15 Pro"
```

## Notes
- A Ruby version warning appeared in the shell output during several commands:
  `Unknown ruby interpreter version (do not know how to handle): >=2.6.10.`
- This warning did not block project creation, linting, testing, pod installation, or app launch.
