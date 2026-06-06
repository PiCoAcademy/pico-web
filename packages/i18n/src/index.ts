export const locales = ['fr', 'en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isValidLocale(val: string): val is Locale {
  return (locales as readonly string[]).includes(val)
}
