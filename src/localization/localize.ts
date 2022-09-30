'use strict'
import en from '@/localization/en'
import ru from '@/localization/ru'

export enum AvailableLocales {
  EN = 'en-EN',
  RU = 'ru-RU'
}

interface Locale {
  [key: string]: any
}

const availableLocales = {
  [AvailableLocales.EN]: en,
  [AvailableLocales.RU]: ru
}

let currentLocale: AvailableLocales

function searchLocaleString(filename: string, localeKey: string): string {
  const currentLocaleObj: Locale = availableLocales[currentLocale]

  try {
    if (!currentLocaleObj[filename][localeKey])
      throw new Error(returnNotFoundError(filename, localeKey))

    return currentLocaleObj[filename][localeKey]
  } catch (error) {
    console.log(error)
    return returnNotFoundError(filename, localeKey)
  }
}

function returnNotFoundError(filename: string, key: string) {
  return `Localize error: cannot find string by this path: ${filename}.${key}`
}

export function setLocale(
  locale: AvailableLocales = AvailableLocales.EN
): void {
  currentLocale = locale
}

export function getLocale(): string {
  return currentLocale
}

export function localize(localeStringKey: string): string {
  const [fileName, localeKey] = localeStringKey.split('.')
  return searchLocaleString(fileName, localeKey)
}
