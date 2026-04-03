# Background Tasks

This is the third topic inside `Senior -> Native Integration`.

## Focus Areas
- enterprise background task orchestration
- clear distinction between background and foreground execution paths
- retry and sync policy modeling
- platform-aware constraints and rollout honesty

## What We Added
- Added a shared orchestration contract:
  `taskContracts.ts`
- Added a background task coordinator and demo:
  `background/backgroundTaskCoordinator.ts`
  `01_BackgroundSyncControlCenter.tsx`
- Added a foreground task coordinator and demo:
  `foreground/foregroundTaskCoordinator.ts`
  `02_ForegroundTaskConsole.tsx`
- Added a pending file:
  `PENDING.md`

## Current Files
- `README.md`
- `PENDING.md`
- `taskContracts.ts`
- `background/backgroundTaskCoordinator.ts`
- `foreground/foregroundTaskCoordinator.ts`
- `01_BackgroundSyncControlCenter.tsx`
- `02_ForegroundTaskConsole.tsx`

## Implementation Notes
- Background work is modeled around constrained, deferred, retry-aware execution.
- Foreground work is modeled around user-visible progress, immediate feedback, and cancellation-safe orchestration.
- Real native scheduler rollout remains tracked in `PENDING.md` so the repo stays honest about what is architectural versus what is platform-verified.
