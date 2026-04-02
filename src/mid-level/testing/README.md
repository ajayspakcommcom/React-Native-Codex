# Testing

This folder contains the `Testing` part of the Mid-Level roadmap.

## What We Did
- Created the `testing` folder inside `src/mid-level`.
- Split the section into:
  `jest`
  `react-native-testing-library`
- Added modern E2E coverage:
  `maestro`
- Added shared test utilities for reusable render patterns.
- Replaced the default low-value sample test with behavior-focused tests against real project screens.

## Current Topics
- Jest
- React Native Testing Library
- Maestro

## Current Structure
- `jest`
- `react-native-testing-library`
- `maestro`
- `shared`

## Notes
- The testing setup focuses on user-visible behavior rather than implementation details.
- Native and animation boundaries are mocked in Jest setup so UI tests stay fast and deterministic.
- Maestro flows in this repo target a stable in-app harness screen with explicit test IDs so E2E coverage is maintainable.

## Update Rule
- This file is the running summary for the `testing` folder.
- Whenever files or tests are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
