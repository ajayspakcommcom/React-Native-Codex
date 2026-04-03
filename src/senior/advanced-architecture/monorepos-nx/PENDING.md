# Monorepos With Nx Pending Items

These are the remaining items if this topic needs to move from an enterprise blueprint into a live Nx migration for the current repository.

## Workspace Migration
- Convert the current repo root into a real Nx workspace instead of keeping the Nx layout as a reference blueprint.
- Move the existing React Native app into `apps/mobile`.
- Re-home shared source code into real Nx libraries with public entrypoints.

## Native Build Integration
- Verify React Native iOS and Android workflows under Nx executors in the migrated workspace.
- Align native build scripts, Metro usage, and release workflows with Nx project targets.
- Validate that existing build documentation still maps cleanly after migration.

## Boundary Enforcement
- Apply real tag rules across migrated apps and libraries.
- Add CI checks for `@nx/enforce-module-boundaries`.
- Define domain tags and ownership rules for future teams and packages.

## CI And Caching
- Add `nx affected` workflows to CI for lint, test, and build.
- Configure remote caching for team-scale enterprise usage.
- Measure actual CI runtime improvements after the migration.

## Current Status
- The topic is implemented as an enterprise-level Nx blueprint.
- A live Nx migration of this repository is still pending.
