import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Fachschaften from '../views/Fachschaften.vue'
import Vereine from '../views/Vereine.vue'

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/fachschaften', name: 'Fachschaften', component: Fachschaften},
    {path: '/vereine', name: 'Vereine', component: Vereine},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router