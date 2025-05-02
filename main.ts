import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { vuetify } from './renderer/vuetify';
import App from './App.vue';

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(vuetify)
app.mount('#app');
