import { createApp } from 'vue';
import App from './app.vue';
import { createPinia } from 'pinia';

import router from './config/router';

import 'vuetify/styles';
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
app.mount('#app');