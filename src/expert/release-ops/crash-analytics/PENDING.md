# Pending Work

The enterprise crash analytics architecture is implemented, but these rollout items are still pending:

- choose the production crash provider posture:
- Sentry-only
- Firebase Crashlytics-only
- or a clearly governed split with no conflicting native-crash ownership
- create and configure the real provider projects, DSNs, app IDs, and secrets
- install and verify the chosen production SDKs in this repo
- upload dSYMs, ProGuard/R8 mappings, and Hermes/source-map artifacts in the release pipeline
- force and validate test crashes plus non-fatal capture on iOS and Android release-like builds
- confirm release-health and ownership metadata flows into the chosen dashboard
- define privacy, consent, and PII scrubbing policy for breadcrumbs, user context, and custom keys
- document the final rule for avoiding multiple competing native crash handlers in production
