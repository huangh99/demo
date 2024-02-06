import { createApp } from 'vue'
import TDesign from 'tdesign-vue-next';
import App from './App.vue'
import router from './router/index'
import '@/styles/index.scss'
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App)
app.use(router)
app.use(TDesign);
app.mount('#app')
