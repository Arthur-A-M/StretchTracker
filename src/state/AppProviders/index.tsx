import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../../api/queryClient';
import { AuthProvider } from '../../features/auth/AuthContext';
import { RoutineProvider } from '../../features/routine/RoutineContext';
import { PreferencesProvider } from '../PreferencesContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PreferencesProvider>
          <RoutineProvider>{children}</RoutineProvider>
        </PreferencesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
