import { createRouter, createWebHistory } from 'vue-router';
import AppStore from "./AppStore.vue";
import App from "./App.vue";
import Login from "./Login.vue";
import { authMiddleware } from './middleware/authMiddleware.js';

const routes = [
    {
        path: '/',
        name: 'Login',
        redirect: '/Login'
    },
    {
        path: '/store',
        component: AppStore,
        beforeEnter: authMiddleware,
    },
    {
        path: '/Login',
        component: Login
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;