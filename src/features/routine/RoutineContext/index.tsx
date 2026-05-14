import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { defaultStretches } from '../defaults';
import { generateStretchId, getStoredStretches, saveStoredStretches } from '../storage';
import { useManualSync, useSyncStatus } from '../sync/hooks';
import { SyncResult, SyncStatus } from '../sync/types';
import { Stretch } from '../types';

type StretchDraft = Omit<Stretch, 'id'>;

type RoutineContextValue = {
  stretches: Stretch[];
  isLoading: boolean;
  syncStatus: SyncStatus;
  createStretch: (draft: StretchDraft) => void;
  updateStretch: (stretchId: string, patch: Partial<StretchDraft>) => void;
  removeStretch: (stretchId: string) => void;
  replaceRoutine: (nextStretches: Stretch[]) => void;
  resetRoutine: () => void;
  manualSync: () => Promise<SyncResult>;
};

const RoutineContext = createContext<RoutineContextValue | undefined>(undefined);

export function RoutineProvider({ children }: PropsWithChildren) {
  const [stretches, setStretches] = useState<Stretch[]>(defaultStretches);
  const [isLoading, setIsLoading] = useState(true);
  const syncStatus = useSyncStatus();
  const { syncNow } = useManualSync();

  useEffect(() => {
    let isMounted = true;

    async function loadRoutine() {
      const storedStretches = await getStoredStretches();

      if (isMounted) {
        setStretches(storedStretches);
        setIsLoading(false);
      }
    }

    void loadRoutine();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    void saveStoredStretches(stretches);
  }, [isLoading, stretches]);

  const value = useMemo<RoutineContextValue>(
    () => ({
      stretches,
      isLoading,
      syncStatus,
      createStretch: (draft) => {
        setStretches((currentStretches) => [
          ...currentStretches,
          {
            id: generateStretchId(),
            ...draft,
          },
        ]);
      },
      updateStretch: (stretchId, patch) => {
        setStretches((currentStretches) =>
          currentStretches.map((stretch) =>
            stretch.id === stretchId ? { ...stretch, ...patch } : stretch,
          ),
        );
      },
      removeStretch: (stretchId) => {
        setStretches((currentStretches) =>
          currentStretches.filter((stretch) => stretch.id !== stretchId),
        );
      },
      replaceRoutine: (nextStretches) => {
        setStretches(nextStretches);
      },
      resetRoutine: () => {
        setStretches(defaultStretches);
      },
      manualSync: async () => syncNow(),
    }),
    [isLoading, stretches, syncNow, syncStatus],
  );

  return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
}

export function useRoutine() {
  const context = useContext(RoutineContext);

  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }

  return context;
}
