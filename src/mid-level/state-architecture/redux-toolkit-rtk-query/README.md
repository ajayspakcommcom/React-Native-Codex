# Redux Toolkit / RTK Query

This is the third topic inside `Mid-Level -> State & Architecture`.

## Focus Areas
- Redux Toolkit store setup
- slices for client state
- RTK Query API service setup
- query hooks
- loading, error, and success states
- separating client UI state from server state

## What Matters In This Section
- Redux Toolkit helps structure predictable client-side state.
- RTK Query helps manage server-side data fetching in a standardized way.
- Together, they fit better in Mid-Level architecture than ad hoc local state for every async workflow.

## What We Added
- Added a Redux slice:
  `feedbackFiltersSlice.ts`
- Added an RTK Query API service:
  `feedbackApi.ts`
- Added store setup and typed hooks:
  `store.ts`
  `hooks.ts`
- Added a practical example screen:
  `01_FeedbackOperationsDashboard.tsx`
- The example demonstrates:
  - Redux Toolkit for filter state
  - RTK Query for server data
  - typed store setup
  - typed query hook usage
  - loading, error, and refetch behavior

## Current Files
- `README.md`
- `feedbackFiltersSlice.ts`
- `feedbackApi.ts`
- `store.ts`
- `hooks.ts`
- `01_FeedbackOperationsDashboard.tsx`
