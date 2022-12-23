import { defineStore } from 'pinia'
import { Theme } from '@/assets/enums/Theme'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    currentTheme: localStorage.getItem('currentTheme') || Theme.light
  }),
  getters: {
    getCurrentTheme: (state): Theme => {
      return +state.currentTheme === Theme.black ? Theme.black : Theme.light
    }
  },
  actions: {
    setCurrentTheme(theme: Theme): void {
      this.currentTheme = theme
      localStorage.setItem('currentTheme', JSON.stringify(theme))
    }
  }
})
