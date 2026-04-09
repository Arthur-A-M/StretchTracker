import { PropsWithChildren } from 'react';

import { RoutineProvider } from '../features/routine/RoutineContext';
import { PreferencesProvider } from './PreferencesContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <PreferencesProvider>
      <RoutineProvider>{children}</RoutineProvider>
    </PreferencesProvider>
  );
}