import {createApp, h} from 'vue';

import {useWindowSize} from '@vueuse/core';
import helpers from './helpers';
import BaseComponent from './general/base.vue';
import router from '@/routes';

import '../scss/base.scss';


const app = createApp({
    render: () => h(BaseComponent),
    setup() {
        const {width, height} = useWindowSize();
        const appConfig = window.appConfig;

        return {
            appConfig, helpers,  windowWidth: width, windowHeight: height,
        }
    },
});

app.use(router);

app.mount('#app');
