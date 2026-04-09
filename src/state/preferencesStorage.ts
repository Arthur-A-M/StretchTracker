import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'pt-BR';

const THEME_KEY = 'stretchflow_theme';
const LANGUAGE_KEY = 'stretchflow_language';

export async function getStoredTheme(): Promise<Theme> {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    return (value as Theme) ?? 'light';
  } catch {
    return 'light';
  }
}

export async function saveStoredTheme(theme: Theme): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
}

export async function getStoredLanguage(): Promise<Language> {
  try {
    const value = await AsyncStorage.getItem(LANGUAGE_KEY);
    return (value as Language) ?? 'en';
  } catch {
    return 'en';
  }
}

export async function saveStoredLanguage(language: Language): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
}
