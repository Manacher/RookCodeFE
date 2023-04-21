import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/problems/:pro_id',
    name: 'problems',
    component: () => import(/* webpackChunkName: "about" */ '../views/Problem.vue'),
    children: [
      {
        path: 'solution/:sln_id',
        name: 'solution',
        component: () => import(/* webpackChunkName: "about" */ '../components/Solution.vue'),
      },
      {
        path: 'create-solution',
        name: 'create-solution',
        component: () => import(/* webpackChunkName: "about" */ '../views/CreateSolution.vue'),
      }
    ]
  },
  {
    path: '/problemView',
    name: 'problemView',
    component: () => import(/* webpackChunkName: "about" */ '../components/ProblemView.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "about" */ '../components/Submit.vue')
  },
  {
    path: '/submission',
    name: 'submission',
    component: () => import(/* webpackChunkName: "about" */ '../views/Submission.vue')
  },
  {
    path: '/edit-solution',
    name: 'edit-solution',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditSolution.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
