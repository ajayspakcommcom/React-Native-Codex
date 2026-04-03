import type {OfflineBoardState} from './offlineContracts';

const wait = async (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

export const syncCoordinator = {
  async syncQueuedMutations(
    state: OfflineBoardState,
    isNetworkAvailable: boolean,
  ): Promise<OfflineBoardState> {
    if (!isNetworkAvailable || state.queuedMutations.length === 0) {
      return state;
    }

    await wait(220);

    return {
      ...state,
      queuedMutations: [],
      lastSuccessfulSyncAt: new Date().toISOString(),
    };
  },
};
