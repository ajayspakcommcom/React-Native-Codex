# Push Notifications Pending Items

These are the remaining items before this topic is fully validated at a real native platform level.

## Native Provider Rollout
- Integrate APNs on iOS.
- Integrate FCM or the chosen Android push provider.
- Verify permission prompts, token generation, refresh, and revocation on real devices.

## Notification Delivery
- Validate foreground, background, and cold-start handling with real remote payloads.
- Add notification category/action handling if the product requires rich actions.
- Verify deeplink routing from notification taps into live navigation.

## Platform Operations
- Add backend token registration and token invalidation workflows.
- Define notification payload contracts with the backend team.
- Add analytics for delivery, open rate, routing success, and token health.

## Governance
- Define which notifications are critical, promotional, silent, or purely informational.
- Add permission messaging and fallback UX review.
- Add tests around payload parsing and routing policies.

## Current Status
- Enterprise notification orchestration patterns are implemented.
- Real provider integration and device verification are still pending.
