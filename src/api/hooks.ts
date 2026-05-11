import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { AppApiError } from './errors';

export function useApiQuery<TQueryFnData, TData = TQueryFnData>(
  options: UseQueryOptions<TQueryFnData, AppApiError, TData>
): UseQueryResult<TData, AppApiError> {
  return useQuery({
    ...options,
    networkMode: options.networkMode ?? 'offlineFirst',
  });
}

export function useApiMutation<TData, TVariables = void, TContext = unknown>(
  options?: UseMutationOptions<TData, AppApiError, TVariables, TContext>
): UseMutationResult<TData, AppApiError, TVariables, TContext> {
  return useMutation({
    ...options,
    networkMode: options?.networkMode ?? 'offlineFirst',
  });
}

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(window.navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
