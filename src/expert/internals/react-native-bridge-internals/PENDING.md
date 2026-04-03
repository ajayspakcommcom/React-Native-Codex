# React Native Bridge Internals Pending

These items are intentionally tracked as pending because they require React Native core instrumentation, custom engine tracing, or deeper native-source integration than app-level repository code alone can provide.

## Pending Rollout Work
- Add real timeline instrumentation for JS thread, UI thread, and render-thread events using profiler traces or native performance tooling.
- Add a custom native diagnostics surface if you want to expose Fabric scheduler timing or bridge queue timing directly from native code.
- Correlate this app-level internals model with actual React Native core source locations for the exact version the repo is pinned to.
- Add a reproducible benchmark surface that demonstrates the cost difference between legacy-style bridge serialization and new-architecture paths in a controlled scenario.
- Validate bridgeless behavior and interop edge cases on release builds and with the exact third-party libraries used by the production app.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on React Native core instrumentation, deeper native tracing, and environment-specific profiling workflows.
