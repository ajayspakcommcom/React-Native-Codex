# Modular Architecture Pending Items

These are the remaining items if this topic needs to scale from a strong senior example into a larger enterprise-ready architecture.

## Packaging And Boundaries
- Extract feature modules into package-level boundaries or workspace-level packages.
- Introduce a shared kernel layer for cross-cutting contracts that multiple modules can depend on safely.
- Add explicit public module entrypoints so internal module files are not imported directly from outside.

## Dependency Injection
- Move from an in-file container factory to a more formal composition root with environment-aware registrations.
- Add test-specific and development-specific container overrides.
- Separate interface contracts from implementation registration to make module swapping easier.

## Runtime Composition
- Add navigation-level integration so modules register routes and screens through a central registry.
- Support module-level feature flags so modules can be enabled or disabled without shell rewrites.
- Define lazy-loading or deferred-registration rules for heavier modules.

## Governance
- Add architectural decision records for module boundaries and ownership rules.
- Define code ownership per module for multi-team scaling.
- Add lint or import-boundary enforcement to prevent cross-module leakage.

## Verification
- Add unit and integration tests around the container, module registry, and module contracts.
- Add examples showing how one module can evolve without breaking another.
- Validate the architecture against real app navigation and state orchestration instead of an isolated demo shell.

## Current Status
- The topic is implemented at a strong senior enterprise-style example level.
- The items above are larger-scale evolution steps, not blockers for the current roadmap stage.
