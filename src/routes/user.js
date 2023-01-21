import Home from '../views/Home.vue';
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'Register',
        component: Register,
        path: '/register'
    },
];

export default routes;