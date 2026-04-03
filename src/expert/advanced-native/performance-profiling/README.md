# Performance Profiling

This topic models how enterprise React Native teams profile native-heavy issues with:

- `Flipper`
- `Xcode Instruments`
- `Android Profiler`

## What This Implementation Includes
- typed profiling tool contracts
- a workflow model that maps bottleneck classes to the right profiler
- a console screen that explains the decision path
- a runbook for release-build and device-first profiling
- a pending file for machine-specific and rollout-specific items

## Enterprise Notes
- Profiling should be done on release-like builds, not just dev builds.
- Teams should choose the profiler based on the bottleneck:
- Flipper for fast development-time inspection and logs
- Instruments for deep iOS CPU, memory, hangs, and responsiveness work
- Android Profiler for CPU, memory, network, and frame investigation on Android
- Local captures, symbol files, and device benchmarks are operational follow-up work, not something app-side code can fake.
