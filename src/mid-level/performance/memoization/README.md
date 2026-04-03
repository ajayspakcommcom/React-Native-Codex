# Memoization

This is the first topic inside `Mid-Level -> Performance`.

## Focus Areas
- `React.memo`
- `useMemo`
- `useCallback`
- stable props and derived values
- reducing avoidable re-renders in real screens

## What We Added
- Added a practical mid-level example:
  `01_SalesInsightsBoard.tsx`

## Current Files
- `README.md`
- `01_SalesInsightsBoard.tsx`

## Implementation Notes
- `React.memo` is used for reusable summary and row components that should not re-render when their props stay the same.
- `useMemo` is used for expensive derived values such as filtered datasets and sales summaries.
- `useCallback` is used to keep handler references stable when they are passed into memoized children.
- This topic intentionally focuses on memoization only. `FlatList` optimization and broader re-render control will be handled in the next topics.
