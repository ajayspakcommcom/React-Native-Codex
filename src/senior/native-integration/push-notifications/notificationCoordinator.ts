import type {
  NotificationPayload,
  NotificationRegistrationSnapshot,
} from './contracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const simulatedPayloads: NotificationPayload[] = [
  {
    id: 'notif-101',
    title: 'Checkout saturation alert',
    body: 'Foreground alert routed to incident detail.',
    route: 'incident-detail',
    deliveryState: 'foreground',
    receivedAt: '2026-04-02T09:30:00Z',
    campaign: 'incident',
  },
  {
    id: 'notif-102',
    title: 'Release approvals waiting',
    body: 'Background delivery to release approvals queue.',
    route: 'release-approvals',
    deliveryState: 'background',
    receivedAt: '2026-04-02T09:34:00Z',
    campaign: 'release',
  },
  {
    id: 'notif-103',
    title: 'System status changed',
    body: 'Cold-start entry routed to system status.',
    route: 'system-status',
    deliveryState: 'cold-start',
    receivedAt: '2026-04-02T09:40:00Z',
    campaign: 'status',
  },
];

let registration: NotificationRegistrationSnapshot = {
  permission: 'not-determined',
  deviceToken: null,
  tokenSource: 'not-registered',
};

export const notificationCoordinator = {
  getRegistrationSnapshot: async (): Promise<NotificationRegistrationSnapshot> => {
    await wait(120);
    return registration;
  },
  requestPermissionAndRegister: async (): Promise<NotificationRegistrationSnapshot> => {
    await wait(180);
    registration = {
      permission: 'granted',
      deviceToken: 'push-token-enterprise-simulated-001',
      tokenSource: 'simulated-provider',
    };
    return registration;
  },
  getNotificationInbox: async (): Promise<NotificationPayload[]> => {
    await wait(140);
    return simulatedPayloads;
  },
};
