import {offlineStore} from './offlineStore';
import {syncCoordinator} from './syncCoordinator';
import type {OfflineBoardSnapshot, OfflineBoardState} from './offlineContracts';

const toSnapshot = (
  state: OfflineBoardState,
  mode: OfflineBoardSnapshot['mode'],
): OfflineBoardSnapshot => ({
  ...state,
  unsyncedCount: state.queuedMutations.length,
  mode,
});

export const offlineRepository = {
  load(mode: OfflineBoardSnapshot['mode']) {
    const state = offlineStore.read();
    return toSnapshot(state, mode);
  },
  toggleApproval(taskId: string, mode: OfflineBoardSnapshot['mode']) {
    const state = offlineStore.read();
    const task = state.tasks.find(item => item.id === taskId);

    if (!task) {
      return toSnapshot(state, mode);
    }

    const nextApprovedValue = !task.approved;
    const updatedState: OfflineBoardState = {
      ...state,
      tasks: state.tasks.map(item =>
        item.id === taskId
          ? {
              ...item,
              approved: nextApprovedValue,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
      queuedMutations: [
        ...state.queuedMutations,
        {
          id: `mutation-${Date.now()}`,
          taskId,
          nextApprovedValue,
          createdAt: new Date().toISOString(),
          status: 'queued',
        },
      ],
    };

    offlineStore.write(updatedState);
    return toSnapshot(updatedState, mode);
  },
  async synchronize(mode: OfflineBoardSnapshot['mode']) {
    const state = offlineStore.read();
    const nextState = await syncCoordinator.syncQueuedMutations(
      state,
      mode === 'online',
    );
    offlineStore.write(nextState);
    return toSnapshot(nextState, mode);
  },
};
