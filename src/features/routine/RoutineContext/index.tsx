import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { defaultStretches } from '../defaults';
import { generateStretchId, getStoredStretches, saveStoredStretches } from '../storage';
import { Stretch } from '../types';

type StretchDraft = Omit<Stretch, 'id'>;

type RoutineContextValue = {
  stretches: Stretch[];
  isLoading: boolean;
  createStretch: (draft: StretchDraft) => void;
  updateStretch: (stretchId: string, patch: Partial<StretchDraft>) => void;
  removeStretch: (stretchId: string) => void;
  replaceRoutine: (nextStretches: Stretch[]) => void;
  resetRoutine: () => void;
};

const RoutineContext = createContext<RoutineContextValue | undefined>(undefined);

export function RoutineProvider({ children }: PropsWithChildren) {
  const [stretches, setStretches] = useState<Stretch[]>(defaultStretches);
  const [isLoading, setIsLoading] = useState(true);

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
    }),
    [isLoading, stretches],
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
