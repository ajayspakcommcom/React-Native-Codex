# Feature Flags

This topic models enterprise feature-flagging for React Native apps with:

- provider-neutral flag contracts
- rollout and audience targeting rules
- ownership and expiration posture
- a central coordinator instead of screen-owned flag logic

## What This Implementation Includes
- typed feature-flag contracts
- rollout strategy and audience model
- a flag coordinator
- a control-center screen
- an enterprise workflow file
- a pending file for real provider rollout and governance enforcement

## Enterprise Notes
- Product code should ask a coordinator for flag state, not call provider SDKs directly.
- Flags should have owners, environments, rollout policies, and expiration discipline.
- Remote flag vendors, evaluation SDKs, and audit trails are rollout work and should be tracked explicitly.
