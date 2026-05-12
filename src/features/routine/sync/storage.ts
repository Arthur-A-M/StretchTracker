import AsyncStorage from '@react-native-async-storage/async-storage';

import { SyncQueueItem } from './types';

const SYNC_QUEUE_STORAGE_KEY = 'stretchtracker_routine_sync_queue';

type QueueListener = (queue: SyncQueueItem[]) => void;

const queueListeners = new Set<QueueListener>();

function notifyQueueListeners(queue: SyncQueueItem[]) {
  queueListeners.forEach((listener) => {
    listener(queue);
  });
}

function generateQueueId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

async function persistQueue(queue: SyncQueueItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(SYNC_QUEUE_STORAGE_KEY, JSON.stringify(queue));
    notifyQueueListeners(queue);
  } catch (error) {
    console.error('Error saving sync queue:', error);
  }
}

export async function getQueuedActions(): Promise<SyncQueueItem[]> {
  try {
    const storedValue = await AsyncStorage.getItem(SYNC_QUEUE_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as unknown;

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue as SyncQueueItem[];
  } catch (error) {
    console.error('Error loading sync queue:', error);
    return [];
  }
}

export async function enqueueAction(
  queueItem: Omit<SyncQueueItem, 'id' | 'createdAt' | 'updatedAt' | 'retryCount'>,
): Promise<SyncQueueItem> {
  const currentQueue = await getQueuedActions();
  const now = new Date().toISOString();
  const nextQueueItem: SyncQueueItem = {
    ...queueItem,
    id: generateQueueId(),
    createdAt: now,
    updatedAt: now,
    retryCount: 0,
  };

  await persistQueue([...currentQueue, nextQueueItem]);

  return nextQueueItem;
}

export async function updateQueuedAction(
  queueItemId: string,
  patch: Partial<Omit<SyncQueueItem, 'id' | 'createdAt'>>,
): Promise<SyncQueueItem | null> {
  const currentQueue = await getQueuedActions();
  let updatedQueueItem: SyncQueueItem | null = null;

  const nextQueue = currentQueue.map((queueItem) => {
    if (queueItem.id !== queueItemId) {
      return queueItem;
    }

    updatedQueueItem = {
      ...queueItem,
      ...patch,
      updatedAt: new Date().toISOString(),
    };

    return updatedQueueItem;
  });

  await persistQueue(nextQueue);

  return updatedQueueItem;
}

export async function removeQueuedAction(queueItemId: string): Promise<void> {
  const currentQueue = await getQueuedActions();
  const nextQueue = currentQueue.filter((queueItem) => queueItem.id !== queueItemId);
  await persistQueue(nextQueue);
}

export async function clearQueuedActions(): Promise<void> {
  await persistQueue([]);
}

export function subscribeToQueuedActions(listener: QueueListener): () => void {
  queueListeners.add(listener);

  void getQueuedActions().then((queue) => {
    listener(queue);
  });

  return () => {
    queueListeners.delete(listener);
  };
}
