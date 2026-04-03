import type {IncidentSnapshot, WorkspaceSnapshot} from '../../contracts/operationsDomain';

interface WorkspaceService {
  getSnapshot: () => Promise<WorkspaceSnapshot>;
  promoteReleaseReadiness: () => Promise<WorkspaceSnapshot>;
}

interface IncidentService {
  list: () => Promise<IncidentSnapshot[]>;
  acknowledge: (incidentId: string) => Promise<IncidentSnapshot[]>;
}

export interface AppContainer {
  workspaceService: WorkspaceService;
  incidentService: IncidentService;
}

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

export const createAppContainer = (): AppContainer => {
  let workspaceSnapshot: WorkspaceSnapshot = {
    releaseName: 'Q2 Control Plane',
    deploymentWindow: 'Friday 23:30 IST',
    approvalOwner: 'Platform Council',
    lanes: [
      {
        id: 'lane-platform',
        label: 'Platform',
        owner: 'Asha',
        blockedTasks: 1,
        releaseReady: false,
      },
      {
        id: 'lane-fulfillment',
        label: 'Fulfillment',
        owner: 'Rahul',
        blockedTasks: 0,
        releaseReady: true,
      },
      {
        id: 'lane-observability',
        label: 'Observability',
        owner: 'Mina',
        blockedTasks: 2,
        releaseReady: false,
      },
    ],
  };

  let incidents: IncidentSnapshot[] = [
    {
      id: 'inc-401',
      title: 'Checkout retries exceeding SLA',
      severity: 'critical',
      owner: 'Nikhil',
      service: 'checkout-api',
      acknowledged: false,
    },
    {
      id: 'inc-402',
      title: 'Delayed inventory replication',
      severity: 'high',
      owner: 'Priya',
      service: 'inventory-sync',
      acknowledged: true,
    },
    {
      id: 'inc-403',
      title: 'Partner webhook latency spike',
      severity: 'medium',
      owner: 'Sara',
      service: 'partner-gateway',
      acknowledged: false,
    },
  ];

  return {
    workspaceService: {
      getSnapshot: async () => {
        await wait(180);
        return workspaceSnapshot;
      },
      promoteReleaseReadiness: async () => {
        await wait(180);
        workspaceSnapshot = {
          ...workspaceSnapshot,
          lanes: workspaceSnapshot.lanes.map(lane => ({
            ...lane,
            blockedTasks: 0,
            releaseReady: true,
          })),
        };
        return workspaceSnapshot;
      },
    },
    incidentService: {
      list: async () => {
        await wait(180);
        return incidents;
      },
      acknowledge: async incidentId => {
        await wait(180);
        incidents = incidents.map(incident =>
          incident.id === incidentId
            ? {...incident, acknowledged: true}
            : incident,
        );
        return incidents;
      },
    },
  };
};
