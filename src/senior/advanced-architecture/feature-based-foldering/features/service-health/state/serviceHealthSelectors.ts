import type {ServiceHealthItem} from '../types';

export const orderByCriticality = (items: readonly ServiceHealthItem[]) =>
  [...items].sort((left, right) => {
    const rank = {
      critical: 0,
      degraded: 1,
      healthy: 2,
    } as const;

    return rank[left.status] - rank[right.status];
  });

export const summarizeServiceHealth = (items: readonly ServiceHealthItem[]) => ({
  total: items.length,
  critical: items.filter(item => item.status === 'critical').length,
  degraded: items.filter(item => item.status === 'degraded').length,
});
