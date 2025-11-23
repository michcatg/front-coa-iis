import './assets/sass/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)

app.mount('#app')
