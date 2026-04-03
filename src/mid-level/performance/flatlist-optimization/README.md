# FlatList Optimization

This is the second topic inside `Mid-Level -> Performance`.

## Focus Areas
- stable `renderItem` and `keyExtractor`
- `getItemLayout` for fixed-height rows
- window and batch tuning
- row memoization for large lists
- isolating list state from unrelated parent updates
- measuring render cost with React `Profiler`

## What We Added
- Added a production-style list example:
  `01_OrderOperationsQueue.tsx`

## Current Files
- `README.md`
- `01_OrderOperationsQueue.tsx`

## Implementation Notes
- The list uses `React.memo` for row rendering.
- `renderItem`, `keyExtractor`, and `getItemLayout` are stable.
- Unrelated editor state is colocated outside the list section to avoid typing in one panel causing the entire list to work harder.
- React `Profiler` samples are surfaced in the screen so performance work can be measured instead of guessed.
