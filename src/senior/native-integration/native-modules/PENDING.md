# Native Modules Pending Items

These are the remaining items before this topic is fully validated end-to-end on both native platforms.

## Native Validation
- Run an iOS build and verify the Swift module and Objective-C bridge export correctly.
- Validate the JS wrapper against the live native module on iOS.
- Run an end-to-end Android app launch if runtime verification is needed beyond Kotlin compilation.

## Capability Hardening
- Add error-code conventions for native failures instead of a single generic fallback.
- Add tests around the JS wrapper and capability mapping.
- Expand runtime diagnostics into environment-aware production monitoring or device capability routing if needed.

## Current Status
- The architecture and platform scaffolding are implemented at an enterprise-style level.
- Android custom package compilation is verified with `:app:compileDevelopmentDebugKotlin`.
- iOS build execution and final runtime verification are still pending.
