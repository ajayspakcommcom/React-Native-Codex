# TurboModules And Fabric Pending Items

These are the remaining steps before this topic is fully rolled out as a live new-architecture integration.

## Codegen Rollout
- Move the spec files into a real codegen-enabled native module package or app-native codegen location.
- Configure the React Native codegen pipeline for the TurboModule and Fabric component specs.
- Verify generated native interfaces on both Android and iOS.

## Native Implementation
- Implement the TurboModule-backed native diagnostics capability on Android and iOS.
- Implement the Fabric native view/component corresponding to the command surface spec.
- Validate that the adapter resolves the TurboModule path correctly when the new architecture implementation is present.

## Platform Verification
- Build and run the iOS and Android apps with the new architecture path enabled for the migrated module/component.
- Confirm that Fabric rendering and TurboModule resolution work end-to-end in the target environment.
- Measure the before/after impact for the migrated capability instead of assuming gains.

## Governance
- Decide which capabilities stay on the legacy bridge and which justify migration.
- Add module ownership and migration checklists for future native capabilities.
- Align codegen contract review with native and JS team ownership.

## Current Status
- The topic is implemented at an enterprise migration-pattern level.
- Full codegen-backed native rollout is still pending.
