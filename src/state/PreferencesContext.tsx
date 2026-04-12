import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import i18n from '../i18n';
import { darkPalette, lightPalette, Palette } from '../theme/palette';
import {
  Language,
  Theme,
  getStoredLanguage,
  getStoredTheme,
  saveStoredLanguage,
  saveStoredTheme,
} from './preferencesStorage';

type PreferencesContextValue = {
  theme: Theme;
  language: Language;
  isPreferencesLoading: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('en');
  const [isPreferencesLoading, setIsPreferencesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPreferences() {
      const [storedTheme, storedLanguage] = await Promise.all([
        getStoredTheme(),
        getStoredLanguage(),
      ]);

      if (isMounted) {
        setThemeState(storedTheme);
        setLanguageState(storedLanguage);
        void i18n.changeLanguage(storedLanguage);
        setIsPreferencesLoading(false);
      }
    }

    void loadPreferences();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      theme,
      language,
      isPreferencesLoading,
      setTheme: (nextTheme) => {
        setThemeState(nextTheme);
        void saveStoredTheme(nextTheme);
      },
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        void i18n.changeLanguage(nextLanguage);
        void saveStoredLanguage(nextLanguage);
      },
    }),
    [theme, language, isPreferencesLoading],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }

  return context;
}

export function usePalette(): Palette {
  const { theme } = usePreferences();
  return theme === 'dark' ? darkPalette : lightPalette;
}
