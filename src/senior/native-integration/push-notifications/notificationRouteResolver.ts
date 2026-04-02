import type {NotificationPayload} from './contracts';

export const notificationRouteResolver = {
  resolveSummary: (payload: NotificationPayload) => {
    switch (payload.route) {
      case 'incident-detail':
        return 'Route to the incident detail surface with incident context.';
      case 'release-approvals':
        return 'Route to the release approvals queue for action.';
      case 'system-status':
        return 'Route to the system status dashboard.';
      case 'notification-inbox':
      default:
        return 'Route to the in-app notification inbox.';
    }
  },
};
