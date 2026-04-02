# TurboModules And Fabric Migration Guide

This guide documents the enterprise migration pattern for moving a capability from the legacy bridge toward the new React Native architecture.

## Why This Matters
- TurboModules reduce the need for legacy bridge-style module access patterns.
- Fabric moves rendering toward the new architecture for native components.
- Large apps need a migration strategy, not a one-shot rewrite.

## Recommended Enterprise Sequence
1. Define typed JS specs first.
2. Introduce an adapter so product code does not care whether the capability is legacy or new architecture backed.
3. Keep the legacy implementation alive while native codegen and platform integrations are being rolled out.
4. Migrate one capability or surface at a time and measure the actual impact.

## TurboModule Pattern
- Define a typed `Spec` interface.
- Resolve the module through `TurboModuleRegistry`.
- Keep a wrapper or adapter around the capability.
- Move callers onto the adapter before cutting over the native implementation.

## Fabric Pattern
- Define a native component spec through `codegenNativeComponent`.
- Keep props and events narrow and intentional.
- Avoid sending large noisy payloads through the surface contract.
- Roll out the native side only when the codegen path is ready.

## Governance Rules
- Do not migrate everything just because the new architecture exists.
- Prefer migrating capabilities with measurable payoff or long-term native ownership.
- Track rollout readiness, platform parity, and verification explicitly.
