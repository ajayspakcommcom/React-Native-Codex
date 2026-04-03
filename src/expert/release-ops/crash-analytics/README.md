# Crash Analytics

This topic models enterprise crash analytics for React Native apps using a provider-agnostic architecture that can support:

- `Sentry`
- `Firebase Crashlytics`

## What This Implementation Includes
- typed crash analytics contracts
- provider operating profiles for Sentry and Crashlytics
- a central coordinator for:
- fatal and non-fatal event capture
- breadcrumbs and logs
- release and environment tagging
- opt-in reporting posture
- a control-center screen for policy visibility
- a runbook file for rollout and operational usage
- a pending file for console, credentials, symbols, and native verification work

## Enterprise Notes
- Product code should call a coordinator or wrapper, not SDK APIs directly.
- Crash analytics should be tied to release identity, environment, and ownership metadata.
- Symbol upload, console setup, provider credentials, and live crash verification are operational rollout work and should be tracked explicitly.
