export type NotificationPermissionState =
  | 'granted'
  | 'provisional'
  | 'denied'
  | 'not-determined';

export type NotificationDeliveryState =
  | 'foreground'
  | 'background'
  | 'cold-start';

export type NotificationRoute =
  | 'incident-detail'
  | 'release-approvals'
  | 'notification-inbox'
  | 'system-status';

export interface NotificationPayload {
  id: string;
  title: string;
  body: string;
  route: NotificationRoute;
  deliveryState: NotificationDeliveryState;
  receivedAt: string;
  campaign: 'incident' | 'release' | 'status';
}

export interface NotificationRegistrationSnapshot {
  permission: NotificationPermissionState;
  deviceToken: string | null;
  tokenSource: 'simulated-provider' | 'not-registered';
}
