import getDictionaryBySelectedLanguage from '@/utils/getDictionaryBySelectedLanguage'

export default function (): Promise<string> {
  return getDictionaryBySelectedLanguage().then((dictionary: Array<string>) => {
    return dictionary[Math.round(Math.random() * dictionary.length)]
  })
}
