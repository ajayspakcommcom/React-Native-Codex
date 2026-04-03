# Hooks In Depth

This is the first topic inside `Mid-Level -> State & Architecture`.

## Focus Areas
- `useEffect`
- `useRef`
- `useReducer`
- custom hooks
- cleanup logic
- dependency handling

## What Matters In This Section
- Mid-Level React Native work depends on stronger understanding of hooks.
- This section should move beyond simple `useState` usage.
- The focus is on real component logic, side effects, reusable behavior, and maintainable hook patterns.

## Planned Implementation
- add practical examples for:
  - `useEffect`
  - `useRef`
  - `useReducer`
  - custom hooks
- use realistic app cases instead of toy examples
- keep the implementation readable while making it more production-aware than the Beginner section

## What We Added
- Added a reusable custom hook:
  `useDebouncedValue.ts`
- Added a practical mid-level example:
  `01_FeedbackInsightsBoard.tsx`
- The example demonstrates:
  - `useReducer` for structured screen state
  - `useEffect` for debounced side effects
  - cleanup with `clearTimeout`
  - `useRef` for stable mutable values and input focus
  - a custom hook for reusable debouncing logic

## Current Files
- `README.md`
- `useDebouncedValue.ts`
- `01_FeedbackInsightsBoard.tsx`
