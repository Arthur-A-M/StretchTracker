import NetInfo from '@react-native-community/netinfo';

import { getQueuedActions, subscribeToQueuedActions } from './storage';
import { SyncResult, SyncStatus } from './types';

type SyncStatusListener = (status: SyncStatus) => void;

const syncStatusListeners = new Set<SyncStatusListener>();

let currentSyncStatus: SyncStatus = 'idle';
let isSyncInProgress = false;
let stopNetworkMonitoring: (() => void) | null = null;

function setSyncStatus(status: SyncStatus) {
  currentSyncStatus = status;
  syncStatusListeners.forEach((listener) => {
    listener(status);
  });
}

async function performSync(): Promise<SyncResult> {
  const queuedActions = await getQueuedActions();

  if (queuedActions.length === 0) {
    setSyncStatus('synced');
    return { processed: 0, failed: 0, skipped: 0 };
  }

  setSyncStatus('syncing');

  // TODO: Replace this placeholder with real API calls when backend endpoints exist.
  setSyncStatus('pending');

  return {
    processed: 0,
    failed: 0,
    skipped: queuedActions.length,
  };
}

export function getSyncStatus(): SyncStatus {
  return currentSyncStatus;
}

export function subscribeToSyncStatus(listener: SyncStatusListener): () => void {
  syncStatusListeners.add(listener);
  listener(currentSyncStatus);

  return () => {
    syncStatusListeners.delete(listener);
  };
}

export async function syncRoutineWithBackend(): Promise<SyncResult> {
  if (isSyncInProgress) {
    return { processed: 0, failed: 0, skipped: 0 };
  }

  isSyncInProgress = true;

  try {
    return await performSync();
  } catch (error) {
    console.error('Error syncing routine queue:', error);
    setSyncStatus('failed');
    return { processed: 0, failed: 1, skipped: 0 };
  } finally {
    isSyncInProgress = false;
  }
}

export function startRoutineSyncMonitoring(): () => void {
  if (stopNetworkMonitoring) {
    return stopNetworkMonitoring;
  }

  const unsubscribeQueue = subscribeToQueuedActions((queue) => {
    if (queue.length > 0 && currentSyncStatus !== 'syncing') {
      setSyncStatus('pending');
      return;
    }

    if (queue.length === 0 && currentSyncStatus !== 'syncing') {
      setSyncStatus('idle');
    }
  });

  const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
    if (state.isConnected && state.isInternetReachable !== false) {
      void syncRoutineWithBackend();
    }
  });

  stopNetworkMonitoring = () => {
    unsubscribeQueue();
    unsubscribeNetInfo();
    stopNetworkMonitoring = null;
  };

  return stopNetworkMonitoring;
}
