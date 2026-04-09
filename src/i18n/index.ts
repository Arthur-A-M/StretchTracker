import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

import { en } from './locales/en';
import { ptBR } from './locales/pt-BR';

const i18n = new I18n({
  en,
  'pt-BR': ptBR,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const languageTag = getLocales()[0]?.languageTag;
i18n.locale = languageTag?.startsWith('pt') ? 'pt-BR' : 'en';

export function t(scope: string, options?: Record<string, unknown>) {
  return i18n.t(scope, options);
}

export function setAppLocale(locale: 'en' | 'pt-BR') {
  i18n.locale = locale;
}
