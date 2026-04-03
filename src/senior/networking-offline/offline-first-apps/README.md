# Offline-First Apps

This is the second topic inside `Senior -> Networking & Offline`.

## Focus Areas
- local-first reads and writes
- persisted mutation queue
- explicit sync status and unsynced change visibility
- separation between local store, repository, and sync coordination

## What We Added
- Added offline-first contracts:
  `offlineContracts.ts`
- Added persisted local store:
  `offlineStore.ts`
- Added sync coordinator:
  `syncCoordinator.ts`
- Added local-first repository:
  `offlineRepository.ts`
- Added a senior console example:
  `01_OfflineFirstOperationsBoard.tsx`

## Current Files
- `README.md`
- `offlineContracts.ts`
- `offlineStore.ts`
- `syncCoordinator.ts`
- `offlineRepository.ts`
- `01_OfflineFirstOperationsBoard.tsx`

## Implementation Notes
- The example writes locally first, then synchronizes queued mutations when the network is available.
- Sync orchestration is explicit, including unsynced change count and last-sync timestamps.
- Product screens consume the repository instead of owning queue logic directly.
