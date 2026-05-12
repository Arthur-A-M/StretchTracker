import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { getQueuedActions, subscribeToQueuedActions } from './storage';
import { getSyncStatus, startRoutineSyncMonitoring, subscribeToSyncStatus, syncRoutineWithBackend } from './syncManager';
import { SyncQueueItem, SyncResult, SyncStatus } from './types';

export function useSyncStatus(): SyncStatus {
  const [status, setStatus] = useState<SyncStatus>(getSyncStatus());

  useEffect(() => subscribeToSyncStatus(setStatus), []);

  useEffect(() => startRoutineSyncMonitoring(), []);

  return status;
}

export function useQueuedChanges(): SyncQueueItem[] {
  const [queuedActions, setQueuedActions] = useState<SyncQueueItem[]>([]);

  useEffect(() => subscribeToQueuedActions(setQueuedActions), []);

  return queuedActions;
}

export function useManualSync(): {
  syncNow: () => Promise<SyncResult>;
  isSyncing: boolean;
} {
  const [isSyncing, setIsSyncing] = useState(false);

  async function syncNow(): Promise<SyncResult> {
    setIsSyncing(true);

    try {
      return await syncRoutineWithBackend();
    } finally {
      setIsSyncing(false);
    }
  }

  return { syncNow, isSyncing };
}

export function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void getQueuedActions();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!isMounted) {
        return;
      }

      setIsOnline(Boolean(state.isConnected) && state.isInternetReachable !== false);
    });

    void NetInfo.fetch().then((state) => {
      if (isMounted) {
        setIsOnline(Boolean(state.isConnected) && state.isInternetReachable !== false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return isOnline;
}
