# JSI Pending

These items are intentionally tracked as pending because they require C++ runtime integration, custom native installers, or deeper React Native core interaction than app-level repository code alone.

## Pending Rollout Work
- Add a real C++ JSI host object or host function installation path for a custom native capability.
- Add native startup hooks that install JSI globals explicitly during app bootstrap if the product requires them.
- Benchmark the difference between a legacy-style native call path and a true JSI-backed host-function path in a controlled example.
- Validate release-build behavior and lifecycle ownership for any real JSI bindings introduced later.
- Add memory-management and thread-safety guidance once real native JSI objects are introduced into the app.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on native C++ implementation, deeper runtime integration, and release-grade profiling or validation workflows.
