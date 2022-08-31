import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import moment from 'moment'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
const app = createApp(App)
app.config.globalProperties.$moment = moment
