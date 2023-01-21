import User from './user';
import Admin from './admin';

import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    ...User,
    ...Admin
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
