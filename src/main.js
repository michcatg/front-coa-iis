import './assets/sass/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Función para cargar config.js en producción
async function loadConfigIfNeeded() {
	if (!import.meta.env.DEV && typeof window !== 'undefined' && !window.__APP_CONFIG__) {
        try {
            const res = await fetch('/config.js');
            eval(await res.text());
        } catch (e) {
            console.error('No se pudo cargar config.js', e);
        }
    }
}

loadConfigIfNeeded().then(() => {
	const app = createApp(App)
	app.component('FontAwesomeIcon', FontAwesomeIcon);
	app.use(createPinia())
	app.use(router)
	app.mount('#app')
});
