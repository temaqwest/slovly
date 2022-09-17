import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.scss'
import VClickOutside from '@/directives/VClickOutside'

const vueApp = createApp(App)

vueApp.directive('click-outside', VClickOutside)

vueApp.use(router).mount('#app')
