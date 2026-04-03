# Avoid Unnecessary Re-renders

This is the third topic inside `Mid-Level -> Performance`.

## Focus Areas
- state colocation
- tree splitting and render isolation
- `useDeferredValue`
- `startTransition`
- keeping heavy panels independent from fast-changing local state

## What We Added
- Added a screen-level render isolation example:
  `01_WorkspaceSupportConsole.tsx`

## Current Files
- `README.md`
- `01_WorkspaceSupportConsole.tsx`

## Implementation Notes
- Search and filter state are kept narrow.
- Draft message state is colocated inside the composer instead of the screen root.
- Expensive filtering runs from a deferred query.
- Transition-based filter changes keep urgent updates responsive while heavy work settles.
