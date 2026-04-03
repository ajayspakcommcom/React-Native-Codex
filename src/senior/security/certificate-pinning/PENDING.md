# Certificate Pinning Pending

These items are intentionally tracked as pending because they depend on real API certificates, release builds, and live backend/security operations.

## Pending Rollout Work
- Replace the placeholder public-key hashes with real SHA-256 SPKI hashes from the production and staging certificate chains.
- Verify that each pinned domain has at least one backup pin available for rotation and outage recovery.
- Complete iOS native installation by running `pod install` once CocoaPods is available in the local Ruby environment.
- Rebuild and verify certificate pinning behavior on both iOS and Android release builds.
- Add the operational workflow for certificate rotation, hash updates, and emergency fallback.
- Confirm exactly which first-party domains should be pinned and explicitly exclude third-party services that are not under your certificate lifecycle control.
- Add observability for pinning failures and incident-response behavior if the product requires security telemetry.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on real certificates, backend domain ownership, native toolchain readiness, and release-validation workflows.
