import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'
import VClickOutside from '@/directives/VClickOutside'
import { AvailableLocales, setLocale } from '@/localization/localize'

const vueApp = createApp(App)

setLocale(AvailableLocales.EN)

vueApp.directive('click-outside', VClickOutside)

vueApp.use(router).mount('#app')
