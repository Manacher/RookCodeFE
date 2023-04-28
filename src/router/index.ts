import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

// TODO 奇怪的懒加载bug，此处使用懒加载会导致页面无法正常渲染，暂时使用同步加载
import Problem from "@/views/Problem.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'FrontPage',
        component: () => import('../views/FrontPage.vue')
    }, {
        path: '/user/:id?',
        name: 'UserPage',
        component: () => import('../views/UserPage.vue')
    },
    {
        path: '/problems/:pro_id',
        name: 'problems',
        component: Problem,
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
