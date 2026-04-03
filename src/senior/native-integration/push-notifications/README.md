# Push Notifications

This is the fourth topic inside `Senior -> Native Integration`.

## Focus Areas
- push permission lifecycle
- device token registration and rotation handling
- foreground, background, and cold-start entry handling
- notification-to-route resolution
- enterprise orchestration instead of one-off notification callbacks

## What We Added
- Added shared notification contracts:
  `contracts.ts`
- Added a notification coordinator and route resolver:
  `notificationCoordinator.ts`
  `notificationRouteResolver.ts`
- Added a senior control center and inbox console:
  `01_PushNotificationControlCenter.tsx`
  `02_NotificationInboxConsole.tsx`
- Added a rollout pending file:
  `PENDING.md`

## Current Files
- `README.md`
- `PENDING.md`
- `contracts.ts`
- `notificationCoordinator.ts`
- `notificationRouteResolver.ts`
- `01_PushNotificationControlCenter.tsx`
- `02_NotificationInboxConsole.tsx`

## Implementation Notes
- The example models permission state, device token registration, payload ingestion, and route resolution separately.
- Product code can depend on the coordinator instead of scattering notification handling across screens.
- Real APNs/FCM rollout remains tracked in `PENDING.md`.
