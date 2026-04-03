# App hardening basics

This folder contains the `App hardening basics` topic from `Senior -> Security`.

## What We Did
- Added enterprise-style app-hardening baseline controls to the Android app manifest and XML security resources.
- Added a typed hardening-policy model for implemented and pending controls.
- Added an app-hardening command-center example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- Android network security configuration
- Android backup and device-transfer restriction rules
- explicit cleartext traffic blocking
- iOS ATS strict-mode posture already represented in `Info.plist`
- cross-platform hardening control inventory

## Current Structure
- `README.md`
- `hardeningContracts.ts`
- `hardeningPolicy.ts`
- `01_AppHardeningCommandCenter.tsx`
- `PENDING.md`

## Repo-Level Hardening Changes
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/res/xml/network_security_config.xml`
- `android/app/src/main/res/xml/backup_rules.xml`
- `android/app/src/main/res/xml/data_extraction_rules.xml`

## Notes
- This topic focuses on practical baseline hardening owned by the app codebase.
- More invasive controls such as anti-tamper, root/jailbreak response, screenshot protection on sensitive flows, and store-integrity attestation are tracked in `PENDING.md` because they require more product-specific decisions and validation.

## Update Rule
- This file is the running summary for the `app-hardening-basics` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
