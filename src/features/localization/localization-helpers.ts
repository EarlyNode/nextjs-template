export const fallbackLng = 'en';
export const languages = [fallbackLng, 'de'];
export const defaultNS = 'translation';

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS: Array.isArray(ns) ? ns[0] : ns,
    ns,
  };
}
