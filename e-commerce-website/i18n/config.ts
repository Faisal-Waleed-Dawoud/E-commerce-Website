export type Locale = (typeof locales)[number]

export const locales = ["en", "an"] as const
export const defaultLocale: Locale = "en"