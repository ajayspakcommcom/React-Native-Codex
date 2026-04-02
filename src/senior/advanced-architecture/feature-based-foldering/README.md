# Feature-Based Foldering

This is the second topic inside `Senior -> Advanced Architecture`.

## Focus Areas
- organizing code by feature instead of by technical layer only
- keeping each feature self-contained
- exposing narrow public entrypoints
- separating screens, components, hooks, services, state, and types inside each feature
- making ownership and scaling clearer for multi-team codebases

## What We Added
- Added a senior-level feature-based foldering example:
  `01_FeatureFolderingConsole.tsx`
- Added feature entrypoints:
  `features/release-control/index.ts`
  `features/service-health/index.ts`
- Added isolated feature slices:
  `features/release-control/*`
  `features/service-health/*`

## Current Files
- `README.md`
- `01_FeatureFolderingConsole.tsx`
- `features/release-control/index.ts`
- `features/release-control/screens/ReleaseControlScreen.tsx`
- `features/release-control/components/ReleaseLaneCard.tsx`
- `features/release-control/hooks/useReleaseWorkspace.ts`
- `features/release-control/services/releaseService.ts`
- `features/release-control/state/releaseFilters.ts`
- `features/release-control/types.ts`
- `features/service-health/index.ts`
- `features/service-health/screens/ServiceHealthScreen.tsx`
- `features/service-health/components/ServiceHealthCard.tsx`
- `features/service-health/hooks/useServiceHealth.ts`
- `features/service-health/services/serviceHealthService.ts`
- `features/service-health/state/serviceHealthSelectors.ts`
- `features/service-health/types.ts`

## Implementation Notes
- Each feature owns its own UI, data access, selectors, and types.
- The root console imports features only through their public `index.ts` entrypoints.
- Cross-feature imports are intentionally avoided.
- This pattern scales better than a single global `components/hooks/services/types` layout once the app becomes large.
