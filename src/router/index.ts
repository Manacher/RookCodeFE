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
    {
        path: '/problems/:pro_id',
        name: 'problems',
        component: () => import(/* webpackChunkName: "about" */ '../views/Problem.vue'),
        children: [
            {
                path: 'solution/:sln_id',
                name: 'solution',
                component: () => import(/* webpackChunkName: "about" */ '../components/Problem/RightComponent/Solution.vue'),
            },
            {
                path: 'create-solution',
                name: 'create-solution',
                component: () => import(/* webpackChunkName: "about" */ '../components/Problem/RightComponent/CreateSolution.vue'),
            },
            {
                path: 'edit-solution/:sln_id',
                name: 'edit-solution',
                component: () => import(/* webpackChunkName: "about" */ '../components/Problem/RightComponent/EditSolution.vue')
            },
        ]
    },
    {
        path: '/submissions/detail/:sub_id',
        name: 'submissions',
        component: () => import(/* webpackChunkName: "about" */ '../views/Submission.vue')
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
