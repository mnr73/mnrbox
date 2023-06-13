import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createRouter } from "./router";
import { createHead } from "@vueuse/head"

const app = createApp(App);
const router = createRouter();
const head = createHead()
app.use(router)
app.use(head)
app.mount('#app')
