# Modular Architecture

This is the first topic inside `Senior -> Advanced Architecture`.

## Focus Areas
- clear feature-module boundaries
- composition root driven assembly
- shared contracts between modules and core services
- dependency injection through an app container
- modules that can evolve independently without collapsing into one giant screen file

## What We Added
- Added a senior-level modular architecture example:
  `01_ModularControlTower.tsx`
- Added shared module contracts:
  `contracts/moduleContract.ts`
  `contracts/operationsDomain.ts`
- Added a composition root container:
  `core/di/appContainer.ts`
- Added module registration:
  `core/navigation/moduleRegistry.ts`
- Added isolated feature modules:
  `modules/workspace/WorkspaceModule.tsx`
  `modules/incidents/IncidentsModule.tsx`

## Current Files
- `README.md`
- `PENDING.md`
- `01_ModularControlTower.tsx`
- `contracts/moduleContract.ts`
- `contracts/operationsDomain.ts`
- `core/di/appContainer.ts`
- `core/navigation/moduleRegistry.ts`
- `modules/workspace/WorkspaceModule.tsx`
- `modules/incidents/IncidentsModule.tsx`

## Implementation Notes
- The example keeps module contracts small and explicit.
- Shared services live in the composition root container instead of being redefined in each feature.
- Modules consume only the dependencies they need through typed interfaces.
- The main shell composes modules but does not own their business logic.
- Remaining scale-up work for a larger enterprise system is tracked in `PENDING.md`.
