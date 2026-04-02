import type {ReleaseLane, ReleaseLaneStatus} from '../types';

export const filterReleaseLanes = (
  lanes: readonly ReleaseLane[],
  activeStatus: ReleaseLaneStatus | 'all',
) => {
  if (activeStatus === 'all') {
    return [...lanes];
  }

  return lanes.filter(lane => lane.status === activeStatus);
};

export const summarizeReleaseLanes = (lanes: readonly ReleaseLane[]) => ({
  total: lanes.length,
  ready: lanes.filter(lane => lane.status === 'ready').length,
  blocked: lanes.filter(lane => lane.status === 'blocked').length,
  review: lanes.filter(lane => lane.status === 'review').length,
});
