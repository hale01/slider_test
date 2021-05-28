import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {isProdMode} from '@/variables';

const MainPage = () => import('@/site/main_page.vue');
const MainPage2 = () => import('@/site/main_page_2.vue');

const routes = [
    {
        path: '/:id(\\d+)?',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/slider/:id(\\d+)?',
        name: 'main2',
        component: MainPage2,
    },
];

let history;
if (isProdMode) {
    history = createWebHistory();
} else {
    history = createWebHashHistory();
}

const router = createRouter({
    history: history,
    routes,
});

export default router;