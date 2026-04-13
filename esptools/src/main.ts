import { createApp } from 'vue'

import App from './App.vue'
import { reveal } from './shared/reveal'
import './style.css'

createApp(App).directive('reveal', reveal).mount('#app')

