import i18n from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';

import { en } from './locales/en';
import { ptBR } from './locales/pt-BR';

export const resources = {
  en,
  'pt-BR': ptBR,
} as const;

export type AppLanguage = keyof typeof resources;

const languageTag = getLocales()[0]?.languageTag;
const initialLanguage: AppLanguage = languageTag?.startsWith('pt') ? 'pt-BR' : 'en';

void i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export const supportedLanguages = ['en', 'pt-BR'] as const;

export default i18n;
