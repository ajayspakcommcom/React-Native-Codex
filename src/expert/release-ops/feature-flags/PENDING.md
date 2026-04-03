# Pending Work

The enterprise feature-flag architecture is implemented, but these rollout items are still pending:

- choose the production flag provider or internal platform
- install and verify the chosen remote-evaluation SDK if one is adopted
- connect live targeting rules, segments, and environments to a real flag backend
- define admin and audit workflows for who can change a production flag and under what approval model
- enforce flag expiration and cleanup policy through repository governance or CI checks
- verify kill-switch behavior on real release builds and device sessions
- document the final offline/default-value behavior for provider outages and cold starts
