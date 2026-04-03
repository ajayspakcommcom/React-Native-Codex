import type {ServiceHealthItem} from '../types';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

const items: ServiceHealthItem[] = [
  {
    id: 'svc-1',
    name: 'payments-core',
    status: 'critical',
    region: 'ap-south-1',
    latencyMs: 980,
  },
  {
    id: 'svc-2',
    name: 'inventory-read',
    status: 'healthy',
    region: 'eu-west-1',
    latencyMs: 120,
  },
  {
    id: 'svc-3',
    name: 'search-edge',
    status: 'degraded',
    region: 'us-east-1',
    latencyMs: 410,
  },
];

export const serviceHealthService = {
  list: async () => {
    await wait(160);
    return items;
  },
};
