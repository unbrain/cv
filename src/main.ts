import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/router';
import adv from "ant-design-vue";
createApp(App).use(router).use(adv).mount('#app')
