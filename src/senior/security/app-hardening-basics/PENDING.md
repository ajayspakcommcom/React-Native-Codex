# App Hardening Pending

These items are intentionally tracked as pending because they require product-risk decisions, native runtime validation, or external platform services.

## Pending Rollout Work
- Decide whether sensitive screens need screenshot blocking and implement it only where the UX tradeoff is acceptable.
- Add compromised-device handling policy, such as root/jailbreak detection and app response, if required by the product risk model.
- Add store and platform attestation controls, such as Play Integrity or Apple App Attest, if the backend and compliance posture require them.
- Validate the new Android hardening rules on release builds to ensure no required app data is accidentally excluded from legitimate migration scenarios.
- Review whether any debug-only network trust overrides are required for local development and ensure they never leak into release builds.
- Add observability and incident-response guidance for client hardening failures if security operations requires it.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on product policy, backend support, release validation, and real device testing.
