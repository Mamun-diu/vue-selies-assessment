import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import routes from './routes/index';

let vm = createApp(App).use(routes).mount('#app')

export default vm;