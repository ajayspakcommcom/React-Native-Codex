# A/B Testing

This topic models enterprise experimentation for React Native apps with:

- typed experiment contracts
- deterministic user assignment
- variant ownership and metric definitions
- a central experimentation coordinator

## What This Implementation Includes
- experiment definitions and metrics contracts
- deterministic variant allocation model
- coordinator-based experiment evaluation
- an experimentation control-center screen
- an enterprise workflow file
- a pending file for real analytics, experimentation provider, and rollout work

## Enterprise Notes
- Product code should not assign variants ad hoc.
- Experiments should have owners, metrics, start/stop posture, and cleanup expectations.
- Real analytics pipelines and provider consoles are rollout work and should be tracked explicitly.
