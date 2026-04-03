# Interaction Manager

This is the second topic inside `Senior -> Performance (Deep)`.

## Focus Areas
- deferring non-urgent work until after interactions complete
- keeping the interactive path responsive
- separating critical UI updates from heavy follow-up computation
- practical post-transition scheduling patterns

## What We Added
- Added a senior-level deferred workload example:
  `01_InteractionDeferredConsole.tsx`

## Current Files
- `README.md`
- `01_InteractionDeferredConsole.tsx`

## Implementation Notes
- The example shows how to keep the primary UI immediately responsive while moving summary generation and heavy grouping work behind `InteractionManager.runAfterInteractions`.
