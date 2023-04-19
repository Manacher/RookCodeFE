import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'FrontPage',
        component: () => import('../views/frontPage/FrontPage.vue')
    }, {
        path: '/user/:id?',
        name: 'UserPage',
        component: () => import('../views/userPage/UserPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
