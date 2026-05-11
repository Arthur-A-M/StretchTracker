import { QueryClient } from '@tanstack/react-query';

import { REQUEST_CONFIG } from '../config/constants';
import { AppApiError } from './errors';

function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= REQUEST_CONFIG.MAX_RETRIES) {
    return false;
  }

  if (error instanceof AppApiError && error.status && error.status >= 400 && error.status < 500) {
    return false;
  }

  return true;
}

function retryDelay(attemptIndex: number): number {
  const delay = REQUEST_CONFIG.RETRY_DELAY_MS * Math.pow(REQUEST_CONFIG.RETRY_BACKOFF_MULTIPLIER, attemptIndex);
  return Math.min(delay, 30000);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryDelay,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: shouldRetry,
      retryDelay,
      networkMode: 'offlineFirst',
    },
  },
});
