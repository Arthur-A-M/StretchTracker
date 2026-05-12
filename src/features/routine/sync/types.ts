import { Stretch } from '../types';

export type SyncAction = 'create' | 'update' | 'delete' | 'fetch';

export type SyncStatus = 'idle' | 'pending' | 'syncing' | 'synced' | 'failed';

export type RoutineSyncPayload = {
  stretches: Stretch[];
  stretchId?: string;
};

export type SyncQueueItem = {
  id: string;
  action: SyncAction;
  entity: 'routine';
  payload: RoutineSyncPayload;
  createdAt: string;
  updatedAt: string;
  retryCount: number;
  status: Exclude<SyncStatus, 'idle'>;
  errorMessage?: string;
};

export type SyncResult = {
  processed: number;
  failed: number;
  skipped: number;
};
