export default async function (): Promise<Array<string>> {
  const currentLanguage = localStorage.getItem('locale')?.slice(-2)
  const response = await import('@/assets/mock/Dictionary' + currentLanguage)
  return response.default
}
