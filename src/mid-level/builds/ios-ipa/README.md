# iOS IPA

This is the third topic inside `Mid-Level -> Builds`.

## Focus Areas
- archive and export flow for IPA generation
- release scheme expectations
- export options planning
- signing and provisioning readiness
- enterprise-style release documentation for Xcode and CLI workflows

## What We Added
- Added iOS IPA workflow documentation:
  `01_IosArtifactWorkflow.md`
- Added IPA release readiness checklist:
  `PENDING.md`

## Current Files
- `README.md`
- `01_IosArtifactWorkflow.md`
- `PENDING.md`

## Implementation Notes
- The current iOS project still uses a single shared scheme: `ReactNativeCodex`.
- This topic documents the archive/export flow and the next enterprise steps rather than pretending multiple release schemes already exist.
- The typed environment config already includes intended iOS scheme names, so the next step would be mapping those values into real Xcode schemes and xcconfig files.
