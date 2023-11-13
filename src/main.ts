import './assets/main.scss'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const query = ref<string>('')

app.provide('query', query);
app.use(router)

app.mount('#app')
