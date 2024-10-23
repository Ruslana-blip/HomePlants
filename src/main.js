import '@/assets/scss/main.scss'
import 'swiper/swiper-bundle.css'
// Зміна значення змінної
document.documentElement.style.setProperty('--swiper-theme-color', '#090909') // Новий колір

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { register } from 'swiper/element/bundle'
register()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
