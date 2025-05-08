import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles' // Global styles
import '@mdi/font/css/materialdesignicons.css' // Material Design Icons
import { useAuthStore } from './stores/authStore'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(vuetify)

const authStore = useAuthStore()
authStore.initializeAuth() // checks cookied and sets is LoggedIn
app.use(router)
app.mount('#app')
