import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

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
    let isMounted = true;

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
