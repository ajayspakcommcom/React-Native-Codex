# Context API

This is the second topic inside `Mid-Level -> State & Architecture`.

## Focus Areas
- typed React context
- provider and consumer pattern
- custom context hook
- shared app-level state
- avoiding prop drilling
- context safety and clear boundaries

## What Matters In This Section
- Context API is useful when multiple components need the same shared state.
- It is a good fit for app-wide concerns such as auth, theme, session, or user preferences.
- It should be used with clear scope instead of becoming a replacement for every kind of state.

## What We Added
- Added a typed context provider:
  `WorkspaceSessionContext.tsx`
- Added a practical shared-state example:
  `01_WorkspaceSessionBoard.tsx`
- The example demonstrates:
  - a typed context value
  - a guarded custom hook with `useWorkspaceSession`
  - multiple consumer components reading and updating the same state
  - project/session preferences shared without prop drilling

## Current Files
- `README.md`
- `WorkspaceSessionContext.tsx`
- `01_WorkspaceSessionBoard.tsx`
