# Metro Workflow

This file explains how Metro works in this React Native project.

## What Metro is

Metro is the JavaScript bundler and development server used by React Native.

In this project, Metro:
- starts a local dev server
- watches your files for changes
- rebuilds the JavaScript bundle when code changes
- sends the updated bundle to the simulator or device

## Main command in this project

To start Metro:

```bash
npm start
```

This runs:

```bash
react-native start
```

from the `package.json` scripts.

## How Metro fits into the run flow

Typical iOS flow:

```bash
npm start
npm run ios
```

Typical Android flow:

```bash
npm start
npm run android
```

What happens:
- Metro starts on port `8081`
- the app launches on the simulator or emulator
- the native app connects to Metro
- Metro serves the JavaScript bundle to the app

## Fast refresh

When Metro is running:
- saving a file usually refreshes the app automatically
- UI changes can appear without rebuilding the whole native app
- this makes normal development much faster

## When you need to restart Metro

Restart Metro when:
- the app is not picking up code changes
- the bundle crashes unexpectedly
- a package was installed or removed
- a cache issue is suspected
- the simulator cannot connect to the development server

## Resetting the Metro cache

Use this when Metro behaves incorrectly or keeps old state:

```bash
npx react-native start --reset-cache
```

or stop the current server and run:

```bash
npm start -- --reset-cache
```

## Common Metro commands for this repository

Start Metro:

```bash
npm start
```

Run the iOS app:

```bash
npm run ios
```

Run the Android app:

```bash
npm run android
```

Lint the code:

```bash
npm run lint
```

Run tests:

```bash
npm test -- --runInBand
```

## Common Metro problems

### 1. App cannot connect to Metro

Possible causes:
- Metro is not running
- port `8081` is already used by another process
- simulator or emulator is in a bad state

First checks:

```bash
npm start
```

Then rerun the app:

```bash
npm run ios
```

or

```bash
npm run android
```

### 2. Changes do not appear in the app

Possible causes:
- Fast refresh failed
- Metro cache is stale
- the app is still using an old bundle

Fix:

```bash
npx react-native start --reset-cache
```

Then rerun the app if needed.

### 3. New dependency causes unexpected bundling issues

Possible causes:
- package install was incomplete
- pods were not updated on iOS
- Metro still has the old dependency graph cached

Fix sequence:

```bash
npm install
cd ios && pod install && cd ..
npx react-native start --reset-cache
```

## What Metro does not do

Metro does not:
- replace native iOS or Android build tools
- install pods or Gradle dependencies
- manage git
- replace debugging tools

Metro is the JavaScript side of the development workflow, not the full native build system.

## Project-specific note

This repository is a bare React Native project, so Metro is the real tool to learn here.
Expo DevTools is not the main workflow for this codebase.
