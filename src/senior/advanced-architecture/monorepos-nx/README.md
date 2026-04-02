# Monorepos With Nx

This is the fourth topic inside `Senior -> Advanced Architecture`.

## Focus Areas
- enterprise Nx workspace layout
- multiple apps and shared libraries in one repo
- dependency boundaries and tagged libraries
- affected-task execution and cache-friendly task orchestration
- scalable team ownership across apps and domains

## What We Added
- Added an Nx monorepo blueprint guide:
  `01_NxWorkspaceBlueprint.md`
- Added an enterprise workspace reference layout:
  `workspace-blueprint/*`

## Current Files
- `README.md`
- `PENDING.md`
- `01_NxWorkspaceBlueprint.md`
- `workspace-blueprint/package.json`
- `workspace-blueprint/nx.json`
- `workspace-blueprint/tsconfig.base.json`
- `workspace-blueprint/apps/mobile/project.json`
- `workspace-blueprint/apps/ops-console/project.json`
- `workspace-blueprint/libs/shared/ui/project.json`
- `workspace-blueprint/libs/shared/types/project.json`
- `workspace-blueprint/libs/mobile/feature-release-control/project.json`
- `workspace-blueprint/eslint.config.mjs`

## Implementation Notes
- This is a blueprint for an enterprise Nx migration or greenfield setup.
- It intentionally does not convert the current repo root into a live Nx workspace yet.
- The example shows how React Native can live beside other apps and shared packages under Nx governance.
- Remaining live-migration and rollout work is tracked in `PENDING.md`.
