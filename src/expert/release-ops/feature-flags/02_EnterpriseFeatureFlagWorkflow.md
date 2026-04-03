# Enterprise Feature Flag Workflow

## Objective
- Separate release control from deploy control.
- Keep product code insulated from flag-provider SDK details.
- Ensure flags have owners, rollout rules, and cleanup discipline.

## Recommended architecture
1. Define flags in a stable contract layer.
2. Resolve values through a coordinator.
3. Attach owner, expiration, environment, and rollout metadata to every flag.
4. Prefer deterministic defaults for provider outages and cold starts.
5. Remove flags after rollout instead of letting them become permanent branching.

## Rollout modes
- `disabled`
- `internal-only`
- `percentage`
- `allowlist`
- `global`

## Enterprise rules
- Production flag changes should be auditable.
- Critical kill switches should be fast to change and default-safe.
- Expired flags should fail governance review or CI until cleaned up.
- Remote targeting should be environment-specific and not shared casually across staging and production.

## Current repo note
- This repo now models the enterprise flag contracts, evaluation rules, and control surface.
- Real provider rollout, audit workflow, and live remote evaluation are tracked in `PENDING.md`.
