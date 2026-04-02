# Jest

This topic covers the test runner and test environment used in the project.

## Focus Areas
- test runner configuration
- setup file for native mocks
- deterministic component test execution
- keeping low-level test environment concerns out of individual test files

## What We Added
- Added project-level setup:
  `jest.config.js`
  `jest.setup.ts`

## Implementation Notes
- `jest.setup.ts` registers native testing shims for gesture handling and animation.
- This keeps test files focused on behavior instead of per-file mock boilerplate.
