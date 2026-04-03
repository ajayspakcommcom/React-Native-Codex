# Advanced Caching

This is the first topic inside `Senior -> Networking & Offline`.

## Focus Areas
- cache policy selection
- memory cache plus persisted cache layering
- freshness, staleness, and TTL handling
- stale-while-revalidate behavior
- cache access through a repository instead of ad hoc screen logic

## What We Added
- Added cache contracts:
  `cacheContracts.ts`
- Added persisted cache storage:
  `cacheStorage.ts`
- Added a layered cache repository:
  `cacheRepository.ts`
- Added a senior console example:
  `01_AdvancedCacheControlCenter.tsx`

## Current Files
- `README.md`
- `cacheContracts.ts`
- `cacheStorage.ts`
- `cacheRepository.ts`
- `01_AdvancedCacheControlCenter.tsx`

## Implementation Notes
- The example uses a memory-first hot cache with MMKV-backed persistence.
- Cache policy and freshness rules live in the repository layer instead of the screen.
- The UI can switch between `network-first`, `cache-first`, and `stale-while-revalidate` to illustrate enterprise cache behavior clearly.
