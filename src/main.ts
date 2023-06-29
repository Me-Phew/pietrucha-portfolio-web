import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import { createPinia } from 'pinia';
import VWave from 'v-wave';
import { createApp } from 'vue';

const { VITE_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_API_URL;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VWave, { directive: 'ripple' });

app.mount('#app');
