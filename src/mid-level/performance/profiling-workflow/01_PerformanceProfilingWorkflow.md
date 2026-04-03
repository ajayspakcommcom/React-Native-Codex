# Performance Profiling Workflow

Use this guide alongside:

- `memoization/01_SalesInsightsBoard.tsx`
- `flatlist-optimization/01_OrderOperationsQueue.tsx`
- `avoid-unnecessary-re-renders/01_WorkspaceSupportConsole.tsx`

## React DevTools Profiler
- Open the app in development mode.
- Open React DevTools Profiler.
- Record one interaction at a time:
  - switching region filters in `01_SalesInsightsBoard.tsx`
  - switching queue status in `01_OrderOperationsQueue.tsx`
  - typing search text or changing priority in `01_WorkspaceSupportConsole.tsx`
- Check which components committed and compare:
  - actual duration
  - base duration
  - commit count
- Confirm that only the intended subtree re-rendered.

## Flipper
- Use Flipper when you want broader React Native runtime visibility.
- Check React DevTools inside Flipper if available in your environment.
- Watch for expensive interactions that align with:
  - large list updates
  - unnecessary parent-to-child churn
  - repeated layout work during list filtering

## What To Measure
- whether item rows re-render when unrelated sibling state changes
- whether filter changes only affect the list rows that actually changed
- whether deferred search keeps typing responsive
- whether transition-based updates feel smoother under heavier filtering
- whether `actualDuration` drops after memoization or render isolation changes

## Industry Pattern
- profile first
- make one focused change
- profile again
- keep only changes that measurably reduce real render work or improve responsiveness

## Repo Notes
- The `flatlist-optimization` example includes profiler samples in the UI for quick feedback.
- The `avoid-unnecessary-re-renders` example also captures profiler samples to make screen-level render isolation visible.
- These examples are meant to be measured, not just read.
