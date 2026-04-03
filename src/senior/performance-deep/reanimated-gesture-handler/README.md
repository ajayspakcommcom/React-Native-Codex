# Reanimated 2+ And Gesture Handler

This is the first topic inside `Senior -> Performance (Deep)`.

## Focus Areas
- advanced UI-thread animation patterns
- gesture-driven interactions
- smoother interaction orchestration than JS-thread-only animation flows
- practical architecture for high-frequency interactive surfaces

## What We Added
- Added a senior-level interaction surface example:
  `01_WorkspaceCommandDeck.tsx`

## Current Files
- `README.md`
- `01_WorkspaceCommandDeck.tsx`

## Implementation Notes
- The example uses a gesture-driven command deck with snap points, UI-thread animation, and minimal JS synchronization.
- It demonstrates the kind of interaction architecture used for high-frequency production surfaces where dragging and snapping should stay smooth under load.
