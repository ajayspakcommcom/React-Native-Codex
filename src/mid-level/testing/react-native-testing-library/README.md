# React Native Testing Library

This topic covers behavior-driven UI testing for React Native components.

## Focus Areas
- rendering real components
- querying visible UI
- simulating user interactions
- asserting outcomes users actually experience
- testing valid and invalid flows without coupling to implementation details

## What We Added
- Added shared render helper:
  `../shared/test-utils.tsx`
- Added example tests for:
  `src/beginner/navigation-data/basic-forms-validation/01_SignUpForm.test.tsx`
  `src/mid-level/ui-ux/theming/01_EnterpriseThemeConsole.test.tsx`

## Implementation Notes
- The sign-up form test covers form completion and reset flow.
- The enterprise theme test covers system mode resolution, manual override, and persistence calls.
