import 'server-only';

const dictionaries = {
  en: () => import('../../features/dictionaries/en.json').then(m => m.default),
  de: () => import('../../features/dictionaries/de.json').then(m => m.default),
};

type Dictionary = typeof dictionaries.en extends () => Promise<infer T>
  ? T
  : never;

/** Type representing the supported locales. */
export type Locale = keyof typeof dictionaries;

export async function getDictionary(
  locale: Locale,
  namespace: keyof Dictionary,
): Promise<Dictionary[keyof Dictionary]>;
export async function getDictionary(locale: Locale): Promise<Dictionary>;
/**
 * Dynamically loads a dictionary based on the provided locale and optionally a namespace.
 * @param {Locale} [locale='en'] - The locale for which to load the dictionary. Defaults to 'en'.
 * @namespace {keyof Dictionary} [namespace] - Optional namespace to filter the dictionary.
 * @returns {Promise<Dictionary | Dictionary[keyof Dictionary]>} - A promise that resolves to the loaded dictionary or a specific part of it.
 */
export async function getDictionary(locale: Locale): Promise<Dictionary>;
export async function getDictionary(
  locale: Locale = 'en',
  namespace?: keyof Dictionary,
): Promise<Dictionary | Dictionary[keyof Dictionary]> {
  const dictionary = await dictionaries[locale ?? 'en']();

  if (namespace && namespace in dictionary) {
    return dictionary[namespace];
  }

  return dictionary;
}
