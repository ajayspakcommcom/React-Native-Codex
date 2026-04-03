# Maestro

This topic covers modern end-to-end mobile testing using Maestro.

## Focus Areas
- stable test IDs and automation harness design
- readable YAML flow files
- enterprise-style smoke and happy-path coverage
- keeping E2E flows resilient and user-focused

## What We Added
- Added an in-app E2E harness screen:
  `01_MaestroWorkspaceHarness.tsx`
- Added Maestro flow files under:
  `.maestro/`

## Implementation Notes
- The harness screen exposes stable `testID` values so flows can use IDs instead of brittle coordinate taps.
- The flows focus on real user outcomes such as form completion, environment selection, and success confirmation.
- The Maestro CLI is external to the npm toolchain, so repo automation documents and scripts assume the CLI is installed on the machine.
