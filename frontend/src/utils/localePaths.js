/** URL segment ↔ app locale (zh = 繁體, sc = 簡體, en = 英文) */
export const SEGMENT_BY_LOCALE = {
  zh: 'Chi',
  sc: 'Chs',
  en: 'Eng',
}

export const LOCALE_BY_SEGMENT = {
  Chi: 'zh',
  Chs: 'sc',
  Eng: 'en',
}

export function isValidSegment(segment) {
  return segment in LOCALE_BY_SEGMENT
}

export function localeFromSegment(segment) {
  return LOCALE_BY_SEGMENT[segment] ?? 'zh'
}

export function segmentFromLocale(locale) {
  return SEGMENT_BY_LOCALE[locale] ?? 'Chi'
}

export function homePath(locale) {
  return `/CPM/${segmentFromLocale(locale)}`
}

export function productPath(locale, pcmNo) {
  return `/CPM/${segmentFromLocale(locale)}/product/${encodeURIComponent(pcmNo)}`
}

export function searchPath(locale) {
  return `/CPM/${segmentFromLocale(locale)}/search`
}

/** Keep user on the same page type when switching language. */
export function pathForLocaleSwitch(route, newLocale) {
  const seg = segmentFromLocale(newLocale)
  if (route.name === 'product') {
    return `/CPM/${seg}/product/${route.params.pcmNo}`
  }
  if (route.name === 'search') {
    return `/CPM/${seg}/search`
  }
  return `/CPM/${seg}`
}

import { siteTitle } from './uiCopy.js'

export function pageTitleForSegment(segment) {
  const locale = LOCALE_BY_SEGMENT[segment]
  return locale ? siteTitle(locale) : siteTitle('zh')
}
