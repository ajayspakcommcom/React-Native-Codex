# Dependency Injection Patterns Pending Items

These are the remaining items if this topic needs to grow from a strong senior example into a larger enterprise-ready DI platform.

## Container Evolution
- Split dependency registration by domain so large apps do not keep one growing registration file.
- Support environment-aware registration tables for development, staging, production, and test.
- Add lazy dependency registration for heavier services that should not initialize eagerly.

## Token Strategy
- Introduce stable service tokens or identifiers for larger registries.
- Add stronger collision-proof registration rules for multi-team module onboarding.
- Define public DI entrypoints so features do not reach into container internals.

## Overrides And Testing
- Add dedicated test containers and fixture registries for unit, integration, and preview environments.
- Add more granular override helpers so a feature subtree can replace one dependency group cleanly.
- Add verification tests for provider composition, override precedence, and missing dependency failures.

## Governance
- Add architecture rules for what belongs in DI versus what should stay as local feature logic.
- Add import-boundary enforcement so features cannot bypass the DI contract.
- Define ownership and review rules for dependency contract changes.

## Runtime And Observability
- Add startup diagnostics for dependency graph registration failures.
- Add tracing or logging around infrastructure service resolution in critical flows.
- Validate dependency injection across navigation, state management, and native module boundaries.

## Current Status
- The topic is implemented at a strong senior enterprise-style example level.
- The items above are scale-up steps, not blockers for the current roadmap stage.
