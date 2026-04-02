# TurboModules And Fabric

This is the second topic inside `Senior -> Native Integration`.

## Focus Areas
- codegen-oriented contract design
- TurboModule-ready typed specs
- Fabric component spec boundaries
- enterprise migration strategy from legacy bridging to the new architecture

## What We Added
- Added a senior-level new architecture example:
  `01_NewArchitectureConsole.tsx`
- Added typed TurboModule and Fabric specs:
  `specs/NativeDiagnosticsTurboModule.ts`
  `specs/CommandDeckSurfaceNativeComponent.ts`
- Added an adapter layer:
  `adapters/nativeArchitectureAdapter.ts`
- Added an enterprise migration guide:
  `02_TurboFabricMigrationGuide.md`
- Added a pending file:
  `PENDING.md`

## Current Files
- `README.md`
- `PENDING.md`
- `01_NewArchitectureConsole.tsx`
- `02_TurboFabricMigrationGuide.md`
- `adapters/nativeArchitectureAdapter.ts`
- `specs/NativeDiagnosticsTurboModule.ts`
- `specs/CommandDeckSurfaceNativeComponent.ts`

## Implementation Notes
- The contracts are written in the shape expected by the new architecture.
- The adapter keeps product code from caring whether the capability comes from the legacy bridge or a future TurboModule implementation.
- The migration guide and pending file are explicit because true TurboModule/Fabric adoption also needs native codegen and platform build integration.
