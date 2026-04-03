# Dependency Injection Patterns

This is the third topic inside `Senior -> Advanced Architecture`.

## Focus Areas
- dependency contracts instead of direct concrete service imports
- composition root driven dependency assembly
- provider and hook access for React consumers
- scoped dependency overrides for testing, sandbox flows, or previews
- keeping feature code unaware of implementation details

## What We Added
- Added a senior-level dependency injection example:
  `01_DependencyInjectionControlCenter.tsx`
- Added dependency contracts:
  `contracts/dependencyContracts.ts`
- Added dependency container primitives:
  `core/di/createDependencies.ts`
  `core/di/DependencyProvider.tsx`
  `core/di/useDependencies.ts`
- Added a sandbox override factory:
  `sandbox/createSandboxDependencies.ts`

## Current Files
- `README.md`
- `PENDING.md`
- `01_DependencyInjectionControlCenter.tsx`
- `contracts/dependencyContracts.ts`
- `core/di/createDependencies.ts`
- `core/di/DependencyProvider.tsx`
- `core/di/useDependencies.ts`
- `sandbox/createSandboxDependencies.ts`

## Implementation Notes
- Feature-facing code uses typed contracts only.
- The provider accepts overrides so a subtree can replace one or more services without rewriting the entire app shell.
- This pattern is useful for testing, preview environments, and swapping infrastructure concerns cleanly.
- Larger-scale DI evolution items are tracked in `PENDING.md`.
