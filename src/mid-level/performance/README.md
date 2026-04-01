# Performance

This folder contains the `Performance` part of the Mid-Level roadmap.

## What We Did
- Created the `performance` folder inside `src/mid-level`.
- Started this section one topic at a time.
- Created the first topic folder: `memoization`.
- Created the second topic folder: `flatlist-optimization`.
- Created the third topic folder: `avoid-unnecessary-re-renders`.
- Added a support folder: `profiling-workflow`.
- Added this section summary file as the running log for this folder.

## Current Topics
- Memoization
- FlatList optimization
- Avoid unnecessary re-renders

## Current Structure
- `memoization`
- `flatlist-optimization`
- `avoid-unnecessary-re-renders`
- `profiling-workflow`

## Notes
- Performance work should focus on measured improvements, not random optimization.
- Memoization should be used where it reduces real render cost or stabilizes props passed to expensive child components.
- This section now includes both code examples and a profiling workflow so improvements can be verified with actual measurements.

## Update Rule
- This file is the running summary for the `performance` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
