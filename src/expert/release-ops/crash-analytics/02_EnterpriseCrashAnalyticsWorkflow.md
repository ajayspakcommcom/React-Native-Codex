# Enterprise Crash Analytics Workflow

## Objective
- Capture fatal and non-fatal issues with release-aware metadata.
- Keep product code insulated from SDK-specific calls.
- Tie crash monitoring to release operations, ownership, and symbol management.

## Recommended architecture
1. Choose one primary native crash owner for production.
2. Route product code through a coordinator or wrapper layer.
3. Attach release, environment, owner team, and module metadata consistently.
4. Upload symbols and JavaScript debug artifacts as part of the release pipeline.
5. Validate fatal and non-fatal capture on release-like builds before trusting dashboards.

## Provider choice
- `Sentry`
- Strong when the organization wants issue workflows, ownership, and broader error-monitoring correlation in one system.

- `Firebase Crashlytics`
- Strong when the mobile organization is already centered on Firebase operations and wants mobile-native crash dashboards.

## Enterprise rules
- Avoid competing native crash handlers unless the ownership split is explicit and tested.
- Review consent and privacy policy before enabling user context or broad breadcrumbs.
- Treat symbol upload as release-critical, not optional.
- Force test crashes and non-fatals before calling rollout complete.

## Current repo note
- This repo now contains the enterprise architecture, policy model, and control surface.
- Real provider installation, credentials, symbol uploads, and release-build validation are tracked in `PENDING.md`.
