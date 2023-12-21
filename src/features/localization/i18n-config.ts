export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
};

export type Locale = (typeof i18n)['locales'][number];
