# Sync Strategies

This is the third topic inside `Senior -> Networking & Offline`.

## Focus Areas
- explicit sync checkpoints
- push and pull phase separation
- conflict resolution policy
- sync result visibility and auditability
- strategy-driven synchronization instead of ad hoc refresh logic

## What We Added
- Added sync contracts:
  `syncContracts.ts`
- Added checkpoint and conflict handling:
  `syncCheckpointStore.ts`
  `conflictResolver.ts`
- Added an enterprise sync engine:
  `syncEngine.ts`
- Added a senior console example:
  `01_SyncStrategyConsole.tsx`

## Current Files
- `README.md`
- `syncContracts.ts`
- `syncCheckpointStore.ts`
- `conflictResolver.ts`
- `syncEngine.ts`
- `01_SyncStrategyConsole.tsx`

## Implementation Notes
- The example models push, pull, conflict resolution, and checkpoint advancement separately.
- Conflict policy is explicit and reviewable instead of being buried in update code paths.
- The console shows what changed, what conflicted, and which checkpoint was advanced.
