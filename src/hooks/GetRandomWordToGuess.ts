import getDictionaryBySelectedLanguage from '@/utils/getDictionaryBySelectedLanguage'

export function useGetRandomWordToGuess() {
  return getDictionaryBySelectedLanguage().then((dictionary: Array<string>) => {
    return dictionary[Math.round(Math.random() * dictionary.length)]
  })
}
