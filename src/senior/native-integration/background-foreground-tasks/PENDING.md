# Background Tasks Pending Items

These are the remaining items before background and foreground task handling are fully validated at a native platform level.

## Background Rollout
- Integrate Android `WorkManager` or an equivalent production scheduler.
- Integrate iOS `BGTaskScheduler` or the appropriate background execution path.
- Verify constraints, retry behavior, and wake-up timing on real devices.
- Validate app lifecycle behavior under terminated, suspended, and restricted states.

## Foreground Rollout
- Integrate real task cancellation semantics for network or upload flows.
- Add production analytics around task latency, failure rates, and abandonment.
- Connect the foreground coordinator to real API and upload boundaries.

## Governance
- Define which work is allowed in foreground only, background only, or both.
- Add failure classification and retry ownership rules.
- Add tests around orchestration rules and policy transitions.

## Current Status
- Enterprise orchestration patterns are implemented.
- Native scheduler and runtime verification are still pending.
