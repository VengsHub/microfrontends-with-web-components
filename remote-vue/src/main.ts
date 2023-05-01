import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

import { defineCustomElement } from '@vue/runtime-dom'
import VueWebComponent from '@/components/VueWebComponent.vue';

window.customElements.define('vue-web-component', defineCustomElement(VueWebComponent));
