# Nx Workspace Blueprint

This guide shows how an enterprise React Native codebase is typically organized with `Nx`.

## Why Nx At Enterprise Level
- project graph visibility
- affected-task execution for CI efficiency
- cache-aware task orchestration
- module-boundary enforcement
- consistent multi-app and multi-library governance

## Example Workspace Shape
```text
workspace/
  apps/
    mobile/
    ops-console/
  libs/
    shared/
      ui/
      types/
    mobile/
      feature-release-control/
```

## App Layer
- `apps/mobile`
  - the React Native application
  - depends on shared UI, types, and mobile feature libraries
- `apps/ops-console`
  - a second app, such as a web operations console or internal tooling app
  - can share contracts and design tokens with mobile

## Library Layer
- `libs/shared/ui`
  - design-system components and tokens shared across apps
- `libs/shared/types`
  - canonical contracts and domain models
- `libs/mobile/feature-release-control`
  - feature-specific mobile logic isolated from the app shell

## Enterprise Rules
- apps should depend on libraries, not on files inside other apps
- libraries should expose narrow public entrypoints
- tagged dependency rules should prevent invalid cross-domain imports
- CI should use `nx affected` to run only the builds/tests that matter

## Why This Repo Uses A Blueprint Instead Of A Full Root Migration
- converting a live React Native repo to Nx is a structural change, not a small topic example
- a safe migration requires moving the root project, scripts, config, and native workflows carefully
- this blueprint keeps the current project stable while documenting the real enterprise target shape
