import { createApp } from 'vue';
import App from './app.vue';
import { createPinia } from 'pinia';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import VueCookies from 'vue-cookies';

import router from './config/router';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
    },
    theme: {
        defaultTheme: 'dark'
    },
    components,
    directives,
});

const pinia = createPinia();

const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(setupCalendar, {});
app.use(VueCookies);

app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);

app.mount('#app');
