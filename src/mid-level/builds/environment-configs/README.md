# Environment Configs

This is the first topic inside `Mid-Level -> Builds`.

## Focus Areas
- typed environment contract
- dev, staging, and production separation
- one source of truth for app identifiers and service endpoints
- enterprise-style config resolution
- docs and scripts that match real release workflows

## What We Added
- Added typed environment definitions:
  `appEnv.ts`
  `env.contract.ts`
- Added environment-specific values:
  `env.dev.ts`
  `env.staging.ts`
  `env.production.ts`
- Added a runtime environment panel:
  `01_EnvironmentControlCenter.tsx`
- Added build workflow documentation:
  `02_BuildEnvironmentWorkflow.md`

## Current Files
- `README.md`
- `env.contract.ts`
- `env.dev.ts`
- `env.staging.ts`
- `env.production.ts`
- `appEnv.ts`
- `01_EnvironmentControlCenter.tsx`
- `02_BuildEnvironmentWorkflow.md`

## Implementation Notes
- The config layer separates environment values from the consuming screen.
- The environment contract is typed so the build system and app code can agree on required keys.
- This is the foundation that later Android and iOS build topics can plug into.
