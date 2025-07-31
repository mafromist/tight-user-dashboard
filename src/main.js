import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('PrimeButton', Button)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
