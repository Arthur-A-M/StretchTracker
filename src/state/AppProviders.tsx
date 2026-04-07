import { PropsWithChildren } from 'react';

import { RoutineProvider } from '../features/routine/RoutineContext';

export function AppProviders({ children }: PropsWithChildren) {
  return <RoutineProvider>{children}</RoutineProvider>;
}