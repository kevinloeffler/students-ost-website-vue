import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import router from './router/router.js'

createApp(App)
    .use(router)
    .mount('#app')
