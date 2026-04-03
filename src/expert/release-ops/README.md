# Release & Ops

This section covers the Expert-level release and operational topics:

- `crash-analytics`
- `feature-flags`
- `ab-testing`
- `app-size-optimization`

## What We Did In This Section

### Crash analytics
- Added an enterprise-style crash analytics architecture with:
- provider-agnostic contracts
- Sentry and Firebase Crashlytics operating profiles
- a central coordinator for crash, non-fatal, breadcrumb, and release-health policy
- a console screen and runbook
- a `PENDING.md` file for external console, credential, and native rollout work

### Feature flags
- Added an enterprise feature-flag architecture with:
- provider-neutral contracts
- rollout policy modeling
- environment and audience targeting
- a central flag coordinator
- a control-center screen and workflow document
- a `PENDING.md` file for real provider rollout and governance enforcement

### A/B testing
- Added an enterprise experimentation architecture with:
- typed experiment contracts
- deterministic assignment policy
- variant and success-metric modeling
- a central experimentation coordinator
- a control-center screen and workflow document
- a `PENDING.md` file for real analytics/provider rollout

### App size optimization
- Pending

## Update Rule
- Keep this file updated whenever anything in `src/expert/release-ops` changes.
