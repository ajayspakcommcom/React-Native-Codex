# Enterprise Experimentation Workflow

## Objective
- Run experiments with deterministic assignment, explicit metrics, and clear ownership.
- Separate experiment evaluation from analytics transport and dashboards.
- Avoid permanent product branching from forgotten experiments.

## Recommended architecture
1. Define experiments in a stable contract layer.
2. Evaluate assignments through a coordinator using deterministic identity buckets.
3. Tie every experiment to a primary metric and guardrail metrics.
4. Capture exposures and conversions through a governed analytics pipeline.
5. Enforce expiration and cleanup after the decision is made.

## Enterprise rules
- No experiment should launch without owner, metrics, and stop conditions.
- Do not rely on random assignment performed directly in UI code.
- Production experiments should have guardrails for latency, error rate, or crash rate when relevant.
- Expired experiments should be removed, not left dormant.

## Current repo note
- This repo now models the enterprise experimentation contracts, assignment rules, and control surface.
- Real experimentation providers, dashboards, and live event pipelines are tracked in `PENDING.md`.
