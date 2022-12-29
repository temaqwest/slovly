import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'
import VClickOutside from '@/directives/VClickOutside'
import { getBrowserLocale, setLocale } from '@/localization/localize'
import { createPinia } from 'pinia'

const pinia = createPinia()
const vueApp = createApp(App)

vueApp.directive('click-outside', VClickOutside)

vueApp.use(pinia).use(router)

setLocale(getBrowserLocale())

vueApp.mount('#app')
