const NOT_AVAILABLE_ZH = '暫無資料'
const NOT_AVAILABLE_EN = 'Not available'

export function pickLocale(field, locale) {
  if (!field?.available) {
    return locale === 'en' ? NOT_AVAILABLE_EN : NOT_AVAILABLE_ZH
  }
  const primary =
    locale === 'en' ? field.en : locale === 'sc' ? field.sc : field.zh
  if (primary) return primary
  const fallbacks =
    locale === 'en'
      ? [field.zh, field.sc]
      : locale === 'sc'
        ? [field.zh, field.en]
        : [field.en, field.sc]
  const fallback = fallbacks.find(Boolean)
  return fallback || (locale === 'en' ? NOT_AVAILABLE_EN : NOT_AVAILABLE_ZH)
}
